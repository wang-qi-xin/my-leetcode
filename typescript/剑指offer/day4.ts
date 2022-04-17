/**
 * 剑指 Offer 42. 连续子数组的最大和
输入一个整型数组，数组中的一个或连续多个整数组成一个子数组。求所有子数组的和的最大值。

要求时间复杂度为O(n)。

 

示例1:

输入: nums = [-2,1,-3,4,-1,2,1,-5,4]
输出: 6
解释: 连续子数组 [4,-1,2,1] 的和最大，为 6。
 

提示：

1 <= arr.length <= 10^5
-100 <= arr[i] <= 100
 * @param nums 
 */
function maxSubArray(nums: number[]): number {
  let max = nums[0]
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] < nums[i] + nums[i - 1]) {
      nums[i] = nums[i - 1] + nums[i]
    }
    max = Math.max(max, nums[i])
  }
  return max
}

/**
 * 剑指 Offer 31. 栈的压入、弹出序列
 * @param pushed
 * @param popped
 */
function validateStackSequences(pushed: number[], popped: number[]): boolean {
  /**
    使用栈来模拟
    1. 判断栈顶元素是否是popped对应元素（题目规定元素不相同）
    2. 如果等于，就一直弹出元素，直到元素不相同
    3. 不等于时，就压入pushed里的元素
   */
  const stack = []
  let j = 0
  for (let i = 0; i < pushed.length; i++) {
    stack.push(pushed[i])
    while (stack.length !== 0 && stack[stack.length - 1] === popped[j]) {
      stack.pop()
      j++
    }
  }
  return stack.length === 0
}

/**
 * 剑指 Offer 38. 字符串的排列
输入一个字符串，打印出该字符串中字符的所有排列。

 

你可以以任意顺序返回这个字符串数组，但里面不能有重复元素。

 

示例:

输入：s = "abc"
输出：["abc","acb","bac","bca","cab","cba"]
 

限制：

1 <= s 的长度 <= 8
 * @param s 
 */
function permutation(s: string): string[] {
  const res = []
  const list = s.split("")
  /**
    dfs。固定某位，搜索下一位。
    末尾时，判断res是否在结果集set中
   */
  const swap = (i, j) => {
    const temp = list[i]
    list[i] = list[j]
    list[j] = temp
  }
  const dfs = (x: number) => {
    if (x === s.length - 1) {
      res.push(list.join(""))
      return
    }
    const set = new Set()
    for (let i = x; i < s.length - 1; i++) {
      // 利用set判断是否有重复元素，有的话剪枝
      if(set.has(list[i])) continue
      set.add(list[i])
      swap(i, x)
      dfs(x + 1)
      swap(i, x)
    }
  }
  dfs(0)
  return res
}
