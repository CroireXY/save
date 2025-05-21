<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2025-05-20 07:26:28
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2025-05-21 11:52:16
 * @FilePath: \code\src\components\Map-3d.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div id="map3d"></div>
</template>

<script setup>
import { onMounted } from 'vue'
import qtLoader from '/public/assets/loader.js'
import SSWebChannel from '/public/SSWebChannel'

const emit = defineEmits(['init'])

onMounted(() => {
  const platform = getPlatform()
  load(platform)
})

// 获取当前运行平台
const getPlatform = () => {
	const ua = window.navigator.userAgent
	const reg = /QtWebEngine/g
	return reg.test(ua) ? 'windows' : 'web'
}

const load = (platform) => {
  const el = document.getElementById('map3d')
  const fn = {
		windows: (el) => windows(el),
		web: (el) => web(el),
	}
	fn[platform] && fn[platform](el)
}

// windows 处理
const windows = (el) => {
	new SSWebChannel(el, (channel) => {
		channel.importModule('@/native/main.js', 'Native', () => {
			init()
		})
	})
}

// web 处理
const web = async (el) => {
	const [SSmap, GlobalViewer] = await qtLoader({ el })
	window.SSmap = SSmap
	window.viewer = GlobalViewer
	window.Native = await import('/public/native/main.js')
	init()
}

const init = () => {
  emit('init')
}
</script>

<style scoped>
#map3d {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1;

    .loading {
        @include Width(50);
        @include hHeight(50);
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        @include FontSize(40);
        font-weight: 600;

        :deep(.el-loading-mask) {
            background: rgba(0, 0, 0, 0) !important;

            .circular {
                @include Width(50);
                @include hHeight(50);

                .path {
                    stroke: rgb(32, 158, 216);
                }
            }
        }
    }
}
</style>
