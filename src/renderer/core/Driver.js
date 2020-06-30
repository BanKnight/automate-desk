export default class Driver
{
    constructor(app)
    {
        this.app = app

        this.options = null
        this.name = null
        this.state = "init"
    }

    load(data)
    {
        this.options = data
        this.name = data.name
        this.state = data.state || "init"

        this.template = this.app.template.driver[data.name]
    }

    save()
    {
        return this.options
    }

    clone()
    {
        let inst = new this.constructor(this.app)

        let data = this.save()

        data = JSON.parse(JSON.stringify(data));

        inst.load(data)

        return inst
    }
}