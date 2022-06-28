/**
剑指 Offer II 076. 数组中的第 k 大的数字
给定整数数组 nums 和整数 k，请返回数组中第 k 个最大的元素。

请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。

 

示例 1:

输入: [3,2,1,5,6,4] 和 k = 2
输出: 5
示例 2:

输入: [3,2,3,1,2,4,5,5,6] 和 k = 4
输出: 4
 

提示：

1 <= k <= nums.length <= 104
-104 <= nums[i] <= 104
 
 */
function findKthLargest(nums: number[], k: number): number {
  const target = nums.length - k
  const swap = (a: number, b: number) => {
    const temp = nums[a]
    nums[a] = nums[b]
    nums[b] = temp
  }
  /**
   * 找出一个基准p，把比p大的放左边，比p小的放右边
   * @param l
   * @param r
   */
  const partition = (l: number, r: number) => {
    let p = r,
      index = l
    for (let i = l; i < r; i++) {
      if (nums[i] < nums[p]) {
        swap(i, index)
        index++
      }
    }
    swap(p, index)
    return index
  }

  const quickSort = (l: number, r: number) => {
    const p = partition(l, r)
    // 如果已经确定目标位置，直接返回目标
    if (p === target) return nums[p]

    // 如果p比目标小，则只对p到r的部分进行二分。
    if (p < target) {
      return quickSort(p + 1, r)
    } else {
      return quickSort(l, p - 1)
    }
  }

  // console.log(nums)
  return quickSort(0, nums.length - 1)
}

console.log(findKthLargest([3, 2, 1, 5, 6, 4], 2))
