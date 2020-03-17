const { smart } = require('webpack-merge');
const base = require('./webpack.base.config');

module.exports = smart(base, {
  mode: 'development',
  devtool: 'source-map',
// 开发服务器的配置
  devServer: {
    // port: 8090,
    progress: true, // 打包进度条
    // open: true, // 自动打开浏览器
    contentBase: './dist', // 指定静态目录文件夹
    compress: true, // gzip压缩,
    proxy: {
      // 配置代理，并重新路径
      // 'api': {
      //   target: 'http://www.hyfm.com/v1/api',
      //   pathRewirte:{
      //     '/api': '',
      //   }
      // },

      // // 模拟交互
      // before(app) {
      //   app.get('/data', (req, res) => {
      //     res.json({
      //       status: 200,
      //       data: [1, 2, 3, 4, 5],
      //     })
      //   })
      // }
      before: function(app, server, compiler) {
        app.get('/some', function(req, res) {
          res.json({ custom: 'response' });
        });
      }
    }
  },
});
