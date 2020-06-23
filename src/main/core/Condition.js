export default class Condition
{
    constructor(template, options, applet)
    {
        this.template = template
        this.options = options
        this.applet = applet
        this.app = applet.app

        this.output = null

        this.start = this.template.start.bind(this)
        this.stop = this.template.stop.bind(this)
    }

    get name()
    {
        return this.template.name
    }

    resolve(output)
    {
        this.output = output

        this.applet.trigger()
    }

    get_driver(name)
    {
        const driver = this.app.drivers[name]
        if (driver == null)
        {
            return
        }

        return driver.inst
    }
}