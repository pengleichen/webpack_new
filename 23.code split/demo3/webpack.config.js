const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

/**
 * tree sharking ： 去除无用代码
 * 前提： 1. 必须使用ES6 module规范
 *       2. 必须开启production环境
 * 作用：减少代码体积
 * 
 * 在package.json中配置
 * “sideEffects": false 所有代码都没有副作用（都可以进行Tree sharking)
 * 问题：可能会把css / @babel/polyfill(副作用）文件干掉
 * ”sideEffects": ["*.css"]
 * 
 */
module.exports = {
  // 多入口：有一个入口，最终输出就有一个bundle
  entry: './src/index.js',
  output: {
    // [name]: 取文件名
    filename: 'js/[name].[contenthash:10].js',
    path: resolve(__dirname, 'build')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true
      }
    }),
    new CleanWebpackPlugin()
  ],
  /*
    可以将node_modules中代码单独打包一个chunk最终输出
    自动分析多个入口chunk中，有没有公共的文件，如果有会打包成单独一个chunk
  */
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  mode: 'production'
}
