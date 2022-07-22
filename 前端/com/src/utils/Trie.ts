class TrieNode {
  kids: TrieNode[] // 子节点
  end: boolean // 是否结束

  constructor() {
    this.kids = []
    this.end = false
  }
}
export class Trie {
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
    const trace: string[] = [], result: string[] = []
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
