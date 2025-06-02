/*
 * @Author: Sun ruiqi
 * @Date: 2025-05-12 06:15:48
 * @LastEditors: viola
 * @LastEditTime: 2025-06-02 14:05:32
 * @FilePath: \code\vue.config.js
 */

const path = require("path");

const TITLE = require("./public/aircity/Config");
const title = TITLE.title || "飞服平台";
module.exports = {
  publicPath: "/",

  devServer: {
    // 配置服务器
    // open: true,
    // 项目运行时候的端口号
    port: 8090,
    // https: false,
    disableHostCheck: true,

    overlay: {
      warnings: true,
      errors: true,
    },
    proxy: {
      "/api": {
        target: "http://127.0.0.1:8084/",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
    headers: {
        // 'Cross-Origin-Opener-Policy': 'same-origin',
        // 'Cross-Origin-Embedder-Policy': 'require-corp'
    },
  },
  css: {
    sourceMap: true, // 开启 CSS source maps
    loaderOptions: {
      sass: {
        additionalData: "@import '@/styles/common.scss';",
      },
    },
  },
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = title;
      return args;
    });
    if (process.env.NODE_ENV === "production") {
      //生产包取消console debugger打印
      config.optimization.minimizer("terser").tap((args) => {
        args[0].terserOptions.compress.drop_console = true;
        args[0].terserOptions.compress.drop_debugger = true;
        args[0].terserOptions.compress.pure_funcs = ["console.log"];
        args[0].terserOptions.output = {
          comments: false,
        };
        return args;
      });
    }
    // 分析打包大小
    if (process.env.npm_config_report) {
      config
        .plugin("webpack-bundle-analyzer")
        .use(require("webpack-bundle-analyzer").BundleAnalyzerPlugin)
        .end();
    }
  },
  productionSourceMap: false,
  configureWebpack: {
    module: {
      unknownContextCritical: false,
    },
    resolve: {
      extensions: [".js", ".vue", ".json", ".ts", ".tsx"], // 加入ts 和 tsx
      alias: {
        "@": path.resolve(__dirname, "src"),
        // 'cesium': path.resolve(__dirname, './node_modules/cesium/')
      },
    },
  },
};
