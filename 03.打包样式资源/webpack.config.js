/**
 * webpack.conf.js webpack配置文件
 * 作用：
 *  指示webpack干哪些活（当运行webpack指令时，会加载里面的配置）
 *  所有构建工具都是基于nodeJs平台运行的~模块化默认采用commonjs
 */

const { resolve } = require('path')

module.exports = {
  //webpack配置
  // 入口起点
  entry: './src/index.js',
  // 输出
  output: {
    // 输出文件名
    filename: 'built.js',
    // 输出路径
    // __dirname nodejs的变量，代表当前文件的目录绝对路径
    path: resolve(__dirname, 'build')
  },
  // loader的配置
  module: {
    rules: [
      // 详细loader配置
      {
        // 匹配哪些文件
        test: /\.css$/,
        use: [
          // use数组的执行顺序：从右向左，自底向上  依次执行
          // 创建style标签，将js中的样式资源插入进行，添加到head中生效
          'style-loader',
          // 将css文件变成commonjs模块加载到js中，里面内容是样式字符串
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          // 将Less文件转换为css文件
          'less-loader'
        ]
      }
    ]
  },
  // plugins的配置
  plugins: [
    // 详细的plugins的配置
  ],
  // 模式
  // 开发环境
  mode: 'development'
  // 生产环境
  // mode: 'production'
}
