import { ipcMain } from 'electron'
import core from "../core"

export default function ()
{
    ipcMain.handle("get_all", async () =>
    {
        const ret = {
            template: {
                driver: {},
                condition: {},
                action: {},
            },
            applets: {},
            drivers: {},
        }

        for (let type in core.template)
        {
            let types = core.template[type]
            let target = ret.template[type]

            for (let name in types)
            {
                target[name] = types[name].package
            }
        }

        for (let key in core.applets)
        {
            let one = core.applets[key]

            ret.applets[key] = one.save()
        }

        for (let key in core.drivers)
        {
            let one = core.drivers[key]

            ret.drivers[key] = one.save()
        }

        return ret
    })

    ipcMain.handle("new_driver", async (event, config) =>
    {
        const one = core.new_driver(config)

        one.start()

        core.save()

        return one.save()
    })

    ipcMain.handle("new_applet", async (event, config) =>
    {
        const one = core.new_applet(config)

        one.start()

        core.save()

        return one.save()
    })

    ipcMain.handle("del_applet", async (event, id) =>
    {
        core.del_applet(id)

        return id
    })

    ipcMain.handle("update_applet", async (event, config) =>
    {
        const one = core.update_applet(config)

        return one.save()
    })
}