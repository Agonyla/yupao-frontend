<script setup lang="ts">

import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {showFailToast, showSuccessToast} from "vant";
import {useRoute, useRouter} from "vue-router";

const router = useRouter()
const route = useRoute()


const addTeamData = ref({})

//
const result = ref('');
const showPicker = ref(false);
const onConfirm = ({selectedValues}) => {
  let year = parseInt(selectedValues[0], 10);
  let month = parseInt(selectedValues[1], 10) - 1;
  let day = parseInt(selectedValues[2], 10);
  console.log(selectedValues)
  result.value = selectedValues.join('-');
  addTeamData.value.expireTime = new Date(year, month, day)
  console.log(addTeamData.value.expireTime)
  showPicker.value = false;
};

const id = parseInt(route.query.id)

const getFormattedDate = (date) => {
  const userDate = new Date(date)
  return userDate.getFullYear() + '-' +
      ('0' + (userDate.getMonth() + 1)).slice(-2) + '-' +
      ('0' + userDate.getDate()).slice(-2);
}


onMounted(async () => {
  if (id <= 0) {
    showFailToast("队伍加载失败1")
    return
  }
  const res = await myAxios.get("/team/get", {
    params: {
      teamId: id,
    },
  })
  if (res?.code === 0) {
    addTeamData.value = res.data
    console.log(addTeamData.value)
  } else {
    showFailToast("队伍加载失败2")
  }
})

const onSubmit = async () => {
  const postData = {
    ...addTeamData.value,
    status: Number(addTeamData.value.status),
  };
  const res = await myAxios.post("/team/update", postData);
  if (res?.code === 0 && res.data) {
    showSuccessToast("更新成功");
    router.push({
      path: "/team",
      replace: true,
    });
  } else {
    showFailToast("更新失败");
  }
}
</script>

<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="addTeamData.name"
          name="name"
          label="队伍名"
          placeholder="请输入队伍名"
          :rules="[{ required: true, message: '请输入队伍名' }]"
      />
      <van-field
          v-model="addTeamData.description"
          autosize
          rows="2"
          type="textarea"
          name="description"
          label="队伍描述"
          placeholder="请输入队伍描述"
      />
      <!-- 过期时间 -->
      <van-field
          v-model="result"
          is-link
          readonly
          name="datePicker"
          label="过期时间"
          :placeholder="getFormattedDate(addTeamData.expireTime) ?? '点击选择过期时间'"
          @click="showPicker = true"
      />
      <van-popup v-model:show="showPicker" position="bottom">
        <van-date-picker
            @confirm="onConfirm"
            @cancel="showPicker = false"
            type="date"
        />
      </van-popup>
      <!-- 队伍人数 -->
      <van-field name="stepper" label="队伍人数">
        <template #input>
          <van-stepper v-model="addTeamData.maxNum" min="3" max="15"/>
        </template>
      </van-field>
      <!-- 队伍状态-->
      <van-field name="radio" label="队伍状态">
        <template #input>
          <van-radio-group
              v-model="addTeamData.status"
              direction="horizontal"
          >
            <van-radio name="0">公开</van-radio>
            <van-radio name="1">私有</van-radio>
            <van-radio name="2">加密</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field
          v-if="addTeamData.status == 2"
          v-model="addTeamData.password"
          type="password"
          name="password"
          label="密码"
          placeholder="请输入队伍密码"
          :rules="[{ required: true, message: '请填写密码' }]"
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