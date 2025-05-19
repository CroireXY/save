<template>
  <div class="box">
    <V3Echarts
      :options="option"
      :width="490"
      :height="280"
      container="wisdomfive_two"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import V3Echarts from "@/components/V3Echarts/index.vue";

const option = ref({
  tooltip: {
    trigger: "item",
    textStyle: {
      color: "#fff",
      fontSize:12,
    },
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,.6)",
    borderWidth: 1,
    borderColor: "transparent",
    padding: 10,
    // axisPointer: {
    //   type: "shadow",
    // },
  },
  grid: {
    top: "15%",
    left: "3%",
    bottom: "0%",
    right: "2%",
    containLabel: true,
  },
  xAxis: {
    data: ["地铁", "驾车", "公交", "自行车", "步行", "的士"],
    axisLabel: {
      show: true,
      color: "#fff",
      fontSize:12,
    },
    axisTick: {
      show: false,
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: "rgba(43,60,84,.8)",
      },
    },
    z: 10,
  },
  yAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: "rgba(43,60,84,.8)",
      },
    },
    splitLine: {
      show: true,
      lineStyle: {
        type: "dashed",
        color: "#193451",
        width: 1,
      },
    },
    max: 300,
    axisTick: {
      show: false,
    },
    axisLabel: {
      color: "#fff",
      fontSize:12,
      formatter: "{value}",
    },
  },
  dataZoom: [
    {
      type: "inside",
    },
  ],
  series: [
    {
      type: "bar",
      barWidth: 22,
      // zlevel: 1,
      itemStyle: {
        // borderColor: "#208edf",
        // borderWidth: 2,
        // shadowColor: "#208edf",
        // shadowBlur: 10,
        color: "rgba(16,158,220,0.2)",
        // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        //   { offset: 0, color: "rgba(16,158,220,0.1)" },
        //   { offset: 0.5, color: "rgba(16,158,220,0.1)" },
        //   { offset: 1, color: "rgba(99,189,219,0.1)" },
        // ]),
      },
      // showBackground: true,
      // backgroundStyle: {
      //   color: "rgba(180, 180, 180, 0.08)",
      // },
      label: {
        show: true,
        position: "top",
        color: "#fff",
        fontSize:12,
        formatter: "{c}",
      },
      data: [210, 299, 130, 152, 138, 226],
    },
    {
      type: "pictorialBar",
      symbol: "rect",
      symbolSize: [20, 4],
      // zlevel: 2,
      itemStyle: {
        color: "rgba(16,158,220,1)",
      },
      data: [
        { value: 589, symbolOffset: [0, -123] },
        { value: 267, symbolOffset: [0, -174] },
        { value: 112, symbolOffset: [0, -74] },
        { value: 142, symbolOffset: [0, -88] },
        { value: 118, symbolOffset: [0, -80] },
        { value: 206, symbolOffset: [0, -134] },
      ],
    },
  ],
});
</script>

<style lang="scss" scoped>
.box {
  @include boxWidth(510);
  @include boxhHeight(267);
  box-sizing: border-box;
  @include Padding(10, 10, 10, 10);
  position: relative;
}
</style>
