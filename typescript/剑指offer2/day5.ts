/**
 * 剑指 Offer II 095. 最长公共子序列
 (动态规划)
 * @param text1
 * @param text2
 */
function longestCommonSubsequence(s: string, t: string): number {
  /**
  动态规划
  
  m = s.length
  n = t.length
  创建dp[m][n]
  其中dp[i][j]表示s[0 - i]和t[0 - j]的最长公共子序列
  
  如果s[i] === t[j], dp[i][j] = dp[i - 1][j - 1] + 1
  否则 dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])

  if(s[0] === t[0]) dp[0][0] = 1
  else dp[0][0] = 0
  */

  const dp = [...Array(s.length + 1)].map(_ => [...Array(t.length + 1)].fill(0))

  for (let i = 1; i <= s.length; i++) {
    const sc = s.charAt(i - 1)
    for (let j = 1; j <= t.length; j++) {
      if (sc === t.charAt(j - 1)) {
        dp[i][j] = dp[i - 1][j - 1] + 1
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
      }
    }
  }

  return dp[s.length][t.length]
}

/**
 * 剑指 Offer II 033. 变位词组
 * @param strs
 */
function groupAnagrams(strs: string[]): string[][] {
  /**
   1. 遍历strs
   2. 由于strs仅包含小写字母，创建长为26的数组num
   3. 保存strs[i]每一位出现的次数。然后将num转为string
   4. 将num存入map，value为数组[strs[i]]
   5. 如果map.has(num), 说明存在同位词，则map.get(num).push(strs[i])
   */
  const map = new Map<string, string[]>()
  for (let i = 0; i < strs.length; i++) {
    const num: number[] = [...Array(26)].fill(0),
      str = strs[i]

    for (let j = 0; j < str.length; j++) {
      num[str.charCodeAt(j) - 97]++
    }

    const numStr = num.toString()
    if (map.has(numStr)) {
      map.get(numStr).push(str)
    } else {
      map.set(numStr, [str])
    }
  }
  return [...map.values()]
}

/**
 * 剑指 Offer II 096. 字符串交织
 (动态规划)
 * @param s1
 * @param s2
 * @param s3
 */
function isInterleave(s1: string, s2: string, s3: string): boolean {
  /**
   动态规划

   dp[i][j] 表示s1[0-i]和s2[0-j]是否 可以交织成s3[0-(i + j + 1)]

   假如s1[i] == s3[i + j], 只要dp[i - 1][j]为true，(也就是s1[0-(i - 1)]和s2[0 - j]可以交织成s3[0-(i + j + 1)])则dp[i][j] = true
   同理s2[j] == s3[i + j], 只要dp[i][j - 1]为true, 则dp[i][j] = true

   假如s1长度为len， 下标范围为0 - len - 1. 而s1与s2交织时，s1的子串可以是空字符串"", 只要s2 == s3。
   所以dp[0][j], 表示s1取空串。dp[len]表示取整个s1。
   */
  const len1 = s1.length,
    len2 = s2.length,
    len3 = s3.length
  if (len1 + len2 !== len3) return false
  const dp = [...Array(len1 + 1)].map(i => [...Array(len2 + 1)].fill(false))

  // 两个空串可以交织成空串
  dp[0][0] = true

  // s1[0 - > i]是否可以和空串交织成s3[0->i]取决于s1.charAt(i) === s3.charAt(i)
  for (let i = 0; i < len1 && s1.charAt(i) === s3.charAt(i); i++) {
    dp[i + 1][0] = true
  }

  // s2同理
  for (let j = 0; j < len2 && s2.charAt(j) === s3.charAt(j); j++) {
    dp[0][j + 1] = true
  }

  for (let i = 0; i < len1; i++) {
    for (let j = 0; j < len2; j++) {
      dp[i + 1][j + 1] = (s1.charAt(i) === s3.charAt(i + j + 1) && dp[i][j + 1]) || (s2.charAt(j) === s3.charAt(i + j + 1) && dp[i + 1][j])
    }
  }
  return dp[len1][len2]
}
