<!-- 加载视频流组件 -->
<template>
    <div>
       <div id="cesiumContainer"></div>

        <div id="credit" style="display:none"></div>
   
    </div>
</template>

<script lang="ts" setup>
import * as Cesium from 'cesium';
import '../../Widgets/widgets.css'
import { onMounted } from 'vue';
// 设置cesium的静态资源路径
window.CESIUM_BASE_URL = '/cesium'
onMounted(()=>{
const basemapProvider = new Cesium.UrlTemplateImageryProvider({
  url: 'https://mapapi.geodata.gov.hk/gs/api/v1.0.0/xyz/imagery/WGS84/{z}/{x}/{y}.png',
  credit: "© Map from Lands Department"
});
Cesium.Ion.defaultAccessToken='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxMTZmYTNlZi02NzU2LTQ3MTYtYWUwYS03NWRmNzllZTk5YWUiLCJpZCI6MzAzMDI1LCJpYXQiOjE3NDczODg0NTN9.paeLe2jzSEv9-YXWxw-m9hNcJHoTNQJrSZKZDkLXYF0';
const viewer = new Cesium.Viewer('cesiumContainer', {
  baseLayer: new Cesium.ImageryLayer(basemapProvider),
  baseLayerPicker: false,
  timeline: false,
  animation: false,
  vrButton: false,
  fullscreenButton: false,
  homeButton: false,
  navigationHelpButton: false,
  geocoder: false,
  sceneModePicker: false,
  requestRenderMode: true,
  creditContainer: "credit",
});

const addLayer = async() =>{
  let tileset = await Cesium.Cesium3DTileset.fromUrl(
    'https://data.map.gov.hk/api/3d-data/3dtiles/f2/tileset.json?key=3967f8f365694e0798af3e7678509421'
  );
  viewer.scene.primitives.add(tileset);
}

addLayer();

viewer.camera.flyTo({
  destination: Cesium.Cartesian3.fromDegrees(
    // 纬度
    114.130451,
    // 经度
    22.261095,
    // 高度
   500
  ),
  orientation: {
    heading: 6.280194717481077,
    pitch: -0.7921019105734031,
    roll: 6.283182074536001,
  },
  duration: 0,
});

function flyThrough() {
  const currentState = 'stopped' === document.getElementById("fly").className ? 'playing' : 'stopped';
  document.getElementById("fly").className = currentState;
  viewer.scene.screenSpaceCameraController.enableInputs = false;
  if('playing' === currentState) {
    viewer.camera.flyTo({
      destination: {
        x: -2422424.2445589276,
        y: 5384032.397876303,
        z: 2405707.0615597237
      },
      orientation: {
        heading: 5.6200000366324705,
        pitch: -0.32032049944881735,
        roll: 6.283175543034232
      },
      complete: function() {
        const distance = Cesium.Cartesian3.distance(
          new Cesium.Cartesian3.fromDegrees(114.214374, 22.315202),
          new Cesium.Cartesian3.fromDegrees(114.22428750237164, 22.304629162175697)
        );
        const startTime = Cesium.JulianDate.fromDate(new Date());
        const stopTime = Cesium.JulianDate.addSeconds(
          startTime,
          distance,
          new Cesium.JulianDate()
        );
        const property = new Cesium.SampledPositionProperty();
        let time = Cesium.JulianDate.addSeconds(
          startTime,
          0,
          new Cesium.JulianDate()
        );
        let position = Cesium.Cartesian3.fromDegrees(
          114.22428750237164,
          22.304629162175697,
          132.02238802935133
        );
        property.addSample(time, position);
        time = Cesium.JulianDate.addSeconds(
          startTime,
          distance,
          new Cesium.JulianDate()
        );
        position = Cesium.Cartesian3.fromDegrees(
          114.214374,
          22.315202,
          132.02238802935133
        );
        property.addSample(time, position);
        let entity = {
          availability: new Cesium.TimeIntervalCollection([
            new Cesium.TimeInterval({
              start: startTime,
              stop: stopTime,
            }),
          ]),
          position: property,
        };
        entity.position.setInterpolationOptions({
          interpolationDegree: 2,
          interpolationAlgorithm: Cesium.HermitePolynomialApproximation,
        });

        viewer.clock.startTime = startTime.clone();
        viewer.clock.stopTime = stopTime.clone();
        viewer.clock.currentTime = startTime.clone();
        viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP;
        viewer.clock.multiplier = 50;
        viewer.clock.shouldAnimate = true;
        viewer.camera.position = new Cesium.Cartesian3(0.25, 0, 5);
        viewer.camera.direction = new Cesium.Cartesian3(-1.25, 1.6, -0.6725);
        viewer.camera.up = new Cesium.Cartesian3(0.0, 0.0, 1.0);
        viewer.camera.right = new Cesium.Cartesian3(0.0, -1.0, 0.0);

        viewer.scene.postUpdate.addEventListener(function (scene, time) {
          if(viewer.clock.shouldAnimate) {
            viewer.scene.screenSpaceCameraController.enableInputs = false;
            const position = entity.position.getValue(time);
            if (!Cesium.defined(position)) {
              return;
            }
            let transform;
            if (!Cesium.defined(entity.orientation)) {
              transform = Cesium.Transforms.eastNorthUpToFixedFrame(position);
            }
            const offset = Cesium.Cartesian3.clone(viewer.camera.position);
            const direction = Cesium.Cartesian3.clone(viewer.camera.direction);
            const up = Cesium.Cartesian3.clone(viewer.camera.up);
            viewer.camera.lookAtTransform(transform);
            Cesium.Cartesian3.clone(offset, viewer.camera.position);
            Cesium.Cartesian3.clone(direction, viewer.camera.direction);
            Cesium.Cartesian3.clone(up, viewer.camera.up);
            Cesium.Cartesian3.cross(direction, up, viewer.camera.right);
          } else {
            viewer.scene.postUpdate._listeners.pop();
            viewer.entities.remove(entity);
            viewer.clock.clockRange = 0;
            viewer.clock.multiplier = 1;
            viewer.clock.currentTime = Cesium.JulianDate.fromDate(new Date());
            viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
            viewer.camera.flyTo({
              destination: Cesium.Cartesian3.fromDegrees(
                114.21918297929119,
                22.237495624660887,
                4999.9999999995025
              ),
              orientation: {
                heading: 6.283185307179586,
                pitch: -0.5251224807670001,
                roll: 6.283185307179585,
              }
            });
          }
        })
      }
    })
  } else {
    viewer.clock.shouldAnimate = false;
    viewer.scene.screenSpaceCameraController.enableInputs = true;
  }
}
})
</script>

<style  scoped>

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
  font-family: "Roboto", "-apple-system", "Helvetica Neue", Helvetica, Arial, sans-serif;
  background-color: white;
  color: #1F879C;
  border-color: #1F879C;
  border-radius: 3px;
  padding: 4px 8px;
  margin: 10px 0px 0px 10px;
  z-index: 999;
  position: fixed;
  cursor: pointer;
}
button.stopped:after
{
  content: '\25B6\0020 Fly Through';
}
button.playing
{
  background-color: #1F879C;
  color: white;
}
button.playing:after
{
  content: '\25FC\0020 Fly Through';
}
          
</style>
