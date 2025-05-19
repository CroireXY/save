import { hideAllTreeInfo, hideNeedTreeInfo, showNeedTreeInfo } from '@/utils/showOrHideInfoTree'
import { useDisplayStore } from '@/stores/display'

const shCustomTagArr: any = []
/**
 * 添加自定义对象
 */
const addCustomTag = async () => {
  // 自定义对象数组
  const addCustomTagArr: any = []
  cord.forEach((item: any, index: number) => {
    addCustomTagArr.push({
      id: 'community-pop-' + index, // id
      coordinate: item, // 坐标值
      contentURL: `@path:智慧广州/customTag/community.html`, // 网页url
      contentSize: [60, 60], //网页窗口宽高 [width, height]
      popupURL: `@path:智慧广州/customTag/population.html?num1=${Math.floor(Math.random() * (50000 - 500)) + 500}&placeIndex=${index % 3}`,
      popupSize: [350, 470],
      popupPos: [10, 10], //弹窗位置: [x, y]
      pivot: [0.5, 1], // 中心点
      range: [0, 1000000], //显示范围：[min, max]
      autoHidePopupWindow: true //失去焦点后是否自动关闭弹出窗口
    })
    shCustomTagArr.push('community-pop-' + index)
  })
  // 添加标注对象
  const res = await __g.customTag.add(addCustomTagArr)
  if (res.result) {
    __g.customTag.show(shCustomTagArr)
  }
}

const displayStore = useDisplayStore()
/**
 * 初始化智慧规划
 */
const initIntelligenceCommunity2 = async () => {
  await __g.camera.stopAnimation()
  await __g.weather.setDateTime(2023, 8, 15, 22, 8, false)

  await hideAllTreeInfo()
  await showNeedTreeInfo(['智慧规划', '地形影像', '智慧政务白模', '智慧政务灯光', '智慧政务核心区地形', '智慧政务核心区建筑', '智慧政务内部植物', '智慧政务外部植物', '智慧政委外围地形', '智慧政务小品'])
  if (displayStore.showIntelligenceCommunity) {
    __g.customTag.show(shCustomTagArr)
  } else {
    await addCustomTag()
    await displayStore.SetShowIntelligenceCommunity(true)
  }
  __g.camera.set(430387.194219, 2557843.330313, 1338.442656, -42.229256, 105.683197, 1);
}

const cleanIntelligenceCommunity2 = () => {
  __g.camera.playAnimation(12)
  hideNeedTreeInfo(['智慧规划'])
  __g.customTag.hide(shCustomTagArr)
}

// 坐标
const cord: any = [
  [431562.5625, 2556358.75, 14.115313],
  [430167.6875, 2556472.5, 42.218124],
  [430107.84375, 2555387.75, 49.040939],
  [428807, 2555806, 45.363594]
]

export { initIntelligenceCommunity2, cleanIntelligenceCommunity2 }
