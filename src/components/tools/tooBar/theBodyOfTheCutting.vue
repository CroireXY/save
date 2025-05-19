<template>
  <div class="control">
    <div class="top">
      <div>可视域分析</div>
    </div>
    <div class="params">
      <div class="title">参数</div>
      <div class="item">
        <div class="label">旋转</div>
        <div class="content">
          <div class="rotate-box">
            <div class="rotate-item">
              <span class="left">X</span>
              <input type="text" disabled placeholder="0.00">
            </div>
            <div class="rotate-item">
              <span class="left">Y</span>
              <input type="text" disabled placeholder="0.00">
            </div>
            <div class="rotate-item">
              <span class="left z">Z</span>
              <input type="text" :value="z" placeholder="0.00">
            </div>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="label">反转</div>
        <div class="content">
          <el-switch
              v-model="fz"
              class="ml-2"
              style="--el-switch-on-color: #1e7ccb; --el-switch-off-color: #000"
          />
        </div>
      </div>
      <div class="button-box">
        <button @click="start()">开始体剖切</button>
      </div>
      <div class="button-box">
        <button @click="finish()">完成</button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {onBeforeUnmount, ref} from 'vue'
import {useSectioning} from './sectioning'
import {useToolsStore} from "@/stores/tools";
// import { useMeasure } from './tooBar/measure'
// const { activeKey } = useMeasure()

const {sectioningKey} = useSectioning()
const useTools = useToolsStore()
const x = ref(0)
const y = ref(0)
const z = ref(0)
const fz = ref(false)

/**
 * 开始体迫切
 */
const start = async () => {

  /**
   * 开始体剖切
   * @param {array}   bbox  剖切范围包围盒
   * @param {number}  value 0：正向剖切，1：反向剖切
   * @param {boolean} isShowBBox 剖切时是否显示剖切范围的包围盒，默认值：false
   * @param {boolean} isEditable 剖切时是否可交互编辑，默认值：false
   * @param {array}   rotation bbox的欧拉角，[Pitch,Yaw,Roll]，设置包围盒的旋转
   * @param {function} fn 可选的回调函数，请参考[二次开发：异步接口调用方式]{@tutorial API_AsyncCall}
   */
  await __g.tools.stopVolumeClip()
  let bbox = useTools.currentMouseLeftClickPoint
  let value = fz.value ? 1 : 0
  let rotation = [0, 0, z.value]
  let bbox1 = [bbox[0] - 50, bbox[1] - 50, bbox[2] - 50]
  let bbox2 = [bbox[0] + 50, bbox[1] + 50, bbox[2] + 50]
  let Bbox = [...bbox1, ...bbox2]
  console.log(Bbox, value, rotation)
  __g.tools.startVolumeClip(Bbox, value, true, true, rotation);
}

/**
 * 完成体迫切
 */
const finish = () => {
  __g.tools.stopVolumeClip()
}

onBeforeUnmount(() => {
  finish()
})
</script>

<style lang="scss" scoped>
* {
  padding: 0;
  margin: 0;
}

html,
body {
  height: 100%;
}

.control {
  @include Width(300);
  max-height: 90vh;
  position: absolute;
  background: rgba(28, 39, 52, 0.8);
  z-index: 10;
  // left: 10px;
  right: 0px;
  top: 70px;
  color: #fff;
  @include FontSize(12);
  cursor: pointer;
  border-radius: 20px;
}

.control .top {
  // width: calc(100% - 20px);
  // background: rgba(0, 0, 0, 0.8);
  @include hHeight(40);
  display: flex;
  align-items: center;
  justify-content: space-between;
  @include Padding(10,0,10,10);
  font-weight: bold;
  @include FontSize(14);
  color: #b6b6cf;
  border-radius: 20px;
}

.control .params {
  // width: calc(100% - 40px);
  max-height: calc(100% - 60px);
  overflow-y: auto;
  @include Padding(10,20,10,20);
}

.params .title {
  color: #b6b6cf;
  margin-bottom: 10px;
}

.params .item {
  display: flex;
  margin-bottom: 10px;
  align-items: center;
}

.params .item .label {
  @include Width(150);
  @include FontSize(14);
}

.params .item .content {
  @include Width(200);
  @include hHeight(30);
  display: flex;
  align-items: center;
  justify-content: space-around;

  .ml-2 {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    margin-right: 10px;
  }

  .rotate-box {
    display: flex;
    @include Width(200);
    justify-content: space-around;

    .rotate-item {
      display: flex;
      //justify-content: space-between;
      //align-items: center;
      //padding: 5px 10px;
      @include hHeight(20);
      border-radius: 10px;
      background: rgba(0, 0, 0, 0.5);

      .left {
        margin-right: 5px;
        background: #343a3d;
        height: 100%;
        @include Width(25);
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
        color: rgba(255, 255, 255, 0.5);
      }

      .z {
        color: #fff;
      }

      input {
        @include Width(25);
        border: none;
        background: #0c1117;
      }
    }

  }
}

.button-box {
  width: 100%;
  margin-bottom: 10px;
}

button {
  background: #090b0a;
  padding: 8px 10px;
  border: 1px solid #1a1f1b;
  border-radius: 10px;
  color: #fff;
  width: 100%;
  cursor: pointer;
}
</style>
