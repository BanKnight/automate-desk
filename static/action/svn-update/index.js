const { spawn } = require('child_process');

module.exports = function ()
{
    return new Promise((resolve, reject) =>
    {
        console.log("run exec", this.options)

        const cmd = "svn"
        const args = ["up"]

        const child = spawn(cmd, args, {
            cwd: this.options.cwd, encoding: "utf8"
        })

        child.stdout.on('data', (data) =>
        {
            console.log(data.toString())
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
