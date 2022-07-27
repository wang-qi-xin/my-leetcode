/**
76. 最小覆盖子串
给你一个字符串 s 、一个字符串 t 。返回 s 中涵盖 t 所有字符的最小子串。如果 s 中不存在涵盖 t 所有字符的子串，则返回空字符串 "" 。

注意：

对于 t 中重复字符，我们寻找的子字符串中该字符数量必须不少于 t 中该字符数量。
如果 s 中存在这样的子串，我们保证它是唯一的答案。
 

示例 1：

输入：s = "ADOBECODEBANC", t = "ABC"
输出："BANC"
示例 2：

输入：s = "a", t = "a"
输出："a"
示例 3:

输入: s = "a", t = "aa"
输出: ""
解释: t 中两个字符 'a' 均应包含在 s 的子串中，
因此没有符合条件的子字符串，返回空字符串。
 

提示：

1 <= s.length, t.length <= 105
s 和 t 由英文字母组成
 

进阶：你能设计一个在 o(n) 时间内解决此问题的算法吗？
 */

import { mMap } from '../utils/数据结构/struct'

function minWindow(s: string, t: string): string {
  const maps = new mMap<string, number>(),
    mapt = new mMap<string, number>(),
    slen = s.length

  // 1. 保存t字符串中每个字符出现的次数
  for (let i = 0; i < t.length; i++) {
    const c = t.charAt(i)
    mapt.set(c, mapt.getOrDefault(c, 0) + 1)
  }

  /**
   * 检查maps中是否覆盖mapt的数据
   * @returns
   */
  const check = () => {
    const keyt = mapt.keys()
    for (const key of keyt) {
      if (maps.has(key)) {
        if (maps.get(key) < mapt.get(key)) return false
      } else {
        // 如果maps不含有mapt中的某个key, 直接返回false
        return false
      }
    }
    return true
  }

  let ansl = -1,
    len = Number.MAX_SAFE_INTEGER,
    l = 0,
    r = -1

  while (r < slen) {
    r++

    const s_char = s.charAt(r)
    // 2. 如果s的某个字符串不在t中, 就忽略。
    if (mapt.has(s_char)) {
      maps.set(s_char, maps.getOrDefault(s_char, 0) + 1)

      // 3. 如果s的当前l到r的子串覆盖t字符串
      while (check() && l <= r) {
        // 4. 记录最短的符合条件的子串, 在s中的起始位置和长度。
        if (r - l + 1 < len) {
          ansl = l
          len = r - l + 1
        }
        const l_char = s.charAt(l)
        // 5. 如果l位置的字符, 存在于t中。那么说明s中也存在。
        //      该字符的次数减一。
        if (maps.has(l_char)) {
          maps.set(l_char, maps.get(l_char) - 1)
        }
        // 6. 窗口右移,
        l++
      }
    }
  }

  return ansl === -1 ? '' : s.substring(ansl, ansl + len)
}
let s = 'ADOBECODEBANC',
  t = 'ABC'
s = 'ab'
t = 'a'
console.log(minWindow(s, t))
