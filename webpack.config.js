const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.ts",
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  devServer: {
    static: "./example",
    hot: true,
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  performance: {
    maxEntrypointSize: 1024000,
    maxAssetSize: 1024000,
    hints: false,
  },
  output: {
    path: path.resolve(__dirname, "lib"),
    filename: "index.js",
    library: "Snow", // 指定类库名,主要用于直接引用的方式(比如使用script 标签)
    libraryExport: "default", // 对外暴露default属性，就可以直接调用default里的属性
    globalObject: "this", // 定义全局变量,兼容node和浏览器运行，避免出现"window is not defined"的情况
    libraryTarget: "umd", // 定义打包方式Universal Module Definition,同时支持在CommonJS、AMD和全局变量使用
  },
};
