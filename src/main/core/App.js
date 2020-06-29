const path = require("path")
const fs = require("fs")

import TAction from "./template/TAction"
import TCondition from "./template/TCondition"
import TDriver from "./template/TDriver"

import Driver from "./Driver"
import Applet from "./Applet"

import electron from "electron"

export default class App
{
    constructor()
    {
        this.template = {
            action: {},
            condition: {},
            driver: {},
        }

        this.applets = {}               //[id] = {}
        this.drivers = {}               //[name]

        this.config_path = path.join(electron.app.getPath('userData'), "config.json")
    }

    load()
    {
        {
            let parent = path.join(__static, "driver")
            let files = fs.readdirSync(parent).sort()

            for (let file of files)
            {
                const sub = path.join(parent, file)

                const template = new TDriver(file, sub)

                template.load()

                this.template.driver[file] = template
            }
        }

        {
            let parent = path.join(__static, "condition")
            let files = fs.readdirSync(parent).sort()

            for (let file of files)
            {
                const sub = path.join(parent, file)

                const template = new TCondition(file, sub)

                template.load()

                this.template.condition[file] = template
            }
        }

        {
            let parent = path.join(__static, "action")
            let files = fs.readdirSync(parent).sort()

            for (let file of files)
            {
                const sub = path.join(parent, file)

                const template = new TAction(file, sub)

                template.load()

                this.template.action[file] = template
            }
        }

        if (fs.existsSync(this.config_path) == true)
        {
            const config = JSON.parse(fs.readFileSync(this.config_path, "utf-8"))

            console.log("load config", this.config_path)

            this.update(config)
        }

        // {
        //     const data = {
        //         applets: [],
        //         drivers: [],
        //     }

        //     for (let name in this.template.driver)
        //     {
        //         let one = this.template.driver[name]

        //         data.drivers.push({
        //             name: name,
        //             state: "init",
        //             options: {}
        //         })
        //     }

        //     this.update(data)
        // }
    }

    save()
    {
        const config = {
            drivers: [],
            applets: [],
        }

        for (let id in this.applets)
        {
            let applet = this.applets[id]

            let data = applet.save()

            config.applets.push(data)
        }

        for (let name in this.drivers)
        {
            let driver = this.drivers[name]

            let data = driver.save()

            config.drivers.push(data)
        }

        fs.writeFileSync(this.config_path, JSON.stringify(config))
    }

    update(config)
    {
        for (let id in this.applets)
        {
            let applet = this.applets[id]

            if (applet.state == "running")
            {
                applet.stop()
            }
        }

        for (let name in this.drivers)
        {
            let driver = this.drivers[name]

            if (driver.state == "running")
            {
                driver.stop()
            }
        }

        this.applets = {}
        this.drivers = {}

        for (let cf_one of config.drivers)
        {
            const driver = this.new_driver(cf_one)

            if (cf_one.state == "running")
            {
                driver.start()
            }
        }

        for (let cf_one of config.applets)
        {
            const applet = this.new_applet(cf_one)

            if (cf_one.state == "running")
            {
                applet.start()
            }
        }

        this.save()
    }
    new_driver(config)
    {
        const template = this.template.driver[config.name]

        console.log("new driver", config.name, template)
        console.dir(config)

        const driver = new Driver(template, config.options, this)

        this.drivers[config.name] = driver

        return driver
    }

    new_applet(config)
    {
        console.log("new_applet", config)

        const applet = new Applet(config, this)

        this.applets[applet.id] = applet

        return applet
    }

    del_applet(id)
    {
        console.log("del_applet", id)

        const applet = this.applets[id]
        if (applet == null)
        {
            return
        }

        if (applet.state == "running")
        {
            applet.stop()
        }

        delete this.applets[id]

        this.save()

        return applet
    }

    update_driver(config)
    {
        let driver = this.drivers[config.name]

        if (driver && driver.state == "running")
        {
            driver.stop()
        }

        delete this.drivers[config.name]

        driver = this.new_driver(config.name, config.input)

        if (config.state == "running")
        {
            driver.start()
        }

        this.save()

        return driver
    }

    update_applet(config)
    {
        let one = this.applets[config.id]

        let should_start = false

        if (one && one.state == "running")
        {
            should_start = true
            one.stop()
        }

        delete this.applets[config.id]

        one = this.new_applet(config)

        if (one && should_start)
        {
            one.start()
        }

        this.save()

        return one
    }

    uninit()
    {

    }
}
