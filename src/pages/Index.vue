<script setup lang="ts">
import {useRoute} from "vue-router";
import {ref, watchEffect} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {showFailToast, showSuccessToast} from "vant";
import UserCardList from "../components/UserCardList.vue";
import {UserType} from "../model/user";

const route = useRoute()

const userList = ref([])

const isMatchMode = ref<boolean>(false)
const loading = ref(true)

const loadData = async () => {
  let userListData;
  loading.value = true;
  // 心动模式，根据标签匹配用户
  if (isMatchMode.value) {
    const num = 10;
    userListData = await myAxios.get("/user/match", {
      params: {
        num,
      }
    }).then(response => {
      console.log('/user/match succeed', response)
      return response?.data;
    }).catch(error => {
      console.log('/user/match error', error)
      showFailToast("请求失败")
    })
  } else {
    userListData = await myAxios.get("/user/recommend", {
      // withCredentials: false,
      params: {
        pageSize: 8,
        pageNumber: 1,
      },
    }).then(function (response) {
      console.log("/user/recommend succeed", response)
      showSuccessToast("请求成功")
      return response?.data?.records;
    }).catch(function (error) {
      console.log("/user/recommend failed ", error)
      showFailToast("请求失败")
    })
  }
  if (userListData) {
    userListData.forEach((user: UserType) => {
      user.tags = JSON.parse(user.tags)
    })
    userList.value = userListData
  }
  loading.value = false;
}

watchEffect(() => {
  loadData();
})


</script>

<template>
  <van-cell title="心动模式">
    <template #right-icon>
      <van-switch v-model="isMatchMode" size="24"/>
    </template>
  </van-cell>
  <user-card-list :user-list="userList" :loading="loading"/>
</template>

<style scoped>

</style>