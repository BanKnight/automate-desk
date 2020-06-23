const exec = require("exec-sh")

module.exports = function ()
{
    exec(this.options.cmd, { cwd: this.options.cwd }, function (err)
    {
        if (err)
        {
            console.log("Exit code: ", err.code);
        }
    });
}
