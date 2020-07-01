
const util = require('util');
const exec = util.promisify(require('child_process').exec);

module.exports = async function ()
{
    const files = await svn_status(this.options.args.cwd)

    console.dir("debug", files)

    await svn_add(files["?"], this.options.args.cwd)

    await svn_del(files["!"], this.options.args.cwd)

    await svn_commit(this.options.args.message, this.options.args.cwd)
}

async function svn_status(cwd)
{
    const { stdout, stderr } = await exec("svn status", { cwd })

    let files = {
        "M": [],           //modify
        "!": [],         //remove
        "?": [],         //unversion  
        "D": [],          //ready to commit
    }

    const lines = stdout.split("\n")

    for (let line of lines)
    {
        if (line.length < 6)
        {
            continue
        }

        let state = line.substr(0, 1)
        let file = line.substring(8).replace("\r", "")

        files[state].push(file)
    }

    return files
}

async function svn_add(files, cwd)
{
    let options = { cwd }

    for (let file of files)
    {
        await exec(`svn add '${file}'`, options)
    }
}

async function svn_del(files, cwd)
{
    let options = { cwd }

    for (let file of files)
    {
        await exec(`svn delete '${file}'`, options)
    }
}
async function svn_commit(message, cwd)
{
    let options = { cwd }

    if (message && message.length > 0)
    {
        await exec(`svn commit --message="${message}"`, options)
    }
    else
    {
        await exec(`svn commit --message=`, options)
    }
}