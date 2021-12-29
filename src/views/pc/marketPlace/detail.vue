<template>
  <div class="my-dragon-detail">
    <sendDragon v-if="sendDragonShow"></sendDragon>
    <Header :headIndex="3"></Header>
    <div class="main-content">
      <!-- 市场详情  -->
      <detail5></detail5>
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
import sendDragon from "@/views/pc/myMainland/myDragonDetail/components/sendDragon/index.vue";
import common from "@/utils/common";
import myDragonDetail from "@/views/pc/myMainland/use/myDragonDetail";
import myDragon from "@/views/pc/myMainland/use/myDragon";
import dragonCreate from "@/views/pc/myMainland/components/dragonCreate/indexCreateDetail.vue";
import indexCreateUpload from "@/views/pc/myMainland/components/dragonCreate/indexCreateUpload.vue";
import lottie from "vue-lottie/src/lottie.vue";

import detail5 from "@/views/pc/marketPlace/components/detail/detail1/index.vue"; // marketPlace-detail1
export default {
  name: "myDragonDetail",
  components: {
    Header,
    dragonCreate,
    indexCreateUpload,
    lottie,
    sendDragon,

    detail5,
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
    onMounted(() => {
      common.goTopScroll();
      init();
    });

    return {
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