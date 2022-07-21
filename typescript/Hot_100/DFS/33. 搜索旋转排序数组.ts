/**
33. 搜索旋转排序数组
整数数组 nums 按升序排列，数组中的值 互不相同 。

在传递给函数之前，nums 在预先未知的某个下标 k（0 <= k < nums.length）上进行了 旋转，使数组变为 [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]（下标 从 0 开始 计数）。例如， [0,1,2,4,5,6,7] 在下标 3 处经旋转后可能变为 [4,5,6,7,0,1,2] 。

给你 旋转后 的数组 nums 和一个整数 target ，如果 nums 中存在这个目标值 target ，则返回它的下标，否则返回 -1 。

你必须设计一个时间复杂度为 O(log n) 的算法解决此问题。

 

示例 1：

输入：nums = [4,5,6,7,0,1,2], target = 0
输出：4
示例 2：

输入：nums = [4,5,6,7,0,1,2], target = 3
输出：-1
示例 3：

输入：nums = [1], target = 0
输出：-1
 

提示：

1 <= nums.length <= 5000
-104 <= nums[i] <= 104
nums 中的每个值都 独一无二
题目数据保证 nums 在预先未知的某个下标上进行了旋转
-104 <= target <= 104
 */

function search(nums: number[], target: number): number {
  if (nums.length === 1) return nums[0] === target ? 0 : -1
  /**
   二分查找。

   核心:  将该旋转数组从mid划分。一定有一半有序, 一半无序。
          假如target在有序的那一半, 就在有序的那一半二分。 将无序的那一半继续划分为两段，同样一半无序，一半有序
  
   */
  let left = 0,
    right = nums.length - 1
  while (left <= right) {
    const mid = left + ((right - left) >> 1)
    if (nums[mid] === target) return mid

    // 1. 如果mid处比nums[0]大, 说明从0到mid这前半段有序。
    if (nums[mid] >= nums[0]) {
      // 2. 如果target刚好处于前半段, 则缩小范围至前段
      if (target < nums[mid] && target >= nums[0]) {
        right = mid - 1
      } else {
        // 否则说明target在无序的后半段。
        left = mid + 1
      }
    } else {
      // mid 后半部分有序
      if (target > nums[mid] && target <= nums[right]) {
        // target位于有序的后半段
        left = mid + 1
      } else {
        right = mid - 1
      }
    }
  }
  return -1
}
