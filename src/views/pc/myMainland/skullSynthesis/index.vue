<template>
  <div class="skull-create-main">
    <createDragonSkull v-if="createDragonSkullShow"></createDragonSkull>
    <div v-if="openBoxSuccessShow" class="modal-backdrop"></div>
    <transition name="scale">
      <openBoxSuccess v-if="openBoxSuccessShow"></openBoxSuccess>
    </transition>
    <div class="skull-create-main-wrap">
      <Header :headIndex="3"></Header>
      <div class="main-content">
        <div class="wrap">
          <top></top>
          <bottom></bottom>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, toRefs } from "vue";
import { useRouter } from "vue-router";
import Header from "@/components/HeaderMarketPlace";
import common from "@/utils/common";
import skullCreateHandle from "@/views/pc/myMainland/use/skullCreate";
import top from "./components/top";
import bottom from "./components/bottom";
import createDragonSkull from "./components/createDragonSkull";
import openBoxSuccess from "./components/openBoxSuccess.vue";
export default {
  name: "withdrawalDmp",
  components: {
    Header,
    top,
    bottom,
    createDragonSkull,
    openBoxSuccess,
  },
  setup() {
    const router = useRouter();
    const state = reactive({});

    const { back, skullCreateState, initData } = skullCreateHandle();
    onMounted(() => {
      common.goTopScroll();
      initData();
    });

    return {
      ...toRefs(state),
      ...toRefs(skullCreateState),
      back,
    };
  },
};
</script>

<style lang="less" scoped >
.skull-create-main {
  width: 100%;
  // height: 100%;
  height: 1140px;
  // margin: 0px 104px 0 104px;
  background: #210e07; //210e07
  .skull-create-main-wrap {
    width: 100%;
    height: 100%;
    pointer-events: all;
    cursor: auto;
    background-repeat: no-repeat;
    background-size: 100%;
    background-image: url("../../../../assets/imgs/myMainland/skullCreate/skull-main-bc.png");
    .main-content {
      display: flex;
      justify-content: center;
      .wrap {
        width: 1200px;
      }
    }
  }
}
</style>
<style lang="less">
.skull-create-main {
  .el-loading-mask {
    //background: rgba(0, 0, 0, 0.6);
    background: linear-gradient(180deg, #473222 0%, #221d1d 100%);
    opacity: 0.9;
    .el-loading-spinner {
      //  top: 20%;
    }
  }
}
</style>
