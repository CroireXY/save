/*
 * @Author: Sun ruiqi
 * @Date: 2025-05-12 09:42:28
 * @LastEditors: viola
 * @LastEditTime: 2025-06-09 15:41:39
 * @FilePath: \code\babel.config.js
 */
module.exports = {
  presets: [
    "@vue/cli-plugin-babel/preset",
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-typescript'
  ],

};
