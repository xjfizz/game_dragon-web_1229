<template>
  <div class="activity-history">
    <div class="activity-history-main">
      <div class="activity-history-title">Activities</div>
      <div class="menu-title">
        <div
          class="title-item select-hover"
          :class="menuItem == 1 ? 'title-item-selected' : ''"
          @click="selectMenuItem(1)"
        >
          <!-- <div class="img">
            <img
              src="@/assets/imgs/myMainland/dragon-top/menu-dragon-icon.png"
              alt=""
            />
          </div> -->
          <div class="text">Dragons</div>
        </div>
        <div
          class="title-item hover-select"
          :class="menuItem == 2 ? 'title-item-selected' : ''"
          @click="selectMenuItem(2)"
        >
          <!-- <div class="img">
            <img
              src="@/assets/imgs/myMainland/dragon-top/menu-skulls-icon.png"
              alt=""
            />
          </div> -->
          <div class="text">Skulls</div>
        </div>
        <div
          class="title-item hover-select"
          :class="menuItem == 3 ? 'title-item-selected' : ''"
          @click="selectMenuItem(3)"
        >
          <!-- <div class="img">
            <img
              src="@/assets/imgs/myMainland/dragon-top/menu-skulls-icon.png"
              alt=""
            />
          </div> -->
          <div class="text">Blind Box</div>
        </div>
      </div>
      <div class="menu-wrap1" v-if="menuItem == 1">
        <div v-if="list.length > 0" class="history-list">
          <div class="item" v-for="(item, index) in list" :key="index">
            <div class="item-wrap">
              <div class="top">
                <div class="time">
                  {{
                    Moment(item.updateTime).utc(0).format("YYYY-MM-DD HH:mm:ss")
                  }}
                </div>

                <div class="des" v-if="item.operateType == 0">
                  <div class="opt-des1">
                    {{
                      item.toAddress.substring(0, 6) +
                        "****" +
                        item.toAddress.substring(
                          item.toAddress.length - 6,
                          item.toAddress.length
                        ) || 0
                    }}
                    bought
                  </div>
                  <div class="opt-no">Dragon # {{ item.heroNo }}</div>

                  <div class="opt-des2">for {{ item.price }} DMS</div>
                </div>
                <div class="des" v-if="item.operateType == 10">
                  <div class="opt-des1">Your</div>
                  <div class="opt-no">Dragon # {{ item.heroNo }}</div>

                  <div class="opt-des2">has devoured the</div>
                  <div class="opt-no">Dragon # {{ item.devourHeroNo }}</div>
                  <div class="opt-des2">
                    and the {{ item.attributeName || "no skill" }} skill level
                    has increased.
                  </div>
                </div>
                <div class="des" v-if="item.operateType == 20">
                  <div class="opt-des1">Your</div>
                  <div class="opt-no"># {{ item.heroNo }} dragon's</div>

                  <div class="opt-des2">
                     talent has leveled up.
                  </div>
                </div>
              </div>
              <div class="bottom">
                <div class="bottom-line"></div>
                <div
                  class="dragon-address select-hover"
                  @click="goContract(item.transNo)"
                >
                  {{ item.transNo || "No data" }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="noData">
          <div class="noData-wrap">
            <div class="no-dragon">
              <img src="../../../assets/imgs/myMainland/no-data.png" alt="" />
            </div>
            <div class="no-data-title">No data</div>
            <!-- <div class="no-data-des">
        * The activity history will be open soon, so stay tuned !
      </div> -->
          </div>
        </div>
      </div>

      <div class="menu-wrap2" v-if="menuItem == 2">
        <div v-if="list.length > 0" class="history-list">
          <div class="item" v-for="(item, index) in list" :key="index">
            <div class="item-wrap">
              <div class="top">
                <div class="time">
                  {{
                    Moment(item.createTime).utc(0).format("YYYY-MM-DD HH:mm:ss")
                  }}
                </div>
                <!-- 上架 -->
                <div class="des" v-if="item.type == -1">
                  <div class="opt-des1">
                    {{
                      item.address.substring(0, 6) +
                        "****" +
                        item.address.substring(
                          item.address.length - 6,
                          item.address.length
                        ) || 0
                    }}
                  </div>

                  <div class="opt-des2" v-if="item.saleType == 1">
                    listed {{ item.skullNum }}
                    {{ createDragonSkullsLevel(item.level) }}
                    {{ dragonLocalTypeName[item.clazz] }} level skulls with a
                    unit price of
                    {{ item.price }}
                  </div>

                  <div class="opt-des2" v-if="item.saleType == 2">
                    listed {{ item.skullNum }}
                    {{ createDragonSkullsLevel(item.level) }}
                    {{ dragonLocalTypeName[item.clazz] }} level skulls to start
                    a {{ item.auctionHour / 24 }} day- auction from
                    {{ item.auctionHighestPrice }} DMS to
                    {{ item.auctionLowestPrice }} DMS
                  </div>
                </div>

                <!-- 卖 -->
                <div class="des" v-if="item.type == -2">
                  <div class="opt-des1" v-if="item.tradingAddress">
                    {{
                      item.tradingAddress.substring(0, 6) +
                        "****" +
                        item.tradingAddress.substring(
                          item.tradingAddress.length - 6,
                          item.tradingAddress.length
                        ) || 0
                    }}
                  </div>
                  <div class="opt-des1" v-else>--</div>

                  <div class="opt-des2">
                    purchased {{ item.skullNum }}
                    {{ createDragonSkullsLevel(item.level) }}
                    {{ dragonLocalTypeName[item.clazz] }} level skulls of you at
                    unit {{ item.price }} DMS
                  </div>
                </div>

                <!-- 下架 -->
                <div class="des" v-if="item.type == 1">
                  <div class="opt-des1">
                    {{
                      item.address.substring(0, 6) +
                        "****" +
                        item.address.substring(
                          item.address.length - 6,
                          item.address.length
                        ) || 0
                    }}
                  </div>

                  <div class="opt-des2">
                    downlisted {{ item.skullNum }}
                    {{ createDragonSkullsLevel(item.level) }}
                    {{ dragonLocalTypeName[item.clazz] }} level skulls with a
                    unit price of {{ item.price }} DMS
                  </div>
                </div>

                <!-- 买 -->
                <div class="des" v-if="item.type == 2">
                  <div class="opt-des1">
                    {{
                      item.address.substring(0, 6) +
                        "****" +
                        item.address.substring(
                          item.address.length - 6,
                          item.address.length
                        ) || 0
                    }}
                  </div>

                  <div class="opt-des2">
                    have purchased {{ item.skullNum }}
                    {{ createDragonSkullsLevel(item.level) }}
                    {{ dragonLocalTypeName[item.clazz] }} level skulls with a
                    unit price of {{ item.price }} DMS
                  </div>
                </div>

                <!-- 开出龙骨 -->
                <div class="des" v-if="item.type == 5">
                  <div class="opt-des1">
                    {{
                      item.address.substring(0, 6) +
                        "****" +
                        item.address.substring(
                          item.address.length - 6,
                          item.address.length
                        ) || 0
                    }}
                    have opend
                  </div>

                  <div class="opt-des2">
                    the blind box and obtained the skull of
                    {{ createDragonSkullsLevel(item.level) }}
                    {{ dragonLocalTypeName[item.clazz] }} level skulls
                  </div>
                </div>

                <!-- 龙吸收 -->
                <div class="des" v-if="item.type == -5">
                  <div class="opt-des1">
                    {{
                      item.address.substring(0, 6) +
                        "****" +
                        item.address.substring(
                          item.address.length - 6,
                          item.address.length
                        ) || 0
                    }}
                    's Dragon # {{ item.heroNo || "--" }} have absorbed
                  </div>

                  <div class="opt-des2">
                    {{ item.skullNum }}
                    {{ createDragonSkullsLevel(item.level) }}
                    {{ dragonLocalTypeName[item.clazz] }} level skulls
                  </div>
                </div>

                <!-- 合成龙骨-消耗 -->
                <div class="des" v-if="item.type == -4">
                  <div class="opt-des1">
                    {{
                      item.address.substring(0, 6) +
                        "****" +
                        item.address.substring(
                          item.address.length - 6,
                          item.address.length
                        ) || 0
                    }}
                    have consumption
                  </div>

                  <div class="opt-des2">
                    {{ item.skullNum }}
                    {{ createDragonSkullsLevel(item.level) }}
                    {{ dragonLocalTypeName[item.clazz] }} level skulls
                  </div>
                </div>

                <!-- 合成龙骨-生成 -->
                <div class="des" v-if="item.type == 4">
                  <div class="opt-des1">
                    {{
                      item.address.substring(0, 6) +
                        "****" +
                        item.address.substring(
                          item.address.length - 6,
                          item.address.length
                        ) || 0
                    }}
                    have synthesis
                  </div>

                  <div class="opt-des2">
                    {{ item.skullNum }}
                    {{ createDragonSkullsLevel(item.level) }}
                    {{ dragonLocalTypeName[item.clazz] }} level skulls
                  </div>
                </div>
              </div>
              <div class="bottom">
                <div class="bottom-line"></div>
                <div
                  class="dragon-address select-hover"
                  @click="goContract(item.transNo)"
                >
                  {{ item.transNo || "No data" }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="noData">
          <div class="noData-wrap">
            <div class="no-dragon">
              <img src="../../../assets/imgs/myMainland/no-data.png" alt="" />
            </div>
            <div class="no-data-title">No data</div>
            <!-- <div class="no-data-des">
        * The activity history will be open soon, so stay tuned !
      </div> -->
          </div>
        </div>
      </div>

      <div class="menu-wrap3" v-if="menuItem == 3">
        <div v-if="list.length > 0" class="history-list">
          <div class="item" v-for="(item, index) in list" :key="index">
            <div class="item-wrap">
              <div class="top">
                <div class="time">
                  {{
                    Moment(item.updateTime).utc(0).format("YYYY-MM-DD HH:mm:ss")
                  }}
                </div>

                <div class="des" v-if="item.type == 1">
                  <div class="opt-des1">
                    {{
                      item.address.substring(0, 6) +
                        "****" +
                        item.address.substring(
                          item.address.length - 6,
                          item.address.length
                        ) || 0
                    }}
                    have purchased
                  </div>
                  <!-- <div class="opt-no">a blind box</div> -->

                  <div class="opt-des2">
                    a blind box at {{ item.price }} DMS for
                    {{ item.cycle }} issue
                  </div>
                </div>

                <div class="des" v-if="item.type == 2">
                  <div class="opt-des1">
                    {{
                      item.address.substring(0, 6) +
                        "****" +
                        item.address.substring(
                          item.address.length - 6,
                          item.address.length
                        ) || 0
                    }}
                    have obtained
                  </div>
                  <!-- <div class="opt-no">
                    a blind box for {{ item.cycle }} issue
                  </div> -->

                  <div class="opt-des2">
                    a blind box for {{ item.cycle }} issue
                  </div>
                </div>

                <div class="des" v-if="item.type == 3">
                  <div class="opt-des1">
                    {{
                      item.address.substring(0, 6) +
                        "****" +
                        item.address.substring(
                          item.address.length - 6,
                          item.address.length
                        ) || 0
                    }}
                    have opened
                  </div>

                  <div class="opt-des2">
                    the blind box of {{ item.cycle }} issue and obtained the
                    skull of
                    {{ createDragonSkullsLevel(item.level) }}
                    {{ dragonLocalTypeName[item.clazz] }} level skulls
                  </div>
                </div>

                <div class="des" v-if="item.type == 4">
                  <div class="opt-des1">
                    {{
                      item.address.substring(0, 6) +
                        "****" +
                        item.address.substring(
                          item.address.length - 6,
                          item.address.length
                        ) || 0
                    }}
                    have claimed
                  </div>
                  <!-- <div class="opt-no">
                    a blind box for {{ item.cycle }} issue
                  </div> -->

                  <div class="opt-des2">
                    DMS returned from previous issues with a total of
                    {{ item.price }} DMS
                  </div>
                </div>
              </div>
              <div class="bottom">
                <div class="bottom-line"></div>
                <div
                  class="dragon-address select-hover"
                  @click="goContract(item.transHash)"
                >
                  {{ item.transHash || "No data" }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="noData">
          <div class="noData-wrap">
            <div class="no-dragon">
              <img src="../../../assets/imgs/myMainland/no-data.png" alt="" />
            </div>
            <div class="no-data-title">No data</div>
            <!-- <div class="no-data-des">
        * The activity history will be open soon, so stay tuned !
      </div> -->
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
import activityHistoryHandle from "@/views/pc/myMainland/use/activityHistory";
import myDragon from "@/views/pc/myMainland/use/myDragon";
import Moment from "moment";
export default {
  name: "activityHistory",
  components: {},
  setup() {
    const router = useRouter();
    const state = reactive({});
    const { myMainlandState } = myMainland();
    const { dragonLocalTypeName, createDragonSkullsLevel } = myDragon();

    const { activityHistoryState, goContract, selectMenuItem } =
      activityHistoryHandle();
    console.log("activityHistory", activityHistoryState);
    onMounted(() => {
      myMainlandState.leftItemSelected = 4;
      common.goTopScroll();
    });

    return {
      ...toRefs(state),
      ...toRefs(activityHistoryState),
      Moment,
      goContract,
      selectMenuItem,
      dragonLocalTypeName,
      createDragonSkullsLevel,
    };
  },
};
</script>

<style lang="less" scoped >
.activity-history {
  .activity-history-main {
    padding: 32px 109px 0 103px;
    .activity-history-title {
      font-size: 32px;
      font-family: GothamRounded-Medium, GothamRounded;
      font-weight: 500;
      color: #ffffff;
    }
    .menu-title {
      display: flex;
      align-items: center;
      border-bottom: 1px solid #1a1716;
      margin-top: 10px;
      .title-item {
        display: flex;
        align-items: center;
        width: 125px;
        margin-right: 67px;
        padding-bottom: 4px;
        cursor: pointer;
        border-bottom: 2px solid rgba(255, 255, 255, 0);
        opacity: 0.68;
        height: 48px;
        .img {
          img {
            width: 48px;
            height: 48px;
          }
        }
        .text {
          margin-left: 4px;
          font-size: 16px;
          font-family: GothamRounded-Medium, GothamRounded;
          font-weight: 500;
          color: #ffffff;
        }
      }
      .title-item-selected {
        border-bottom: 2px solid #ffc763;
        opacity: 1;
      }
    }

    .menu-wrap1 {
      .history-list {
        margin-top: 40px;
        .item {
          .item-wrap {
            .top {
              display: flex;
              align-items: flex-start;
              .time {
                font-size: 16px;
                font-family: GothamRounded-Book, GothamRounded;
                font-weight: normal;
                color: #ffffff;
                opacity: 0.48;
                flex: 3;
              }
              .des {
                flex: 21;
                margin-left: 18px;
                font-size: 16px;
                font-family: GothamRounded-Medium, GothamRounded;
                font-weight: 500;
                color: #ffffff;
                display: flex;
                align-items: center;
                .opt-des1 {
                }
                .opt-no {
                  margin-left: 10px;
                  color: rgba(255, 199, 99, 1);
                }
                .opt-des2 {
                  margin-left: 10px;
                }
              }
            }
            .bottom {
              height: 60px;
              margin-top: 16px;
              margin-bottom: 16px;
              display: flex;
              align-items: flex-start;
              .bottom-line {
                margin-left: 80px;
                width: 2px;
                height: 60px;
                background: rgba(255, 255, 255, 0.2);
              }
              .dragon-address {
                margin-left: 120px;
                font-size: 14px;
                font-family: GothamRounded-Book, GothamRounded;
                font-weight: normal;
                color: rgba(255, 255, 255, 0.48);
                cursor: pointer;
              }
            }
          }
        }

        .item:last-child {
          .item-wrap {
            .bottom {
              .bottom-line {
                margin-left: 80px;
                width: 2px;
                height: 60px;
                background: rgba(255, 255, 255, 0);
              }
              .dragon-address {
                margin-left: 120px;
                font-size: 14px;
                font-family: GothamRounded-Book, GothamRounded;
                font-weight: normal;
                color: rgba(255, 255, 255, 0.48);
              }
            }
          }
        }
      }
    }

    .menu-wrap2 {
      .history-list {
        margin-top: 40px;
        .item {
          .item-wrap {
            .top {
              display: flex;
              align-items: flex-start;
              .time {
                font-size: 16px;
                font-family: GothamRounded-Book, GothamRounded;
                font-weight: normal;
                color: #ffffff;
                opacity: 0.48;
                flex: 3;
              }
              .des {
                flex: 21;
                margin-left: 18px;
                font-size: 16px;
                font-family: GothamRounded-Medium, GothamRounded;
                font-weight: 500;
                color: #ffffff;
                display: flex;
                align-items: center;
                .opt-des1 {
                }
                .opt-no {
                  margin-left: 10px;
                  color: rgba(255, 199, 99, 1);
                }
                .opt-des2 {
                  margin-left: 10px;
                }
              }
            }
            .bottom {
              height: 60px;
              margin-top: 16px;
              margin-bottom: 16px;
              display: flex;
              align-items: flex-start;
              .bottom-line {
                margin-left: 80px;
                width: 2px;
                height: 60px;
                background: rgba(255, 255, 255, 0.2);
              }
              .dragon-address {
                margin-left: 120px;
                font-size: 14px;
                font-family: GothamRounded-Book, GothamRounded;
                font-weight: normal;
                color: rgba(255, 255, 255, 0.48);
                cursor: pointer;
              }
            }
          }
        }

        .item:last-child {
          .item-wrap {
            .bottom {
              .bottom-line {
                margin-left: 80px;
                width: 2px;
                height: 60px;
                background: rgba(255, 255, 255, 0);
              }
              .dragon-address {
                margin-left: 120px;
                font-size: 14px;
                font-family: GothamRounded-Book, GothamRounded;
                font-weight: normal;
                color: rgba(255, 255, 255, 0.48);
              }
            }
          }
        }
      }
    }
    .menu-wrap3 {
      .history-list {
        margin-top: 40px;
        .item {
          .item-wrap {
            .top {
              display: flex;
              align-items: flex-start;
              .time {
                font-size: 16px;
                font-family: GothamRounded-Book, GothamRounded;
                font-weight: normal;
                color: #ffffff;
                opacity: 0.48;
                flex: 3;
              }
              .des {
                flex: 21;
                margin-left: 18px;
                font-size: 16px;
                font-family: GothamRounded-Medium, GothamRounded;
                font-weight: 500;
                color: #ffffff;
                display: flex;
                align-items: center;
                .opt-des1 {
                }
                .opt-no {
                  margin-left: 10px;
                  color: rgba(255, 199, 99, 1);
                }
                .opt-des2 {
                  margin-left: 10px;
                }
              }
            }
            .bottom {
              height: 60px;
              margin-top: 16px;
              margin-bottom: 16px;
              display: flex;
              align-items: flex-start;
              .bottom-line {
                margin-left: 80px;
                width: 2px;
                height: 60px;
                background: rgba(255, 255, 255, 0.2);
              }
              .dragon-address {
                margin-left: 120px;
                font-size: 14px;
                font-family: GothamRounded-Book, GothamRounded;
                font-weight: normal;
                color: rgba(255, 255, 255, 0.48);
                cursor: pointer;
              }
            }
          }
        }

        .item:last-child {
          .item-wrap {
            .bottom {
              .bottom-line {
                margin-left: 80px;
                width: 2px;
                height: 60px;
                background: rgba(255, 255, 255, 0);
              }
              .dragon-address {
                margin-left: 120px;
                font-size: 14px;
                font-family: GothamRounded-Book, GothamRounded;
                font-weight: normal;
                color: rgba(255, 255, 255, 0.48);
              }
            }
          }
        }
      }
    }
  }
}
</style>