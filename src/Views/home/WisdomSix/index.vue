<template>
    <Left_box v-if="isShowPanel">
        <Lease_title>网格信息</Lease_title>
        <Box :height="590">
            <twoVue />
        </Box>

        <Lease_title>网格事件</Lease_title>
        <Box :height="305">
            <threeVue />
        </Box>
    </Left_box>
    <Right_box v-if="isShowPanel">
        <Lease_title>重点企业</Lease_title>
        <Box :height="590">
            <fourVue />
        </Box>

        <Lease_title>工业企业综合排名TOP10</Lease_title>
        <Box :height="305">
            <fiveVue />
        </Box>
    </Right_box>

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
import fiveVue from './component/five.vue'
import floatButton from '@/components/floatButton/index.vue'
import { onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import { hideAllTreeInfo, showNeedTreeInfo } from '@/utils/showOrHideInfoTree'
import { cleanIntelligenceCommunity1, initIntelligenceCommunity1 } from '@/Views/home/WisdomSix/opers/intelligenceCommunity1'
import { cleanIntelligenceCommunity2, initIntelligenceCommunity2 } from '@/Views/home/WisdomSix/opers/intelligenceCommunity2'

const btn_data = reactive([
    {
        id: 0,
        name: '智慧规划'
    },
    {
        id: 2,
        name: '智慧社区'
    }
])

const isShowPanel = ref(true)
let isNeedStopAnimation = false
const handleChange = async (i: number) => {
    if (i === 0) {
        //智慧规划
        cleanIntelligenceCommunity2()
        isShowPanel.value = false
        // 折叠两边的面板
        // await __g.camera.stopAnimation()
        // await __g.camera.playAnimation(11)
        isNeedStopAnimation = true
    } else if (i === 1) {
        // __g.camera.playAnimation(12)
        if (isNeedStopAnimation) {
            setTimeout(() => {
                isShowPanel.value = true
                //智慧社区2
                initIntelligenceCommunity2()
            }, 3000)
        } else {
            isShowPanel.value = true
            //智慧社区2
            initIntelligenceCommunity2()
        }
    } else {
        isNeedStopAnimation = false
        isShowPanel.value = true
        // await __g.weather.setDateTime(2020, 9, 9, 10, 8, false)
        cleanIntelligenceCommunity2()
        // await __g.camera.playAnimation(12)
    }
}

onMounted(() => {
    isShowPanel.value = true
    // __g.camera.playAnimation(12)
    // __g.weather.setDateTime(2020, 9, 9, 10, 8, false)
})
onBeforeUnmount(() => {
    isShowPanel.value = true
    // __g.weather.setDateTime(2020, 9, 9, 10, 8, false)
    // __g.camera.playAnimation(12)
    // __g.camera.stopAnimation()
    cleanIntelligenceCommunity2()
})
</script>
<style lang="scss" scoped></style>
