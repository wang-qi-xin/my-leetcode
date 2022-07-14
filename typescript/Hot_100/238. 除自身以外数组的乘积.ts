/**
238. 除自身以外数组的乘积
给你一个整数数组 nums，返回 数组 answer ，其中 answer[i] 等于 nums 中除 nums[i] 之外其余各元素的乘积 。

题目数据 保证 数组 nums之中任意元素的全部前缀元素和后缀的乘积都在  32 位 整数范围内。

请不要使用除法，且在 O(n) 时间复杂度内完成此题。

 

示例 1:

输入: nums = [1,2,3,4]
输出: [24,12,8,6]
示例 2:

输入: nums = [-1,1,0,-3,3]
输出: [0,0,9,0,0]
 

提示：

2 <= nums.length <= 105
-30 <= nums[i] <= 30
保证 数组 nums之中任意元素的全部前缀元素和后缀的乘积都在  32 位 整数范围内
 

进阶：你可以在 O(1) 的额外空间复杂度内完成这个题目吗？（ 出于对空间复杂度分析的目的，输出数组不被视为额外空间。）
 */

function productExceptSelf(nums: number[]): number[] {
  nums.push(1)
  nums.unshift(1)
  const len = nums.length,
    f = Array(len).fill(1),
    b = Array(len).fill(1),
    res = []

  for (let i = 1; i < len - 1; i++) {
    f[i] = f[i - 1] * nums[i]
    b[len - i - 1] = b[len - i] * nums[len - i - 1]
  }
  for (let i = 1; i < len - 1; i++) {
    res[i - 1] = f[i - 1] * b[i + 1]
  }
  return res
}

console.log(productExceptSelf([1, 2, 3, 4, 5]))

/**
 * 优化
 * @param nums 
 * @returns 
 */
function productExceptSelf2(nums: number[]): number[] {
  let p = 1,
    q = 1
  const res = []

  // 1. 第一轮遍历nums，res[i]只记录了nums[0]到nums[i - 1]的乘积和
  for (let i = 0; i < nums.length; i++) {
    res[i] = p
    p *= nums[i]
  }
  console.log(res);
  
  // 2. 第二轮从后向前遍历nums。res[i]还要再乘上nums[len - 1]到nums[i + 1]的乘积和
  for (let i = nums.length - 1; i > 0; i--) {
    q *= nums[i]
    res[i - 1] *= q
  }
  return res
}

console.log(productExceptSelf2([1, 2, 3, 4, 5]))
