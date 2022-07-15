/**
240. 搜索二维矩阵 II
编写一个高效的算法来搜索 m x n 矩阵 matrix 中的一个目标值 target 。该矩阵具有以下特性：

每行的元素从左到右升序排列。
每列的元素从上到下升序排列。
 

示例 1：


输入：matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 5
输出：true
示例 2：


输入：matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 20
输出：false
 

提示：

m == matrix.length
n == matrix[i].length
1 <= n, m <= 300
-109 <= matrix[i][j] <= 109
每行的所有元素从左到右升序排列
每列的所有元素从上到下升序排列
-109 <= target <= 109
 */
function searchMatrix(matrix: number[][], target: number): boolean {
  const m = matrix.length,
    n = matrix[0].length
  let i = 0,
    j = n - 1
  /**
   1. 从右上角不断进行二分查找
   2. 先在第i行二分查找 小于 target的最大的元素(该列为k)。则令j = k
   3. 然后在第j列二分查找 大于 target的最小的元素(该行为h)。则令i = h
   4. 如果遇到了target则返回true
   5. 如果找到了右下角，还没有找到，则返回false
   */
  while (i < m && j >= 0) {
    let left = 0,
      right = j

    // 1. 在第i行二分查找 小于 target的最大的元素(该列为k)。则令j = k
    //    其实就是查找target的插入点。然后再减去1.
    while (left <= right) {
      const mid = left + ((right - left) >> 1)
      if (matrix[i][mid] === target) {
        return true
      } else if (matrix[i][mid] < target) {
        left = mid + 1
      } else {
        right = mid - 1
      }
    }
    //  如果插入点是0. 说明该行的元素都比target大，那么其他元素就不用判断力，肯定都比target大
    if (left === 0) return false
    j = left - 1

    // 2. 在第j列二分查找 大于 target的最小的元素(该行为h)。则令i = h
    //    其实就是查找target的插入点。
    let top = i,
      bottom = m - 1
    while (top <= bottom) {
      const mid = top + ((bottom - top) >> 1)
      if (matrix[mid][j] === target) {
        return true
      } else if (matrix[mid][j] < target) {
        top = mid + 1
      } else {
        bottom = mid - 1
      }
    }
    //  如果插入点是m(最后一行). 说明该列的元素都比target小，那么其他元素就不用判断力，肯定都比target小
    if (top >= m) return false
    //  第0行到第top行的元素，都比target小。
    i = top
  }
  return false
}
let matrix = [
  [1, 4, 7, 11, 15],
  [2, 5, 8, 12, 19],
  [3, 6, 9, 16, 22],
  [10, 13, 14, 17, 24],
  [18, 21, 23, 26, 30]
]
let target = 5

matrix = [[1, 1]]
target = 2
console.log(searchMatrix(matrix, target))
