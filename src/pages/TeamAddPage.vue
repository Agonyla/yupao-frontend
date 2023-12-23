<script setup lang="ts">

import {ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {showFailToast, showSuccessToast} from "vant";
import {useRouter} from "vue-router";

const router = useRouter()
const initFormData = {
  "name": "",
  "description": "",
  "expireTime": null,
  "maxNum": 3,
  "password": "",
  "status": 0,
}

const addTeamData = ref({...initFormData})

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

// TODO:队伍添加=>过期时间

const onSubmit = async () => {
  const postData = {
    ...addTeamData.value,
    status: Number(addTeamData.value.status),
  };
  // TODO 前端参数校验
  console.log("===================", postData)
  const res = await myAxios.post("/team/add", postData);
  if (res?.code === 0 && res.data) {
    showSuccessToast("创建成功");
    router.push({
      path: "/team",
      replace: true,
    });
  } else {
    showFailToast("创建失败");
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
          :placeholder="addTeamData.expireTime ?? '点击选择过期时间'"
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