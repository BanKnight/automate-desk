exports.start = function ()
{
    this.on_happened = (...args) =>
    {
        this.resolve(...args)
    }

    this.get_driver("event").on(this.options.name, this.on_happened)
}

exports.stop = function ()
{
    this.get_driver("event").off(this.options.name, this.on_happened)
}