import { TrieNode } from "../utils/数据结构/struct"

/**
208. 实现 Trie (前缀树)
Trie（发音类似 "try"）或者说 前缀树 是一种树形数据结构，用于高效地存储和检索字符串数据集中的键。这一数据结构有相当多的应用情景，例如自动补完和拼写检查。

请你实现 Trie 类：

Trie() 初始化前缀树对象。
void insert(String word) 向前缀树中插入字符串 word 。
boolean search(String word) 如果字符串 word 在前缀树中，返回 true（即，在检索之前已经插入）；否则，返回 false 。
boolean startsWith(String prefix) 如果之前已经插入的字符串 word 的前缀之一为 prefix ，返回 true ；否则，返回 false 。
 

示例：

输入
["Trie", "insert", "search", "search", "startsWith", "insert", "search"]
[[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]]
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
class Trie2 {
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
        return false
      }
      p = p.kids[c]
    }
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
    return true
  }
  
  /**
   * 寻找符合前缀prefix的所有单词
   * @param prefix 
   * @returns 
   */
  searchPrefix(prefix: string): string[] {
    let p = this.root
    for (let i = 0; i < prefix.length; i++) {
      const c = prefix.charCodeAt(i) - 97
      if (!p.kids[c]) {
        return []
      }
      p = p.kids[c]
    }
    return this.getWord(p).map(word => prefix + word)
  }
  
  /**
   * 获取字典树中节点node开始的所有单词。
   * @param node 
   */
  getWord(node: TrieNode): string[] {
    const trace = [], result = []
    const dfs = (node: TrieNode) => {
      if(!node) return
      if(node.end) {
        result.push(trace.join(""))
      }
      for(let i = 0, kids = node.kids; i < kids.length; i++){
        if(kids[i]){
          trace.push(String.fromCharCode(97 + i))
          dfs(kids[i])
          trace.pop()
        }
      }
    }
    dfs(node)
    return result
  }
}

/**
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */
const build = (words: string[]): Trie2 => {
  const trie = new Trie2()
  for (let i = 0; i < words.length; i++) {
    trie.insert(words[i])
  }
  return trie
}

const trie = build(['a', 'b', 'ab','abc','bc','abdf','aqweoij','awq','aqweilkjlj','cdfd'])
console.log(trie.searchPrefix("aqw"))
