<script setup lang="ts">
import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {showFailToast, showSuccessToast} from "vant";
import UserCardList from "../components/UserCardList.vue";

const route = useRoute()

const userList = ref([])

onMounted(async () => {
  const userListData = await myAxios.get("/user/recommend", {
    // withCredentials: false,
    params: {
      pageSize: 8,
      pageNumber: 1,
    },
  }).then(function (response) {
    console.log("/user/recommend succeed", response)
    showSuccessToast("请求成功")
    console.log(response?.data)
    return response?.data?.records;
  }).catch(function (error) {
    console.log("/user/recommend failed ", error)
    showFailToast("请求失败")
  })
  // console.log(userListData, "=====================")
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
</template>

<style scoped>

</style>