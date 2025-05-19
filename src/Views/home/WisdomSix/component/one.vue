<template>
  <div class="box">
    <div class="infoList">
      <template v-for="item in infoList" :key="item.id">
        <div class="item">{{ item.name }}</div>
      </template>
    </div>

    <div class="title">
      <div class="text">“暖企8条”的通知</div>
      <div class="btn">
        <span class="prev" />
        <span class="next" />
      </div>
    </div>
    <div class="content">
      为深入贯彻落实习近平总书记关于坚决打赢新型冠状病毒感染的肺炎疫情防控狙击战的重要指示和2约3日中共中央政治局常务委员会会议精神，全面落实国家和省、市关于疫情防控的决策部署和工作要求，支持企业在做好疫情防控工作的前提下全面复工复产，实现“中小企业能办大事”，特制定广州市黄埔区、广州开发区、广州高新区“暖企8条”
    </div>
  </div>
</template>

<script lang="ts" setup>
const infoList = [
  {
    id: 1,
    name: "暖企8条",
  },
  {
    id: 2,
    name: "四个“黄金10条”2.0版",
  },
  {
    id: 3,
    name: "一十百千万吹响复工复产集结号",
  },
];
</script>

<style lang="scss" scoped>
.box {
  @include boxWidth(510);
  @include boxhHeight(300);
  box-sizing: border-box;
  @include Padding(10, 10, 10, 10);
  position: relative;
  .infoList {
    width: 100%;
    @include wHeight(80);
    display: flex;
    flex-wrap: wrap;
    .item {
      background-color: rgba(255, 255, 255, 0.1);
      color: rgba(255, 255, 255, 0.7);
      position: relative;
      @include MarginBottom(8);
      @include PaddingLeft(20);
      @include wHeight(34);
      @include LineHeight(34);
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

      &:nth-child(1) {
        @include Width(235);
        @include MarginRight(18);
      }
      &:nth-child(2) {
        @include Width(235);
      }
      &:nth-child(3) {
        @include Width(488);
      }
    }
  }
  .title {
    width: 100%;
    @include wHeight(40);
    @include LineHeight(40);
    display: flex;
    justify-content: space-between;
    align-items: center;
    .text {
      @include FontSize(14);
      color: rgba(255, 255, 255, 0.7);
    }
    .btn {
      @include Width(50);
      display: flex;
      justify-content: space-between;
      opacity: 0.8;
      transform: scale(0.89);
      transform-origin: 0 0;
      .prev {
        display: inline-block;
        @include Width(20);
        @include wHeight(20);
        @include BorderRadius(20);
        background-color: rgba(255, 255, 255, 0.5);
        position: relative;
        cursor: pointer;
        &::before {
          content: "";
          position: absolute;
          @include Left(4);
          @include Top(10);
          transform: translateY(-50%);
          width: 0;
          height: 0;
          border-width: 8px;
          border-color: rgba(255, 255, 255, 1) transparent transparent
            rgba(255, 255, 255, 1);
          transform: rotate(-45deg);
          transform-origin: 0 0;
          border-style: solid;
        }
      }
      .next {
        display: inline-block;
        @include Width(20);
        @include wHeight(20);
        @include BorderRadius(20);
        background-color: rgba(255, 255, 255, 0.5);
        position: relative;
        cursor: pointer;
        &::before {
          content: "";
          position: absolute;
          @include Left(16);
          @include Top(10);
          transform: translateY(-50%);
          width: 0;
          height: 0;
          border-width: 8px;
          border-color: rgba(255, 255, 255, 1) transparent transparent
            rgba(255, 255, 255, 1);
          transform: rotate(135deg);
          transform-origin: 0 0;
          border-style: solid;
        }
      }
    }
  }
  .content {
    width: 100%;
    @include wHeight(70);
    @include Padding(2, 2, 2, 2);
    @include LineHeight(16);
    @include FontSize(12);
    @include PaddingLeft(14);
    position: relative;
    color: rgba(255, 255, 255, 0.7);
    background-color: rgba(255, 255, 255, 0.1);
    &::before {
      content: "";
      position: absolute;
      @include Left(5);
      @include Top(10);
      transform: translateY(-50%);
      @include Width(6);
      @include wHeight(6);
      @include BorderRadius(2);
      background-color: #10aff3;
    }
  }
}
</style>
