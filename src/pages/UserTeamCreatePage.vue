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
const searchText = ref("")

const listTeams = async (val = "", status = 0) => {
  const res = await myAxios.get("/team/list/my/create", {
    params: {
      searchText: val,
      pageNum: 1,
      status,
    },
  });
  console.log("============", res.data)
  if (res?.code === 0) {
    teamList.value = res.data;
  } else {
    showFailToast("队伍加载失败");
  }
}
const onSearch = (val: string) => {
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
  <van-button type="primary" block @click="doJoinTeam">创建队伍</van-button>
  <team-card-list :team-list="teamList"/>
  <van-empty v-if="!teamList||teamList.length<1" description="搜索结果为空"/>

</template>

<style scoped>

</style>