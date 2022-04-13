/**
 * 867. 转置矩阵
 * @param matrix
 */
function transpose(matrix: number[][]): number[][] {
  const arr = [...Array(matrix[0].length)].map(_ => [])

  matrix.forEach(r => {
    r.forEach((c, columnIndex) => {
      arr[columnIndex].push(c)
    })
  })
  return arr
}

/**
 * 剑指 Offer 16. 数值的整数次方
 * @param x
 * @param n
 */
function myPow(x: number, n: number): number {
  /**
   快速幂：二进制
   x^n 将n进行二进制拆解。
   x^n = (x^2)^(n / 2) = (x ^ 4) ^ (n / 4) = ...
   当n为奇数时，n/2向下取整，会少乘一次x,所以额外x *= x;
   一直循环，直到n二进制拆解到0。
   */
  let N = BigInt(n) // 该题的n可能会超出限制，所以转为bigint
  if (x === 0) return 0
  if (N < 0) {
    x = 1 / x
    N = -N
  }
  let res = 1.0
  while (N) {
    // n & 1判断二进制最后一位是1还是0.也就是奇偶性
    if (N & 1n) {
      res *= x
    }
    x *= x
    // 右移一位，也就是/2向下取整。
    N >>= 1n
  }
  return res
}

/**
 * 方法一：dfs不考虑大数
 * 剑指 Offer 17. 打印从1到最大的n位数
 * @param n 
 */
function printNumbers(n: number): number[] {
  const num = [...Array(n)].fill("0");
  const res: number[] = []
  
  const dfs = (x: number) => {
    if(x === n) {
      const s = +num.join("")
      if(s === 0) return 
      res.push(s)
    }else {
      for(let i = 0; i < 10; i++){
        num[x] = `${i}`;
        dfs(x + 1)
      }
    }
  }

  dfs(0)
  return res;
}

/**
 * 方法二：dfs考虑大数
 * 剑指 Offer 17. 打印从1到最大的n位数
 * @param n 
 */
function printNumbers2(n: number): string[] {
  const num = [...Array(n)].fill("0");
  const res: string[] = []
  let start = n - 1, nine = 0;
  
  const dfs = (x: number) => {
    if(x === n) {
      const s = num.slice(start).join("")
      if(n - start === nine) start -= 1 // 判断当前num组成的数字，每一位都是9
      if(s === "0") return
      res.push(s)
    }else {
      for(let i = 0; i < 10; i++){
        if(i === 9) nine += 1 // 当该位填充9时，nine++
        num[x] = `${i}`;
        dfs(x + 1)
      }
      nine -= 1; // 该位0 - 9 一轮递归完成，nine数量减一
    }
  }

  dfs(0)
  return res;
}
printNumbers2(2)