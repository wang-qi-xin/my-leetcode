var fs = require('fs')

fs.readFile('d:/project/力扣/前端/com/src/components/auto-complete/aa.txt', 'utf-8', function (error, config) {
  if (error) {
    console.log(error)
    console.log('config文件读入出错')
  }
  const data = config
    .split('\n')
    .filter((_, index) => {
      if (index % 100 === 0) return true
      return false
    })
    .map(word => `"${word.replace('\r', '')}"`)
  const result = `export const data = [\n${data.join(',\n')}]`
  fs.writeFile('d:/project/力扣/前端/com/src/components/auto-complete/data.ts', result, 'binary', function (err) {
    if (err) {
      console.log(err)
    }
    console.log('success!')
  })
})
