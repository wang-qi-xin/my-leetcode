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
    while(j < s.length && !set.has(s.charAt(j))){
      set.add(s.charAt(j))
      j++
    }
    console.log(set, i, j);
    
    max = Math.max(max, j - i)
    const c = s.charAt(i)
    set.delete(c)
  }
  return max
}

// console.log(lengthOfLongestSubstring("bbbbb"))
