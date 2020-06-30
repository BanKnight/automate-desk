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

    trigger()
    {
        setImmediate(() =>
        {
            for (let action of this.actions)
            {
                action.run()
            }
        })
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