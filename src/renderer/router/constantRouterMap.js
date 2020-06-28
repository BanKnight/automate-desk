import Layout from '@/layout'

import drivers from "@/views/drivers"
import applets from "@/views/applets"

import new_applet from "@/views/new_applet"
import new_driver from "@/views/new_driver"

export default [
  {
    path: '/', component: Layout,
    name: "home",
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
    path: "/new_applet",
    name: "new_applet",
    component: new_applet
  },
  {
    path: "/new_driver",
    name: "new_driver",
    component: new_driver
  },
]
