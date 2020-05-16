/*
  index.js: webpack入口起点文件

  1.运行指令：
    开发环境：webpack ./src/index.js -o ./build/built.js --mode=development
    生产环境：webpack ./src/index.js -o ./build/built.js --mode=production
  2.结论
    webpack能处理js/json资源，不能处理css/img等其他资源
    生产环境和开发环境都将ES6模块化编译成浏览器能识别的模块化
    生产环境比开发环境多了一个压缩JS代码
*/
import data from './data.json';
import './index.css';
console.log(data)

function add(x, y) {
  return x + y
}

function test(x, y) {
  return x * y;
}

console.log(add(1, 2))
