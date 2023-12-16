<script setup lang="ts">
import {ref} from "vue";
import {useRoute} from "vue-router";

const route = useRoute()
const editUser = ref({
  editKey: route.query.editKey,
  editName: route.query.editName,
  currentValue: route.query.currentValue
})
const onSubmit = (editUser) => {
  // TODO 将参数传给后端
  console.log('submit', editUser);
};
</script>

<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="editUser.currentValue"
          :name="editUser.editKey"
          :label="editUser.editName"
          :placeholder="`请输入${editUser.editName}`"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>

</template>

<style scoped>

</style>