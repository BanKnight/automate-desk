exports.start = function ()
{
    this.on_happened = (...args) =>
    {
        this.resolve(...args)
    }

    this.get_driver("cron").schedule(this.options.time, this.on_happened)
}

exports.stop = function ()
{
    this.get_driver("cron").unschedule(this.options.time, this.on_happened)
}