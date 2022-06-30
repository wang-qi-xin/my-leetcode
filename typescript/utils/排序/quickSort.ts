/*
 * @Description:
 * @Version: 2.0
 * @Autor: one
 * @Date: 2022-04-15 11:07:56
 * @LastEditors: one
 * @LastEditTime: 2022-06-30 15:08:16
 */

/**
 * 比较函数的类型，返回布尔值
 */
interface compareFnType<T> {
  (a: T, b: T): number | boolean
}
/**
 * 默认的比较函数：递增
 * @param a 
 * @param b 
 * @returns 
 */
function defaultCompareFn(a: any, b: any): number {
  return a - b
}
/**
 * 快速排序。(默认递增)
 * @param arr 
 * @param compareFn 复杂对象的排序，需要自定义比较函数。
 * @returns newArr
 */
function quickSort<T>(arr: T[], compareFn: compareFnType<T> = defaultCompareFn): T[] {
  const quickSort = (arr: T[], l: number, r: number): T[] => {
    if (l < r) {
      const pos = partition(arr, l, r)
      quickSort(arr, l, pos - 1)
      quickSort(arr, pos + 1, r)
    }
    return arr
  }
  /**
   * 一轮快排，定出基准元素pos
   * @param arr
   * @param l
   * @param r
   * @returns
   */
  const partition = (arr: T[], l: number, r: number): number => {
    /**
   1. 定基准。
   2. 将比基准小的放在一边，大的放另一边。
   3. 返回基准的下标
   */
    let pivot = r
    let index = l
    for (let i = l; i < r; i++) {
      let result = compareFn(arr[pivot], arr[i])
      if (result > 0 || result === true) {
        swap(arr, index, i)
        index++
      }
    }
    swap(arr, index, pivot)
    return index
  }
  /**
   * 交换数组两个元素
   * @param arr
   * @param index
   * @param i
   */
  const swap = (arr: T[], index: number, i: number) => {
    const temp = arr[index]
    arr[index] = arr[i]
    arr[i] = temp
  }
  return quickSort(arr, 0, arr.length - 1)
}

export default quickSort

function testQuickSort() {
  const range = 2_0000
  const arr1: number[] = []
  const arr3 = []
  let i = 0
  while (i < range) {
    i++
    const random = Math.random() * range
    arr1.push(random)
    arr3.push(random)
  }
  let start = Date.now()
  quickSort(arr1, (a, b) => b - a)
  let end = Date.now()
  console.log(arr1.slice(0, 10), `\n 自定义比较函数sort spendTime = ${end - start}ms`)

  start = Date.now()
  arr3.sort((a, b) => b - a)
  end = Date.now()
  console.log(arr3.slice(0, 10), `\n sort spendTime = ${end - start}ms`)
}
interface testObj {
  a: number
  b: number
  c: number
}
/**
 * 测试自定义对象数组的比较，
 */
function testObjectSort() {
  const range = 2_000000
  const arr1: testObj[] = []
  const arr2: testObj[] = []
  let i = 0

  while (i < range) {
    i++
    const randomObj = {
      a: Math.random() * range,
      b: Math.random() * range,
      c: Math.random() * range
    }
    arr1.push(Object.assign({}, randomObj))
    arr2.push(Object.assign({}, randomObj))
  }
  /**
   * 比较函数
   * @param a
   * @param b
   * @returns
   */
  const compareFn = (a: testObj, b: testObj): number => {
    if (a.a !== b.a) return a.a - b.a
    if (a.b !== b.b) return a.b - b.b
    return a.c - b.c
  }

  let start = Date.now()
  quickSort(arr1, compareFn)
  let end = Date.now()
  console.log(arr1.slice(0, 2), `\n 自定义比较函数sort spendTime = ${end - start}ms`)

  start = Date.now()
  arr2.sort(compareFn)
  end = Date.now()
  console.log(arr2.slice(0, 2), `\n sort spendTime = ${end - start}ms`)
}
testObjectSort()
