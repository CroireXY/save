<!-- src/components/tools/toolBar.vue -->
<template>
    <div class="too-bar--container">
        <div @click="compClick(EShowCompName.sectioning)" class="item">
            <el-tooltip popper-class="tip-popper" class="box-item" effect="dark" content="" placement="bottom">
                <Icon :color="showComp === EShowCompName.sectioning ? '#7afafe' : '#fff'" :font-size="25" icon="tool-bar-tipouqie" />
            </el-tooltip>
        </div>
        <div @click="compClick(EShowCompName.intervisibility)" class="item">
            <el-tooltip popper-class="tip-popper" class="box-item" effect="dark" content="通视分析" placement="bottom">
                <img v-if="showComp === EShowCompName.intervisibility" src="@/assets/images/tools/icon_通视_hover.png" alt="" />
                <img v-else src="@/assets/images/tools/icon_通视.png" alt="" />
            </el-tooltip>
        </div>
        <div @click="compClick(EShowCompName.digFill)" class="item">
            <el-tooltip popper-class="tip-popper" class="box-item" effect="dark" content="方量分析" placement="bottom">
                <img v-if="showComp === EShowCompName.digFill" src="@/assets/images/tools/icon_填挖方_hover.png" alt="" />
                <img v-else src="@/assets/images/tools/icon_填挖方.png" alt="" />
            </el-tooltip>
        </div>

        <div @click="compClick(EShowCompName.VisibleRange)" class="item">
            <el-tooltip popper-class="tip-popper" class="box-item" effect="dark" content="可视域分析" placement="bottom">
                <img v-if="showComp === EShowCompName.VisibleRange" src="@/assets/images/tools/icon_可视域_hover.png" alt="" />
                <img v-else src="@/assets/images/tools/icon_可视域.png" alt="" />
            </el-tooltip>
        </div>

        <div @click="compClick(EShowCompName.skyline)" class="item">
            <el-tooltip popper-class="tip-popper" class="box-item" effect="dark" content="天际线分析" placement="bottom">
                <img v-if="showComp === EShowCompName.skyline" src="@/assets/images/tools/icon_天际线_hover.png" alt="" />
                <img v-else src="@/assets/images/tools/icon_天际线.png" alt="" />
            </el-tooltip>
        </div>

        <div @click="compClick(EShowCompName.contourLine)" class="item">
            <el-tooltip popper-class="tip-popper" class="box-item" effect="dark" content="等高线分析" placement="bottom">
                <img v-if="showComp === EShowCompName.contourLine" src="@/assets/images/tools/icon_等高线_hover.png" alt="" />
                <img v-else src="@/assets/images/tools/icon_等高线.png" alt="" />
            </el-tooltip>
        </div>

        <div @click="compClick(EShowCompName.slopeGradientTo)" class="item">
            <el-tooltip popper-class="tip-popper" class="box-item" effect="dark" content="坡度向分析" placement="bottom">
                <img v-if="showComp === EShowCompName.slopeGradientTo" src="@/assets/images/tools/icon_坡度坡向_hover.png" alt="" />
                <img v-else src="@/assets/images/tools/icon_坡度坡向.png" alt="" />
            </el-tooltip>
        </div>

        <div @click="compClick(EShowCompName.routePlanning)" class="item">
            <el-tooltip popper-class="tip-popper" class="box-item" effect="dark" content="路径规划" placement="bottom">
                <Icon :color="showComp === EShowCompName.routePlanning && tools.RoutePlaningShow ? '#7afafe' : '#fff'" :font-size="25" icon="tool-bar-routePlanning" />
            </el-tooltip>
        </div>
    </div>

    <div class="container">
        <theBodyOfTheCutting v-if="showComp === EShowCompName.sectioning"></theBodyOfTheCutting>
        <routePlaning v-if="showComp === EShowCompName.routePlanning && tools.RoutePlaningShow"></routePlaning>
    </div>
</template>
<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import viewableAnalysis from './tooBar/viewableAnalysis.vue'
import volumeAnalysis from './tooBar/volumeAnalysis.vue'
import penetrabilityAnalysis from './tooBar/penetrabilityAnalysis.vue'
import theBodyOfTheCutting from '@/components/tools/tooBar/theBodyOfTheCutting.vue'
import routePlaning from '@/components/tools/tooBar/routePlaning.vue'
import { useToolsStore } from '@/stores/tools'

/**
 * 显示组件的枚举
 */
enum EShowCompName {
    /**
     * 可视域
     */
    VisibleRange = 0,
    /**
     * 天际线
     */
    skyline = 1,
    /**
     * 开敞度
     */
    theOpenDegreeOf = 2,
    /**
     * 通视
     */
    intervisibility = 3,
    /**
     * 水淹
     */
    waterLogging = 4,
    /**
     * 日照
     */
    sunlight = 5,
    /**
     * 挖填方
     */
    digFill = 6,
    /**
     * 坡度坡向
     */
    slopeGradientTo = 7,
    /**
     * 等高线
     */
    contourLine = 8,
    /**
     * 体剖切
     */
    sectioning = 10,
    /**
     * 其他
     */
    other = -1,
    /**
     * 路径规划
     */
    routePlanning = 12
}

// 当前显示的组件
const showComp = ref(EShowCompName.other)
const tools = useToolsStore()
/**
 * 组件点击
 * @param val
 */
const compClick = (val: EShowCompName) => {
    showComp.value = val
    if (val == EShowCompName.sectioning) {
        __g.tools.hideAnalysisPanel()
        tools.SetRoutePlaningShow(false)
        __g.marker.clear(null)
    } else if (val == EShowCompName.routePlanning) {
        __g.tools.hideAnalysisPanel()
        tools.SetRoutePlaningShow(!tools.RoutePlaningShow)
        __g.marker.clear(null)
        __g.polyline.clear(null)
        ;(document.getElementById('origin') as HTMLElement).textContent = ''
        ;(document.getElementById('destination') as HTMLElement).textContent = ''
        ;(document.getElementById('waypoints') as HTMLElement).textContent = ''
        ;(document.getElementById('pathList') as HTMLElement).innerHTML = ''
        ;(document.getElementById('key') as HTMLInputElement).value = ''
        ;(document.getElementById('path') as HTMLElement).style.display = 'none'
    } else {
        tools.SetRoutePlaningShow(false)
        __g.marker.clear(null)
        __g.polyline.clear(null)
        //type是分析面板的顺序索引
        __g.tools.showAnalysisPanel(val, [2250, 210])
    }
}

onBeforeUnmount(() => {
    __g.marker.clear(null)
})
</script>

<style lang="scss" scoped>
.too-bar--container {
    position: absolute;
    @include Width(260);
    @include Top(60);
    @include Right(130);
    @include Padding(10, 0, 10, 20);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    border-radius: 2%;
    overflow-y: auto;
    overflow-x: hidden;
    z-index: 10;
    background: rgb(28, 39, 52);
    .item {
        @include Width(60);
        img {
            width: 25px;
            height: 25px;
        }
    }
    .item:nth-child(1),
    .item:nth-child(2),
    .item:nth-child(3),
    .item:nth-child(4) {
        @include m-MarginBottom(20);
    }
}

.container {
    position: absolute;
    @include Right(130);
    @include Top(130);
    z-index: 99;
}
</style>
