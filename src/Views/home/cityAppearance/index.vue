<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2025-05-12 06:16:06
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2025-05-16 17:01:16
 * @FilePath: \code\src\Views\home\cityAppearance\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%A
-->
<template>
    <Left_box>
        <Lease_title>数据概览</Lease_title>
        <Box :height="250">
            <oneVue />
        </Box>

        <Lease_title>过去7日实飞</Lease_title>
        <Box :height="655">
            <twoVue />
        </Box>
    </Left_box>
    <Right_box>
        <Lease_title>数据统计</Lease_title>
        <Box :height="300">
            <threeVue />
        </Box>

        <Lease_title>飞行任务详情</Lease_title>
        <Box :height="600">
            <fourVue />
        </Box>
    </Right_box>
</template>

<script lang="ts" setup>
import Left_box from '@/components/left_box.vue'
import Lease_title from '@/components/Lease_title/index.vue'
import Right_box from '@/components/right_box.vue'
import Box from '@/components/Box/index.vue'
import oneVue from './../WisdomOne/component/one.vue'
import twoVue from './../WisdomOne/component/two.vue'
import threeVue from './../WisdomOne/component/three.vue'
import fourVue from './../WisdomOne/component/four.vue'
import { onBeforeUnmount, onMounted } from 'vue'
onMounted(() => {
    // __g.camera.playAnimation(12)
    // setTimeout(() => {
    //     __g.camera.stopAnimation()
    //     __g.camera.playAnimation(2)
    // }, 2000)
})
onBeforeUnmount(() => {
    __g.camera.stopAnimation()
})
</script>
<style lang="scss" scoped></style>
