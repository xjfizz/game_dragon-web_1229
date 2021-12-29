<template>
  <div class="wrap1" v-if="detailPath == 2">
    <div class="left">
      <div class="top">
        <div class="top-wrap" @click="back">
          <div class="back-btn">
            <img src="@/assets/imgs/myMainland/myDragon/back.png" alt="" />
          </div>
          <div class="back-text">Back</div>
        </div>
      </div>
      <div class="detail-level">
        <div class="wrap" v-if="dragonDetail.skullProduct">
          {{ createDragonSkullsLevel(dragonDetail.skullProduct.level) }}-level
        </div>
      </div>
      <div class="tetail-num">
        <div class="wrap" v-if="dragonDetail.skullProduct">
          X {{ dragonDetail.skullProduct.overNum }}
          <div class="wrap-total">
            / {{ dragonDetail.skullProduct.totalNum }}
          </div>
        </div>
        <div class="dragon-my-btn">
          <div class="btn-wrap" v-if="false">
            <div class="item-btn select-hover" @click="sendDragon">
              <img
                src="@/assets/imgs/myMainland/dragonDetail/dragon-my-btn/gift.png"
                alt=""
              />
            </div>
            <div class="item-btn select-hover">
              <img
                src="@/assets/imgs/myMainland/dragonDetail/dragon-my-btn/synthesis.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <div class="mid-wrap">
        <div class="mid-egg" v-if="dragonDetail.skullProduct">
          <img
            class="egg-img"
            :src="dragonSkullsImgHandle(dragonDetail.skullProduct.level)"
            alt=""
          />
          <img
            class="egg-bottom-img"
            src="@/assets/imgs/myMainland/bind-box/skulls-list/detail/egg-bottom.png"
            alt=""
          />
        </div>
        <!-- <div class="mid-egg-bottom">
            
            </div> -->
        <div class="mid-egg-bottom-stone">
          <img
            src="@/assets/imgs/myMainland/myDragon/egg-bottom-stone.png"
            alt=""
          />
        </div>
      </div>

      <div class="btns-wrap-main">
        <div class="bottom">
          <div
            v-if="
              dragonDetail.skullProduct &&
              dragonDetail.skullProduct.saleType == 2
            "
            class="market-time"
          >
            <div class="time-top-days">
              in
              {{ dragonDetail.skullProduct.auctionHour / 24 }} days
            </div>
            <div class="time-top">
              <div
                class="time-left"
                v-if="dragonDetail.timeProgress == '100%'"
              ></div>
              <div v-else class="time-left-max"></div>
              <div class="time-mid">
                <div
                  class="time-mid-value"
                  :style="{
                    width: dragonDetail.timeProgress,
                  }"
                ></div>
                <!--  :style="{height:homeHeight}" -->
              </div>
              <div
                class="time-right"
                v-if="dragonDetail.timeProgress != '0%'"
              ></div>
              <div v-else class="time-right-max"></div>
            </div>
            <div class="time-bottom">
              <div class="left-text-round">
                {{ dragonDetail.skullProduct.auctionHighestPrice }}
              </div>
              <div class="right-text-round">
                {{ dragonDetail.skullProduct.auctionLowestPrice }}
              </div>
            </div>
          </div>
          <div class="btn-market-des">
            <div class="market-des-top">
              <div class="img">
                <img
                  src="../../../../../../../assets/imgs/myMainland/bnb-coin.png"
                  alt=""
                />
              </div>
              <div v-if="dragonDetail.skullProduct" class="text">
                {{ dragonDetail.skullProduct.price }}
              </div>
            </div>
            <!-- <div class="market-des-bottom">
              <div class="text-second">100,000,000</div>
            </div> -->
          </div>
          <div class="btn-wraps">
            <div
              v-if="dragonAddress == myAddress"
              class="bottom-bottom-text-up"
              @click="cancelListing"
            >
              <div class="btn-text hover-select">Cancel listing</div>
            </div>
            <div
              v-if="dragonAddress != myAddress"
              class="bottom-bottom-text-buy"
              @click="buyMarketDragon"
            >
              <!-- <img src="@/assets/imgs/myMainland/dragonDetail/bnb.png" alt="" /> -->
              <div class="btn-text hover-select">Buy now</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="right-wrap">
        <div class="right-about">
          <div class="title">About</div>
          <div class="about-content">
            <div class="about-content-wrap">
              <div class="about-top">
                <div class="about-left">
                  <div class="about-left-top">Class</div>
                  <div class="about-left-bottom">
                    <div
                      class="left-bottom-img"
                      v-if="dragonDetail.skullProduct"
                    >
                      <img
                        :src="
                          dragonClazzImgHandle(dragonDetail.skullProduct.clazz)
                        "
                        alt=""
                      />
                    </div>
                    <div
                      class="left-bottom-text"
                      v-if="dragonDetail.skullProduct"
                    >
                      {{ dragonLocalTypeName[dragonDetail.skullProduct.clazz] }}
                      Dragon
                    </div>
                  </div>
                </div>
                <div class="about-mid">
                  <div class="about-mid-top">Level</div>
                  <div
                    class="about-mid-bottom"
                    v-if="dragonDetail.skullProduct"
                  >
                    {{
                      createDragonSkullsLevel(dragonDetail.skullProduct.level)
                    }}-level
                  </div>
                </div>
                <div class="about-right">
                  <div class="about-right-top">Quantity</div>
                  <div
                    class="about-right-bottom"
                    v-if="dragonDetail.skullProduct"
                  >
                    {{ dragonDetail.skullProduct.overNum }}
                  </div>
                </div>
              </div>
              <div class="right-about-bottom">
                <div class="title">Owner</div>
                <div class="address">
                  {{ myAddress }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="right-sale-history" v-if="saleHistoryList.length > 0">
          <div class="title">Sale history</div>
          <div class="about-content">
            <div class="about-content-wrap">
              <div
                class="history-item"
                v-for="(item, index) in saleHistoryList"
                :key="index"
              >
                <div class="history-left">
                  <div class="history-item-top">Buyer</div>
                  <div class="history-item-bottom">
                    {{ common.formatAddress(item.toAddress) }}
                  </div>
                </div>
                <div class="history-mid">
                  <div class="history-item-top">Seller</div>
                  <div class="history-item-bottom">
                    {{ common.formatAddress(item.fromAddress) }}
                  </div>
                </div>
                <div class="history-right">
                  <div class="history-item-top">
                    {{
                      Moment(item.updateTime)
                        .utc(0)
                        .format("YYYY-MM-DD hh:mm:ss")
                    }}
                  </div>
                  <div class="history-item-bottom">
                    {{ item.saleNum }} for {{ item.totalPrice }} DMS
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- page -->
          <page
            v-if="pageInfo.totalPages > 1"
            :pageInfo="pageInfo"
            @leftPage="leftPage"
            @rightPage="rightPage"
            @search="search"
          ></page>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, toRefs, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import common from "@/utils/common";
import dragonSkullDetail from "@/views/pc/myMainland/use/dragonSkullDetail";
import myDragon from "@/views/pc/myMainland/use/myDragon";
import dragonCreate from "../../../../components/dragonCreate/indexCreateDetail.vue";
import indexCreateUpload from "../../../../components/dragonCreate/indexCreateUpload.vue";
import dragonCreateParent from "../../../../components/dragonCreate/indexCreateParent.vue";
import lottie from "vue-lottie/src/lottie.vue";
import page from "@/components/page/index.vue";
import Moment from "moment";
export default {
  name: "detail1",
  components: {
    dragonCreate,
    indexCreateUpload,
    lottie,
    dragonCreateParent,
    page,
  },
  setup() {
    const router = useRouter();
    const state = reactive({});
    const {
      dragonSkullsImgHandle,
      myDragonState,
      createDragon,
      createDragonPart,
      dragonClazzImgHandle,
      createDragonSkullsLevel,
    } = myDragon();
    const {
      myDragonDetailState,
      init,
      back,
      openDradonEgg,
      handleAnimation,
      sendDragon,
      goParentDetail,
      cancelListing,
      buyMarketDragon,
      upDragon,
      leftPage,
      rightPage,
      search,
    } = dragonSkullDetail();
    onMounted(() => {
      common.goTopScroll();
    });

    onBeforeUnmount(() => {
      if (
        myDragonDetailState.dragonDetail &&
        myDragonDetailState.dragonDetail.countDownFn
      ) {
        clearInterval(myDragonDetailState.dragonDetail.countDownFn);
      }
    });

    return {
      ...toRefs(state),
      ...toRefs(myDragonState),
      ...toRefs(myDragonDetailState),
      dragonSkullsImgHandle,
      back,
      openDradonEgg,
      createDragon,
      createDragonPart,
      handleAnimation,
      handleAnimation,
      dragonClazzImgHandle,
      sendDragon,
      goParentDetail,
      cancelListing,
      buyMarketDragon,
      upDragon,
      leftPage,
      rightPage,
      search,
      createDragonSkullsLevel,
      Moment,
      common,
    };
  },
};
</script>

<style lang="less" scoped >
.wrap1 {
  display: flex;
  justify-content: space-between;
  width: 1200px;
  margin-top: 30px;
  .left {
    width: 463px;
    // background-color: #ff5400;
    .top {
      display: flex;
      align-items: center;
      .top-wrap {
        display: flex;
        align-items: center;
        cursor: pointer;
        .back-btn {
          display: flex;
          align-items: center;
          img {
            width: calc(48px * 0.5);
            height: calc(48px * 0.5);
          }
        }
        .back-text {
          display: flex;
          align-items: center;
          margin-left: 4px;
          font-size: 14px;
          font-family: GothamRounded-Medium, GothamRounded;
          font-weight: 500;
          color: #ffffff;
        }
      }
    }
    .detail-level {
      margin-top: 30px;
      .wrap {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 120px;
        height: 25px;
        background: linear-gradient(
          180deg,
          rgba(235, 184, 148, 0.48) 0%,
          rgba(54, 24, 39, 0.48) 100%
        );
        border-radius: 4px;
        font-size: 14px;
        font-family: GothamRounded-Medium, GothamRounded;
        font-weight: 500;
        color: #ffffff;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .tetail-num {
      margin-top: 11px;
      display: flex;
      align-items: center;
      .wrap {
        padding-left: 5px;
        padding-right: 5px;
        min-width: 57px;
        height: 32px;
        background: rgba(26, 23, 22, 0.68);
        border-radius: 4px;
        font-size: 11px;
        font-family: GothamRounded-Book, GothamRounded;
        font-weight: normal;
        color: rgba(255, 255, 255, 0.83);
        display: flex;
        justify-content: center;
        align-items: center;
        .wrap-total {
          margin-left: 4px;
          font-size: 10px;
          font-family: GothamRounded-Book;
          font-weight: normal;
          color: rgba(255, 255, 255, 0.26);
        }
      }
    }
    .mid-wrap {
      width: 100%;
      height: 488px;
      position: relative;
      margin-top: -40px;
      // background-color: #ff5400;
      .mid-egg {
        width: 100%;
        position: absolute;
        top: 40px;
        left: 50%;
        transform: translateX(-50%);
        animation: eggMove 2s infinite alternate;
        -webkit-animation: eggMove 2s infinite alternate;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        z-index: 500;
        .egg-img {
          width: calc(463px * 0.6);
          height: calc(400px * 0.6);
        }
        .egg-bottom-img {
          margin-top: -30px;
          width: calc(132px * 1);
          height: calc(60px * 1);
        }
      }

      .mid-egg-bottom-stone {
        position: absolute;
        top: 220px;
        left: 50%;
        transform: translateX(-50%);
        img {
          width: calc(463px * 0.8);
          height: calc(239px * 0.8);
        }
      }
    }

    .bottom {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: -60px;
      .market-time {
        .time-top-days {
          font-size: 13px;
          font-family: GothamRounded-Book, GothamRounded;
          font-weight: normal;
          color: #ffffff;
          opacity: 0.48;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .time-top {
          display: flex;
          align-items: center;
          margin-top: 5px;
          .time-left {
            position: relative;
            width: 7px;
            height: 7px;
            background: #f59e64;
            border-radius: 10px;
            border: 1px solid #f59e64;
            position: relative;
            z-index: 99;
          }
          .time-left-max {
            position: relative;
            width: 7px;
            height: 7px;
            background: #09090a;
            border-radius: 10px;
            border: 1px solid #09090a;
            position: relative;
            z-index: 99;
          }
          .time-mid {
            width: 268px;
            height: 3px;
            background: #09090a;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            .time-mid-value {
              // width: 100px;
              height: 3px;
              background: #f59e64;
              border-top-left-radius: 100px 50px;
              border-top-right-radius: 100px 50px;
              border-bottom-left-radius: 100px 50px;
              border-bottom-right-radius: 100px 50px;
            }
          }
          .time-right {
            position: relative;
            width: 7px;
            height: 7px;
            background: #f59e64;
            border-radius: 10px;
            border: 1px solid #f59e64;
            position: relative;
            z-index: 99;
          }
          .time-right-max {
            position: relative;
            width: 7px;
            height: 7px;
            background: #09090a;
            border-radius: 10px;
            border: 1px solid #09090a;
            position: relative;
            z-index: 99;
          }
        }
        .time-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 10px;
          .left-text-round {
            font-size: 13px;
            font-family: GothamRounded-Book, GothamRounded;
            font-weight: normal;
            color: rgba(255, 255, 255, 0.48);
          }
          .right-text-round {
            font-size: 13px;
            font-family: GothamRounded-Book, GothamRounded;
            font-weight: normal;
            color: rgba(255, 255, 255, 0.48);
          }
        }
      }
      .btn-market-des {
        margin-top: 10px;
        .market-des-top {
          display: flex;
          justify-content: center;
          align-items: center;
          .img {
            img {
              width: 28px;
              height: 28px;
            }
          }
          .text {
            margin-left: 10px;
            font-size: 24px;
            font-family: GothamRounded-Book, GothamRounded;
            font-weight: normal;
            color: #ffffff;
          }
        }
        .market-des-bottom {
          margin-top: 8px;

          .text-second {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 16px;
            font-family: GothamRounded-Book, GothamRounded;
            font-weight: normal;
            color: #ffffff;
            opacity: 0.48;
          }
        }
      }
      .bottom-top-text {
        font-size: 24px;
        font-family: GothamRounded-Book, GothamRounded;
        font-weight: normal;
        color: #ffffff;
        display: flex;
        align-items: center;
        .top-text {
          display: flex;
          flex-direction: column;
          font-size: 14px;
        }
        .top-price {
          margin-left: 10px;
          font-size: 18px;
        }
      }
      .bottom-mid-text {
        font-size: 16px;
        font-family: GothamRounded-Book, GothamRounded;
        font-weight: normal;
        color: #ffffff;
        opacity: 0.48;
        margin-top: 8px;
      }
      .btn-wraps {
        display: flex;
        align-items: center;
        position: relative;
        z-index: 999;
        .bottom-bottom-text-sell {
          width: 110px;
          height: 50px;
          background: #ffc763;
          border-radius: 25px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 24px;
          cursor: pointer;
          img {
            width: 19px;
            height: 18px;
          }
          .btn-text {
            margin-left: 8px;
            font-size: 16px;
            font-family: GothamRounded-Medium, GothamRounded;
            font-weight: 500;
            color: #2e0b00;
          }
        }
        .bottom-bottom-text-breed {
          margin-left: 8px;
          width: 110px;

          height: 50px;
          background: #282523;
          border-radius: 25px;
          border: 1px solid rgba(255, 255, 255, 0.28);
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 24px;
          cursor: pointer;
          img {
            width: 20px;
            height: 20px;
          }
          .btn-text {
            margin-left: 8px;
            font-size: 16px;
            font-family: GothamRounded-Medium, GothamRounded;
            font-weight: 500;
            color: #ffffff;
          }
        }
        .bottom-bottom-text-up {
          margin-left: 20px;
          width: 154px;
          height: 50px;
          border-radius: 25px;
          border: 1px solid #ffc763;

          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 24px;
          cursor: pointer;
          img {
            width: 20px;
            height: 20px;
          }
          .btn-text {
            font-size: 16px;
            font-family: GothamRounded-Medium, GothamRounded;
            font-weight: 500;
            color: #ffc763;
          }
        }

        .bottom-bottom-text-buy {
          margin-left: 20px;
          width: 154px;
          height: 50px;
          border-radius: 25px;
          border: 1px solid #ffc763;
          background: #ffc763;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 24px;
          cursor: pointer;

          img {
            width: 20px;
            height: 20px;
          }
          .btn-text {
            font-size: 16px;
            font-family: GothamRounded-Medium, GothamRounded;
            font-weight: 500;
            color: #2e0b00;
          }
        }
        .bottom-bottom-text-mining {
          margin-left: 8px;
          width: 110px;
          height: 50px;
          background: #282523;
          border-radius: 25px;
          border: 1px solid rgba(255, 255, 255, 0.28);
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 24px;
          cursor: pointer;
          img {
            width: 25px;
            height: 24px;
          }
          .btn-text {
            margin-left: 8px;
            font-size: 16px;
            font-family: GothamRounded-Medium, GothamRounded;
            font-weight: 500;
            color: #ffffff;
          }
        }
      }
      .btn-wraps-lock {
        .lock-text {
          font-size: 16px;
          font-family: GothamRounded-Medium, GothamRounded;
          font-weight: 500;
          color: #ffffff;
        }
        .lock-list-btn {
          margin-top: 24px;
          .btn {
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 154px;
            height: 50px;
            border-radius: 25px;
            border: 1px solid #ffc763;
            font-size: 16px;
            font-family: GothamRounded-Medium, GothamRounded;
            font-weight: 500;
            color: #ffc763;
          }
        }
      }
    }
  }
  .right {
    width: 737px;
    height: 700px;
    min-height: 700px;
    overflow-y: scroll;
    .right-wrap {
      // height: 1000px;
      // overflow-y: scroll;
      margin-left: 126px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      // background-color: #ff5400;

      .right-about {
        // margin-top: 40px;
        .title {
          font-size: 20px;
          font-family: GothamRounded-Medium, GothamRounded;
          font-weight: 500;
          color: #ffffff;
        }
        .about-content {
          width: 591px;
          height: 190px;
          background: #282523;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          margin-top: 16px;
          .about-content-wrap {
            padding: 24px 32px;
            .about-top {
              display: flex;
              // justify-content: space-between;
              .about-left {
                .about-left-top {
                  font-size: 16px;
                  font-family: GothamRounded-Book, GothamRounded;
                  font-weight: normal;
                  color: #ffffff;
                  opacity: 0.48;
                }
                .about-left-bottom {
                  margin-top: 8px;
                  display: flex;
                  align-items: center;
                  .left-bottom-img {
                    margin-left: -10px;
                    img {
                      width: 32px;
                      height: 32px;
                    }
                  }
                  .left-bottom-text {
                    font-size: 14px;
                    font-family: GothamRounded-Medium, GothamRounded;
                    font-weight: 500;
                    color: #ffffff;
                    white-space: nowrap;
                  }
                }
              }
              .about-mid {
                margin-left: 100px;
                .about-mid-top {
                  font-size: 16px;
                  font-family: GothamRounded-Book, GothamRounded;
                  font-weight: normal;
                  color: #ffffff;
                  opacity: 0.48;
                  white-space: nowrap;
                }
                .about-mid-bottom {
                  display: flex;
                  align-items: center;
                  height: 32px;
                  margin-top: 8px;
                  font-size: 14px;
                  font-family: GothamRounded-Medium, GothamRounded;
                  font-weight: 500;
                  color: #ffffff;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }
              }
              .about-right {
                margin-left: 100px;
                .about-right-top {
                  font-size: 16px;
                  font-family: GothamRounded-Book, GothamRounded;
                  font-weight: normal;
                  color: #ffffff;
                  opacity: 0.48;
                }
                .about-right-bottom {
                  display: flex;
                  align-items: center;
                  height: 32px;
                  margin-top: 8px;
                  font-size: 14px;
                  font-family: GothamRounded-Medium, GothamRounded;
                  font-weight: 500;
                  color: #ffffff;
                }
              }
            }
            .right-about-bottom {
              margin-top: 32px;
              .title {
                font-size: 16px;
                font-family: GothamRounded-Book, GothamRounded;
                font-weight: normal;
                color: #ffffff;
                opacity: 0.48;
              }
              .address {
                margin-top: 8px;
                font-size: 14px;
                font-family: GothamRounded-Medium, GothamRounded;
                font-weight: 500;
                color: #ffffff;
              }
            }
          }
        }
      }

      .right-sale-history {
        margin-top: 25px;
        .title {
          font-size: 20px;
          font-family: GothamRounded-Medium, GothamRounded;
          font-weight: 500;
          color: #ffffff;
        }
        .about-content {
          width: 591px;
          min-height: 540px;
          background: #282523;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          margin-top: 16px;
          .about-content-wrap {
            .history-item {
              padding: 24px 32px;
              display: flex;
              align-items: center;
              justify-content: center;
              height: calc(89px- 64px);
              border-bottom: 1px solid rgba(255, 255, 255, 0.08);
              .history-left {
                flex: 1;
                .history-item-top {
                  font-size: 16px;
                  font-family: GothamRounded-Book, GothamRounded;
                  font-weight: normal;
                  color: rgba(255, 255, 255, 0.48);
                }
                .history-item-bottom {
                  margin-top: 10px;
                  font-size: 14px;
                  font-family: GothamRounded-Medium, GothamRounded;
                  font-weight: 500;
                  color: #ffffff;
                }
              }
              .history-mid {
                flex: 1;
                .history-item-top {
                  font-size: 16px;
                  font-family: GothamRounded-Book, GothamRounded;
                  font-weight: normal;
                  color: rgba(255, 255, 255, 0.48);
                }
                .history-item-bottom {
                  margin-top: 10px;
                  font-size: 14px;
                  font-family: GothamRounded-Medium, GothamRounded;
                  font-weight: 500;
                  color: #ffffff;
                }
              }
              .history-right {
                flex: 1;
                .history-item-top {
                  display: flex;
                  justify-content: flex-end;
                  font-size: 16px;
                  font-family: GothamRounded-Book, GothamRounded;
                  font-weight: normal;
                  color: rgba(255, 255, 255, 0.48);
                }
                .history-item-bottom {
                  display: flex;
                  justify-content: flex-end;
                  margin-top: 10px;
                  font-size: 14px;
                  font-family: GothamRounded-Medium, GothamRounded;
                  font-weight: 500;
                  color: #ffffff;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>