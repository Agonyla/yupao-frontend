<script setup lang="ts">
import {useRoute} from "vue-router";
import {ref} from "vue";

const route = useRoute()
const {tags} = route.query
console.log(tags)


const mockUser = [
  {
    id: 1,
    username: 'Agony',
    userAccount: 'Agony',
    profile: '一条咸鱼',
    gender: 1,
    phone: '123456789101',
    email: '1197134883@qq.com',
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
    email: '1197134883@qq.com',
    planetCode: '2',
    avatarUrl: 'https://avatars.githubusercontent.com/u/24363384?v=4',
    tags: ['java', 'emo', '摸鱼中'],
    createTime: new Date(),
  }]

const userList = ref(mockUser)
</script>

<template>
  <van-card
      v-for="user in userList"
      :desc="user.profile"
      :title="user.username"
      :thumb="user.avatarUrl"
  >
    <template #tags>
      <van-tag v-for="tag in user.tags" plain type="primary" style="margin-right: 8px; margin-top: 8px">
        {{ tag }}
      </van-tag>
    </template>
    <template #footer>
      <van-button size="mini">联系我</van-button>
    </template>
  </van-card>

</template>

<style scoped>

</style>