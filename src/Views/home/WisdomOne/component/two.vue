<template>
  <div class="box">
    <!-- <div class="title">7日歷史數據</div> -->

    <!-- <div class="content">
      <div class="text">
        <span class="name">总数</span>
        <span class="value">0</span>
      </div>
    </div> -->
    <!-- <div class="info">
      <div class="item">
        <div class="icon">
          <img src="@/assets/images/wisdom/办结率.svg" alt="" />
        </div>
        <div class="name">累计飞行次数</div>
        <div class="value">100</div>
      </div>
      <div class="item">
        <div class="icon">
          <img src="@/assets/images/wisdom/满意度.svg" alt="" />
        </div>
        <div class="name">累计飞行公里</div>
        <div class="value">4000</div>
      </div>
    </div> -->

    <!-- <div class="title">过去7日实际飞行次数</div> -->

    <V3Echarts
      :options="option"
      :width="490"
      :height="300"
      container="wisdomone_two"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import V3Echarts from "@/components/V3Echarts/index.vue";
import SubTitle from "@/components/SubTitle/SubTitle.vue";
let option = ref({
  tooltip: {
    trigger: "item",
    textStyle: {
      color: "#fff",
      fontSize: "12",
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
    data: [
      "04/05",
      "05/05",
      "06/05",
      "07/05",
      "08/05",
      "09/05",
      "10/05",
      // "11/05",
      // "12/05",
      // "13/05",
      // "14/05",
      // "15/05",
    ],
    axisLabel: {
      show: true,
      color: "#fff",
      fontSize: "1rem",
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
      fontSize: "1rem",
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
      barWidth: "18rem",
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
        fontSize: "1rem",
        formatter: "{c}",
      },
      data: [189, 267, 112, 142, 118, 206, 189],
    },
    {
      type: "pictorialBar",
      symbol: "rect",
      symbolSize: ["1rem", "4rem"],
      // zlevel: 2,
      itemStyle: {
        color: "rgba(16,158,220,1)",
      },
      data: [
        // { value: 589, symbolOffset: [0, -123] },
        // { value: 267, symbolOffset: [0, -174] },
        // { value: 112, symbolOffset: [0, -74] },
        // { value: 142, symbolOffset: [0, -88] },
        // { value: 118, symbolOffset: [0, -80] },
        // { value: 206, symbolOffset: [0, -134] },
        //  { value: 589, },
        // { value: 267, },
        // { value: 112, },
        // { value: 142, },
        // { value: 118,  },
        // { value: 206,  },
      ],
    },
  ],
});
</script>

<style lang="scss" scoped>
.box {
  @include boxWidth(510);
  @include boxhHeight(400);
  box-sizing: border-box;
  @include Padding(10, 10, 10, 10);
  position: relative;
  .title {
    @include Width(510);
    background-size: 100% 100%;
    @include wHeight(34);
    @include PaddingLeft(40);
    @include PaddingTop(24);
    box-sizing: border-box;
    color: #fff;
    @include FontSize(16);
  }
  .content {
    width: 100%;
    @include wHeight(50);
    @include LineHeight(50);
    background: rgba(255, 255, 255, 0.1);
    position: relative;
    &::before {
      content: "";
      position: absolute;
      @include Left(1);
      @include Top(15);
      @include Width(1);
      @include wHeight(20);
      background-color: #fff;
    }
    &::after {
      content: "";
      position: absolute;
      @include Right(1);
      @include Top(15);
      @include Width(1);
      @include wHeight(20);
      background-color: #fff;
    }
    .text {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      z-index: 1;
      &::before {
        content: "";
        position: absolute;
        @include Left(-183);
        @include Top(25);
        @include Width(160);
        @include wHeight(1);
        background-color: rgba(255, 255, 255, 0.15);
      }
      &::after {
        content: "";
        position: absolute;
        @include Right(-183);
        @include Top(25);
        @include Width(160);
        @include wHeight(1);
        background-color: rgba(255, 255, 255, 0.15);
      }
      .name {
        display: inline-block;
        color: rgba(255, 255, 255, 0.6);
        margin-right: 10px;
      }
      .value {
        display: inline-block;
        color: rgba(255, 255, 255, 0.897);
        font-weight: bold;
        @include FontSize(18);
      }
    }
  }
  .info {
    width: 100%;
    @include wHeight(100);
    display: flex;
    justify-content: space-between;
    // background-color: red;
    @include Padding(30, 0, 0, 0);
    .item {
      @include Width(240);
      @include wHeight(50);
      border: 1px solid rgba(255, 255, 255, 0.3);
      @include BorderRadius(4);
      position: relative;
      .icon {
        @include Width(40);
        @include wHeight(40);
        background-color: rgba(255, 255, 255, 0.1);
        @include BorderRadius(4);
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        @include Top(-20);
        @include Left(8);
        img {
          width: 65%;
          height: 65%;
        }
      }
      .name {
        @include Width(85);
        @include wHeight(30);
        @include LineHeight(30);
        position: absolute;
        bottom: 0;
        @include Left(8);
        @include FontSize(14);
        color: rgba(255, 255, 255, 0.671);
      }

      .value {
        @include Width(90);
        @include wHeight(50);
        @include LineHeight(65);
        position: absolute;
        @include Right(8);
        top: 0;
        text-align: right;
        @include FontSize(20);
        font-weight: bolder;
        color: #02b3ff;
        span {
          color: rgba(255, 255, 255, 0.671);
        }
      }
    }
  }
}
</style>
