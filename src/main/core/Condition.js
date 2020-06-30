export default class Condition
{
    constructor(applet)
    {
        this.applet = applet
        this.app = applet.app

        this.output = null

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

    load(data)
    {
        this.options = data.options
        this.template = this.app.template.condition[data.name]

        this.output = null

        this.start = this.template.start.bind(this)
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