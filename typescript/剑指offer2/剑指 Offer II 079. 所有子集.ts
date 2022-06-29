/**
剑指 Offer II 079. 所有子集
给定一个整数数组 nums ，数组中的元素 互不相同 。返回该数组所有可能的子集（幂集）。

解集 不能 包含重复的子集。你可以按 任意顺序 返回解集。

 

示例 1：

输入：nums = [1,2,3]
输出：[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
示例 2：

输入：nums = [0]
输出：[[],[0]]
 

提示：

1 <= nums.length <= 10
-10 <= nums[i] <= 10
nums 中的所有元素 互不相同
 */

/**
 * 方法一：回溯
 * @param nums
 * @returns
 */
function subsets(nums: number[]): number[][] {
  const res = [[]]
  const dfs = (pos: number, trace: number[]) => {
    if (pos === nums.length) return

    // 从第pos开始，到数组结束。每次把nums[i]加入trace，然后添加到res中
    // 然后dfs(i + 1, tarce)
    // 然后把nums[i]从trace中去掉。
    for (let i = pos; i < nums.length; i++) {
      trace.push(nums[i])
      res.push([...trace])
      dfs(i + 1, trace)
      trace.pop()
    }
  }
  dfs(0, [])
  return res
}

/**
 * 方法二：动态规划
 * @param nums
 * @returns
 */
function subsets3(nums: number[]): number[][] {
  const res = [[]]
  /**
   初始时res = [[]]
   假设nums只有一个数字1，则res会多出一个[1]。 res = [[], [1]]
   现在给nums添加一个数字2，则res应该多出[2], [1,2]. res = [[], [1], [2], [1,2]]
   现在给nums添加一个数字3，则res应该多出[3], [1,3], [2, 3], [1, 2, 3]

   相当于nums每多一个数字，res应该添加res.length个数组。其中每个数组为[...res[i], 新添加的元素]
   */
  for (let i = 0; i < nums.length; i++) {
    const n = res.length
    for (let j = 0; j < n; j++) {
      res.push([...res[j], nums[i]])
    }
  }
  return res
}

subsets3([1, 2, 3])
