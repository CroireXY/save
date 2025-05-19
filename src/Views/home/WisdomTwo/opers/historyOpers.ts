import { hideAllTreeInfo, showNeedTreeInfo } from '@/utils/showOrHideInfoTree'

/**
 * 初始化历史遗留
 */
const initHistory = () => {
    __g.camera.stopAnimation()
    // hideAllTreeInfo()
    // showNeedTreeInfo(['地形影像', '智慧政务白模', '智慧政务灯光', '智慧政务核心区地形', '智慧政务核心区建筑', '智慧政务内部植物', '智慧政务外部植物', '智慧政委外围地形', '智慧政务小品', 'tese', '配楼w', 'CBD01','CBD02', ''])
    // __g.weather.setDateTime(2022, 10, 12, 10, 0, false)
}

/**
 * 还原
 */
const cleanHistory = () => {
    //@ts-ignore
    __g.shapeFileLayer.clear()
}

export { initHistory, cleanHistory }
