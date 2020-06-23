console.log("this is chokidar", process.cwd())

const chokidar = require('chokidar');

exports.start = function ()
{
    const ret = {}

    this.watchers = new Set()

    ret.watch = function (...args)
    {
        const watcher = chokidar.watch(...args, {
            ignored: /(^|[\/\\])\../, // ignore dotfiles
            persistent: true
        });

        this.watchers.add(watcher)
    }

    ret.unwatch = function (watcher)
    {
        watcher.close()

        this.watchers.delete(watcher)
    }

    return ret
}

exports.stop = function ()
{
    for (let one of this.watchers.value())
    {
        one.close()
    }
    this.watchers.clear()
}