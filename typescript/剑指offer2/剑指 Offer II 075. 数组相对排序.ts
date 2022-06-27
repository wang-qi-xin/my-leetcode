/**
剑指 Offer II 075. 数组相对排序
给定两个数组，arr1 和 arr2，

arr2 中的元素各不相同
arr2 中的每个元素都出现在 arr1 中
对 arr1 中的元素进行排序，使 arr1 中项的相对顺序和 arr2 中的相对顺序相同。未在 arr2 中出现过的元素需要按照升序放在 arr1 的末尾。

 

示例：

输入：arr1 = [2,3,1,3,2,4,6,7,9,2,19], arr2 = [2,1,4,3,9,6]
输出：[2,2,2,1,4,3,3,9,6,7,19]
 

提示：

1 <= arr1.length, arr2.length <= 1000
0 <= arr1[i], arr2[i] <= 1000
arr2 中的元素 arr2[i] 各不相同
arr2 中的每个元素 arr2[i] 都出现在 arr1 中
 */

/**
 * map+自定义排序
 * @param arr1
 * @param arr2
 * @returns
 */
function relativeSortArray(arr1: number[], arr2: number[]): number[] {
  // 1. 使用map保存arr1中每个数字出现的次数
  const map = new Map<number, number>()
  for (let i = 0; i < arr1.length; i++) {
    if (map.has(arr1[i])) {
      map.set(arr1[i], map.get(arr1[i]) + 1)
    } else {
      map.set(arr1[i], 1)
    }
  }

  // 2. 先把arr2中的元素进行排序
  const res = []
  for (let i = 0; i < arr2.length; i++) {
    for (let j = 0, n = map.get(arr2[i]); j < n; j++) {
      res.push(arr2[i])
    }
    map.delete(arr2[i])
  }

  // 3. 将剩下的元素进行排序，拼接到res后面
  const other = [...map.entries()].sort((a, b) => a[0] - b[0])
  for (let i = 0; i < other.length; i++) {
    for (let j = 0; j < other[i][1]; j++) {
      res.push(other[i][0])
    }
  }
  return res
}

/**
 * map+自定义排序 (优化)
 * @param arr1
 * @param arr2
 * @returns
 */
function relativeSortArray2(arr1: number[], arr2: number[]): number[] {
  // 1. 使用map保存arr2中每个数字出现的位置，也就是相当于arr1中排序时的优先级
  const map = new Map<number, number>()
  for (let i = 0; i < arr2.length; i++) {
    map.set(arr2[i], i)
  }

  // 2. 对arr1中的元素进行排序
  arr1.sort((a, b) => {
    if (map.has(a)) {
      // 如果arr2中有a也有b，则按照他们出现的顺序（下标）进行排序。
      // 如果arr2中有a，但是没有b，则将a放在前面。
      return map.has(b) ? map.get(a) - map.get(b) : -1
    } else {
      // 如果arr2中没有a，也没有b。则按大小升序排序
      return map.has(b) ? 1 : a - b
    }
  })
  return arr1
}

relativeSortArray2([2, 3, 1, 3, 2, 4, 6, 72, 72, 9, 2, 19], [2, 1, 4, 3, 9, 6])
