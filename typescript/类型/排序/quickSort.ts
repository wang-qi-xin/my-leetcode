/*
 * @Description: 
 * @Version: 2.0
 * @Autor: one
 * @Date: 2022-04-15 11:07:56
 * @LastEditors: one
 * @LastEditTime: 2022-04-15 15:39:29
 */
function quickSort(arr: number[], l: number, r: number) {
  if (l < r) {
    const pos = partition(arr, l, r)
    quickSort(arr, l, pos - 1)
    quickSort(arr, pos + 1, r)
  }
  return arr
}

function partition(arr: number[], l: number, r: number): number {
  /**
   1. 定基准。
   2. 将比基准小的放在一边，大的放另一边。
   3. 返回基准的下标
   */
  let pivot = r
  let index = l
  for (let i = l; i < r; i++) {
    if (arr[pivot] > arr[i]) {
      swap(arr, index, i)
      index++
    }
  }
  swap(arr, index, pivot)
  return index
}

function swap(arr: number[], index: number, i: number) {
  const temp = arr[index]
  arr[index] = arr[i]
  arr[i] = temp
}

function testQuickSort() {
  const range = 2_0000
  const arr1 = []
  const arr2 = []
  let i = 0
  while (i < range) {
    i++
    const random = Math.random() * range
    arr1.push(random)
    arr2.push(random)
  }
  console.log(arr1.slice(0, 20))
  let start = Date.now()
  quickSort(arr1, 0, arr1.length - 1)
  let end = Date.now()
  console.log(arr1.slice(0, 20), `\n quickSort spendTime = ${end - start}ms`)

  // console.log(arr2.slice(0, 20))
  start = Date.now()
  arr2.sort((a, b) => a - b)
  end = Date.now()
  console.log(arr2.slice(0, 20), `\n sort spendTime = ${end - start}ms`)
}
testQuickSort()