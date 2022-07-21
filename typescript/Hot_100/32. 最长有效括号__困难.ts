/**
32. 最长有效括号
给你一个只包含 '(' 和 ')' 的字符串，找出最长有效（格式正确且连续）括号子串的长度。

 

示例 1：

输入：s = "(()"
输出：2
解释：最长有效括号子串是 "()"
示例 2：

输入：s = ")()())"
输出：4
解释：最长有效括号子串是 "()()"
示例 3：

输入：s = ""
输出：0
 

提示：

0 <= s.length <= 3 * 104
s[i] 为 '(' 或 ')' 
*/
function longestValidParentheses(s: string): number {
  if (s.length < 2) return 0
  /**
  方法一: 动态规划

  dp[i]表示以s[i]结尾的最长有效括号。

  1. 如果s[i]是"(", 则dp[i] = 0
  2. 如果s[i]是")", 则观察s[i - 1]
     1. 如果s[i - 1]是"(", 那么s为...()。则dp[i] = 2 + dp[i - 2]
     2. 如果s[i - 1]是")", 那么s为...))。
        此时如果dp[i - 1] = len, s[i - len - 1]是"("。
        则s为...((长度为len的合法括号))。
        那么dp[i] = dp[i - len - 2] + dp[i - 1] + 2
   */
  const dp = Array(s.length + 1).fill(0)
  let max = 0
  for (let i = 1; i < s.length; i++) {
    // 1. 如果s[i]是"(", 则直接跳过
    if (s.charAt(i) === ')') {
      // 2. 如果s[i]是")", 则观察s[i - 1]
      if (s.charAt(i - 1) === '(') {
        //  如果s[i - 1]是"(", 那么s为...()。则dp[i] = 2 + dp[i - 2]
        dp[i + 1] = 2 + dp[i - 1]
      } else {
        // 此时如果dp[i - 1] = len, s[i - len - 1]是"("。
        const len = dp[i]
        if (s.charAt(i - len - 1) === '(') {
          // 则s为...((长度为len的合法括号))。
          // 那么dp[i] = dp[i - len - 2] + dp[i - 1] + 2
          dp[i + 1] = dp[i - len - 1] + dp[i] + 2
        }
      }
      max = Math.max(max, dp[i + 1])
    }
  }
  return max
}
function longestValidParentheses2(s: string): number {
  /**
   方法二: 栈

   */
  const stack = [-1]
  let max = 0
  for (let i = 0; i < s.length; i++) {
    if (s.charAt(i) === '(') {
      // 存入尚未匹配的左括号(
      stack.push(i)
    } else {
      stack.pop()
      if (stack.length === 0) {
        // 如果栈为空，就把当前右括号)的下标存入栈。(从该位置向前, 不会再参与计算。因为i位置的右括号没有匹配到左括号。)
        // 也就是栈顶永远存着不可能被匹配到的下标。并且会动态更新。
        // 如果把每次存入的i放到一块看, 那么这些i刚好将s切割成了若干字符串，每个字符串都是连续的有效括号字符串。
        stack.push(i)
      } else {
        // 此时栈顶元素j到i位置刚好是有效括号的字符串。
        max = Math.max(max, i - stack[stack.length - 1])
      }
    }
  }
  return max
}
console.log(longestValidParentheses2('(())'))

function longestValidParentheses3(s: string): number {
  /**
   方法二: 双指针贪心
   使用left和right分别记录i位置以前的左右括号数量。
   1. 如果left===right。那么此时有效括号长度为2*right
   2. 如果riht > left, 那么说明从上一个位置到当前位置i的括号不符合条件。令left和right = 0.  
      如果把每次重置为0的位置i记录起来。那么s以i位置做分割，每个子串都是一个最长的有效字符串。

   但是遇到了这种((()类型的。就会产生错误。
   所以反向再来一次遍历。就可以完全覆盖所有情况
   */

  let max = 0,
    left = 0,
    right = 0
  for (let i = 0; i < s.length; i++) {
    if (s.charAt(i) === '(') {
      left++
    } else {
      right++
    }

    if (left === right) {
      max = Math.max(max, right * 2)
    } else if (right > left) {
      left = 0
      right = 0
    }
  }
  left = 0
  right = 0
  for (let i = s.length - 1; i >= 0; i--) {
    if (s.charAt(i) === ')') {
      right++
    } else {
      left++
    }
    if (left === right) {
      max = Math.max(max, 2 * right)
    } else if (left > right) {
      left = 0
      right = 0
    }
  }
  return max
}
console.log(longestValidParentheses3('((())'))
