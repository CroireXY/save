<template>
  <Box class="box0" direction="left" >
    <!-- <div class="bg-box"></div> -->
    <div class="info">
      <div class="time">
        {{ date }}
      </div>
      <div class="time">
        {{ day }}
      </div>
      <div class="time">
        {{ time }}
      </div>
    </div>
    <!-- <div class="icon-box">
      <div class="alarm-icon">
        <div class="label">氣溫</div>
      </div>

      <div class="weather-icon">
        <div class="label">東南風</div>
      </div>
      <div class="weather-icon">
        <div class="label">風速</div>
      </div>
      <div class="weather-icon">
        <div class="label">無警報</div>
      </div>
    </div> -->

    <div class="weather-box">
      <div class="alarm-item">
        <div class="label">氣溫</div>
        <div class="value">23°C</div>
        <img :src="getIcon('sunny.png')" class="icon" />
      </div>

      <div class="weather-item">
        <div class="label">東南風</div>
        <div class="value">2級</div>
        <img :src="getIcon('SE wind.png')" class="icon" />
      </div>
      <div class="weather-item">
        <div class="label">東南風</div>
        <div class="value">3km/h</div>
        <img :src="getIcon('windSpeed.png')" class="icon" />
      </div>
      <div class="weather-item">
        <div class="label">無警報</div>
        <div class="value">電磁</div>
        <img :src="getIcon('EMI.png')" class="icon" />
      </div>
    </div>
  </Box>
</template>

<script setup lang="ts">
import Box from "@/components/Box/index.vue";
defineProps<{
  date: any;
  day: any;
  time: any;
}>();

const getIcon = (file: string) => {
  return require(`@/assets/icons/smaller_icon/${file}`);
};
</script>

<style lang="scss" scoped>
.box0 {
  background-image: url("~@/assets/componentCard/time.png") no-repeat;
  @include boxWidth(560);
  @include boxwHeight(243);
  //   background-size: contain;

  //   @include wHeight(217);
  //   //   position: relative;
  //   @include MarginBottom(10);

  .info {
    background-image: linear-gradient(to right, #266dab, #29455d);
    // position: absolute;
    // @include Width(300);
    @include Padding(10, 24, 0, 0);
    display: flex;
    justify-content: space-between;
    .time {
      @include Width(108);
      // @include wHeight(30);
      @include LineHeight(30);
      @include FontSize(16);
      font-family: SJyunhei;
      // z-index: 1;
      flex: 1;
      text-align: center;
    }
    .line {
      @include Width(1);
      @include wHeight(13);
      @include MarginTop(10);
      background-color: rgba(255, 255, 255, 0.7);
      // z-index: 1;
    }
  }

  .weather-box {
    @include Padding(48, 24, 24, 24);
    display: flex;

    .alarm-item {
      @include Padding(0, 22, 0, 20);
      //   border-left: 1.5px solid rgba(255, 255, 255, 0.4);
      @include wHeight(31);

      .label {
        position: relative;
        @include Top(5);
        @include FontSize(20);
        color: rgba(255, 255, 255, 0.9);
        //   font-weight: bold;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        // z-index: 1;
      }
      .value {
        //@include LineHeight(23);
        position: relative;
        @include Bottom(-10);
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        @include FontSize(24);
        color: rgba(255, 255, 255, 0.9);
      }
    }

    .weather-item {
      @include Padding(0, 22, 0, 22);
      border-left: 1.5px solid rgba(255, 255, 255, 0.4);
      @include wHeight(70);

      .label {
        //@include LineHeight(23);
        position: relative;
        @include Top(5);
        @include FontSize(20);
        color: rgba(255, 255, 255, 0.9);
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        // font-weight: bold;
        // z-index: 1;
      }

      .value {
        //@include LineHeight(23);
        position: relative;
        @include Bottom(-10);
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        @include FontSize(24);
        color: rgba(255, 255, 255, 0.9);
      }

      &:first-child {
      }
    }
    .icon {
      position: relative;
      @include Top(20);
      @include Width(60);
      @include wHeight(60);
      // margin-left: 10px;
    }
  }
}
</style>
