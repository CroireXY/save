import { useDisplayStore } from '@/stores/display'
import { hideAllTreeInfo, showNeedTreeInfo } from '@/utils/showOrHideInfoTree'

const displayStore = useDisplayStore()
export let timer: any = null
/**
 * 初始化交通预警
 */
const initTrafficWarning = async () => {
  __g.camera.stopAnimation()
  hideAllTreeInfo()
  showNeedTreeInfo(['地形影像', '矢量瓦片_广州', '智慧政务白模', '智慧政务灯光', '智慧政务核心区地形', '智慧政务核心区建筑', '智慧政务内部植物', '智慧政务外部植物', '智慧政委外围地形', '智慧政务小品'])
  clearTimeout(timer)
  __g.camera.set(430495.424814, 2556917.029395, 93.102021, -41.223816, 94.287369, 1)
  addCar('car0', 0, carCoors[0], [0, 90, 0])
  addCar('car1', 1, carCoors[1], [0, -90, 0])

  addMove(0, 'car0', 0.4)
  addMove(1, 'car1', 0.3)

  if (displayStore.showTrafficWarning) {
    // 添加警报
    timer = setTimeout(() => {
      __g.marker3d.show(['DangerMark', 'DangerMark1'])
      __g.camera.set(430490.152158, 2556876.663741, 42.063174, -41.223785, 94.287361, 1)
    }, 3500)
  } else {
    // 添加警报
    timer = setTimeout(() => {
      addDangerMark()
      __g.camera.set(430490.152158, 2556876.663741, 42.063174, -41.223785, 94.287361, 1)
    }, 3500)
    displayStore.SetShowTrafficWarning(true)
  }
}

/**
 * 添加车辆
 */
const addCar = async (id: string, num: number, location: number[], localRotation: number[]) => {
  const o = {
    id, //自定义对象唯一id
      // pakFilePath: '@path:DTS_Library.pak', //pak文件路径
      pakFilePath: ``, //pak文件路径
    assetPath: '/JC_CustomAssets/VehicleLibrary/Exhibition/轿车_04', //资源目录，自定义对象在pak文件资源包里的相对路径
    location, //位置坐标
    coordinateType: 0, // 坐标系类型
    localRotation, //旋转
    scale: [1, 1, 1], //缩放
    smoothMotion: 1 //1: 平滑插值，0: 跳跃
  }
  const res = await __g.customObject.add(o, null)
  if (res.result) {
    __g.customObject.show(id)
  }
}

/**
 * 添加平移
 * @param carNumber 第几辆车
 * @param carId 车辆id
 * @param speed 速度
 */
const addMove = async (carNumber: number, carId: string, speed: number) => {
  // 开始平移
  const pathPointArr = []
  for (let i = 0; i < moveCoors[carNumber].length; i++) {
    //构造数组元素 每2秒移动一次
    const elementPoint = { time: i * speed, coordinate: moveCoors[carNumber][i] }
    pathPointArr.push(elementPoint)
  }
  //设置跟随相机
  __g.customObject.setRotation(carId, [0, 90, 0])
  //车辆按GPS轨迹移动
  __g.customObject.startMove(carId, 0, pathPointArr)
}

/**
 * 添加检测点 Point_R_2
 */
const addDangerMark = async () => {
  const o = {
    id: 'DangerMark',
    groupId: 'traffic_Mark',
    pointName: 'Point_R_2', //3D标注展示的特效名称
    pointVisible: true, //3D标注是否显示
    pointScale: 4, //3D标注整体缩放比例
    coordinate: trafficCoors[0], //3D标注的坐标位置 注意：若坐标Z设置高度为0时 autoHeight=true则会显示在物体上方
    coordinateType: 0, //坐标系类型
    range: [1, 10000], //3D标注的可视距离范围：[min,max]，单位：米
    autoHeight: false //自动判断下方是否有物体，设置正确高度，默认值：false
  }
  const p = {
    id: 'DangerMark1',
    groupId: 'traffic_Mark',
    pointName: 'Point_R_5', //3D标注展示的特效名称
    pointVisible: true, //3D标注是否显示
    pointScale: 4, //3D标注整体缩放比例
    coordinate: trafficCoors[0], //3D标注的坐标位置 注意：若坐标Z设置高度为0时 autoHeight=true则会显示在物体上方
    coordinateType: 0, //坐标系类型
    range: [1, 10000], //3D标注的可视距离范围：[min,max]，单位：米
    autoHeight: false //自动判断下方是否有物体，设置正确高度，默认值：false
  }
  const res = await __g.marker3d.add(o)
  if (res.result) {
    __g.marker3d.show('DangerMark')
  }
  const res1 = await __g.marker3d.add(p)
  if (res1.result) {
    __g.marker3d.show('DangerMark1')
  }
}

/**
 * 还原
 */
const cleanTrafficWarning = async () => {
  await __g.customObject.clear(null)
  await __g.marker3d.hide(['DangerMark', 'DangerMark1'])
}

// 撞击点
const trafficCoors = [[430482.53125, 2556848, 9.9301853179931641]]

// 车辆初始坐标
const carCoors = [
  [430521.90625, 2556862.25, 9.919687],
  [430429.3125, 2556850.5, 10.014179]
]

// 车辆移动轨迹
const moveCoors = [
  [
    [430521.90625, 2556862.25, 9.919687],
    [430516.53125, 2556862.5, 9.913399],
    [430510.03125, 2556861.5, 9.910898],
    [430503.84375, 2556859.75, 9.909111],
    [430498.46875, 2556858, 9.908623],
    [430493.90625, 2556856, 9.912969],
    [430489, 2556852.75, 9.919424],
    [430484.90625, 2556849.25, 9.924453],
    [430484.53125, 2556846, 9.925371],
    [430485.125, 2556843, 9.921679]
  ],
  [
    [430429.3125, 2556850.5, 10.014179],
    [430435.34375, 2556850.25, 10.004443],
    [430441.09375, 2556850, 9.995293],
    [430447.25, 2556849.5, 9.98583],
    [430453.9375, 2556849.75, 9.974893],
    [430460.78125, 2556849.25, 9.964873],
    [430467.625, 2556848.75, 9.956543],
    [430473.1875, 2556848.25, 9.95041],
    [430478.34375, 2556848, 9.938428],
    [430483.46875, 2556847.25, 9.926748],
    [430481.625, 2556852, 9.935059],
    [430481.65625, 2556853.75, 9.932354]
  ]
]

export { initTrafficWarning, cleanTrafficWarning }
