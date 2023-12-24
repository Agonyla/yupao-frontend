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
const joinTeamId = ref(0)
const showPasswordDialog = ref(false)
const password = ref("")
const preJoinTeam = (team: TeamType) => {
  joinTeamId.value = team.id;
  if (team.status === 0) {
    doJoinTeam()
  } else {
    showPasswordDialog.value = true;
  }
}


const doJoinCancel = () => {
  joinTeamId.value = 0;
  password.value = ""
}

const doJoinTeam = async () => {
  if (!joinTeamId.value) {
    return;
  }
  const res = await myAxios.post("/team/join", {
    id: joinTeamId.value,
    password: password.value,
  })
  if (res?.code === 0) {
    showSuccessToast("队伍加入成功")
    doJoinCancel()
    // 刷新当前页面
    window.location.reload();
  } else {
    showFailToast("队伍加入失败")
  }
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
  if (res?.code === 0) {
    showSuccessToast("队伍退出成功")
    // 刷新当前页面
    window.location.reload();
  } else {
    showFailToast("队伍退出失败")
  }
}

const doDeleteTeam = async (id: number) => {
  const res = await myAxios.post("/team/delete", {
    teamId: id,
  })
  if (res?.code === 0) {
    showSuccessToast("队伍解散成功")
  } else {
    showFailToast("队伍解散失败")
  }
  // 刷新当前页面
  window.location.reload();
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
        {{ `队伍人数: ${team.hasJoinNum} / ${team.maxNum}` }}
      </div>
      <div v-if="team.expireTime">
        {{ '过期时间: ' + getFormattedDate(team.expireTime) }}
      </div>
      <div>
        {{ '创建时间: ' + getFormattedDate(team.createTime) }}
      </div>
    </template>
    <template #footer>
      <van-button v-if="team.userId !== currentUser?.id && !team.hasJoin" size="small" plain type="primary"
                  @click="preJoinTeam(team)">加入队伍
      </van-button>
      <van-button v-if="team.userId === currentUser?.id" size="small" plain type="primary"
                  @click="doUpdateTeam(team.id)">更新队伍
      </van-button>
      <van-button v-if="team.userId !== currentUser?.id && team.hasJoin" size="small" plain type="primary"
                  @click="doQuitTeam(team.id)">退出队伍
      </van-button>
      <van-button v-if="team.userId === currentUser?.id" size="small" plain type="danger"
                  @click="doDeleteTeam(team.id)">解散队伍
      </van-button>
    </template>
  </van-card>
  <van-dialog v-model:show="showPasswordDialog" title="请输入密码" show-cancel-button @confirm="doJoinTeam"
              @cancel="doJoinCancel">
    <van-field v-model="password" type="password" placeholder="请输入密码"/>
  </van-dialog>


</template>

<style scoped>

</style>