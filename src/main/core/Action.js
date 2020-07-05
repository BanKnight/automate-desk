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
        return this.template.package.name
    }

    run()
    {
        return this.inst()
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
        this.id = data.id
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
            id: this.id,
            name: this.name,
            options: this.options
        }
    }

    log(...args)
    {
        this.applet.log(this.template.package.title, ...args)
    }
}