module.exports = function ()
{
    let event = this.get_driver("event")

    event.emit(this.options.name, ...this.options.args)
}
