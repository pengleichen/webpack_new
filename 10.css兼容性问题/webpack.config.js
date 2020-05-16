const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')

//process.env.NODE_ENV = 'development'
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'built.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // 创建style标签，将样式放入
          // 'style-loader',
          //这个loader取代style-loader，作用：提取JS中的css成单独文件
          MiniCssExtractPlugin.loader,
          // 将css文件整合到JS文件中
          'css-loader',
          // css兼容性问题：postcss ---> postcss-loader postcss-preset-env
          // 帮助postcss找到package.json中browserslist设置的浏览器兼容性设置
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [require('postcss-preset-env')()]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      // 将整合后的css文件重命名
      filename: 'css/built.css'
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new CleanWebpackPlugin()
  ],
  mode: 'development'
}
