import Vue from "vue"

export default {

    init_template(state, template)
    {
        state.template = template
    },

    new_driver(state, data)
    {
        Vue.set(state.drivers, data.name, data)

    },

    change_driver_state(state, data)
    {
        const driver = state.drivers[data.name]
        if (driver == null)
        {
            return
        }

        driver.state = data.state
    },

    del_driver(state, name)
    {
        Vue.delete(state.drivers, name)
    },

    new_applet(state, data)
    {
        Vue.set(state.applets, data.id, data)
    },
    change_applet_state(state, data)
    {
        const applet = state.applets[data.id]
        if (applet == null)
        {
            return
        }

        applet.state = data.state
    },

    del_applet(state, id)
    {
        Vue.delete(state.applets, id)

        console.log("after del", state.applets)
    },
    update_driver(state, data)
    {
        const driver = state.drivers[data.template.name]

        driver.load(data)
    },

    update_applet(state, data)
    {
        const applet = state.applets[data.id]

        applet.load(data)
    },

}