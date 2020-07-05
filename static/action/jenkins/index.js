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
        this.log("send a request", config)

        try
        {
            await axios.get(this.options.url, config)

            this.log("finish jenkins build")
        }
        catch (e)
        {
            this.error(e)
        }
    }
}

exports.stop = function () { } 
