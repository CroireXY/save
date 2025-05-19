<template>
  <div class="float_list">
    <div v-for="(item, i) in btn_data" :key="item.id">
      <div @click="click(i)" :class="activeIndex === i ? 'active' : ''" class="btn">
        <div class="text">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, defineEmits} from 'vue'

const props = defineProps({
  btn_data: {
    type: Array,
    required: true
  }
})
let activeIndex = ref('')

const emit = defineEmits(['change'])
const click = i => {
  if (i===activeIndex.value){
    // 取消
    activeIndex.value = ''
    emit('change', activeIndex.value)
  }else{
    activeIndex.value = i
    emit('change', i)
  }
}
</script>

<style lang="scss" scoped>
.float_list {
  z-index: 99;
  display: flex;
  position: fixed;
  flex-direction: column;
  @include Bottom(20);
  @include Right(550);

  .active {
    //background: url('./active.png') no-repeat !important;
    background-size: 100% 100% !important;

    .text {
      background-image: -webkit-linear-gradient(left, #2a9dd3, #469cc7);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-weight: bold;
    }
  }

  .btn {
    @include Width(120);
    @include hHeight(45);
    margin-bottom: 10px;
    background: url('./normal.png') no-repeat;
    background-size: 100% 100%;
    cursor: pointer;

    .text {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      @include FontSize(16);
    }
  }
}
</style>
