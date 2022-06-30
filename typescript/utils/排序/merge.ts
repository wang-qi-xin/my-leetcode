/*
 * @Description:
 * @Version: 2.0
 * @Autor: one
 * @Date: 2022-04-20 20:27:33
 * @LastEditors: one
 * @LastEditTime: 2022-06-30 15:01:41
 */
/**
 * 比较函数的类型，返回布尔值
 */
interface compareFnType<T> {
  (a: T, b: T): number | boolean
}
/**
 * 默认的比较函数：递增
 * @param a
 * @param b
 * @returns
 */
function defaultCompareFn(a: any, b: any): number {
  return a - b
}
/**
 * 归并排序（原地排序）
 * @param arr 
 * @param compareFn (比较函数，返回数字或Boolean值)
 */
function mergeSort<T>(arr: T[], compareFn: compareFnType<T> = defaultCompareFn) {
  const mergeSort = (left: number, right: number) => {
    if (left < right) {
      let mid = left + ((right - left) >> 1)
      mergeSort(left, mid)
      mergeSort(mid + 1, right)
      sort(left, mid, right)
    }
  }
  const sort = (left: number, mid: number, right: number) => {
    /**
    原地修改：
      1. 令i = left, j = mid
      2. 比较i,j 位置元素大小。（前提i<right）
      3. 如果i比j小， i++
      4. 如果i比j大，则需要交换，j++且step++（记录j走了几步）
      5. 直到i小于j位置元素.交换(i -> j - step),(j - step -> j - 1)这两个区域的元素（因为i大于(j-step)到j-1这块的元素，所以(i -> j - step)这里的元素，一定也大于(j-step)到j-1这块的元素）
     */
    let i = left,
      j = mid + 1

    while (i < j && j <= right) {
      let step = 0
      while (i < j) {
        let result = compareFn(arr[i], arr[j])
        if (!result || result <= 0) {
          i++
        }else{
          break
        }
      }
      while (j <= right) {
        let result = compareFn(arr[i], arr[j])
        if (result || result > 0) {
          j++
          step++
        }else {
          break
        }
      }
      swap(i, j - step - 1, j - 1)
      i += step
    }
  }

  /**
   * 交换left -> mid 和 mid + 1 -> right两个区域的元素
   * @param left
   * @param mid
   * @param right
   */
  const swap = (left: number, mid: number, right: number) => {
    reverse(left, mid)
    reverse(mid + 1, right)
    reverse(left, right)
  }

  /**
   * 逆转left->right 区域的元素
   * @param left
   * @param right
   */
  const reverse = (left: number, right: number) => {
    while (left < right) {
      const temp = arr[left]
      arr[left] = arr[right]
      arr[right] = temp
      left++
      right--
    }
  }
  mergeSort(0, arr.length - 1)
}
export default mergeSort

function testMergeSort() {
  const range = 2_000
  const arr1: number[] = []
  const arr2: number[] = []
  let i = 0

  while (i < range) {
    i++
    const randomObj = Math.random() * range
    arr1.push(randomObj)
    arr2.push(randomObj)
  }

  let start = Date.now()
  mergeSort(arr1, (a, b) => b < a)
  let end = Date.now()
  console.log(arr1.slice(0, 20), `\n 自定义比较函数sort spendTime = ${end - start}ms`)

  start = Date.now()
  arr2.sort((a, b) => a - b)
  end = Date.now()
  console.log(arr2.slice(0, 2), `\n sort spendTime = ${end - start}ms`)
}
// testMergeSort()
