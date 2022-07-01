/**
 169. 多数元素
给定一个大小为 n 的数组 nums ，返回其中的多数元素。多数元素是指在数组中出现次数 大于 ⌊ n/2 ⌋ 的元素。

你可以假设数组是非空的，并且给定的数组总是存在多数元素。

 

示例 1：

输入：nums = [3,2,3]
输出：3
示例 2：

输入：nums = [2,2,1,1,1,2,2]
输出：2
 

提示：
n == nums.length
1 <= n <= 5 * 104
-109 <= nums[i] <= 109
 

进阶：尝试设计时间复杂度为 O(n)、空间复杂度为 O(1) 的算法解决此问题。
 */
function majorityElement(nums: number[]): number {
  /**
  Booyer-moore投票算法

  1. 假如候选人不是maj(众数), 那么此时其它的候选人和maj会一起投反对票(count - 1)， 那么该候选人一定会下台(count = 0时换候选人)
     由于候选人不是maj，反对票一定大于赞成票。
  2. 假如候选人时maj，由于maj一定会投自己的票，尽管其他人反对，maj的票大于总票数的一半，所以maj最终一定是候选人。

  3. 就算每次选择候选人时，都选择的不是maj，由于maj一定会反对，所以该勾选人必定下台。
   */
  let count = 0,
    candidate = 1e9 + 1
  for (let i = 0; i < nums.length; i++) {
    if (count === 0) candidate = nums[i]
    count += nums[i] === candidate ? 1 : -1
  }
  return candidate
}
