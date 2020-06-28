export default class Driver
{
    constructor(template, options, app)
    {
        this.template = template
        this.options = options
        this.app = app

        this.state = "init"
        this.inst = null
        this.start = () =>
        {
            this.state = "error"
            this.inst = this.template.start.call(this)
            this.state = "running"
        }
        this.stop = this.template.stop.bind(this)
    }

    get name()
    {
        return this.template.name
    }

    save()
    {
        return {
            template: this.template.name,
            options: this.options,
            state: this.state,
        }
    }
}