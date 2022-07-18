/**
 17. 电话号码的字母组合
给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。答案可以按 任意顺序 返回。

给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。



 

示例 1：

输入：digits = "23"
输出：["ad","ae","af","bd","be","bf","cd","ce","cf"]
示例 2：

输入：digits = ""
输出：[]
示例 3：

输入：digits = "2"
输出：["a","b","c"]
 

提示：

0 <= digits.length <= 4
digits[i] 是范围 ['2', '9'] 的一个数字。
通过次数526,644提交次数911,061 
 * @param digits 
 */
function letterCombinations(digits: string): string[] {
  if (digits.length === 0) return []
  const map = new Map<string, string[]>()
  map.set('2', ['a', 'b', 'c'])
  map.set('3', ['d', 'e', 'f'])
  map.set('4', ['g', 'h', 'i'])
  map.set('5', ['j', 'k', 'l'])
  map.set('6', ['m', 'n', 'o'])
  map.set('7', ['p', 'q', 'r', 's'])
  map.set('8', ['t', 'u', 'v'])
  map.set('9', ['w', 'x', 'y', 'z'])

  const trace = [],
    res = [],
    len = digits.length
  const dfs = (pos: number) => {
    if (pos > len) return
    if (pos === len) {
      res.push(trace.join(''))
      return
    }
    const chars = map.get(digits.charAt(pos))
    for (let i = 0; i < chars.length; i++) {
      trace.push(chars[i])
      dfs(pos + 1)
      trace.pop()
    }
  }

  dfs(0)
  return res
}

console.log(letterCombinations(""))
