const { spawn } = require('child_process');

module.exports = function ()
{
    return new Promise((resolve, reject) =>
    {
        this.log("run exec", this.options)

        const child = spawn(this.options.cmd, this.options.args, {
            cwd: this.options.cwd,
            encoding: "utf8"
        })

        child.stdout.on('data', (data) =>
        {
            this.log(data.toString())
        });

        let error = ""

        child.stderr.on('data', (data) =>
        {
            error += data.toString()
        });
        child.on('exit', (code) =>
        {
            if (code !== 0)
            {
                reject(new Error(`${error}`))
            }
            else
            {
                resolve()
            }
        });

        child.on('error', (err) =>
        {
            reject(err)
        })
    })
}
