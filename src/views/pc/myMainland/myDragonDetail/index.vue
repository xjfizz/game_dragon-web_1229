<template>
  <div class="my-dragon-detail">
    <sellBox v-if="sellBoxshow"></sellBox>
    <sendDragon v-if="sendDragonShow"></sendDragon>
    <breedMain v-if="breedMainShow"></breedMain>
    <selectDragon v-if="breedSelectDragonShow"></selectDragon>

    <breedSuccess v-if="breedSuccessShow"></breedSuccess>
    <breedProgress v-if="breedProgressShow"></breedProgress>
    <absorptionMain v-if="absorptionMainShow"></absorptionMain>
    <selectDragonDevouring
      v-if="devouringSelectDragonShow"
    ></selectDragonDevouring>
    <devouringMain v-if="devouringMainShow"></devouringMain>
    <devouringTalentMain v-if="devouringTalentMainShow"></devouringTalentMain>
    <absorptionPreview v-if="absorptionPreviewShow"></absorptionPreview>
    <cancelBonusPoint v-if="cancelBonusPointShow"></cancelBonusPoint>
    <devouringSuccess v-if="devouringSuccessShow"></devouringSuccess>
    <absorptionSuccess v-if="absorptionSuccessShow"></absorptionSuccess>
    <cancelBox v-if="listCancelShow"></cancelBox>
    <buyDetail v-if="buyDetailShow"></buyDetail>
    <!-- <breedProgress v-if="true"></breedProgress> -->
    <Header :headIndex="3"></Header>
    <div class="main-content">
      <!-- 等待孵化倒计时 -->
      <detail1
        v-if="dragonDetail.status == 1 && dragonDetail.lockStatus != 3"
      ></detail1>
      <!-- 可以孵化 -->
      <detail2
        v-if="dragonDetail.status == 1 && dragonDetail.lockStatus != 3"
      ></detail2>
      <!-- 已孵化成龙带出售 -->
      <detail3
        v-if="dragonDetail.status == 2 && dragonDetail.lockStatus != 3"
      ></detail3>
      <!-- 龙-已出售市场  -->
      <detail4
        v-if="dragonDetail.status == 2 && dragonDetail.lockStatus == 3"
      ></detail4>
      <!-- 蛋-未孵化-已出售市场  -->
      <detail5
        v-if="dragonDetail.status == 1 && dragonDetail.lockStatus == 3"
      ></detail5>
      <!-- 蛋-已孵化-已出售市场  -->
      <detail6
        v-if="dragonDetail.status == 1 && dragonDetail.lockStatus == 3"
      ></detail6>
      <!-- 市场详情  -->
      <!-- <detail5></detail5> -->
    </div>
    <div class="create-selete-img">
      <div class="dragon" v-if="!!selectLocalDragon && loadingForm.loadingShow">
        <indexCreateUpload
          ref="dragonCreate"
          :dragonImgEye="createDragon(selectLocalDragon.parts[0])"
          :dragonImgWing="createDragon(selectLocalDragon.parts[4])"
          :dragonImgHorn="createDragon(selectLocalDragon.parts[2])"
          :dragonImgBody="createDragon(selectLocalDragon.parts[6])"
          :dragonImgTotems="createDragon(selectLocalDragon.parts[1])"
          :dragonImgEar="createDragon(selectLocalDragon.parts[3])"
          :dragonImgTail="createDragon(selectLocalDragon.parts[5])"
        ></indexCreateUpload>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, toRefs } from "vue";
import { useRouter } from "vue-router";
import Header from "@/components/HeaderMarketPlace";
import sendDragon from "./components/sendDragon/index.vue";
import breedMain from "./components/breed/breed-main.vue";
import selectDragon from "./components/breed/selectDragon.vue";
import selectDragonDevouring from "./components/devouring/selectDragon.vue";
import breedSuccess from "./components/breed/breed-success.vue";
import breedProgress from "./components/breed/breed-progress.vue";
import absorptionMain from "./components/absorption/absorption-main.vue";
import absorptionPreview from "./components/absorption/absorption-preview.vue";
import cancelBonusPoint from "./components/absorption/cancel-bonus-point.vue";
import absorptionSuccess from "./components/absorption/absorption-success.vue";
import devouringSuccess from "./components/devouring/devouring-success.vue";
import devouringMain from "./components/devouring/devouring-main.vue";
import devouringTalentMain from "./components/devouring/devouring-talent-main.vue";

import cancelBox from "@/components/modalBox/cancelBox/index.vue";
import buyDetail from "./components/marketBox/buyDetail.vue";
import common from "@/utils/common";
import myDragonDetail from "@/views/pc/myMainland/use/myDragonDetail";
import myDragon from "@/views/pc/myMainland/use/myDragon";
import breedHandle from "@/views/pc/myMainland/use/breed";
import absorptionHandle from "@/views/pc/myMainland/use/absorption";
import devouringHandle from "@/views/pc/myMainland/use/devouring";
import dragonCreate from "../components/dragonCreate/indexCreateDetail.vue";
import indexCreateUpload from "../components/dragonCreate/indexCreateUpload.vue";
import lottie from "vue-lottie/src/lottie.vue";
import detail1 from "./components/detail/detail1/index.vue";
import detail2 from "./components/detail/detail2/index.vue";
import detail3 from "./components/detail/detail3/index.vue";
import detail4 from "./components/detail/detail4/index.vue";
import detail5 from "./components/detail/detail5/index.vue";
import detail6 from "./components/detail/detail6/index.vue";
import marketDetail5 from "@/views/pc/marketPlace/components/detail/detail1/index.vue"; // marketPlace-detail1
import sellBox from "@/components/modalBox/marketPlace/sellBox/index.vue";
export default {
  name: "myDragonDetail",
  components: {
    Header,
    dragonCreate,
    indexCreateUpload,
    lottie,
    sendDragon,
    detail1,
    detail2,
    detail3,
    detail4,
    detail5,
    detail6,
    marketDetail5,
    breedMain,
    selectDragon,
    breedSuccess,
    breedProgress,
    sellBox,
    cancelBox,
    buyDetail,
    absorptionMain,
    absorptionPreview,
    cancelBonusPoint,
    absorptionSuccess,
    devouringMain,
    devouringTalentMain,
    selectDragonDevouring,
    devouringSuccess,
  },
  setup() {
    const router = useRouter();
    const state = reactive({});

    // const { myMainlandState } = myMainland();
    const {
      dragonEggImgHandle,
      myDragonState,
      createDragon,
      createDragonPart,
      dragonClazzImgHandle,
    } = myDragon();
    const {
      myDragonDetailState,
      init,
      back,
      openDradonEgg,
      handleAnimation,
      sendDragon,
    } = myDragonDetail();

    const { breedState } = breedHandle();
    const { absorptionState } = absorptionHandle();
    const { devouringState } = devouringHandle();
    onMounted(() => {
      common.goTopScroll();
      init();
    });

    return {
      ...toRefs(breedState),
      ...toRefs(absorptionState),
      ...toRefs(devouringState),
      ...toRefs(state),
      ...toRefs(myDragonState),
      ...toRefs(myDragonDetailState),
      dragonEggImgHandle,
      back,
      openDradonEgg,
      createDragon,
      createDragonPart,
      handleAnimation,
      handleAnimation,
      dragonClazzImgHandle,
      sendDragon,
    };
  },
};
</script>

<style lang="less" scoped >
.my-dragon-detail {
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
  .create-selete-img {
    // visibility: hidden;
    position: absolute;
    z-index: -10000;
    top: -2000px;
    left: 0;
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
.my-dragon-detail {
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
      z-index: 1000;
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