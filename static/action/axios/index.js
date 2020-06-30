const axios = require('axios');

exports.start = function ()
{
    const config = { ...this.options.other }

    for (let name in this.options)
    {
        if (name != "other")
        {
            config[name] = this.options[name]
        }
    }

    return async () =>
    {
        console.log("send a request", config)

        try
        {
            await axios(config)
        }
        catch (e)
        {
            console.error(e)
        }
    }
}

exports.stop = function () { } 
