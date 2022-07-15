import { TrieNode } from "./数据结构/struct"

/**
 * 将str的pos位置替换成replace
 * @param str
 * @param pos
 * @param replace
 * @returns
 */
export function replace(str: string, pos: number, replace: string) {
  return `${str.slice(0, pos)}${replace}${str.slice(pos + 1, str.length)}`
}

/**
 * 字典树

 1. 构建字典树

 ```ts
  const trie = new Trie(['a', 'b', 'ab', 'abc', 'bc', 'abdf', 'aqweoij', 'awq', 'aqweilkjlj', 'cdfd'])
  trie.insert("dhfjl")
 ```

 2. 在字典树中查询符合前缀prefix的字符串
 ```ts
 console.log(trie.searchPrefix('aqw'))
 ```
 */
export class Trie {
  root: TrieNode
  constructor(words?: string[]) {
    this.root = new TrieNode()
    if (words) {
      for (let i = 0; i < words.length; i++) {
        this.insert(words[i])
      }
    }
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
  private getWord(node: TrieNode): string[] {
    const trace = [],
      result = []
    const dfs = (node: TrieNode) => {
      if (!node) return
      if (node.end) {
        result.push(trace.join(''))
      }
      for (let i = 0, kids = node.kids; i < kids.length; i++) {
        if (kids[i]) {
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
