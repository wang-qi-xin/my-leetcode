/**
152. 乘积最大子数组
给你一个整数数组 nums ，请你找出数组中乘积最大的非空连续子数组（该子数组中至少包含一个数字），并返回该子数组所对应的乘积。

测试用例的答案是一个 32-位 整数。

子数组 是数组的连续子序列。

 

示例 1:

输入: nums = [2,3,-2,4]
输出: 6
解释: 子数组 [2,3] 有最大乘积 6。
示例 2:

输入: nums = [-2,0,-1]
输出: 0
解释: 结果不能为 2, 因为 [-2,-1] 不是子数组。
 

提示:

1 <= nums.length <= 2 * 104
-10 <= nums[i] <= 10
nums 的任何前缀或后缀的乘积都 保证 是一个 32-位 整数
 */

function maxProduct(nums: number[]): number {
  const dpMax = [nums[0]], // dpMax[i]表示以nums[i]结尾的最大乘积连续子数组的乘积
    dpMin = [nums[0]] // dpMin[i]表示以nums[i]结尾的最小乘积连续子数组的乘积

  let max = nums[0]
  for (let i = 1; i < nums.length; i++) {
    // 以nums[i]结尾的最大乘积连续子数组的乘积，
    // 1. 有可能是只包含nums[i]
    // 2. 如果nums[i]是负数，则nums[i] * dpMin[i - 1]有可能就是正数。
    // 3. 如果nums[i]是正数，则nums[i] * dpMax[i - 1]可能会更大。
    // 以上三种情况取最大值，就是以nums[i]结尾的最大乘积连续子数组的乘积，
    dpMax[i] = Math.max(nums[i], Math.max(nums[i] * dpMax[i - 1], nums[i] * dpMin[i - 1]))
    dpMin[i] = Math.min(nums[i], Math.min(nums[i] * dpMax[i - 1], nums[i] * dpMin[i - 1]))
    max = Math.max(dpMax[i], max)
  }
  return max
}
