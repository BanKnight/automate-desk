const cron = require('node-cron');

exports.start = function ()
{
    this.tasks = new Map()

    const that = this

    return {
        schedule(time, cb)
        {
            const task = cron.schedule(time, cb)

            that.tasks.set(cb, task)
        },
        unschedule(cb)
        {
            const task = that.tasks.get(cb)

            if (task)
            {
                task.stop()
                that.tasks.delete(cb)
            }
        }
    }
}

exports.stop = function ()
{
    for (let one of this.tasks.values())
    {
        one.stop()
    }

    this.tasks.clear()
}