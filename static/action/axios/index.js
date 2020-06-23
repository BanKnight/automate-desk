const axios = require('axios');

exports.start = function ()
{
    const config = Object.assign(this.options.config || {}, { method: this.options.method, url: this.options.url })

    return () =>
    {
        axios(config)
    }
}

exports.stop = function () { } 
