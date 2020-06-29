const path = require("path")
const fs = require("fs")

import TAction from "./template/TAction"
import TCondition from "./template/TCondition"
import TDriver from "./template/TDriver"

import Driver from "./Driver"
import Applet from "./Applet"

export default class App
{
    constructor()
    {
        this.template = {
            action: {},
            condition: {},
            driver: {},
        }

        this.config = null
        this.applets = {}               //[id] = {}
        this.drivers = {}               //[name]
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

        this.config = config
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

        return driver
    }

    update_applet(config)
    {
        let one = this.applets[config.id]

        if (one && one.state == "running")
        {
            one.stop()
        }

        delete this.applets[config.id]

        one = this.new_applet(config)

        if (one && config.state == "running")
        {
            one.start()
        }

        return one
    }

    uninit()
    {

    }
}
