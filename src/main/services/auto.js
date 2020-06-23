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

            ret.applets[key] = { template: one.template.package.name, ...one.options, state: one.state }
        }

        for (let key in core.drivers)
        {
            let one = core.drivers[key]

            ret.drivers[key] = { template: one.template.package.name, ...one.options, state: one.state }
        }

        console.log("---------------get all---------------")

        return ret
    })
}