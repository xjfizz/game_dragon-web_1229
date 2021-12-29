<template>
  <div class="table-not-withdrawn-main">
    <div class="table-item-title">
      <div class="day-claimed">
        <div class="selected-wrap" @click="selectedAllData">
          <img
            v-if="isSelectedAll"
            src="@/assets/imgs/myMainland/dragon-top/select.png"
            alt=""
          />
          <img
            v-else
            src="@/assets/imgs/myMainland/dragon-top/unselect.png"
            alt=""
          />
        </div>
        <div class="text text-opacity">Day claimed</div>
      </div>
      <div class="amount">
        <div class="text text-opacity">Amount</div>
      </div>
      <div class="status">
        <div class="text text-opacity">Status</div>
      </div>
      <div class="withdrawal-time">
        <div class="text text-opacity">Withdrawal time</div>
      </div>
      <div class="fee">
        <div class="text text-opacity">Fee</div>
      </div>
      <div class="btns">
        <div class="btn"></div>
      </div>
    </div>
    <div
      class="table-item-wrap"
      v-loading="loadingForm.loadingShow"
      :element-loading-text="loadingForm.loadingShowText"
      element-loading-spinner="el-icon-loading"
    >
      <div v-if="list.length > 0" class="table-item-wrap-main">
        <div
          class="table-item-record"
          :class="item.isSelected ? 'table-item-record-selected' : ''"
          v-for="(item, index) in list"
          :key="index"
          @click="selectData(item, item.isSelected ? 2 : 1)"
        >
          <div class="day-claimed">
            <div class="selected-wrap">
              <img
                v-if="item.rate != -1 && item.isSelected"
                src="@/assets/imgs/myMainland/dragon-top/select.png"
                alt=""
              />
              <img
                v-if="item.rate != -1 && !item.isSelected"
                src="@/assets/imgs/myMainland/dragon-top/unselect.png"
                alt=""
              />
            </div>
            <div class="text">
              {{ Moment(item.claimedDay).utc(0).format("YYYY-MM-DD") }}
            </div>
          </div>
          <div class="amount">
            <div v-if="eyeShow" class="maount-img">
              <img src="@/assets/imgs/myMainland/dragon-top/dmp.png" alt="" />
            </div>
            <div v-if="eyeShow" class="text">{{ item.amount }}</div>
            <div v-else class="text">
              <!-- <span v-for="(item,index) in String(item.amount).length" :key="index" >*</span> -->
              ****
            </div>
          </div>
          <div class="status">
            <div class="text text-opacity" v-if="item.rate == -1">
              <div class="status-img1"></div>
              <div class="status-text">unavailable</div>
            </div>
            <div class="text" v-else>
              <div class="status-img2"></div>
              <div class="status-text">available</div>
            </div>
          </div>
          <div class="withdrawal-time">
            <div class="text">
              {{ Moment(item.withdrawalTime).utc(0).format("YYYY-MM-DD 00:00:00") }}
            </div>
          </div>
          <div class="fee">
            <div v-if="item.rate != -1" class="text">
              {{ item.rate }}%
              <div class="fee-tips">
                ({{ common.formatValue2((item.rate / 100) * item.amount) }})
                  
              </div>
            </div>
            <div v-else class="text text-opacity">—</div>
          </div>
          <div class="btns">
            <div
              v-if="item.rate != -1"
              class="btn"
              @click.stop="withdrawlItem(item)"
            >
              Withdraw
            </div>
          </div>
        </div>
      </div>
      <div v-else class="table-item-wrap-main no-data">No data</div>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, toRefs, inject } from "vue";
import { useRouter } from "vue-router";
import Header from "@/components/HeaderMarketPlace";
import Moment from "moment";
import common from "@/utils/common";
import withdrawlDmpHandle from "@/views/pc/myMainland/use/withdrawlDmp";
import { Decimal } from 'decimal.js'

export default {
  components: {
    Header,
  },
  setup() {
    const router = useRouter();
    const state = reactive({});

    const {
      back,
      withdrawlDmpState,
      getUserCoinTotal,
      initData,
      init,
      selectData,
      selectedAllData,
      withdrawlItem,
    } = withdrawlDmpHandle();
    onMounted(() => {
      common.goTopScroll();
      getUserCoinTotal();
      initData();
      init();
    });

    return {
      ...toRefs(state),
      ...toRefs(withdrawlDmpState),
      back,
      Moment,
      selectData,
      selectedAllData,
      withdrawlItem,
      common,
      Decimal,
    };
  },
};
</script>

<style lang="less" scoped >
.table-not-withdrawn-main {
  //   height: 513px;
  min-height: 513px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  .table-item-title {
    display: flex;
    align-items: center;
    height: 56px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    padding: 0 52px;
    .day-claimed {
      flex: 6;
      display: flex;
      align-items: center;
      .selected-wrap {
        width: 20px;
        height: 20px;
        cursor: pointer;
        img {
          width: 20px;
          height: 20px;
        }
      }
      .text {
        margin-left: 16px;
        font-size: 16px;
        font-family: GothamRounded-Book, GothamRounded;
        font-weight: normal;
        color: #ffffff;
      }
    }
    .amount {
      flex: 4;
      .text {
        font-size: 16px;
        font-family: GothamRounded-Book, GothamRounded;
        font-weight: normal;
        color: #ffffff;
      }
    }
    .status {
      flex: 4;
      .text {
        font-size: 16px;
        font-family: GothamRounded-Book, GothamRounded;
        font-weight: normal;
        color: #ffffff;
        display: flex;
        align-items: center;
        .status-img1 {
          width: 8px;
          height: 8px;
          background: linear-gradient(156deg, #eeeeee 0%, #7a7a7a 100%);
        }
        .status-img2 {
          width: 8px;
          height: 8px;
          background: #53b372;
        }
        .status-text {
          font-size: 14px;
          font-family: GothamRounded-Medium, GothamRounded;
          font-weight: 500;
          color: #ffffff;
        }
      }
    }
    .withdrawal-time {
      flex: 6;
      .text {
        font-size: 16px;
        font-family: GothamRounded-Book, GothamRounded;
        font-weight: normal;
        color: #ffffff;
      }
    }
    .fee {
      flex: 4;
      .text {
        font-size: 16px;
        font-family: GothamRounded-Book, GothamRounded;
        font-weight: normal;
        color: #ffffff;
      }
    }
    .btns {
      flex: 4;
      display: flex;
      justify-content: flex-end;
      .btn {
        font-size: 16px;
        font-family: GothamRounded-Book, GothamRounded;
        font-weight: normal;
        color: #ffffff;
      }
    }
  }

  .table-item-wrap {
    .table-item-wrap-main {
      min-height: 300px;
      .table-item-record:hover {
        background: rgba(245, 158, 100, 0.18);
      }
      .table-item-record-selected {
        background: rgba(245, 158, 100, 0.18);
      }
      .table-item-record {
        display: flex;
        align-items: center;
        height: 56px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        padding: 0 52px;
        cursor: pointer;
        .day-claimed {
          flex: 6;
          display: flex;
          align-items: center;
          .selected-wrap {
            width: 20px;
            height: 20px;
            cursor: pointer;
            img {
              width: 20px;
              height: 20px;
            }
          }
          .text {
            margin-left: 16px;
            font-size: 15px;
            font-family: GothamRounded-Medium, GothamRounded;
            font-weight: 500;
            color: #ffffff;
          }
        }
        .amount {
          flex: 4;
          display: flex;
          align-items: center;
          .maount-img {
            img {
              width: 24px;
              height: 24px;
            }
          }
          .text {
            margin-left: 4px;
            font-size: 15px;
            font-family: GothamRounded-Medium, GothamRounded;
            font-weight: 500;
            color: #ffffff;
          }
        }
        .status {
          flex: 4;
          display: flex;
          align-items: center;
          .text {
            font-size: 16px;
            font-family: GothamRounded-Book, GothamRounded;
            font-weight: normal;
            color: #ffffff;
            display: flex;
            align-items: center;
            .status-img1 {
              margin-top: 4px;
              width: 8px;
              height: 8px;
              background: linear-gradient(156deg, #eeeeee 0%, #7a7a7a 100%);
              border-radius: 50%;
            }
            .status-img2 {
              margin-top: 4px;
              width: 8px;
              height: 8px;
              background: #53b372;
              border-radius: 50%;
            }
            .status-text {
              margin-left: 3px;
              font-size: 14px;
              font-family: GothamRounded-Medium, GothamRounded;
              font-weight: 500;
              color: #ffffff;
            }
          }
        }
        .withdrawal-time {
          flex: 6;
          .text {
            font-size: 14px;
            font-family: GothamRounded-Medium, GothamRounded;
            font-weight: 500;
            color: #ffffff;
          }
        }
        .fee {
          flex: 4;
          .text {
            font-size: 14px;
            font-family: GothamRounded-Medium, GothamRounded;
            font-weight: 500;
            color: #ffffff;
            display: flex;
            align-items: flex-end;
            .fee-tips {
              margin-left: 5px;
              height: 13px;
              font-size: 12px;
              font-family: GothamRounded-Book, GothamRounded;
              font-weight: normal;
              color: rgba(255, 255, 255, 0.48);
              line-height: 14px;
            }
          }
        }
        .btns {
          flex: 4;
          display: flex;
          justify-content: flex-end;
          .btn {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 112px;
            height: 32px;
            border-radius: 25px;
            border: 1px solid #ffffff;
            font-size: 14px;
            font-family: GothamRounded-Medium, GothamRounded;
            font-weight: 500;
            color: #ffffff;
            cursor: pointer;
          }
          .btn:hover {
            opacity: 0.68;
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
.table-not-withdrawn-main {
  .el-loading-mask {
    //background: rgba(0, 0, 0, 0.6);
    background: linear-gradient(180deg, #473222 0%, #221d1d 100%);
    opacity: 0.75;
  }
}
</style>

