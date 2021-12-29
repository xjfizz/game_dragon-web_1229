<template>
  <div class="top-title-main">
    <div class="top-title-main-wrap">
      <div class="item">
        <div class="item-top">Pool Value</div>
        <div class="item-bottom">
          <div class="bottom-unit">$</div>
          <div class="bottom-value">{{topData.poolValue || 0}}</div>
        </div>
      </div>

      <div class="item">
        <div class="item-top">Volume(24h)</div>
        <div class="item-bottom">
          <div class="bottom-unit">$</div>
          <div class="bottom-value">{{swapTotal.midData || 0}}</div>
        </div>
      </div>

      <div class="item">
        <div class="item-top">Current Price</div>
        <div class="item-bottom">
          <div class="bottom-unit">$</div>
          <div class="bottom-value">{{swapTotal.rightData || 4.9}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, toRefs } from "vue";
import { useRouter } from "vue-router";

import common from "@/utils/common";
import lbpHandle from "../use/index";

export default {
  name: "topTtitle",
  components: {},
  setup() {
    const router = useRouter();
    const state = reactive({});

    onMounted(() => {
      common.goTopScroll();
      // getSwapTotal()
    });
    const {lbpState,getSwapTotal} =lbpHandle()

    return {
      ...toRefs(state),
      ...toRefs(lbpState),
    };
  },
};
</script>

<style lang="less" scoped >
.top-title-main {
  height: 144px;
  background: #1a1716;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  margin-top: 72px;

  .top-title-main-wrap {
    display: flex;
    justify-content: space-around;
    padding: 45px 32px;
     .item:last-child{
       border-right:none;
     }
      .item:first-child{
       border-left:none;
     }
    .item {
      // padding-right: 44px;
      // padding-left: 42px;
      border-right: 1px solid rgba(255, 255, 255, 0.12);
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .item-top {
        font-size: 14px;
        font-family: GothamRounded-Book, GothamRounded;
        font-weight: normal;
        color: rgba(255, 255, 255, 0.48);
        white-space:nowrap;
      }
      .item-bottom {
        display: flex;
        align-items: flex-end;
        margin-top: 4px;
        // width: 150px;
        .bottom-unit {
          height: 21px;
          font-size: 14px;
          font-family: GothamRounded-Book, GothamRounded;
          font-weight: normal;
          color: #ffffff;
          line-height: 21px;
        }
        .bottom-value {
          height: 30px;
          font-size: 28px;
          font-family: GothamRounded-Medium, GothamRounded;
          font-weight: 500;
          color: #ffffff;
          line-height: 34px;
        }
      }
    }
  }
}
</style>

