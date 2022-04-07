import { ListNode, TreeNode } from "./struct"

/**
  剑指 Offer 03. 数组中重复的数字
 */
function findRepeatNumber(nums: number[]): number {
  let a = []
  for (let index = 0; index < nums.length; index++) {
    const element = nums[index]
    if (a[element]) return element
    a[element] = true
  }
  return 0
}

/**
  剑指 Offer 04. 二维数组中的查找
 */
function findNumberIn2DArray(matrix: number[][], target: number): boolean {
  if (!matrix || matrix.length === 0 || matrix[0].length === 0) return false
  let [row, col, rows] = [0, matrix[0].length - 1, matrix.length]
  while (row <= rows && col >= 0) {
    let n = matrix[row][col]
    if (n === target) return true
    if (n > target) {
      col--
    } else {
      row++
    }
  }
  return false
}

function binarySearch(nums: number[], target: number): number {
  let left = 0,
    right = nums.length - 1,
    mid = right
  while (left <= right) {
    mid = (right - left) / 2 + left
    if (nums[mid] === target) {
      return mid
    } else if (nums[mid] > target) {
      right = mid - 1
    } else {
      left = mid + 1
    }
  }
  return mid
}

/**
 剑指 Offer 05. 替换空格
 */

function replaceSpace(s: string): string {
  return s.replace(' ', '%20')
}

/**
 * 剑指 Offer 06. 从尾到头打印链表.

 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */
function reversePrint(head: ListNode | null): number[] {
  let result = []
  while (head) {
    result.push(head.val)
  }
  result = result.reverse()
  return result
}

class A {
  map: object
  constructor() {
    this.map = {}
  }
  mm(inorder: number[]) {
    for (let i = 0; i < inorder.length; i++) {
      this.map[inorder[i]] = i
    }
  }
}
/**
 * 剑指 Offer 07. 重建二叉树
 * @param preorder Input: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
 * @param inorder
 */
function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
  if (inorder.length === 0) return null
  if (preorder.length === 0) return null
  const root: TreeNode = new TreeNode(preorder[0])
  const index = inorder.findIndex(v => (v = root.val))
  root.left = buildTree(preorder.slice(1, index + 1), inorder.slice(0, index))
  root.right = buildTree(preorder.slice(index + 1), inorder.slice(index + 1))
  return root
}

/**
 * 剑指 Offer 09. 用两个栈实现队列
 */
class CQueue {
  stack1: number[]
  stack2: number[]
  constructor() {
    this.stack1 = []
    this.stack2 = []
  }

  appendTail(value: number): void {
    this.stack1.push(value)
  }

  deleteHead(): number {
    if (this.stack2.length !== 0) {
      return this.stack2.pop()
    }
    if (this.stack1.length === 0) return -1
    while (this.stack1.length !== 0) {
      this.stack2.push(this.stack1.pop())
    }
    return this.stack2.pop()
  }
}

/**
 * 剑指 Offer 10- II. 青蛙跳台阶问题
 * @param n
 */
function numWays(n: number): number {
  if (n < 2) return 1
  const mod = 1e9 + 7
  let a = 1,
    b = 1
  for (let i = 2; i <= n; i++) {
    ;[a, b] = [b, a + b]
  }
  return b
}

/**
 * 剑指 Offer 11. 旋转数组的最小数字
 * @param numbers
 */
function minArray(numbers: number[]): number {
  let [left, right, pivot] = [0, numbers.length - 1, 0]
  while (left < right) {
    pivot = Math.floor((right - left) / 2) + left
    if (numbers[pivot] > numbers[right]) {
      left = pivot + 1
    } else if (numbers[pivot] < numbers[right]) {
      right = pivot
      //  相较于153题。
      // 由于存在重复元素，所以当numbes[pivot] == numbers[right]时，right-1
      // 最小值一定在right左侧。
    } else {
      right -= 1
    }
  }
  return numbers[left]
}

/**
 * 153. 寻找旋转排序数组中的最小值
 * @param nums
 */
function findMin(nums: number[]): number {
  let [left, right, pivot] = [0, nums.length - 1, 0]
  while (left < right) {
    pivot = Math.floor((right - left) / 2) + left
    //     如果中间值小于最大值，则最大值减小
    //     疑问：为什么 high = mid;而不是 high = mid-1;
    //     解答：{4,5,1,2,3}，如果high=mid-1，则丢失了最小值1
    if (nums[pivot] > nums[right]) {
      left = pivot + 1
    } else {
      //    如果中间值大于最大值，则最小值变大
      //    疑问：为什么 low = mid+1;而不是 low = mid;
      //    解答：{4,5,6,1,2,3}，nums[mid]=6，low=mid+1,刚好nums[low]=1
      //    继续疑问：上边的解释太牵强了，难道没有可能low=mid+1,正好错过了最小值
      //    继续解答：不会错过!!! 如果nums[mid]是最小值的话，则其一定小于nums[high],走if，就不会走else了
      right = pivot
    }
  }
  return nums[left]

  //   ：为什么while的条件是low<high,而不是low<=high呢
  //   ：low<high，假如最后循环到{*,10,1,*}的这种情况时，nums[low]=10,nums[high]=1,nums[mid]=10,low=mid+1,
  //   直接可以跳出循环了,所以low<high,此时low指向的就是最小值的下标;
  //   如果low<=high的话，low=high，还会再不必要的循环一次，此时最后一次循环的时候会发生low==high==mid，
  //   则nums[mid]==nums[high]，则会走一次else语句，则low=mid+1,此时low指向的是最小值的下一个下标，
  //   则需要return[low-1]
}
