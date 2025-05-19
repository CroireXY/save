import { useDisplayStore } from '@/stores/display'

//圆心坐标
const centerPoint = [430253.59375, 2556799.5, 30]

const shCustomTagArr: any = []
/**
 * 添加CustomTag
 */
const add = async () => {
    const addCustomTagArr: any = []
    pointCoors.forEach((item: any, index: number) => {
        addCustomTagArr.push({
            id: 'sound1-' + index,
            coordinate: item,
            contentURL: `@path:智慧广州/customTag/sound.html?index=${index % 3}`,
            contentSize: [315, 78], //网页窗口宽高 [width, height]
            popupPos: [100, 200], //弹窗位置: [x, y]
            pivot: [0.5, 1], // 中心点
            range: [0, 1000000], //显示范围：[min, max]
            autoHidePopupWindow: true //失去焦点后是否自动关闭弹出窗口
        })
        shCustomTagArr.push('sound1-' + index)
    })
    const res = await __g.customTag.add(addCustomTagArr)
    if (res.result) {
        __g.customTag.show(shCustomTagArr)
    }
}

/**
 * 创建圆形
 */
const createCircle = async () => {
    const centerPoint1 = [430253.59375, 2556799.5, 100]
    const centerPoint11 = [430253.59375, 2556799.5, 600]
    const centerPoint2 = [430253.59375, 2556799.5, 600]
    const centerPoint22 = [430253.59375, 2556799.5, 1100]
    const circleArr = []
    const o = {
        id: 'situ_circle0', //折线唯一标识id
        coordinates: getCircular(centerPoint, 4000), //构成折线的坐标点数组
        range: [1, 10000], //可视范围：[近裁距离, 远裁距离]，取值范围: [任意负值, 任意正值]
        color: '#46ff00', //折线颜色
        style: 4, //折线样式 参考样式枚举：PolylineStyle
        thickness: 20, //折线宽度
        intensity: 2, //亮度
        flowRate: 1.5, //流速
        tiling: 0, //材质贴图平铺比例
        shape: 0, //折线类型 0：直线， 1：曲线
        depthTest: false //是否做深度检测
    }
    circleArr.push(o)
    const o1 = {
        id: 'situ_circle1', //折线唯一标识id
        coordinates: getCircular(centerPoint1, 2666), //构成折线的坐标点数组
        range: [1, 10000], //可视范围：[近裁距离, 远裁距离]，取值范围: [任意负值, 任意正值]
        color: '#fff400', //折线颜色
        style: 4, //折线样式 参考样式枚举：PolylineStyle
        thickness: 20, //折线宽度
        intensity: 2, //亮度
        flowRate: 0.5, //流速
        tiling: 0, //材质贴图平铺比例
        shape: 0, //折线类型 0：直线， 1：曲线
        depthTest: false //是否做深度检测
    }
    const o11 = {
        id: 'situ_circle11', //折线唯一标识id
        coordinates: getCircular(centerPoint11, 2666), //构成折线的坐标点数组
        range: [1, 10000], //可视范围：[近裁距离, 远裁距离]，取值范围: [任意负值, 任意正值]
        color: '#fff400', //折线颜色
        style: 4, //折线样式 参考样式枚举：PolylineStyle
        thickness: 20, //折线宽度
        intensity: 2, //亮度
        flowRate: 0.5, //流速
        tiling: 0, //材质贴图平铺比例
        shape: 0, //折线类型 0：直线， 1：曲线
        depthTest: false //是否做深度检测
    }
    circleArr.push(o1)
    circleArr.push(o11)
    const o2 = {
        id: 'situ_circle2', //折线唯一标识id
        coordinates: getCircular(centerPoint2, 1333), //构成折线的坐标点数组
        range: [1, 10000], //可视范围：[近裁距离, 远裁距离]，取值范围: [任意负值, 任意正值]
        color: '#ff0000', //折线颜色
        style: 4, //折线样式 参考样式枚举：PolylineStyle
        thickness: 20, //折线宽度
        intensity: 2, //亮度
        flowRate: 0.5, //流速
        tiling: 0, //材质贴图平铺比例
        shape: 0, //折线类型 0：直线， 1：曲线
        depthTest: false //是否做深度检测
    }
    const o22 = {
        id: 'situ_circle22', //折线唯一标识id
        coordinates: getCircular(centerPoint22, 1333), //构成折线的坐标点数组
        range: [1, 10000], //可视范围：[近裁距离, 远裁距离]，取值范围: [任意负值, 任意正值]
        color: '#ff0000', //折线颜色
        style: 4, //折线样式 参考样式枚举：PolylineStyle
        thickness: 20, //折线宽度
        intensity: 2, //亮度
        flowRate: 0.5, //流速
        tiling: 0, //材质贴图平铺比例
        shape: 0, //折线类型 0：直线， 1：曲线
        depthTest: false //是否做深度检测
    }
    circleArr.push(o2)
    circleArr.push(o22)
    const res = await __g.polyline.add(circleArr)
    if (res.result) {
        __g.polyline.show(['situ_circle0', 'situ_circle1', 'situ_circle11', 'situ_circle2', 'situ_circle22'])
    }
}

/**
 * 创建格子
 */
const createAGrid = async () => {
    const argidArr: any = []
    const centerPoint1 = [430253.59375, 2556799.5, 500]
    const centerPoint2 = [430253.59375, 2556799.5, 100]
    const o = {
        id: 'AGrid',
        coordinates: [getCircular(centerPoint, 4000), getCircular(centerPoint, 2666)],
        color: [0, 1, 0, 0.5], //颜色值
        height: 100, //3D多边形的高度
        intensity: 1.0, //亮度
        style: 9,
        // material: '/JC_CustomAssets/MaterialLibrary/Exhibition/栅栏/MI_Grid01', //自定义材质路径
        // vectorParameters: [{ name: '颜色', value: [0, 1, 0, 0.5] }], //材质数组类型参数
        // scalarParameters: [
        //     { name: '不透明度', value: 0.1 },
        //     { name: '亮度', value: 400 },
        //     { name: 'U缩放', value: 0.05 },
        //     { name: 'V缩放', value: 0.05 }
        // ], //材质数值类型参数
        generateTop: true, //是否生成顶面
        generateSide: false, //是否生成侧面
        generateBottom: false //是否生成底面
    }
    argidArr.push(o)
    centerPoint[2] = 32
    const o1 = {
        id: 'AGrid1',
        coordinates: [getCircular(centerPoint2, 2666), getCircular(centerPoint2, 1333)],
        color: [1, 1, 0, 0.5], //颜色值
        height: 500, //3D多边形的高度
        intensity: 1.0, //亮度
        style: 9,
        // material: '/JC_CustomAssets/MaterialLibrary/Exhibition/栅栏/MI_Grid01', //自定义材质路径
        // vectorParameters: [{ name: '颜色', value: [1, 1, 0, 0.5] }], //材质数组类型参数
        // scalarParameters: [
        //     { name: '不透明度', value: 0.1 },
        //     { name: '亮度', value: 400 },
        //     { name: 'U缩放', value: 0.05 },
        //     { name: 'V缩放', value: 0.05 }
        // ], //材质数值类型参数
        generateTop: true, //是否生成顶面
        generateSide: true, //是否生成侧面
        generateBottom: true //是否生成底面
    }
    argidArr.push(o1)
    centerPoint[2] = 34
    const o2 = {
        id: 'AGrid2',
        coordinates: getCircular(centerPoint1, 1333),
        color: [1, 0, 0, 0.5], //颜色值
        height: 600, //3D多边形的高度
        intensity: 1.0, //亮度
        style: 9,
        // material: '/JC_CustomAssets/MaterialLibrary/Exhibition/栅栏/MI_Grid01', //自定义材质路径
        // vectorParameters: [{ name: '颜色', value: [1, 0, 0, 0.5] }], //材质数组类型参数
        // scalarParameters: [
        //     { name: '不透明度', value: 0.1 },
        //     { name: '亮度', value: 400 },
        //     { name: 'U缩放', value: 0.05 },
        //     { name: 'V缩放', value: 0.05 }
        // ], //材质数值类型参数
        generateTop: true, //是否生成顶面
        generateSide: true, //是否生成侧面
        generateBottom: true //是否生成底面
    }
    argidArr.push(o2)
    const res = await __g.polygon3d.add(argidArr)
    if (res.result) {
        __g.polygon3d.show(['AGrid', 'AGrid1', 'AGrid2'])
    }
}

/**
 * 打点
 */
const addPoint = async () => {
    const pointArr: any = []
    const imgName: any = ['map_spot_bus.png', 'map_spot_yongdu.png']
    pointCoors.forEach((item: any, index: number) => {
        const o = {
            id: 'point' + index,
            groupId: 'markerAdd',
            coordinate: item, //坐标位置
            coordinateType: 0, //默认0是投影坐标系，也可以设置为经纬度空间坐标系值为1
            anchors: [-25, 50], //锚点，设置Marker的整体偏移，取值规则和imageSize设置的宽高有关，图片的左上角会对准标注点的坐标位置。示例设置规则：x=-imageSize.width/2，y=imageSize.height
            imageSize: [40, 50], //图片的尺寸
            hoverImageSize: [40, 50], //鼠标悬停时显示的图片尺寸
            range: [1, 1000000], //可视范围
            imagePath: `@path:智慧广州/customTag/images/equipment/${imgName[index % 2]}`, //显示图片路径
            hoverImagePath: `@path:智慧广州/customTag/images/equipment/${imgName[index % 2]}`, // 鼠标悬停时显示的图片路径
            fixedSize: true, //图片固定尺寸，取值范围：false 自适应，近大远小，true 固定尺寸，默认值：false

            popupURL: `@path:智慧广州/customTag/pointTag.html`, //弹窗HTML链接
            popupBackgroundColor: [1.0, 1.0, 1.0, 1], //弹窗背景颜色
            popupSize: [550, 650], //弹窗大小
            popupOffset: [0, 0], //弹窗偏移

            autoHidePopupWindow: true, //失去焦点后是否自动关闭弹出窗口
            autoHeight: false, // 自动判断下方是否有物体
            displayMode: 2, //显示模式
            clusterByImage: true, // 聚合时是否根据图片路径分类，即当多个marker的imagePath路径参数相同时按路径对marker分类聚合
            priority: 0, //避让优先级
            occlusionCull: false //是否参与遮挡剔除
        }
        pointArr.push(o)
    })
    const res = await __g.marker.add(pointArr)
    if (res.result) {
        const markArr: any = []
        pointCoors.forEach((item: any, index: number) => {
            markArr.push('point' + index)
        })
        await __g.marker.show(markArr)
    }
}

const displayStore = useDisplayStore()
/**
 * 初始化交通态势
 */
const initTrafficSituation = async () => {
    __g.camera.stopAnimation()
    __g.camera.set(429961.124629, 2563924.87, 1712.96625, -7.604534, 87.98719, 1)
    // __g.weather.setDateTime(2020, 9, 9, 10, 8, false)
    if (displayStore.showTrafficSituation) {
        await __g.polyline.show(['situ_circle0', 'situ_circle1', 'situ_circle11', 'situ_circle2', 'situ_circle22'])
        await __g.polygon3d.show(['AGrid', 'AGrid1', 'AGrid2'])
        const markArr: any = []
        pointCoors.forEach((item: any, index: number) => {
            markArr.push('point' + index)
        })
        // await __g.marker.show(markArr)
        await __g.customTag.show(shCustomTagArr)
    } else {
        await createCircle()
        await createAGrid()
        // await addPoint()
        await add()
        await displayStore.SetShowTrafficSituation(true)
    }
}

/**
 * 还原
 */
const cleanTrafficSituation = async () => {
    await __g.polyline.hide(['situ_circle0', 'situ_circle1', 'situ_circle11', 'situ_circle2', 'situ_circle22'])
    await __g.polygon3d.hide(['AGrid', 'AGrid1', 'AGrid2'])
    const markArr: any = []
    pointCoors.forEach((item: any, index: number) => {
        markArr.push('point' + index)
    })
    // await __g.marker.hide(markArr)
    await __g.customTag.hide(shCustomTagArr)

    // await __g.polyline.clear(null)
    // await __g.polygon3d.clear(null)
    // __g.marker.clear(null)
    // __g.customTag.clear(null)
}

const num = 360
/**
 * 获取圆形
 */
const getCircular = (center: number[], radius: number) => {
    //半径
    const r = 150 //单位：米
    //待计算圆上的点 注意：半径越大需要计算的点数量越多 本示例使用360个点
    const pointArr = []
    for (let i = 0; i < num; i++) {
        //角度转弧度
        const radians = (i * (360 / num) * Math.PI) / 180
        //计算圆上的点X坐标
        const x1 = center[0] + radius * Math.cos(radians)
        //计算圆上的点Y坐标
        const y1 = center[1] + radius * Math.sin(radians)
        //赋值圆上所有点数组
        pointArr.push([x1, y1, center[2]])
    }
    return pointArr
}

// mark坐标
const pointCoors: any = [
    [430333.71875, 2557029, 1100],
    [431813.84375, 2557732.5, 600.00061],
    [433284.71875, 2558413.25, 130.000305]
]

export { initTrafficSituation, cleanTrafficSituation }
