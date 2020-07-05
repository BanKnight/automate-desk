import path from "path"

export default class TDriver
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
    }

    get start()
    {
        return this.template.start
    }

    get stop()
    {
        return this.template.stop
    }
}