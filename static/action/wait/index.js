module.exports = function ()
{
    return new Promise((resolve) =>
    {
        setTimeout(resolve, this.options.sec * 1000)
    })
}