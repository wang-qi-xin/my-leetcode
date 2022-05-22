/**
 * 5. 最长回文子串
 (中心扩展法)
 * @param s 
 * @returns 
 */
function longestPalindrome(s: string) {
  if (s.length === 0) return ''
  let start = 0,
    end = 0
  for (let i = 0; i < s.length; i++) {
    const len = Math.max(expand(s, i, i), expand(s, i, i + 1))
    console.log(i, s.charAt(i), len, start, end)
    if (end - start < len) {
      start = i - Math.floor((len - 1) / 2)
      end = i + Math.floor(len / 2)
    }
  }
  return s.slice(start, end + 1)
}

function expand(s: string, left: number, right: number) {
  while (left >= 0 && right < s.length && s.charAt(left) === s.charAt(right)) {
    left--
    right++
  }
  return right - left - 1
}

/**
 * 5. 最长回文子串
 (动态规划)
 * @param s 
 * @returns 
 */
function longestPalindrome2(s: string) {
  /**
   动态规划
   dp[i][j]表示从i->j的子串是否是回文串。
   dp[i][j] = (s.charAt(i) === s.charAt(j)) && dp[i + 1][j - 1] 
   */
  let start = 0,
    end = 0
  const len = s.length,
    dp = [...Array(len)].map(_ => Array(len).fill(false))
  for (let i = len - 1; i >= 0; i--) {
    dp[i][i] = true
    for (let j = i + 1; j < len; j++) {
      dp[i][j] = s.charAt(i) === s.charAt(j)
      if (j - i > 2) {
        dp[i][j] = dp[i][j] && dp[i + 1][j - 1]
      }
      if (dp[i][j] && j - i > end - start) {
        start = i
        end = j
      }
    }
  }
  return s.slice(start, end + 1)
}

/**
 * 5. 最长回文子串
 (Manacher 马拉车算法)
 * @param s 
 * @returns 
 */
function longestPalindrome3(s: string) {
  if (s.length === 0) return ''
  // 1. 预处理
  let temp = "^"
  for(let i = 0; i < s.length; i++){
    temp += `#${s.charAt(i)}`
  }
  temp += "#$"

  let n = temp.length, C = 0, R = 0, P = []
  //3. P[i]表示以i为中心的最长回文串的长度的一半，也就是半径
  // C，R用来记录回文串的中心和右边界，如果当前访问的下标i超过了R, 则更新C, R
  for(let i = 1; i < n - 1; i++){
    let i_mirror = C * 2 - i
    if(R > i){
      // 此时可以利用对称性，
      // 但是如果P[i]实际上的数，加上i已经超过了R, (也就是超过了边界，以i为中心的回文串其实不止P[i_mirror]),则无法使用对称性。
      //    但P[i]最少也等于P[i_mirror], 剩下的进行扩展
      P[i] = Math.min(R - i, P[i_mirror])
    }else{
      // 当i已经扩展到R时，不能再利用对称性了
      // 令P[i] = 0, 然后以i为中心，进行扩展，最后再更新R
      P[i] = 0
    }
    
    // 如果还可以扩展，就继续增大P[i]
    // 此时就是P[i] + i 已经大于R了， 需要更新R
    while(temp.charAt(i - 1 - P[i]) === temp.charAt(i + 1 + P[i])){
      P[i]++
    }

    if(i + P[i] > R){
      C = i
      R = i + P[i]
    }
  }

  // 3. 寻找最长的回文串
  let maxLen = 0, curIndex = 0
  for(let i = 0; i < n; i++){
    if(P[i] > maxLen){
      maxLen = P[i]
      curIndex = i
    }
  }
  const start = Math.floor((curIndex - maxLen) / 2)
  return s.slice(start, start + maxLen)
}

// console.log(longestPalindrome3('babad'))
