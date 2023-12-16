<script setup lang="ts">

import {UserType} from "../assets/user";
import {useRouter} from "vue-router";

const router = useRouter()
const user: UserType = {
  username: "Agony",
  userAccount: "Agony",
  avatarUrl: "https://avatars.githubusercontent.com/u/120792979?s=400&u=024d55b340dc357b1e803d81d8cc363e24372d30&v=4",
  gender: 1,
  phone: "123",
  email: "Agony@qq.com",
  planetCode: "1",
  createTime: new Date(),
}

const toEdit = (editKay: string, editName: string, currentValue: string | number | undefined) => {
  router.push({
    path: "/user/edit",
    query: {
      editKay,
      editName,
      currentValue
    }
  })
}

</script>

<template>
  <van-cell title="用户名" is-link to="/user/edit" :value="user.username"
            @click="toEdit('username','用户名',user.username)"/>
  <van-cell title="账户" :value="user.userAccount"/>
  <van-cell title="头像" is-link to="/user/edit" :value="user.avatarUrl"
            @click="toEdit('avatarUrl','头像',user.avatarUrl)">
    <van-image
        width="100"
        height="100"
        :src="user.avatarUrl"
    />
  </van-cell>
  <van-cell title="性别" is-link to="/user/edit" :value="user.gender"
            @click="toEdit('gender','性别',user.gender)"/>
  <van-cell title="电话" is-link to="/user/edit" :value="user.phone"
            @click="toEdit('phone','电话',user.phone)"/>
  <van-cell title="邮箱" is-link to="/user/edit" :value="user.email"
            @click="toEdit('email','邮箱',user.email)"/>
  <van-cell title="星球编号" :value="user.planetCode"/>
  <van-cell title="注册时间" :value="user.createTime.toLocaleDateString()"/>

</template>

<style scoped>

</style>