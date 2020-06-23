import ipc from "../utils/ipcRenderer"

export default {
    async get_all({ commit })
    {
        const ret = await ipc.invoke("get_all")

        console.dir(ret)

        commit("init", ret)
    },

    async new_driver({ commit }, config)
    {
        const ret = await ipc.invoke("new_driver", config)

        commit("new_driver", ret)
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