import { getMetroData } from '@/api/home'
import { hideAllTreeInfo } from '@/utils/showOrHideInfoTree'
import { useDisplayStore } from '@/stores/display'

// 地铁站点坐标
const metroStationArr: any = []
// 用于显示隐藏
const shMark: any = []
const shPolyline: any = []
const shBeam: any = []
/**
 * 添加地铁站mark
 */
const addSubwayStation = async (data: any) => {
    const stationMarkArr: any = []
    for (const key in data) {
        const item = data[key]
        item.coordinates.forEach((coors: any, index: number) => {
            coors.forEach((cs: any) => {
                cs.forEach((c: any, index: number) => {
                    c[2] = 0
                    if (index % 30 <= 0) {
                        metroStationArr.push(c)
                    }
                })
            })
        })
    }
    metroStationArr.forEach((item: any, index: number) => {
        //支持经纬度坐标和普通投影坐标两种类型
        const o = {
            id: `SubwayStation_${index}`,
            groupId: 'markerAdd',
            coordinate: item, //坐标位置
            coordinateType: 0, //默认0是投影坐标系，也可以设置为经纬度空间坐标系值为1
            anchors: [-13, 30], //锚点，设置Marker的整体偏移，取值规则和imageSize设置的宽高有关，图片的左上角会对准标注点的坐标位置。示例设置规则：x=-imageSize.width/2，y=imageSize.height
            imageSize: [25, 30], //图片的尺寸
            hoverImageSize: [50, 50], //鼠标悬停时显示的图片尺寸
            range: [1, 1000000], //可视范围
            imagePath: `@path:智慧广州/customTag/mark/map_spot_ditie.png`, //显示图片路径
            fixedSize: true, //图片固定尺寸，取值范围：false 自适应，近大远小，true 固定尺寸，默认值：false

            autoHeight: false, // 自动判断下方是否有物体
            displayMode: 2, //显示模式
            clusterByImage: true, // 聚合时是否根据图片路径分类，即当多个marker的imagePath路径参数相同时按路径对marker分类聚合
            priority: 0, //避让优先级
            occlusionCull: true //是否参与遮挡剔除
        }
        shMark.push(`SubwayStation_${index}`)
        stationMarkArr.push(o)
    })
    const res = await __g.marker.add(stationMarkArr)
    if (res.result) {
        __g.marker.show(shMark)
    }
}

/**
 * 划线
 * @param data
 * @constructor
 */
const AddPolyline = async (data: any) => {
    //添加相同点位的polyline和光流
    const datas: any = []
    const beams: any = []
    for (const key in data) {
        const item = data[key]
        item.coordinates.forEach((coors: any, index: number) => {
            coors.forEach((cs: any) => {
                cs.forEach((c: any) => {
                    c[2] = 0
                })
                const obj = {
                    id: `metro_polyLine_${key}_${index}`, //折线唯一标识id
                    coordinates: cs, //构成折线的坐标点数组
                    color: item.color, //折线颜色
                    style: 4, //折线样式 参考样式枚举：PolylineStyle
                    thickness: 30, //折线宽度
                    intensity: 8, //亮度
                    flowRate: 0.2, //流速
                    tiling: 0, //材质贴图平铺比例
                    shape: 0, //折线类型 0：直线， 1：曲线
                    depthTest: false, //是否做深度检测
                    coordinateType: 1
                }
                const obj2 = {
                    id: `metro_beam_${key}_${index}`, //折线唯一标识id
                    coordinates: cs, //构成折线的坐标点数组
                    duration: 3, //光流粒子的生命周期
                    thickness: 5, //光流线的宽度比例
                    interval: 2.5, //光流粒子发射间隔
                    velocity: 0.7, //光流粒子的速度
                    color: item.color //光流的颜色
                }
                shPolyline.push(`metro_polyLine_${key}_${index}`)
                shBeam.push(`metro_beam_${key}_${index}`)
                datas.push(obj)
                beams.push(obj2)
            })
        })
    }
    const res = await __g.polyline.add(datas)
    if (res.result) {
        __g.polyline.show(shPolyline)
    }
    const res1 = await __g.beam.add(beams)
    if (res1.result) {
        __g.beam.show(shBeam)
    }
}

/**
 * 获取地铁数据
 */
const accessToSubwayLines = async () => {
    // 重置地铁对象的坐标数组
    for (const key in subwayObj) {
        subwayObj[key].coordinates = []
    }
    await getMetroData().then((res: any) => {
        for (const key in subwayObj as any) {
            res.features.forEach((item: any) => {
                const reg = RegExp(key, 'i')
                if (reg.exec(item.properties.pyname)) {
                    subwayObj[key].coordinates.push(item.geometry.coordinates)
                }
            })
        }
    })
}

const displayStore = useDisplayStore()
/**
 * 初始化地铁规划
 */
const initMetroPlanning = async () => {
    __g.camera.stopAnimation()
    __g.camera.set(440394.227031, 2558071.219609, 27668.615, -70.734909, 178.340912, 1)
    // 开启电子地图
    __g.settings.setMapMode(
        2,
        {
            //地图模式相关的参数，具体请参考API帮助文档
            coordType: 0, // coordType: 坐标系类型，0：经纬度；1：本地（默认值是0）
            serviceType: 4, // serviceType: 服务类型，0：MVT矢量切片； 1：WMTS(ArcGis) （默认值是0）
            mapPoint: [430809.12, 2556481.54], // mapPoint: 同名点，取值范围：[x,y]，（默认值是[0, 0]）
            longitude: 113.324593, // longitude: 经度，取值范围：[0~180]（默认值是0.0）
            latitude: 23.106405, // latitude: 纬度，取值范围：[0~90]（默认值是0.0）
            style: 'mapbox://styles/mapbox/dark-v9', // style: 风格路径，字符串地址，（默认值是 "mapbox://styles/mapbox/streets-v10"）
            groundHeight: 150, // groundHeight: 地面高度，取值范围：[0~任意数值]（默认值是0.0）
            renderMode: 0, // renderMode: 渲染模式，0：正常；1：透明；2：标注；3：贴地（默认值是0）
            coordOrder: 0, // coordOrder: 坐标顺序，0: XY; 1: YX（默认值为0）
            maxLevel: 22 // axLevel: WMTS服务最大显示层级，取值范围：[0~22]，默认值：10
        },
        () => {
            console.log('设置大地图模式完成')
        }
    )
    // 隐藏所有图层
    hideAllTreeInfo()
    if (displayStore.showMetroPlanning) {
        __g.polyline.show(shPolyline)
        __g.beam.show(shBeam)
        __g.marker.show(shMark)
    } else {
        // 获取地铁数据
        await accessToSubwayLines()
        // 划线
        await AddPolyline(subwayObj)
        // 地铁站点
        await addSubwayStation(subwayObj)
        displayStore.SetShowMetroPlanning(true)
    }
}

/**
 * 还原
 */
const cleanMetroPlanning = () => {
    __g.polyline.hide(shPolyline)
    __g.beam.hide(shBeam)
    __g.marker.hide(shMark)

    // __g.polyline.clear(null)
    // __g.beam.clear(null)
    // __g.marker.clear(null)
    // 关闭电子地图
    __g.settings.setMapMode(
        0,
        {
            //地图模式相关的参数，具体请参考API帮助文档
            coordType: 0, // coordType: 坐标系类型，0：经纬度；1：本地（默认值是0）
            serviceType: 4, // serviceType: 服务类型，0：MVT矢量切片； 1：WMTS(ArcGis) （默认值是0）
            mapPoint: [430809.12, 2556481.54], // mapPoint: 同名点，取值范围：[x,y]，（默认值是[0, 0]）
            longitude: 113.324593, // longitude: 经度，取值范围：[0~180]（默认值是0.0）
            latitude: 23.106405, // latitude: 纬度，取值范围：[0~90]（默认值是0.0）
            style: 'mapbox://styles/mapbox/dark-v9', // style: 风格路径，字符串地址，（默认值是 "mapbox://styles/mapbox/streets-v10"）
            groundHeight: 150, // groundHeight: 地面高度，取值范围：[0~任意数值]（默认值是0.0）
            renderMode: 0, // renderMode: 渲染模式，0：正常；1：透明；2：标注；3：贴地（默认值是0）
            coordOrder: 0, // coordOrder: 坐标顺序，0: XY; 1: YX（默认值为0）
            maxLevel: 22 // axLevel: WMTS服务最大显示层级，取值范围：[0~22]，默认值：10
        },
        () => {
            console.log('设置地图模式完成')
        }
    )
}

// 地铁线路对象
const subwayObj: any = {
    '1': {
        color: '#efc649',
        coordinates: []
    },
    '2': {
        color: '#42608b',
        coordinates: []
    },
    '3': {
        color: '#e89249',
        coordinates: []
    },
    '4': {
        color: '#336d35',
        coordinates: []
    },
    '5': {
        color: '#bd2f3f',
        coordinates: []
    },
    '6': {
        color: '#6a2846',
        coordinates: []
    },
    '8': {
        color: '#367978',
        coordinates: []
    },
    ax: {
        color: '#b3ce30',
        coordinates: []
    }
}

export { initMetroPlanning, cleanMetroPlanning }
