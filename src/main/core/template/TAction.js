const path = require("path")

export default class TAction
{
    constructor(root)
    {
        this.root = root
    }

    load()
    {
        const package_path = path.join(this.root, "package.json")

        this.template = nrequire(this.root)
        this.package = nrequire(package_path)

        if (typeof (this.template) == "function")
        {
            const inst = this.template
            this.template = {
                start() { return inst },
                stop() { },
            }
        }
    }

    get start()
    {
        return this.template.start
    }

    get stop()
    {
        return this.template.stop
    }

    get name()
    {
        return this.template.package.name
    }
}