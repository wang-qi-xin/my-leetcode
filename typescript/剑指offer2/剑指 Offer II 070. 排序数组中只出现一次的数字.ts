/**
剑指 Offer II 070. 排序数组中只出现一次的数字
给定一个只包含整数的有序数组 nums ，每个元素都会出现两次，唯有一个数只会出现一次，请找出这个唯一的数字。

你设计的解决方案必须满足 O(log n) 时间复杂度和 O(1) 空间复杂度。

 

示例 1:

输入: nums = [1,1,2,3,3,4,4,8,8]
输出: 2
示例 2:

输入: nums =  [3,3,7,7,10,11,11]
输出: 10
 

提示:

1 <= nums.length <= 105
0 <= nums[i] <= 105
 
 */

function singleNonDuplicate(nums: number[]): number {
  /**
  二分查找。

  每一对数字的下标应该是[偶数，奇数]
  所以：
  如果mid是偶数，则mid应该与mid + 1相等，
  如果mid是奇数，则mid应该与mid - 1相等

  如果相等，则说明0->mid，或0->mid + 1.这些数中没有唯一的那个数字。唯一的数字一定在mid后面。
  此时令left = mid + 1
  否则说明唯一的那个数字在left->mid中。令right = mid
  */
  if (nums.length === 1) return nums[0]
  let left = 0,
    right = nums.length - 1
  while (left < right) {
    const mid = (left + right) >> 1
    if (nums[mid] === nums[mid ^ 1]) {
      // 如果mid为偶数，则mid ^ 1就等于mid + 1.
      // 如果mid为奇数，则mid ^ 1就等于mid - 1
      left = mid + 1
    } else {
      right = mid
    }
  }
  return nums[left]
}
console.log(singleNonDuplicate([1,2,2]))
