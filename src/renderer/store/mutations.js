import Vue from "vue"

export default {

    init(state, data)
    {
        state.template = data.template
        state.drivers = data.drivers
        state.applets = data.applets
    },

    new_driver(state, data)
    {
        state.drivers[data.template.name] = data
    },

    new_applet(state, data)
    {
        state.applets[data.id] = data
    },

    del_applet(state, id)
    {
        Vue.delete(state.applets, id)

        console.log("after del", state.applets)
    },
    update_driver(state, data)
    {
        state.drivers[data.template.name] = data
    },

    update_applet(state, data)
    {
        state.applets[data.id] = data
    },
}