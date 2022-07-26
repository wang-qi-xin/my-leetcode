/**
72. 编辑距离
给你两个单词 word1 和 word2， 请返回将 word1 转换成 word2 所使用的最少操作数  。

你可以对一个单词进行如下三种操作：

插入一个字符
删除一个字符
替换一个字符
 

示例 1：

输入：word1 = "horse", word2 = "ros"
输出：3
解释：
horse -> rorse (将 'h' 替换为 'r')
rorse -> rose (删除 'r')
rose -> ros (删除 'e')
示例 2：

输入：word1 = "intention", word2 = "execution"
输出：5
解释：
intention -> inention (删除 't')
inention -> enention (将 'i' 替换为 'e')
enention -> exention (将 'n' 替换为 'x')
exention -> exection (将 'n' 替换为 'c')
exection -> execution (插入 'u')
 

提示：

0 <= word1.length, word2.length <= 500
word1 和 word2 由小写英文字母组成
 */
function minDistance(word1: string, word2: string): number {
  /**
   dp[i][j]表示word1的前i子串, 变成word2的前j子串, 需要的操作数。
   1. 如果i = 0, 或j = 0, 那么这个操作数就等于另一子串的长度。
   2. dp[i][j]如何得到？

      <1>. dp[i][j] = dp[i - 1][j] + 1。 
         表示word1的前i-1子串, 经过dp[i - 1][j]次操作, 得到word2的前j子串。  然后word1的前i子串, 还需要经过一次删除操作, 就可以得到word2的前j子串。
      <2>. dp[i][j] = dp[i][j - 1] + 1。 
         表示word1的前i子串, 经过dp[i][j - 1]次操作, 得到word2的前j-1子串。  然后再经过一次增加操作, 就可以得到word2的前j子串。
      <3>. dp[i][j] = dp[i - 1][j - 1] + (1 ? 0)
         word1的前i-1子串经过dp[i - 1][j - 1]次操作, 可以得到word2的前j-1子串。 
         那么word1[i]和word2[j]如果相等, 那么dp[i][j] = dp[i - 1][j - 1]
         如果不等于, 那么经过一次替换操作, dp[i][j] = dp[i - 1][j - 1] + 1
    3. 以上三种情况, 取最小值即可。

   */
  const dp = [...Array(word1.length + 1)].map(i => [...Array(word2.length + 1)].fill(0))

  // 1. 初始化dp. 空串到长度为j的子串的最小变换数为j。
  for (let j = 0; j < word2.length; j++) {
    dp[0][j + 1] = j + 1
  }

  for (let i = 0; i < word1.length; i++) {
    dp[i + 1][0] = i + 1
  }

  // 2. 遍历两个字符串。
  for (let i = 0; i < word1.length; i++) {
    const a = word1.charAt(i)
    for (let j = 0; j < word2.length; j++) {
      // 判断word1[i]和word2[j]是否相等。
      const c = a === word2.charAt(j) ? 0 : 1
      dp[i + 1][j + 1] = Math.min(Math.min(dp[i][j + 1] + 1, dp[i + 1][j] + 1), dp[i][j] + c)
    }
  }

  return dp[word1.length][word2.length]
}
console.log(minDistance('horse', 'ros'))
