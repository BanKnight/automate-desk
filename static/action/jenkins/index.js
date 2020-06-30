const axios = require('axios');

exports.start = function ()
{
    const config = {
        params: {
            token: this.options.token
        },
        auth: {
            username: this.options.username,
            password: this.options.password,
        }
    }

    return async () =>
    {
        console.log("send a request", config)

        try
        {
            await axios.get(this.options.url, config)

            console.log("finish jenkins build")
        }
        catch (e)
        {
            console.error(e)
        }
    }
}

exports.stop = function () { } 
