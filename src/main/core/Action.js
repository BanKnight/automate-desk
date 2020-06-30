export default class Action
{
    constructor(applet)
    {
        this.applet = applet
        this.app = applet.app

        this.inst = null

    }

    get condition()
    {
        return this.applet.condition
    }

    get name()
    {
        return this.template.name
    }

    run()
    {
        return this.inst()
    }

    load(data)
    {
        this.options = data.options
        this.template = this.app.template.action[data.name]

        this.inst = null
        this.start = () =>
        {
            this.inst = this.template.start.call(this)
        }
        this.stop = this.template.stop.bind(this)
    }

    save()
    {
        return {
            name: this.template.name,
            options: this.options
        }
    }
}