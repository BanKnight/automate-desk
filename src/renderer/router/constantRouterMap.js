import Layout from '@/layout'

import drivers from "@/views/drivers"
import applets from "@/views/applets"

import new_applet from "@/views/new_applet"

export default [
  {
    path: '/', component: Layout,
    redirect: "/applets",
    children: [
      {
        path: 'applets',
        name: "applets",

        component: applets,
        meta: {
          title: "Applets"
        }
      },
      {
        path: 'drivers',
        name: "drivers",
        component: drivers,
        meta: {
          title: "Drivers"
        }
      },
    ]
  },
  {
    path: "/add_applets",
    name: "new_applet",
    component: new_applet
  }

]
