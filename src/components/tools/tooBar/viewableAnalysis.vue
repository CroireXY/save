<template>
    <div class="control">
        <div class="top">
            <div>可视域分析</div>
        </div>
        <div class="params">
            <div class="title">参数设置</div>
            <div class="item">
                <div class="label">水平视角</div>
                <div class="content">
                    <input type="number" v-model="options.fov_h" style="width: 180px" :min="1" :max="150" />
                    °
                </div>
            </div>
            <div class="item">
                <div class="label">垂直视角</div>
                <div class="content">
                    <input type="number" v-model="options.fov_v" style="width: 180px" :min="1" :max="150" />
                    °
                </div>
            </div>
            <div class="item">
                <div class="label">视点高度</div>
                <div class="content">
                    <input type="number" v-model="options.height" style="width: 180px" :min="0" />
                    m
                </div>
            </div>
            <div class="item">
                <div class="label">可见颜色</div>
                <div class="content">
                    <input type="color" v-model="options.visibleColor" style="width: 100%" />
                </div>
            </div>
            <div class="item">
                <div class="label">遮挡颜色</div>
                <div class="content">
                    <input type="color" v-model="options.invisibleColor" style="width: 100%" />
                </div>
            </div>

            <div class="button-box">
                <button @click="start()">开始可视域分析</button>
            </div>

            <div class="button-box">
                <button @click="stop()" class="sunlight stop">停止可视域分析</button>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { Fn } from '@vueuse/shared'
import { onBeforeMount, onBeforeUnmount, reactive, ref, watch } from 'vue'
// 可视域分析 代码块
const options = reactive({
    fov_h: 60, // 水平视角，取值范围：[1°~150°]
    fov_v: 30, // 垂直视角，取值范围：[1°~150°]
    height: 2, // 视点高度（距离场景交互所拾取点的高度）
    visibleColor: '#00ff00', // 可见区域的颜色
    invisibleColor: '#ff0000' // 不可见区域的颜色
})

// 分析状态，true为正在分析，false则没有进行分析
let analysisState = false

/**
 * 开始可视域分析
 */
const start = () => {
    // 设置分析状态为 true
    analysisState = true
    // 开启分析
    __g.tools.startViewshedAnalysis(JSON.parse(JSON.stringify(options)))
}

/**
 * 防抖
 * @param func setTimeout回调
 * @param wait setTimeout时间
 * @returns {(function(): void)|*}
 */
const debounce = (func: Fn, wait: number) => {
    let timeout: number | null = null
    return function () {
        if (analysisState) {
            clearTimeout(timeout as number)
            timeout = setTimeout(() => {
                func()
            }, wait)
        }
    }
}

// options监听，执行防抖的 开启分析事件
watch(options, debounce(start, 500), {
    deep: true
})

/**
 * 停止可视域分析
 */
const stop = () => {
    // 设置分析状态为 false
    analysisState = false
    // 关闭分析
    __g.tools.stopViewshedAnalysis()
}

/**
 * 组件销毁，需要停止可视域分析
 */
onBeforeUnmount(() => {
    stop()
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
    width: 350px;
    max-height: 90vh;
    position: absolute;
    background: rgba(28, 39, 52, 0.8);
    z-index: 10;
    // left: 10px;
    right: 0px;
    top: 20px;
    color: #fff;
    font-size: 14px;
    cursor: pointer;
    border-radius: 20px;
}

.control .top {
    // width: calc(100% - 20px);
    // background: rgba(0, 0, 0, 0.8);
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    font-weight: bold;
    font-size: 20px;
    color: #b6b6cf;
    border-radius: 20px;
}

.control .params {
    // width: calc(100% - 40px);
    max-height: calc(100% - 60px);
    overflow-y: auto;
    padding: 10px 20px;
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
    width: 100px;
}

.params .item .content {
    width: 220px;
    display: flex;
    align-items: center;
    justify-content: space-around;
}

.params .item .content span {
    color: #89898b;
    font-size: 12px;
}

input[type='color'] {
    width: 50px;
    height: 25px;
    border: 0;
    outline: none;
    border-radius: 5px;
}

input[type='color']::-webkit-color-swatch-wrapper {
    border-radius: 5px;
    padding: 0;
}

input[type='color']::-webkit-color-swatch {
    /* height: 20px;
    width: 55px; */
    position: relative;
    /* left: -4px;
    top: -4px; */
    border: 0;
    border-radius: 5px;
    border: 1px #343a41 solid;
}

input[type='text'] {
    height: 25px;
    background: #2b2f37;
    color: #fff;
    border: 1px solid #343a41;
    border-radius: 5px;
    padding: 0px 5px;
}

input[type='number'] {
    height: 25px;
    background: #2b2f37;
    color: #fff;
    border: 1px solid #343a41;
    border-radius: 5px;
    padding: 0px 5px;
}

input[type='checkbox'] {
    width: 18px;
    height: 18px;
    background-color: #26282a !important;
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
