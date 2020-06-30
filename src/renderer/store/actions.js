import ipc from "../utils/ipcRenderer"

import Applet from "@/core/Applet"
import Driver from "@/core/Driver"

export default {
    async get_all({ commit, state })
    {
        const app = await ipc.invoke("get_all")

        commit("init_template", app.template)

        console.log("get all", app)

        for (let id in app.applets)
        {
            const options = app.applets[id]

            const applet = new Applet(state)

            applet.load(options)

            commit("new_applet", applet)
        }

        for (let name in app.drivers)
        {
            const options = app.drivers[name]

            const driver = new Driver(state)

            driver.load(options)

            commit("new_driver", driver)
        }

    },

    async new_driver({ commit, state }, config)
    {
        const options = await ipc.invoke("new_driver", config)

        const driver = new Driver(state)

        driver.load(options)

        commit("new_driver", driver)
    },

    async new_applet({ commit, state }, config)
    {
        console.log("new_applet", config)

        const options = await ipc.invoke("new_applet", config)

        const applet = new Applet(state)

        applet.load(options)

        commit("new_applet", applet)
    },

    async del_applet({ commit }, id)
    {
        await ipc.invoke("del_applet", id)

        console.log("del_applet", id)

        commit("del_applet", id)
    },

    async update_driver({ commit }, config)
    {
        const ret = await ipc.invoke("update_driver", config)

        commit("update_driver", ret)
    },

    async update_applet({ commit, state }, config)
    {
        const one = await ipc.invoke("update_applet", config)

        commit("update_applet", one)
    },
}
