<template>
    <div class="check-box">
        <el-checkbox-group v-model="checkList" @change="handleCheckChange">
            <el-checkbox v-for="(item, index) in checkData" :key="index" :label="item.name" />
        </el-checkbox-group>
    </div>
</template>

<script lang="ts" setup>
// 复选框
import { ref, watch, watchEffect } from 'vue'
import { useDisplayStore } from '@/stores/display'

const props = defineProps({
    checkData: {
        required: true,
        type: Array
    }
})

const checkList = ref([])
const handleCheckChange = (value: any) => {}

const useDisplay = useDisplayStore()

watch(checkList, (value, oldValue) => {
    value = Array.from(value)
    oldValue = Array.from(oldValue)
    let wipeOff = oldValue.filter(item => !value.includes(item))
    let newlyIncreased = value.filter(item => !oldValue.includes(item))
    if (wipeOff.length != 0) {
        let name: any = wipeOff[0]
        __g.shapeFileLayer.hide(`sp_point_${name}`)
    }
    if (newlyIncreased.length != 0) {
        if (useDisplay.shpHasShowArr.includes(newlyIncreased[0])) {
            let name: any = newlyIncreased[0]
            __g.shapeFileLayer.show(`sp_point_${name}`)
        } else {
            getShp(newlyIncreased[0])
            const shpHasShowArr = useDisplay.shpHasShowArr
            shpHasShowArr.push(newlyIncreased[0])
            useDisplay.SetShpHasShowArr(shpHasShowArr)
        }
    }
})

const getShp = async (name: string) => {
    // 点数据
    const o = {
        id: `sp_point_${name}`,
        file: `@path:智慧广州/shpFile/${name}.shp`, //ShapeFile的文件路径，支持本地路径和网络路径
        pointImage: `@path:智慧广州/shpImg/${name}.png`, // 图片路径
        offset: [0, 0, 0], //坐标位置偏移量
        rotation: [0, 0, 0], //旋转
        scale: [0.5, 0.5, 0.5], // 缩放
        pointDisplayMode: 1, // 显示模式
        pointContentRang: 1000000, // 文本可见距离，单位米
        pointRang: [1000000, 1000000], // 可见距离（米）点坐标：[X,Y]
        clusterByImage: true, //是否按相同图片路径(pointImage)聚合显示
        pointOcclusionCull: false, // 是否参与遮挡 默认true
        pointTextContentFieldName: '', // 文本内容（点字段）
        pointFontColor: [0, 0, 0, 0], // 字体颜色
        pointFontOutlineColor: [0, 0, 0, 0], // 字体轮廓颜色
        pointBackgroundColor: [0, 0, 0, 0] // 字体背景颜色
    }
    // 添加点数据
    const res = await __g.shapeFileLayer.add(o)
    if (res.result) {
        __g.shapeFileLayer.show(`sp_point_${name}`)
    }
    // console.log(res, '-----')
}
</script>

<style lang="scss" scoped>
// 修改选择框颜色
::v-deep .el-checkbox__input.is-checked .el-checkbox__inner,
.el-checkbox__input.is-indeterminate .el-checkbox__inner {
    border-color: #2a9dd3 !important;
    background-color: #2a9dd3 !important;
}
::v-deep .el-checkbox__inner:hover {
    border-color: #2a9dd3 !important;
}
::v-deep .el-checkbox__input.is-focus .el-checkbox__inner {
    border-color: #2a9dd3 !important;
}
::v-deep .el-checkbox {
    color: #fff;
    margin-right: 30px;
    @include FontSize(16);
    margin-bottom: 18px;
}
// 修改选择框大小
::v-deep .el-checkbox__inner {
    width: 15px;
    height: 15px;
    background-color: transparent !important;
}
// 修改选择label字体颜色
::v-deep .el-checkbox__input.is-checked + .el-checkbox__label {
    color: #2a9dd3 !important;
    @include FontSize(16);
}
// 修改中心对号大小以及位置
::v-deep .el-checkbox__inner::after {
    left: 5px;
    height: 5px;
    width: 3px;
    top: 2px;
}

.check-box {
    @include Width(150);
    display: flex;
    justify-content: center;
    flex-direction: column;
    background: rgba(0, 0, 0, 0.5);
    padding: 10px 15px;
    border-radius: 15px;
}
</style>
