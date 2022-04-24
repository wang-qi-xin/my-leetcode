/*
 * @Description:
 * @Version: 2.0
 * @Autor: one
 * @Date: 2022-04-23 17:17:32
 * @LastEditors: one
 * @LastEditTime: 2022-04-24 11:03:53
 */

/**
 * 剑指 Offer 60. n个骰子的点数
 (动态规划)
 概率问题
 * @param n
 */
function dicesProbability(n: number): number[] {
  /**
   * 2个骰子时，点数为2-12(temp[0] -> temp[11])，与1个骰子点数的关系为123456(dp[0] -> dp[5])等六个点数的概率，分别乘以新加入的一个骰子各点的概率（1/6）
   * 也就是temp[0] = dp[0] / 6  (一个骰子点数为1， 新加入的点数也是1)
          temp[1] = dp[0] / 6 + dp[1] / 6 (两种情况1+2， 2+1)
   */
  // dp 应该是个梯形的二维数组。第一层是6， 第二层是11， 第三层是16.（3个骰子点数为3-18）
  // 但是因为每一层，只跟上一层有关系，所以省略为一维数组。
  let dp = [...Array(6)].map(i => 1 / 6)
  for (let i = 2; i <= n; i++) {
    const temp = [...Array(5 * i + 1)].map(i => 0)
    // 遍历i-1个骰子时的点数概率
    for (let j = 0; j < dp.length; j++) {
      // 新加入的骰子概率
      for (let k = 0; k < 6; k++) {
        temp[j + k] += dp[j] / 6
      }
    }
    dp = temp
  }
  return dp
}
// console.log(dicesProbability(1))
