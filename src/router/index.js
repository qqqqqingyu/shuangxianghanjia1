import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/Login.vue'
import MainPage from '../views/MainPage.vue'
import Classify from "@/views/Classify";
 import PublishActivity from "@/views/PublishActivity";
import Trade from "@/views/Trade";
import Trade2 from "@/views/Trade2";
import Trade3 from "@/views/Trade3";

import ActivitySquare from "../views/ActivitySquare";
import Check from "../views/Check";
import MyTrade from "@/views/MyTrade";
import AppTest from '../views/AppTest.vue'



const routes = [
  {
    path: '/PublishActivity',
    name: 'PublishActivity',
    component: PublishActivity
  },
  {
    path: '/',
    name: 'ActivitySquare',
    component: ActivitySquare
  },
  {
    path: '/Trade',
    name: 'Trade',
    component: Trade
  },
  {
    path: '/Trade2',
    name: 'Trade2',
    component: Trade2
  },
  {
    path: '/Trade3',
    name: 'Trade3',
    component: Trade3
  },
  {
    path:'/Check',
    name:'Check',
    component:Check
  },
  {
    path:'/MyTrade',
    name:'MyTrade',
    component:MyTrade
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login
  },
  {
    path: '/MainPage',
    name: 'MainPage',
    component: MainPage
  },
  {
    path: '/Classify',
    name: 'Classify',
    component: Classify
  },
  {
    path:'/AppTest',
    name:'AppTest',
    component:AppTest
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass:"active"
})

export default router