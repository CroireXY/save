import { getBorder, getLayer } from '@/api/home'
import { useDisplayStore } from '@/stores/display'

/**
 * 用于显示隐藏
 */
const polygon3dArr: any = []
const shmarkerArr: any = []
const shmarker3dArr: any = []
/**
 * 添加顶部数据
 */
const addTopLayer = () => {
    const polygonArr: any = []
    getLayer().then(async (data: any) => {
        data.features.forEach((item: any, index: number) => {
            const placeObj = placeNameArr.find((i: any) => i.code == item.properties.code)
            const top = {
                id: 'top_polygon_' + index,
                coordinates: item.geometry.coordinates,
                color: placeObj.color, //颜色值
                height: 200, //3D多边形的高度
                intensity: 0.3, //亮度
                style: 1,
                // material: '/JC_CustomAssets/MaterialLibrary/Exhibition/大理石/MI_BlueMarble01', //自定义材质路径
                // vectorParameters: [{ name: '颜色', value: placeObj.color }], //材质数组类型参数
                // scalarParameters: [
                //     { name: 'U缩放', value: 0.00001 },
                //     { name: 'V缩放', value: 0.00001 },
                //     { name: '饱和度', value: 1 },
                //     { name: '高光', value: 0.3 },
                //     { name: '亮度', value: 0.3 }
                // ], //材质数值类型参数
                generateTop: true, //是否生成顶面
                generateSide: true, //是否生成侧面
                generateBottom: true //是否生成底面
            }
            polygon3dArr.push('top_polygon_' + index)
            polygonArr.push(top)

            const borderCoord = JSON.parse(JSON.stringify(item.geometry.coordinates))
            borderCoord.forEach((item: any) => {
                item.forEach((i: any) => {
                    i[2] = 400
                })
            })
            const border = {
                id: 'top_border_' + index, //polygon唯一标识id
                coordinates: borderCoord, //构成polygon的坐标点数组
                color: '#000',
                style: 8,
                intensity: 1,
                height: 1500 //3D多边形的高度
            }
            polygon3dArr.push('top_border_' + index)
            polygonArr.push(border)
        })
        //批量添加polygon
        // const res = await __g.polygon3d.add(polygonArr, null)
        // if (res.result) {
        //     __g.polygon3d.show(polygon3dArr)
        // }
    })
}

/**
 * 添加底部装饰图层
 */
const addBottomLayer = () => {
    const polygonArr: Array<any> = []
    getBorder().then(async (data: any) => {
        data.features.forEach((item: any, index: number) => {
            const coordinate1 = JSON.parse(JSON.stringify(item.geometry.coordinates[0]))
            // 最底层蓝色-起始高度0，高度80
            coordinate1.forEach((item: Array<number>) => {
                item.forEach((i: any) => {
                    i[2] = -100
                })
            })
            const bottom1 = {
                id: 'bottom1_' + index, //polygon唯一标识id
                coordinates: coordinate1, //构成polygon的坐标点数组
                color: '#122e36',
                style: 2,
                intensity: 1,
                height: 100 //3D多边形的高度
            }
            polygon3dArr.push('bottom1_' + index)
            polygonArr.push(bottom1)
            const coordinate2 = JSON.parse(JSON.stringify(item.geometry.coordinates[0]))
            // 2层灰色-起始高度60，高度160
            coordinate2.forEach((item: Array<number>) => {
                item.forEach((i: any) => {
                    i[2] = -300
                })
            })
            const bottom2 = {
                id: 'bottom2_' + index, //polygon唯一标识id
                coordinates: coordinate2, //构成polygon的坐标点数组
                color: [0.2, 0.2, 0.2, 1],
                style: 2,
                height: 500 //3D多边形的高度
            }
            polygon3dArr.push('bottom2_' + index)
            polygonArr.push(bottom2)

            // 3层蓝绿色-起始高度120，高度100
            const coordinate3 = JSON.parse(JSON.stringify(item.geometry.coordinates[0]))
            coordinate3.forEach((item: Array<number>) => {
                item.forEach((i: any) => {
                    i[2] = -600
                })
            })
            const bottom3 = {
                id: 'bottom3_' + index, //polygon唯一标识id
                coordinates: coordinate3, //构成polygon的坐标点数组
                color: '#1d8eae',
                style: 4,
                height: 1000 //3D多边形的高度
            }
            polygon3dArr.push('bottom3_' + index)
            polygonArr.push(bottom3)
        })
        //批量添加polygon
        // const res = await __g.polygon3d.add(polygonArr, null)
        // if (res.result) {
        //     __g.polygon3d.show(polygon3dArr)
        // }
    })
}

/**
 * 添加中心点位
 */
const addMakerLayer = async () => {
    const markerArr: any = []
    const marker3dArr: any = []
    placeNameArr.forEach((item: any, index: number) => {
        const coordinate = item.coordinate
        coordinate[0] = coordinate[0] + 500
        coordinate[1] = coordinate[1] - 500
        coordinate[2] = 100
        const oMarker = {
            id: 'marker_label_' + index,
            coordinate: coordinate, //坐标位置
            range: [0, 1000000], //可视范围
            text: item.name, //显示的文字
            textRange: [0, 1000000], //文本可视范围[近裁距离, 远裁距离]
            textBackgroundColor: [0, 0, 0, 0], //文本背景颜色
            fontSize: 16, //字体大小
            textOffset: [0, 0, 0],
            fontOutlineSize: 1, //字体轮廓线大小
            fontColor: Color.Black, //字体颜色
            fontOutlineColor: Color.White, //字体轮廓线颜色
            displayMode: 2 //显示模式：相机移动时显示，参与避让聚合
        }
        shmarkerArr.push('marker_label_' + index)
        markerArr.push(oMarker)

        // const coordinate3D = item.coordinate
        // coordinate[2] = 0
        // const oMarker3d = {
        //     id: 'marker_3d_' + index,
        //     coordinate: coordinate3D, //坐标位置
        //     textVisible: false, //3D标注显示文字是否显示文本
        //     pointName: 'Point_Y_3', //3D标注展示的特效名称
        //     pointVisible: true, //3D标注是否显示
        //     pointScale: 2000, //3D标注整体缩放比例
        //     range: [0, 10000000] //可视范围
        // }
        // shmarker3dArr.push('marker_3d_' + index)
        // marker3dArr.push(oMarker3d)
    })
    //添加点
    // const res = await __g.marker.add(markerArr)
    // if (res.result) {
    //     __g.marker.show(shmarkerArr)
    // }
    // __g.marker3d.add(marker3dArr)
}

/**
 * 获取数组颜色
 * @param colorArr
 */
const getColorArr = (colorArr: number[]) => {
    return [colorArr[0] / 255, colorArr[1] / 255, colorArr[2] / 255, 1]
}

const displayStore = useDisplayStore()
/**
 * 初始化行政区划
 */
const initAdminStrativeArea = async () => {
    // __g.camera.stopAnimation()
    // // 设置成晚上
    // // await __g.weather.setDateTime(2022, 10, 25, 20, 8, false);
    // __g.camera.set(473660.9325, 2558256.117344, 227589.52, -85.993263, -84.615585, 0)

    // __g.weather.setDarkMode(true)

    if (displayStore.showAdministrativeArea) {
        // __g.polygon3d.show(polygon3dArr)
        // __g.marker.show(shmarkerArr)
        // __g.marker3d.show(shmarker3dArr)
    } else {
        // 生成顶面和地面
        addTopLayer()
        addBottomLayer()
        addMakerLayer()
        displayStore.SetShowAdministrativeArea(true)
    }
}

/**
 * 还原
 */
const cleanAdminStrativeArea = () => {
    // __g.weather.setDarkMode(false)
    // __g.polygon3d.hide(polygon3dArr)
    // __g.marker.hide(shmarkerArr)
    // __g.marker3d.hide(shmarker3dArr)
    // __g.polygon3d.clear(null)
    // __g.marker.clear(null)
    // __g.marker3d.clear(null)
}

const placeNameArr: any = [
    {
        name: '从化区',
        color: getColorArr([190, 232, 255]),
        coordinate: [469115.90625, 2617369.75, 499.98999],
        code: 440117000000
    },
    {
        name: '花都区',
        color: getColorArr([245, 163, 122]),
        coordinate: [418492, 2594911.25, 500],
        code: 440114000000
    },
    {
        name: '白云区',
        color: getColorArr([122, 182, 246]),
        coordinate: [427847.28125, 2576905.5, 499.98999],
        code: 440111000000
    },
    {
        name: '黄浦区',
        color: getColorArr([246, 202, 123]),
        coordinate: [448374.03125, 2564985, 499.98999],
        code: 440112000000
    },
    {
        name: '增城区',
        color: getColorArr([189, 209, 255]),
        coordinate: [476950.625, 2581137.75, 500],
        code: 440118000000
    },
    {
        name: '天河区',
        color: getColorArr([232, 190, 254]),
        coordinate: [435534.78125, 2560765.5, 500.029999],
        code: 440106000000
    },
    {
        name: '越秀区',
        color: getColorArr([254, 234, 189]),
        coordinate: [424648.03125, 2559173.25, 500.019989],
        code: 440104000000
    },
    {
        name: '荔湾区',
        color: getColorArr([190, 232, 255]),
        coordinate: [419852.40625, 2554878.25, 499.98999],
        code: 440103000000
    },
    {
        name: '海珠区',
        color: getColorArr([254, 167, 126]),
        coordinate: [428788.0625, 2554051.5, 499.98999],
        code: 440105000000
    },
    {
        name: '番禺区',
        color: getColorArr([254, 190, 191]),
        coordinate: [439691.34375, 2543769.75, 500.01001],
        code: 440113000000
    },
    {
        name: '南沙区',
        color: getColorArr([240, 228, 191]),
        coordinate: [446769.28125, 2521479, 500.070007],
        code: 440115000000
    }
]

export { initAdminStrativeArea, cleanAdminStrativeArea }
