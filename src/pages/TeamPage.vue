<script setup lang="ts">
import {useRouter} from "vue-router";

const router = useRouter()
const doJoinTeam = () => {
  router.push({
    path: "/team/add"
  })
}

</script>

<template>
  <van-button type="primary" block @click="doJoinTeam">加入队伍</van-button>
</template>

<style scoped>

</style>