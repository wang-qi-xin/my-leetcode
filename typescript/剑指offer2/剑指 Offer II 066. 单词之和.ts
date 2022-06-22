/**
剑指 Offer II 066. 单词之和
实现一个 MapSum 类，支持两个方法，insert 和 sum：

MapSum() 初始化 MapSum 对象
void insert(String key, int val) 插入 key-val 键值对，字符串表示键 key ，整数表示值 val 。如果键 key 已经存在，那么原来的键值对将被替代成新的键值对。
int sum(string prefix) 返回所有以该前缀 prefix 开头的键 key 的值的总和。
 

示例：

输入：
inputs = ["MapSum", "insert", "sum", "insert", "sum"]
inputs = [[], ["apple", 3], ["ap"], ["app", 2], ["ap"]]
输出：
[null, null, 3, null, 5]

解释：
MapSum mapSum = new MapSum();
mapSum.insert("apple", 3);  
mapSum.sum("ap");           // return 3 (apple = 3)
mapSum.insert("app", 2);    
mapSum.sum("ap");           // return 5 (apple + app = 3 + 2 = 5)
 

提示：

1 <= key.length, prefix.length <= 50
key 和 prefix 仅由小写英文字母组成
1 <= val <= 1000
最多调用 50 次 insert 和 sum
 */

class TrieNode {
  kids: TrieNode[] // 子节点
  value: number // 该字母的值

  constructor() {
    this.kids = []
    this.value = 0
  }
}

class MapSum {
  /**
   字典树
   */
  root: TrieNode
  constructor() {
    this.root = new TrieNode()
  }

  insert(key: string, val: number): void {
    let p = this.root
    for (let i = 0; i < key.length; i++) {
      const c = key.charCodeAt(i) - 97
      if (!p.kids[c]) {
        p.kids[c] = new TrieNode()
      }
      p = p.kids[c]
    }
    p.value = val
  }

  sum(prefix: string): number {
    // 1. 找prefix在字典树中的最后一个节点
    let p = this.root
    for (let i = 0; i < prefix.length; i++) {
      const c = prefix.charCodeAt(i) - 97
      if (!p.kids[c]) {
        return 0
      }
      p = p.kids[c]
    }
    let res = 0

    // 2. 计算p的所有子节点的value和，包括p
    const queue = [p]
    while (queue.length) {
      const q = queue.shift()
      res += q.value
      for (let i = 0; i < q.kids.length; i++) {
        if (q.kids[i]) queue.push(q.kids[i])
      }
    }
    return res
  }
}

/**
 * Your MapSum object will be instantiated and called as such:
 * var obj = new MapSum()
 * obj.insert(key,val)
 * var param_2 = obj.sum(prefix)
 */
