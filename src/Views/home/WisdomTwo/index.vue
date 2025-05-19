<template>
    <Left_box>
        <Lease_title>景区总览</Lease_title>
        <Box :height="945">
            <oneVue />
        </Box>
    </Left_box>
    <Right_box>
        <Lease_title>景点事件总览</Lease_title>
        <Box :height="425">
            <twoVue />
        </Box>

        <Lease_title>景点事件处理进度</Lease_title>
        <Box :height="465">
            <threeVue />
        </Box>
    </Right_box>

    <div class="checkBox" v-if="showCheck">
        <shpCheckBox :checkData="checkData" />
    </div>

    <floatButton @change="handleChange" :btn_data="btn_data" />

    <Dialog>
        <div class="dialog-tip">
            <div>
                名称:
                <span>{{ dialogInfo.name }}</span>
            </div>
            <div>
                建立时间:
                <span>2022-02-02</span>
            </div>
            <div>
                是否考察:
                <span>是</span>
            </div>
            <div>
                今日客流量:
                <span>{{ getRandom() }}</span>
                w
            </div>
            <div>
                今日车流量:
                <span>{{ getRandom() }}</span>
            </div>
            <div>
                当前坐标: [
                <span>{{ dialogInfo.display_x }},{{ dialogInfo.display_y }}</span>
                ]
            </div>
            <div>
                今日主管:
                <span>李xx</span>
            </div>
            <div>
                考察时间:
                <span>2022-02-02</span>
            </div>
            <div>
                设备状况:
                <span>良好</span>
            </div>
        </div>
    </Dialog>
</template>

<script lang="ts" setup>
import Left_box from '@/components/left_box.vue'
import Lease_title from '@/components/Lease_title/index.vue'
import Right_box from '@/components/right_box.vue'
import Box from '@/components/Box/index.vue'
import Dialog from '@/components/Dialog/index.vue'
import oneVue from './component/one.vue'
import twoVue from './component/two.vue'
import threeVue from './component/three.vue'
import floatButton from '@/components/floatButton/index.vue'
import shpCheckBox from '@/components/shpCheckBox/index.vue'
import { onBeforeUnmount, onMounted, reactive, ref, watchEffect } from 'vue'
import { cleanHistory, initHistory } from '@/Views/home/WisdomTwo/opers/historyOpers'
import { scenicSpot, scenicrestore } from '@/Views/home/WisdomTwo/opers/scenicSpot'
import { useDialogStore } from '@/stores/dialog'
import { showNeedTreeInfo } from '@/utils/showOrHideInfoTree'

const showCheck = ref(false)
// shp点
const checkData = [
    {
        name: '山峰点'
    },
    {
        name: '住宿'
    },
    {
        name: '公安交警'
    },
    {
        name: '加油站'
    },
    {
        name: '大型购物广场'
    },
    {
        name: '餐饮'
    },
    {
        name: '彩票店'
    }
]

const btn_data = reactive([
    {
        id: 0,
        name: '地点分布'
    },
    // {
    //     id: 1,
    //     name: '景点分布'
    // }
])

const getRandom = () => {
    return Math.round(Math.random() * 100 + 50)
}

const handleChange = async (i: number) => {
    await scenicrestore()
    if (i === 0) {
        // 历史遗留
        // 显示shp选择框
        __g.camera.playAnimation(12)
        showCheck.value = true
        useDialog.setIsShp(true)
        initHistory()
    } else if (i === 1) {
        // 隐藏shp选择框
        showCheck.value = false
        useDialog.setDialogVisible(false)
        useDialog.setIsShp(false)
        cleanHistory()
        scenicSpot()
    } else {
        // 隐藏shp选择框
        __g.heatmap.hide('heatmap')
        showCheck.value = false
        useDialog.setDialogVisible(false)
        useDialog.setIsShp(false)
        cleanHistory()
        __g.camera.playAnimation(12)
        console.log('取消')
    }
}
const useDialog = useDialogStore()
const dialogInfo = useDialog.DialogInfo
onMounted(() => {
    __g.camera.playAnimation(12)
})

onBeforeUnmount(() => {
    // 隐藏shp选择框
    showCheck.value = false
    useDialog.setDialogVisible(false)
    useDialog.setIsShp(false)
    // 还原
    cleanHistory()
    scenicrestore()
    __g.camera.stopAnimation()
})

watchEffect(() => {
    if (!showCheck.value) {
        cleanHistory()
    }
})
</script>
<style lang="scss" scoped>
.checkBox {
    position: fixed;
    @include Right(550);
    @include Bottom(200);
    z-index: 99;
}

.dialog-tip {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: space-around;
    font-size: 18px;

    div {
        margin-bottom: 10px;
    }
}
</style>
