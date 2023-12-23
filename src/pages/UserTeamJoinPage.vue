<script setup lang="ts">
import {useRouter} from "vue-router";
import TeamCardList from "../components/TeamCardList.vue";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {showFailToast} from "vant";

const router = useRouter()
const doJoinTeam = () => {
  router.push({
    path: "/team"
  })
}

const teamList = ref([])
const searchText = ref("")

const listTeams = async (val = "", status = 0) => {
  const res = await myAxios.get("/team/list/my/join", {
    params: {
      searchText: val,
      pageNum: 1,
      status,
    },
  });
  if (res?.code === 0 && res.data) {
    teamList.value = res.data;
  } else {
    showFailToast("队伍加载失败");
  }
}
const onSearch = (val) => {
  listTeams(val)
}

onMounted(() => {
  listTeams();
})

</script>

<template>
  <!-- 搜索队伍 -->
  <van-search
      v-model="searchText"
      placeholder="搜索队伍"
      @search="onSearch"
  />
  <van-button type="primary" block @click="doJoinTeam">加入队伍</van-button>
  <team-card-list :team-list="teamList"/>
  <van-empty v-if="!teamList||teamList.length<1" description="搜索结果为空"/>

</template>

<style scoped>

</style>