import Condition from "./Condition"
import Action from "./Action"

export default class Applet
{
    constructor(options, app)
    {
        options.id = options.id || Date.now()

        this.options = options
        this.app = app

        this.id = options.id
        this.name = options.name

        this.condition = null
        this.actions = []

        this.init()
    }

    init()
    {
        const config_condition = this.options.condition
        const template = this.app.template.condition[config_condition.name]

        this.condition = new Condition(template, config_condition.options, this)

        for (let one of this.options.actions)
        {
            const template = this.app.template.action[one.name]

            const action = new Action(template, one.options, this)

            this.actions.push(action)
        }
    }

    start()
    {
        for (let one of this.actions)
        {
            one.start()
        }

        this.condition.start()
    }

    stop()
    {
        this.condition.stop()

        for (let one of this.actions)
        {
            one.stop()
        }

        this.condition = null
        this.actions = []
    }

    get enabled()
    {
        return !!this.$options.enabled
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
}