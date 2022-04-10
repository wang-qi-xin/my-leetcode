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
