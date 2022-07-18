/**
11. 盛最多水的容器
给定一个长度为 n 的整数数组 height 。有 n 条垂线，第 i 条线的两个端点是 (i, 0) 和 (i, height[i]) 。

找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。

返回容器可以储存的最大水量。

说明：你不能倾斜容器。

 

示例 1：



输入：[1,8,6,2,5,4,8,3,7]
输出：49 
解释：图中垂直线代表输入数组 [1,8,6,2,5,4,8,3,7]。在此情况下，容器能够容纳水（表示为蓝色部分）的最大值为 49。
示例 2：

输入：height = [1,1]
输出：1
 

提示：

n == height.length
2 <= n <= 105
0 <= height[i] <= 104
 */

function maxArea(height: number[]): number {
  /**
   双指针

   1. 当前左右指针为i,j, 由于容量取决于短板, 所以S = Math.min(height[i], height[j]) * (j - i), 
   2. 假如此时移动短板, 那么新的容器短板可能变短，也可能变长，所以面积可大可小。
   3. 假如此时移动长板，那么新容器的短板要么不变，要么变短。所以面积一定不会变大。

   4. 所以每次移动短板，记录容积的最大值。
   */
  let max = 0,
    left = 0,
    right = height.length - 1
  while (left < right) {
    if (height[left] < height[right]) {
      max = Math.max(max, height[left] * (right - left))
      left++
    } else {
      max = Math.max(max, height[right] * (right - left))
      right--
    }
  }

  return max
}

console.log(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]))
