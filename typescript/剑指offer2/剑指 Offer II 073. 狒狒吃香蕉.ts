/**
剑指 Offer II 073. 狒狒吃香蕉
狒狒喜欢吃香蕉。这里有 n 堆香蕉，第 i 堆中有 piles[i] 根香蕉。警卫已经离开了，将在 h 小时后回来。

狒狒可以决定她吃香蕉的速度 k （单位：根/小时）。每个小时，她将会选择一堆香蕉，从中吃掉 k 根。如果这堆香蕉少于 k 根，她将吃掉这堆的所有香蕉，然后这一小时内不会再吃更多的香蕉，下一个小时才会开始吃另一堆的香蕉。  

狒狒喜欢慢慢吃，但仍然想在警卫回来前吃掉所有的香蕉。

返回她可以在 h 小时内吃掉所有香蕉的最小速度 k（k 为整数）。

 

示例 1：

输入：piles = [3,6,7,11], h = 8
输出：4
示例 2：

输入：piles = [30,11,23,4,20], h = 5
输出：30
示例 3：

输入：piles = [30,11,23,4,20], h = 6
输出：23
 

提示：

1 <= piles.length <= 104
piles.length <= h <= 109
1 <= piles[i] <= 109

 */

function minEatingSpeed(piles: number[], h: number): number {
  let low = 1,
    high = 0
  for (let i = 0; i < piles.length; i++) {
    high = Math.max(high, piles[i])
  }

  /**
   * 以speed的速度，吃完香蕉需要的时间。
   * @param speed 
   * @returns 
   */
  const getTime = (speed: number) => {
    let time = 0
    for (let i = 0; i < piles.length; i++) {
      time += Math.ceil(piles[i] / speed)
    }
    return time
  }

  // 最小速度初始化为high。
  let k = high

  while (low < high) {
    const speed = low + ((high - low) >> 1)
    const time = getTime(speed)
    console.log(low, high, speed,time)
    // 如果速度speed，可以在h时间内吃完香蕉。那么说明最小速度k小于等于speed
    // 令high = mid
    if (time <= h) {
      k = speed
      high = speed
    } else {
      low = speed + 1
    }
  }
  return k
}

minEatingSpeed([3, 6, 7, 11], 8)
