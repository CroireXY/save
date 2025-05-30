<!--
 * @Author: Sun ruiqi
 * @Date: 2025-05-15 17:00:08
 * @LastEditors: viola
 * @LastEditTime: 2025-05-30 16:46:05
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
import { onMounted, watch, watchEffect } from "vue";
import { useMapStore } from "@/stores/map";
import axios from "axios";
const mapStore = useMapStore();

// 设置cesium的静态资源路径
window.CESIUM_BASE_URL = "/cesium";
let inter = null;
onMounted(() => {
  watch(
    [
      () => mapStore.Drone2DShow,
      () => mapStore.Drone3DShow,
      () => mapStore.FlightPathShow,
      () => mapStore.CurrentMode,
    ],
    ([new2D, new3D, newPath, newMode], [old2D, old3D, oldPath, oldMode]) => {
      if (new2D !== old2D) onDrone2DShowChanged(new2D);
      if (new3D !== old3D) onDrone3DShowChanged(new3D);
      if (newPath !== oldPath) onFlightPathShowChanged(newPath);
      if (newMode !== oldMode) {
        if (newMode === "2D") {
          viewer.scene.morphTo2D(0);
        } else if (newMode === "3D") {
          viewer.scene.morphTo3D(0);
        } else if (newMode === "Columbus") {
          viewer.scene.morphToColumbusView(0);
        }
      }
    }
  );
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
  viewer.scene.screenSpaceCameraController.enableCollisionDetection = true; //不允许去地下

  viewer.scene.screenSpaceCameraController.enableZoom = false;
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
    let tileset = new Cesium.Cesium3DTileset({
      url: "https://data.map.gov.hk/api/3d-data/3dtiles/f2/tileset.json?key=3967f8f365694e0798af3e7678509421",
    });
    await tileset.readyPromise;
    viewer.scene.primitives.add(tileset);
  };
  addLayer();

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

  

  // Declare droneEntity in a higher scope so it can be accessed in both branches
  let droneEntity: Cesium.Entity[] = [];
  let drone3dEntity: Cesium.Primitive | undefined;

  async function onDrone2DShowChanged(val: boolean) {
    if (val) {
      try {
        const { data } = await axios.get(
          "http://124.243.191.31/fsp/api/getFlightRecords?stime=20250401000000&etime=20250530235959",
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsc2NtIiwiYWRtaW5JZCI6MiwiaWF0IjoxNzQ4NDk5MzQ0LCJleHAiOjE3NDg1NDI1NDR9.R7yc3nSwGOMyVgYJ3fNbqoohm-PD6tMUQ4P-NtcKckI",
            },
          }
        );

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

  function onFlightPathShowChanged(val: boolean) {
    if (val) {
      let flightData = [
        [114.12918853370209, 22.260153696529716, 30],
        [114.12904924062073, 22.260207408533567, 32],
        [114.1287706545875, 22.26023963376461, 40],
        [114.12857100262859, 22.26009997721904, 50],
        [114.12833420653861, 22.259900160819686, 70],
        [114.12817167973085, 22.25977935382772, 100],
        [114.12780725065208, 22.25958184421282, 100],
        [114.12791559170181, 22.259399549981563, 50],
        [114.12804035462904, 22.25917470399307, 45],
        [114.12779083634175, 22.259044044395747, 40],
        [114.12763847183552, 22.259177242251944, 35],
        [114.12749791868961, 22.258942368592717, 25],
        [114.12725585077793, 22.258801440449528, 15],
        [114.12705673020025, 22.258693033367265, 5],
      ];
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
      const positionProperty = new Cesium.SampledPositionProperty();

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

        points[i] = viewer.entities.add({
          description: `Location: (${dataPoint[0]}, ${dataPoint[1]}, ${dataPoint[2]})`,
          position: position,
          point: { pixelSize: 10, color: Cesium.Color.BLUE },
        });
      }

      // STEP 4 CODE (green circle entity)
      const airplaneEntity = viewer.entities.add({
        availability: new Cesium.TimeIntervalCollection([
          new Cesium.TimeInterval({ start: start, stop: stop }),
        ]),
        position: positionProperty,
        path: new Cesium.PathGraphics({ width: 3 }),
        model: {
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
            1500
          ),
          show: true,
        },
      });
    } else {
      points.forEach((entity) => viewer.entities.remove(entity));
      points = [];
    }
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
