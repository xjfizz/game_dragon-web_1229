<template>
  <div class="tabs">
    <div class="tabs-top">
      <div
        @click="handleTabChange(1)"
        :class="[showTab === 1 ? 'active' : '', '']"
      >
        last 24th
      </div>
      <div
        @click="handleTabChange(2)"
        :class="[showTab === 2 ? 'active' : '', '']"
      >
        7 days
      </div>
      <div
        @click="handleTabChange(3)"
        :class="[showTab === 3 ? 'active' : '', '']"
      >
        30 days
      </div>
    </div>
    <div class="tabs-bottom">
      <div class="tabs-bottom-box box-1">
        <div class="round round-1"></div>
        <div class="tabs-bottom-box-right">
          <span>TOTAL VOLUME</span>
          <span>
            <img
              class="dms"
              src="../../../../assets/imgs/myMainland/bnb-coin.png"
              alt=""
            />5000,000,000</span
          >
        </div>
      </div>
      <div class="tabs-bottom-box box-2">
        <div class="round round-2"></div>
        <div class="tabs-bottom-box-right">
          <span>HIGHEST PRICE</span>
          <span>
            <img
              class="dms"
              src="../../../../assets/imgs/myMainland/bnb-coin.png"
              alt=""
            />5000,000,000</span
          >
        </div>
      </div>
      <div class="tabs-bottom-box box-3">
        <div class="round round-3"></div>
        <div class="tabs-bottom-box-right">
          <span>TOTAL SALE</span>
          <span>5000,000,000</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import burnHandle from "../use/day";
export default {
  setup() {
    const { state, handleTabChange } = burnHandle();
    return {
      ...toRefs(state),
      handleTabChange,
    };
  },
};
</script>

<style lang="less" scoped>
.tabs {
  width: 1200px;
  height: 184px;
  background: #282523;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.12);
}
.tabs-top {
  height: 69px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  line-height: 69px;
  display: flex;
  align-items: center;
  font-family: GothamRounded-Medium, GothamRounded;
  div {
    width: 127px;
    height: 100%;
    font-size: 16px;
    font-weight: 500;
    color: #8e8d8c;
    line-height: 69px;
    text-align: center;
    cursor: pointer;
    margin-right: 40px;
  }

  .active {
    color: #ffffff;
    border-bottom: 2px solid #ffc763;
  }
}
.tabs-bottom {
  display: flex;
  .box-1 {
    padding-left: 43px;
  }
  .box-2 {
    justify-content: center;
  }
  .box-3 {
    justify-content: flex-end;
    padding-right: 43px;
  }
  .tabs-bottom-box {
    flex: 1;
    height: 114px;
    display: flex;
    align-items: center;
    .round {
      width: 66px;
      height: 66px;

      border-radius: 50%;
    }
    .round-1 {
      background: #d58047;
    }
    .round-2 {
      background: #ffc763;
    }
    .round-3 {
      background: #707a83;
    }
    .tabs-bottom-box-right {
      padding-left: 16px;
      height: 47px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      span:first-of-type {
        display: block;
        height: 13px;
        font-size: 13px;
        color: #6c6a68;
        display: flex;
        align-items: center;
      }
      img {
        width: 16px;
        height: 15px;
        margin-right: 4px;
      }
      span:last-of-type {
        display: block;
        height: 30px;
        font-size: 20px;
        font-weight: 500;
        color: #ffffff;
      }
    }
  }
}
</style>
