import ipc from "../utils/ipcRenderer"

export default {
    async get_all({ commit })
    {
        const app = await ipc.invoke("get_all")

        for (let id in app.applets)
        {
            const one = app.applets[id]

            one.condition = {
                name: one.options.condition.name,
                options: one.options.condition.options,
            }

            one.condition.template = app.template.condition[one.condition.name]

            one.actions = []

            for (let action of one.options.actions)
            {
                action.template = app.template.action[action.name]
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

    async new_applet({ commit, state }, config)
    {
        console.log("new_applet", config)

        const one = await ipc.invoke("new_applet", config)

        const template = state.template

        one.condition = {
            name: one.options.condition.name,
            options: one.options.condition.options,
        }

        one.condition.template = template.condition[one.condition.name]

        one.actions = []

        for (let action of one.options.actions)
        {
            action.template = template.action[action.name]
        }

        commit("new_applet", one)
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