exports.start = function ()
{
    this.log(__filename, "start", this.options)

    const chokidar = this.get_driver("chokidar")

    this.watcher = chokidar.watch(this.options, (...args) =>
    {
        this.log(...args)

        this.resolve()
    })
}

exports.stop = function ()
{
    const chokidar = this.get_driver("chokidar")

    chokidar.unwatch(this.watcher)
}