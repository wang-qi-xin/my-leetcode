<template>
  <el-popover :width="180" :visible="visible">
    <template #reference>
      <el-input class="input" v-model="input" @input="inputChange" @focus="visible = true" @blur="visible = false" />
    </template>
    <el-scrollbar height="200px">
      <div v-for="(item, index) in candidateList" :key="index">{{ item }}</div>
    </el-scrollbar>
  </el-popover>
</template>

<script lang="ts" setup>
import { Trie } from '@/utils/Trie'
import { ref } from 'vue'
const input = ref(1)
const visible = ref(false)
const trie = new Trie()
const candidateList = ref<string[]>([])
const prop = defineProps({
  data: {
    type: Array,
    default() {
      return []
    }
  }
})
/**
 * 构建字典树
 */
prop.data.forEach(word => {
  trie.insert(word as string)
})

/**
 * 在字典树中搜索前缀
 */
const inputChange = (value: string) => {
  if (value.trim() === '') {
    candidateList.value = []
    return
  }
  candidateList.value = trie.searchPrefix(value as string)
}
</script>

<style lang="scss" scoped>
.input {
  width: 200px;
  height: 30px;
}
</style>
