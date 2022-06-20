import { quickSort } from '../utils/排序/quickSort'

/**
 * 在英语中，有一个叫做 词根(root) 的概念，它可以跟着其他一些词组成另一个较长的单词——我们称这个词为 继承词(successor)。例如，词根an，跟随着单词 other(其他)，可以形成新的单词 another(另一个)。

现在，给定一个由许多词根组成的词典和一个句子，需要将句子中的所有继承词用词根替换掉。如果继承词有许多可以形成它的词根，则用最短的词根替换它。

需要输出替换之后的句子。

 

示例 1：

输入：dictionary = ["cat","bat","rat"], sentence = "the cattle was rattled by the battery"
输出："the cat was rat by the bat"
示例 2：

输入：dictionary = ["a","b","c"], sentence = "aadsfasf absbs bbab cadsfafs"
输出："a a b c"
示例 3：

输入：dictionary = ["a", "aa", "aaa", "aaaa"], sentence = "a aa a aaaa aaa aaa aaa aaaaaa bbb baba ababa"
输出："a a a a a a a a bbb baba a"
示例 4：

输入：dictionary = ["catt","cat","bat","rat"], sentence = "the cattle was rattled by the battery"
输出："the cat was rat by the bat"
示例 5：

输入：dictionary = ["ac","ab"], sentence = "it is abnormal that this solution is accepted"
输出："it is ab that this solution is ac"
 

提示：

1 <= dictionary.length <= 1000
1 <= dictionary[i].length <= 100
dictionary[i] 仅由小写字母组成。
1 <= sentence.length <= 10^6
sentence 仅由小写字母和空格组成。
sentence 中单词的总量在范围 [1, 1000] 内。
sentence 中每个单词的长度在范围 [1, 1000] 内。
sentence 中单词之间由一个空格隔开。
sentence 没有前导或尾随空格。

 */
class TrieNode {
  kids: TrieNode[] // 子节点
  isValid: boolean // 从跟节点到当前节点的路径，是否是一个前缀

  constructor() {
    this.kids = []
    this.isValid = false
  }
}

/**
 * 前缀字典树
 * @param dictionary
 * @param sentence
 * @returns
 */
function replaceWords(dictionary: string[], sentence: string): string {
  const root = new TrieNode()

  /**
   * 给字典树插入一个前缀。
   * @param str
   */
  const insert = (str: string) => {
    let p = root
    for (let i = 0; i < str.length; i++) {
      const c = str.charCodeAt(i) - 97
      // 如果p还没有c字符对应的节点，就new一个
      if (!p.kids[c]) {
        p.kids[c] = new TrieNode()
      }
      // 令p指向c字符对应的节点
      p = p.kids[c]
    }
    // 从root到p的路径，就是前缀str。
    p.isValid = true
  }

  /**
   * 在字典树中查找是否有str的最短前缀
   * @param str
   * @returns
   */
  const search = (str: string): string => {
    let p = root,
      i = 0
    for (; i < str.length; i++) {
      // 假如从root到p的路径s是一个前缀，直接返回str的前i个字符（也就是前缀s）
      if (p.isValid) return str.slice(0, i)
      const c = str.charCodeAt(i) - 97
      if (p.kids[c]) {
        p = p.kids[c]
      } else {
        // 如果字典树中，没有字符c对应的节点，说明字典树中不存在str的前缀。直接返回""
        return ''
      }
    }
    return str.slice(0, i)
  }

  // 1. 构建前缀字典树
  for (let i = 0; i < dictionary.length; i++) {
    insert(dictionary[i])
  }

  const s = sentence.split(' ')
  let res = ''
  // 2. 遍历sentence中的单词
  for (let i = 0; i < s.length; i++) {
    const trie = search(s[i])
    // 如果字典树中包含s[i]的前缀，就使用前缀替换s[i]拼接到结果中
    if (trie !== '') {
      res += trie + ' '
    } else {
      res += s[i] + ' '
    }
  }

  // 3. 删除最后一位的空格。
  return res.trim()
}

/**
 * 前缀字典树(优化)
 * @param dictionary
 * @param sentence
 * @returns
 */
function replaceWords2(dictionary: string[], sentence: string): string {
  // 优化：1. 排序
  quickSort(dictionary, (s, t) => s.length - t.length)
  const root = new TrieNode()

  /**
   * 给字典树插入一个前缀。
   * @param str
   */
  const insert = (str: string) => {
    let p = root
    for (let i = 0; i < str.length; i++) {
      // 优化：2. 如果已经有str的前缀了，就不用再插入str了
      if (p.isValid) return
      const c = str.charCodeAt(i) - 97
      // 如果p还没有c字符对应的节点，就new一个
      if (!p.kids[c]) {
        p.kids[c] = new TrieNode()
      }
      // 令p指向c字符对应的节点
      p = p.kids[c]
    }
    // 从root到p的路径，就是前缀str。
    p.isValid = true
  }

  /**
   * 在字典树中查找是否有str的最短前缀
   * @param str
   * @returns
   */
  const search = (str: string): string => {
    let p = root,
      i = 0
    for (; i < str.length; i++) {
      // 假如从root到p的路径s是一个前缀，直接返回str的前i个字符（也就是前缀s）
      if (p.isValid) return str.slice(0, i)
      const c = str.charCodeAt(i) - 97
      if (p.kids[c]) {
        p = p.kids[c]
      } else {
        // 如果字典树中，没有字符c对应的节点，说明字典树中不存在str的前缀。直接返回""
        return ''
      }
    }
    return str.slice(0, i)
  }

  // 1. 构建前缀字典树
  for (let i = 0; i < dictionary.length; i++) {
    insert(dictionary[i])
  }

  const s = sentence.split(' ')
  let res = ''
  // 2. 遍历sentence中的单词
  for (let i = 0; i < s.length; i++) {
    const trie = search(s[i])
    // 如果字典树中包含s[i]的前缀，就使用前缀替换s[i]拼接到结果中
    if (trie !== '') {
      res += trie + ' '
    } else {
      res += s[i] + ' '
    }
  }

  // 3. 删除最后一位的空格。
  return res.trim()
}

// replaceWords(['cat', 'bat', 'rat'], 'the cattle was rattled by the battery')
