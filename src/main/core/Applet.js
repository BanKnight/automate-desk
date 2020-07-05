import { Notification } from "electron"
import { generate } from 'shortid'
import log from "electron-log"

import Condition from "./Condition"
import Action from "./Action"

export default class Applet
{
    constructor(app)
    {
        this.app = app

        this.id = null
        this.name = null
        this.state = "init"

        this.condition = null
        this.actions = []
    }

    start()
    {
        this.state = "error"

        for (let one of this.actions)
        {
            one.start()
        }

        this.condition.start()

        this.state = "running"
    }

    stop()
    {
        this.condition.stop()

        for (let one of this.actions)
        {
            one.stop()
        }

        this.state = "init"
    }

    async trigger()
    {
        this.log("trigger")

        let notification = new Notification({
            title: this.name, // 通知的标题, 将在通知窗口的顶部显示
            body: `触发条件，开始执行`, // 通知的正文文本, 将显示在标题或副标题下面
            silent: true, // 在显示通知时是否发出系统提示音
        })

        notification.show()
        notification.on('click', () =>
        {
            notification.close()
        })

        let collectors = this.actions.map((action) =>
        {
            return {
                title: action.template.package.title,
                result: "waiting"
            }
        })

        let should_break = false

        for (let i = 0, len = this.actions.length; i < len && should_break == false; ++i)
        {
            let action = this.actions[i]
            let collector = collectors[i]

            try
            {
                await action.run()

                collector.result = "ok"

                this.log(collector.title, "ok")
            }
            catch (e)
            {
                collector.result = "failed"
                collector.error = e.toString()

                this.error(collector.title, "failed:", collector.error)

                should_break = true
            }

            notification.close()

            notification.body = this.gen_notification_body(collectors)

            notification.show()
        }
    }

    log(...args)
    {
        log.log(this.name, ":", ...args)
    }

    error(...args)
    {
        log.error(this.name, ":", ...args)
    }

    gen_notification_body(collectors)
    {
        let ret = []

        let error = null

        for (let i = 0, len = collectors.length; i < len; ++i)
        {
            let collector = collectors[i]

            ret.push(`${i + 1}/${len}-${collector.title}:${collector.result}`)

            error = error || collector.error
        }

        if (error)
        {
            ret.push("----------------")
            ret.push(error)
        }

        return ret.join("\n")
    }

    load(data)
    {
        {
            this.id = data.id = data.id || generate()
            this.name = data.name
            this.state = "init"
        }
        {
            this.condition = new Condition(this)

            this.condition.load(data.condition)
        }

        for (let one of data.actions)
        {
            const action = new Action(this)

            action.load(one)

            this.actions.push(action)
        }
    }

    save()
    {
        const data = {
            id: this.id,
            name: this.name,
            state: this.state,
            condition: this.condition.save(),
            actions: [],
        }

        for (let action of this.actions)
        {
            const one = action.save()

            data.actions.push(one)
        }

        return data
    }
}