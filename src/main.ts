import {createApp} from 'vue'
import App from './App.vue'
import 'vant/lib/index.css';
import Vant from 'vant';
import routes from "./config/routes.ts";

const app = createApp(App)
app.use(Vant)
app.use(routes)
app.mount('#app')

