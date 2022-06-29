/**
剑指 Offer II 050. 向下的路径节点之和
给定一个二叉树的根节点 root ，和一个整数 targetSum ，求该二叉树里节点值之和等于 targetSum 的 路径 的数目。

路径 不需要从根节点开始，也不需要在叶子节点结束，但是路径方向必须是向下的（只能从父节点到子节点）。

 

示例 1：



输入：root = [10,5,-3,3,2,null,11,3,-2,null,1], targetSum = 8
输出：3
解释：和等于 8 的路径有 3 条，如图所示。
示例 2：

输入：root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22
输出：3
 

提示:

二叉树的节点个数的范围是 [0,1000]
-109 <= Node.val <= 109 
-1000 <= targetSum <= 1000 
 */

import { TreeNode } from '../utils/数据结构/struct'

/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

function pathSum(root: TreeNode | null, targetSum: number): number {
  /**
    深度遍历root

    1. 假设当遍历到node时，从root到node的前缀和为preSum, 那么从root到node的路径上如果存在前缀和为（preSum - targetSum）的节点p，那就说明从p到node的路径和为targetSum.
    2. 在从root遍历到node的过程中，使用map保存该路径上前缀和为preSum出现的次数。
    3. 在回溯过程中，要把这些前缀和置为0.因为包含node的前缀和，不能用于计算node的兄弟节点和父节点。
    */
  const map = new Map<number, number>()
  let count = 0

  // 前缀和为0的节点数为1
  map.set(0, 1)

  const dfs = (node: TreeNode, preSum: number) => {
    if (!node) return

    // 1. cur表示从root到node的路径和
    const cur = preSum + node.val
    // 2. n表示从root到node的路径中，以node结尾的路径和=targetSum的数量。默认为0
    let n = 0

    // 3. 如果从root到node的路径中，存在p节点，使得root到p的路径和等于cur-targetSum (等同于从p到node的路径和时targetSum)
    //    则从map中拿出p节点的数量。累加到count中。每一个p表示一条路径和等于targetSum
    if (map.has(cur - targetSum)) n = map.get(cur - targetSum)
    count += n

    // 4. 如果从root到node的路径中（暂时不包含node），存在p节点的前缀和等于cur，则令cur对应的value + 1. 表示把node也添加上。
    if (map.has(cur)) {
      map.set(cur, map.get(cur) + 1)
    } else {
      map.set(cur, 1)
    }

    // 5. 深度遍历node的左右子树，前缀和为cur。
    dfs(node.left, cur)
    dfs(node.right, cur)

    // 6. node的左右子树都计算过后，在回溯的过程中，将cur对应的value - 1.
    //    表示从root->node的路径前缀和集合中，去掉node
    if (map.has(cur)) {
      map.set(cur, map.get(cur) - 1)
    } else {
      map.set(cur, 0)
    }
  }
  dfs(root, 0)

  return count
}

const h = new TreeNode(1)
h.left = new TreeNode(-2)
h.right = new TreeNode(-3)

console.log(pathSum(h, -1))
