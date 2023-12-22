<script setup lang="ts">

import {ref} from "vue";

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
const minDate = new Date()
const onConfirm = ({selectedValues}) => {
  console.log(selectedValues)
  result.value = selectedValues.join('/');
  showPicker.value = false;
};

// TODO:队伍添加=>过期时间


const onSubmit = () => {
  alert("ok")
}
</script>

<template>

  加入队伍页面
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
            @confirm="showPicker = false"
            @cancel="showPicker = false"
            type="date"
        />
      </van-popup>


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