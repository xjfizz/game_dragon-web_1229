<template>
  <div class="withdrawlDmp-top-main">
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
            :showPopop="withdrawmsgShow"
            :msgList="withdrawmsgList"
          />
        </div>
        <div class="right-text">DMP withdrawal rules</div>
      </div>
    </div>
    <div class="content-main">
      <div class="top-content1">
        <div class="wrap">
          <div class="left">
            <div class="left-left">
              <img src="@/assets/imgs/myMainland/dragon-top/dmp.png" alt="" />
            </div>
            <div class="left-mid">
              <div class="top">My Rewards(DMP)</div>
              <div class="bottom">
                <div v-if="eyeShow" class="price">{{ userDmp || 0 }}</div>
                <div v-else class="price">
                  <!-- <span v-for="(item,index) in String(userDmp).length" :key="index" >*</span> -->
                  ****
                </div>
                <!-- <div class="price-dollar">≈ $272.74</div> -->
              </div>
            </div>
            <div class="left-right">
              <div class="show-eye" @click="eyeShowChange">
                <img
                  v-if="eyeShow"
                  src="@/assets/imgs/myMainland/dragon-top/eye-show.png"
                  alt=""
                />
                <img
                  v-else
                  src="@/assets/imgs/myMainland/dragon-top/eye-hide.png"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div class="rigth">
            <div class="right-text" @click="withdrawWithNoFee">
              Withdraw DMP without fee
            </div>
          </div>
        </div>
      </div>
      <div class="top-content2">
        <div class="wrap">
          <div class="left">
            <div class="left-mid">
              <div class="top">Cumulative Withdrawn</div>
              <div class="bottom">
                <div v-if="eyeShow" class="price">
                  {{ chainAssets.balance || 0 }}
                </div>
                <div v-else class="price">****</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, toRefs, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import Header from "@/components/HeaderMarketPlace";
import common from "@/utils/common";
import withdrawlDmpHandle from "@/views/pc/myMainland/use/withdrawlDmp";
import PopupMsg from "@/components/popup/index.vue";

export default {
  components: {
    Header,
    PopupMsg,
  },
  setup() {
    const router = useRouter();
    const state = reactive({});

    const {
      back,
      withdrawlDmpState,
      withdrawWithNoFee,
      mouseenterWithdrawMsg,
      mouseleaveWithdrawMsg,
      eyeShowChange,
      getContractBalance,
      timeGetContractBalance,
    } = withdrawlDmpHandle();
    onMounted(() => {
      common.goTopScroll();
      getContractBalance();
      timeGetContractBalance();
      // init();
    });

    onBeforeUnmount(() => {
     if (withdrawlDmpState.timeGetDmp) {
       clearInterval(withdrawlDmpState.timeGetDmp);
      }
    });

    return {
      ...toRefs(state),
      ...toRefs(withdrawlDmpState),
      back,
      withdrawWithNoFee,
      mouseenterWithdrawMsg,
      mouseleaveWithdrawMsg,
      eyeShowChange,
    };
  },
};
</script>

<style lang="less" scoped >
.withdrawlDmp-top-main {
  margin-top: 36px;
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
        color: #ffffff;
      }
    }
  }
  .content-main {
    display: flex;
    justify-content: space-between;
    width: 100%;
    .top-content1 {
      width: 588px;
      margin-top: 29px;
      height: 144px;
      // background: #1a1716;
      border-radius: 8px;
      // border: 1px solid rgba(255, 255, 255, 0.12);
      background-repeat: no-repeat;
      background-size: cover;
      background-image: url("../../../../../assets/imgs/myMainland/dragon-top/top-bc.png");
      .wrap {
        padding: 0 39px;
        display: flex;
        align-items: center;
        height: 144px;
        .left {
          display: flex;
          align-items: flex-start;
          .left-left {
            img {
              width: 48px;
              height: 48px;
            }
          }
          .left-mid {
            margin-left: 16px;
            .top {
              height: 20px;
              font-size: 14px;
              font-family: GothamRounded-Book, GothamRounded;
              font-weight: normal;
              color: #ffffff;
              line-height: 17px;
              opacity: 0.48;
            }
            .bottom {
              display: flex;
              align-items: center;
              margin-top: 4px;
              .price {
                height: 30px;
                font-size: 28px;
                font-family: GothamRounded-Medium, GothamRounded;
                font-weight: 500;
                color: #ffffff;
                line-height: 30px;
              }
              .price-dollar {
                height: 21px;
                font-size: 14px;
                font-family: GothamRounded-Book, GothamRounded;
                font-weight: normal;
                color: #ffffff;
                line-height: 21px;
                margin-left: 10px;
              }
            }
          }
          .left-right {
            display: flex;
            align-items: flex-start;
            height: 100%;
            margin-left: 16px;
            .show-eye {
              cursor: pointer;
              img {
                width: 16px;
                height: 16px;
              }
            }
          }
        }
        .rigth {
          margin-left: auto;
          .right-text {
            // width: 212px;
            height: 14px;
            font-size: 14px;
            font-family: GothamRounded-Book, GothamRounded;
            font-weight: normal;
            color: #ffffff;
            line-height: 17px;
            opacity: 0.48;
            padding-bottom: 2px;
            border-bottom: 1px solid rgba(255, 255, 255, 1);
            cursor: pointer;
          }
          .right-text:hover {
            opacity: 0.68;
          }
        }
      }
    }
    .top-content2 {
      width: 588px;
      margin-top: 29px;
      height: 144px;
      // background: #1a1716;
      border-radius: 8px;
      // border: 1px solid rgba(255, 255, 255, 0.12);
      background-repeat: no-repeat;
      background-size: cover;
      background-image: url("../../../../../assets/imgs/myMainland/dragon-top/top-bc2.png");
      .wrap {
        padding: 0 39px;
        display: flex;
        align-items: center;
        height: 144px;
        .left {
          display: flex;
          align-items: flex-start;
          .left-left {
            img {
              width: 48px;
              height: 48px;
            }
          }
          .left-mid {
            margin-left: 16px;
            .top {
              height: 20px;
              font-size: 14px;
              font-family: GothamRounded-Book, GothamRounded;
              font-weight: normal;
              color: #ffffff;
              line-height: 17px;
              opacity: 0.48;
            }
            .bottom {
              display: flex;
              align-items: center;
              margin-top: 4px;
              .price {
                height: 30px;
                font-size: 28px;
                font-family: GothamRounded-Medium, GothamRounded;
                font-weight: 500;
                color: #ffffff;
                line-height: 30px;
              }
              .price-dollar {
                height: 21px;
                font-size: 14px;
                font-family: GothamRounded-Book, GothamRounded;
                font-weight: normal;
                color: #ffffff;
                line-height: 21px;
                margin-left: 10px;
              }
            }
          }
          .left-right {
            display: flex;
            align-items: flex-start;
            height: 100%;
            margin-left: 16px;
            .show-eye {
              img {
                width: 16px;
                height: 16px;
              }
            }
          }
        }
        .rigth {
          margin-left: auto;
          .right-text {
            // width: 212px;
            height: 14px;
            font-size: 14px;
            font-family: GothamRounded-Book, GothamRounded;
            font-weight: normal;
            color: #ffffff;
            line-height: 17px;
            opacity: 0.48;
            padding-bottom: 2px;
            border-bottom: 1px solid rgba(255, 255, 255, 1);
            cursor: pointer;
          }
          .right-text:hover {
            opacity: 0.68;
          }
        }
      }
    }
  }
}
</style>