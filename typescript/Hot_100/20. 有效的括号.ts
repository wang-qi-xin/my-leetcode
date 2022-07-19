/**
 20. 有效的括号
给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。

有效字符串需满足：

左括号必须用相同类型的右括号闭合。
左括号必须以正确的顺序闭合。
 

示例 1：

输入：s = "()"
输出：true
示例 2：

输入：s = "()[]{}"
输出：true
示例 3：

输入：s = "(]"
输出：false
示例 4：

输入：s = "([)]"
输出：false
示例 5：

输入：s = "{[]}"
输出：true
 

提示：

1 <= s.length <= 104
s 仅由括号 '()[]{}' 组成 
 * @param s 
 
 */
function isValid(s: string): boolean {
  const m = ['(', ')', '{', '}', '[', ']']
  /**
  () --  v[0]
  {} --  v[1]
  [] --  v[2]

  构造一个栈，如果遇到了左括号直接入栈。
  如果遇到了右括号，查看是否与栈顶括号匹配。
     1. 如果匹配，则pop()
     2. 不匹配，直接返回false
  
  遍历结束后，如果栈为空，则返回true
   */
  const getIndex = (c: string): number => {
    for (let i = 0; i < m.length; i++) {
      if (c === m[i]) return i
    }
  }
  const stack = []
  for (let i = 0; i < s.length; i++) {
    const index = getIndex(s.charAt(i))
    if (index & 1) {
      if (stack[stack.length - 1] === index - 1) {
        stack.pop()
      } else {
        return false
      }
    } else {
      stack.push(index)
    }
  }

  return stack.length === 0
}

console.log(isValid('{[]}'))
