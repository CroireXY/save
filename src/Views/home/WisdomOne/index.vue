<template>
    <Left_box>
        <Lease_title>区域概况</Lease_title>
        <Box :height="250">
            <oneVue />
        </Box>

        <Lease_title>碳排放</Lease_title>
        <Box :height="650">
            <twoVue />
        </Box>
    </Left_box>
    <Right_box>
        <Lease_title>城市环境</Lease_title>
        <Box :height="300">
            <threeVue />
        </Box>

        <Lease_title>营商环境</Lease_title>
        <Box :height="600">
            <fourVue />
        </Box>
    </Right_box>
    <div class="step--container" v-if="curTab === '0'">
        <a-steps progress-dot :current="active">
            <a-step v-for="(item, index) in yearsData" :title="item" :key="item" @click="yearPlay(index)" />
        </a-steps>

        <div class="icon-btn--container">
            <VideoPlay v-if="isCancel" @click="btnPlay"></VideoPlay>
            <VideoPause v-else @click="stop"></VideoPause>
        </div>
    </div>
    <floatButton @change="handleChange" :btn_data="btn_data" />
</template>

<script lang="ts" setup>
import Left_box from '@/components/left_box.vue'
import Lease_title from '@/components/Lease_title/index.vue'
import Right_box from '@/components/right_box.vue'
import Box from '@/components/Box/index.vue'
import oneVue from './component/one.vue'
import twoVue from './component/two.vue'
import threeVue from './component/three.vue'
import fourVue from './component/four.vue'
import floatButton from '@/components/floatButton/index.vue'
import { reactive, ref } from 'vue'
import { onBeforeUnmount, onMounted } from 'vue'
import { cleanAdminStrativeArea, initAdminStrativeArea } from '@/Views/home/WisdomOne/opers/administrativeArea'
import { hideAllTreeInfo, showAllTreeInfo } from '@/utils/showOrHideInfoTree'
import { VideoPause, VideoPlay } from '@element-plus/icons-vue'
import { initPopulationDistribution, active, yearsData, clearPopulationDistribution, isCancel, stop, yearPlay, btnPlay } from './opers/populationDistribution'
const curTab = ref('')

const btn_data = reactive([
    {
        id: 1,
        name: '人口分布'
    },
    // {
    //     id: 2,
    //     name: '行政区划'
    // }
])

const handleChange = (i: number) => {
    if (i === 0) {
        cleanAdminStrativeArea()
        initPopulationDistribution()
    } else if (i === 1) {
        hideAllTreeInfo()
        clearPopulationDistribution()
        initAdminStrativeArea()
    } else {
        cleanAdminStrativeArea()
        clearPopulationDistribution()
        // __g.camera.playAnimation(12)
    }
    curTab.value = i.toString()
}

// 区域总览

onMounted(() => {
    // __g.camera.playAnimation(12)
})

onBeforeUnmount(() => {
    // __g.camera.stopAnimation()
    // 已经加载了
    cleanAdminStrativeArea()
    clearPopulationDistribution()
})
</script>
<style lang="scss" scoped>
.step--container {
    position: absolute;
    @include Bottom(30);
    @include Left(550);
    @include Right(700);
    background-color: rgba(72, 67, 67, 0.5);
    @include BorderRadius(4);
    z-index: 100000;
    @include wHeight(60);
    // width: calc(100vw - 560px - 690px) !important;
    color: #fff;
    display: flex;
    align-items: center;
    @include PaddingRight(20);

    .icon-btn--container {
        position: absolute;
        @include Right(10);

        ::v-deep( svg ){
            cursor: pointer;
            width: 2em !important;
            height: 2em !important;
            color: rgba(255, 255, 255, 0.5);
        }
    }
}
::v-deep( .ant-steps-item-wait > .ant-steps-item-container > .ant-steps-item-content > .ant-steps-item-title ){
    color: rgba(255, 255, 255, 0.5) !important;
}
::v-deep( .ant-steps-item-process > .ant-steps-item-container > .ant-steps-item-content > .ant-steps-item-title ){
    color: rgba(255, 255, 255, 0.8) !important;
}
::v-deep( .ant-steps-item-finish > .ant-steps-item-container > .ant-steps-item-content > .ant-steps-item-title ){
    color: rgba(255, 255, 255, 1) !important;
}

::v-deep( .ant-steps-dot .ant-steps-item-content,
.ant-steps-dot.ant-steps-small .ant-steps-item-content) {
    @include Width(70);
}

::v-deep(.ant-steps-dot .ant-steps-item-title,
.ant-steps-dot.ant-steps-small .ant-steps-item-title) {
    line-height: 0.5715;
}

::v-deep(.ant-steps ){
    width: 96%;
}
</style>
