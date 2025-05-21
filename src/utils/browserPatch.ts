/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2025-05-21 13:44:27
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2025-05-21 13:44:34
 * @FilePath: \code\src\utils\browserPatch.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
;(function () {
  if (typeof EventTarget !== 'undefined') {
    const func = EventTarget.prototype.addEventListener
    EventTarget.prototype.addEventListener = function (type, fn, capture) {
      ;(this as any).func = func
      if (typeof capture !== 'boolean') {
        capture = capture || {}
        capture.passive = false
      }
      ;(this as any).func(type, fn, capture)
    }
  }
})()
