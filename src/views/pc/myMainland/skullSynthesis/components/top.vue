<template>
  <div class="dmp-withDrawDmp-main-top">
    <div class="top-btns">
      <div class="left" @click="back">
        <div class="left-img">
          <img src="@/assets/imgs/myMainland/dragon-top/right.png" alt="" />
        </div>
        <div class="left-text">Back</div>
      </div>
      <div class="right">
        <div class="right-img">
          <img
            @mouseenter="mouseenterWithdrawMsg"
            @mouseleave="mouseleaveWithdrawMsg"
            src="@/assets/imgs/myMainland/dragon-top/question.png"
            alt=""
          />
          <PopupMsg
            class="right-img-msg"
            :showPopop="tipMsgShow"
            :msgList="tipList"
            :showIndex="false"
          />
        </div>
        <div class="right-text">Synthesis rules</div>
      </div>
    </div>
    <div class="top-skull-wrap">
      <div class="skull-item skull-item1">
        <div class="item-top" v-if="localSelectItem">
          <img :src="skullCreateImg(localSelectItem.level)" alt="" />
        </div>
        <div class="item-bottom">
          <img
            src="../../../../../assets/imgs/myMainland/skullCreate/skull-bottom.png"
            alt=""
          />
        </div>
      </div>
      <div class="skull-item skull-item2">
        <div class="item-top" v-if="localSelectItem">
          <img :src="skullCreateImg(localSelectItem.level)" alt="" />
        </div>
        <div class="item-bottom">
          <img
            src="../../../../../assets/imgs/myMainland/skullCreate/skull-bottom.png"
            alt=""
          />
        </div>
      </div>
      <div class="skull-item skull-item3">
        <div class="item-top" v-if="localSelectItem">
          <img :src="skullCreateImg(localSelectItem.level)" alt="" />
        </div>
        <div class="item-bottom">
          <img
            src="../../../../../assets/imgs/myMainland/skullCreate/skull-bottom.png"
            alt=""
          />
        </div>
      </div>
      <div class="skull-item skull-item4">
        <div class="item-top" v-if="localSelectItem">
          <img :src="skullCreateImg(localSelectItem.level)" alt="" />
        </div>
        <div class="item-bottom">
          <img
            src="../../../../../assets/imgs/myMainland/skullCreate/skull-bottom.png"
            alt=""
          />
        </div>
      </div>
      <div class="skull-item skull-item5">
        <div class="item-top" v-if="localSelectItem">
          <img :src="skullCreateImg(localSelectItem.level)" alt="" />
        </div>
        <div class="item-bottom">
          <img
            src="../../../../../assets/imgs/myMainland/skullCreate/skull-bottom.png"
            alt=""
          />
        </div>
      </div>
      <div class="skull-light">
        <div class="light-play">
          <lightning :showLighting="skullCreateProgressShow"></lightning>
        </div>

        <img
        v-if="skullCreateProgressShow"
          src="@/assets/imgs/myMainland/skullCreate/bottom-shadow.png"
          alt=""
        />
      </div>
      <div class="skull-btns" v-if="localSelectItem && !skullCreateProgressShow">
        <div class="btn-des">
          <div class="btn-des-title">Required:</div>
          <div class="btn-des-value">
            <div class="price1">
              <div class="value">
                {{ requirePrice.dmp }}
              </div>

              <img src="@/assets/imgs/myMainland/skullCreate/dmp.png" alt="" />
            </div>
            <div class="price-add">+</div>
            <div class="price2">
              <div class="value">
                {{ requirePrice.dms }}
              </div>

              <img src="@/assets/imgs/myMainland/skullCreate/dms.png" alt="" />
            </div>
          </div>
        </div>
        <div class="create-btn" @click="openDragonSkullCreate">
          <img
            src="@/assets/imgs/myMainland/skullCreate/create-img.png"
            alt=""
          />
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
import PopupMsg from "@/components/popup/index.vue";
import lightning from "@/views/pc/myMainland/components/lightning";

export default {
  name: "withdrawalDmp",
  components: {
    Header,
    PopupMsg,
    lightning,
  },
  setup() {
    const router = useRouter();
    const state = reactive({});

    const {
      back,
      skullCreateState,
      mouseenterWithdrawMsg,
      mouseleaveWithdrawMsg,
      skullCreateImg,
      openDragonSkullCreate,
    } = skullCreateHandle();
    onMounted(() => {
      common.goTopScroll();
      // init();
    });

    return {
      ...toRefs(state),
      ...toRefs(skullCreateState),
      back,
      mouseenterWithdrawMsg,
      mouseleaveWithdrawMsg,
      skullCreateImg,
      openDragonSkullCreate,
    };
  },
};
</script>

<style lang="less" scoped >
.dmp-withDrawDmp-main-top {
  margin-top: 36px;
  height: 480px;

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
          transform: rotate(180deg);
        }
      }

      .left-text {
        font-size: 14px;
        font-family: GothamRounded-Medium, GothamRounded;
        font-weight: 500;
        color: #ffffff;
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
        color: rgba(255, 255, 255, 0.68);
      }
    }
  }

  .top-skull-wrap {
    margin-top: 10px;
    width: 100%;
    min-height: 300px;
    // background-color: rgb(94, 94, 94);
    // opacity: 0.1;
    position: relative;
    .skull-item1 {
      top: 90px;
      left: 2%;
    }
    .skull-item2 {
      top: 10px;
      left: 20%;
    }
    .skull-item3 {
      left: 50%;
      top: 100px;
      transform: translate(-50%, -50%);
    }
    .skull-item4 {
      top: 10px;
      right: 20%;
    }
    .skull-item5 {
      top: 90px;
      right: 2%;
    }
    .skull-item {
      width: 261px;
      height: 300px;
      position: absolute;
      .item-top {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        z-index: 99;
        img {
          width: calc(406px * 0.6);
          height: calc(401px * 0.6);
          animation: eggMove 3s infinite alternate;
          -webkit-animation: eggMove 3s infinite alternate;
        }
      }
      .item-bottom {
        position: absolute;
        top: 15px;
        img {
          width: 261px;
          height: 260px;
        }
      }
    }
    .skull-light {
      position: absolute;
      left: 50%;
      top: 280px;
      transform: translate(-50%, -50%);
      width: 340px;
      height: 81px;
      .light-play {
        position: absolute;
        left: 50%;
        top: -100px;
        transform: translate(-50%, -50%);
      }
      img {
        position: absolute;
        left: 50%;
        top: 50px;
        transform: translate(-50%, -50%);
        width: 340px;
        height: 81px;
      }
    }
    .skull-btns {
      width: 340px;
      position: absolute;
      left: 50%;
      top: 380px;
      transform: translate(-50%, -50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      .btn-des {
        display: flex;
        align-items: center;
        .btn-des-title {
          font-size: 16px;
          font-family: GothamRounded-Book, GothamRounded;
          font-weight: normal;
          color: rgba(255, 255, 255, 0.48);
        }
        .btn-des-value {
          margin-left: 8px;
          display: flex;
          align-items: center;
          .price1 {
            display: flex;
            align-items: center;
            .value {
              font-size: 15px;
              font-family: GothamRounded-Medium, GothamRounded;
              font-weight: 500;
              color: #ffffff;
            }
            img {
              margin-left: 4px;
              width: 20px;
              height: 20px;
            }
          }
          .price-add {
            margin-left: 8px;
            font-size: 16px;
            font-family: GothamRounded-Book, GothamRounded;
            font-weight: normal;
            color: #ffffff;
          }
          .price2 {
            display: flex;
            align-items: center;
            margin-left: 8px;
            .value {
              font-size: 15px;
              font-family: GothamRounded-Medium, GothamRounded;
              font-weight: 500;
              color: #ffffff;
            }
            img {
              margin-left: 8px;
              width: 20px;
              height: 20px;
            }
          }
        }
      }
      .create-btn {
        margin-top: 13px;
        cursor: pointer;
        img {
          width: 200px;
          height: 80px;
        }
      }
    }
  }

  @keyframes eggMove {
    from {
      margin-top: -20px;
    }
    to {
      margin-top: 0px;
    }
  }
  @-webkit-keyframes eggMove {
    from {
      margin-top: -20px;
    }
    to {
      margin-top: 0px;
    }
  }
}
</style>
