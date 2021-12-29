<template>
  <div class="convert-title-main">
    <div class="convert-wrap">
      <div class="title">Trade</div>
      <div class="content">
        <div v-if="loacalGetItem == 2" id="dmsItem" class="content-item">
          <div class="item-top">
            <div class="top-left">You pay</div>
            <div class="top-right">
              Balance:
              {{ userWalletAddress ? convertStateForm.dms.balance : 0 }}
            </div>
          </div>
          <div class="item-bottom">
            <div class="item-input">
              <div class="input-img">
                <img src="@/assets/imgs/lbp/DMS.png" alt="" />
                <div class="text">DMS</div>
              </div>
              <el-input
                v-model="convertStateForm.dms.inputValue"
                placeholder="Enter an amount"
                @keyup.enter="confirm(1)"
                @input="confirm(1)"
                type="number"
              ></el-input>
            </div>
          </div>
          <div
            v-if="
              convertStateForm.dms.inputValue > convertStateForm.dms.balance
            "
            class="item-des"
          >
            *Not enough
          </div>
        </div>

        <div v-else id="usdtItem" class="content-item">
          <div class="item-top">
            <div class="top-left">You pay</div>

            <div class="top-right">
              Balance:
              {{ userWalletAddress ? convertStateForm.usdt.balance : 0 }}
            </div>
          </div>
          <div class="item-bottom">
            <div class="item-input">
              <div class="input-img">
                <img src="@/assets/imgs/lbp/USDT.png" alt="" />
                <div class="text">USDT</div>
              </div>
              <el-input
                v-model="convertStateForm.usdt.inputValue"
                placeholder="Enter an amount"
                @keyup.enter="confirm(1)"
                @input="confirm(1)"
                type="number"
              ></el-input>
            </div>
          </div>
          <div
            v-if="
              convertStateForm.usdt.inputValue > convertStateForm.usdt.balance
            "
            class="item-des"
          >
            *Not enough
          </div>
        </div>

        <div class="content-mid">
          <img @click="swapItem" src="@/assets/imgs/lbp/change.png" alt="" />
        </div>

        <div v-if="loacalGetItem == 2" id="usdtItem" class="content-item">
          <div class="item-top">
            <div class="top-left">You receive</div>
            <div class="top-right">
              Balance:
              {{ userWalletAddress ? convertStateForm.usdt.balance : 0 }}
            </div>
          </div>
          <div class="item-bottom">
            <div class="item-input">
              <div class="input-img">
                <img src="@/assets/imgs/lbp/USDT.png" alt="" />
                <div class="text">USDT</div>
              </div>
              <el-input
                v-model="convertStateForm.usdt.inputValue"
                placeholder="Enter an amount"
                @keyup.enter="confirm(2)"
                @input="confirm(2)"
                type="number"
              ></el-input>
            </div>
          </div>
          <!-- <div
            v-if="
              convertStateForm.usdt.inputValue > convertStateForm.usdt.balance
            "
            class="item-des"
          >
            *Not enough
          </div> -->
        </div>

        <div v-else id="dmsItem" class="content-item">
          <div class="item-top">
            <div class="top-left">You receive</div>
            <div class="top-right">
              Balance:
              {{ userWalletAddress ? convertStateForm.dms.balance : 0 }}
            </div>
          </div>
          <div class="item-bottom">
            <div class="item-input">
              <div class="input-img">
                <img src="@/assets/imgs/lbp/DMS.png" alt="" />
                <div class="text">DMS</div>
              </div>
              <el-input
                v-model="convertStateForm.dms.inputValue"
                placeholder="Enter an amount"
                @keyup.enter="confirm(2)"
                @input="confirm(2)"
                type="number"
              ></el-input>
            </div>
          </div>
          <!-- <div
            v-if="
              convertStateForm.dms.inputValue > convertStateForm.dms.balance
            "
            class="item-des"
          >
            *Not enough
          </div> -->
        </div>

        <div class="content-bottom">
          <div class="title">Slippage Tolerance</div>
          <div class="bottom-list">
            <div
              class="list-item"
              :class="item.id == localSelectedPrice.id ? 'item-selected' : ''"
              v-for="(item, index) in list"
              :key="index"
              @click="selectPrice(item)"
            >
              {{ item.text }}
            </div>
            <div
              class="list-item list-item-input"
              :class="4 == localSelectedPrice.id ? 'item-selected' : ''"
            >
              <div class="item-input">
                <el-input
                  @blur="blurDefineIput"
                  @focus="focusDefineInput"
                  @keyup.enter="blurDefineEnter"
                  v-model="definePrice.value"
                ></el-input>
                <div class="item-unit">%</div>
              </div>
            </div>
          </div>
          <div class="bottom-btn" v-if="true">
            <div class="btn-wrap no-data">SWAP</div>
          </div>

          <div class="bottom-btn" v-if="false && !contractComputing">
            <div
              v-if="
                LbpTime == 2 &&
                approveForm.isApprove &&
                convertStateForm.dms.inputValue &&
                convertStateForm.usdt.inputValue &&
                ((loacalGetItem == 1 && convertStateForm.usdt.balance > 0) ||
                  (loacalGetItem == 2 && convertStateForm.dms.balance > 0))
              "
              class="btn-wrap"
              @click="convert"
            >
              SWAP
            </div>
            <div
              v-if="
                LbpTime == 2 &&
                approveForm.isApprove &&
                (!convertStateForm.dms.inputValue ||
                  !convertStateForm.usdt.inputValue ||
                  (loacalGetItem == 1 && convertStateForm.usdt.balance <= 0) ||
                  (loacalGetItem == 2 && convertStateForm.dms.balance <= 0))
              "
              class="btn-wrap no-data"
            >
              SWAP
            </div>
            <div
              v-if="LbpTime == 2 && !approveForm.isApprove"
              class="btn-wrap"
              @click="approve"
            >
              Approve
            </div>
            <div v-if="!(LbpTime == 2)" class="btn-wrap no-data">SWAP</div>
          </div>
          <div class="bottom-btn" v-if="false && contractComputing">
            <div
              v-if="
                LbpTime == 2 &&
                approveForm.isApprove &&
                convertStateForm.dms.inputValue &&
                convertStateForm.usdt.inputValue &&
                ((loacalGetItem == 1 && convertStateForm.usdt.balance > 0) ||
                  (loacalGetItem == 2 && convertStateForm.dms.balance > 0))
              "
              class="btn-wrap no-data"
              v-loading="contractComputing"
              element-loading-text=""
              element-loading-spinner="el-icon-loading"
            >
              SWAP
            </div>
            <div
              v-if="
                LbpTime == 2 &&
                approveForm.isApprove &&
                (!convertStateForm.dms.inputValue ||
                  !convertStateForm.usdt.inputValue ||
                  (loacalGetItem == 1 && convertStateForm.usdt.balance <= 0) ||
                  (loacalGetItem == 2 && convertStateForm.dms.balance <= 0))
              "
              class="btn-wrap no-data"
              v-loading="contractComputing"
              element-loading-text=""
              element-loading-spinner="el-icon-loading"
            >
              SWAP
            </div>
            <div
              v-if="LbpTime == 2 && !approveForm.isApprove"
              class="btn-wrap no-data"
              v-loading="contractComputing"
              element-loading-text=""
              element-loading-spinner="el-icon-loading"
            >
              Approve
            </div>
            <div
              v-if="!(LbpTime == 2)"
              class="btn-wrap no-data"
              v-loading="contractComputing"
              element-loading-text=""
              element-loading-spinner="el-icon-loading"
            >
              SWAP
            </div>
          </div>
        </div>

        <div class="time-bottom-text">
          <div v-if="LbpTime == 1" class="text">LBP has not started</div>
          <!-- <div v-if="LbpTime == 3" class="text">LBP has closed</div> -->
            <div v-if="true" class="text">LBP has closed</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, toRefs, computed, watch } from "vue";
import { useRouter } from "vue-router";

import common from "@/utils/common";
import convertStateHandle from "../use/convert";
import { useStore } from "vuex";
export default {
  name: "topTtitle",
  components: {},
  setup() {
    const router = useRouter();
    const store = useStore();
    const state = reactive({
      userWalletAddress: computed(() => store.state.login.userWalletAddress),
    });
    const {
      convertState,
      swapItem,
      selectPrice,
      confirm,
      init,
      blurDefineIput,
      convert,
      blurDefineEnter,
      approve,
      focusDefineInput,
      getBalance,
    } = convertStateHandle();
    onMounted(() => {
      common.goTopScroll();
      // init();
    });

    watch(
      () => state.userWalletAddress,
      async (newValue, old) => {
        await getBalance();
      }
    );

    return {
      ...toRefs(state),
      ...toRefs(convertState),
      swapItem,
      selectPrice,
      confirm,
      blurDefineIput,
      convert,
      blurDefineEnter,
      approve,
      focusDefineInput,
    };
  },
};
</script>

<style lang="less" scoped >
.convert-title-main {
  // width: 384px;
  margin-top: 72px;
  min-height: 700px;
  background: #282523;
  box-shadow: 0px 16px 36px 0px rgba(0, 0, 0, 0.48);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  .convert-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px 24px;
    .title {
      font-size: 24px;
      font-family: GothamRounded-Medium, GothamRounded;
      font-weight: 500;
      color: #ffffff;
    }
    .content {
      margin-top: 64px;
      .content-item {
        height: 110px;
        .item-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          .top-left {
            font-size: 17px;
            font-family: GothamRounded-Medium, GothamRounded;
            font-weight: 500;
            color: #ffffff;
          }
          .top-right {
            font-size: 13px;
            font-family: GothamRounded-Medium, GothamRounded;
            font-weight: 500;
            color: #ffffff;
            display: flex;
            align-items: center;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            /*! autoprefixer: off */

            /* autoprefixer: on */
            -webkit-line-clamp: 1;
            word-break: break-all; /*追加这一行代码*/
            min-width: 150px;
          }
        }
        .item-bottom {
          margin-top: 11px;
          .item-input {
            margin-top: 16px;
            width: 300px;
            height: 54px;
            border-radius: 8px;
            border: 1px solid rgba(255, 255, 255, 0.12);
            padding: 0 10px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: #1a1716;
            .item-input {
              width: 80%;
            }
            .input-img {
              display: flex;
              align-items: center;
              img {
                width: 24px;
                height: 24px;
              }
              .text {
                margin-left: 4px;
                font-size: 15px;
                font-family: GothamRounded-Medium, GothamRounded;
                font-weight: 500;
                color: #ffffff;
              }
            }

            /deep/ input::-webkit-input-placeholder {
              opacity: 0.47;
              color: #ffffff;
              font-size: 14px;
            }
            /deep/ input::-moz-input-placeholder {
              opacity: 0.47;
              color: #ffffff;
              font-size: 14px;
            }
            /deep/ input::-ms-input-placeholder {
              opacity: 0.47;
              color: #ffffff;
              font-size: 14px;
            }
            /deep/ .el-input__inner {
              // width: 271px;
              background: transparent;
              border: none;
              border-radius: 48px;
              font-size: 14px;
              opacity: 0.68;
              color: #ffffff;
              // text-align: center!important;
            }

            /deep/ input::-webkit-outer-spin-button,
            /deep/ input::-webkit-inner-spin-button {
              -webkit-appearance: none !important;
            }
            /deep/ input[type="number"] {
              -moz-appearance: textfield !important;
            }
          }
        }
        .item-des {
          margin-top: 10px;
          font-size: 13px;
          font-family: GothamRounded-Book, GothamRounded;
          font-weight: normal;
          color: #ff5151;
        }
      }
      .content-mid {
        margin-top: 26px;
        margin-bottom: 26px;
        display: flex;
        justify-content: center;
        img {
          cursor: pointer;
          width: 40px;
          height: 40px;
        }
      }
      .content-bottom {
        margin-top: 43px;
        .title {
          font-size: 14px;
          font-family: GothamRounded-Medium, GothamRounded;
          font-weight: 500;
          color: #ffffff;
        }
        .bottom-list {
          display: flex;
          justify-content: space-between;
          margin-top: 11px;
          .list-item {
            width: 72px;
            height: 40px;
            border-radius: 8px;
            border: 1px solid rgba(255, 255, 255, 0.12);
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 18px;
            font-family: GothamRounded-Medium, GothamRounded;
            font-weight: 500;
            color: #ffffff;
            cursor: pointer;

            .item-input {
              height: 38px;
              border-radius: 8px;
              border: 1px solid rgba(255, 255, 255, 0.12);
              padding: 0 0px;
              display: flex;
              align-items: center;
              justify-content: space-between;
              background: #1a1716;
              width: 75px;

              /deep/ input::-webkit-input-placeholder {
                opacity: 0.47;
                color: #ffffff;
                font-size: 14px;
              }
              /deep/ input::-moz-input-placeholder {
                opacity: 0.47;
                color: #ffffff;
                font-size: 14px;
              }
              /deep/ input::-ms-input-placeholder {
                opacity: 0.47;
                color: #ffffff;
                font-size: 14px;
              }
              /deep/ .el-input__inner {
                // width: 271px;
                background: transparent;
                border: none;
                border-radius: 48px;
                font-size: 14px;
                opacity: 0.68;
                color: #ffffff;
                padding: 0 0 0 4px;
              }
            }
            .item-unit {
            }
          }
          .item-selected {
            // background: rgba(245, 158, 100, 0.18);
            border: 1px solid #f59e64;
          }
          .list-item-input {
            width: 75px;
          }
        }

        .bottom-btn {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 40px;
          .btn-wrap {
            width: 268px;
            height: 48px;
            background: #ffc763;
            border-radius: 24px;
            font-size: 16px;
            font-family: GothamRounded-Medium, GothamRounded;
            font-weight: 500;
            color: #2e0b00;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
          }
          .no-data {
            opacity: 0.68;
          }
          .btn-wrap:hover {
            opacity: 0.68;
          }
        }
      }
      .time-bottom-text {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 20px;
        font-size: 13px;
        font-family: GothamRounded-Book, GothamRounded;
        font-weight: normal;
        color: #ff5151;
        opacity: 0.78;
      }
    }
  }
}
</style>


<style lang="less">
.convert-title-main {
  .el-loading-mask {
    border-radius: 24px;
    // background: rgba(0, 0, 0, 2);
    background: linear-gradient(180deg, #473222 0%, #221d1d 100%);
    opacity: 0.5;
    //  .el-loading-spinner{
    //    top: 20%;
    //  }
    .el-loading-spinner i {
      color: #ffffff;
    }
  }
}
</style>



