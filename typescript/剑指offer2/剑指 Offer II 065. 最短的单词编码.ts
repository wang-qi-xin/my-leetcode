/**
剑指 Offer II 065. 最短的单词编码
单词数组 words 的 有效编码 由任意助记字符串 s 和下标数组 indices 组成，且满足：

words.length == indices.length
助记字符串 s 以 '#' 字符结尾
对于每个下标 indices[i] ，s 的一个从 indices[i] 开始、到下一个 '#' 字符结束（但不包括 '#'）的 子字符串 恰好与 words[i] 相等
给定一个单词数组 words ，返回成功对 words 进行编码的最小助记字符串 s 的长度 。

 

示例 1：

输入：words = ["time", "me", "bell"]
输出：10
解释：一组有效编码为 s = "time#bell#" 和 indices = [0, 2, 5] 。
words[0] = "time" ，s 开始于 indices[0] = 0 到下一个 '#' 结束的子字符串，如加粗部分所示 "time#bell#"
words[1] = "me" ，s 开始于 indices[1] = 2 到下一个 '#' 结束的子字符串，如加粗部分所示 "time#bell#"
words[2] = "bell" ，s 开始于 indices[2] = 5 到下一个 '#' 结束的子字符串，如加粗部分所示 "time#bell#"
示例 2：

输入：words = ["t"]
输出：2
解释：一组有效编码为 s = "t#" 和 indices = [0] 。
 

提示：

1 <= words.length <= 2000
1 <= words[i].length <= 7
words[i] 仅由小写字母组成
 */
class TrieNode {
  kids: TrieNode[] // 子节点
  isEnd: boolean // 从跟节点到当前节点的路径，是否是一个单词

  constructor() {
    this.kids = []
    this.isEnd = false
  }
}
function minimumLengthEncoding(words: string[]): number {
  const root = new TrieNode()
  // 统计字典树中的字符串长度和个数。
  let res = 0

  /**
   * 后缀字典树
   * @param str
   */
  const insert = (str: string) => {
    let p = root,
      n = str.length, // 字符串长度
      deep = 0 // 字典树中p节点的深度
    for (let i = n - 1; i >= 0; i--) {
      const c = str.charCodeAt(i) - 97
      // 如果p还没有c字符对应的节点，就new一个
      if (!p.kids[c]) {
        p.kids[c] = new TrieNode()
      }
      // 如果从root到p已经是一个单词了，那么就说明该单词已经统计过长度了
      // 先从res中把当前长度deep减去，再减一个1（表示#）
      // 然后令p.isEnd = false, 表示忽略该后缀
      if (p.isEnd) {
        res -= deep + 1
        p.isEnd = false
      }
      deep++
      // 令p指向c字符对应的节点
      p = p.kids[c]
    }
    // 如果p还有孩子节点，说明已经统计过更长的后缀长度了，忽略该str
    // 并且如果p.isEnd = true，说明存在重复单词，也直接跳过
    if (p.kids.length === 0 && !p.isEnd) {
      p.isEnd = true
      res += deep + 1
    }
  }
  for (let i = 0; i < words.length; i++) {
    insert(words[i])
  }

  return res
}

console.log(minimumLengthEncoding(['time', 'time', 'time', 'time']))
