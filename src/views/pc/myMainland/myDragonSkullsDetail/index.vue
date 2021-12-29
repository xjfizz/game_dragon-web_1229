<template>
  <div class="my-dragon-skulls-detail">
    <sellBox v-if="sellBoxshow"></sellBox>
    <sendDragon v-if="sendDragonShow"></sendDragon>
    <cancelBox v-if="listCancelShow"></cancelBox>
    <buyDetail v-if="buyDetailShow"></buyDetail>
    <Header :headIndex="3"></Header>
    <div class="main-content">
      <!-- 龙骨未上架 -->
      <detail1 v-if="detailPath == 1"></detail1>

      <!-- 龙骨已上架 -->
      <detail2 v-if="detailPath == 2"></detail2>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, toRefs } from "vue";
import { useRouter } from "vue-router";
import Header from "@/components/HeaderMarketPlace";

import common from "@/utils/common";
import dragonSkullDetail from "@/views/pc/myMainland/use/dragonSkullDetail";
import myDragon from "@/views/pc/myMainland/use/myDragon";
import breedHandle from "@/views/pc/myMainland/use/breed";
import detail1 from "./components/detail/detail1/index.vue";
import detail2 from "./components/detail/detail2/index.vue";

import sendDragon from "@/views/pc/myMainland/myDragonSkullsDetail/components/sendDragon/index.vue";
import cancelBox from "@/components/modalBox/cancelBox/indexDragonSkulls.vue";
import buyDetail from "@/views/pc/myMainland/myDragonSkullsDetail/components/marketBox/buyDetail.vue";
import sellBox from "@/components/modalBox/marketPlace/sellBox/indexDragonSkulls.vue";

export default {
  name: "myDragonDetail",
  components: {
    Header,
    detail1,
    detail2,
    sendDragon,
    cancelBox,
    buyDetail,
    sellBox,
  },
  setup() {
    const router = useRouter();
    const state = reactive({});

    // const { myMainlandState } = myMainland();
    const { dragonEggImgHandle, myDragonState } = myDragon();
    const { myDragonDetailState, init, back } = dragonSkullDetail();

    const { breedState } = breedHandle();
    onMounted(() => {
      common.goTopScroll();
      init();
    });

    return {
      ...toRefs(breedState),
      ...toRefs(state),
      ...toRefs(myDragonState),
      ...toRefs(myDragonDetailState),
      dragonEggImgHandle,
      back,
    };
  },
};
</script>

<style lang="less" scoped >
.my-dragon-skulls-detail {
  width: 100%;
  height: 100vh;
  background: #282523;
  .main-content {
    display: flex;
    // padding-top: 24px;
    // height: 100%;
    width: 100%;
    position: absolute;
    top: 80px;
    bottom: 0px;
    left: 0px;
    display: flex;
    justify-content: center;
  }
}
@keyframes eggMove {
  from {
    margin-top: -10px;
  }
  to {
    margin-top: -40px;
  }
}
@-webkit-keyframes eggMove {
  from {
    margin-top: -10px;
  }
  to {
    margin-top: -40px;
  }
}
</style>
<style lang="less">
.my-dragon-skulls-detail {
  .dragon-my-btn {
    margin-left: auto;
    font-size: 28px;
    font-family: GothamRounded-Medium, GothamRounded;
    font-weight: 500;
    color: #ffffff;
    .btn-wrap {
      border: 1px solid #413c3a;
      display: flex;
      align-items: center;
      border-radius: 6px 6px 6px 6px;
      position: relative;
      z-index: 100;
      .item-btn {
        width: 48px;
        height: 48px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-right: 1px solid #413c3a;
        cursor: pointer;
        position: relative;
        img {
          width: 20px;
          height: 20px;
        }
      }
      .item-btn:last-child {
        border-right: none;
      }
    }
  }
}
</style>