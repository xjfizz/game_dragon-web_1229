<template>
  <div class="bottom-select-main">
    <div class="bottom-select-main-left">
      {{ haveSelectedList.length || 0 }} items have been selected
    </div>
    <div class="bottom-select-main-right">
      <div class="btns">
        <div class="clear-btn" @click="clearSelect">clear</div>

        <div class="withdrawal-btn" @click="withdrawl">Batch Withdrawal</div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, toRefs } from "vue";
import { useRouter } from "vue-router";
import Header from "@/components/HeaderMarketPlace";

import common from "@/utils/common";
import withdrawlDmpHandle from "@/views/pc/myMainland/use/withdrawlDmp";
import tableNotWithDrawn from "./table/table-not-withdrawn";
import tableWithDrawn from "./table/table-withdrawn";
import page from "@/components/page/index.vue";
export default {
  components: {
    Header,
    tableNotWithDrawn,
    tableWithDrawn,
    page,
  },
  setup() {
    const router = useRouter();
    const state = reactive({});

    const { withdrawlDmpState, withdrawl,clearSelect } = withdrawlDmpHandle();
    onMounted(() => {
    //  common.goTopScroll();
    });

    return {
      ...toRefs(state),
      ...toRefs(withdrawlDmpState),
      withdrawl,
      clearSelect,
    };
  },
};
</script>

<style lang="less" scoped >
.bottom-select-main {
  height: 66px;
  background: #ffc763;
  box-shadow: 0px -4px 10px 0px rgba(9, 9, 10, 0.48);
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  .bottom-select-main-left {
    font-size: 16px;
    font-family: GothamRounded-Medium, GothamRounded;
    font-weight: 500;
    color: #2e0b00;
  }
  .bottom-select-main-right {
    .btns {
      display: flex;
      align-items: center;
      .clear-btn {
        cursor: pointer;
        font-size: 16px;
        font-family: GothamRounded-Book, GothamRounded;
        font-weight: normal;
        color: #2e0b00;
        border-bottom: 1px solid rgba(46, 11, 0, 1);
        margin-right: 32px;
      }
      .clear-btn:hover {
        opacity: 0.68;
      }
      .withdrawal-btn {
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 178px;
        height: 50px;
        border-radius: 25px;
        border: 1px solid #2e0b00;
        font-size: 16px;
        font-family: GothamRounded-Medium, GothamRounded;
        font-weight: 500;
        color: #2e0b00;
      }
      .withdrawal-btn:hover {
        opacity: 0.68;
      }
    }
  }
}
</style>