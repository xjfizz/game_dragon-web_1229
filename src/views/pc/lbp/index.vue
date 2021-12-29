<template>
  <div class="my-mainland-main">
    <Header :headIndex="4"></Header>
    <div
      class="main-wrap"
      v-loading="loadingForm.loadingShow"
      :element-loading-text="loadingForm.loadingShowText"
      element-loading-spinner="el-icon-loading"
    >
      <div class="main-content">
        <div class="content-left">
          <left />
        </div>
        <div class="content-right">
          <right />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, toRefs, watch } from "vue";
import { useRouter } from "vue-router";
import Header from "@/components/HeaderMarketPlace";
import common from "@/utils/common";
import myMainland from "@/views/pc/myMainland/use/myMainland";
import left from "./components/left.vue";
import right from "./components/right.vue";
import convertStateHandle from "./use/convert";
import lbpHandle from "./use/index";
import { initWallet, switchSwitchEthereumChain } from "@/utils/metaMask/ethers.js";

export default {
  name: "marketPlace",
  components: {
    Header,
    left,
    right,
  },
  setup() {
    const router = useRouter();
    const state = reactive({
      wallet: null,
    });
    const { myMainlandState } = myMainland();
    const { convertState, init, getBalance } = convertStateHandle();
    const { initPoolTokenData, getSwapPrice, getSwapTotal } = lbpHandle();
    onMounted(async () => {
      common.goTopScroll();

      await initLbpData();
    });
    watch(state.wallet, (newValue, oldValue) => {
      console.log(
        "wallet===========================================",
        newValue,
        oldValue
      );
      debugger
    });

    const initLbpData = async () => {
     // initPoolTokenData();
      getSwapPrice();
      getSwapTotal();
      init();
      await switchSwitchEthereumChain()
      await initWallet();
    };

    return {
      ...toRefs(state),
      ...toRefs(myMainlandState),
      ...toRefs(convertState),
    };
  },
};
</script>

<style lang="less" scoped >
.my-mainland-main {
  background-color: #282523;
  min-height: 2100px;
  .main-wrap {
    width: 1200px;
    min-height: 1000px;
    margin: auto;
    .main-content {
      display: flex;
      justify-content: space-between;
      height: 100%;
      .content-left {
        width: 792px;
        height: 100%;
      }
      .content-right {
        width: 384px;
        height: 100%;
      }
    }
  }
}
</style>

<style lang="less">
.my-mainland-main {
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