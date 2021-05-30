const CopyWebpackPlugin = require("copy-webpack-plugin");

const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')

const path = require("path");
function resolve (dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: '',
  configureWebpack: {
    plugins: [
      new CopyWebpackPlugin([
        {
          from: 'resources',
          to: './',
          ignore: [".*"]
        }
      ])
    ]
  },
  chainWebpack: config => {
    config.resolve.alias
      .set("resources", resolve("resources"))
      .set("assets", resolve("src/assets"))

    config.plugin('monaco').use(new MonacoWebpackPlugin())
  },
  css: {
    loaderOptions: {
      // 向 CSS 相关的 loader 传递选项
      less: {
        javascriptEnabled: true
      }
    }
  }
}