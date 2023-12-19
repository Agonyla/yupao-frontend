<script setup lang="ts">
import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {showFailToast, showSuccessToast} from "vant";
import qs from "qs"
import UserCardList from "../components/UserCardList.vue";

const route = useRoute()
const {tags} = route.query

const mockUser = [
  {
    id: 1,
    username: 'Agony',
    userAccount: 'Agony',
    profile: '一条咸鱼',
    gender: 1,
    phone: '123456789101',
    email: 'xxxxxxx@qq.com',
    planetCode: '1',
    avatarUrl: 'https://avatars.githubusercontent.com/u/120792979?s=400&u=024d55b340dc357b1e803d81d8cc363e24372d30&v=4',
    tags: ['java', 'emo', '摸鱼中'],
    createTime: new Date(),
  },
  {
    id: 2,
    username: 'Rookie',
    userAccount: 'Rookie',
    profile: '小小菜鸡',
    gender: 0,
    phone: '123456789101',
    email: 'xxxxxxxx@qq.com',
    planetCode: '2',
    avatarUrl: 'https://avatars.githubusercontent.com/u/24363384?v=4',
    tags: ['java', 'emo', '摸鱼中'],
    createTime: new Date(),
  }]
const userList = ref([])

onMounted(async () => {
  const userListData = await myAxios.get("/user/search/tags", {
    // withCredentials: false,
    params: {
      tagNameList: tags
    },
    paramsSerializer: {
      serialize: params => qs.stringify(params, {indices: false}),
    }
  }).then(function (response) {
    console.log("/user/search/tags succeed ", response)
    showSuccessToast("请求成功")
    // console.log(response.data.data, typeof response.data.data)
    return response?.data
  }).catch(function (error) {
    console.log("/user/search/tags succeed ", error)
    showFailToast("请求失败")
  })

  // console.log("userListData: ", userListData)
  if (userListData) {
    userListData.forEach(user => {
      user.tags = JSON.parse(user.tags)
    })
    userList.value = userListData
  }
})

</script>

<template>
  <user-card-list :user-list="userList"/>
  <van-empty v-if="!userList||userList.length<1" description="搜索结果为空"/>
</template>

<style scoped>

</style>