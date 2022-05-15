/**
 * 剑指 Offer II 016. 不含重复字符的最长子字符串
 (滑动窗口+set)
 * @param s
 */
function lengthOfLongestSubstring(s: string): number {
  /**
  
  1. 枚举子串的起始位置i，结束位置j，子串i->j是不包含重复字符的最长字串。
  2. 使用set保存该字串所有的元素
  3. 每次i+1，从set中删除i字符，set.remove(s.charAt(i)), 则子串i+1->j一定不含重复元素，
      此时结束为止j可以向右扩展，并且将扩展的字符s.charAt(j)放入set。
      直到s.charAt(j)已经在set中了。
  4. 当确定j以后，使用max保存最长的字串长度
   */

  const set = new Set<string>()
  let max = 0
  for (let i = 0, j = 0; i < s.length; i++) {
    while (j < s.length && !set.has(s.charAt(j))) {
      set.add(s.charAt(j))
      j++
    }
    console.log(set, i, j)

    max = Math.max(max, j - i)
    const c = s.charAt(i)
    set.delete(c)
  }
  return max
}

// console.log(lengthOfLongestSubstring("bbbbb"))

/**
 * 剑指 Offer II 017. 含有所有字符的最短字符串
 * @param s
 * @param t
 */
function minWindow(s: string, t: string): string {
  if (t.length > s.length) return ''
  /**
  思路：滑动窗口，
      0. 令l，r窗口内的子串，始终符合条件。
      1. 每次r右移一位，就记录新加入的字符。
      2. 然后l循环右移，直到当前子串符合条件且最短。然后l再右移一位，此时子串不再符合条件。
      3. 循环体内，每次都要更新符合条件的最短子串长度和起始下标。

      如何验证子串是否符合条件？
      1. 使用T[58]保存t字符串中每个字符出现的次数。（A-Z a-z，一共52+4个字符）
      2. 使用S[58]保存s字符串的l->r子串中，每个字符出现的次数。
      3. 只要S每个对应位置都>=T, 说明l->r子串符合条件。
      4. 每次窗口变化，都更新S数组。

   使用长度为52的数组T保存t每一位出现的次数。
   使用长度为52的数组S保存s的子串每一位出现的次数。

    令l = 0, r = -1为s的子串的起始和结束下标。x， y为对应位置的字符
     left = -1, right = -1为含有所有字符的最短字符串的起始下标
   1. r += 1，y = s.charAt(r), S[y]++, 表示当前字串中添加了y字符
   2. 循环l += 1，直到l <= r 且（当前子串去掉l位置的x字符后，不再符合要求）
   3. 每次循环内，都更新字串的长度len为最小值，且保存起始下标left, right。
   4. 最终结束时，如果left == -1， 说明s中没有符合条件的子串，直接返回""
      否则返回s的left->right的子串
   */
  const S = [...Array(58)].map(i => 0),
    lens = s.length
  const T = [...Array(58)].map(i => 0),
    lent = t.length
  for (let i = 0; i < lent; i++) {
    T[t.charCodeAt(i) - 65]++
    // S[s.charCodeAt(i) - 65]++
  }

  const check = () => {
    for (let i = 0; i < 58; i++) {
      if (T[i] > S[i]) return false
    }
    return true
  }
  let left = -1,
    right = -1,
    len = Number.MAX_SAFE_INTEGER
  let l = 0,
    r = -1
  //  更新最短字串下标
  while (r < lens) {
    r++
    //  right扩张至当前字串符合条件为止
    if (r < lens) {
      S[s.charCodeAt(r) - 65]++
    }
    // left收缩至当前字串不符合条件为止
    while (l <= r && check()) {
      //  更新最短字串下标
      if (r - l + 1 < len) {
        len = r - l + 1
        left = l
        right = r + 1
      }
      S[s.charCodeAt(l) - 65]--
      l++
    }
  }

  return left === -1 ? '' : s.slice(left, right)
}
// let a = "ab", b = "b"
// let a = "ADOBECODEBANC", b = "ABC"
// let a = "ADOBECODEBANC", b = "ABC"
// console.log(minWindow(a, b))

/**
 * 剑指 Offer II 018. 有效的回文
 * @param s
 */
function isPalindrome(s: string): boolean {
  /**
   双指针l = 0,r = s.length

   循环l++, r--， 直到l,r都指向数字或字母。
   如果s[l] == s[r], 则l++, r--
   否则返回false
   */
  const check = (c: string) => {
    const code = c.charCodeAt(0)
    return (code > 47 && code < 58) || (code > 64 && code < 91) || (code > 96 && code < 123)
  }
  for (let l = 0, r = s.length - 1; l < r; l++, r--) {
    while (l < r && !check(s.charAt(l))) l++
    while (l < r && !check(s.charAt(r))) r--
    if (s.charAt(l).toLowerCase() !== s.charAt(r).toLowerCase()) return false
  }
  return true
}
