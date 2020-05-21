/**
 *  HMR: hot module replacement 热模块替换 / 模块热加载
 *  作用：一个模块发生变化，只会重新打包这一个模块（而不是打包所有模块）
 *       极大提升构建速度
 *    样式文件：可以使用HMR功能，因为style-loader内部实现了~
 *    JS文件：默认不能使用HMR功能 -->需要修改JS代码，添加支持HMR功能的代码
 *          注意：HMR功能对JS文件的处理，只能对非入口JS文件进行处理
 *    HTML文件：默认不能使用HMR功能，同时会导致问题，HTML文件不能热更新了~（不用做HMR功能）
 *        解决：修改entry入口，将HTML文件引入
 */

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
      {
        test: /.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.(jpg|png|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 8 * 1024,
          name: '[hash:10].[ext]',
          outputPath: 'images'
        }
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        exclude: /\.(js|css|less|html|jpg|png|gif)$/,
        loader: 'file-loader',
        options: {
          name: '[hash:10].[ext]',
          outputPath: 'media'
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
  mode: 'development',
  devServer: {
    contentBase: resolve(__dirname, 'build'),
    compress: true,
    port: 3000,
    open: true,
    hot: true
  }
}
