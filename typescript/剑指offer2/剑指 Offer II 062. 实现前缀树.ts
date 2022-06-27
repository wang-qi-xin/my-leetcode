/**
剑指 Offer II 062. 实现前缀树
Trie（发音类似 "try"）或者说 前缀树 是一种树形数据结构，用于高效地存储和检索字符串数据集中的键。这一数据结构有相当多的应用情景，例如自动补完和拼写检查。

请你实现 Trie 类：

Trie() 初始化前缀树对象。
void insert(String word) 向前缀树中插入字符串 word 。
boolean search(String word) 如果字符串 word 在前缀树中，返回 true（即，在检索之前已经插入）；否则，返回 false 。
boolean startsWith(String prefix) 如果之前已经插入的字符串 word 的前缀之一为 prefix ，返回 true ；否则，返回 false 。
 

示例：

输入
inputs = ["Trie", "insert", "search", "search", "startsWith", "insert", "search"]
inputs = [[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]]
输出
[null, null, true, false, true, null, true]

解释
Trie trie = new Trie();
trie.insert("apple");
trie.search("apple");   // 返回 True
trie.search("app");     // 返回 False
trie.startsWith("app"); // 返回 True
trie.insert("app");
trie.search("app");     // 返回 True
 

提示：

1 <= word.length, prefix.length <= 2000
word 和 prefix 仅由小写英文字母组成
insert、search 和 startsWith 调用次数 总计 不超过 3 * 104 次
 
 */
class TrieNode {
  kids: TrieNode[] // 子节点
  end: boolean // 是否结束

  constructor() {
    this.kids = []
    this.end = false
  }
}
class Trie {
  root: TrieNode
  constructor() {
    this.root = new TrieNode()
  }

  insert(word: string): void {
    let p = this.root
    for (let i = 0; i < word.length; i++) {
      const c = word.charCodeAt(i) - 97
      if (!p.kids[c]) {
        p.kids[c] = new TrieNode()
      }
      p = p.kids[c]
    }
    p.end = true
  }

  search(word: string): boolean {
    let p = this.root
    for (let i = 0; i < word.length; i++) {
      const c = word.charCodeAt(i) - 97
      if (!p.kids[c]) {
        // 如果字母c不在前缀树中，直接返回false。
        return false
      }
      p = p.kids[c]
    }
    // 如果从root到p是一个字符串，则为true，否则为false
    return p.end
  }

  startsWith(prefix: string): boolean {
    let p = this.root
    for (let i = 0; i < prefix.length; i++) {
      const c = prefix.charCodeAt(i) - 97
      if (!p.kids[c]) {
        return false
      }
      p = p.kids[c]
    }
    // 只要字典树中包含prefix，就返回true
    return true
  }
}

/**
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */
