module.exports = function ()
{
    let event = this.get_driver("ui")

    event.emit(this.options.name)
}
