//import '@babel/polyfill'
const add = (x, y) => x + y

const promise = new Promise(resolve => {
  setTimeout(() => {
    console.log('定时器执行了')
    resolve()
  }, 1000)
})
console.log(add(1, 2))
console.log(promise)
