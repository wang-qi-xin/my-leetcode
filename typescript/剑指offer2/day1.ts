/*
 * @Description:
 * @Version: 2.0
 * @Autor: one
 * @Date: 2022-04-23 17:17:32
 * @LastEditors: one
 * @LastEditTime: 2022-04-26 12:12:03
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

/**
 * 剑指 Offer 67. 把字符串转换成整数
 * @param str
 */
function strToInt(str: string): number {
  str = str.trim()
  let sign = 1
  let c = str.charAt(0)
  // 取符号位
  if (c === '+' || c === '-') {
    sign = c === '+' ? 1 : -1
    str = str.substring(1)
  }
  let s = ''
  /**
   * 判断是否是数字
   * @param c
   * @returns
   */
  const isNumber = (c: string) => {
    if (c === '0') return true
    return Boolean(+c)
  }
  // 如果碰到了非数字，就break
  for (let i = 0; i < str.length; i++) {
    let c = str.charAt(i)
    if (isNumber(c)) {
      s += c
    } else {
      break
    }
  }
  let result = sign * +s
  const MAX = Math.pow(2, 31) - 1
  const MIN = -Math.pow(2, 31)
  if (result > MAX) result = MAX
  if (result < MIN) result = MIN
  return result
}
// console.log(strToInt(' -42'))

/**
 * 剑指 Offer 61. 扑克牌中的顺子
  （排序+筛选）太慢了
 * @param nums
 */
function isStraight(nums: number[]): boolean {
  /**
   1. 先排序
   2. 把0截出来 z = 0的数目
   3. 遍历非0.用res 记录后一位与前一位的（差 - 1）
   4. 如果res <= z, 就是顺子
   */
  nums.sort((a, b) => a - b)
  let z = 0,
    res = 0
  for (let i = 0; i < 5; i++) {
    if (nums[i] !== 0) break
    z += 1
  }
  for(let i = z; i < 4; i++){
    // 如果出现重复的非零数字，直接返回false
    if(nums[i + 1] === nums[i]) return false
    res += (nums[i + 1] - nums[i]) - 1
  }
  return res <= z
}

/**
 * 剑指 Offer 61. 扑克牌中的顺子
   (利用Set)
 * @param nums 
 * @returns 
 */
function isStraight2(nums: number[]): boolean {
  /**
   1. 跳过0
   2. 重复数，直接返回false
   3. 取最大值max，最小值min
   4. 如果max - min < 5 说明是顺子
   */
  let max = 0, min = 14
  let set = new Set()
  for(let i = 0; i < 5; i++){
    let n = nums[i]
    if(n === 0) continue
    if(set.has(n)) return false
    min = Math.min(min, n)
    max = Math.max(max, n)
    set.add(n)
  }
  return (max - min) < 5
}
// isStraight2([0,0,2,2,5])

/**
 * 剑指 Offer 63. 股票的最大利润
    动态规划
 * @param prices 
 */
function maxProfit(prices: number[]): number {
  let max = 0;
  for(let i = prices.length - 2; i >= 0 ;i--){
    let c = prices[i + 1] - prices[i]
    if(c > 0){
      max = Math.max(max, c)
      prices[i] = prices[i + 1]
    }
  }
  return max
};

// console.log(maxProfit([7,1,5,3,5]));

/**
 * 剑指 Offer 64. 求1+2+…+n
 * @param n 
 */
function sumNums(n: number): number {
  // 递归，但是不使用if判断n == 0.
  // 使用&&运算符来判断
  let res =  n && (sumNums(n - 1) + n)
  return res
};

// console.log(sumNums(1))

/**
 * 剑指 Offer 14- I. 剪绳子
 * @param n 
 */
function cuttingRope(n: number): number {
  if(n <= 3) return n - 1

  // 将n尽可能分为长度为3的片段
  // 如果最后一段不够3，
  // 即b = 1, b = 2 两种情况
  // 1. b == 1: 把b分给其中一个3， 因为3 * 3 * 1 小于3 * 4
  // 2. b == 2: 返回3^a * 2
  let a = Math.floor(n / 3), b = n % 3
  
  if(b === 0) return Math.pow(3, a)
  if(b === 1) return Math.pow(3, a - 1) * 4
  return Math.pow(3, a) * 2
};

// console.log(cuttingRope(10))