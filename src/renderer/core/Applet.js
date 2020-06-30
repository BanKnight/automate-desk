export default class Applet
{
    constructor(app)
    {
        this.app = app

        this.id = null
        this.name = null
        this.state = "init"

        this.condition = null
        this.actions = []
    }

    load(data)
    {
        {
            this.id = data.id = data.id || Date.now()
            this.name = data.name
            this.state = data.state
        }

        this.condition = {
            ...data.condition,
            template: this.app.template.condition[data.condition.name]
        }

        this.actions = []

        for (let one of data.actions)
        {
            const template = this.app.template.action[one.name]

            const action = {
                ...one,
                template,
            }

            this.actions.push(action)
        }
    }

    save()
    {
        const data = {
            id: this.id,
            name: this.name,
            state: this.state,
            condition: { name: this.condition.name, options: this.condition.options },
            actions: [],
        }

        for (let action of this.actions)
        {
            const one = {
                id: action.id,
                name: action.name,
                options: action.options
            }

            data.actions.push(one)
        }

        return data
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