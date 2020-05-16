const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      /**
       * js兼容性处理：babel-loader,
       * 1. 基本JS兼容性处理 --> @babel/preset-env
       *    问题：只能转换基本语法，如Promise高级语法不能转换
       * 2. 全部JS兼容性处理 --> @babel/polyfill
       *    问题：我只要解决部分兼容性问题，但是将所有兼容性代码全部引入，体积太大了~
       * 3. 需要做兼容性处理的就做：按需加载 --> corejs
       */
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                // 按需加载
                useBuiltIns: 'usage',
                // 指定corejs版本
                corejs: {
                  version: 3
                },
                //指定兼容性做到哪个版本浏览器
                targets: {
                  chrome: '60',
                  firefox: '60',
                  ie: '9',
                  safari: '10',
                  edge: '17'
                }
              }
            ]
          ]
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new CleanWebpackPlugin()
  ],
  mode: 'development'
}
