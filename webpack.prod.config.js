const { smart } = require('webpack-merge');
const base = require('./webpack.base.config');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); // 压缩js
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // 压缩css

module.exports = smart(base, {
  mode: 'production',

  // 优化项
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: false, // 源码映射
        parallel: true, // 使用多进程并行运行来提高构建速度
        cache: true, // 是否启用文件缓存，默认缓存在node_modules/.cache/uglifyjs-webpack-plugin.目录
      }),
      new OptimizeCssAssetsPlugin(),
    ]
  }
});
