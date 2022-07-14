/**
 * 215. 数组中的第K个最大元素
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
 * @param nums 
 * @param k 
 */
function findKthLargest(nums: number[], k: number): number {
  k = nums.length - k
  const partition = (left: number, right: number): number => {
    let pivot = right,
      index = left
    for (let i = left; i < right; i++) {
      if (nums[i] < nums[pivot]) {
        const temp = nums[i]
        nums[i] = nums[index]
        nums[index] = temp
        index++
      }
    }
    const temp = nums[index]
    nums[index] = nums[pivot]
    nums[pivot] = temp
    return index
  }
  const quickSort = (left: number, right: number) => {
    const mid = partition(left, right)
    if (mid === k) return
    if (mid < k) {
      quickSort(mid + 1, right)
    } else {
      quickSort(left, mid - 1)
    }
  }
  quickSort(0, nums.length - 1)

  return nums[k]
}

console.log(findKthLargest([3, 2, 1, 5, 6, 4], 2))
