<!-- src/Views/home/HomePage/components/SevenDayHistory.vue -->
<template>
    <div class="box">
      <p class="chart-title">飛行次數總覽 （日期/架次）</p>
      <V3Echarts
        :options="option"
        :width="490"
        :height='400'
        container="wisdomone_two"
      />
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref } from "vue";
  import V3Echarts from "@/components/V3Echarts/index.vue";

  const today = new Date();
  const xData = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - (6 - i + 1)); // 包含昨天，往前推6天
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    return `${dd}/${mm}`;
  });


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
      // data: ["04/05","05/05","06/05","07/05","08/05","09/05","10/05",],
      data: xData,
      axisLabel: {
        show: true,
        color: "#fff",
        fontSize: "1rem",
        rotate: 30,
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
          color: "rgba(255, 255, 255, 0.4)",
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
        barWidth: 20,
        itemStyle: {
          color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: "#4EE4FF",
            },
            {
              offset: 1,
              color: "rgba(2,23,44,0.8)", 
            },
          ],
        },
      },
        label: {
          show: true,
          position: "top",
          // formatter: "{c}",
          formatter: (params: any) => `{glow|${params.value}}`,
          color: "#fff",
          fontSize: "1rem",
          rich: {
            glow: {
              color: "#ffffff",
              fontSize: 14,
              textShadowColor: "#00bfff",
              textShadowBlur: 12,
            }
          }
        },
        data: [189, 267, 112, 142, 118, 206, 189],
      },
      {
        type: "pictorialBar",
        symbol: "rect",
        symbolSize: [20, 4],
        symbolOffset: [0, -25], 
        symbolPosition: "end",
        z: 10, 
        itemStyle: {
          color: "#4DE1FF",
        },
        data: [189, 267, 112, 142, 118, 206, 189], // 与主柱图一致
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
    .chart-title {
      color: #fff;
      @include FontSize(24);
      // font-weight: bold;
      margin-top: 8px;
      text-align: center;
      padding-left: 0; 
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
  