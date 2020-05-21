const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
// 定义nodejs环境变量：决定使用browserslist哪个环境
process.env.NODE_ENV = 'production'


/**
 * babel缓存
 *    cacheDirectory: true
 * 
 * 文件资源缓存
 *    hash：每次webpack构建时会生产一个唯一的hash值。
 *          问题：因为JS和CSS文件同时使用一个hash值，如果重新打包，会导致所有缓存失效（可能我们却只改动了一个文件）
 *    chunkhash: 根据chunk生成的hash值，如果打包来源于同一个chunk，那么hash值就一样
 *          问题：JS和CSS的hash值还是一样的
 *                因为CSS是从JS中引入进来的，他们属于同一个chunk
 *    contenthash：根据文件的内容来生成hash值，不同文件hash值肯定不一样，而且是单独管理的
 * 
 * 
 */
const commonCssLoader = [
  MiniCssExtractPlugin.loader,
  'css-loader',
  {
    loader: 'postcss-loader',
    options: {
      ident: 'postcss',
      // 还需要定义browserslist的配置
      plugins: () => [require('postcss-preset-env')()]
    }
  }
]
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'js/built.[contenthash:10].js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      // 正常来讲，一个文件只能被一个loader处理！
      // 当一个文件要被多个loader处理，那么一定要指定loader执行的先后顺序：
      // 先执行eslint 再执行babel
      {
        test: /\.js$/,
        exclude: /node_modules/,
        // 优先执行
        enforce: 'pre',
        // 在package.json中eslintConfig --> airbnb
        loader: 'eslint-loader',
        options: {
          fix: true
        }
      },
      {
        //以下loader只会匹配一个
        //注意：不能有两个配置处理同一种类型文件
        oneOf: [
          {
            test: /\.css$/,
            use: commonCssLoader
          },
          {
            test: /\.less$/,
            use: [...commonCssLoader, 'less-loader']
          },

          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    useBuiltIns: 'usage',
                    corejs: {
                      version: 3
                    },
                    targets: {
                      chrome: '60',
                      firefox: '60',
                      ie: '9',
                      safari: '10',
                      edge: '17'
                    }
                  }
                ]
              ],
              // 开启babel缓存
              // 第二次构建时，会读取之前的缓存
              cacheDirectory: true
            }
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
            exclude: /\.(js|css|less|jpg|png|gif|html)$/,
            loader: 'file-loader',
            options: {
              name: '[hash:10].[ext]',
              outputPath: 'media'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/build.[contenthash:10].css'
    }),
    new OptimizeCssAssetsWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true
      }
    }),
    new CleanWebpackPlugin()
  ],
  mode: 'production'
}
