import './css/index.less'
import './media/iconfont.css'
import print from './print'

console.log('index.js 重新加载了')

print()

function add(x, y) {
  return x + y
}
console.log(add(1, 2))

// 一旦module.hot为true，说明开起了HMR功能。-->让HMR功能代码生效
if (module.hot) {
  module.hot.accept('./print.js', () => {
    // 方法会监听print.js文件的变化，一旦发生变化，其他默认不会重新打包构建
    // 会执行后面的回调函数
    print()
  })
}
