import { useDisplayStore } from '@/stores/display'

//圆心坐标
const centerPoint = [430249, 2558019.25, 10]

const shMarkerArr: any = []
/**
 * 添加文字
 */
const addMinuteMarker = async () => {
    const o = {
        id: 'MinuteMarker0',
        groupId: 'markerAdd',
        coordinate: [430480.90625, 2558354, 168.25141906738281], //坐标位置
        coordinateType: 0, //默认0是投影坐标系，也可以设置为经纬度空间坐标系值为1
        range: [1, 100000], //可视范围

        text: '8分钟步行圈', //显示的文字
        useTextAnimation: true, //打开文字展开动画效果
        textRange: [1, 100000], //文本可视范围[近裁距离, 远裁距离]
        textOffset: [0, 0], // 文本偏移
        textBackgroundColor: [0, 0, 0, 0.8], //文本背景颜色
        fontSize: 24, //字体大小
        fontOutlineSize: 1, //字体轮廓线大小
        fontColor: Color.White, //字体颜色
        fontOutlineColor: Color.Black, //字体轮廓线颜色

        showLine: true, //标注点下方是否显示垂直牵引线
        lineSize: [2, 100], //垂直牵引线宽度和高度[width, height]
        lineColor: Color.White, //垂直牵引线颜色
        lineOffset: [0, 0], //垂直牵引线偏移

        autoHidePopupWindow: true, //失去焦点后是否自动关闭弹出窗口
        autoHeight: false, // 自动判断下方是否有物体
        displayMode: 2, //显示模式
        clusterByImage: true, // 聚合时是否根据图片路径分类，即当多个marker的imagePath路径参数相同时按路径对marker分类聚合
        priority: 0, //避让优先级
        occlusionCull: false //是否参与遮挡剔除
    }
    const o1 = {
        id: 'MinuteMarker1',
        groupId: 'markerAdd',
        coordinate: [430827.96875, 2558271.75, 144.20594787597656], //坐标位置
        coordinateType: 0, //默认0是投影坐标系，也可以设置为经纬度空间坐标系值为1
        range: [1, 100000], //可视范围

        text: '15分钟步行圈', //显示的文字
        useTextAnimation: true, //打开文字展开动画效果
        textRange: [1, 100000], //文本可视范围[近裁距离, 远裁距离]
        textOffset: [0, 0], // 文本偏移
        textBackgroundColor: [0, 0, 0, 0.8], //文本背景颜色
        fontSize: 24, //字体大小
        fontOutlineSize: 1, //字体轮廓线大小
        fontColor: Color.White, //字体颜色
        fontOutlineColor: Color.Black, //字体轮廓线颜色

        showLine: true, //标注点下方是否显示垂直牵引线
        lineSize: [2, 100], //垂直牵引线宽度和高度[width, height]
        lineColor: Color.White, //垂直牵引线颜色
        lineOffset: [0, 0], //垂直牵引线偏移

        autoHidePopupWindow: true, //失去焦点后是否自动关闭弹出窗口
        autoHeight: false, // 自动判断下方是否有物体
        displayMode: 2, //显示模式
        clusterByImage: true, // 聚合时是否根据图片路径分类，即当多个marker的imagePath路径参数相同时按路径对marker分类聚合
        priority: 0, //避让优先级
        occlusionCull: false //是否参与遮挡剔除
    }

    // const res = await __g.marker.add(o)
    // if (res.result) {
    //     __g.marker.show('MinuteMarker0')
    // }
    // shMarkerArr.push('MinuteMarker0')
    // await delay(2000)
    // const res1 = await __g.marker.add(o1)
    // if (res1.result) {
    //     __g.marker.show('MinuteMarker1')
    // }
    // shMarkerArr.push('MinuteMarker1')
}

/**
 * 创建圆形
 */
const createCircle = async () => {
    const o = {
        id: 'circle0', //折线唯一标识id
        coordinates: getCircular(centerPoint, 700), //构成折线的坐标点数组
        range: [1, 10000], //可视范围：[近裁距离, 远裁距离]，取值范围: [任意负值, 任意正值]
        color: '#58bbd0', //折线颜色
        style: 4, //折线样式 参考样式枚举：PolylineStyle
        thickness: 2, //折线宽度
        intensity: 10, //亮度
        flowRate: 0.5, //流速
        shape: 0, //折线类型 0：直线， 1：曲线
        depthTest: false //是否做深度检测
    }
    const o1 = {
        id: 'circle1', //折线唯一标识id
        coordinates: getCircular(centerPoint, 300), //构成折线的坐标点数组
        range: [1, 10000], //可视范围：[近裁距离, 远裁距离]，取值范围: [任意负值, 任意正值]
        color: '#2a98ae', //折线颜色
        style: 4, //折线样式 参考样式枚举：PolylineStyle
        thickness: 2, //折线宽度
        intensity: 10, //亮度
        flowRate: 0.5, //流速
        shape: 0, //折线类型 0：直线， 1：曲线
        depthTest: false //是否做深度检测
    }
    // const res = await __g.polyline.add(o1)
    // if (res.result) {
    //     __g.polyline.show('circle1')
    // }
    // await delay(2000)
    // const res1 = await __g.polyline.add(o)
    // if (res1.result) {
    //     __g.polyline.show('circle0')
    // }
}

/**
 * 添加检测点 Point_R_2
 */
const addMark = async () => {
    const o = {
        id: 'CenterMark',
        groupId: 'center_Mark',
        pointName: 'Point_B_7', //3D标注展示的特效名称
        pointVisible: true, //3D标注是否显示
        pointScale: 50, //3D标注整体缩放比例
        coordinate: centerPoint, //3D标注的坐标位置 注意：若坐标Z设置高度为0时 autoHeight=true则会显示在物体上方
        coordinateType: 0, //坐标系类型
        range: [1, 10000], //3D标注的可视距离范围：[min,max]，单位：米
        autoHeight: false //自动判断下方是否有物体，设置正确高度，默认值：false
    }
    // const res = await __g.marker3d.add(o)
    // if (res.result) {
    //     __g.marker3d.show('CenterMark')
    // }
}

/**
 *延迟函数
 *@param time 时间
 */
const delay = (time: number) => {
    return new Promise<void>(resolve => {
        const timer = setTimeout(() => {
            clearTimeout(timer)
            resolve()
        }, time)
    })
}

const shCustomTag: any = []
/**
 * 添加自定义对象
 * @returns {Promise<void>}
 */
const addCustomTag = async () => {
    const addCustomTagArr: any = []
    markerCoors.forEach((item, index) => {
        addCustomTagArr.push({
            id: 'shortCustom-' + index,
            coordinate: item,
            contentURL: `@path:智慧广州/customTag/people.html?index=${index}`,
            contentSize: [420, 120], //网页窗口宽高 [width, height]
            pivot: [0.5, 0.4], // 中心点
            range: [0, 100000], //显示范围：[min, max]
            popupURL: `@path:智慧广州/customTag/peopleTag.html`, //弹窗地址url
            popupSize: [350, 470], //弹窗尺寸
            popupPos: [0, 0], //弹窗位置: [x, y]
            autoHidePopupWindow: true //失去焦点后是否自动关闭弹出窗口
        })
        shCustomTag.push('shortCustom-' + index)
    })
    //批量添加
    // const res = await __g.customTag.add(addCustomTagArr)
    // if (res.result) {
    //     __g.customTag.show(shCustomTag)
    // }
}

/**
 * 创建射线
 */
const createPolyline = async () => {
    const polylineArr: any = []
    const beams: any = []
    destinationCoors.forEach((item: any, index: number) => {
        const coor = [[centerPoint[0], centerPoint[1], 20], item]
        const obj = {
            id: `ray_polyLine_${index}`, //折线唯一标识id
            coordinates: coor, //构成折线的坐标点数组
            color: colorList[index % 3], //折线颜色
            style: 4, //折线样式 参考样式枚举：PolylineStyle
            thickness: 2, //折线宽度
            intensity: 8, //亮度
            flowRate: 0.2, //流速
            tiling: 0, //材质贴图平铺比例
            shape: 0, //折线类型 0：直线， 1：曲线
            depthTest: false, //是否做深度检测
            coordinateType: 1
        }
        const obj2 = {
            id: `ray_beam_${index}`, //折线唯一标识id
            coordinates: coor, //构成折线的坐标点数组
            duration: 3, //光流粒子的生命周期
            thickness: 0.3, //光流线的宽度比例s
            interval: 2.5, //光流粒子发射间隔
            velocity: 1, //光流粒子的速度
            color: colorList[index % 3] //光流的颜色
        }
        polylineArr.push(obj)
        beams.push(obj2)
    })
    // const res = await __g.polyline.add(polylineArr)
    // if (res.result) {
    //     const hideArr: any = []
    //     destinationCoors.forEach((item: any, index: number) => {
    //         hideArr.push(`ray_polyLine_${index}`)
    //     })
    //     __g.polyline.show(hideArr)
    // }
    // const res1 = await __g.beam.add(beams)
    // if (res1.result) {
    //     const hideBeamArr: any = []
    //     destinationCoors.forEach((item: any, index: number) => {
    //         hideBeamArr.push(`ray_beam_${index}`)
    //     })
    //     __g.beam.show(hideBeamArr)
    // }
}
const displayStore = useDisplayStore()

/**
 * 初始化交通接驳
 */
const initShortConnection = async () => {
    // __g.camera.stopAnimation()
    // __g.camera.set(430273.596914, 2559413.243594, 771.315938, -25.983561, 90.771606, 1)
    // __g.weather.setDateTime(2020, 9, 9, 22, 8, false)
    if (displayStore.showShortConnection) {
        // await __g.polyline.show(['circle1'])
        // await __g.marker.show('MinuteMarker0')
        // await delay(2000)
        // __g.polyline.show(['circle0'])
        // __g.marker.show('MinuteMarker1')
        const hideArr: any = []
        const hideBeamArr: any = []
        destinationCoors.forEach((item: any, index: number) => {
            hideArr.push(`ray_polyLine_${index}`)
            hideBeamArr.push(`ray_beam_${index}`)
        })
        // await delay(500)
        // __g.polyline.show(hideArr)
        // __g.beam.show(hideBeamArr)
        // await delay(500)
        // __g.marker3d.show('CenterMark')
        // __g.customTag.show(shCustomTag)
    } else {
        await createCircle()
        await addMinuteMarker()
        await delay(500)
        await createPolyline()
        await delay(500)
        await addMark()
        await addCustomTag()
        displayStore.SetShowShortConnection(true)
    }
}

/**
 * 还原
 */
const cleanShortConnection = () => {
    // __g.weather.setDateTime(2020, 9, 9, 10, 8, false)
    // __g.polyline.hide(['circle0', 'circle1'])
    const hideArr: any = []
    const hideBeamArr: any = []
    destinationCoors.forEach((item: any, index: number) => {
        hideArr.push(`ray_polyLine_${index}`)
        hideBeamArr.push(`ray_beam_${index}`)
    })
    // __g.polyline.hide(hideArr)
    // __g.beam.hide(hideBeamArr)
    // __g.marker3d.hide('CenterMark')
    // __g.customTag.hide(shCustomTag)
    // __g.marker.hide(shMarkerArr)

    // __g.polyline.clear(null)
    // __g.beam.clear(null)
    // __g.marker3d.clear(null)
    // __g.customTag.clear(null)
    // __g.marker.clear(null)
}

const num = 180

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

const colorList = ['#3498da', '#22ce76', '#5c48df']

const markerCoors = [
    [430350.5, 2557909.25, 34.52296829223633],
    [430041.15625, 2557912.5, 42.298126220703125],
    [430230.84375, 2558327, 12.827890396118164],
    [430826.5625, 2558278, 65.60031127929688],
    [429864.8125, 2558617.5, 76.4711685180664],
    [429762.59375, 2557807.5, 51.83578109741211]
]

// 射线终点
const destinationCoors: any = [
    [430998.09375, 2558169.25, 12.586875],
    [430730.5, 2558413, 87.357185],
    [430804.5625, 2558525.75, 12.587344],
    [430623.34375, 2558537, 12.587188],
    [430441.1875, 2558736, 12.818906],
    [430231.1875, 2558518.25, 12.619062],
    [430595.03125, 2557956.25, 12.587656],
    [430390.0625, 2558030, 301.920013],
    [430159.34375, 2558087.25, 12.5875],
    [429474.40625, 2557838, 12.587656],
    [429662, 2558441.5, 12.637656],
    [429592.25, 2558694, 12.5875],
    [429862.3125, 2558687, 12.587656],
    [429907.28125, 2557557, 12.618906],
    [430238.1875, 2557630.5, 12.583438],
    [430589.53125, 2557561.25, 12.5875],
    [430864.96875, 2557932.5, 12.587344]
]

export { initShortConnection, cleanShortConnection }
