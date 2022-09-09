import { createRouter, createWebHashHistory } from 'vue-router'
import Classify from "@/views/Classify";
import PublishActivity from "@/views/PublishActivity";
import Trade from "@/views/Trade";
import Trade2 from "@/views/Trade2";
import Trade3 from "@/views/Trade3";

import ActivitySquare from "../views/ActivitySquare";
import Check from "../views/Check";
import MyTrade from "@/views/MyTrade";
import MyActivity from "../views/MyActivity";
import Liquidation from "../views/Liquidation";
import Homepage from "../views/Homepage";
import FloatBall from "../components/FloatBall";


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
    path: '/Classify',
    name: 'Classify',
    component: Classify
  },
  {
    path: '/MyActivity',
    name:'MyActivity',
    component: MyActivity
  },
  {
    path: '/Liquidation',
    name:'Liquidation',
    component: Liquidation
  },
  {
    path: '/Homepage',
    name:'Homepage',
    component: Homepage
  },
  {
    path: '/FloatBall',
    name:'FloatBall',
    component: FloatBall
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass:"active"
})

export default router