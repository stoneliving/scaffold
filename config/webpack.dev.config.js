const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {

  //webpack内置2种模式 development / production，可以自动优化打包输出
  mode: "development",

  //dev模式下开启source-map，方便调试
  devtool: "source-map",

  //打包开始的入口文件
  entry: './src/index.js',

  //打包输出的js文件
  output: {
    //文件名
    filename: 'bundle.js',
    //chunk名
    chunkFilename: 'chunk.[name].[hash].js',
    //打包输出路径
    path: path.resolve(__dirname, '../dist'),
    //公共路径
    publicPath: '/'
  },

  //模块
  module: {
    rules: [
      {
        //less文件处理
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            }
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: true,
              javascriptEnabled: true,
            }
          }
        ]

      },
      {
        //css文件处理
        test: /\.css$/,
        use: [          
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
              reloadAll: true
            }
          },
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        //图片处理
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
      ignoreOrder: true, //true的时候忽略 conficting order warnings
    })
  ]
}