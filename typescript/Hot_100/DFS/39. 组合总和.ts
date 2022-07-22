/**
39. 组合总和
给你一个 无重复元素 的整数数组 candidates 和一个目标整数 target ，找出 candidates 中可以使数字和为目标数 target 的 所有 不同组合 ，并以列表形式返回。你可以按 任意顺序 返回这些组合。

candidates 中的 同一个 数字可以 无限制重复被选取 。如果至少一个数字的被选数量不同，则两种组合是不同的。 

对于给定的输入，保证和为 target 的不同组合数少于 150 个。

 

示例 1：

输入：candidates = [2,3,6,7], target = 7
输出：[[2,2,3],[7]]
解释：
2 和 3 可以形成一组候选，2 + 2 + 3 = 7 。注意 2 可以使用多次。
7 也是一个候选， 7 = 7 。
仅有这两种组合。
示例 2：

输入: candidates = [2,3,5], target = 8
输出: [[2,2,2,2],[2,3,3],[3,5]]
示例 3：

输入: candidates = [2], target = 1
输出: []
 

提示：

1 <= candidates.length <= 30
1 <= candidates[i] <= 200
candidate 中的每个元素都 互不相同
1 <= target <= 500
 */
function combinationSum(candidates: number[], target: number): number[][] {
  /**
   * 方法一: 深度优先遍历+回溯

   每次dfs(pos, tar), 都开始从pos位置查找和为tar的元素。
   1. 如果tar === 0, 说明当前trace中的元素等于tar。
   2. 如果pos >= len 数组已经遍历结束。返回
   3. 如果tar < 0, 由于数组全是正数, 所以tar不可能再等于0了。返回。
   4. 从pos位置开始, dfs
   */
  const trace = [],
    res = [],
    len = candidates.length
  const dfs = (pos: number, tar: number) => {
    if (tar === 0) {
      // 
      res.push([...trace])
      return
    }
    if (pos >= len || tar < 0) return
    for (let i = pos; i < len; i++) {
      trace.push(candidates[i])
      dfs(i, tar - candidates[i])
      trace.pop()
    }
  }
  dfs(0, target)
  return res
}
console.log('[  ] >', combinationSum([2, 3, 6, 7], 7))
