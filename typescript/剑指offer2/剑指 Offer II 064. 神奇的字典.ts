/**
 剑指 Offer II 064. 神奇的字典
设计一个使用单词列表进行初始化的数据结构，单词列表中的单词 互不相同 。 如果给出一个单词，请判定能否只将这个单词中一个字母换成另一个字母，使得所形成的新单词存在于已构建的神奇字典中。

实现 MagicDictionary 类：

MagicDictionary() 初始化对象
void buildDict(String[] dictionary) 使用字符串数组 dictionary 设定该数据结构，dictionary 中的字符串互不相同
bool search(String searchWord) 给定一个字符串 searchWord ，判定能否只将字符串中 一个 字母换成另一个字母，使得所形成的新字符串能够与字典中的任一字符串匹配。如果可以，返回 true ；否则，返回 false 。
 

示例：

输入
inputs = ["MagicDictionary", "buildDict", "search", "search", "search", "search"]
inputs = [[], [["hello", "leetcode"]], ["hello"], ["hhllo"], ["hell"], ["leetcoded"]]
输出
[null, null, false, true, false, false]

解释
MagicDictionary magicDictionary = new MagicDictionary();
magicDictionary.buildDict(["hello", "leetcode"]);
magicDictionary.search("hello"); // 返回 False
magicDictionary.search("hhllo"); // 将第二个 'h' 替换为 'e' 可以匹配 "hello" ，所以返回 True
magicDictionary.search("hell"); // 返回 False
magicDictionary.search("leetcoded"); // 返回 False
 

提示：

1 <= dictionary.length <= 100
1 <= dictionary[i].length <= 100
dictionary[i] 仅由小写英文字母组成
dictionary 中的所有字符串 互不相同
1 <= searchWord.length <= 100
searchWord 仅由小写英文字母组成
buildDict 仅在 search 之前调用一次
最多调用 100 次 search 

 */
class TrieNode {
  kids: TrieNode[] // 子节点
  isEnd: boolean // 从跟节点到当前节点的路径，是否是一个单词

  constructor() {
    this.kids = []
    this.isEnd = false
  }
}
class MagicDictionary {
  root: TrieNode
  constructor() {
    this.root = new TrieNode()
  }

  buildDict(dictionary: string[]): void {
    // 1. 构建前缀字典树
    for (let i = 0; i < dictionary.length; i++) {
      this.insert(dictionary[i])
    }
  }

  search(searchWord: string): boolean {
    /**
       n = searchWord.length
       1. 遍历n次字典树root
       2. 遍历第i个字符时，如果将其替换为其它25个字符j后，字典树中存在节点p.kids[j]，
          那么就从p.kids[j]开始，匹配searchWord后面的子串。如果成功匹配，就返回true
       3. 如果所有的字符遍历结束后，还不匹配，就返回false
       */
    const n = searchWord.length
    let p = this.root
    for (let i = 0; i < n; i++) {
      const c = searchWord.charCodeAt(i) - 97

      for (let j = 0; j < 26; j++) {
        if (j === c || !p.kids[j]) continue

        if (this.searchNode(p.kids[j], searchWord.substring(i + 1))) return true
      }

      if (!p.kids[c]) return false

      p = p.kids[c]
    }
    return false
  }

  insert(str: string) {
    let p = this.root
    for (let i = 0; i < str.length; i++) {
      const c = str.charCodeAt(i) - 97
      // 如果p还没有c字符对应的节点，就new一个
      if (!p.kids[c]) {
        p.kids[c] = new TrieNode()
      }
      // 令p指向c字符对应的节点
      p = p.kids[c]
    }
    // 从root到p的路径，就是一个单词。
    p.isEnd = true
  }

  /**
   * 从node开始，在字典树中匹配str
   * @param node
   * @param str
   * @returns
   */
  searchNode(node: TrieNode, str: string): boolean {
    let p = node
    for (let i = 0; i < str.length; i++) {
      const c = str.charCodeAt(i) - 97
      if (!p.kids[c]) {
        return false
      }
      p = p.kids[c]
    }
    // p.isEnd表示从this.root到p的路径，是否是一个单词
    return p.isEnd
  }
}

/**
 * Your MagicDictionary object will be instantiated and called as such:
 * var obj = new MagicDictionary()
 * obj.buildDict(dictionary)
 * var param_2 = obj.search(searchWord)
 */
