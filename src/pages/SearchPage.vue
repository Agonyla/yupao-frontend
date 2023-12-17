<script setup lang="ts">
import {ref} from "vue";
import {useRouter} from "vue-router";

// 变量
const router = useRouter()
const searchText = ref('');
const activeIds = ref([]);
const activeIndex = ref(0);
const originTagList = [
  {
    text: '性别',
    children: [
      {text: '男', id: "男"},
      {text: '女', id: "女"},
      {text: '嬲', id: "嬲"},
    ],
  },
  {
    text: '语言',
    children: [
      {text: 'java', id: 'java'},
      {text: 'python', id: 'python'},
      {text: 'c', id: 'c'},
      {text: 'c++', id: 'c++'},
    ],
  },
  {
    text: '年级',
    children: [
      {text: '大一', id: '大一'},
      {text: '大二', id: '大二'},
      {text: '大三', id: '大三'},
      {text: '大四', id: '大四'},
    ],
  },
];

const tagList = ref(originTagList)

// 函数

const onSearch = () => {
  tagList.value = tagList.value.map(parentTag => {
    const tempChildren = [...parentTag.children];
    const tempParentTag = {...parentTag};
    tempParentTag.children = tempChildren.filter(item => item.text.includes(searchText.value))
    return tempParentTag;
  })
}
const onCancel = () => {
  searchText.value = '';
  tagList.value = originTagList;
  activeIds.value = []
}

const show = ref(true);
const close = (tag: string) => {
  activeIds.value = activeIds.value.filter(item => {
    return item != tag;
  })
};

const doSearchResult = () => {
  router.push({
    path: "/user/list",
    query: {
      tags: activeIds.value
    }
  })
}
</script>

<template>
  <form action="/">
    <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
    />
  </form>

  <van-button type="primary" block @click="doSearchResult">查找用户</van-button>

  <van-divider>已选标签</van-divider>

  <van-row justify="center">
    <van-tag v-if="activeIds.length===0" plain type="primary">请选择标签</van-tag>
  </van-row>

  <van-row gutter="16">
    <van-col v-for="tag in activeIds" style="padding: 5px 16px">
      <van-tag :show="show" closeable size="medium" type="primary" @close="close(tag)">
        {{ tag }}
      </van-tag>
    </van-col>
  </van-row>

  <van-divider>可选标签</van-divider>

  <van-tree-select
      v-model:active-id="activeIds"
      v-model:main-active-index="activeIndex"
      :items="tagList"
  />


</template>

<style scoped>

</style>