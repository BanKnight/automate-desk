export default class Action
{
    constructor(template, options, applet)
    {
        this.template = template
        this.options = options
        this.applet = applet
        this.app = applet.app

        this.condition = this.applet.condition

        this.inst = null
        this.start = () =>
        {
            this.inst = this.template.start.call(this)
        }
        this.stop = this.template.stop.bind(this)
    }

    get name()
    {
        return this.template.name
    }

    run()
    {
        return this.inst()
    }
}