<template>
    <Left_box>
        <Lease_title>今日交通情况</Lease_title>
        <Box :height="267">
            <oneVue />
        </Box>

        <Lease_title>事故统计</Lease_title>
        <Box :height="290">
            <twoVue />
        </Box>

        <Lease_title>出行统计</Lease_title>
        <Box :height="290">
            <threeVue />
        </Box>
    </Left_box>
    <Right_box>
        <Lease_title>应急资源</Lease_title>
        <Box :height="267">
            <fourVue />
        </Box>

        <Lease_title>重点防护</Lease_title>
        <Box :height="290">
            <fiveVue />
        </Box>

        <Lease_title>视频监控</Lease_title>
        <Box :height="295">
            <sixVue />
        </Box>
    </Right_box>

    <floatButton @change="handleChange" :btn_data="btn_data" />
</template>

<script lang="ts" setup>
import Left_box from '@/components/left_box.vue'
import Lease_title from '@/components/Lease_title/index.vue'
import Right_box from '@/components/right_box.vue'
import Box from '@/components/Box/index.vue'
import floatButton from '@/components/floatButton/index.vue'
import oneVue from './../WisdomFive/component/one.vue'
import twoVue from './../WisdomFive/component/two.vue'
import threeVue from './../WisdomFive/component/three.vue'
import fourVue from './../WisdomFive/component/four.vue'
import fiveVue from './../WisdomFive/component/five.vue'
import sixVue from './../WisdomFive/component/six.vue'
import { onBeforeUnmount, onMounted, reactive } from 'vue'
import { cleanShortConnection, initShortConnection } from '@/Views/home/contactOccurs/opers/shortConnection'
import { cleanTrafficSituation, initTrafficSituation } from '@/Views/home/contactOccurs/opers/trafficSituation'
const btn_data = reactive([
    {
        id: 1,
        name: '短途接驳'
    },
    {
        id: 2,
        name: '城市噪音'
    }
])

const handleChange = (i: number) => {
    if (i === 0) {
        cleanTrafficSituation()
        initShortConnection()
    } else if (i === 1) {
        cleanShortConnection()
        initTrafficSituation()
    } else {
        cleanShortConnection()
        cleanTrafficSituation()
        __g.camera.playAnimation(12)
        console.log('取消')
    }
}

onMounted(() => {
    __g.camera.playAnimation(12)
})
onBeforeUnmount(() => {
    cleanShortConnection()
    cleanTrafficSituation()
    __g.camera.stopAnimation()
})
</script>
<style lang="scss" scoped></style>
