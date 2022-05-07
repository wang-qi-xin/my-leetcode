/**
 * 剑指 Offer II 086. 分割回文子字符串
 （回溯+动态规划预处理）
 * @param s
 */
function partition(s: string): string[][] {
  /**
   回溯+动态规划预处理

   1. 使用回溯来处理所有可能的分割结果
   2. 判断某个字符串是否为回文子串，如果使用双指针来判断，会进行大量的重复计算。
        所以使用动态规划预处理。dp[i][j] 表示字符串s从i到j的子串是否是回文串。
        如果i >= j 则dp[i][j] = true
        如果i < j, 那个dp[i][j] = dp[i + 1][j - 1] & s[i] === s[j]
   3. 
   */
  const res: string[][] = [],
    track: string[] = [],
    len = s.length
  const dp = [...Array(len)].map(_ => Array(len).fill(true))

  // 1. 使用动态规划预处理。dp[i][j]表示s的i->j子串是否是回文串
  for (let i = len - 1; i >= 0; i--) {
    for (let j = i + 1; j < len; j++) {
      dp[i][j] = dp[i + 1][j - 1] && s[i] === s[j]
    }
  }

  /**
   * 2. 深度遍历所有的子串
   * @param left 当前子串的起点left
   * @returns 
   */
  const dfs = (left: number) => {
    // 如果起点等于left，说明track已经放入了s所有的子串。
    if(left === len){
      res.push([...track])
      return
    }

    for(let right = left; right < len; right++){
      // 如果s的i->j子串是回文串 
      if(dp[left][right]){
        // 就把该子串放入track，然后开始处理其它子串
        track.push(s.slice(left, right + 1))
        dfs(right + 1)
        track.pop()
      }
    }
  }

  dfs(0)
  return res
}
// partition('google')
