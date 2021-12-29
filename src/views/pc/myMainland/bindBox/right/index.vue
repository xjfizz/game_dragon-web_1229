<template>
  <div class="bind-box-right-main">
    <div class="wrap">
      <div class="top">
        <div class="item-top">
          <div class="item-left">
            <div class="title">
              <div class="title-text">Blind Box</div>
              <div class="title-des">
                ( Issue {{ localDragonSKullForm.cycle }} )
              </div>
            </div>
            <div class="value">{{ localDragonSKullForm.blindNum || "--" }}</div>
          </div>
          <div class="item-right">
            <div class="title">
              <div class="title-text">Registered / Max Limit</div>
              <div class="title-des">( User )</div>
            </div>
            <!-- <div class="value">{{ localDragonSKullForm.max || "--" }}</div> -->
            <!-- <div class="value">{{ localDragonSKullForm.restTotal || "0" }} / {{ localDragonSKullForm.max || "0" }}</div> -->
            <div class="value" v-if="isBoxStartBuy == 2">
              {{ localDragonSKullForm.restTotal || "0" }} /
              {{ localDragonSKullForm.max || "0" }}
            </div>
            <div class="value" v-if="isBoxStartBuy == 3 && !isOpenBox">
              {{ localDragonSKullForm.restTotal || "0" }} /
              {{ localDragonSKullForm.max || "0" }}
            </div>
            <div
              class="value"
              v-if="isBoxStartBuy == 1 || (isBoxStartBuy == 3 && isOpenBox)"
            >
              {{ 0 || "0" }} /
              {{ localDragonSKullForm.max || "0" }}
            </div>
          </div>
        </div>
        <div class="item-mid">
          <div class="item-left">
            <div class="title">Box Price</div>
            <div class="value">
              <div class="text">{{ localDragonSKullForm.price || "--" }}</div>
              <div class="img" v-if="localDragonSKullForm.price">
                <img src="@/assets/imgs/myMainland/bind-box/dms.png" alt="" />
              </div>
            </div>
          </div>
          <div class="item-right">
            <div class="title">Time Left</div>
            <div v-if="isBoxStartBuy == 2 || isBoxStartBuy == 3" class="value">
              <div v-if="localDragonSKullForm.endTime" class="text">
                {{ localDragonSKullForm.countDownTime }}
              </div>
              <div v-else class="text-no">--</div>
            </div>
            <div v-if="isBoxStartBuy == 1" class="value">
              <div class="text-no">--</div>
              <!-- <div class="text">{{ localDragonSKullForm.countDownTime }}</div> -->
            </div>
          </div>
        </div>
        <div class="item-bottom">
          <div class="btns" v-if="pageLoadingForm.loadingShow && isHaveNext">
            <!-- 活动未开始 -->
            <div class="activity-wrap" v-if="isBoxStartBuy == 1">
              <div class="btn-wrap1">
                <div class="buy-box select-hover no-data">
                  <!-- I Want A Blind Box -->
                  {{ localDragonSKullForm.countDownTime }}
                </div>
              </div>
              <div
                v-if="ableClaimBalance > 0 && (isBoxStartBuy == 1 || isOpenBox)"
                class="btn-wrap2"
              >
                <div class="return-dms-able select-hover" @click="claimDms">
                  Refunded DMS
                </div>
              </div>
              <div v-else class="btn-wrap2">
                <div class="return-dms-able no-data select-hover">
                  Refunded DMS
                </div>
              </div>
            </div>
            <!-- 活动开始中 -->

            <div class="activity-wrap" v-if="isBoxStartBuy == 2">
              <!-- 报名人数未满 -->
              <div
                v-if="
                  !isBuyBoxState &&
                  localDragonSKullForm.restTotal < localDragonSKullForm.max
                "
                class="btn-wrap1"
              >
                <div class="buy-box select-hover" @click="buyBox">
                  I Want A Blind Box
                </div>
              </div>
              <!-- 报名人数已满 -->
              <div
                v-if="
                  !isBuyBoxState &&
                  localDragonSKullForm.restTotal >= localDragonSKullForm.max
                "
                class="btn-wrap1"
              >
                <div class="buy-box no-data select-hover">
                  Applicants for this issue is full
                </div>
              </div>

              <div v-if="isBuyBoxState" class="btn-wrap1 no-data">
                <div class="buy-box select-hover">
                  Purchased, waiting list……
                </div>
              </div>
              <div
                v-if="ableClaimBalance > 0 && (isBoxStartBuy == 1 || isOpenBox)"
                class="btn-wrap2"
              >
                <div class="return-dms-able select-hover" @click="claimDms">
                  Refunded DMS
                </div>
              </div>
              <div v-else class="btn-wrap2">
                <div class="return-dms-able no-data select-hover">
                  Refunded DMS
                </div>
              </div>
            </div>

            <!-- 活动结束 -->
            <div class="activity-wrap" v-if="isBoxStartBuy == 3">
              <div v-if="isOpenBox && isBuyBoxResultState" class="btn-wrap3">
                <div class="face-img">
                  <img
                    src="@/assets/imgs/myMainland/bind-box/face1.png"
                    alt=""
                  />
                </div>
                <div class="face-text">
                  Congratulations for being on the list!
                </div>
              </div>

              <div v-if="isOpenBox && !isBuyBoxResultState" class="btn-wrap4">
                <div class="face-img">
                  <img
                    src="@/assets/imgs/myMainland/bind-box/face2.png"
                    alt=""
                  />
                </div>
                <div v-if="isBuyBoxState" class="face-text">
                  No win in this issue！
                </div>
                <div v-if="!isBuyBoxState" class="face-text">
                  Activity is end！
                </div>
              </div>

              <div v-if="!isOpenBox" class="btn-wrap4">
                <div class="face-img" v-if="!isBuyBoxState">
                  <img
                    src="@/assets/imgs/myMainland/bind-box/face2.png"
                    alt=""
                  />
                </div>
                <div v-if="!isBuyBoxState" class="face-text">
                  Activity is end！
                </div>
                <div v-if="isBuyBoxState" class="buy-box no-data">
                  Purchased, waiting list……
                </div>
              </div>

              <div
                v-if="ableClaimBalance > 0 && (isBoxStartBuy == 1 || isOpenBox)"
                class="btn-wrap2"
              >
                <div class="return-dms-able select-hover" @click="claimDms">
                  Refunded DMS
                </div>
              </div>
              <div v-else class="btn-wrap2">
                <div class="return-dms-able no-data select-hover">
                  Refunded DMS
                </div>
              </div>
            </div>
          </div>

          <div class="btns" v-if="!isHaveNext">
            <!-- 活动结束 -->
            <div class="activity-wrap">
              <div class="btn-wrap4">
             
                <div class="face-text">Activity does not start!</div>
              </div>

              <div v-if="ableClaimBalance > 0" class="btn-wrap2">
                <div class="return-dms-able select-hover" @click="claimDms">
                  Refunded DMS
                </div>
              </div>
              <div v-else class="btn-wrap2">
                <div class="return-dms-able no-data select-hover">
                  Refunded DMS
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="botom">
        <div class="botom-title">My Locked Boxes</div>
        <div class="botom-num">{{ selectList1.length || 0 }}</div>
        <div class="botom-btn-wrap">
          <div v-if="selectList1.length > 0" class="btn-wrap">
            <div class="open-box-btn select-hover" @click="openDragonBox">
              Open BOX
            </div>
          </div>
          <div v-else class="btn-wrap">
            <div class="open-box-btn select-hover no-data">No Box</div>
          </div>
        </div>
        <div class="botom-skulls-wrap">
          <div class="wrap-title">My skulls:</div>
          <div class="wrap-item">
            <div class="num">({{ userDragonInfo.low || 0 }})</div>
            <div class="text">low</div>
          </div>
          <div class="wrap-item">
            <div class="num">({{ userDragonInfo.middle || 0 }})</div>
            <div class="text">medium</div>
          </div>
          <div class="wrap-item">
            <div class="num">({{ userDragonInfo.high || 0 }})</div>
            <div class="text">high</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, toRefs } from "vue";
import { useRouter } from "vue-router";

import common from "@/utils/common";
import myMainland from "@/views/pc/myMainland/use/myMainland";
import blindBoxHandle from "@/views/pc/myMainland/use/blindBox";
import Moment from "moment";

export default {
  name: "blindBox",
  components: {},
  setup() {
    const router = useRouter();
    const state = reactive({});
    const { blindBoxState, buyBox, openDragonBox, claimDms } = blindBoxHandle();
    return {
      ...toRefs(state),
      ...toRefs(blindBoxState),
      buyBox,
      openDragonBox,
      claimDms,
      Moment,
    };
  },
};
</script>

<style scoped lang="less">
.bind-box-right-main {
  width: 588px;
  //height: 535px;
  height: 100%;

  .wrap {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .top {
      // height: calc(270px - 44px);
      height: calc(290px - 44px);
      background: #282523;
      border-radius: 8px;
      border: 1px solid rgba(255, 255, 255, 0.08);
      padding: 24px 32px 20px 32px;

      .item-top {
        display: flex;
        //  justify-content: space-between;
        .item-left {
          flex: 1;
          .title {
            display: flex;
            align-items: center;
            .title-text {
              font-size: 16px;
              font-family: GothamRounded-Book, GothamRounded;
              font-weight: normal;
              color: rgba(255, 255, 255, 0.48);
            }
            .title-des {
              margin-left: 4px;
              font-size: 16px;
              font-family: GothamRounded-Book, GothamRounded;
              font-weight: normal;
              color: #ffffff;
            }
          }
          .value {
            margin-top: 10px;
            font-size: 20px;
            font-family: GothamRounded-Medium, GothamRounded;
            font-weight: 500;
            color: #ffffff;
          }
        }
        .item-right {
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          .title {
            display: flex;
            align-items: center;
            .title-text {
              font-size: 16px;
              font-family: GothamRounded-Book, GothamRounded;
              font-weight: normal;
              color: rgba(255, 255, 255, 0.48);
            }
            .title-des {
              margin-left: 4px;
              font-size: 16px;
              font-family: GothamRounded-Book, GothamRounded;
              font-weight: normal;
              color: #ffffff;
            }
          }
          .value {
            margin-top: 10px;
            font-size: 20px;
            font-family: GothamRounded-Medium, GothamRounded;
            font-weight: 500;
            color: #ffffff;
          }
        }
      }
      .item-mid {
        display: flex;
        // justify-content: space-between;
        margin-top: 40px;
        .item-left {
          flex: 1;
          .title {
            font-size: 16px;
            font-family: GothamRounded-Book, GothamRounded;
            font-weight: normal;
            color: rgba(255, 255, 255, 0.48);
          }
          .value {
            display: flex;
            align-items: center;
            margin-top: 10px;
            .text {
              font-size: 20px;
              font-family: GothamRounded-Medium, GothamRounded;
              font-weight: 500;
              color: #ffffff;
            }
            .img {
              margin-left: 8px;
              img {
                width: 20px;
                height: 20px;
              }
            }
          }
        }

        .item-right {
          flex: 1;
          .title {
            font-size: 16px;
            font-family: GothamRounded-Book, GothamRounded;
            font-weight: normal;
            color: rgba(255, 255, 255, 0.48);
          }
          .value {
            display: flex;
            align-items: center;
            margin-top: 10px;
            .text {
              font-size: 16px;
              font-family: GothamRounded-Medium, GothamRounded;
              font-weight: 500;
              color: #ffc763;
              letter-spacing: 2px;
            }
            .text-no {
              font-size: 20px;
              font-family: GothamRounded-Medium, GothamRounded;
              font-weight: 500;
              color: #ffffff;
            }
          }
        }
      }
      .item-bottom {
        // margin-top: 30px;
        margin-top: 25px;
        .btns {
          display: flex;
          align-items: center;
          .activity-wrap {
            display: flex;
            align-items: center;
            .btn-wrap1 {
              .buy-box {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 352px;
                //  height: 54px;
                height: 48px;
                background: #ffc763;
                border-radius: 27px;
                font-size: 16px;
                font-family: GothamRounded-Medium, GothamRounded;
                font-weight: 500;
                color: #2e0b00;
              }
            }
            .btn-wrap2 {
              margin-left: 24px;
              .return-dms {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 148px;
                //  height: 54px;
                height: 48px;
                border-radius: 27px;
                opacity: 0.2;
                border: 1px solid rgba(255, 255, 255, 0.28);
                font-size: 16px;
                font-family: GothamRounded-Medium, GothamRounded;
                font-weight: 500;
                color: #ffffff;
              }
              .return-dms-able {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 148px;
                //  height: 54px;
                height: 48px;
                border-radius: 27px;
                // opacity: 1;
                border: 1px solid rgba(255, 255, 255, 0.28);
                font-size: 16px;
                font-family: GothamRounded-Medium, GothamRounded;
                font-weight: 500;
                color: #ffffff;
              }
            }
            .btn-wrap3 {
              display: flex;
              align-items: center;
              .face-img {
                display: flex;
                align-items: center;
                justify-content: center;
                img {
                  width: 24px;
                  height: 24px;
                }
              }
              .face-text {
                margin-left: 5px;
                font-size: 16px;
                font-family: GothamRounded-Medium, GothamRounded;
                font-weight: 500;
                color: #53b372;
              }
            }

            .btn-wrap4 {
              display: flex;
              align-items: center;
              .face-img {
                display: flex;
                align-items: center;
                justify-content: center;
                img {
                  width: 24px;
                  height: 24px;
                }
              }
              .face-text {
                margin-left: 5px;
                font-size: 16px;
                font-family: GothamRounded-Medium, GothamRounded;
                font-weight: 500;
                color: rgba(255, 255, 255, 0.48);
              }
              .buy-box {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 352px;
                //  height: 54px;
                height: 48px;
                background: #ffc763;
                border-radius: 27px;
                font-size: 16px;
                font-family: GothamRounded-Medium, GothamRounded;
                font-weight: 500;
                color: #2e0b00;
              }
            }
          }
        }
      }
    }
    .botom {
      height: calc(241px - 48px);
      background: #282523;
      border-radius: 8px;
      border: 1px solid rgba(255, 255, 255, 0.08);
      padding: 24px 32px;
      .botom-title {
        font-size: 16px;
        font-family: GothamRounded-Book, GothamRounded;
        font-weight: normal;
        color: rgba(255, 255, 255, 0.48);
      }
      .botom-num {
        margin-top: 10px;
        font-size: 20px;
        font-family: GothamRounded-Medium, GothamRounded;
        font-weight: 500;
        color: #ffffff;
      }
      .botom-btn-wrap {
        margin-top: 40px;
        .btn-wrap {
          .open-box-btn {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 250px;
            height: 54px;
            background: #ffc763;
            border-radius: 27px;
            font-size: 16px;
            font-family: GothamRounded-Medium, GothamRounded;
            font-weight: 500;
            color: #2e0b00;
          }
        }
      }
      .botom-skulls-wrap {
        margin-top: 36px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 16px;
        font-family: GothamRounded-Book, GothamRounded;
        font-weight: normal;
        color: rgba(255, 255, 255, 0.48);
        .wrap-title {
        }
        .wrap-item {
          display: flex;
          align-items: center;
          .num {
            font-size: 16px;
            font-family: GothamRounded-Medium, GothamRounded;
            font-weight: 500;
            color: #ffffff;
          }
          .text {
            margin-left: 12px;
          }
        }
      }
    }
  }
}
</style>