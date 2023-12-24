<script setup lang="ts">


import {UserType} from "../model/user";

interface UserCardListProps {
  loading: boolean
  userList: UserType[]
}

const props = withDefaults(defineProps<UserCardListProps>(), {
  loading: true,
  //@ts-ignore
  userList: [] as UserType[],
})


</script>

<template>
  <van-skeleton v-for="user in props.userList" title avatar :row="3" :loading="props.loading">
    <van-card
        :desc="user.profile"
        :title="`${user.userAccount}-${user.planetCode}`"
        :thumb="user.avatarUrl"
    >
      <template #tags>
        <van-tag v-for="tag in user.tags" plain type="primary" style="margin-right: 8px; margin-top: 8px">
          {{ tag }}
        </van-tag>
      </template>
      <template #footer>
        <van-button size="small">联系我</van-button>
      </template>
    </van-card>
  </van-skeleton>


</template>

<style scoped>

</style>