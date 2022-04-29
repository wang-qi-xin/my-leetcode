// 二分查找

/**
 * 比较函数。返回1，说明a > b
 * @param a
 * @param b
 * @returns
 */
function compare<T>(a: T, b: T): number {
  if (a === b) return 0
  if (a < b) return -1
  return 1
}

interface compareFnType<T> {
  (a: T, b: T): number
}

interface optionType<T> {
  mode?: 'accurate' | 'left_bound' | 'right_bound'
  compare?: compareFnType<T>
}

/**
 * 二分查找
   默认精准查找，没有结果返回-1
 * @param arr 
 * @param target 
 * @param option {mode: 精准查找 | 左边界 | 右边界, compare: 比较函数}
 * @returns 
 */
export function binarySearch<T>(arr: T[], target: T, option?: optionType<T>): number {
  if (!option) {
    option = {
      mode: 'accurate',
      compare
    }
  }
  if (!option.compare) {
    option.compare = compare
  }
  let left = 0,
    right = arr.length - 1
  while (left <= right) {
    const mid = left + ((right - left) >> 1)
    const compareResult = option.compare(arr[mid], target)
    if (compareResult === 0) {
      if (option.mode === 'accurate') {
        return mid
      } else if (option.mode === 'left_bound') {
        right = mid - 1
      } else if (option.mode === 'right_bound') {
        left = mid + 1
      }
    } else if (compareResult > 0) {
      right = mid - 1
    } else {
      left = mid + 1
    }
  }
  if (option.mode === 'accurate') {
    return -1
  } else if (option.mode === 'left_bound') {
    // 由于right初始化为arr.length - 1, 且while条件是left <= right;
    // 如果target比所有元素都大，结束时，left = right + 1, 所以left可能越界。
    // 需要判断left是否越界
    if (left === arr.length || option.compare(arr[left], target) !== 0) return -1
    return left
  } else if (option.mode === 'right_bound') {
    // 结束时，left = right + 1
    // 并且arr[left] 一定刚好大于target, 所以返回right

    // 当 target 比所有元素都小时，right 会被减到 -1，所以需要在最后防止越界：
    if (right < 0 || compare(arr[right], target) !== 0) return -1
    return right
  }
}
// [1, 2, 3, 4, 4, 4, 4, 4, 4, 6, 7, 8, 9, 22] 4 的左边界：3， 右边界8.
function testbinary() {
  const arr = [1, 2, 3, 4, 4, 4, 4, 4, 4, 6, 7, 8, 9, 22]
  console.log(binarySearch(arr, 4))
  console.log(binarySearch(arr, 4, { mode: 'left_bound' }))
  console.log(binarySearch(arr, 4, { mode: 'right_bound' }))
  console.log(binarySearch(arr, 0))
  console.log(binarySearch(arr, 23))
}
// testbinary()
/**
 * 1. 通过二分查找，精确查找某个元素，没有返回-1

 缺点： 如果存在多个相同元素，返回的是其中一个的下标，不确定是哪一个。
 * @param arr 
 * @returns 
 */
function binarySearch_basic<T>(arr: T[], target: T): number {
  let left = 0,
    right = arr.length - 1
  while (left <= right) {
    const mid = left + ((right - left) >> 1)
    const compareResult = compare(arr[mid], target)
    if (compareResult === 0) {
      return mid
    } else if (compareResult > 0) {
      right = mid - 1
    } else {
      left = mid + 1
    }
  }
  return -1
}
// console.log(binarySearch([1,2,3,4,4,4,4,4,4,6,7,8,9,22], 4));

/**
 * 2. 通过二分查找，查找某个元素的左边界
  没有该元素，返回-1
 * @param arr 
 * @returns 
 */
function binarySearch_left_bound<T>(arr: T[], target: T): number {
  let left = 0,
    right = arr.length - 1
  while (left <= right) {
    const mid = left + ((right - left) >> 1)
    const compareResult = compare(arr[mid], target)
    if (compareResult === 0) {
      // 如果相等，不要返回，缩小搜索区间
      // 因为是找左边界，所以令right = mid - 1
      // 为什么不是right = mid ?? 因为 right初始为arr.length - 1, while的条件是left <= right.
      // 每次的搜索区间是左闭右闭。即[left, right]
      right = mid - 1
    } else if (compareResult > 0) {
      right = mid - 1
    } else {
      left = mid + 1
    }
  }

  // 由于right初始化为arr.length - 1, 且while条件是left <= right;
  // 如果target比所有元素都大，结束时，left = right + 1, 所以left可能越界。
  // 需要判断left是否越界
  if (left === arr.length || compare(arr[left], target) !== 0) return -1
  return left
}

/**
 * 3. 通过二分查找，查找某个元素的右边界
  没有该元素，返回-1
 * @param arr 
 * @returns 
 */
function binarySearch_right_bound<T>(arr: T[], target: T): number {
  let left = 0,
    right = arr.length - 1
  while (left <= right) {
    // 这个条件结束时，left == right + 1
    const mid = left + ((right - left) >> 1)
    const compareResult = compare(arr[mid], target)
    if (compareResult === 0) {
      // 如果相等，不要返回，缩小搜索区间
      // 因为是找右边界，所以令left = mid + 1

      left = mid + 1
    } else if (compareResult > 0) {
      right = mid - 1
    } else {
      left = mid + 1
    }
  }
  // 结束时，left = right + 1
  // 并且arr[left] 一定刚好大于target, 所以返回right

  // 当 target 比所有元素都小时，right 会被减到 -1，所以需要在最后防止越界：
  if (right < 0 || compare(arr[right], target) !== 0) return -1
  return right
}
// console.log(binarySearch_right_bound([1, 2, 3, 4, 4, 4, 4, 4, 4, 6, 7, 8, 9, 22], -1))
