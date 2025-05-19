<template>
  <div class="box">
    <div class="tab">
      <template v-for="item in tabList" :key="item.id">
        <div
            :class="[
            item.id == TabCurrentIndex ? 'tabname tabActive' : 'tabname',
          ]"
            @click="TabClickEvent(item.id)"
        >
          {{ item.tabName }}
        </div>
      </template>
    </div>

    <div class="content">
      <V3Echarts
          :options="option"
          :width="220"
          :height="228"
          container="wisdomone_three"
      />
      <div class="info">
        <div class="util">单位: km2</div>
        <div class="title">
          <div class="text">具体数据</div>
        </div>
        <div class="list">
          <template v-for="item in infoList" :key="item.id">
            <div class="item">
              <img class="icon" :src="item.icon" alt=""/>
              <div class="name">{{ item.name }}</div>
              <div
                  class="value"
                  :style="{
                  color: item.value > item.valueMax ? '#d2d50b' : '05d00c',
                }"
              >
                {{ item.value }}
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import V3Echarts from "@/components/V3Echarts/index.vue";
import * as echarts from "echarts";

let TabCurrentIndex = ref(1);
const tabList = [
  {
    id: 1,
    tabName: "适飞空域",
  },
  {
    id: 2,
    tabName: "适飞占比",
  },
  {
    id: 3,
    tabName: "管制空域",
  },
  {
    id: 4,
    tabName: "管制占比",
  },
];
const TabClickEvent = (id: number) => (TabCurrentIndex.value = id);

let demoData = [
  {
    name: "",
    value: 48,
  },
];
const option = ref({
  series: (function () {
    var result: any = [];
    demoData.forEach(function (item) {
      result.push(
          {
            name: "背景圈",
            type: "gauge",
            radius: "90%",
            center: ["50%", "70%"],
            startAngle: 220,
            endAngle: -40,
            axisLine: {
              // 坐标轴线
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: [
                  [
                    1,
                    new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                      {
                        offset: 0,
                        color: "RGBa(49, 68, 118,0)",
                      },
                      {
                        offset: 0.3,
                        color: "rgba(49, 68, 118,0.5)",
                      },
                      {
                        offset: 1,
                        color: "rgba(49, 68, 118,0.8)",
                      },
                    ]),
                  ],
                ],
                width: 20,
              },
            },
            splitLine: {
              //分隔线样式
              show: false,
            },
            axisLabel: {
              //刻度标签
              show: false,
            },
            pointer: {
              show: false,
            },
            axisTick: {
              //刻度样式
              show: false,
            },
            detail: {
              show: true,
              offsetCenter: [0, "60%"],
              textStyle: {
                fontSize: 12,
                color: "#fff",
              },
              formatter: function () {
                return "SO2";
              },
            },
          },
          {
            name: "刻度",
            type: "gauge",
            radius: "68%",
            center: ["50%", "70%"],
            min: 0,
            max: 100,
            splitNumber: 4, //刻度数量
            startAngle: 220,
            endAngle: -40,
            axisLine: {
              show: true,
              lineStyle: {
                width: 1,
                color: [[1, "rgba(0,0,0,0)"]],
              },
            }, //仪表盘轴线
            axisLabel: {
              show: true,
              fontSize:12,
              color: "#eee",
              distance: 24,
            }, //刻度标签。
            axisTick: {
              show: true,
              splitNumber: 10, //刻度的段落数
              lineStyle: {
                color: "#fff",
                width: 1,
              },
              length: -5,
            }, //刻度样式
            splitLine: {
              show: true,
              length: -10,
              lineStyle: {
                color: "#fff",
              },
            }, //分隔线样式
            detail: {
              show: false,
            },
            pointer: {
              show: false,
            },
          },
          // 最外层含中间数据
          {
            name: item.name,
            type: "gauge",
            radius: "90%",
            center: ["50%", "70%"],
            startAngle: 220,
            endAngle: -45,
            min: 0,
            max: 100,
            axisLine: {
              show: true,
              lineStyle: {
                width: 20,
                color: [
                  [
                    item.value / 100,
                    new echarts.graphic.LinearGradient(0, 1, 1, 0, [
                      {
                        offset: 0,
                        color: "rgba(249, 103, 51,1)",
                      },
                      {
                        offset: 0.55,
                        color: "rgba(238, 146, 72,1)",
                      },
                      {
                        offset: 1,
                        color: "rgba(249, 178, 75,1)",
                      },
                    ]),
                  ],
                  [1, "rgba(255,255,255,.0)"],
                ],
              },
            },
            axisTick: {
              show: 0,
            },
            splitLine: {
              show: 0,
            },
            axisLabel: {
              show: 0,
            },
            pointer: {
              show: false,
            },
            detail: {
              show: true,
              offsetCenter: [0, 0],
              textStyle: {
                fontSize: 14,
                color: "#fff",
              },
            },
            itemStyle: {
              color: "rgba(255, 36, 74,.3)",
            },
            data: [
              {
                value: item.value,
              },
            ],
          }
      );
    });

    return result;
  })(),
});
const infoList = [
  {
    id: 11,
    name: "PM2.5",
    value: 24,
    valueMax: 30,
    icon: require("@/assets/images/wisdom/PM2.5.svg"),
  },
  {
    id: 22,
    name: "O3",
    value: 60,
    valueMax: 50,
    icon: require("@/assets/images/wisdom/PM2.5.svg"),
  },
  {
    id: 33,
    name: "PM10",
    value: 55,
    valueMax: 50,
    icon: require("@/assets/images/wisdom/PM10.svg"),
  },
  {
    id: 44,
    name: "NO2",
    value: 47,
    valueMax: 50,
    icon: require("@/assets/images/wisdom/二氧化碳.svg"),
  }, {
    id: 44,
    name: "CO₂",
    value: 47,
    valueMax: 50,
    icon: require("@/assets/images/wisdom/二氧化碳.svg"),
  }, {
    id: 44,
    name: "O₂",
    value: 47,
    valueMax: 50,
    icon: require("@/assets/images/wisdom/二氧化碳.svg"),
  }
];
</script>

<style lang="scss" scoped>
.box {
  @include boxWidth(510);
  @include boxhHeight(300);
  box-sizing: border-box;
  @include Padding(10, 10, 10, 10);
  position: relative;

  .tab {
    width: 100%;
    @include wHeight(24);
    @include LineHeight(24);
    display: flex;
    justify-content: space-between;

    .tabname {
      @include Width(105);
      @include wHeight(24);
      @include LineHeight(24);
      background-color: #124563;
      color: rgba(255, 255, 255, 0.78);
      text-align: center;
      @include BorderRadius(4);
      position: relative;
      cursor: pointer;

      &:nth-child(1),
      &:nth-child(2),
      &:nth-child(3){
        &:after {
          content: "";
          position: absolute;
          @include Right(-10);
          @include Width(1);
          @include wHeight(12);
          @include Top(6);
          background-color: rgba(255, 255, 255, 0.8);
        }
      }
    }

    .tabActive {
      background-color: #127aac;
      color: rgba(255, 255, 255, 1);
    }
  }

  .content {
    width: 100%;
    @include wHeight(164);
    display: flex;

    .info {
      flex: 1;

      .util {
        width: 100%;
        @include wHeight(40);
        @include LineHeight(40);
        @include PaddingRight(2);
        text-align: right;
        color: rgba(255, 255, 255, 0.658);
      }

      .title {
        width: 100%;
        @include wHeight(40);
        @include LineHeight(40);
        background: rgba(255, 255, 255, 0.1);
        position: relative;

        &::before {
          content: "";
          position: absolute;
          @include Left(1);
          @include Top(10);
          @include Width(1);
          @include wHeight(20);
          background-color: #fff;
        }

        &::after {
          content: "";
          position: absolute;
          @include Right(1);
          @include Top(10);
          @include Width(1);
          @include wHeight(20);
          background-color: #fff;
        }

        .text {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          color: rgba(255, 255, 255, 0.6);
          // font-weight: bold;
          @include FontSize(16);

          &::before {
            content: "";
            position: absolute;
            @include Left(-92);
            @include Top(20);
            @include Width(80);
            @include wHeight(1);
            background-color: rgba(255, 255, 255, 0.2);
          }

          &::after {
            content: "";
            position: absolute;
            @include Right(-92);
            @include Top(20);
            @include Width(80);
            @include wHeight(1);
            background-color: rgba(255, 255, 255, 0.2);
          }
        }
      }

      .list {
        width: 100%;
        @include wHeight(84);
        display: flex;
        flex-wrap: wrap;
        @include Padding(10, 0, 10, 0);

        .item {
          @include Width(130);
          @include wHeight(35);
          @include LineHeight(35);
          background: rgba(255, 255, 255, 0.1);
          display: flex;

          &:nth-child(1),
          &:nth-child(3),&:nth-child(5) {
            @include MarginRight(10);
          }

          &:nth-child(1),
          &:nth-child(2),
          &:nth-child(3),
          &:nth-child(4){
            @include MarginBottom(10);
          }

          .icon {
            @include Width(18);
            @include wHeight(18);
            @include MarginTop(8);
            @include MarginLeft(8);
            @include MarginRight(8);
          }

          .name {
            @include Width(40);
            @include FontSize(14);
            @include LineHeight(35);
            text-align: left;
          }

          .value {
            flex: 1;
            @include wHeight(35);
            @include LineHeight(35);
            text-align: right;
            @include PaddingRight(8);
            color: #05d00c;
            @include FontSize(18);
            font-weight: bold;
          }
        }
      }
    }
  }
}
</style>
