<template>
  <div class="transactions-pool-main">
    <div class="transactions-title">Pool transactions</div>

    <div class="menu-content">
      <div
        class="menu-item"
        :class="selectItem == 1 ? 'isSelected' : ''"
        @click="selectMenuItem(1)"
      >
        <div class="top">All transactions</div>
        <div class="bottom"></div>
      </div>
      <div
        class="menu-item"
        :class="selectItem == 2 ? 'isSelected' : ''"
        @click="selectMenuItem(2)"
      >
        <div class="top">My transactions</div>
        <div class="bottom"></div>
      </div>
    </div>
    <div v-if="selectItem == 1" class="transactions-content">
      <div class="transactions-item-title">
        <div class="transactions-token">Action</div>
        <div class="transactions-weight">Details</div>
        <div class="transactions-balance">Value</div>
        <div class="transactions-value">Time(UTC)</div>
      </div>
      <div
        class="load-wrap"
        v-loading="loadingForm.loadingShow"
        :element-loading-text="loadingForm.loadingShowText"
        element-loading-spinner="el-icon-loading"
      >
        <div v-if="list.length > 0" class="transactions-item-wrap">
          <div
            class="transactions-item"
            v-for="(item, index) in list"
            :key="index"
          >
            <div class="transactions-token">
              <div v-if="item.fh" class="token-img-down">-</div>
              <div v-else class="token-img-up">+</div>
              <!-- <div v-if="item.fh" class="token-value">Withdraw</div>
            <div v-else class="token-value">Invest</div> -->
            </div>
            <div class="transactions-weight">
              <div class="details-left">
                <div class="left-img">
                  <img v-if="item.fh" src="@/assets/imgs/lbp/DMS.png" alt="" />
                  <img v-else src="@/assets/imgs/lbp/USDT.png" alt="" />
                </div>
                <div class="left-value">
                  {{ toEth(item.token_amount_in) }}
                </div>
              </div>
              <div class="details-right">
                <div class="right-img">
                  <img v-if="item.fh" src="@/assets/imgs/lbp/USDT.png" alt="" />
                  <img v-else src="@/assets/imgs/lbp/DMS.png" alt="" />
                </div>

                <div class="right-value">
                  {{ toEth(item.token_amount_out) }}
                </div>
              </div>
            </div>
            <div v-if="item.fh" class="transactions-balance">
              ${{ common.formatValue4(item.volume_out) }}
            </div>
            <div v-else class="transactions-balance">
              ${{ common.formatValue4(item.volume_in) }}
            </div>
            <div class="transactions-value">
              {{ Moment(item.create_at).utc(0).format("YYYY-MM-DD hh:mm:ss") }}
            </div>
          </div>
        </div>
        <div v-else class="transactions-item-wrap no-data">No data</div>
      </div>
    </div>

    <div v-if="selectItem == 2" class="transactions-content">
      <div class="transactions-item-title">
        <div class="transactions-token">Action</div>
        <div class="transactions-weight">Details</div>
        <div class="transactions-balance">Value</div>
        <div class="transactions-value">Time(UTC)</div>
      </div>
      <div
        class="load-wrap"
        v-loading="loadingForm.loadingShow"
        :element-loading-text="loadingForm.loadingShowText"
        element-loading-spinner="el-icon-loading"
      >
              <div v-if="list.length > 0" class="transactions-item-wrap">
          <div
            class="transactions-item"
            v-for="(item, index) in list"
            :key="index"
          >
            <div class="transactions-token">
              <div v-if="item.fh" class="token-img-down">-</div>
              <div v-else class="token-img-up">+</div>
              <!-- <div v-if="item.fh" class="token-value">Withdraw</div>
            <div v-else class="token-value">Invest</div> -->
            </div>
            <div class="transactions-weight">
              <div class="details-left">
                <div class="left-img">
                  <img v-if="item.fh" src="@/assets/imgs/lbp/DMS.png" alt="" />
                  <img v-else src="@/assets/imgs/lbp/USDT.png" alt="" />
                </div>
                <div class="left-value">
                  {{ toEth(item.token_amount_in) }}
                </div>
              </div>
              <div class="details-right">
                <div class="right-img">
                  <img v-if="item.fh" src="@/assets/imgs/lbp/USDT.png" alt="" />
                  <img v-else src="@/assets/imgs/lbp/DMS.png" alt="" />
                </div>

                <div class="right-value">
                  {{ toEth(item.token_amount_out) }}
                </div>
              </div>
            </div>
            <div v-if="item.fh" class="transactions-balance">
              ${{ common.formatValue4(item.volume_out) }}
            </div>
            <div v-else class="transactions-balance">
              ${{ common.formatValue4(item.volume_in) }}
            </div>
            <div class="transactions-value">
              {{ Moment(item.create_at).utc(0).format("YYYY-MM-DD hh:mm:ss") }}
            </div>
          </div>
        </div>
        <div v-else class="transactions-item-wrap no-data">No data</div>
      </div>
    </div>

    <div class="page-wrp">
      <!-- page -->
      <page
        v-if="dragonEggListPageInfo.totalPages > 1"
        :pageInfo="dragonEggListPageInfo"
        @leftPage="leftPage"
        @rightPage="rightPage"
        @search="search"
      ></page>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, toRefs, inject } from "vue";
import { useRouter } from "vue-router";

import common from "@/utils/common";
import topTransactionsHandle from "../use/topTransactions";
import lbpHandle from "../use/index";
import page from "@/components/page/index.vue";
export default {
  name: "transactionsPoolMain",
  components: { page },
  setup() {
    const router = useRouter();
    const state = reactive({});
    const Moment = inject("$Moment");
    const {
      topTransactionsState,
      selectMenuItem,
      initList,
      getMore,
      toEth,
      leftPage,
      rightPage,
      search,
    } = topTransactionsHandle();
    const { lbpState } = lbpHandle();
    onMounted(() => {
      common.goTopScroll();
      initList();
    });

    return {
      ...toRefs(state),
      ...toRefs(topTransactionsState),
      ...toRefs(lbpState),
      selectMenuItem,
      getMore,
      Moment,
      toEth,
      leftPage,
      rightPage,
      search,
      common,
    };
  },
};
</script>

<style lang="less" scoped >
.transactions-pool-main {
  //   height: 144px;
  //   background: #1a1716;
  //   border-radius: 8px;
  //   border: 1px solid rgba(255, 255, 255, 0.12);
  //   margin-top: 72px;

  .transactions-title {
    font-size: 20px;
    font-family: GothamRounded-Medium, GothamRounded;
    font-weight: 500;
    color: #ffffff;
  }
  .menu-content {
    margin-top: 16px;
    display: flex;
    .menu-item {
      min-width: 125px;
      margin-right: 32px;
      cursor: pointer;
      .top {
        font-size: 16px;
        font-family: GothamRounded-Medium, GothamRounded;
        font-weight: 500;
        color: rgba(255, 255, 255, 0.48); // #ffc763;
      }
      .bottom {
        margin-top: 8px;
        height: 2px;
        // background: rgba(255, 255, 255, 1); // #ffc763;
      }
    }

    .menu-item:hover {
      min-width: 125px;
      margin-right: 32px;
      cursor: pointer;
      opacity: 0.55;
    }

    .isSelected {
      .top {
        color: #ffc763;
      }
      .bottom {
        background: #ffc763;
      }
    }
  }
  .transactions-content {
    margin-top: 16px;
    min-height: 163px;
    background: #1a1716;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    .transactions-item-title {
      display: flex;
      align-items: center;
      padding: 24px 32px;
      font-size: 16px;
      font-family: GothamRounded-Book, GothamRounded;
      font-weight: normal;
      color: rgba(255, 255, 255, 0.48);
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      .transactions-token {
        flex: 2;
      }
      .transactions-weight {
        flex: 7;
      }
      .transactions-balance {
        flex: 3;
      }
      .transactions-value {
        flex: 5;
      }
    }

    .transactions-item:last-child {
      border-bottom: none;
    }
    .transactions-item-wrap {
      min-height: 300px;
      .transactions-item {
        display: flex;
        align-items: center;
        padding: 24px 32px;
        font-size: 16px;
        font-family: GothamRounded-Book, GothamRounded;
        font-weight: normal;
        color: #ffffff;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        .transactions-token {
          flex: 2;
          display: flex;
          align-items: center;
          .token-img-down {
            font-size: 15px;
            font-family: GothamRounded-Medium, GothamRounded;
            font-weight: 500;
            color: #ff5151;
          }
          .token-img-up {
            font-size: 15px;
            font-family: GothamRounded-Medium, GothamRounded;
            font-weight: 500;
            color: #53b372;
          }
          .token-value {
            margin-left: 8px;
          }
        }
        .transactions-weight {
          flex: 7;
          display: flex;
          align-items: center;
          .details-left {
            display: flex;
            align-items: center;
            width: 50%;
            .left-img {
              img {
                width: 24px;
                height: 24px;
              }
            }
            .left-value {
              margin-left: 4px;
            }
          }
          .details-right {
            // margin-left: 32px;
            display: flex;
            align-items: center;
            width: 50%;
            .right-img {
              img {
                width: 24px;
                height: 24px;
              }
            }
            .right-value {
              margin-left: 4px;
            }
          }
        }
        .transactions-balance {
          flex: 3;
        }
        .transactions-value {
          flex: 5;
        }
      }
      .transactions-item-bottom {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 18px 32px;
        font-size: 16px;
        font-family: GothamRounded-Book, GothamRounded;
        font-weight: normal;
        color: rgba(255, 255, 255, 0.48);
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        cursor: pointer;
        .bottom-text {
        }
        .bottom-img {
          margin-left: 10px;
          display: flex;
          justify-content: center;
          align-items: center;
          img {
            width: 24px;
            height: 24px;
          }
        }
      }
    }
    .no-data {
      width: 100%;
      font-size: 15px;
      font-family: GothamRounded-Medium, GothamRounded;
      font-weight: 500;
      color: rgba(255, 255, 255, 0.48);
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>

<style lang="less">
.transactions-pool-main {
  .el-loading-mask {
    //background: rgba(0, 0, 0, 0.6);
    background: linear-gradient(180deg, #473222 0%, #221d1d 100%);
    opacity: 0.75;
  }
}
</style>

