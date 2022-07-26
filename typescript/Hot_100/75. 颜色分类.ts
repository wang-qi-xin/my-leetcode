/**
75. 颜色分类
给定一个包含红色、白色和蓝色、共 n 个元素的数组 nums ，原地对它们进行排序，使得相同颜色的元素相邻，并按照红色、白色、蓝色顺序排列。

我们使用整数 0、 1 和 2 分别表示红色、白色和蓝色。

必须在不使用库的sort函数的情况下解决这个问题。

 

示例 1：

输入：nums = [2,0,2,1,1,0]
输出：[0,0,1,1,2,2]
示例 2：

输入：nums = [2,0,1]
输出：[0,1,2]
 

提示：

n == nums.length
1 <= n <= 300
nums[i] 为 0、1 或 2
 

进阶：

你可以不使用代码库中的排序函数来解决这道题吗？
你能想出一个仅使用常数空间的一趟扫描算法吗？
 */

/**
 Do not return anything, modify nums in-place instead.
 */
function sortColors(nums: number[]): void {
  /**
   zero, 和two分别指向0和2
   1. 如果nums[i]为0, 则交换zero和i。然后zero++
   2. 如果nums[i]为2, 则交换two和i, 然后two--。
      但是交换后, i位置可能为0, 所以新的i应该再次与zero交换。
      为了方便令i--。这样下次循环就会处理该种情况。 

   */
  let zero = 0,
    two = nums.length - 1
  const swap = (i: number, j: number) => {
    const temp = nums[i]
    nums[i] = nums[j]
    nums[j] = temp
  }

  for (let i = zero; i <= two; i++) {
    if (nums[i] === 2) {
      swap(i, two)
      two--
      i--
    } else if (nums[i] === 0) {
      swap(i, zero)
      zero++
    }
  }
}
const aaa = [2, 1, 2]
sortColors(aaa)
console.log(aaa)
