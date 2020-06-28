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

        return one.save()
    })
}