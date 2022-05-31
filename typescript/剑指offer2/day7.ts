import { TreeNode } from '../utils/数据结构/struct'

/*
 * 剑指 Offer II 048. 序列化与反序列化二叉树
 */
function serialize(root: TreeNode | null): string {
  /**
   1. 前序遍历root，到遇到root为null时，给字符res拼接#
   */
  let data = ''
  const pre = (root: TreeNode) => {
    if (root === null) {
      data += '#,'
    } else {
      data += `${root.val},`
      pre(root.left)
      pre(root.right)
    }
  }
  pre(root)
  return data
}

/*
 * Decodes your encoded data to tree.
 */
function deserialize(data: string): TreeNode | null {
  /**
   1. 将data以,分割成数组。其中的#表示空节点。
   2. 然后递归生成树。
   3. 当数组arr[0] == "#"，返回null
   4. 否则，用arr.shift()构造新节点，然后递归生成node的左子树和右子树。
   5. 返回newNode
   */
  const arr = data.split(',')

  const dfs = () => {
    if (arr.length === 0 || arr[0] === '#') {
      arr.shift()
      return null
    } else {
      const node = new TreeNode(+arr.shift())
      node.left = dfs()
      node.right = dfs()
      return node
    }
  }
  return dfs()
}
