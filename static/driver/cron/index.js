const cron = require('node-cron');

exports.start = function ()
{
    this.tasks = new Map()

    return {
        schedule(time, cb)
        {
            const task = cron.schedule(time, cb)

            this.tasks.set(cb, task)
        },
        unschedule(cb)
        {
            const task = this.tasks.get(cb)

            if (task)
            {
                task.stop()
                this.tasks.delete(cb)
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