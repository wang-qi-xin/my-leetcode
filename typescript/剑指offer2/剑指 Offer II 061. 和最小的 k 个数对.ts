/**
剑指 Offer II 061. 和最小的 k 个数对
给定两个以升序排列的整数数组 nums1 和 nums2 , 以及一个整数 k 。

定义一对值 (u,v)，其中第一个元素来自 nums1，第二个元素来自 nums2 。

请找到和最小的 k 个数对 (u1,v1),  (u2,v2)  ...  (uk,vk) 。

 

示例 1:

输入: nums1 = [1,7,11], nums2 = [2,4,6], k = 3
输出: [1,2],[1,4],[1,6]
解释: 返回序列中的前 3 对数：
    [1,2],[1,4],[1,6],[7,2],[7,4],[11,2],[7,6],[11,4],[11,6]
示例 2:

输入: nums1 = [1,1,2], nums2 = [1,2,3], k = 2
输出: [1,1],[1,1]
解释: 返回序列中的前 2 对数：
     [1,1],[1,1],[1,2],[2,1],[1,2],[2,2],[1,3],[1,3],[2,3]
示例 3:

输入: nums1 = [1,2], nums2 = [3], k = 3 
输出: [1,3],[2,3]
解释: 也可能序列中所有的数对都被返回:[1,3],[2,3]
 

提示:

1 <= nums1.length, nums2.length <= 104
-109 <= nums1[i], nums2[i] <= 109
nums1, nums2 均为升序排列
1 <= k <= 1000
 
 */

import { Heap } from '../utils/数据结构/struct'

function kSmallestPairs(nums1: number[], nums2: number[], k: number): number[][] {
  // 1. 新建大根堆，保存每一对数和它们的和
  const h = new Heap<number[]>({ mode: 'big', compareFn: (a, b) => b[0] - a[0] })
  for (let i = 0; i < nums1.length; i++) {
    const n1 = nums1[i]
    for (let j = 0; j < nums2.length; j++) {
      const n2 = nums2[j]
      // 2. 遍历nums1和nums2的排列， 如果堆的大小比k小，直接插入
      if (h.size() < k) {
        h.insert([n1 + n2, n1, n2])
      } else {
        // 3. 如果堆中已经包含有k个数对，则判断当前数对是否应该插入堆
        // 如果堆顶的最大元素比当前数对的和要大，说明应该插入，并且先把堆顶元素移除。
        if (n1 + n2 < h.peek()[0]) {
          h.pop()
          h.insert([n1 + n2, n1, n2])
        }
      }
    }
  }
  return h.heap.map(a => [a[1], a[2]])
}

/**
 * 优化，减少重复判断
 * @param nums1
 * @param nums2
 * @param k
 * @returns
 */
function kSmallestPairs2(nums1: number[], nums2: number[], k: number): number[][] {
  /**
   第一对最小和的下标一定是[0, 0], 第二小的下标一定是[1, 0]或[0, 1]

   假如第i对最小和的下标时[ai, bi], 第i + 1小的下标一定是[ai + 1, bi]或[ai, bi + 1]
   这是因为两个数组都是升序的原因。
   */
  // 1. 新建小根堆，保存每一对最小和的下标
  const h = new Heap<number[]>({ compareFn: (a, b) => nums1[a[0]] + nums2[a[1]] - nums1[b[0]] - nums2[b[1]] })
  const m = nums1.length,
    n = nums2.length

  /**
   如果每次都将[ai + 1, bi]和[ai, bi + 1]加入最小堆，则可能出现重复的情况
   所以需要添加标记位。

   也可以先将nums1的前k个下标添加到h中。然后每次只对nums2的下标进行增加。
   */
  for (let i = 0, min = Math.min(m, k); i < min; i++) {
    h.insert([i, 0])
  }
  const res = []
  while (h.size() && k-- > 0) {
    const pair = h.pop()
    res.push([nums1[pair[0]], nums2[pair[1]]])
    // 比当前pair还要大的，最小的一对有可能是[pair[0], pair[1] + 1]，而其它可能最小的数对，已经处于h中了。
    if (pair[1] + 1 < n) {
      h.insert([pair[0], pair[1] + 1])
    }
  }
  return res
}

kSmallestPairs2([1, 1, 2], [1, 2, 3], 2)
