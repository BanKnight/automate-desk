exports.start = function ()
{
    this.on_happened = (...args) =>
    {
        this.resolve(...args)
    }

    this.get_driver("ui").on(this.applet.name, this.on_happened)
}

exports.stop = function ()
{
    this.get_driver("ui").off(this.applet.name, this.on_happened)
}