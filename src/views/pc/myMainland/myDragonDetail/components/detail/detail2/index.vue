<template>
  <div
    class="wrap2"
    v-if="
      !dragonDetail.countDownTime &&
      dragonDetail.status == 1 &&
      dragonDetail.lockStatus != 3
    "
    v-loading="loadingForm.loadingShow"
    :element-loading-text="loadingForm.loadingShowText"
    element-loading-spinner="el-icon-loading"
  >
    <div class="left">
      <div class="top">
        <div class="top-wrap" @click="back">
          <div class="back-btn">
            <img src="@/assets/imgs/myMainland/myDragon/back.png" alt="" />
          </div>
          <div class="back-text">Back</div>
        </div>
      </div>
      <div class="detail-color">
        <div
          class="color-wrap"
          :class="'top-color-status' + dragonLocalTypeList[dragonDetail.clazz]"
        >
          # {{ dragonDetail.no }}
        </div>
        <div class="color-genesis" v-if="dragonDetail.no <= 10000">Genesis</div>
        <!-- <div v-if="dragonAddress == myAddress && dragonDetail.lockStatus == 0" class="seng-dragon" @click="sendDragon">
          <img src="@/assets/imgs/myMainland/dragonDetail/send.png" alt="" />
          <div class="send-dragon-text">Transfer</div>
        </div> -->
      </div>
      <div class="tetail-title">
        <div class="title-name">Dragon</div>
        <div class="title-color"># {{ dragonDetail.no }}</div>
        <div
          class="dragon-my-btn"
          v-if="dragonAddress == myAddress && dragonDetail.lockStatus == 0"
        >
          <div class="btn-wrap">
            <div
              class="item-btn select-bc-hover"
              @click="sendDragon"
              @mouseenter="tipList[0].show = true"
              @mouseleave="tipList[0].show = false"
            >
              <img
                src="@/assets/imgs/myMainland/dragonDetail/dragon-my-btn/gift.png"
                alt=""
              />
              <PopupMsg
                class="right-img-msg"
                :showPopop="tipList[0].show"
                :msgList="tipList[0].text"
                :showIndex="false"
              />
            </div>
            <!-- <div class="item-btn select-hover">
              <img
                src="@/assets/imgs/myMainland/dragonDetail/dragon-my-btn/hearts.png"
                alt=""
              />
            </div>
            <div class="item-btn">
              <img
                src="@/assets/imgs/myMainland/dragonDetail/dragon-my-btn/stake.png"
                alt=""
              />
            </div> -->
          </div>
        </div>
      </div>
      <div class="mid-wrap">
        <div class="mid-egg">
          <img
            class="egg-img"
            v-show="!isStartDragon"
            :src="dragonEggImgHandle(dragonDetail.clazz)"
            alt=""
          />
          <div
            v-if="isStartDragon"
            ref="eggToDragon"
            id="eggToDragon"
            class="lottie"
          >
            <lottie
              :options="defaultOptions"
              v-on:animCreated="handleAnimation"
            />
          </div>

          <img
            v-show="!isStartDragon"
            class="egg-bottom-img"
            src="@/assets/imgs/myMainland/myDragon/egg-bottom.png"
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
      <!-- <div class="mid-des">Egg is incubating…</div> -->
      <div class="btns-wrap-main">
        <!-- <div class="bottom" v-show="!isStartDragon">
          <div class="mid-bottom-btn" @click.stop="openDradonEgg(dragonDetail)">
            Claim
          </div>
        </div> -->

        <div class="bottom">
          <div class="btn-wraps">
            <div
              v-show="
                !isStartDragon &&
                dragonAddress == myAddress &&
                dragonDetail.lockStatus == 0
              "
              class="bottom-bottom-text-up"
              @click.stop="openDradonEgg(dragonDetail)"
            >
              <div class="btn-text hover-select">Claim</div>
            </div>

            <div
              v-if="dragonAddress == myAddress"
              class="bottom-bottom-text-sell hover-select"
              @click="upDragon"
            >
              <img
                src="@/assets/imgs/myMainland/dragonDetail/sell.png"
                alt=""
              />
              <div class="btn-text">Sell</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="right-wrap">
        <div class="right-create-egg">
          <div class="title"></div>
          <div class="about-content">
            <div class="about-content-wrap">
              <div class="mid-des">Egg is finish hatching</div>
              <div class="bottom">
                <div class="time-list">
                  <div
                    class="time-item"
                    v-for="(item2, index2) in 4"
                    :key="index2"
                  >
                    00
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="right-about">
          <div class="title">About</div>
          <div class="about-content">
            <div class="about-content-wrap">
              <div class="about-top">
                <div class="about-left">
                  <div class="about-left-top">Class</div>
                  <div class="about-left-bottom">
                    <div class="left-bottom-img">
                      <img
                        :src="dragonClazzImgHandle(dragonDetail.clazz)"
                        alt=""
                      />
                    </div>
                    <div class="left-bottom-text">
                      {{ dragonLocalTypeName[dragonDetail.clazz] }} Dragon
                    </div>
                  </div>
                </div>
                <div class="about-mid">
                  <div class="about-mid-top">Breed count</div>
                  <div class="about-mid-bottom">
                    {{ dragonDetail.breedCount }}/7
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

        <div
          class="right-parents"
          v-if="!!dragonDetail.fatherDetail && !!dragonDetail.motherDetail"
        >
          <div class="title">Parents</div>
          <div class="content">
            <div class="content-wrap">
              <div class="wrap-item">
                <div
                  class="item"
                  :class="
                    dragonDetail.fatherDetail.status == -1 ? 'no-data' : ''
                  "
                  @click="goParentDetail(dragonDetail.fatherDetail)"
                >
                  <div class="parent-wrap">
                    <div class="top">
                      <div
                        class="color-wrap"
                        :class="
                          'top-color-status' +
                          dragonLocalTypeList[dragonDetail.fatherDetail.clazz]
                        "
                      >
                        # {{ dragonDetail.fatherDetail.no }}
                      </div>
                    </div>
                    <div class="breed">
                      Breed count: {{ dragonDetail.fatherDetail.breedCount }}
                    </div>
                    <div class="ce">
                      <div class="top-ce">
                        <div class="top-ce-img">
                          <img
                            :src="
                              dragonClazzImgHandle(
                                dragonDetail.fatherDetail.clazz
                              )
                            "
                            alt=""
                          />
                        </div>

                        <!-- <div class="top-ce-des">CE: {{ dragonDetail.ce }}</div> -->
                      </div>
                    </div>
                    <div class="dragon">
                      <dragonCreateParent
                        ref="dragonCreateParent"
                        :dragonImgEye="
                          createDragon(dragonDetail.fatherDetail.parts[0])
                        "
                        :dragonImgWing="
                          createDragon(dragonDetail.fatherDetail.parts[4])
                        "
                        :dragonImgHorn="
                          createDragon(dragonDetail.fatherDetail.parts[2])
                        "
                        :dragonImgBody="
                          createDragon(dragonDetail.fatherDetail.parts[6])
                        "
                        :dragonImgTotems="
                          createDragon(dragonDetail.fatherDetail.parts[1])
                        "
                        :dragonImgEar="
                          createDragon(dragonDetail.fatherDetail.parts[3])
                        "
                        :dragonImgTail="
                          createDragon(dragonDetail.fatherDetail.parts[5])
                        "
                      ></dragonCreateParent>
                    </div>
                  </div>
                </div>
                <div
                  class="item"
                  :class="
                    dragonDetail.motherDetail.status == -1 ? 'no-data' : ''
                  "
                  @click="goParentDetail(dragonDetail.motherDetail)"
                >
                  <div class="parent-wrap">
                    <div class="top">
                      <div
                        class="color-wrap"
                        :class="
                          'top-color-status' +
                          dragonLocalTypeList[dragonDetail.motherDetail.clazz]
                        "
                      >
                        # {{ dragonDetail.motherDetail.no }}
                      </div>
                    </div>
                    <div class="breed">
                      Breed count: {{ dragonDetail.motherDetail.breedCount }}
                    </div>
                    <div class="ce">
                      <div class="top-ce">
                        <div class="top-ce-img">
                          <img
                            :src="
                              dragonClazzImgHandle(
                                dragonDetail.motherDetail.clazz
                              )
                            "
                            alt=""
                          />
                        </div>

                        <!-- <div class="top-ce-des">CE: {{ dragonDetail.ce }}</div> -->
                      </div>
                    </div>
                    <div class="dragon">
                      <dragonCreateParent
                        ref="dragonCreateParent"
                        :dragonImgEye="
                          createDragon(dragonDetail.motherDetail.parts[0])
                        "
                        :dragonImgWing="
                          createDragon(dragonDetail.motherDetail.parts[4])
                        "
                        :dragonImgHorn="
                          createDragon(dragonDetail.motherDetail.parts[2])
                        "
                        :dragonImgBody="
                          createDragon(dragonDetail.motherDetail.parts[6])
                        "
                        :dragonImgTotems="
                          createDragon(dragonDetail.motherDetail.parts[1])
                        "
                        :dragonImgEar="
                          createDragon(dragonDetail.motherDetail.parts[3])
                        "
                        :dragonImgTail="
                          createDragon(dragonDetail.motherDetail.parts[5])
                        "
                      ></dragonCreateParent>
                    </div>
                  </div>
                </div>
              </div>
              <!-- <div v-else class="no-data">No data</div> -->
            </div>
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
import myDragonDetail from "@/views/pc/myMainland/use/myDragonDetail";
import myDragon from "@/views/pc/myMainland/use/myDragon";
import dragonCreate from "../../../../components/dragonCreate/indexCreateDetail.vue";
import indexCreateUpload from "../../../../components/dragonCreate/indexCreateUpload.vue";
import dragonCreateParent from "../../../../components/dragonCreate/indexCreateParent.vue";
import lottie from "vue-lottie/src/lottie.vue";
import PopupMsg from "@/components/popup/dragon-opt-tip.vue";
export default {
  name: "detail1",
  components: {
    dragonCreate,
    indexCreateUpload,
    lottie,
    dragonCreateParent,
    PopupMsg,
  },
  setup() {
    const router = useRouter();
    const state = reactive({});
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
      goParentDetail,
      cancelListing,
      buyMarketDragon,
      upDragon,
    } = myDragonDetail();
    onMounted(() => {
      common.goTopScroll();
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
      goParentDetail,
      cancelListing,
      buyMarketDragon,
      upDragon,
    };
  },
};
</script>

<style lang="less" scoped >
.wrap2 {
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
    .detail-color {
      margin-top: 10px;
      display: flex;
      align-items: center;
      .color-wrap {
        width: 68px;
        height: 20px;
        background: #d58047;
        border-radius: 4px;
        font-size: 14px;
        font-family: GothamRounded-Medium, GothamRounded;
        font-weight: 500;
        color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        white-space: nowrap;
      }
      .top-color-status1 {
        background: #d58047;
      }
      .top-color-status2 {
        background: #d5b32d;
      }
      .top-color-status3 {
        background: #44a3cf;
      }
      .top-color-status4 {
        background: #53b372;
      }
      .top-color-status5 {
        background: #926b59;
      }
      .color-genesis {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 8px;
        width: 71px;
        height: 20px;
        background: #8247d5;
        border-radius: 4px;
        font-size: 14px;
        font-family: GothamRounded-Medium, GothamRounded;
        font-weight: 500;
        color: #ffffff;
      }
      .seng-dragon {
        width: 140px;
        height: 45px;
        border-radius: 25px;
        border: 1px solid rgba(255, 255, 255, 0.28);
        font-size: 16px;
        font-family: GothamRounded-Medium, GothamRounded;
        font-weight: 500;
        color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: auto;
        cursor: pointer;
        img {
          width: 20px;
          height: 20px;
        }
        .send-dragon-text {
          margin-left: 9px;
        }
      }
    }
    .tetail-title {
      // margin-top: 16px;
      display: flex;
      align-items: center;
      .title-name {
        font-size: 28px;
        font-family: GothamRounded-Medium, GothamRounded;
        font-weight: 500;
        color: #ffffff;
      }
      .title-color {
        margin-left: 10px;
        font-size: 28px;
        font-family: GothamRounded-Medium, GothamRounded;
        font-weight: 500;
        color: #ffffff;
      }
    }
    .mid-wrap {
      width: 100%;
      height: 488px;
      position: relative;
      // background-color: #ff5400;
      z-index: 500;
      margin-top: -40px;
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
          width: calc(602px * 0.4);
          height: calc(536px * 0.4);
        }
        .egg-bottom-img {
          margin-top: -200px;
          width: calc(488px * 0.7);
          height: calc(365px * 0.7);
        }
      }

      .mid-egg-bottom-stone {
        position: absolute;
        top: 180px;
        left: 50%;
        transform: translateX(-50%);
        img {
          width: calc(463px * 1);
          height: calc(239px * 1);
        }
      }
    }
    .mid-des {
      display: flex;
      justify-content: center;
      font-size: 16px;
      font-family: GothamRounded-Book, GothamRounded;
      font-weight: normal;
      color: #ffffff;
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
            background: #dddddd;
            border-radius: 10px;
            border: 1px solid #ffffff;
            position: relative;
            z-index: 99;
          }
          .time-mid {
            width: 268px;
            height: 3px;
            background: #09090a;
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
          margin-left: 20px;
          width: 154px;
          height: 50px;
          background: #ffc763;
          border-radius: 25px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 24px;
          cursor: pointer;
          border: 1px solid #ffc763;
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
      .right-create-egg {
        .title {
          font-size: 20px;
          font-family: GothamRounded-Medium, GothamRounded;
          font-weight: 500;
          color: #ffffff;
        }
        .about-content {
          width: 591px;
          height: 120px;
          background: #282523;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          margin-top: 16px;
          .about-content-wrap {
            padding: 24px 32px;
            .mid-des {
              display: flex;
              justify-content: flex-start;
              font-size: 16px;
              font-family: GothamRounded-Book, GothamRounded;
              font-weight: normal;
              color: #ffffff;
            }
            .bottom {
              .time-list {
                display: flex;
                justify-content: flex-start;
                margin-top: 16px;
                .time-item {
                  width: 28px;
                  height: 28px;
                  background: #09090a;
                  border-radius: 4px;
                  font-size: 14px;
                  font-family: GothamRounded-Medium, GothamRounded;
                  font-weight: 500;
                  color: #ffc763;
                  line-height: 17px;
                  margin-right: 8px;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                }
              }
            }
          }
        }
      }
      .right-about {
        margin-top: 40px;
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
      .right-status {
        margin-top: 40px;
        .title {
          font-size: 20px;
          font-family: GothamRounded-Medium, GothamRounded;
          font-weight: 500;
          color: #ffffff;
        }
        .content {
          width: 591px;
          height: 92px;
          background: #282523;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          margin-top: 16px;
          .content-wrap {
            padding: 24px 32px;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            .status-item {
              .status-top {
                font-size: 16px;
                font-family: GothamRounded-Book, GothamRounded;
                font-weight: normal;
                color: #ffffff;
                opacity: 0.48;
              }
              .status-bottom {
                display: flex;
                align-items: center;
                margin-top: 8px;
                img {
                  width: 20px;
                  height: 20px;
                }
                .text {
                  margin-left: 10px;
                  font-size: 20px;
                  font-family: GothamRounded-Medium, GothamRounded;
                  font-weight: 500;
                  color: #ffffff;
                }
              }
            }
          }
        }
      }
      .right-parts {
        margin-top: 40px;
        .title {
          font-size: 20px;
          font-family: GothamRounded-Medium, GothamRounded;
          font-weight: 500;
          color: #ffffff;
        }
        .content {
          width: 591px;
          height: 141px;
          background: #282523;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          margin-top: 16px;
          .content-wrap {
            padding: 24px 32px;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            .item {
              display: flex;
              align-items: center;
              justify-content: center;
              width: 33%;
              margin-bottom: 32px;
              .item-img {
                width: calc(80px * 0.5);
                height: calc(80px * 0.5);
                img {
                  width: calc(80px * 0.5);
                  height: calc(80px * 0.5);
                }
              }
              .item-text {
                margin-left: 8px;
                font-size: 12px;
                font-family: GothamRounded-Medium, GothamRounded;
                font-weight: 500;
                color: #ffffff;
                white-space: nowrap;
              }
            }
          }
        }
      }

      .right-parents {
        margin-top: 20px;
        height: 340px;
        .title {
          font-size: 20px;
          font-family: GothamRounded-Medium, GothamRounded;
          font-weight: 500;
          color: #ffffff;
        }
        .content {
          width: 591px;
          height: 141px;
          background: #282523;
          border-radius: 8px;
          //   border: 1px solid rgba(255, 255, 255, 0.08);
          margin-top: 16px;
          .content-wrap {
            padding: 24px 0;
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            align-items: center;
            .wrap-item {
              display: flex;

              .item {
                width: 181px;
                height: 242px;
                background: #282523;
                border-radius: 8px;
                border: 1px solid rgba(255, 255, 255, 0.08);
                margin-right: 14px;
                cursor: pointer;
                .parent-wrap {
                  padding: 12px;
                  .top {
                    .color-wrap {
                      width: 68px;
                      height: 20px;
                      background: #d58047;
                      border-radius: 4px;
                      font-size: 14px;
                      font-family: GothamRounded-Medium, GothamRounded;
                      font-weight: 500;
                      color: #ffffff;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      white-space: nowrap;
                    }
                    .top-color-status1 {
                      background: #d58047;
                    }
                    .top-color-status2 {
                      background: #d5b32d;
                    }
                    .top-color-status3 {
                      background: #44a3cf;
                    }
                    .top-color-status4 {
                      background: #53b372;
                    }
                    .top-color-status5 {
                      background: #926b59;
                    }
                  }
                  .breed {
                    margin-top: 10px;
                    font-size: 12px;
                    font-family: GothamRounded-Book, GothamRounded;
                    font-weight: normal;
                    color: #ffffff;
                    opacity: 0.48;
                  }
                  .ce {
                    margin-top: 10px;
                    font-size: 12px;
                    font-family: GothamRounded-Book, GothamRounded;
                    font-weight: normal;
                    color: #ffffff;
                    .top-ce {
                      display: flex;
                      align-items: center;
                      .top-ce-img {
                        width: 20px;
                        height: 20px;
                        display: flex;
                        align-items: center;
                        img {
                          width: 20px;
                          height: 20px;
                        }
                      }
                    }
                  }
                  .dragon {
                    margin-top: 5px;
                  }
                }
              }
            }
            .no-data {
              display: flex;
              justify-content: center;
              font-size: 16px;
              font-family: GothamRounded-Book, GothamRounded;
              font-weight: normal;
              color: #ffffff;
              line-height: 24px;
              opacity: 0.48;
            }
          }
        }
      }
    }
  }
}
</style>