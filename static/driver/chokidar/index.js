console.log("this is chokidar", process.cwd())

const chokidar = require('chokidar');

exports.start = function ()
{
    const ret = {}

    this.id_helper = 0
    this.watchers = {}

    ret.watch = function (config)       //{files,folders},files = [{path,event}]
    {
        const id = ++this.id_helper
        const info = []

        for (let one of config.files)
        {
            const watcher = chokidar.watch(one.path, {
                ignored: /(^|[\/\\])\../, // ignore dotfiles
                persistent: true
            })

            watcher.on(one.event, () =>
            {
                this.resolve(one)
            })

            info.push(watcher)
        }

        for (let one of config.files)
        {
            const watcher = chokidar.watch(one.path, {
                ignored: /(^|[\/\\])\../, // ignore dotfiles
                persistent: true
            })

            watcher.on(one.event, () =>
            {
                this.resolve(one)
            })
            info.push(watcher)
        }

        this.watchers[id] = info

        return id
    }

    ret.unwatch = function (id)
    {
        const info = this.watchers[id]
        if (info == null)
        {
            return
        }

        delete this.watchers[id]

        for (let one of info)
        {
            one.close()
        }
    }

    return ret
}

exports.stop = function ()
{
    for (let id in this.watchers)
    {
        let info = this.watchers[id]

        for (let one of info)
        {
            one.close()
        }
    }
    this.watchers = {}
}