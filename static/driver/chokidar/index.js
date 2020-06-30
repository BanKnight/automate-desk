console.log("this is chokidar", process.cwd())

const chokidar = require('chokidar');

exports.start = function ()
{
    const ret = {}

    this.id_helper = 0
    this.watchers = {}

    const that = this

    ret.watch = (config, cb) =>       //{files,folders},files = [{path,event}]
    {
        cb = debounce(cb)

        const id = ++that.id_helper
        const info = []

        for (let one of config.files)
        {
            const watcher = chokidar.watch(one.path, {
                ignored: /(^|[\/\\])\../, // ignore dotfiles
                persistent: true,
                ignoreInitial: true,
            })

            watcher.on(one.event, () =>
            {
                cb(one.path, one.event)
            })

            info.push(watcher)
        }

        for (let one of config.folders)
        {
            const watcher = chokidar.watch(one.path, {
                ignored: /(^|[\/\\])\../, // ignore dotfiles
                persistent: true,
                ignoreInitial: true,
            })

            watcher.on(one.event, () =>
            {
                cb(one.path, one.event)
            })
            info.push(watcher)
        }

        that.watchers[id] = info

        return id
    }

    ret.unwatch = (id) =>
    {
        const info = that.watchers[id]
        if (info == null)
        {
            return
        }

        delete that.watchers[id]

        for (let one of info)
        {
            one.close()
        }
    }

    return ret
}

exports.stop = function ()
{
    const that = this

    for (let id in that.watchers)
    {
        let info = that.watchers[id]

        for (let one of info)
        {
            one.close()
        }
    }
    that.watchers = null
}

function debounce(fn, delay = 1000)
{
    var timer;
    return function ()
    {
        var args = arguments;
        if (timer)
        {
            clearTimeout(timer);
        }
        timer = setTimeout(() =>
        {
            fn.apply(this, args);
        }, delay);
    };
}