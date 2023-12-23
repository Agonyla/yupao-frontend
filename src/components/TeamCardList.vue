<script setup lang="ts">


import {TeamType} from "../model/team";
import {TeamStatusEnum} from "../constans/team.ts";
import {onMounted, ref} from "vue";
import {getCurrnetUser} from "../services/user.ts";
import {useRouter} from "vue-router";
import myAxios from "../plugins/myAxios.ts";
import {showFailToast, showSuccessToast} from "vant";

const router = useRouter()

interface TeamCardListProps {
  teamList: TeamType[]
}

const props = withDefaults(defineProps<TeamCardListProps>(), {
  teamList: [] as TeamType[],
})
const currentUser = ref()

const doJoinTeam = () => {
  alert("joinTeam")
}
const doUpdateTeam = (id: number) => {
  router.push({
    path: "/team/update",
    query: {
      id,
    }
  })
}
const doQuitTeam = async (id: number) => {
  const res = await myAxios.post("/team/quit", {
    teamId: id,
  })
  if (res?.data === 0) {
    showSuccessToast("队伍退出成功")
  } else {
    showFailToast("队伍退出失败")
  }
}

const doDeleteTeam = async (id: number) => {
  const res = await myAxios.post("/team/delete", {
    teamId: id,
  })
  if (res?.data === 0) {
    showSuccessToast("队伍解散成功")
  } else {
    showFailToast("队伍解散失败")
  }
}


const getFormattedDate = (date) => {
  const userDate = new Date(date)

  return userDate.getFullYear() + '-' +
      ('0' + (userDate.getMonth() + 1)).slice(-2) + '-' +
      ('0' + userDate.getDate()).slice(-2);
}

onMounted(async () => {
  currentUser.value = await getCurrnetUser()
})


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
      <van-button v-if="team.userId==currentUser.id" size="mini" plain type="primary"
                  @click="doUpdateTeam(team.id)">更新队伍
      </van-button>
      <van-button size="mini" plain type="primary"
                  @click="doQuitTeam(team.id)">退出队伍
      </van-button>
      <van-button v-if="team.userId==currentUser.id" size="mini" plain type="primary"
                  @click="doDeleteTeam(team.id)">解散队伍
      </van-button>
    </template>
  </van-card>


</template>

<style scoped>

</style>