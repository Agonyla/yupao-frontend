import * as VueRouter from 'vue-router';
import Index from "../pages/Index.vue";
import Team from "../pages/TeamPage.vue";
import User from "../pages/UserPage.vue";
import SearchPage from "../pages/SearchPage.vue";
import UserEdit from "../pages/UserEdit.vue";

const routes = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes: [
        {path: '/', component: Index},
        {path: '/index', component: Index},
        {path: '/team', component: Team},
        {path: '/user', component: User},
        {path: '/search', component: SearchPage},
        {path: '/user/edit', component: UserEdit},
    ]
})

export default routes