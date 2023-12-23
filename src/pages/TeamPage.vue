<script setup lang="ts">
import {useRouter} from "vue-router";
import TeamCardList from "../components/TeamCardList.vue";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {showFailToast} from "vant";

const router = useRouter()
const doJoinTeam = () => {
  router.push({
    path: "/team/add"
  })
}

const teamList = ref([])

onMounted(async () => {
  const res = await myAxios.get("/team/list");
  if (res?.code === 0 && res.data) {
    teamList.value = res.data;
  } else {
    showFailToast("队伍加载失败");
  }
})

</script>

<template>
  <van-button type="primary" block @click="doJoinTeam">加入队伍</van-button>
  <team-card-list :team-list="teamList"/>

</template>

<style scoped>

</style>