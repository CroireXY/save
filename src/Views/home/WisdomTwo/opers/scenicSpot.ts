import { getScenicData, getBorder } from '@/api/home'
import { hideAllTreeInfo, showNeedTreeInfo } from '@/utils/showOrHideInfoTree'
import { useDisplayStore } from '@/stores/display'

const displayStore = useDisplayStore()
const shHeatmapArr: any = []
const shPolygon3dArr: any = []
const shMarker3dArr: any = []
const shCustomTagArr: any = []
const scenicSpot = async () => {
  await setStyle()
  // if (displayStore.showScenicSpot) {
  //   await __g.heatmap.show(shHeatmapArr)
  //   await __g.polygon3d.show(shPolygon3dArr)
  //   await __g.marker3d.show(shMarker3dArr)
  //   await __g.customTag.show(shCustomTagArr)
  // } else {
  const data: any = await getScenicData();
  const list: any = []
  data.features.forEach((item: any, index: number) => {
    if (index % 2 == 0) {


      list.push({
        id: 'heatmap_' + index,
        coordinate: [...item.geometry.coordinates, 0],
        radius: 4000, //热力点影像半径范围
        heatValue: 0.065 //热力值
      })
    }
  })
  // setTimeout(() => {
  __g.heatmap.add('heatmap', [300000, 2431071, -1000, 570000, 2731198, 1000], [0, 100], list)
  // if (res.result) {
  __g.heatmap.show('heatmap')
  // }
  // }, 1000)
  shHeatmapArr.push('heatmap')
  await addBorder()
  await add3dPoint()
  await addCustomTag()
  displayStore.SetShowScenicSpot(true)
  // }
}

const addBorder = () => {
  const polygonArr: Array<any> = []
  getBorder().then(async (data: any) => {
    data.features.forEach((item: any, index: number) => {
      const coordinate1 = JSON.parse(JSON.stringify(item.geometry.coordinates[0]))
      // 最底层蓝色-起始高度0，高度80
      coordinate1.forEach((item: Array<number>) => {
        item.forEach((i: any) => {
          i[2] = -4000
        })
      })
      const bottom1 = {
        id: 'bottom1_' + index, //polygon唯一标识id
        coordinates: coordinate1, //构成polygon的坐标点数组
        color: '#5ab9f3',
        style: 5,
        intensity: 1,
        height: 4000 //3D多边形的高度
      }
      shPolygon3dArr.push('bottom1_' + index)
      polygonArr.push(bottom1)

      const coordinate2 = JSON.parse(JSON.stringify(item.geometry.coordinates[0]))
      // 最底层蓝色-起始高度0，高度80
      coordinate2.forEach((item: Array<number>) => {
        item.forEach((i: any) => {
          i[2] = 0
        })
      })
      const bottom2 = {
        id: 'bottom2_' + index, //polygon唯一标识id
        coordinates: coordinate2, //构成polygon的坐标点数组
        color: '#5ab9f3',
        style: 3,
        intensity: 1,
        height: 4000 //3D多边形的高度
      }
      shPolygon3dArr.push('bottom2_' + index)
      polygonArr.push(bottom2)
    })
    //批量添加polygon
    const res = await __g.polygon3d.add(polygonArr, null)
      //@ts-ignore

      if (res) {
      __g.polygon3d.show(shPolygon3dArr)
    }
  })
}

const setStyle = async () => {
  __g.camera.stopAnimation()
  hideAllTreeInfo()
  showNeedTreeInfo(['地形影像'])
  await __g.weather.setDateTime(2022, 10, 12, 6, 0, false)
  __g.weather.setDarkMode(true)

  __g.camera.set(453606, 2528535, 117989, -70.286163, -94.771667, 1)
}

const scenicrestore = async () => {
  await __g.heatmap.hide(shHeatmapArr)
  await __g.polygon3d.hide(shPolygon3dArr)
  await __g.marker3d.hide(shMarker3dArr)
  await __g.customTag.hide(shCustomTagArr)

  // await __g.heatmap.clear(null)
  // await __g.polygon3d.clear(null)
  // await __g.marker3d.clear(null)
  // await __g.customTag.clear(null)
  await __g.weather.setDarkMode(false)
}

/**
 * 添加自定义对象
 */
const addCustomTag = async () => {
  // 自定义对象数组
  const addCustomTagArr: any = []
  pointCoordinate.forEach((item: any, index: number) => {
    item[2] = 500
    addCustomTagArr.push({
      id: 'scenic-pop-' + index, // id
      coordinate: item, // 坐标值
      contentURL: `@path:智慧广州/customTag/human.html`, // 网页url
      contentSize: [60, 60], //网页窗口宽高 [width, height]
      popupURL: `@path:智慧广州/customTag/flow.html`,
      popupSize: [350, 470],
      popupPos: [10, 10], //弹窗位置: [x, y]
      pivot: [0.5, 1], // 中心点
      range: [0, 10000000], //显示范围：[min, max]
      autoHidePopupWindow: true //失去焦点后是否自动关闭弹出窗口
    })
    shCustomTagArr.push('scenic-pop-' + index)
  })
  // 添加标注对象
  const res = await __g.customTag.add(addCustomTagArr)
  if (res.result) {
    __g.customTag.show(shCustomTagArr)
  }
}

/**
 * 添加点
 * @returns {Promise<void>}
 */
const add3dPoint = async () => {
  const pointArr: any = []
  pointCoordinate.forEach((item: any, index: number) => {
    item[2] = 100
    const o = {
      id: 'm_' + index,
      pointName: 'Point_G_1', //3D标注展示的特效名称
      pointVisible: true, //3D标注是否显示
      pointScale: 1000, //3D标注整体缩放比例
      coordinate: item, //3D标注的坐标位置 注意：若坐标Z设置高度为0时 autoHeight=true则会显示在物体上方
      coordinateType: 0, //坐标系类型
      range: [1, 1000000], //3D标注的可视距离范围：[min,max]，单位：米
      autoHeight: false //自动判断下方是否有物体，设置正确高度，默认值：false
    }
    shMarker3dArr.push('m_' + index)
    pointArr.push(o)
  })
  const res = await __g.marker3d.add(pointArr)
  if (res.result) {
    __g.marker3d.show(shMarker3dArr)
  }
}

const pointCoordinate: any = [
  [422523.28125, 2557306, 12.6525],
  [424525.5625, 2558546.5, 18.3575],
  [427744.5, 2554300.75, 5.9075],
  [428824.65625, 2560410.5, 19.014999],
  [424237.21875, 2562441, 18.1],
  [422175.21875, 2567518.5, -0.9375],
  [424981.65625, 2573597.75, 7.11],
  [437749.84375, 2558111.75, 8.285],
  [440492.65625, 2558145.5, 2.735],
  [429834.875, 2545124.25, 38.786251],
  [431813.625, 2534110.25, 3.5975],
  [435525.875, 2539285.75, 4.6525],
  [438727.3125, 2538855, 2.395],
  [442851.40625, 2539494, 9.9325],
  [437493.1875, 2546184.75, 5.5725],
  [440568.125, 2548828.25, 8.945],
  [451415.25, 2564931.25, 42.272499]
]

export { scenicSpot, scenicrestore }
