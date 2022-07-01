/**
1191. K 次串联后最大子数组之和
给定一个整数数组 arr 和一个整数 k ，通过重复 k 次来修改数组。

例如，如果 arr = [1, 2] ， k = 3 ，那么修改后的数组将是 [1, 2, 1, 2, 1, 2] 。

返回修改后的数组中的最大的子数组之和。注意，子数组长度可以是 0，在这种情况下它的总和也是 0。

由于 结果可能会很大，需要返回的 109 + 7 的 模 。

 

示例 1：

输入：arr = [1,2], k = 3
输出：9
示例 2：

输入：arr = [1,-2,1], k = 5
输出：2
示例 3：

输入：arr = [-1,-2], k = 7
输出：0
 

提示：

1 <= arr.length <= 105
1 <= k <= 105
-104 <= arr[i] <= 104
通过次数7,054提交次数26,292
 */
function kConcatenationMaxSum(arr: number[], k: number): number {
  /**
   * https://leetcode.cn/problems/k-concatenation-maximum-sum/solution/java-kadanesuan-fa-yu-jie-ti-si-lu-by-zdxiq125/
   */
  const m = 1e9 + 7,
    len = arr.length
  let sum = 0,
    maxEnd = 0,
    max = 0
  /**
    1. 最大的子数组有可能仅在arr内。也有可能横跨两个arr。比如1, -1, 1.
       所以将arr扩展为2个。如果k = 1，就不用扩展。
       然后求最大的子数组和。
     */
  for (let i = 0, l = Math.min(2, k) * len; i < l; i++) {
    maxEnd = Math.max(maxEnd + arr[i % len], arr[i % len])
    max = Math.max(max, maxEnd)
    if (i < len) {
      sum += arr[i] % m
    }
  }
  // console.log(sum, max)

  // 2. 如果sum > 0，并且k > 3, 则可以在max后面再加上一个sum。
  while (sum > 0 && --k >= 2) {
    max = (max + sum) % m
  }
  return max % m
}
// console.log(kConcatenationMaxSum([-3, 5, -1, 2, 48, -55, -2, -1, 5, -3, -5, -1, 3, -54, 21, -2], 5000))
console.log(kConcatenationMaxSum([1, 2], 1))
