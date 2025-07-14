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
import { fetchWithAuth } from "@/utils/auth";
import { getFlightRecordInDetails } from "@/api/connect";
import websocketServer from "@/tools/websocket";
import droneIcon from "@/assets/icons/icons_OnMap/Drone.png"; // 替换为实际的无人机图标路径
// import eventBus from "@/utils/eventBus";
let viewer: Cesium.Viewer; // 在 setup 外部函数也能访问
const mapStore = useMapStore();
// 设置cesium的静态资源路径
window.CESIUM_BASE_URL = "/cesium";
const basemapProvider = new Cesium.UrlTemplateImageryProvider({
  url: "https://mapapi.geodata.gov.hk/gs/api/v1.0.0/xyz/imagery/WGS84/{z}/{x}/{y}.png",
  credit: "©️ Map from Lands Department",

  maximumLevel: 19,
  minimumLevel: 0,
  hasAlphaChannel: true,
});
let skyBox = new Cesium.SkyBox({
  sources: {
    positiveX: "/skybox/box2/px.png",
    negativeX: "/skybox/box2/nx.png",
    positiveY: "/skybox/box2/pz.png",
    negativeY: "/skybox/box2/nz.png",
    positiveZ: "/skybox/box2/py.png",
    negativeZ: "/skybox/box2/ny.png",
  },
});
const urls = [
  "/map_data/tileset.json",
  // "http://localhost:9000/11-SW-16B/tileset.json",
  // "http://localhost:9000/11-SW-16D/tileset.json",
  // "http://localhost:9000/11-SW-17A/tileset.json",
  // "http://localhost:9000/11-SW-17C/tileset.json",
  // "http://localhost:9000/11-SW-21B/tileset.json",
  // "http://localhost:9000/11-SW-22A/tileset.json",
  // '/map/area2/tileset.json',
  // '/map_data/area3/tileset.json'
];
const ws = new websocketServer("ws://lae.lscm.hk/fsp/websocketConnection");

onMounted(() => {
  // eventBus.on("drawFlightPath", onFlightPathShowChanged);
  // ws.connect(2);
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
    skyBox: skyBox,
    skyAtmosphere: false,
  });

  // viewer.scene.globe.enableLighting = true;
  // viewer.scene.light = new Cesium.DirectionalLight({
  //   direction: new Cesium.Cartesian3(0.354925, -1.1290918, -0.383358),
  // });
  // viewer.scene.light.color = new Cesium.Color(0.8, 0.8, 0.8, 1.0);
  // viewer.scene.light.intensity = 2.8;
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
      // if (new3D !== old3D) onDrone3DShowChanged(new3D);
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
  const socket = new WebSocket("ws://lae.lscm.hk/fsp/websocketConnection");

  socket.onopen = function () {
    console.log("✅ WebSocket connected");
    // 发送注册消息
    socket.send(
      JSON.stringify({
        userId: 2,
        clientMessageCode: "REGISTER_CONNECTION",
      })
    );
  };

  socket.onmessage = function (event) {
    console.log("📩 Received:", event.data);
    const data = JSON.parse(event.data);
    if (data.serverMessageCode === "FLIGHT_DATA") {
      // 处理飞行记录数据
      const flightRecord = data.body;
      console.log("Flight Record:", flightRecord);
      
      // 确保数据有效
      if (flightRecord && flightRecord.longitude && flightRecord.latitude && flightRecord.altitude) {
        onDrone3DShowChanged(
          true,
          flightRecord.longitude / 1e7,
          flightRecord.latitude / 1e7,
          flightRecord.altitude / 10,
          flightRecord.sn || "drone_" + Date.now() // 使用无人机序列号作为ID，如果没有则生成一个
        );
      } else {
        console.warn("Invalid flight record data:", flightRecord);
      }
    } else if (data.clientMessageCode === "DRONE_POSITION") {
      // 处理无人机位置数据
      const dronePosition = data.body;
      console.log("Drone Position:", dronePosition);
      // 这里可以调用onDrone2DShowChanged来处理无人机位置显示
    }
  };

  socket.onerror = function (error) {
    console.error("❌ WebSocket error:", error);
  };

  socket.onclose = function () {
    console.log("🔌 WebSocket closed");
  };

  // urls.forEach((url) => {
  //   const tileset = new Cesium.Cesium3DTileset({ url, projectTo2D: true });
  //   viewer.scene.primitives.add(tileset);

  //   tileset.readyPromise.then(() => {
  //     console.log("Loaded tileset:", url);
  //     const boundingSphere = tileset.boundingSphere;
  //     const radius = boundingSphere.radius;

  //     const z = tileset.boundingSphere.center.z;
  //     //  tileset.shadows = Cesium.ShadowMode.ENABLED;

  //     // 设置最小缩放距离为模型半径的一部分，避免穿模
  //     viewer.scene.screenSpaceCameraController.minimumZoomDistance =
  //       radius * 0.05;

  //   });
  // });

  addLayer();

  // 设置阴影
  // viewer.shadows = true;
  // viewer.scene.shadowMap.enabled = true;
  // viewer.scene.shadowMap.darkness = 0.4; // 阴影透明度
  // viewer.scene.shadowMap.size = 2048; // 阴影清晰度
  viewer.scene.screenSpaceCameraController.enableCollisionDetection = true; //不允许去地下
  var ambientOcclusion = viewer.scene.postProcessStages.ambientOcclusion;
  ambientOcclusion.enabled = true;
  ambientOcclusion.uniforms.ambientOcclusionOnly = false;
  ambientOcclusion.uniforms.intensity = 3;
  ambientOcclusion.uniforms.bias = 0.1;
  ambientOcclusion.uniforms.lengthCap = 0.03;
  ambientOcclusion.uniforms.stepSize = 1;
  ambientOcclusion.uniforms.blurStepSize = 0.86;

  viewer.scene.globe.enableLighting = true; // 开启全球光照
  // viewer.shadows = true;

  var fs =
    "uniform sampler2D colorTexture;\n" +
    "varying vec2 v_textureCoordinates;\n" +
    "uniform float scale;\n" +
    "uniform vec3 offset;\n" +
    "void main() {\n" +
    "    vec4 color = texture2D(colorTexture, v_textureCoordinates);\n" + //获取片段颜色
    "    gl_FragColor = vec4(color.rgb * scale + offset, 10.0);\n" +
    "}\n"; //放大片段颜色系数

  viewer.scene.postProcessStages.add(
    new Cesium.PostProcessStage({
      fragmentShader: fs,
      uniforms: {
        scale: 1.2,
        offset: function () {
          // return new Cesium.Cartesian3(0.1, 0.2, 0.3);
          return new Cesium.Cartesian3(0.01, 0.02, 0.03);
        },
      },
    })
  );

  viewer.camera.flyTo({
    // lng, lat, alt
    destination: Cesium.Cartesian3.fromDegrees(114.130165, 22.260256, 1300),
    orientation: {
      heading: Cesium.Math.toRadians(0), // 朝向角（东为0，逆时针）
      pitch: Cesium.Math.toRadians(-45), // 倾斜角：0是垂直向下，-90是水平
      roll: 0,
    },
    duration: 3,
  });
  const center = Cesium.Cartesian3.fromDegrees(114.130165, 22.260256, 1300); // 观察目标点（注意高度可以为 0）
  const heading = Cesium.Math.toRadians(0);
  const pitch = Cesium.Math.toRadians(-45);
  const range = 1300; // 距离目标点 1300 米
  // viewer.camera.lookAt(
  //   center,
  //   new Cesium.HeadingPitchRange(heading, pitch, range)
  // );
  viewer.camera.flyTo({
    destination: center,
    orientation: {
      heading: heading,
      pitch: pitch,
      roll: 0,
    },
    duration: 3, // 飞行时间
  });
  viewer.scene.logarithmicDepthBuffer = true;

  viewer.scene.globe.depthTestAgainstTerrain = false;
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
  let drone2DEntity: Cesium.Entity[] = [];
  console.log("onDrone2DShowChanged", val);
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
        "http://lae.lscm.hk/fsp/api/getFlightRecords?stime=20250613000000&etime=20250618235959"
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

        drone2DEntity[index] = viewer.entities.add({
          id, // 推荐用唯一id
          position: Cesium.Cartesian3.fromDegrees(lng, lat, 50), // 50为高度，可按需调整
          billboard: {
            image: droneIcon, // 替换为实际的无人机图标路径
            width: 50,
            height: 50,
            scale: 0.8,
            verticalOrigin: Cesium.VerticalOrigin.CENTER,
            horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
            pixelOffset: new Cesium.Cartesian2(10, 0),
            show: true,
          },
          label: {
            text: `DJI:${name}`,
            font: "14px sans-serif",
            fillColor: Cesium.Color.fromCssColorString("#4de1ff"),
            pixelOffset: new Cesium.Cartesian2(0, -35),
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
    await viewer.entities.removeAll();
    // drone2DEntity.forEach((entity) => viewer.entities.remove(entity));
    drone2DEntity = [];
  }
}
// Map to store each drone's history and path entity
const dronePaths = new Map<
  string,
  {
    positionProperty: Cesium.SampledPositionProperty;
    pathEntity: Cesium.Entity;
  }
>();

// Declare droneEntity in a higher scope so it can be accessed in b3doth branches
let drone3dEntity: Cesium.Primitive | undefined;
let drone: Cesium.Entity[] = [];

function onDrone3DShowChanged(
  val: boolean,
  lon: number,
  lat: number,
  alt: number,
  id: string
) {
  if (
    !Cesium.defined(lon) ||
    !Cesium.defined(lat) ||
    !Cesium.defined(alt) ||
    isNaN(lon) ||
    isNaN(lat) ||
    isNaN(alt)
  ) {
    console.warn("坐标无效：", { lon, lat, alt });
    return;
  }
  
  if (val) {
    const currentTime = Cesium.JulianDate.now();
    const position = Cesium.Cartesian3.fromDegrees(lon, lat, alt);
    
    // Check if the drone already has a path
    if (!dronePaths.has(id)) {
      // Create a new SampledPositionProperty for the drone
      const positionProperty = new Cesium.SampledPositionProperty();
      positionProperty.addSample(currentTime, position);

      // Create a new path entity for the drone
      const pathEntity = viewer.entities.add({
        position: positionProperty,
        path: new Cesium.PathGraphics({
          width: 3,
          trailTime: Number.POSITIVE_INFINITY, // Show the entire history
          material: Cesium.Color.fromCssColorString("#00F0FF"), // 实线颜色
          leadTime: 999999, 
        }),
      });

      // Store the positionProperty and pathEntity in the map
      dronePaths.set(id, { positionProperty, pathEntity });
      
      console.log(`Created new path for drone ${id}`);
    } else {
      // Update the existing drone's path
      const droneData = dronePaths.get(id);
      if (droneData) {
        droneData.positionProperty.addSample(currentTime, position);
        console.log(`Added sample to drone ${id} path:`, {
          time: currentTime,
          position: { lon, lat, alt },
        });
        
        // Force the path to rerender
        viewer.scene.requestRender();
        
        // Alternative methods if requestRender doesn't work:
        // Method 1: Force entity update
        // droneData.pathEntity.position = droneData.positionProperty;
        
        // Method 2: Trigger clock update
        // viewer.clock.tick();
        
        // Method 3: Force scene update
        // viewer.scene.globe.beginFrame(viewer.clock.currentTime);
      }
    }
    
    // Update or add the drone entity
    const entity = viewer.entities.getById(id);
    if (entity) {
      console.log("📡 [onDrone3DShowChanged] 接收到更新:", {
        val,
        lon,
        lat,
        alt,
        id,
      });
      
      const currentPos =
        entity.position?.getValue(Cesium.JulianDate.now()) ??
        Cesium.Cartesian3.fromDegrees(lon, lat, alt);
      const targetPos = Cesium.Cartesian3.fromDegrees(lon, lat, alt);
      try {
        moveEntitySmoothly(entity, currentPos, targetPos, 1800); // 1.8秒平滑移动
      } catch (e) {
        console.error("平滑移动失败:", e);
      }
    } else {
      const length = drone.length;
      drone[length] = viewer.entities.add({
        id: id || "drone3d", // 推荐用唯一id
        position: Cesium.Cartesian3.fromDegrees(lon, lat, alt),
        model: {
          uri: "/3d_icon/drone2.glb",
          scale: 0.05,
          color: Cesium.Color.fromCssColorString("#4de1ff"), // 颜色和透明度
          colorBlendMode: Cesium.ColorBlendMode.MIX, // 替代、混合、乘
          colorBlendAmount: 0.5, // 仅对 MIX 模式有效，0~1
          minimumPixelSize: 64,
          silhouetteColor: Cesium.Color.BLACK,
          silhouetteSize: 1,
          shadows: Cesium.ShadowMode.ENABLED,
          distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
            0,
            10000
          ), // 距离显示条件
          // scaleByDistance: new Cesium.NearFarScalar(1.0e2, 1, 1.0e3, 0.2),//随着距离改变标注尺寸
        },

        label: {
          text: `無人機${id.substring(0, 3)}`,
          // font: "14px ",
          // fillColor: Cesium.Color.AQUA,
          pixelOffset: new Cesium.Cartesian3(0, -35, 30),
          // show: true,
          font: "bold 20px Arial",
          fillColor: Cesium.Color.fromCssColorString("#4de1ff"),
          outlineColor: Cesium.Color.BLACK,
          outlineWidth: 0.3,
          style: Cesium.LabelStyle.FILL_AND_OUTLINE,
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
          heightReference: Cesium.HeightReference.NONE,
          scale: 0.8,

          disableDepthTestDistance: Number.POSITIVE_INFINITY, // 防止被遮挡
        },
      });
    }
  } else {
    // Remove drone and its path
    const droneData = dronePaths.get(id);
    if (droneData) {
      viewer.entities.remove(droneData.pathEntity);
      dronePaths.delete(id);
      console.log(`Removed path for drone ${id}`);
    }
    
    // Remove drone entity
    const entity = viewer.entities.getById(id);
    if (entity) {
      viewer.entities.remove(entity);
      console.log(`Removed drone entity ${id}`);
    }
    
    // Remove from drone array
    const droneIndex = drone.findIndex(d => d.id === id);
    if (droneIndex !== -1) {
      drone.splice(droneIndex, 1);
    }
  }
}

function moveEntitySmoothly(
  entity: Cesium.Entity,
  start: Cesium.Cartesian3,
  end: Cesium.Cartesian3,
  duration = 1000
) {
  const startTime = performance.now();

  function animate(currentTime: number) {
    const elapsed = currentTime - startTime;
    const t = Math.min(elapsed / duration, 1); // 0 到 1 之间
    // 插值计算
    const interpolated = Cesium.Cartesian3.lerp(
      start,
      end,
      t,
      new Cesium.Cartesian3()
    );
    entity.position = new Cesium.ConstantPositionProperty(interpolated);
    // 触发 Cesium 主动渲染
    viewer.scene.requestRender();
    if (t < 1) {
      requestAnimationFrame(animate);
    }
  }

  requestAnimationFrame(animate);
}

let points: Cesium.Entity[] = [];
let airplaneEntity: Cesium.Entity | undefined;
let passedPathEntity: Cesium.Entity | undefined;
let futurePathEntity: Cesium.Entity | undefined;
async function onFlightPathShowChanged(value: boolean) {
  if (value) {
    mapStore.setFlightPathShow(true);
    try {
      // const res = await fetchWithAuth(
      //   "http://lae.lscm.hk/fsp/api/getFlightRecordInDetails?stime=20250529143106&etime=20250529143511&recordId=2&offset=0"
      // ); //一条往返数据
      const res = await getFlightRecordInDetails({
        stime: "20250529143106",
        etime: "20250529143511",
        recordId: 2,
        offset: 0,
      });
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
      positionProperty.setInterpolationOptions({
        interpolationDegree: 5,
        interpolationAlgorithm: Cesium.HermitePolynomialApproximation,
      });
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
          width: 2,
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
        // model: {
        //   // 3d模型
        //   uri: "/3d_icon/drones.glb",
        //   minimumPixelSize: 64,
        //   color: Cesium.Color.WHITE.withAlpha(1),
        //   maximumScale: 20000, // 模型的最大比例大小
        //   silhouetteColor: Cesium.Color.BLACK, // 设置模型轮廓（边框）颜色
        //   silhouetteSize: 2, // 设置模型轮廓（边框）大小
        //   runAnimations: true, // 是否执行模型动画
        //   scale: 1.0, // 应用于图像的统一比例。比例大于会1.0放大标签，而比例小于会1.0缩小标签。
        //   distanceDisplayCondition: new Cesium.DistanceDisplayCondition( // 显示在距相机的距离处的属性，多少区间内是可以显示的
        //     0,
        //     3000
        //   ),
        //   show: true,
        // },

        model: {
          uri: "/3d_icon/drones.glb",
          scale: 1.5,
          color: Cesium.Color.fromCssColorString("#4de1ff"), // 颜色和透明度
          colorBlendMode: Cesium.ColorBlendMode.MIX, // 替代、混合、乘
          colorBlendAmount: 0.5, // 仅对 MIX 模式有效，0~1
          minimumPixelSize: 48,
          maximumScale: 20000, // 模型的最大比例大小

          silhouetteColor: Cesium.Color.BLACK,
          silhouetteSize: 4,
          // shadows: Cesium.ShadowMode.ENABLED,
          lightColor: Cesium.Color.GREY, // 模型光照颜色
        },
        label: {
          text: "無人機D001",
          // font: "14px ",
          // fillColor: Cesium.Color.AQUA,
          pixelOffset: new Cesium.Cartesian3(0, -35, 30),
          // show: true,
          font: "bold 20px Arial",
          fillColor: Cesium.Color.fromCssColorString("#4de1ff"),
          outlineColor: Cesium.Color.BLACK,
          outlineWidth: 0.3,
          style: Cesium.LabelStyle.FILL_AND_OUTLINE,
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
          heightReference: Cesium.HeightReference.NONE,
          scale: 0.8,
          disableDepthTestDistance: Number.POSITIVE_INFINITY, // 防止被遮挡
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
