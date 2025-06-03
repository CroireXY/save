<template>
    <Left_box>
        <Lease_title>今日交通情况</Lease_title>
        <Box height="260">
            <oneVue />
        </Box>

        <Lease_title>事故统计</Lease_title>
        <Box height="290">
            <twoVue />
        </Box>

        <Lease_title>出行统计</Lease_title>
        <Box height="290">
            <threeVue />
        </Box>
    </Left_box>
    <Right_box>
        <Lease_title>应急资源</Lease_title>
        <Box height="290">
            <fourVue />
        </Box>

        <Lease_title>重点防护</Lease_title>
        <Box height="290">
            <fiveVue />
        </Box>

        <Lease_title>视频监控</Lease_title>
        <Box height="260">
            <sixVue />
        </Box>
    </Right_box>

    <floatButton @change="handleChange" :btn_data="btn_data" />

    <Dangerous v-if="showDangerTip" />

    <div class="metro-img" v-if="showMetroImg">
        <img src="@/assets/images/metro.jpg" alt="" />
    </div>
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
import sixVue from './component/six.vue'
import floatButton from '@/components/floatButton/index.vue'
import Dangerous from '@/components/dangerous/index.vue'
import { onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import { cleanTrafficWarning, initTrafficWarning, timer } from '@/Views/home/WisdomFive/opers/trafficWarning'
import { cleanMetroPlanning, initMetroPlanning } from '@/Views/home/WisdomFive/opers/metroPlanning'

const showDangerTip = ref(false)

const btn_data = reactive([
    {
        id: 1,
        name: '地铁规划'
    },
    {
        id: 2,
        name: '交通预警'
    }
])

// 地铁图片显示
const showMetroImg = ref(false)

const handleChange = (i: number) => {
    if (i === 0) {
        showDangerTip.value = false
        showMetroImg.value = true
        // __g.weather.setDarkMode(true)
        initMetroPlanning()
        cleanTrafficWarning()
    } else if (i === 1) {
        showMetroImg.value = false
        initTrafficWarning()
        cleanMetroPlanning()
        setTimeout(() => {
            showDangerTip.value = true
        }, 3500)
    } else {
        cleanTrafficWarning()
        cleanMetroPlanning()
        showDangerTip.value = false
        showMetroImg.value = false
        // __g.camera.playAnimation(12)
        // __g.weather.setDarkMode(false)
    }
}

onMounted(() => {
    // __g.camera.playAnimation(12)
})

onBeforeUnmount(() => {
    showDangerTip.value = false
    showMetroImg.value = false
    clearTimeout(timer)
    cleanTrafficWarning()
    cleanMetroPlanning()
    // __g.camera.stopAnimation()
})
</script>
<style lang="scss" scoped>
.metro-img {
    position: fixed;
    @include Bottom(20);
    @include Left(550);
    @include Width(300);
    @include wHeight(300);
    z-index: 10;
    img {
        @include Width(300);
        @include wHeight(300);
    }
}
</style>
