const events = require('events');

exports.start = function ()
{
    return new events.EventEmitter();
}

exports.stop = function ()
{
    this.inst.removeAllListeners()
}



