<!--
 * @Author: Sun ruiqi
 * @Date: 2025-05-15 17:00:08
 * @LastEditors: viola
 * @LastEditTime: 2025-05-28 11:19:26
 * @FilePath: \code\src\components\map\map.vue
-->
<!-- 加载视频流组件 -->
<template>
  <div>
    <!-- <button id="fly" class="stopped" onclick="flyThrough()"></button> -->
    <div id="cesiumContainer"></div>

    <div id="credit" style="display: none"></div>
  </div>
</template>

<script lang="ts" setup>
import * as Cesium from "cesium";
import "../../Widgets/widgets.css";
import { onMounted } from "vue";
// 设置cesium的静态资源路径
window.CESIUM_BASE_URL = "/cesium";
let inter = null;
onMounted(() => {
  const basemapProvider = new Cesium.UrlTemplateImageryProvider({
    url: "https://mapapi.geodata.gov.hk/gs/api/v1.0.0/xyz/imagery/WGS84/{z}/{x}/{y}.png",
    credit: "© Map from Lands Department",
  });
  Cesium.Ion.defaultAccessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxMTZmYTNlZi02NzU2LTQ3MTYtYWUwYS03NWRmNzllZTk5YWUiLCJpZCI6MzAzMDI1LCJpYXQiOjE3NDczODg0NTN9.paeLe2jzSEv9-YXWxw-m9hNcJHoTNQJrSZKZDkLXYF0";
  const viewer = new Cesium.Viewer("cesiumContainer", {
    // baseLayer: new Cesium.ImageryLayer(basemapProvider),
    // 图层
    imageryProvider: basemapProvider, //当baseLayerPicker为false时，imageryProvider和terrainProvider才有效
    baseLayerPicker: false, // 底层图层控件显隐(默认true)

    // 当baseLayerPicker为true时，以下两个参数才有效
    //  参数imageryProviderViewModels(可选底图层)和terrinProviderViewModels(可选地形层)可以设置底图和地形:

    // 控件显示隐藏
    timeline: false, //下侧时间轴（默认true）
    animation: false, //左下角动画部件按钮（默认true）
    vrButton: false, // VR按钮（默认false）
    fullscreenButton: true, // 全屏按钮（默认true）
    homeButton: false, // 视角复位按钮（默认true）
    navigationHelpButton: true, //帮助按钮 (默认true)
    geocoder: true, // 地理编码器（搜索框）(默认true)
    sceneModePicker: false, //二三维切换按钮(默认true)
    shouldAnimate: false, // 自动播放动画(默认false)
    infoBox: true, // 信息框（默认true）
    // 参数
    scene3DOnly: false, // 只显示3D场景（默认false）
    showRenderLoopErrors: false, // 是否显示渲染循环错误（默认false）

    requestRenderMode: true,
    creditContainer: "credit",
  });
  viewer.scene.screenSpaceCameraController.enableCollisionDetection = true; //不允许去地下
  // 1. 禁用 Cesium 默认滚轮缩放
  viewer.scene.screenSpaceCameraController.enableZoom = false;

  // 2. 监听容器上的滚轮事件，自定义缩放
  const container = viewer.container;
  container.addEventListener(
    "wheel",
    function (event) {
      const wheelEvent = event as WheelEvent;
      wheelEvent.preventDefault();
      const amount = 50; // 控制缩放速度，数值越小缩放越慢
      if (wheelEvent.deltaY < 0) {
        viewer.camera.zoomIn(amount);
      } else {
        viewer.camera.zoomOut(amount);
      }
    },
    { passive: false }
  );

  // 添加Cesium3DTileset图层
  const addLayer = async () => {
    // let tileset = await Cesium.Cesium3DTileset.fromUrl(
    //   'https://data.map.gov.hk/api/3d-data/3dtiles/f2/tileset.json?key=3967f8f365694e0798af3e7678509421'
    // );
    let tileset = new Cesium.Cesium3DTileset({
      url: "https://data.map.gov.hk/api/3d-data/3dtiles/f2/tileset.json?key=3967f8f365694e0798af3e7678509421",
    });
    await tileset.readyPromise;
    viewer.scene.primitives.add(tileset);
  };
  addLayer();

 // 添加光照效果
//  viewer.scene.globe.enableLighting = true
// 			viewer.shadows = true
// 			viewer.terrainShadows = Cesium.ShadowMode.RECEIVE_ONLY
// 			viewer.shadowMap.darkness = 0.02 //阴影透明度--越大越透明
// 			let time = 0
// 			inter = setInterval(() => {
// 				// 改变时间设置光照效果
// 				let date = new Date().getTime() + time
// 				let utc = Cesium.JulianDate.fromDate(new Date(date))
// 				//北京时间
// 				viewer.clockViewModel.currentTime = Cesium.JulianDate.addHours(utc, 0, new Cesium.JulianDate())
// 				time = time + 1000 * 60
// 			}, 100)

  addModel("/3d_icon/drones.glb", 114.13512, 22.25008, 700);
 
  viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(114.1293, 22.24992, 50),
    billboard: {
      // 图像地址，URI或Canvas的属性
      image: "/3d_icon/dronepoint_red.png",
      // 设置颜色和透明度
      color: Cesium.Color.WHITE.withAlpha(0.8),
      // 高度（以像素为单位）
      height: 50,
      // 宽度（以像素为单位）
      width: 50,
      // 逆时针旋转
      rotation: 20,
      // 大小是否以米为单位
      sizeInMeters: false,
      // 相对于坐标的垂直位置
      verticalOrigin: Cesium.VerticalOrigin.CENTER,
      // 相对于坐标的水平位置
      horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
      // 该属性指定标签在屏幕空间中距此标签原点的像素偏移量
      pixelOffset: new Cesium.Cartesian2(10, 0),
      // 应用于图像的统一比例。比例大于会1.0放大标签，而比例小于会1.0缩小标签。
      scale: 0.8,
      // 显示在距相机的距离处的属性，多少区间内是可以显示的
      // distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 1500),
      // 是否显示
      show: true,
    },
  });

  viewer.camera.flyTo({
    // lng, lat, alt
    destination: Cesium.Cartesian3.fromDegrees(
      // 经度
      114.130165,
      // 维度
      22.260256,
      // 高度
      1300
    ),
    // orientation: {
    //   heading: 6.280194717481077,
    //   pitch: -0.7921019105734031,
    //   roll: 6.283182074536001,
    // },
    duration: 3,
  });

  // const entity = viewer.entities.add({
  //   name: "drones",
  //   position: position,
  //   // orientation: orientation,
  //   model: {
  //     uri: "@/assets/3d_icon/drones.glb",
  //     minimumPixelSize: 128,
  //     maximumScale: 20000,
  //   },
  // });
  // viewer.trackedEntity = entity;

  // function flyThrough() {
  //   // const currentState = 'stopped' === document.getElementById("fly").className ? 'playing' : 'stopped';
  //   // document.getElementById("fly").className = currentState;
  //   const flyButton = document.getElementById("fly");
  //   const currentState =
  //     flyButton && flyButton.className === "stopped" ? "playing" : "stopped";
  //   if (flyButton) {
  //     flyButton.className = currentState;
  //   }
  //   viewer.scene.screenSpaceCameraController.enableInputs = false;
  //   if ("playing" === currentState) {
  //     viewer.camera.flyTo({
  //       destination: new Cesium.Cartesian3(
  //         -2422424.2445589276,
  //         5384032.397876303,
  //         2405707.0615597237
  //       ),
  //       orientation: {
  //         heading: 5.6200000366324705,
  //         pitch: -0.32032049944881735,
  //         roll: 6.283175543034232,
  //       },
  //       complete: function () {
  //         const distance = Cesium.Cartesian3.distance(
  //           Cesium.Cartesian3.fromDegrees(114.214374, 22.315202),
  //           Cesium.Cartesian3.fromDegrees(
  //             114.22428750237164,
  //             22.304629162175697
  //           )
  //         );
  //         const startTime = Cesium.JulianDate.fromDate(new Date());
  //         const stopTime = Cesium.JulianDate.addSeconds(
  //           startTime,
  //           distance,
  //           new Cesium.JulianDate()
  //         );
  //         const property = new Cesium.SampledPositionProperty();
  //         let time = Cesium.JulianDate.addSeconds(
  //           startTime,
  //           0,
  //           new Cesium.JulianDate()
  //         );
  //         let position = Cesium.Cartesian3.fromDegrees(
  //           114.22428750237164,
  //           22.304629162175697,
  //           132.02238802935133
  //         );
  //         property.addSample(time, position);
  //         time = Cesium.JulianDate.addSeconds(
  //           startTime,
  //           distance,
  //           new Cesium.JulianDate()
  //         );
  //         position = Cesium.Cartesian3.fromDegrees(
  //           114.214374,
  //           22.315202,
  //           132.02238802935133
  //         );
  //         property.addSample(time, position);
  //         let entity = {
  //           availability: new Cesium.TimeIntervalCollection([
  //             new Cesium.TimeInterval({
  //               start: startTime,
  //               stop: stopTime,
  //             }),
  //           ]),
  //           position: property,
  //         };
  //         entity.position.setInterpolationOptions({
  //           interpolationDegree: 2,
  //           interpolationAlgorithm: Cesium.HermitePolynomialApproximation,
  //         });

  //         viewer.clock.startTime = startTime.clone();
  //         viewer.clock.stopTime = stopTime.clone();
  //         viewer.clock.currentTime = startTime.clone();
  //         viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP;
  //         viewer.clock.multiplier = 50;
  //         viewer.clock.shouldAnimate = true;
  //         viewer.camera.position = new Cesium.Cartesian3(0.25, 0, 5);
  //         viewer.camera.direction = new Cesium.Cartesian3(-1.25, 1.6, -0.6725);
  //         viewer.camera.up = new Cesium.Cartesian3(0.0, 0.0, 1.0);
  //         viewer.camera.right = new Cesium.Cartesian3(0.0, -1.0, 0.0);

  //         viewer.scene.postUpdate.addEventListener(function (scene, time) {
  //           if (viewer.clock.shouldAnimate) {
  //             viewer.scene.screenSpaceCameraController.enableInputs = false;
  //             const position = entity.position.getValue(time);
  //             if (!Cesium.defined(position)) {
  //               return;
  //             }
  //             let transform;
  //             if (!Cesium.defined(entity.orientation)) {
  //               transform = Cesium.Transforms.eastNorthUpToFixedFrame(position);
  //             }
  //             const offset = Cesium.Cartesian3.clone(viewer.camera.position);
  //             const direction = Cesium.Cartesian3.clone(
  //               viewer.camera.direction
  //             );
  //             const up = Cesium.Cartesian3.clone(viewer.camera.up);
  //             viewer.camera.lookAtTransform(transform);
  //             Cesium.Cartesian3.clone(offset, viewer.camera.position);
  //             Cesium.Cartesian3.clone(direction, viewer.camera.direction);
  //             Cesium.Cartesian3.clone(up, viewer.camera.up);
  //             Cesium.Cartesian3.cross(direction, up, viewer.camera.right);
  //           } else {
  //             viewer.scene.postUpdate._listeners.pop();
  //             viewer.entities.remove(entity);
  //             viewer.clock.clockRange = 0;
  //             viewer.clock.multiplier = 1;
  //             viewer.clock.currentTime = Cesium.JulianDate.fromDate(new Date());
  //             viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
  //             viewer.camera.flyTo({
  //               destination: Cesium.Cartesian3.fromDegrees(
  //                 114.21918297929119,
  //                 22.237495624660887,
  //                 4999.9999999995025
  //               ),
  //               orientation: {
  //                 heading: 6.283185307179586,
  //                 pitch: -0.5251224807670001,
  //                 roll: 6.283185307179585,
  //               },
  //             });
  //           }
  //         });
  //       },
  //     });
  //   } else {
  //     viewer.clock.shouldAnimate = false;
  //     viewer.scene.screenSpaceCameraController.enableInputs = true;
  //   }
  // }

  function addModel(
    url: string,
    longitude: number,
    latitude: number,
    height: number
  ) {
    var modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(
      Cesium.Cartesian3.fromDegrees(longitude, latitude, height)
    );
    viewer.scene.primitives.add(
      Cesium.Model.fromGltf({
        //Gltf和glb模型都用fromGltf
        url: url,
        modelMatrix: modelMatrix,
        minimumPixelSize: 64,
        maximumScale: 20000,
        scale: 0.05,
      })
    );
  }
});
</script>

<style scoped>
html,
body,
#cesiumContainer {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1;

  .loading {
    @include Width(50);
    @include hHeight(50);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    @include FontSize(40);
    font-weight: 600;

    :deep(.el-loading-mask) {
      background: rgba(0, 0, 0, 0) !important;

      .circular {
        @include Width(50);
        @include hHeight(50);

        .path {
          stroke: rgb(32, 158, 216);
        }
      }
    }
  }
}
button {
  font-family: "Roboto", "-apple-system", "Helvetica Neue", Helvetica, Arial,
    sans-serif;
  background-color: white;
  color: #1f879c;
  border-color: #1f879c;
  border-radius: 3px;
  padding: 4px 8px;
  margin: 10px 0px 0px 10px;
  z-index: 999;
  position: fixed;
  cursor: pointer;
}
button.stopped:after {
  content: "\25B6\0020 Fly Through";
}
button.playing {
  background-color: #1f879c;
  color: white;
}
button.playing:after {
  content: "\25FC\0020 Fly Through";
}
</style>
