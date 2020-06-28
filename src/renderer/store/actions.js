import ipc from "../utils/ipcRenderer"

export default {
    async get_all({ commit })
    {
        const app = await ipc.invoke("get_all")

        for (let id in app.applets)
        {
            const one = app.applets[id]

            one.template = app.template.condition[one.template]

            for (let action of one.actions)
            {
                action.template = app.template.action[action.template]
            }
        }

        for (let name in app.drivers)
        {
            const one = app.drivers[name]

            one.template = app.template.driver[one.template]
        }

        console.dir(app)

        commit("init", app)
    },

    async new_driver({ commit, state }, config)
    {

        const one = await ipc.invoke("new_driver", config)

        const template = state.template

        one.template = template.driver[one.template]

        commit("new_driver", one)
    },

    async new_applet({ commit }, config)
    {
        const ret = await ipc.invoke("new_applet", config)

        commit("new_applet", ret)
    },

    async del_applet({ commit }, id)
    {
        const ret = await ipc.invoke("del_applet", id)

        commit("del_applet", ret)
    },

    async update_driver({ commit }, config)
    {
        const ret = await ipc.invoke("update_driver", config)

        commit("update_driver", ret)
    },

    async update_applet({ commit }, config)
    {
        const ret = await ipc.invoke("update_applet", config)

        commit("update_applet", ret)
    },
}