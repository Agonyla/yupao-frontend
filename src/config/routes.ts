import Index from "../pages/Index.vue";
import Team from "../pages/TeamPage.vue";
import User from "../pages/UserPage.vue";
import SearchPage from "../pages/SearchPage.vue";
import UserEdit from "../pages/UserEditPage.vue";
import SearchResultPage from "../pages/SearchResultPage.vue";
import UserLoginPage from "../pages/UserLoginPage.vue";
import TeamAddPage from "../pages/TeamAddPage.vue";
import TeamUpdatePage from "../pages/TeamUpdatePage.vue";
import UserTeamCreatePage from "../pages/UserTeamCreatePage.vue";
import UserTeamJoinPage from "../pages/UserTeamJoinPage.vue";
import UserUpdatePage from "../pages/UserUpdatePage.vue";

const routes = [
    {path: '/', component: Index},
    {path: '/index', title: '主页', component: Index},
    {path: '/team', title: '队伍搜索', component: Team},
    {path: '/team/add', title: '创建队伍', component: TeamAddPage},
    {path: '/team/update', title: '更新队伍', component: TeamUpdatePage},
    {path: '/search', title: '伙伴搜索', component: SearchPage},
    {path: '/user', title: '个人信息', component: User},
    {path: '/user/edit', title: '编辑信息', component: UserEdit},
    {path: '/user/list', title: '用户列表', component: SearchResultPage},
    {path: '/user/login', title: '用户登录', component: UserLoginPage},
    {path: '/user/update', title: '更新信息', component: UserUpdatePage},
    {path: '/user/team/create', title: '我创建的队伍', component: UserTeamCreatePage},
    {path: '/user/team/join', title: '我加入的队伍', component: UserTeamJoinPage},
]


export default routes