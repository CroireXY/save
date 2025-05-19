import { hideAllTreeInfo, hideNeedTreeInfo, showNeedTreeInfo } from '@/utils/showOrHideInfoTree'

/**
 * 添加自定义对象
 * @returns {Promise<void>}
 */
const add = async () => {
    // 先清空
    await __g.customTag.clear()
    // 自定义对象数组
    const addCustomTagArr: any = []
    markerPoint.forEach((item: any, index: number) => {
        addCustomTagArr.push({
            id: 'pop-' + index,
            coordinate: item,
            contentURL: `${window.origin}/customTag/circleInCircle.html`,
            contentSize: [165, 165], //网页窗口宽高 [width, height]
            pivot: [0.5, 1], // 中心点
            range: [0, 100000], //显示范围：[min, max]
            autoHidePopupWindow: true //失去焦点后是否自动关闭弹出窗口
        })
    })
    // 批量添加
    __g.customTag.add(addCustomTagArr)
}

/**
 * 初始化智慧社区1
 */
const initIntelligenceCommunity1 = () => {
    __g.camera.stopAnimation()
    __g.weather.setDateTime(2020, 9, 9, 22, 8, false)
    __g.camera.set(430382.59248, 2554933.248906, 1020.520781, -31.00539, -88.502747, 1)
    hideAllTreeInfo()
    showNeedTreeInfo(['智慧社区', '地形影像', '矢量瓦片_广州', '智慧政务白模', '智慧政务灯光', '智慧政务核心区地形', '智慧政务核心区建筑', '智慧政务内部植物', '智慧政务外部植物', '智慧政委外围地形', '智慧政务小品'])
    add()
}

/**
 * 还原
 */
const cleanIntelligenceCommunity1 = () => {
    __g.camera.playAnimation(0)
    __g.customTag.clear(null)
    hideNeedTreeInfo(['智慧社区'])
}

// 点
const markerPoint = [
    [429677.125, 2555872.25, 25.003046],
    [430328.15625, 2555787.5, 98.313675],
    [430808.875, 2555829.5, 25.406563],
    [430677.59375, 2556550, 38.116016]
]

export { initIntelligenceCommunity1, cleanIntelligenceCommunity1 }
