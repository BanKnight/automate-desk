const events = require('events');

exports.start = () =>
{
    return new events.EventEmitter();
}

exports.stop = () =>
{
    this.inst.removeAllListeners()
}



