import {createApp} from 'vue'
import App from './App.vue'
import 'vant/lib/index.css';
import Vant from 'vant';
import routes from "./config/routes.ts";
import * as VueRouter from "vue-router";
import './global.css'

const app = createApp(App)
app.use(Vant)
const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes,
})
app.use(router)
app.mount('#app')

