<script setup lang="ts">

import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {showFailToast, showSuccessToast} from "vant";
import {getCurrnetUser} from "../services/user.ts";
import myAxios from "../plugins/myAxios.ts";

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

const doLogout = async () => {
  const res = await myAxios.post('/user/logout', {})
  if (res?.code === 0) {
    showSuccessToast("退出登录成功")
    router.push({
      path: '/user/login'
    })
  } else {
    showFailToast("退出登录失败")
  }
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
    <van-cell title="当前用户" :value="user.username"/>
    <div style="text-align: center">
      <van-image
          round
          width="10rem"
          height="10rem"
          position="center"
          :src="user.avatarUrl"
      />
    </div>
    <van-cell title="修改信息" is-link to="/user/update"/>
    <van-cell title="我创建的队伍" is-link to="/user/team/create"/>
    <van-cell title="我加入的队伍" is-link to="/user/team/join"/>

    <van-button
        type="primary"
        block
        @click="doLogout"
        style="top: 40px"
    >退出登录
    </van-button>
  </div>

</template>

<style scoped>

</style>