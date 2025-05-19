<template>
    <div class="control">
        <div class="top">
            <div>方量分析</div>
        </div>
        <div class="params">
            <div class="title">参数设置</div>
            <div class="item">
                <div class="label">高度</div>
                <div class="content">
                    <input type="number" v-model="options.height" :step="10" :min="0" />
                    m
                </div>
            </div>

            <div class="item">
                <div class="label">网格尺寸</div>
                <div class="content">
                    <input type="number" v-model="options.gridSize" :step="1" :min="0" />
                    m
                </div>
            </div>

            <div class="item">
                <div class="label">网格</div>
                <div class="content">
                    <div class="flex-box">
                        <input type="number" v-model="options.gridLineThickness" :step="1" :min="0" style="width: 50px" />
                        像素
                    </div>
                    <input type="color" v-model="options.gridColor" />
                </div>
            </div>

            <div class="item">
                <div class="label">线宽</div>
                <div class="content">
                    <input type="number" v-model="options.lineThickness" :step="1" :min="0" />
                    像素
                </div>
            </div>

            <div class="item">
                <div class="label">端点大小</div>
                <div class="content">
                    <input type="number" v-model="options.pointSize" :step="1" :min="0" />
                    像素
                </div>
            </div>

            <div class="item">
                <div class="label">挖方颜色</div>
                <div class="content">
                    <input type="color" v-model="options.cutLineColor" style="width: 100%" />
                </div>
            </div>
            <div class="item">
                <div class="label">填方颜色</div>
                <div class="content">
                    <input type="color" v-model="options.fillLineColor" style="width: 100%" />
                </div>
            </div>
            <div class="item">
                <div class="label">挖方端点</div>
                <div class="content">
                    <input type="color" v-model="options.cutPointColor" style="width: 100%" />
                </div>
            </div>
            <div class="item">
                <div class="label">填方端点</div>
                <div class="content">
                    <input type="color" v-model="options.fillPointColor" style="width: 100%" />
                </div>
            </div>

            <div class="button-box">
                <button @click="start()">开始方量分析</button>
            </div>

            <div class="button-box">
                <button @click="stop()" class="sunlight stop">停止方量分析</button>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { onBeforeMount, onBeforeUnmount, reactive, ref } from 'vue'
// 方量分析 代码块
const options = reactive({
    height: 130, //高度 米
    gridSize: 20, //网格大小
    lineThickness: 1, //宽度
    pointSize: 5, //点的大小
    gridLineThickness: 1, //网格线的宽度
    cutLineColor: '#ff0000', //挖方线的颜色
    fillLineColor: '#00bc00', //填方线的颜色
    cutPointColor: '#000000', //挖方点的颜色
    fillPointColor: '#0100ff', //填方点的颜色
    gridColor: '#ffff00' //网格线的颜色
})

// 开始方量分析
const start = () => {
    const o = JSON.parse(JSON.stringify(options))
    // 开启分析
    __g.tools.startCutFillAnalysis(o)
}

// 停止方量分析
const stop = () => {
    // 关闭分析
    __g.tools.stopCutFillAnalysis()
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

.app {
    width: 100%;
    height: 100%;
}

.flex-box {
    display: flex;
    align-items: center;
}

.control {
    width: 350px;
    max-height: 90vh;
    position: absolute;
    background: rgba(28, 39, 52, 0.8);
    z-index: 10;
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
    justify-content: space-between;
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
