import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Echarts from '../components/Echarts.vue'
import CityPointEchart from '../components/CityPointEchart'
import TeleportInCityEchart from '../components/TeleportInCityEchart'
import TeleportInSingleCityEchart from '../components/TeleportInSingleCityEchart'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/Echarts',
    name: 'Echarts',
    component: Echarts
  },
  {
    path: '/CityPointEchart',
    name: 'CityPointEchart',
    component: CityPointEchart
  },
  {
    path: '/TeleportInCityEchart',
    name: 'TeleportInCityEchart',
    component: TeleportInCityEchart
  },
  {
    path: '/TeleportInSingleCityEchart',
    name: 'TeleportInSingleCityEchart',
    component: TeleportInSingleCityEchart
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
