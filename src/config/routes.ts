import * as VueRouter from 'vue-router';
import Index from "../pages/Index.vue";
import Team from "../pages/TeamPage.vue";
import User from "../pages/UserPage.vue";
import SearchPage from "../pages/SearchPage.vue";

const routes = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes: [
        {
            path: '/index',
            component: Index
        },
        {
            path: '/team',
            component: Team
        },
        {
            path: '/user',
            component: User
        },
        {
            path: '/search',
            component: SearchPage
        }
    ]
})

export default routes