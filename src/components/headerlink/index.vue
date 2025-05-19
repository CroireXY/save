<!--
 * @Author: your name
 * @Date: 2022-03-13 23:28:11
 * @LastEditTime: 2025-05-15 16:23:16
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \DTSWEEKLY_ZHJT\src\components\footer\index.vue
-->
<!-- footer -->
<template>
    <div class="footer" v-show="UIShow">
        <div class="footer_Box">
            <template v-for="item in Link" :key="item.key">
                <div :class="PagePath.indexOf(item.path) !== -1 ? 'item isactive' : 'item'" @click="LinkClick(item)">
                    {{ item.name }}
                </div>
            </template>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, computed } from 'vue'
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router'
import { useToolsStore } from '@/stores/tools'

const ToolsStore = useToolsStore()
const UIShow = computed(() => ToolsStore.$state.UIShow)
// 路由监听
onBeforeRouteUpdate(to => {
    PagePath.value = to.path
})
const Router = useRouter()
const Route = useRoute()
const PagePath = ref('')

// 路由信息
const Link: any = reactive([
    {
        name: '飞行活动',
        key: 0,
        path: '/home/cityAppearance'
    },
    {
        name: '航线管理',
        key: 2,
        path: '/home/wisdomone'
    },
    // {
    //     name: '航线管理',
    //     key: 2,
    //     path: '/home/wisdomtwo'
    // },
    {
        name: '安全告警',
        key: 3,
        path: '/home/contactOccurs'
    },
    // {
    //     name: '智慧交通',
    //     key: 5,
    //     path: '/home/wisdomfive'
    // },
    // {
    //     name: '城市治理',
    //     key: 6,
    //     path: '/home/wisdomsix'
    // }
])

// 路由事件
const LinkClick = (val: { name: string; key: number; path: string; icon: string }) => {
    Router.push({
        path: val.path
    })
    PagePath.value = val.path
}

onMounted(() => {
    PagePath.value = Route.path
})
</script>
<style lang="scss" scoped>
.footer {
    position: absolute;
    @include Top(54);
    width: 100%;
    z-index: 10;
    @include wHeight(30);
    .footer_Box {
        position: absolute;
        // left: 0;
        // right: 0;
        @include Left(330);
        @include Right(330);
        bottom: 0;
        top: 0;
        z-index: 10;
        display: flex;
        justify-content: space-around;
        align-items: center;
        .item {
            @include Width(120);
            @include wHeight(30);
            @include LineHeight(30);
            @include FontSize(15);
            color: rgba(255, 255, 255, 0.7);
            font-weight: bold;
            text-align: center;
            cursor: pointer;
            background: url('~@/assets/images/wisdom/btn.png') no-repeat;
            background-size: 100% 100%;
            &:nth-child(4) {
                @include MarginLeft(640);
            }
            &:hover {
                color: rgba(255, 255, 255, 0.9);
                background: url('~@/assets/images/wisdom/btn_.png') no-repeat;
                background-size: 100% 105%;
            }
        }
        .isactive {
            color: rgba(255, 255, 255, 0.9);
            background: url('~@/assets/images/wisdom/btn_.png') no-repeat;
            background-size: 100% 105%;
        }
    }
}
</style>
