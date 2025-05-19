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
          <img src="@/assets/images/wisdom/下一步.svg" alt="" />
          <span>{{ item.tabName }}</span>
        </div>
      </template>
    </div>
    <div class="content">
      <Vue3SeamlessScroll
        :singleWaitTime="1500"
        :singleHeight="67"
        hover
        :list="noticeList"
      >
        <template v-for="item in noticeList" :key="item.id">
          <div class="item">
            <div class="time">{{ item.time }}</div>
            <div class="info">{{ item.info }}</div>
          </div>
        </template>
      </Vue3SeamlessScroll>
    </div>
    <div class="charts">
      <div class="title">各景区旅客数量统计</div>
      <V3Echarts
        :options="option"
        :width="490"
        :height="310"
        container="wisdomtwo_one"
      />
    </div>

    <div class="meetingcontent">
      <div class="title">
        <span>安全事件名称</span>
        <span>类型</span>
        <span>占比</span>
      </div>
      <div class="list">
        <template v-for="item in firmlist" :key="item.id">
          <div class="item">
            <span>{{ item.name }}</span>
            <span>{{ item.peopleNum }}</span>
            <span>{{ item.time }}</span>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import V3Echarts from "@/components/V3Echarts/index.vue";
import { Vue3SeamlessScroll } from "vue3-seamless-scroll";
let TabCurrentIndex = ref(1);
const tabList = [
  {
    id: 2,
    tabName: "广东省",
  },
  {
    id: 3,
    tabName: "广州市",
  },
];
const TabClickEvent = (id: number) => (TabCurrentIndex.value = id);

const noticeList = [
  {
    id: 1,
    info: "“广”字造型别具创意，登塔可俯瞰广州市景，还能体验极限项目",
    time: "广州塔",
  },
  {
    id: 2,
    info: "广州知名的商业街，欣赏岭南风情的骑楼建筑，逛街购物吃美食",
    time: "上下九步行街",
  },
  {
    id: 3,
    info: "《爸爸去哪儿》的拍摄地，可以看到世界各地的动物，不乏珍稀品种，还有萌萌的熊猫三胞胎",
    time: "长隆野生动物世界",
  },
];

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
    data: ["当前客流量", "最大客流量"],
    itemWidth: 6,
    itemHeight: 6,
    itemGap: 30,
    textStyle: {
      fontSize:12,
      color: "#fff",
    },
    right: 8,
    top: 12,
  },
  grid: {
    top: "25%",
    left: "0%",
    bottom: "5%",
    right: "0%",
    containLabel: true,
  },
  xAxis: {
    data: [
      "广州塔",
      "上下九步行街",
      "北京路",
      "长隆野生动物世界",
      "长隆水上世界"
    ],
    axisLabel: {
      show: true,
      color: "#fff",
      fontSize:12,
      fontFamily: "Oppo",
      overflow: "break",
      width: 60,
      interval: 0,
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
      name: "已宣贯",
      type: "bar",
      barWidth: 8,
      itemStyle: {
        color: "#10a9eb",
        // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        //   { offset: 0, color: "rgba(21,105,215,1)" },
        //   { offset: 0.5, color: "rgba(21,105,215,0.8)" },
        //   { offset: 1, color: "rgba(99,189,219,1)" },
        // ]),
      },
      barGap: "100%",
      label: {
        show: true,
        position: "top",
        color: "#10a9eb",
        fontSize:12,
      },
      data: [14, 22, 14, 17, 6],
    },
    {
      name: "落实中",
      type: "bar",
      barWidth: 8,
      itemStyle: {
        color: "#08f496",
        // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        //   { offset: 0, color: "rgba(180,49,255,1)" },
        //   { offset: 0.5, color: "rgba(180,49,255,0.8)" },
        //   { offset: 1, color: "rgba(99,189,219,1)" },
        // ]),
      },
      label: {
        show: true,
        position: "top",
        color: "#08f496",
        fontSize:12,
      },
      data: [5, 8, 6, 9, 3],
    },
  ],
});

const firmlist = ref([
  {
    id: 1,
    name: "广州塔发生交通事故",
    peopleNum: "交通事故",
    time: "2022/5/28",
  },
  {
    id: 2,
    name: "长隆野生动物世界发生人流拥堵",
    peopleNum: "人流过多",
    time: "2022/5/27",
  },
  {
    id: 3,
    name: "长洲岛基础设施发生故障",
    peopleNum: "设施故障",
    time: "2022/5/26",
  }, {
    id: 1,
    name: "广州塔发生交通事故",
    peopleNum: "交通事故",
    time: "2022/5/28",
  },
  {
    id: 2,
    name: "长隆野生动物世界发生人流拥堵",
    peopleNum: "人流过多",
    time: "2022/5/27",
  },
  {
    id: 3,
    name: "长洲岛基础设施发生故障",
    peopleNum: "设施故障",
    time: "2022/5/26",
  },
]);
</script>

<style lang="scss" scoped>
.box {
  @include boxWidth(510);
  @include boxhHeight(900);
  box-sizing: border-box;
  @include Padding(10, 10, 10, 10);
  position: relative;
  .tab {
    width: 100%;
    @include wHeight(24);
    @include LineHeight(24);
    display: flex;
    justify-content: space-between;
    @include MarginTop(5);
    @include MarginBottom(15);
    .tabname {
      @include Width(240);
      @include wHeight(24);
      @include LineHeight(24);
      background-color: #124563;
      @include BorderRadius(4);
      position: relative;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      color: rgba(255, 255, 255, 0.78);
      &:nth-child(1),
      &:nth-child(2) {
        &:after {
          content: "";
          position: absolute;
          @include Right(-18);
          @include Width(1);
          @include wHeight(12);
          @include Top(6);
          background-color: rgba(255, 255, 255, 0.8);
        }
      }
      img {
        width: 25px;
        display: inline-block;
      }
      span {
        display: inline-block;
      }
    }
    .tabActive {
      background-color: #127aac;
      color: rgba(255, 255, 255, 1);
    }
  }
  .content {
    width: 100%;
    @include wHeight(300);
    overflow-y: scroll;
    @include MarginBottom(10);
    .item {
      width: 100%;
      @include wHeight(45);
      @include LineHeight(18);
      background-color: rgba(255, 255, 255, 0.1);
      @include BorderRadius(2);
      @include Padding(5, 5, 5, 20);
      display: flex;
      position: relative;
      @include MarginBottom(5);
      cursor: pointer;
      &::before {
        content: "";
        position: absolute;
        @include Left(5);
        top: 50%;
        transform: translateY(-50%);
        @include Width(6);
        @include wHeight(6);
        @include BorderRadius(2);
        background-color: #10aff3;
      }
      .info {
        @include FontSize(12);
        color: rgba(255, 255, 255, 0.7);
        word-break: break-all;
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        @include Width(350);
      }
      .time {
        @include FontSize(12);
        color: rgba(255, 255, 255, 0.8);
        @include MarginRight(10);
        @include LineHeight(35);
        @include Width(150);
        letter-spacing: 1.2px;
      }
    }
  }
  .charts {
    width: 100%;
    @include wHeight(360);
    position: relative;
    .title {
      width: 100%;
      @include wHeight(35);
      @include LineHeight(35);
      position: absolute;
    }
  }

  .meetingcontent {
    width: 100%;
    overflow: auto;
    @include wHeight(390);
    .title {
      width: 100%;
      @include wHeight(26);
      @include LineHeight(26);
      background: rgba(255, 255, 255, 0.1);
      display: flex;
      span {
        display: inline-block;
        @include wHeight(26);
        @include LineHeight(26);
        &:nth-child(1) {
          @include Width(307);
          text-align: left;
        }
        &:nth-child(2) {
          @include Width(90);
          text-align: center;
        }
        &:nth-child(3) {
          @include Width(90);
          text-align: center;
        }
      }
    }
    .list {
      width: 100%;
      @include wHeight(391);
      overflow-y: scroll;
      .item {
        width: 100%;
        @include wHeight(70);
        @include LineHeight(70);
        cursor: pointer;
        display: flex;
        border-bottom: 1px solid rgba(255, 255, 255, 0.3);
        span {
          width: 100%;
          display: inline-block;
          @include wHeight(70);
          @include FontSize(12);
          color: rgba(255, 255, 255, 0.78);
          &:nth-child(1) {
            @include Width(307);
            @include LineHeight(18);
            text-align: left;
            word-break: break-all;
            text-overflow: ellipsis;
            overflow: hidden;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 4;
            display: flex;
            justify-content: flex-start;
            align-items: center;
          }
          &:nth-child(2) {
            @include LineHeight(70);
            @include Width(90);
            text-align: center;
          }
          &:nth-child(3) {
            @include LineHeight(70);
            @include Width(90);
            text-align: center;
          }
        }
        &:hover {
          background-color: rgba(255, 255, 255, 0.05);
        }
      }
    }
  }
}
::-webkit-scrollbar {
  @include Width(0.5);
  @include hHeight(0.5);
}
</style>
