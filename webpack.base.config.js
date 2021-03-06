const path = require('path');
const Webpack = require('webpack');
const HtmlWebpackPlaugin = require('html-webpack-plugin');  // 把打包后的文件直接注入到html模板中
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 提取css到单独文件
// const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // 压缩css
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); // 压缩js
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 每次运行前清理目录
const CopyWebpackPlugin = require('copy-webpack-plugin'); // 拷贝文件

module.exports = {
  mode: 'development', // 默认production生产模式  development开发模式
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    // publicPath: 'www.hyfm.com'
  },
  devtool: 'source-map',
  watch: true, // 实时监控打包
  watchOptions: {
    poll: 1000, //监控间隔
    aggregateTimeout: 500, // 间隔毫秒 （防抖）
    ignored: /node_modules/, // 不要监控的文件
  },

  module: {
    rules: [
      {
        test: /\.html$/,
        use: {
          loader: 'html-withimg-loader',
        },
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|jpeg|gif|bpm)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 60*1024, // 小于60k的图片会被打包成base64
            esModule: false, // 图片路径避免出现default
            outputPath: '/img',
            publicPath: '',
          }
        },
      },
      {
        test: /\.js$/,
        use: {
          loader: 'eslint-loader',
          options: {
            enforce: 'pre', // pre前置 normarl正常 post后置
          }
        },
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env'
            ],
            plugins: [
              ["@babel/plugin-proposal-decorators", { "legacy": true }],
              ["@babel/plugin-proposal-class-properties", { "loose" : true }],
              '@babel/plugin-transform-runtime'
            ]
          }
        },
        exclude: /node_modules/,
        // include: './src'
      },
      { test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
      },
      {
        test: /\.less$/,
        use: [
          // {
          //   loader: 'style-loader',
          //   options: {
          //     insert: 'top', // body || id || tag
          //   }
          // },
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
      }
    ]
  },

  // 路径解析
  resolve: {
    modules: [path.resolve('node_modules')],
    // mainFields: ['main', 'style'], // 文件解析的顺序【package.json】
    // mainFiles: ['index.js'], // 入口文件
    extensions: ['.js', '.json', '.less', '.css'], // 导入文件的扩展名称顺序
    alias: {
      components: './src/components'
    }
  },
  // 插件
  plugins: [
    new Webpack.DefinePlugin({
      DEV: JSON.stringify('this is dev'),
    }),

    // 处理Html
    new HtmlWebpackPlaugin({
      template: "./index.html", // 模板文件路径
      filename: 'index.html', // 打包后的文件名称
      minify: {
        caseSensitive: true, // 是否对大小写敏感，默认false

        collapseBooleanAttributes: true, // 是否简写boolean格式的属性如：disabled="disabled" 简写为disabled  默认false

        collapseWhitespace: true, // 是否去除空格，默认false

        minifyCSS: true, // 是否压缩html里的css（使用clean-css进行的压缩） 默认值false；

        minifyJS: true, // 是否压缩html里的js（使用uglify-js进行的压缩）

        preventAttributesEscaping: true, // Prevents the escaping of the values of attributes

        removeAttributeQuotes: true, // 是否移除属性的引号 默认false

        removeComments: true, // 是否移除注释 默认false

        removeCommentsFromCDATA: true, // 从脚本和样式删除的注释 默认false

        removeEmptyAttributes: true, // 是否删除空属性，默认false

        removeOptionalTags: false, // 若开启此项，生成的html中没有 body 和 head，html也未闭合

        removeRedundantAttributes: true, // 删除多余的属性

        removeScriptTypeAttributes: true, // 删除script的类型属性，在h5下面script的type默认值：text/javascript 默认值false

        removeStyleLinkTypeAttributes: true, // 删除style的类型属性， type="text/css" 同上

        useShortDoctype: true, // 使用短的文档类型，默认false
      }
    }),
    new MiniCssExtractPlugin({
      filename: '/css/[name].css',
      chunkFilename: '/css/[id].css',
    }),

    // 拷贝静态文件
    new CopyWebpackPlugin(
      [
        { from: './static', to: 'static' },
      ]
    ),

    // 清空文件
    new CleanWebpackPlugin(),

    new Webpack.BannerPlugin('link1024'),
  ],


};
