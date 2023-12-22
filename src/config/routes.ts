import * as VueRouter from 'vue-router';
import Index from "../pages/Index.vue";
import Team from "../pages/TeamPage.vue";
import User from "../pages/UserPage.vue";
import SearchPage from "../pages/SearchPage.vue";
import UserEdit from "../pages/UserEditPage.vue";
import SearchResultPage from "../pages/SearchResultPage.vue";
import UserLoginPage from "../pages/UserLoginPage.vue";
import TeamAddPage from "../pages/TeamAddPage.vue";

const routes = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes: [
        {path: '/', component: Index},
        {path: '/index', component: Index},
        {path: '/team', component: Team},
        {path: '/team/add', component: TeamAddPage},
        {path: '/user', component: User},
        {path: '/search', component: SearchPage},
        {path: '/user/edit', component: UserEdit},
        {path: '/user/list', component: SearchResultPage},
        {path: '/user/login', component: UserLoginPage},
    ]
})

export default routes