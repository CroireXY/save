<template>
    <div class="planing-container">
        <div class="panel">
            <div class="address">
                <div class="top">
                    <div class="geode">
                        <span>高德WEB服务key</span>
                        <input id="key" type="text" />
                    </div>
                    <div class="origin">
                        <span>起点</span>
                        <div id="origin"></div>
                    </div>
                    <div id="waypointsBox" class="waypoints" style="display: none">
                        <span>途径点</span>
                        <div id="waypoints"></div>
                    </div>
                    <div class="destination">
                        <span>终点</span>
                        <div id="destination"></div>
                    </div>
                </div>
                <div class="bottom">
                    <button class="item" @click="gaodeDirection('driving')">驾车路径规划</button>
                    <button class="item" @click="gaodeDirection('walking')">步行路径规划</button>
                </div>
            </div>

            <div class="path" id="path">
                <div class="title">推荐方案</div>
                <div class="index">
                    <div class="item" id="distance">2.8千米</div>
                    <div class="item" id="duration">5分钟</div>
                </div>
                <div class="list" id="pathList"></div>
            </div>
        </div>

        <div id="popup" class="popup">
            <div class="item" @click="setOrigin()">设为起点</div>
            <div class="item" @click="setWaypoints()">以此为途径点</div>
            <div class="item" @click="setDestination()">设为终点</div>
            <div class="item" @click="cancel()">取消路径规划</div>
        </div>

        <div id="legend" class="legend">
            <div class="title">图例</div>
            <div class="item">
                <div class="line" style="background: #1ac6ff"></div>
                <div class="label">未知</div>
            </div>
            <div class="item">
                <div class="line" style="background: #1aff1a"></div>
                <div class="label">畅通</div>
            </div>
            <div class="item">
                <div class="line" style="background: #ffff00"></div>
                <div class="label">缓行</div>
            </div>
            <div class="item">
                <div class="line" style="background: #ff1a1a"></div>
                <div class="label">拥堵</div>
            </div>
            <div class="item">
                <div class="line" style="background: #990000"></div>
                <div class="label">严重拥堵</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios'
import { useToolsStore } from '@/stores/tools'
let origin = [], // 起点坐标
    destination = [], // 终点坐标
    waypoints = [], // 途径点坐标
    nowLocation = [], // 当前右键点击坐标
    // 右键按下坐标，用于判断右键点击与放开是否在同坐标
    downXY = {
        x: 0,
        y: 0
    }
const tools = useToolsStore()
let gaodeKey = ''
/**
 * 高德路径规划
 * @param type 类型 （driving:驾车规划，walking:步行规划）
 * @returns {Promise<void>}
 */
const gaodeDirection = async type => {
    gaodeKey = document.getElementById('key').value // 高德 api key 用户可在高德地图官网申请

    if (!gaodeKey) {
        alert('您必须输入高德web服务key')
        return
    }

    if (origin.length == 0 || destination.length == 0) {
        alert('您必须用鼠标右键选择起点与终点才能进行分析！')
        return
    }
    // 把投影坐标转为 wgs84
    const origin_wgs = await __g.coord.pcs2gcs(origin)
    const destination_wgs = await __g.coord.pcs2gcs(destination)
    // wgs84转为gcj02
    const origin_gcj = window.gcoord.transform(
        [...origin_wgs.coordinates[0]], // 经纬度坐标
        window.gcoord.WGS84, // 当前坐标系
        window.gcoord.GCJ02 // 目标坐标系
    )
    const destination_gcj = window.gcoord.transform(
        [...destination_wgs.coordinates[0]], // 经纬度坐标
        window.gcoord.WGS84, // 当前坐标系
        window.gcoord.GCJ02 // 目标坐标系
    )
    // 途径点转坐标
    let waypoints_gcj = null
    if (waypoints.length > 0) {
        const waypoints_wgs = await __g.coord.pcs2gcs(waypoints)
        waypoints_gcj = window.gcoord.transform(
            [...waypoints_wgs.coordinates[0]], // 经纬度坐标
            window.gcoord.WGS84, // 当前坐标系
            window.gcoord.GCJ02 // 目标坐标系
        )
    }

    // 调用高德路径规划 api,具体可参考: https://lbs.amap.com/api/webservice/guide/api/newroute
    axios
        .get(`https://restapi.amap.com/v5/direction/${type}?parameters`, {
            params: {
                key: gaodeKey, // 高德Key
                origin: `${origin_gcj[0]},${origin_gcj[1]}`, // 起点经纬度
                destination: `${destination_gcj[0]},${destination_gcj[1]}`, // 目的地
                waypoints: waypoints_gcj ? `${waypoints_gcj[0]},${waypoints_gcj[1]}` : '', // 途经点
                show_fields: 'polyline,cost,tmcs' // 返回结果控制
            }
        })
        .then(response => {
            // 无效高德key判断
            if (response.data.status === '0') {
                alert('无效的高德web服务key，请检查您的key是否正确')
                cancel()
                return
            }

            const data = response.data.route.paths[0]
            // 显示路径div
            document.getElementById('path').style.display = 'block'
            // 获取路程与时间，显示到对应div中
            const distance = data.distance > 1000 ? `${(data.distance / 1000).toFixed(2)}千米` : data.distance + '米'
            document.getElementById('distance').textContent = distance
            document.getElementById('duration').textContent = `${(data.cost.duration / 60).toFixed(1)}分钟`
            // 更改list html内容，添加规划线路详情
            setListHtml(data.steps)
            // 添加规划路线
            addPolyLine(data.steps, type)
        })
}

/**
 * 更改list html内容，添加规划线路详情
 * @param data
 */
const setListHtml = data => {
    // 定义list html字符串
    let listHtml = ''
    data.forEach(item => {
        listHtml += `<div class="item">
                                    <div class="img"><img style="width: 50px;height: 50px"
                                     src="${window.origin}/img/routePlaning/${getImgName(item.instruction)}.png" alt="" /></div>
                                    <div class="instruction">${item.instruction}</div>
                                </div>`
    })
    // 定义list添加起点和终点显示
    listHtml = `<div class="item">
                                <div class="img" style="background:#00c691">起</div>
                                <div class="instruction">${document.getElementById('origin').textContent}</div>
                            </div>
                                    ${listHtml}
                                    <div class="item">
                                <div class="img" style="background:#fe5a26">终</div>
                                <div class="instruction">${document.getElementById('destination').textContent}</div>
                            </div>`
    document.getElementById('pathList').innerHTML = listHtml
}

/**
 * 绘制路径
 * @param data
 * @returns {Promise<void>}
 */
const addPolyLine = async (data, type) => {
    const polylineArr = []
    document.getElementById('legend').style.display = 'none'
    await __g.polyline.clear()
    let polyLineArr = []
    if (type == 'driving') {
        document.getElementById('legend').style.display = 'block'
        // 路况配色表
        const colorTable = {
            未知: '#1ac6ff',
            畅通: '#1aff1a',
            缓行: '#ffff00',
            拥堵: '#ff1a1a',
            严重拥堵: '#990000'
        }
        for (let i = 0; i <= data.length - 1; i++) {
            for (let j = 0; j <= data[i].tmcs.length - 1; j++) {
                const tmc = data[i].tmcs[j]
                // 处理线坐标，gcj转wgs84
                const coord = tmc.tmc_polyline.split(';')
                let wgsCoord = []
                coord.forEach(coordItem => {
                    const coord_gcj = coordItem.split(',')
                    const coord_wgs = window.gcoord.transform(
                        coord_gcj, // 经纬度坐标
                        window.gcoord.GCJ02, // 当前坐标系
                        window.gcoord.WGS84 // 目标坐标系
                    )
                    wgsCoord.push(coord_wgs)
                })
                // 处理线坐标，wgs84转投影坐标
                const { coordinates } = await __g.coord.gcs2pcs(wgsCoord)
                let oPolyLine = {
                    id: `'polyLine_${i}_${j}`, //折线唯一标识id
                    coordinates: coordinates, //构成折线的坐标点数组
                    range: [1, 10000], //可视范围：[近裁距离, 远裁距离]，取值范围: [任意负值, 任意正值]
                    color: colorTable[tmc.tmc_status], //折线颜色,根据路况动态配色
                    //线贴地style
                    style: 5, //折线样式 参考样式枚举：PolylineStyle
                    flowRate: 0.5, // 流速
                    thickness: 10, //折线宽度
                    intensity: 4, //亮度
                    shape: 1, // 样式，0：直线， 1：曲线
                    depthTest: false //是否做深度检测
                }
                polyLineArr.push(oPolyLine)
            }
        }
    } else if (type == 'walking') {
        for (let i = 0; i <= data.length - 1; i++) {
            // 处理线坐标，gcj转wgs84
            const coord = data[i].polyline.split(';')
            let wgsCoord = []
            coord.forEach(coordItem => {
                const coord_gcj = coordItem.split(',')
                const coord_wgs = window.gcoord.transform(
                    coord_gcj, // 经纬度坐标
                    window.gcoord.GCJ02, // 当前坐标系
                    window.gcoord.WGS84 // 目标坐标系
                )
                wgsCoord.push(coord_wgs)
            })
            // 处理线坐标，wgs84转投影坐标
            const { coordinates } = await __g.coord.gcs2pcs(wgsCoord)
            let oPolyLine = {
                id: `'polyLine_${i}`, //折线唯一标识id
                coordinates: coordinates, //构成折线的坐标点数组
                range: [1, 10000], //可视范围：[近裁距离, 远裁距离]，取值范围: [任意负值, 任意正值]
                color: '#1aff1a', //折线颜色
                //线贴地style
                style: 5, //折线样式 参考样式枚举：PolylineStyle
                flowRate: 0.5, // 流速
                thickness: 10, //折线宽度
                intensity: 4, //亮度
                shape: 1, // 样式，0：直线， 1：曲线
                depthTest: false //是否做深度检测
            }
            polyLineArr.push(oPolyLine)
        }
    }
    //批量添加线
    __g.polyline.add(polyLineArr, null)
}

/**
 * 高德地理编码-通过经纬度获取地址
 * @param coordinate 坐标
 * @param type 依据-(origin,destination,waypoints)
 * @returns {Promise<void>}
 */
const getGaodeRegeo = async (coordinate, type) => {
    gaodeKey = document.getElementById('key').value // 高德 api key 用户可在高德地图官网申请

    if (!gaodeKey) {
        alert('您必须输入高德web服务key')
        return
    }
    // 把投影坐标转为 wgs84
    const location_wgs = await __g.coord.pcs2gcs(coordinate)
    console.log(location_wgs)
    // wgs84转为gcj02
    const location_gcj = window.gcoord.transform(
        [...location_wgs.coordinates[0]], // 经纬度坐标
        window.gcoord.WGS84, // 当前坐标系
        window.gcoord.GCJ02 // 目标坐标系
    )
    // 高德地理编码api 具体可查看：https://lbs.amap.com/api/webservice/guide/api/georegeo
    axios
        .get('https://restapi.amap.com/v3/geocode/regeo?parameters', {
            params: {
                key: gaodeKey,
                location: `${location_gcj[0]},${location_gcj[1]}`
            }
        })
        .then(response => {
            // 无效高德key判断,若无效则清除当前的选择
            if (response.data.status === '0') {
                alert('无效的高德web服务key，请检查您的key是否正确')
                switch (type) {
                    case 'origin':
                        origin = []
                        break
                    case 'destination':
                        destination = []
                        break
                    case 'waypoints':
                        waypoints = []
                        break
                    default:
                        break
                }

                __g.marker.delete(type)
                document.getElementById(type).textContent = ''
                return
            }

            const data = response.data.regeocode
            const address = data.formatted_address
            // 把地址显示到对应的div中
            const div = document.getElementById(type)
            div.textContent = address
        })
}

/**
 * 添加marker点位
 * @param coordinate 坐标
 * @param key 依据-(origin,destination,waypoints)
 * @returns {Promise<void>}
 */
const addMarker = async (coordinate, key) => {
    await __g.marker.delete(key)
    __g.marker.add(
        {
            id: key,
            coordinate: coordinate, //坐标位置
            coordinateType: 0, //默认0是投影坐标系，也可以设置为经纬度空间坐标系值为1
            anchors: [-60 / 2, 60], //锚点
            range: [0, 100000], //可视范围
            imagePath: `@path:智慧广州/routePlaning/${key}.png`, //显示图片路径
            imageSize: [60, 60],
            displayMode: 2 //显示模式：相机移动时显示，参与避让聚合
        },
        null
    )
}

/**
 * 获取路径的方向png名称
 * @param instruction
 * @returns {string}
 */
const getImgName = instruction => {
    const imgNameList = ['左转', '右转', '调头', '直行']
    for (let index = 0; index < imgNameList.length; index++) {
        if (instruction.includes(imgNameList[index])) {
            return imgNameList[index]
        }
    }
    return '直行'
}

/**
 * 设置起点
 */
const setOrigin = () => {
    const gaodeKey = document.getElementById('key').value // 高德 api key 用户可在高德地图官网申请
    if (!gaodeKey) {
        alert('您必须输入高德web服务key')
        return
    }

    origin = tools.nowLocation
    popup.style.display = 'none'
    addMarker(origin, 'origin')
    getGaodeRegeo(origin, 'origin')
}

/**
 * 设置终点
 */
const setDestination = () => {
    const gaodeKey = document.getElementById('key').value // 高德 api key 用户可在高德地图官网申请
    if (!gaodeKey) {
        alert('您必须输入高德web服务key')
        return
    }

    destination = tools.nowLocation
    popup.style.display = 'none'
    addMarker(destination, 'destination')
    getGaodeRegeo(destination, 'destination')
}

/**
 * 设置途径点
 */
const setWaypoints = () => {
    document.getElementById('waypointsBox').style.display = 'flex'
    waypoints = tools.nowLocation
    popup.style.display = 'none'
    addMarker(waypoints, 'waypoints')
    getGaodeRegeo(waypoints, 'waypoints')
}

/**
 * 取消分析
 */
const cancel = () => {
    origin = []
    destination = []
    nowLocation = []

    document.getElementById('popup').style.display = 'none'
    document.getElementById('path').style.display = 'none'
    document.getElementById('waypointsBox').style.display = 'none'

    __g.marker.clear()
    __g.polyline.clear()

    document.getElementById('origin').textContent = ''
    document.getElementById('destination').textContent = ''
    document.getElementById('waypoints').textContent = ''

    document.getElementById('pathList').innerHTML = ''

    document.getElementById('legend').style.display = 'none'
}
</script>

<style lang="scss" scoped>
.planing-container {
    .panel {
        position: fixed;
        @include Top(230);
        @include Right(150);
        @include Width(420);
    }

    .address {
        @include Width(420);
        background: rgba(0, 0, 0, 0.5);
        padding: 10px 20px;
        text-align: center;
    }

    .top {
        @include Width(370);
        color: #ffffff;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }

    .top .origin {
        padding: 5px 10px;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        @include FontSize(13);
        margin-bottom: 10px;
    }

    .top .origin span {
        color: #589200;
        @include FontSize(12);
        @include Width(40);
    }

    .top .destination {
        padding: 5px 10px;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        @include FontSize(13);
        margin-bottom: 10px;
    }

    .top .destination span {
        color: #ff6435;
        @include FontSize(12);
        @include Width(40);
    }

    .top .waypoints {
        padding: 5px 10px;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        @include FontSize(13);
        margin-bottom: 10px;
    }

    .top .waypoints span {
        color: #26eefe;
        font-size: 12px;
        @include Width(40);
    }

    .top .geode {
        padding: 5px 10px;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        @include FontSize(13);
        margin-bottom: 10px;
    }

    .top .geode span {
        color: #26eefe;
        @include FontSize(12);
        @include Width(64);
        margin-right: 10px;
    }

    .top .geode input[type='text'] {
        width: 100%;
        @include hHeight(25);
        background: #727272;
        color: #fff;
        border: 1px solid #343a41;
        border-radius: 5px;
        padding: 0px 5px;
    }

    .bottom {
        @include FontSize(12);
    }

    #origin,
    #destination,
    #waypoints {
        @include Width(300);
        overflow: hidden;
        text-align: left;
    }

    .path {
        display: none;
        margin-top: 10px;
        @include Width(360);
        background: rgba(0, 0, 0, 0.5);
        padding: 10px 20px;
        text-align: center;
        color: #fff;
        padding: 20px;
        @include FontSize(13);
    }

    .path .title {
        margin-bottom: 10px;
        @include FontSize(14);
    }

    .path .index {
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        margin-bottom: 10px;
        @include FontSize(12);
    }

    .path .index .item {
        text-align: center;
        width: 50%;
        margin: 5px 0;
    }

    .path .index .item:nth-child(1) {
        border-right: 1px solid #ffffff;
    }

    .path .list {
        position: relative;
        max-height: calc(100vh - 550px);
        overflow-y: auto;
    }

    .path .list:before {
        content: '';
        position: absolute;
        height: calc(100% - 40px);
        @include Width(10);
        border-left: 1px dashed #ffffff;
        left: 11.5px;
        top: 20px;
        z-index: -1;
    }

    .path .list .item {
        display: flex;
        align-items: center;
        padding: 5px 0;
    }

    .path .list .item .img {
        @include Width(25);
        @include hHeight(25);
        background: #666666;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 15px;
    }

    .path .list .item .img img {
        @include Width(25);
        @include hHeight(20);
    }

    .path .list .item .instruction {
        text-align: left;
        border-bottom: 1px dotted rgb(177, 177, 177);
        @include Width(300);
        padding: 3px 0;
    }

    .popup {
        position: fixed;
        @include Width(140);
        top: 0;
        left: 0;
        display: none;
        background: rgba(0, 86, 139, 0.5);
        border: 1px solid #ffffff;
        border-radius: 5px;
        overflow: hidden;
        color: #ffffff;
        @include FontSize(12);
    }

    .popup .item {
        @include Width(140);
        @include hHeight(40);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s;
    }

    .popup .item:hover {
        background: rgba(0, 86, 139, 0.5);
        color: #49bcd8;
    }

    button {
        background: #090b0a;
        padding: 8px 10px;
        border: 1px solid #1a1f1b;
        border-radius: 10px;
        color: #fff;
        cursor: pointer;
    }

    .legend {
        position: fixed;
        bottom: 60px;
        right: 75px;
        background: rgba(0, 0, 0, 0.5);
        color: #fff;
        padding: 10px 10px;
        display: none;
    }

    .legend .title {
        font-weight: bold;
        margin-bottom: 10px;
        @include FontSize(13);
    }

    .legend .item {
        display: flex;
        align-items: center;
        @include FontSize(13);
    }

    .legend .item .line {
        @include Width(20);
        @include hHeight(5);
        margin: 0px 5px;
    }

    /*滚动条 start*/
    ::-webkit-scrollbar {
        @include Width(4);
        @include hHeight(4);
        background-color: #f5f5f5;
    }

    /*定义滚动条轨道 内阴影+圆角*/
    ::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 1px rgba(0, 0, 0, 0.15);
        background-color: rgba(73, 177, 245, 0.2);
        border-radius: 2em;
    }

    /*定义滑块 内阴影+圆角*/
    ::-webkit-scrollbar-thumb {
        background-color: #444444;
        border-radius: 2em;
    }

    ::-webkit-scrollbar-thumb:hover {
        border-radius: 3px;
        -webkit-box-shadow: inset 0 0 1px rgba(0, 0, 0, 0.15);
        background-color: #444444;
    }
}
</style>
