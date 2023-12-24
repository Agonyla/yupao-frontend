<script setup lang="ts">
import {showToast} from 'vant';
import {ref} from "vue";
import {useRouter} from "vue-router"
import routes from "../config/routes.ts";

const router = useRouter()

const DEFAULT_TITLE = '伙伴匹配'
const title = ref(DEFAULT_TITLE)

/**
 * 根据路由切换标题
 */
router.beforeEach((to, from) => {
  const toPath = to.path;
  const route = routes.find((route) => {
    return toPath == route.path;
  })
 

  title.value = route?.title ?? DEFAULT_TITLE;
})
const onClickLeft = () => {
  router.back()
}
const onClickRight = () => {
  router.push("/search")
}

const active = ref('')

const onChange = () => {
  showToast(active.value)
}

</script>

<template>
  <!--  Navbar 导航栏-->
  <van-nav-bar
      :title="title"
      right-text="按钮"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
  >
    <template #right>
      <van-icon name="search" size="18"/>
    </template>
  </van-nav-bar>

  <!--  内容-->
  <div id="content">
    <router-view/>
  </div>

  <!--  Tabb-ar 标签栏-->
  <van-tabbar v-model="active" @change="onChange">
    <van-tabbar-item to="/index" icon="home-o" name="index">主页</van-tabbar-item>
    <van-tabbar-item to="/team" icon="search" name="team">队伍</van-tabbar-item>
    <van-tabbar-item to="/user" icon="friends-o" name="user">个人</van-tabbar-item>
  </van-tabbar>

</template>

<style scoped>
#content {
  padding-bottom: 60px;
}
</style>