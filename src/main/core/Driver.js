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
        }
        this.stop = () =>
        {
            this.template.stop.call(this)
            this.state = "init"
        }
    }

    save()
    {
        return {
            name: this.template.name,
            options: this.options,
            state: this.state,
        }
    }
}