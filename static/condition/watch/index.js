exports.start = function ()
{
    console.log(__filename, "start", this.options)

    const chokidar = this.get_driver("chokidar")

    this.watcher = chokidar.watch(this.options, (...args) =>
    {
        console.log(...args)

        this.resolve()
    })
}

exports.stop = function ()
{
    const chokidar = this.get_driver("chokidar")

    chokidar.unwatch(this.watcher)
}