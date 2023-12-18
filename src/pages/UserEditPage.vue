<script setup lang="ts">
import {ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {getCurrnetUser} from "../services/user.ts";
import {showFailToast, showSuccessToast} from "vant";
import myAxios from "../plugins/myAxios.ts";

const router = useRouter()
const route = useRoute()
const editUser = ref({
  editKey: route.query.editKey,
  editName: route.query.editName,
  currentValue: route.query.currentValue
})

// Agong5,5,Agong5,"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202004%2F26%2F20200426184837_vEfd5.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1705456860&t=b74b45f30eb5f44ad0ede42aa40d4ac2",1,df7891ed89789db3f9038d6dee38d77c,,,0,2023-12-18 09:59:58,2023-12-18 10:02:58,0,0,5,"[""python"",""c++"",""男""]",你好吖

const onSubmit = async () => {
  const currentUser = await getCurrnetUser();
  if (!currentUser) {
    showFailToast("用户未登录")
    return
  }
  const res = await myAxios.post("user/update", {
    "id": currentUser.id,
    // 动态更新，不会覆盖之前的值
    [editUser.value.editKey]: editUser.value.currentValue
  })
  console.log(res)
  if (res.code === 0 && res.data > 0) {
    showSuccessToast("更新成功")
    router.back()
  } else {
    showFailToast("更新失败")
  }
  // console.log("editKey", editUser.value.editKey)
  // console.log("editName", editUser.value.editName)
  // console.log("currentValue", editUser.value.currentValue)
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