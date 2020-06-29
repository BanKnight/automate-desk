import ipc from "../utils/ipcRenderer"

function handle_applet(applet, template)
{
    applet.condition = {
        name: applet.options.condition.name,
        options: applet.options.condition.options,
    }

    applet.condition.template = template.condition[applet.condition.name]

    applet.actions = []

    for (let action of applet.options.actions)
    {
        action.template = template.action[action.name]
    }
}

export default {
    async get_all({ commit })
    {
        const app = await ipc.invoke("get_all")

        for (let id in app.applets)
        {
            const one = app.applets[id]

            handle_applet(one, app.template)
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

        handle_applet(one, template)

        commit("new_applet", one)
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

        const template = state.template

        handle_applet(one, template)

        commit("update_applet", one)
    },
}