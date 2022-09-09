import { createApp } from 'vue'
import App from './App.vue'
import router from './router'  //引入路由器
import store from './store'  
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import 'element-plus/lib/theme-chalk/display.css';
import './assets/font/iconfont.css';


// import axios from "axios";
//
// axios.defaults.headers.common['Authorization'] = store.state.token
createApp(App).use(store).use(router).use(ElementPlus).mount('#app')
