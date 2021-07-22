const path = require("path")
const fs = require('fs-extra');

module.exports = async function ()
{

    const source_exists = await fs.exists(this.options.source)
    if (source_exists == false)
    {
        return
    }

    const stat = await fs.stat(this.options.source)

    const all = []


    if (stat.isDirectory())
    {
        await copy_folder(all, this.options.source, this.options.dest, this.options.delete_first)
    }
    else
    {
        await copy_file(all, this.options.source, this.options.dest, this.options.delete_first)
    }

    await Promise.all(all)
}

async function copy_folder(all, source, dest, delete_first)
{
    if (fs.existsSync(dest))
    {
        const stat = await fs.stat(dest)

        if (stat.isFile())
        {
            await fs.unlink(dest)
        }
        else if (delete_first)
        {
            await fs.rmdir(dest)
        }
    }

    await fs.ensureDir(dest)

    const files = await fs.readdir(source)

    for (const file of files)
    {
        const first = path.join(source, file)
        const second = path.join(dest, file)

        const stat = await fs.stat(first)

        if (stat.isFile())
        {
            await copy_file(all, first, second, delete_first)
        }
        else
        {
            await copy_folder(all, first, second, delete_first)
        }
    }
}

async function copy_file(all, source, dest, delete_first)
{
    if (fs.existsSync(dest))
    {
        const stat = await fs.stat(dest)

        if (stat.isDirectory())
        {
            await fs.rmdir(dest)
        }
        else if (delete_first)
        {
            await fs.unlink(dest)
        }
    }

    all.push(fs.copyFile(source, dest))
}