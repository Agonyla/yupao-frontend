<script setup lang="ts">


import {TeamType} from "../model/team";
import {TeamStatusEnum} from "../constans/team.ts";

interface TeamCardListProps {
  teamList: TeamType[]
}

const props = withDefaults(defineProps<TeamCardListProps>(), {
  teamList: [] as TeamType[],
})

const doJoinTeam = () => {
  alert("加入队伍")
}

const getFormattedDate = (date) => {
  const userDate = new Date(date)

  return userDate.getFullYear() + '-' +
      ('0' + (userDate.getMonth() + 1)).slice(-2) + '-' +
      ('0' + userDate.getDate()).slice(-2);
}

</script>

<template>
  <van-card
      v-for="team in props.teamList"
      :desc="team.description"
      :title="team.name"
      :thumb="team.createUser.avatarUrl ?? 'https://images.zsxq.com/FrnKUO745Uq9VH_FCv0TkKiSBmiO?e=1706716799&token=kIxbL07-8jAj8w1n4s9zv64FuZZNEATmlU_Vm6zD:u26ek7_pXcl_v8Wbjd1dNb7VOHk='"
  >
    <template #tags>
      <van-tag plain type="primary" style="margin-right: 8px; margin-top: 8px">
        {{
          TeamStatusEnum[team.status]
        }}
      </van-tag>
    </template>
    <template #bottom>
      <div>
        {{ '最大人数: ' + team.maxNum }}
      </div>
      <div v-if="team.expireTime">
        {{ '过期时间: ' + getFormattedDate(team.expireTime) }}
      </div>
      <div>
        {{ '创建时间: ' + getFormattedDate(team.createTime) }}
      </div>
    </template>
    <template #footer>
      <van-button size="mini" plain type="primary" @click="doJoinTeam(team.id)">加入队伍</van-button>
    </template>
  </van-card>


</template>

<style scoped>

</style>