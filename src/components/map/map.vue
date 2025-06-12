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
import { onMounted, watch, watchEffect, ref } from "vue";
import { useMapStore } from "@/stores/map";
import axios from "axios";
import { fetchWithAuth } from "@/utils/auth";
// import eventBus from "@/utils/eventBus";
let viewer: Cesium.Viewer; // 在 setup 外部函数也能访问
const mapStore = useMapStore();
// 设置cesium的静态资源路径
window.CESIUM_BASE_URL = "/cesium";
let inter = null;
const basemapProvider = new Cesium.UrlTemplateImageryProvider({
  url: "https://mapapi.geodata.gov.hk/gs/api/v1.0.0/xyz/imagery/WGS84/{z}/{x}/{y}.png",
  credit: "© Map from Lands Department",

  maximumLevel: 19,
  minimumLevel: 0,
  hasAlphaChannel: true,
});
const urls = [
  "http://localhost:9000/11-SW-16B/tileset.json",
  "http://localhost:9000/11-SW-16D/tileset.json",
  "http://localhost:9000/11-SW-17A/tileset.json",
  "http://localhost:9000/11-SW-17C/tileset.json",
  "http://localhost:9000/11-SW-21B/tileset.json",
  "http://localhost:9000/11-SW-22A/tileset.json",
  // '/map/area2/tileset.json',
  // '/map_data/area3/tileset.json'
];

onMounted(() => {
  // eventBus.on("drawFlightPath", onFlightPathShowChanged);

  Cesium.Ion.defaultAccessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxMTZmYTNlZi02NzU2LTQ3MTYtYWUwYS03NWRmNzllZTk5YWUiLCJpZCI6MzAzMDI1LCJpYXQiOjE3NDczODg0NTN9.paeLe2jzSEv9-YXWxw-m9hNcJHoTNQJrSZKZDkLXYF0";
  viewer = new Cesium.Viewer("cesiumContainer", {
    // baseLayer: new Cesium.ImageryLayer(basemapProvider),
    // 图层
    imageryProvider: basemapProvider, //当baseLayerPicker为false时，imageryProvider和terrainProvider才有效
    baseLayerPicker: false, // 底层图层控件显隐(默认true)
    timeline: false, //下侧时间轴（默认true）
    animation: false, //左下角动画部件按钮（默认true）
    vrButton: false, // VR按钮（默认false）
    fullscreenButton: false, // 全屏按钮（默认true）
    homeButton: false, // 视角复位按钮（默认true）
    navigationHelpButton: false, //帮助按钮 (默认true)
    geocoder: false, // 地理编码器（搜索框）(默认true)
    sceneModePicker: false, //二三维切换按钮(默认true)
    shouldAnimate: false, // 自动播放动画(默认false)
    infoBox: false, // 信息框（默认true）
    // 参数
    scene3DOnly: false, // 只显示3D场景（默认false）
    showRenderLoopErrors: false, // 是否显示渲染循环错误（默认false）
    requestRenderMode: true,
    creditContainer: "credit",
  });
  // mapStore.drawFlightPath = () => {

  //   onFlightPathShowChanged(true);
  // };

  // mapStore.closeFlightPath = () => {
  //   onFlightPathShowChanged(false);
  // };
  watch(
    [
      () => mapStore.Drone2DShow,
      () => mapStore.Drone3DShow,
      () => mapStore.FlightPathShow,
      () => mapStore.CurrentMode,
    ],

    // 监听mapStore的属性变化
    ([new2D, new3D, newPath, newMode], [old2D, old3D, oldPath, oldMode]) => {
      if (new2D !== old2D) onDrone2DShowChanged(new2D);
      if (new3D !== old3D) onDrone3DShowChanged(new3D);
      // if (newPath !== oldPath) onFlightPathShowChanged(newPath);
      if (newMode !== oldMode) {
        if (newMode === "2D") {
          viewer.scene.morphTo2D(0);
        } else if (newMode === "3D") {
          viewer.scene.morphTo3D(0);
        } else if (newMode === "Columbus") {
          viewer.scene.morphToColumbusView(0);
        }
      }
      if (newPath !== oldPath) {
        onFlightPathShowChanged(newPath);
      }
    }
  );

  // urls.forEach((url) => {
  //   const tileset = new Cesium.Cesium3DTileset({ url, projectTo2D: true });
  //   viewer.scene.primitives.add(tileset);

  //   tileset.readyPromise.then(() => {
  //     console.log("Loaded tileset:", url);
  //     const boundingSphere = tileset.boundingSphere;
  //     const radius = boundingSphere.radius;

  //     // 设置最小缩放距离为模型半径的一部分，避免穿模
  //     viewer.scene.screenSpaceCameraController.minimumZoomDistance =
  //       radius * 0.05;
  //     // 如果你只加载一个，也可以用 viewer.zoomTo(tileset)
  //   });
  // });
  addLayer();
  // viewer.scene.screenSpaceCameraController.minimumZoomDistance = 10;
  viewer.scene.screenSpaceCameraController.enableCollisionDetection = true; //不允许去地下
  viewer.camera.flyTo({
    // lng, lat, alt
    destination: Cesium.Cartesian3.fromDegrees(114.130165, 22.260256, 1300),
    // orientation: {
    //   heading: 6.280194717481077,
    //   pitch: -0.7921019105734031,
    //   roll: 6.283182074536001,
    // },
    duration: 3,
  });

  viewer.scene.globe.depthTestAgainstTerrain = false;

  // onDrone2DShowChanged(mapStore.Drone2DShow);
  // onDrone3DShowChanged(mapStore.Drone3DShow);
  // onFlightPathShowChanged(mapStore.FlightPathShow);
});

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

// 添加Cesium3DTileset图层
async function addLayer() {
  let tileset = new Cesium.Cesium3DTileset({
    // url:'/map_data/tileset.json',

    url: "https://data.map.gov.hk/api/3d-data/3dtiles/f2/tileset.json?key=3967f8f365694e0798af3e7678509421",
  });
  await tileset.readyPromise;
  const boundingSphere = tileset.boundingSphere;
  const radius = boundingSphere.radius;

  // 设置最小缩放距离为模型半径的一部分，避免穿模
  // if (viewer.value) {
  // viewer.scene.screenSpaceCameraController.minimumZoomDistance = radius * 0.5;
  viewer.scene.primitives.add(tileset);
  // }
}

async function onDrone2DShowChanged(val: boolean) {
  let droneEntity: Cesium.Entity[] = [];
  if (val) {
    try {
      // const { data } = await axios.get(
      //   "http://lae.lscm.hk/fsp/api/getFlightRecords?stime=20250401000000&etime=20250530235959",
      //   {
      //     headers: {
      //       Authorization:
      //         "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsc2NtIiwiYWRtaW5JZCI6MSwiaWF0IjoxNzQ5MTM2MTA1LCJleHAiOjE3NDkxNzkzMDV9.41TDAoEODVBnaQjY-LRPCB-lpZQsEijtJufPHPNovDg",
      //     },
      //   }
      // );
      const res = await fetchWithAuth(
        "http://lae.lscm.hk/fsp/api/getFlightRecords?stime=20250401000000&etime=20250530235959"
      );
      const data = await res.data;

      if (data.responseCode !== 200 || !Array.isArray(data.body)) {
        console.error("接口数据异常");
        return;
      }

      // 将接口数据转换为 GeoJSON
      const geoJsonData = {
        type: "FeatureCollection",
        features: data.body.map((record: any) => ({
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [
              record.longitude / 1e7, // 经度除以 10^7
              record.latitude / 1e7, // 纬度除以 10^7
            ],
          },
          properties: {
            id: record.recordId,
            name: record.drone.serialNumber,
          },
        })),
      };
      geoJsonData.features.forEach((feature: any, index: number) => {
        const [lng, lat] = feature.geometry.coordinates;
        const id = feature.properties.id;
        const name = feature.properties.name;

        droneEntity[index] = viewer.entities.add({
          id, // 推荐用唯一id
          position: Cesium.Cartesian3.fromDegrees(lng, lat, 50), // 50为高度，可按需调整
          billboard: {
            image: "/3d_icon/dronepoint_red.png",
            width: 50,
            height: 50,
            scale: 0.8,
            verticalOrigin: Cesium.VerticalOrigin.CENTER,
            horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
            pixelOffset: new Cesium.Cartesian2(10, 0),
            show: true,
          },
          label: {
            text: name,
            font: "14px sans-serif",
            fillColor: Cesium.Color.WHITE,
            pixelOffset: new Cesium.Cartesian2(0, -30),
            show: true,
          },
        });
      });
    } catch (error) {
      console.error("获取数据失败:", error);
      return;
    }
  } else {
    // 移除所有无人机实体
    droneEntity.forEach((entity) => viewer.entities.remove(entity));
    droneEntity = [];
  }
}

// Declare droneEntity in a higher scope so it can be accessed in both branches
let drone3dEntity: Cesium.Primitive | undefined;

function onDrone3DShowChanged(val: boolean) {
  if (val) {
    var modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(
      Cesium.Cartesian3.fromDegrees(114.130165, 22.260256, 100)
    );

    drone3dEntity = viewer.scene.primitives.add(
      Cesium.Model.fromGltf({
        //Gltf和glb模型都用fromGltf
        url: "/3d_icon/drones.glb",
        modelMatrix: modelMatrix,
        minimumPixelSize: 64,
        maximumScale: 20000,
        scale: 0.05,
      })
    );
    // addModel("/3d_icon/drones.glb", 114.130165, 22.260256, 100);
  } else {
    viewer.scene.primitives.remove(drone3dEntity);
  }
}

let points: Cesium.Entity[] = [];
let airplaneEntity: Cesium.Entity | undefined;
let passedPathEntity: Cesium.Entity | undefined;
let futurePathEntity: Cesium.Entity | undefined;
async function onFlightPathShowChanged(value: boolean) {
  if (value) {
    mapStore.setFlightPathShow(true);
    try {
      // const { data } = await axios.get(
      //   "http://lae.lscm.hk/fsp/api/getFlightRecordInDetails?stime=20250401000000&etime=20250530235959&recordId=1",
      //   {
      //     headers: {
      //       Authorization:
      //         "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsc2NtIiwiYWRtaW5JZCI6MSwiaWF0IjoxNzQ5MTM2MTA1LCJleHAiOjE3NDkxNzkzMDV9.41TDAoEODVBnaQjY-LRPCB-lpZQsEijtJufPHPNovDg",
      //     },
      //   }
      // );
      // const res = await fetchWithAuth( "http://lae.lscm.hk/fsp/api/getFlightRecordInDetails?stime=20250401000000&etime=20250530235959&recordId=1");
      const res = await fetchWithAuth('http://lae.lscm.hk/fsp/api/getFlightRecordInDetails?stime=20250510000000&etime=20250610235959&recordId=1');//一条往返数据
               
      const data = await res.data;
      if (data.responseCode !== 200 || !Array.isArray(data.body)) {
        console.error("接口数据异常");
        return;
      }
      const rawData = data.body;

      let filtered = [];
      let lastTime = null;
      let lastPoint = null;

      for (const item of rawData) {
        const p = toDegrees(item);
        if (!p.lon || !p.lat || p.alt === undefined) continue;

        // filter: 重复点（经纬高相同）
        if (
          lastPoint &&
          lastPoint.lon === p.lon &&
          lastPoint.lat === p.lat &&
          lastPoint.alt === p.alt
        )
          continue;

        // filter: 时间间隔（≥0.5s）点位
        if (lastTime) {
          const t1 = new Date(
            `${p.timeStamp.slice(0, 4)}-${p.timeStamp.slice(
              4,
              6
            )}-${p.timeStamp.slice(6, 8)}T${p.timeStamp.slice(
              8,
              10
            )}:${p.timeStamp.slice(10, 12)}:${p.timeStamp.slice(12, 14)}`
          );
          const t0 = new Date(
            `${lastTime.slice(0, 4)}-${lastTime.slice(4, 6)}-${lastTime.slice(
              6,
              8
            )}T${lastTime.slice(8, 10)}:${lastTime.slice(
              10,
              12
            )}:${lastTime.slice(12, 14)}`
          );
          const dt = (t1.getTime() - t0.getTime()) / 1000;
          if (dt < 0) continue; //关闭Filter: 时间间隔
          // if (dt < 0.5) continue; //开启filter: 时间间隔（≥0.5s）点位
        }

        // filter: 相邻距离小于2m点位
        if (lastPoint && calcDistance(lastPoint, p) < 2) continue;

        filtered.push(p);
        lastPoint = p;
        lastTime = p.timeStamp;
      }

      const flightData = filtered.map((p) => [p.lon, p.lat, p.alt]);

      const timeStepInSeconds = 60;
      const totalSeconds = timeStepInSeconds * (flightData.length - 1);
      const start = Cesium.JulianDate.fromIso8601("2020-03-09T23:10:00Z");
      const stop = Cesium.JulianDate.addSeconds(
        start,
        totalSeconds,
        new Cesium.JulianDate()
      );
      viewer.clock.startTime = start.clone();
      viewer.clock.stopTime = stop.clone();
      viewer.clock.currentTime = start.clone();
      viewer.clock.multiplier = 50;
      viewer.clock.shouldAnimate = true;
      const positionProperty = new Cesium.SampledPositionProperty(); // 创建动态位置属性，表示飞机在时间轴上的位置变化，用于动态飞行轨迹、播放飞行动画

      for (let i = 0; i < flightData.length; i++) {
        const dataPoint = flightData[i];
        const time = Cesium.JulianDate.addSeconds(
          start,
          i * timeStepInSeconds,
          new Cesium.JulianDate()
        );
        const position = Cesium.Cartesian3.fromDegrees(
          dataPoint[0],
          dataPoint[1],
          dataPoint[2]
        );
        positionProperty.addSample(time, position);

        // points[i] = viewer.entities.add({
        //   description: `Location: (${dataPoint[0]}, ${dataPoint[1]}, ${dataPoint[2]})`,
        //   position: position,
        //   point: { pixelSize: 10, color: Cesium.Color.BLUE },
        // });
      }
      // 实线轨迹（已经飞过的部分）
      passedPathEntity = viewer.entities.add({
        availability: new Cesium.TimeIntervalCollection([
          new Cesium.TimeInterval({ start: start, stop: stop }),
        ]), // 实体存在的时间范围：start--stop时间段可见
        position: positionProperty,
        path: new Cesium.PathGraphics({
          leadTime: 0, // 未来时间 = 0，即不绘制未来路径
          trailTime: 999999, // 尽可能长，表示过去轨迹都显示
          width: 2,
          material: Cesium.Color.fromCssColorString("#00F0FF"), // 实线颜色
        }),
      });
      
      // 虚线轨迹（尚未飞过的部分）
      futurePathEntity = viewer.entities.add({
        availability: new Cesium.TimeIntervalCollection([
          new Cesium.TimeInterval({ start: start, stop: stop }),
        ]), // 实体存在的时间范围：start--stop时间段可见
        position: positionProperty,
        path: new Cesium.PathGraphics({
          leadTime: 999999, // 未来轨迹全部显示
          trailTime: 0, // 不显示过去轨迹
          width: 1,
          material: new Cesium.PolylineDashMaterialProperty({
            // 使用虚线材质
            dashLength: 16, // 虚线长度
            color: Cesium.Color.fromCssColorString("#E0E0E099"),
          }),
        }),
      });

      // STEP 4 CODE (green circle entity)
      airplaneEntity = viewer.entities.add({
        availability: new Cesium.TimeIntervalCollection([
          new Cesium.TimeInterval({ start: start, stop: stop }),
        ]), // 实体存在的时间范围：start--stop时间段可见
        position: positionProperty, // 动态位置属性
        // path: new Cesium.PathGraphics({ width: 3 }), // 轨迹线样式，绘制出该实体的“飞行轨迹”
        model: {
          // 3d模型
          uri: "/3d_icon/drones.glb",
          minimumPixelSize: 64,
          color: Cesium.Color.WHITE.withAlpha(1),
          maximumScale: 20000, // 模型的最大比例大小
          silhouetteColor: Cesium.Color.BLACK, // 设置模型轮廓（边框）颜色
          silhouetteSize: 2, // 设置模型轮廓（边框）大小
          runAnimations: true, // 是否执行模型动画
          scale: 1.0, // 应用于图像的统一比例。比例大于会1.0放大标签，而比例小于会1.0缩小标签。

          distanceDisplayCondition: new Cesium.DistanceDisplayCondition( // 显示在距相机的距离处的属性，多少区间内是可以显示的
            0,
            3000
          ),
          show: true,
        },
      });

      // 添加事件监听器，监听时间变化
      function tickHandler(clock: Cesium.Clock) {
        const currentTime = Cesium.JulianDate.toDate(clock.currentTime);
        const stopTime = Cesium.JulianDate.toDate(clock.stopTime);

        if (currentTime >= stopTime) {
          // 时间到达或超过了 end
          mapStore.setFlightPathShow(false);

          // 只触发一次后移除监听（可选）
          viewer.clock.onTick.removeEventListener(tickHandler);
        }
      }
      viewer.clock.onTick.addEventListener(tickHandler);
    } catch (error) {
      console.error("获取数据失败:", error);
      return;
    }
  } else {
    // points.forEach((entity) => viewer.entities.remove(entity));
    // points = [];
    mapStore.setFlightPathShow(false);
    if (airplaneEntity) viewer.entities.remove(airplaneEntity);
    if (passedPathEntity) viewer.entities.remove(passedPathEntity);
    if (futurePathEntity) viewer.entities.remove(futurePathEntity);
  }
}

function toDegrees(item: any) {
  return {
    lon: item.longitude / 1e7,
    lat: item.latitude / 1e7,
    alt: item.altitude / 10,
    timeStamp: item.timeStamp,
  };
}

function calcDistance(p1: any, p2: any) {
  const R = 6371000;
  const dLat = ((p2.lat - p1.lat) * Math.PI) / 180;
  const dLon = ((p2.lon - p1.lon) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((p1.lat * Math.PI) / 180) *
      Math.cos((p2.lat * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const horizontalDist = R * c;
  const verticalDist = Math.abs(p2.alt - p1.alt);
  return Math.sqrt(horizontalDist ** 2 + verticalDist ** 2);
}
</script>

<style lang="scss" scoped>
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
