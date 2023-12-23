<script setup lang="ts">

import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {showFailToast, showSuccessToast} from "vant";
import {getCurrnetUser} from "../services/user.ts";

const router = useRouter()
// const user: UserType = {
//   username: "Agony",
//   userAccount: "Agony",
//   avatarUrl: "https://avatars.githubusercontent.com/u/120792979?s=400&u=024d55b340dc357b1e803d81d8cc363e24372d30&v=4",
//   gender: 1,
//   phone: "123",
//   email: "Agony@qq.com",
//   planetCode: "1",
//   createTime: new Date(),
// }
const user = ref()
const formattedDate = ref()
const toEdit = (editKey: string, editName: string, currentValue: string | number | undefined) => {
  router.push({
    path: "/user/edit",
    query: {
      editKey,
      editName,
      currentValue
    }
  })
}

// 从后端获取用户信息
onMounted(async () => {
  const res = await getCurrnetUser()
  // const res = await myAxios.get("/user/current");
  // console.log(res)
  if (res) {
    showSuccessToast("请求成功")
    user.value = res;
    // 日期格式设置
    const userDate = new Date(user.value.createTime)
    formattedDate.value = userDate.getFullYear() + '-' +
        ('0' + (userDate.getMonth() + 1)).slice(-2) + '-' +
        ('0' + userDate.getDate()).slice(-2);
    // console.log(formattedDate)
  } else {
    showFailToast("请求失败")
  }

})


</script>

<template>
  <div v-if="user">
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
    <van-cell title="注册时间" :value="formattedDate"/>

    <van-cell title="修改信息" is-link to="/user/update"/>
    <van-cell title="我创建的队伍" is-link to="/team/create"/>
    <van-cell title="我加入的队伍" is-link to="/team/join"/>
  </div>

</template>

<style scoped>

</style>