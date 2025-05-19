<template>
  <div class="box">
    <V3Echarts
      :options="option"
      :width="490"
      :height="280"
      container="wisdomfive_one"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import V3Echarts from "@/components/V3Echarts/index.vue";

const option = ref({
  tooltip: {
    trigger: "axis",
    textStyle: {
      color: "#fff",
      fontSize:12,
    },
    backgroundColor: "rgba(0,0,0,.6)",
    borderWidth: 1,
    borderColor: "transparent",
    axisPointer: {
      type: "shadow",
    },
  },
  legend: {
    data: ["未处理", "已处理"],
    itemWidth: 6,
    itemHeight: 6,
    itemGap: 30,
    textStyle: {
      fontSize:12,
      color: "#fff",
    },
    right: 25,
    top: 5,
  },
  grid: {
    top: "18%",
    left: "2%",
    bottom: "-5%",
    right: "0%",
    containLabel: true,
  },
  xAxis: {
    data: ["车辆超速", "车辆相撞", "占用公交车道", "闯红灯", "不礼让行人", "酒驾"],
    axisLabel: {
      show: true,
      color: "#fff",
      fontSize:12,
      fontFamily: "Oppo",
      overflow: "break",
      width: 60,
      interval: 0,
      rotate:40
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
    name: "单位: 起",
    nameTextStyle: {
      align: "left",
      padding: [0, 0, 7, -25],
      color: "rgba(255, 255, 255, 0.7)",
      fontSize:12,
      fontWeight: 800,
    },
    splitNumber: 4,
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
        color: "rgba(25,52,81,.4)",
        width: 1,
      },
    },
    axisTick: {
      show: false,
    },
    axisLabel: {
      color: "#fff",
      fontSize:12,
      fontFamily: "Oppo",
    },
  },
  dataZoom: [
    {
      type: "inside",
    },
  ],
  series: [
    {
      name: "未处理",
      type: "bar",
      barWidth: 8,
      itemStyle: {
        color: "#10a9eb",
      },
      barGap: "100%",
      label: {
        show: true,
        position: "top",
        color: "#10a9eb",
        fontSize:12,
      },
      data: [691, 6225, 4854, 3026, 2022, 1409],
    },
    {
      name: "已处理",
      type: "bar",
      barWidth: 8,
      itemStyle: {
        color: "#08f496",
      },
      label: {
        show: true,
        position: "top",
        color: "#08f496",
        fontSize:12,
      },
      data: [2967, 1857, 3949, 4689, 5830, 5512],
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
