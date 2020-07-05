export default class Driver
{
    constructor(app)
    {
        this.app = app

        this.template = null
        this.options = null
        this.inst = null

        this.state = "init"
    }

    get name()
    {
        return this.template.name
    }

    load(data)
    {
        this.template = this.app.template.driver[data.name]
        this.options = data.options

        this.inst = null
        this.start = () =>
        {
            this.state = "error"
            this.inst = this.template.start.call(this)
            this.state = "running"

            {
                console.log("start", this.name, this.inst)
            }
        }
        this.stop = () =>
        {
            if (this.name == "event")
            {
                console.log("begin stop", this.inst)
            }

            this.template.stop.call(this)
            this.state = "init"
            this.inst = null
        }
    }

    save()
    {
        return {
            name: this.template.package.name,
            options: this.options,
            state: this.state,
        }
    }
}