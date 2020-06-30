import { Notification } from "electron"

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

        for (let action of this.actions)
        {
            try
            {
                await action.run()

                let notification = new Notification({
                    title: `${this.name}-${action.template.package.title}`, // 通知的标题, 将在通知窗口的顶部显示
                    body: `执行完毕`, // 通知的正文文本, 将显示在标题或副标题下面
                    silent: true, // 在显示通知时是否发出系统提示音
                })

                notification.show()
                notification.on('click', () =>
                {
                    notification.close()
                })
            }
            catch (e)
            {
                let notification = new Notification({
                    title: `${this.name}-${action.template.package.title}`, // 通知的标题, 将在通知窗口的顶部显示
                    body: `错误：${e.toString()}`, // 通知的正文文本, 将显示在标题或副标题下面
                    silent: true, // 在显示通知时是否发出系统提示音
                })

                notification.show()
                notification.on('click', () =>
                {
                    notification.close()
                })
            }
        }
    }

    load(data)
    {
        {
            this.id = data.id = data.id || Date.now()
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