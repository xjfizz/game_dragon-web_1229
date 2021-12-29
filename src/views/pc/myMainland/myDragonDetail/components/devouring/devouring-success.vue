<template>
  <div class="modal-backdrop">
    <div class="modal">
      <div
        class="modal-contain"
        v-loading="loadingForm.loadingShow"
        :element-loading-text="loadingForm.loadingShowText"
        element-loading-spinner="el-icon-loading"
      >
        <div class="modal-content">
          <div class="title">Skill upgrade successful !!</div>
          <div class="mid-skill">
             <skill-item :item="waitOrderList.skill"></skill-item>
          </div>
          <div class="mid-level">
            <div class="level-wrap" v-for="(item,index) in (waitOrderList.newAttributeVal -1)" :key="index">
              <img src="@/assets/imgs/myMainland/devouring/star-level.png" alt="">
            </div>
             <div class="level-wrap" v-for="(item,index) in (4 - waitOrderList.newAttributeVal)" :key="index">
              <img src="@/assets/imgs/myMainland/devouring/star-no-level.png" alt="">
            </div>
          </div>
          <div class="mid-text">Dragon #{{waitOrderList.heroNo}}</div>
          <div class="bottom-btn">
            <div class="btn hover-select" @click="sureDeVouring">Get it !</div>
          </div>
        </div>
        <div
          v-if="!loadingForm.loadingShow"
          class="close"
          @click="cancelDevouringSuccess"
        >
          <img src="@/assets/imgs/openBox/img-code/close.png" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>
 




<script>
import { reactive, toRefs, onMounted } from "vue";
import selectDragon from "@/views/pc/activity/use/dragon/selectDragon";
import myDragonDetail from "@/views/pc/myMainland/use/myDragonDetail";
import dragonCreate from "@/views/pc/myMainland/components/dragonCreate/indexCreateDevouring.vue";
import devouringHandle from "@/views/pc/myMainland/use/devouring";
import myDragon from "@/views/pc/myMainland/use/myDragon";
import skillItem from "../detail/components/skill/skill-item-success.vue";
import common from "@/utils/common";
export default {
  name: "sendDragon",
  components: {
    dragonCreate,
    skillItem,
  },
  props: {
    classHeader: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, context) {
    const state = reactive({});
    onMounted(() => {
      myDragonDetailState.sendForm.walletAddress = "";
    });
    const { dragonClazzImgHandle, createDragon } = myDragon();
    const { myDragonDetailState, closeBox, confirm } = myDragonDetail();
    const { devouringState, cancelDevouringSuccess,sureDeVouring } = devouringHandle();
    return {
      ...toRefs(state),
      ...toRefs(myDragonDetailState),
      ...toRefs(devouringState),
      cancelDevouringSuccess,
      sureDeVouring,
    };
  },
};
</script>

<style scoped lang="less">
.modal-backdrop {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(20, 19, 19, 0.86);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99999999;
}
.modal {
  width: 1080px;
  height: 660px;
  background: #282523;
  border-radius: 8px;
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.12);

  .modal-contain {
    height: 100%;
    width: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    .modal-content {
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      position: relative;
      .title {
        margin-top: 32px;
        font-size: 24px;
        font-family: GothamRounded-Medium, GothamRounded;
        font-weight: 500;
        color: #ffffff;
      }
      .mid-skill {
        margin-top: 38px;
        width: 240px;
        height: 310px;
        display: flex;
        justify-content: center
      }
      .mid-level {
        margin-top: 16px;
        display: flex;
        align-items: center;
        .level-wrap:last-child{
           margin-right: 0;
        }
        .level-wrap{
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 16px;
          img{
            width:16px;
            height: 16px;
          }
        }
      }
      .mid-text {
        margin-top: 24px;
        font-size: 24px;
        font-family: GothamRounded-Medium, GothamRounded;
        font-weight: 500;
        color: #ffffff;
      }
      .bottom-btn {
        margin-top: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        .btn {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 296px;
          height: 50px;
          background: #ffc763;
          box-shadow: 0px 2px 0px 0px rgba(0, 0, 0, 0.38);
          border-radius: 25px;
          font-size: 16px;
          font-family: GothamRounded-Medium, GothamRounded;
          font-weight: 500;
          color: #2e0b00;
        }
      }
    }
    .close {
      cursor: pointer;
      position: absolute;
      right: -17px;
      top: -17px;
      img {
        width: 32px;
        height: 32px;
      }
    }
  }

  .close {
    cursor: pointer;
    position: absolute;
    right: -20px;
    top: 10px;
    img {
      width: 77px;
      height: 77px;
    }
  }
}
</style>

