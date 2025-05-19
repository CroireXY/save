<template>
    <div class="danger-container">
        <p>发生车祸!!!</p>
        <div class="danger-content">
          <div class="item">时间:2022-02-02</div>
          <div class="item">肇事车辆1:粤A111111</div>
          <div class="item">肇事车辆2:粤A222222</div>
          <div class="item">肇事司机1:李xx</div>
          <div class="item">肇事司机2:李xx</div>
          <div class="item">处理交警:李xx</div>
          <div class="item">原因:超速</div>
          <div class="item">罚款:5000元</div>
          <div class="item">扣分:12分</div>
        </div>
    </div>
</template>

<script lang="ts" setup>
//广州塔路和阅江西路
</script>

<style lang="scss" scoped>
.danger-container {
    position: relative;
    top: 200px;
    left: 55%;
    transform: translateX(-100%);
    width: 350px;
    height: 100px;
    background: url('../../assets/images/dangerous/icon_dangerous.png') no-repeat;
    z-index: 99;

    p {
        position: absolute;
        top: 30px;
        left: 80px;
        font-weight: 500;
    }
  .danger-content{
    position: absolute;
    top: 75px;
    left: 50px;
    width: 250px;
    height: 380px;
    background-color: rgba(76, 47, 47, 0.5);
    border: 1px solid #000;
    padding: 10px;
    .item {
      font-size: 24px;
      margin-bottom: 10px;
    }
  }
}
</style>
