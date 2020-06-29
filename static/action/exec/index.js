const { spawn } = require('child_process');

module.exports = function ()
{
    console.log("run exec", this.options)

    const child = spawn(this.options.cmd, this.options.args, { cwd: this.options.cwd })

    child.stdout.on('data', (data) =>
    {
        console.log(data.toString())
    });

    child.stderr.on('data', (data) =>
    {
        console.error(`ps stderr: ${data.toString()}`);
    });

    child.on('close', (code) =>
    {
        if (code !== 0)
        {
            console.log(`ps process exited with code ${code}`);
        }
    });

}
