<script setup lang="ts">
import {useRouter} from "vue-router";
import TeamCardList from "../components/TeamCardList.vue";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {showFailToast} from "vant";

const router = useRouter()
const teamList = ref([])
const searchText = ref("")
const active = ref('public');

const doJoinTeam = () => {
  router.push({
    path: "/team/add"
  })
}

const listTeams = async (val = "", status = 0) => {
  const res = await myAxios.get("/team/list", {
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
const onSearch = (val: string) => {
  listTeams(val)
}

onMounted(() => {
  listTeams();
})


const onTabChange = (name: string) => {
  if (name === 'public') {
    listTeams(searchText.value, 0)
  } else {
    listTeams(searchText.value, 2)
  }


}

</script>

<template>
  <!-- 搜索队伍 -->
  <van-search
      v-model="searchText"
      placeholder="搜索队伍"
      @search="onSearch"
  />

  <van-tabs v-model:active="active" animated @change="onTabChange">
    <van-tab title="公开" name="public"></van-tab>
    <van-tab title="加密" name="secret"></van-tab>
  </van-tabs>
  <div style="margin-bottom: 16px"/>

  <van-button class="add-button" type="primary" icon="plus" @click="doJoinTeam"></van-button>
  <team-card-list :team-list="teamList"/>
  <van-empty v-if="!teamList||teamList.length<1" description="搜索结果为空"/>

</template>

<style scoped>

</style>