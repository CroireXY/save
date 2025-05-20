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
}
</style>
