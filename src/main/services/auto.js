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

    ipcMain.handle("del_driver", async (event, name) =>
    {
        core.del_driver(name)

        core.save()

        return name
    })

    ipcMain.handle("del_applet", async (event, id) =>
    {
        core.del_applet(id)

        core.save()

        return id
    })

    ipcMain.handle("update_applet", async (event, config) =>
    {
        const one = core.update_applet(config)

        core.save()

        return one.save()
    })

    ipcMain.handle("update_driver", async (event, config) =>
    {
        const one = core.update_driver(config)

        core.save()

        return one.save()
    })

    ipcMain.handle("operate_driver", async (event, name, op) =>
    {
        console.log("operate_driver", name, op)

        const one = core.drivers[name]
        if (one == null)
        {
            return
        }
        console.log("operate_driver", name, op, one.state)

        if (op == "start" && one.state == "running")
        {
            return one.state
        }

        if (op == "stop" && one.state != "running")
        {
            return one.state
        }

        try
        {
            await one[op]()

            core.save()
        }
        catch (err)
        {
            console.log(err)
            return one.state
        }
        return one.state

    })

    ipcMain.handle("operate_applet", async (event, id, op) =>
    {
        const one = core.applets[id]
        if (one == null)
        {
            return
        }

        console.log("operate_applet", id, op, one.state)

        if (op == "start" && one.state == "running")
        {
            return one.state
        }

        if (op == "stop" && one.state != "running")
        {
            return one.state
        }

        try
        {
            await one[op]()

            core.save()
        }
        catch (err)
        {
            return one.state
        }
        return one.state
    })

    ipcMain.handle("trigger_ui", async (event, ui) =>
    {
        const driver = core.drivers.ui

        if (driver == null || driver.state != "running")
        {
            return false
        }

        driver.inst.emit(ui)

        return true
    })
}