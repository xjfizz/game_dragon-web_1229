<template>
  <div class="index-main box-bc">
    <dragonBoxBuy v-if="dragonBoxBuyShow"></dragonBoxBuy>
    <openDragonBox v-if="openDragonBoxShow"></openDragonBox>

    <div  v-if="openBoxSuccessShow" class="modal-backdrop"></div>
    <transition name="scale">
      <openBoxSuccess v-if="openBoxSuccessShow"></openBoxSuccess>
    </transition>

    <claimDms v-if="claimDmsShow"></claimDms>
    <div class="bind-box-index">
      <div class="bind-box-index-top">
        <left></left>
        <right></right>
      </div>
      <div class="bind-box-index-bottom">
        <bottom></bottom>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, onBeforeUnmount, toRefs } from "vue";
import { useRouter } from "vue-router";

import common from "@/utils/common";
import myMainland from "@/views/pc/myMainland/use/myMainland";
import blindBoxHandle from "@/views/pc/myMainland/use/blindBox";
import Moment from "moment";
import left from "./left/index.vue";
import right from "./right/index.vue";
import bottom from "./bottom/index.vue";
import dragonBoxBuy from "./components/dragonBoxBuy.vue";
import openDragonBox from "./components/openDragonBox.vue";
import openBoxSuccess from "./components/openBoxSuccess.vue";
import claimDms from "./components/claimDms.vue";
export default {
  name: "blindBox",
  components: {
    left,
    right,
    bottom,
    dragonBoxBuy,
    openDragonBox,
    openBoxSuccess,
    claimDms,
  },
  setup() {
    const router = useRouter();
    const state = reactive({});
    onMounted(async () => {
      await init();
    });
    const { init, blindBoxState } = blindBoxHandle();

    onBeforeUnmount(() => {
      if (
        blindBoxState.localDragonSKullForm &&
        blindBoxState.localDragonSKullForm.countDownFn
      ) {
        clearInterval(blindBoxState.localDragonSKullForm.countDownFn);
      }
    });
    return {
      ...toRefs(state),
      ...toRefs(blindBoxState),
    };
  },
};
</script>

<style scoped lang="less">
.bind-box-index {
  .bind-box-index-top {
    display: flex;
    justify-content: space-between;
    // height: 535px;
    height: 555px;

  }
  .bind-box-index-bottom {
    margin-top: 40px;
  }
}
</style>

<style lang="less">
.bind-box-index {
  .el-loading-mask {
    //background: rgba(0, 0, 0, 0.6);
    background: linear-gradient(180deg, #473222 0%, #221d1d 100%);
    opacity: 0.75;
    .el-loading-spinner {
      top: 20%;
    }
  }
}
</style>