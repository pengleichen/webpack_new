

function sum(...args) {
  return args.reduce((p, c) => p + c, 0)
}
// eslint-disable-next-line
console.log(sum(1, 2, 3, 4))



/**
 * 通过js代码，让每个文件被单独打包成一个chunk
 * import动态导入语法：能将某个文件单独打包
 */
import(/* webpackChunkName: 'test' */'./test')
  .then(({ add }) => {
    // 文件加载成功
    // eslint-disable-next-line
    console.log(add(2, 3))
  })
  .catch(err => {
    // 文件加载失败
    // eslint-disable-next-line
    console.log(err)
  })
