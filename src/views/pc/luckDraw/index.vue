<template>
  <div
    class="luckDraw-main"
    v-loading="loadingForm.loadingShow"
    :element-loading-text="loadingForm.loadingShowText"
    element-loading-spinner="el-icon-loading"
  >
    <!-- <el-tag type="sucess">{{isLottery}}</el-tag>
      <el-button type="sucess" @click="startLottery">抽奖</el-button> -->
    <Header :headIndex="9"></Header>
    <div v-if="drawSuccessShow" class="modal-backdrop"></div>
    <transition name="scale">
      <luckSuccess v-if="drawSuccessShow"></luckSuccess>
    </transition>
    <div class="main-content">
      <div class="wrap">
        <div class="top-btns">
          <div class="left" @click="back">
            <div class="left-img">
              <img src="@/assets/imgs/luckDraw/left-back.png" alt="" />
            </div>
            <div class="left-text">Back</div>
          </div>
          <div class="right">
            <div class="right-img">
              <img
                @mouseenter="withdrawmsgShow = true"
                @mouseleave="withdrawmsgShow = false"
                src="@/assets/imgs/luckDraw/question.png"
                alt=""
              />
              <PopupMsg
                class="right-img-msg"
                :showPopop="withdrawmsgShow"
                :msgList="withdrawmsgList"
                :showIndex="false"
              />
            </div>
            <div class="right-text">The Christmas Rules</div>
          </div>
        </div>
        <div class="mid-wrap">
          <div class="mid-title">Christmas Zone</div>
          <div class="mid-title-des">
            <div class="line"></div>
            <div class="text">100% winning</div>
            <div class="line"></div>
          </div>
          <div class="mid-des">
            Event Time: Dec.24,2021@6am utc - Dec.26,2021@11pm utc
          </div>
          <div class="mid-box">
            <luckList v-if="luckList.length > 0"></luckList>
            <img src="@/assets/imgs/luckDraw/box.png" alt="" />
          </div>
        </div>
        <div class="bottom-wrap">
          <div v-if="!isHaveLottery" class="bottom-des">
            You have {{ isLottery ? 1 : 0 }} chance to draw a prize
          </div>
          <div v-if="isHaveLottery" class="bottom-des">
            You have completed the draw
          </div>
          <div
            v-if="isLottery"
            class="bottom-btn select-hover"
            @click="startLottery"
          >
            <div class="btn">
              <img src="@/assets/imgs/luckDraw/btn.png" alt="" />
            </div>
          </div>
          <div v-else class="bottom-btn select-hover no-data">
            <!-- <div v-if="isHaveLottery" class="btn">
              You have completed the draw
            </div> -->
            <div v-if="!isHaveLottery" class="btn">
              <img src="@/assets/imgs/luckDraw/btn.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, onBeforeUnmount, toRefs } from "vue";
import { useRouter } from "vue-router";
import luckDrawHandle from "./use/luckDraw";
import Header from "@/components/HeaderChris";
import common from "@/utils/common";
import { getSession, getToken, setCookie } from "@/utils/auth.js";
import PopupMsg from "@/components/popup/luck-draw-tip.vue";
import luckSuccess from "./components/luck-success.vue";
import luckList from "./components/luck-list.vue";
export default {
  name: "luckDraw",
  components: {
    Header,
    PopupMsg,
    luckSuccess,
    luckList,
  },
  setup() {
    const router = useRouter();
    const state = reactive({});
    onMounted(async () => {
      common.goTopScroll();
      await init();
    });
    onBeforeUnmount(() => {
      if (luckDrawState.listMoveTime) {
        clearInterval(luckDrawState.listMoveTime);
      }
    });

    let { luckDrawState, init, startLottery, back } = luckDrawHandle();

    return {
      ...toRefs(state),
      ...toRefs(luckDrawState),
      startLottery,
      back,
    };
  },
};
</script>

<style lang="less" scoped>
.luckDraw-main {
  width: 100%;
  height: 1080px;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url("../../../assets/imgs/luckDraw/luckDrawMain.png");
  .main-content {
    margin-top: 45px;
    display: flex;
    justify-content: center;
    .wrap {
      width: 1280px;
      .top-btns {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .left {
          display: flex;
          align-items: center;
          cursor: pointer;
          .left-img {
            display: flex;
            align-items: center;
            img {
              width: 24px;
              height: 24px;
              //transform: rotate(180deg);
            }
          }

          .left-text {
            font-size: 14px;
            font-family: GothamRounded-Medium, GothamRounded;
            font-weight: 500;
            color: #2e0b00;
          }
        }

        .right {
          display: flex;
          align-items: center;
          .right-img {
            display: flex;
            align-items: center;
            position: relative;
            img {
              width: 16px;
              height: 16px;
            }
            .right-img-msg {
              top: 40px;
            }
          }
          .right-text {
            margin-left: 8px;
            font-size: 16px;
            font-family: GothamRounded-Book, GothamRounded;
            font-weight: normal;
            color: #2e0b00;
          }
        }
      }
      .mid-wrap {
        display: flex;
        flex-direction: column;
        align-items: center;
        .mid-title {
          margin-top: 20px;
          font-size: 54px;
          font-family: WendyOne-Regular, WendyOne;
          font-weight: 400;
          color: #fe5b7a;
          line-height: 57px;
          -webkit-text-stroke: 2px #ffffff;
          // text-shadow: 0px 3px 3px rgba(0, 0, 0, 0.24);
        }
        .mid-title-des {
          display: flex;
          align-items: center;
          margin-top: 22px;
          .line {
            width: 90px;
            height: 1px;
            background: #ffffff;
            opacity: 0.12;
          }
          .text {
            margin-left: 8px;
            margin-right: 8px;
            font-size: 24px;
            font-family: WendyOne-Regular, WendyOne;
            font-weight: 400;
            color: #fe5b7a;
          }
        }
        .mid-des {
          margin-top: 21px;
          font-size: 16px;
          font-family: GothamRounded-Medium, GothamRounded;
          font-weight: 500;
          color: #278957;
        }
        .mid-box {
          margin-top: 20px;
          position: relative;
          img {
            width: calc(583px * 0.7);
            height: calc(529px * 0.7);
          }
        }
      }
      .bottom-wrap {
        display: flex;
        flex-direction: column;
        align-items: center;
        .bottom-des {
          margin-top: 42px;
          font-size: 16px;
          font-family: GothamRounded-Medium, GothamRounded;
          font-weight: 500;
          color: #278957;
        }
        .bottom-btn {
          margin-top: 16px;
          // width: 352px;
          // height: 54px;
          // background: #ffc763;
          // border-radius: 27px;
          display: flex;
          justify-content: center;
          align-items: center;
          .btn {
            font-size: 16px;
            font-family: GothamRounded-Medium, GothamRounded;
            font-weight: 500;
            color: #278957;
            img {
              width: 239px;
              height: 60px;
            }
          }
        }
      }
    }
  }
}
</style>

<style lang="less">
.luckDraw-main {
  .el-loading-mask {
    //background: rgba(0, 0, 0, 0.6);
    background: rgba(255, 255, 255, 0.9);
    // opacity: 0.3;
    .el-loading-spinner {
      //   top: 20%;
      .el-icon-loading {
        color: #047c7f;
        font-size: 24px;
        font-family: WendyOne-Regular, WendyOne;
        font-weight: 400;
      }
      .el-loading-text {
        color: #047c7f;
        font-size: 20px;
        font-family: WendyOne-Regular, WendyOne;
        font-weight: 400;
      }
    }
  }
}
</style>
