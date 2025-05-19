<template>
  <div class="box">
    <div class="left">
      <div class="tab">
        <span>问题名称</span>
        <span>问题数</span>
      </div>
      <div class="list">
        <template v-for="item in problemList" :key="item.id">
          <div class="item">
            <span>{{ item.name }}</span>
            <span>{{ item.value }}<i>家</i></span>
          </div>
        </template>
      </div>
    </div>
    <div class="right">
      <V3Echarts
        :options="option"
        :width="100"
        :height="140"
        container="wisdomsix_four"
      />
      <div class="aside">
        <div class="item">
          <span>已办结</span>
          <span>157</span>
        </div>
        <div class="item">
          <span>处理中</span>
          <span>5</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import V3Echarts from "@/components/V3Echarts/index.vue";
const problemList = [
  {
    id: 1,
    name: "其它",
    value: 60,
  },
  {
    id: 2,
    name: "通行停车",
    value: 8,
  },
  {
    id: 3,
    name: "准入审批",
    value: 4,
  },
  {
    id: 4,
    name: "停车超时",
    value: 4,
  },
  {
    id: 5,
    name: "审批",
    value: 4,
  },
  {
    id: 3,
    name: "准入审批",
    value: 4,
  },
  {
    id: 4,
    name: "停车超时",
    value: 4,
  }
];

const option = ref({
  color: ["#ecac36", "rgba(47,233,196,0.2)"],
  series: [
    {
      name: "办结情况",
      type: "pie",
      radius: ["75%", "88%"],
      itemStyle: {
        label: {
          show: false,
        },
        labelLine: {
          show: false,
        },
      },
      hoverAnimation: false,
      label: {
        show: false,
      },
      data: [
        {
          value: 97,
          name: "已办结",
          itemStyle: {
            label: {
              show: false,
            },
            labelLine: {
              show: false,
            },
          },
        },
        {
          name: "处理中",
          value: 3,
        },
      ],
    },
    {
      name: "",
      type: "pie",
      radius: ["40%", "75%"],
      itemStyle: {
        opacity: 0.1,
        label: {
          show: false,
        },
        labelLine: {
          show: false,
        },
      },
      hoverAnimation: false,
      label: {
        show: false,
      },
      data: [
        {
          value: 97,
          name: "已办结",
          itemStyle: {
            label: {
              show: false,
            },
            labelLine: {
              show: false,
            },
          },
        },
        {
          name: "处理中",
          value: 3,
        },
      ],
    },
    {
      name: "",
      type: "pie",
      radius: ["95%", "100%"],
      itemStyle: {
        color: "rgba(255,255,255,0.2)",
        label: {
          show: false,
        },
        labelLine: {
          show: false,
        },
      },
      hoverAnimation: false,
      label: {
        show: false,
      },
      data: [1],
    },
  ],
});
</script>

<style lang="scss" scoped>
.box {
  @include boxWidth(510);
  @include boxhHeight(300);
  box-sizing: border-box;
  @include Padding(10, 10, 10, 10);
  position: relative;
  display: flex;
  justify-content: space-between;

  .left {
    @include Width(230);
    height: 100%;
    overflow: auto;
    .tab {
      width: 100%;
      @include wHeight(24);
      @include LineHeight(24);
      background-color: rgba(255, 255, 255, 0.1);
      color: rgba(255, 255, 255, 0.7);
      display: flex;
      justify-content: space-between;
    }
    .list {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .item {
        border-top: 1px solid rgba(255, 255, 255, 0.1);
        color: rgba(255, 255, 255, 0.7);
        @include wHeight(50);
        @include LineHeight(50);
        width: 100%;
        display: flex;
        justify-content: space-between;
      }
    }
  }
  .right {
    @include Width(230);
    height: 100%;
    display: flex;
    align-items: center;
    .aside {
      flex: 1;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      @include Padding(10, 0, 10, 0);
      .item {
        width: 100%;
        @include wHeight(25);
        @include LineHeight(25);
        @include PaddingLeft(16);
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        color: rgba(255, 255, 255, 0.7);
        position: relative;
        display: flex;
        justify-content: space-between;
        &::before {
          content: "";
          position: absolute;
          @include Left(5);
          top: 50%;
          transform: translateY(-50%);
          @include Width(6);
          @include wHeight(6);
          @include BorderRadius(2);
          background-color: #fff;
        }
        span {
          display: inline-block;
          @include wHeight(25);
          @include LineHeight(25);
          font-weight: bold;
          &:nth-child(2) {
            @include FontSize(18);
          }
        }

        &:nth-child(1)::before {
          content: "";
          position: absolute;
          @include Left(5);
          top: 50%;
          transform: translateY(-50%);
          @include Width(6);
          @include wHeight(6);
          @include BorderRadius(2);
          background-color: #ecac36;
        }
        &:nth-child(1) span:nth-child(2) {
          color: #ecac36;
        }
      }
    }
  }
}
</style>
