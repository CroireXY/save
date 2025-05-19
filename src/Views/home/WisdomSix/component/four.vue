<template>
  <div class="box">
    <div class="electricity">10家重点企业月用电趋势</div>
    <div class="electricityList">
      <template v-for="item in electricityList" :key="item.id">
        <div class="item">{{ item.name }}</div>
      </template>
    </div>

    <div class="electricityCharts">
      <V3Echarts
        :options="electricityChartsOption"
        :width="490"
        :height="100"
        container="wisdomsix_one"
      />
    </div>
    <div class="otherCharts">
      <div class="item">
        <div class="title">专项组复产达到生产水平70%以上的重点企业数</div>
        <V3Echarts
          :options="otherChartsOneOption"
          :width="228"
          :height="180"
          container="wisdomsix_two"
        />
      </div>
      <div class="item">
        <div class="title">用电能耗同比趋势</div>
        <V3Echarts
          :options="otherChartsTwoOption"
          :width="228"
          :height="170"
          container="wisdomsix_three"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import V3Echarts from "@/components/V3Echarts/index.vue";
const electricityList = ref([
  {
    id: 1,
    name: "乐金显示（广州）有限公司",
  },
  {
    id: 2,
    name: "加特可（广州）自动变速箱有限公司",
  },
  {
    id: 3,
    name: "广州宝洁有限公司",
  },
  {
    id: 4,
    name: "安利（中国）日用品有限公司",
  },
  {
    id: 5,
    name: "鞍钢联众（广州）不锈钢有限公司",
  },
  {
    id: 6,
    name: "中国石油化工股份有限公司广州分公司",
  },
  {
    id: 7,
    name: "广州本田汽车有限公司",
  },
  {
    id: 8,
    name: "中国南方电网有限责任公司",
  },
  {
    id: 9,
    name: "捷普电子（广州）有限公司",
  },
  {
    id: 10,
    name: "乐金显示（中国）有限公司",
  },
]);

const electricityChartsOption = ref({
  grid: {
    top: "10%",
    left: "2%",
    bottom: "0%",
    right: "2%",
    containLabel: true,
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
      // label: {
      //   show: true,
      // },
    },
    textStyle: {
      color: "#fff",
      fontSize:12,
    },
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,.6)",
    borderWidth: 1,
    borderColor: "transparent",
  },
  xAxis: {
    data: ["2020-05", "2020-06", "2020-07", "2020-08", "2020-09", "2020-10"],
    axisLine: {
      show: true, //隐藏X轴轴线
      lineStyle: {
        color: "rgba(255,255,255,0.5)",
      },
    },
    axisTick: {
      show: false, //隐藏X轴刻度
    },
    axisLabel: {
      show: true,
      textStyle: {
        fontSize:12,
        color: "rgba(255,255,255,0.7)", //X轴文字颜色
      },
    },
  },
  yAxis: {
    type: "value",
    splitLine: {
      show: false,
    },
    splitNumber: 2,
    axisTick: {
      show: false,
    },
    axisLine: {
      show: false,
      lineStyle: {
        color: "rgba(255,255,255,0.7)",
      },
    },
    axisLabel: {
      show: true,
      textStyle: {
        fontSize:12,
        color: "rgba(255,255,255,0.7)",
      },
    },
  },
  series: [
    {
      name: "企业用电",
      type: "line",
      showAllSymbol: true,
      symbol: "circle",
      symbolSize: 10,
      label: {
        show: true,
        position: "top",
        color: "rgba(255,255,255,0.7)",
        fontSize:12,
      },
      itemStyle: {
        color: "#fff",
      },
      lineStyle: {
        color: "#11a4e2",
      },
      areaStyle: {
        color: "rgba(5,140,255, 0.05)",
      },
      data: [5594200, 5646300, 6086650, 5713400, 5350050, 4453150],
    },
  ],
});

const otherChartsOneOption = ref({
  grid: {
    left: "3%",
    right: "8%",
    bottom: "0%",
    top: "5%",
    containLabel: true,
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "none",
    },
    formatter: function (params: any) {
      return (
        params[0].name +
        "<br/>" +
        "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:rgba(36,207,233,0.9)'></span>" +
        params[0].seriesName +
        " : " +
        Number(
          (params[0].value.toFixed(4) / 10000).toFixed(2)
        ).toLocaleString() +
        " 万元<br/>"
      );
    },
  },
  xAxis: {
    show: false,
    type: "value",
  },
  yAxis: [
    {
      type: "category",
      inverse: true,
      axisLabel: {
        show: true,
        textStyle: {
          color: "rgba(255,255,255,0.7)",
          fontSize:12,
        },
      },
      splitLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      data: ["信息软件", "服务业专项", "建筑业专项"],
    },
    {
      type: "category",
      inverse: true,
      axisTick: "none",
      axisLine: "none",
      show: true,
      axisLabel: {
        textStyle: {
          color: "rgba(255,255,255,0.7)",
          fontSize:12,
        },
        // formatter: function (value: any) {
        //   if (value >= 10000) {
        //     return (value / 10000).toLocaleString() + "万";
        //   } else {
        //     return value.toLocaleString();
        //   }
        // },
      },
      data: [104, 91, 26],
    },
  ],
  series: [
    {
      name: "企业数",
      type: "bar",
      zlevel: 1,
      itemStyle: {
        barBorderRadius: 30,
        color: "#12a6e6",
      },
      barWidth: 14,
      data: [104, 91, 26],
    },
    {
      name: "",
      type: "bar",
      barWidth: 14,
      barGap: "-100%",
      data: [200, 200, 200],
      itemStyle: {
        color: "#274254",
        barBorderRadius: 30,
      },
    },
  ],
});
const otherChartsTwoOption = ref({
  grid: {
    top: "22%",
    left: "2%",
    bottom: "0%",
    right: "2%",
    containLabel: true,
  },
  legend: {
    data: ["今年", "往年"],
    itemWidth: 14,
    itemHeight: 14,
    itemGap: 20,
    textStyle: {
      fontSize:12,
      color: "#fff",
    },
    right: 8,
    top: 12,
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
      // label: {
      //   show: true,
      // },
    },
    textStyle: {
      color: "#fff",
      fontSize:12,
    },
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,.6)",
    borderWidth: 1,
    borderColor: "transparent",
  },
  xAxis: {
    data: ["2020-05", "2020-06", "2020-07", "2020-08", "2020-09", "2020-10"],
    axisLine: {
      show: true, //隐藏X轴轴线
      lineStyle: {
        color: "rgba(255,255,255,0.5)",
      },
    },
    axisTick: {
      show: false, //隐藏X轴刻度
    },
    axisLabel: {
      show: true,
      textStyle: {
        fontSize:12,
        color: "rgba(255,255,255,0.7)", //X轴文字颜色
      },
    },
  },
  yAxis: {
    type: "value",
    name: "",
    nameTextStyle: {
      align: "left",
      padding: [0, 0, 0, -30],
      color: "rgba(255, 255, 255, 0.7)",
      fontSize:12,
      fontWeight: 800,
    },
    splitLine: {
      show: false,
    },
    splitNumber: 2,
    axisTick: {
      show: false,
    },
    axisLine: {
      show: false,
      lineStyle: {
        color: "rgba(255,255,255,0.7)",
      },
    },
    axisLabel: {
      show: true,
      textStyle: {
        fontSize:12,
        color: "rgba(255,255,255,0.7)",
      },
    },
  },
  series: [
    {
      name: "今年",
      type: "line",
      showAllSymbol: true,
      symbol: "circle",
      symbolSize: 10,
      label: {
        show: true,
        position: "top",
        color: "#11a4e2",
        fontSize:12,
      },
      itemStyle: {
        color: "#fff",
      },
      lineStyle: {
        color: "#11a4e2",
        width: 4,
      },
      data: [9.47, 10.23, 11.37, 11.07, 10.98, 9.85],
    },
    {
      name: "往年",
      type: "line",
      showAllSymbol: true,
      symbol: "circle",
      symbolSize: 10,
      label: {
        show: false,
        position: "top",
        color: "#13e1bc",
        fontSize:12,
      },
      itemStyle: {
        color: "#fff",
      },
      lineStyle: {
        color: "#13e1bc",
        width: 4,
      },
      data: [0, 0, 0, 0, 0, 0],
    },
  ],
});
</script>

<style lang="scss" scoped>
.box {
  @include boxWidth(510);
  @include boxhHeight(602);
  box-sizing: border-box;
  @include Padding(15, 15, 15, 15);
  position: relative;
  .electricity {
    width: 100%;
    @include wHeight(30);
    @include LineHeight(30);
  }
  .electricityList {
    width: 100%;
    @include wHeight(200);
    display: flex;
    flex-wrap: wrap;
    .item {
      @include wHeight(20);
      @include LineHeight(20);
      @include FontSize(12);
      @include PaddingLeft(18);
      color: rgba(255, 255, 255, 0.55);
      position: relative;
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
      &:nth-child(2),
      &:nth-child(4),
      &:nth-child(6),
      &:nth-child(8),
      &:nth-child(10) {
        @include MarginLeft(30);
      }
    }
  }
  .electricityCharts {
    width: 100%;
    @include wHeight(105);
    @include MarginTop(5);
  }
  .otherCharts {
    width: 100%;
    @include wHeight(150);
    @include MarginTop(10);
    display: flex;
    justify-content: space-between;
    .item {
      @include Width(228);
      @include wHeight(160);
      .title {
        width: 100%;
        @include wHeight(45);
        @include LineHeight(24);
        @include FontSize(16);
        color: rgba(255, 255, 255, 0.7);
      }
      &:nth-child(2) .title {
        @include wHeight(30);
      }
    }
  }
}
</style>
