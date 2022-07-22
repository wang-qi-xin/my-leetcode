<template>
  <el-row class="demo-autocomplete text-center">
    <el-col :span="12">
      <h3>Element自动完成输入框</h3>
      <el-autocomplete
        v-model="state1"
        :fetch-suggestions="querySearch"
        clearable
        class="inline-input w-50"
        placeholder="Please Input"
        @select="handleSelect"
      />
    </el-col>
    <el-col :span="12">
      <h3>字典树实现-自动完成输入框</h3>
      <MyAutoComplete :data="data"></MyAutoComplete>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { data } from './data';
import MyAutoComplete from './my-auto-complete.vue';

const loadAll = () => {
  return [
    { value: 'vue', link: 'https://github.com/vuejs/vue' },
    { value: 'element', link: 'https://github.com/ElemeFE/element' },
    { value: 'cooking', link: 'https://github.com/ElemeFE/cooking' },
    { value: 'mintui', link: 'https://github.com/ElemeFE/mint-ui' },
    { value: 'vuex', link: 'https://github.com/vuejs/vuex' },
    { value: 'vuerouter', link: 'https://github.com/vuejs/vue-router' },
    { value: 'babel', link: 'https://github.com/babel/babel' }
  ]
}

interface RestaurantItem {
  value: string
  link: string
}

const state1 = ref('')

const restaurants = ref<RestaurantItem[]>([])
const querySearch = (queryString: string, cb: any) => {
  const results = queryString ? restaurants.value.filter(createFilter(queryString)) : restaurants.value
  // call callback function to return suggestions
  cb(results)
}
const createFilter = (queryString: string) => {
  return (restaurant: RestaurantItem) => {
    return restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
  }
}
const handleSelect = (item: RestaurantItem) => {
  console.log(item)
}

onMounted(() => {
  restaurants.value = loadAll()
})
</script>

<style scoped lang="scss">
.list {
  height: 100px;
  width: 100px;
}
</style>
