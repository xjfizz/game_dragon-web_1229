<template>
  <div class="dms-total">
    <div class="title">Total DMS destroyed</div>
    <div class="dms-top">
      <div>
        <span>Total DMS destroyed:</span>
        <img
          class="dms"
          src="../../../../assets/imgs/myMainland/bnb-coin.png"
          alt=""
          v-show="statisticalData.totalDestroyDmp"
        />
        <!-- DMP销毁总量 -->
        <span>{{ statisticalData.totalDestroyDmp }}</span>
      </div>
      <div>
        <span>DMS current circulation volume:</span>
        <img
          class="dms"
          src="../../../../assets/imgs/myMainland/bnb-coin.png"
          alt=""
        />
        <!-- {{ DMS当前流通量 }} -->
        <span>{{ dmsVolume.toLocaleString() }}</span>
      </div>
    </div>
    <div class="dms-center">
      <div class="dms-center-head">
        <div>Marketplace transaction fees</div>
        <div>Buy Blind Box</div>
      </div>
      <div class="dms-center-body">
        <div class="dms-center-body-row">
          <!-- 百分之5的手续费 TODO-->
          <div>Number of DMS generated</div>
          <div>
            <img
              class="dms"
              src="../../../../assets/imgs/myMainland/bnb-coin.png"
              alt=""
              v-show="
                (statisticalData && statisticalData.totalMarketFee) ||
                statisticalData.totalMarketFee == 0
              "
            />
            <!-- 交易手续费 -->
            <span>{{ statisticalData.totalMarketFee }}</span>
          </div>
          <div>Number of DMS destroyed</div>
          <div>
            <img
              class="dms"
              src="../../../../assets/imgs/myMainland/bnb-coin.png"
              alt=""
              v-show="
                (statisticalData && statisticalData.totalBlindBoxDestroyDms) ||
                statisticalData.totalBlindBoxDestroyDms == 0
              "
            />
            <!-- 盲盒销毁DMS -->
            <span>{{ statisticalData.totalBlindBoxDestroyDms }}</span>
          </div>
        </div>
        <div class="dms-center-body-row">
          <div>Lock-up volume</div>
          <div>
            <img
              class="dms"
              src="../../../../assets/imgs/myMainland/bnb-coin.png"
              alt=""
              v-show="
                (statisticalData && statisticalData.totalMarketFeeLocked) ||
                statisticalData.totalMarketFeeLocked == 0
              "
            />
            <!-- 锁仓量 -->
            <span>{{ statisticalData.totalMarketFeeLocked }}</span>
          </div>
          <div>Current number of pledged DMS</div>
          <div>
            <img
              class="dms"
              src="../../../../assets/imgs/myMainland/bnb-coin.png"
              alt=""
              v-show="
                (statisticalData && statisticalData.totalBlindBoxStakeDms) ||
                statisticalData.totalBlindBoxStakeDms == 0
              "
            />
            <!-- 盲盒质押DMS -->
            <span>{{ statisticalData.totalBlindBoxStakeDms }}</span>
          </div>
        </div>
        <div class="dms-center-body-row">
          <div>Address</div>
          <div>
            <span
              class="address"
              @click="
                goContract(contractAddress.dragon_transaction_destory_address)
              "
              >{{
                commons.formatAddress(
                  contractAddress.dragon_transaction_destory_address
                )
              }}</span
            >
          </div>
          <div>Address</div>
          <div>
            <span
              class="address"
              @click="goContract(contractAddress.blindBox_destory_address)"
              >{{
                commons.formatAddress(contractAddress.blindBox_destory_address)
              }}</span
            >
          </div>
        </div>
      </div>
    </div>
    <div class="dms-bottom">
      <div class="dms-bottom-top">
        <div></div>
        <div>Dragon Breeding</div>
        <div>Skull Synthesis</div>
        <div>Skull Absorption</div>
        <div>Dragon Devouring</div>
        <div>Talent Upgrading</div>
      </div>
      <div class="dms-bottom-body">
        <div class="dms-bottom-body-row">
          <div>Quantity Destroyed</div>
          <div>
            <img
              class="dms"
              src="../../../../assets/imgs/myMainland/bnb-coin.png"
              alt=""
              v-show="
                (statisticalData && statisticalData.totalBreedDestroyDms) ||
                statisticalData.totalBreedDestroyDms == 0
              "
            />
            <!-- 龙繁殖DMS -->
            <span>{{ statisticalData.totalBreedDestroyDms }}</span>
          </div>
          <div>
            <img
              class="dms"
              src="../../../../assets/imgs/myMainland/bnb-coin.png"
              alt=""
              v-show="
                (statisticalData &&
                  statisticalData.totalSkullsCompoundDestroyDms) ||
                statisticalData.totalSkullsCompoundDestroyDms == 0
              "
            />
            <!-- 龙骨合成DMS -->
            <span>{{ statisticalData.totalSkullsCompoundDestroyDms }}</span>
          </div>
          <div>
            <img
              class="dms"
              src="../../../../assets/imgs/myMainland/bnb-coin.png"
              alt=""
              v-show="
                (statisticalData &&
                  statisticalData.totalSkullsAbsorbDestroyDms) ||
                statisticalData.totalSkullsAbsorbDestroyDms == 0
              "
            />
            <!-- 龙骨吸收DMS -->
            <span>{{ statisticalData.totalSkullsAbsorbDestroyDms }}</span>
          </div>
          <div>
            <img
              class="dms"
              src="../../../../assets/imgs/myMainland/bnb-coin.png"
              alt=""
              v-show="
                (statisticalData && statisticalData.totalDevourDestroyDms) ||
                statisticalData.totalDevourDestroyDms == 0
              "
            />
            <!-- 吞噬龙DMS -->
            <span>{{ statisticalData.totalDevourDestroyDms }}</span>
          </div>
          <div>
            <img
              class="dms"
              src="../../../../assets/imgs/myMainland/bnb-coin.png"
              alt=""
              v-show="
                (statisticalData && statisticalData.totalUpgradeDestroyDms) ||
                statisticalData.totalUpgradeDestroyDms == 0
              "
            />
            <!-- 升级天赋DMS -->
            <span>{{ statisticalData.totalUpgradeDestroyDms }}</span>
          </div>
        </div>
        <div class="dms-bottom-body-row">
          <div>Address</div>
          <div>
            <!-- 龙繁殖 -->
            <span
              class="address"
              @click="goContract(contractAddress.dragon_breed_destory_address)"
              >{{
                commons.formatAddress(
                  contractAddress.dragon_breed_destory_address
                )
              }}</span
            >
          </div>
          <div>
            <span
              class="address"
              @click="goContract(contractAddress.dragon_breed_destory_address)"
            >
              {{
                commons.formatAddress(
                  contractAddress.dragon_breed_destory_address
                )
              }}</span
            >
          </div>
          <div>
            <!-- 龙骨吸收 -->
            <span>-</span>
          </div>
          <div>
            <!-- 吞噬龙DMS -->
            <span>-</span>
          </div>
          <div>
            <!-- 升级天赋 -->
            <span>-</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="dmp-total">
    <div class="title">Total DMP destroyed</div>
    <div class="dmp-total-body">
      <div class="dmp-total-head">
        <div>
          <span> Total DMP destroyed:</span>
          <img
            class="dms"
            src="../../../../assets/imgs/myMainland/skullCreate/dmp.png"
            alt=""
          />
          <!-- v-show="statisticalData && statisticalData.totalWithdrawDestroyDmp" -->
          <!-- DMP销毁数量 -->
          <span>{{ statisticalData.totalDestroyDmp }}</span>
        </div>
        <div>
          <span> DMP current circulation volume:</span>
          <img
            class="dmp"
            src="../../../../assets/imgs/myMainland/skullCreate/dmp.png"
            alt=""
          />
          <!-- DMP当前流通量 -->
          <span>{{ dmpTurnover }}</span>
        </div>
      </div>
      <div class="dmp-total-center">
        <div></div>
        <div>DMP withdrawal fees</div>
        <div>Dragon Breeding</div>
        <div>Skull Synthesis</div>
        <div>Skull Absorption</div>
        <div>Dragon Devouring</div>
        <div>Talent Upgrading</div>
      </div>
      <div class="dmp-total-footer">
        <div class="dmp-total-footer-row">
          <div>Quantity Destroyed</div>
          <!-- DMP 提现手续费 -->
          <div>{{ statisticalData.totalWithdrawDestroyDmp }}</div>
          <!-- 龙繁殖 DMP -->
          <div>{{ statisticalData.totalBreedDestroyDmp }}</div>
          <!-- 龙骨合成 DMP -->
          <div>{{ statisticalData.totalSkullsCompoundDestroyDmp }}</div>
          <!-- 龙骨吸收 DMP -->
          <div>{{ statisticalData.totalSkullsAbsorbDestroyDmp }}</div>
          <!-- 吞噬龙 DMP  -->
          <div>{{ statisticalData.totalDevourDestroyDmp }}</div>
          <!-- 升级天赋 DMP -->
          <div>{{ statisticalData.totalUpgradeDestroyDmp }}</div>
        </div>
        <div>
          <div>Address</div>
          <!-- 提现手续费 -->
          <div>
            <span
              class="address"
              @click="
                goContract(contractAddress.dmp_withdrawal_destory_address)
              "
              >{{
                commons.formatAddress(
                  contractAddress.dmp_withdrawal_destory_address
                )
              }}</span
            >
          </div>
          <!-- 龙繁殖 -->
          <div>
            <span
              class="address"
              @click="goContract(contractAddress.dragon_breed_destory_address)"
            >
              {{
                commons.formatAddress(
                  contractAddress.dragon_breed_destory_address
                )
              }}</span
            >
          </div>
          <!-- 龙骨合成 -->
          <div>
            <span
              class="address"
              @click="goContract(contractAddress.dragon_breed_destory_address)"
              >{{
                commons.formatAddress(
                  contractAddress.dragon_breed_destory_address
                )
              }}</span
            >
          </div>
          <div><span>-</span></div>
          <div><span>-</span></div>
          <div><span>-</span></div>
        </div>
      </div>
    </div>
  </div>
  <!-- 总生成数量-销毁数量-提现手续费 -->
</template>

<script>
import { onMounted, toRefs } from "vue";
import common from "@/utils/common";
import burnHandle from "../use/totalbrun";

export default {
  setup() {
    const { state, getStatisticalData, getDmpContract, goContract } =
      burnHandle();
    getStatisticalData();
    const commons = common;
    return {
      ...toRefs(state),
      getStatisticalData,
      commons,
      getDmpContract,
      goContract,
    };
  },
};
</script>

<style lang="less" scoped>
.dms-total,
.dmp-total {
  font-family: GothamRounded-Medium, GothamRounded;
  margin-bottom: 41px;
}
.title {
  width: 212px;
  height: 21px;
  font-size: 20px;
  font-weight: 500;
  color: #ffffff;
  line-height: 21px;
}
.dms-top {
  width: 1198px;
  height: 68px;
  background: #1a1716;
  border-radius: 8px 8px 0px 0px;
  margin-top: 15px;
  display: flex;
  font-size: 14px;
  div:first-of-type {
    border-right: 1px solid rgba(255, 255, 255, 0.08);
  }
  div {
    display: flex;
    align-items: center;
    flex: 1;
    padding-left: 16px;
    font-size: 14px;
    span:first-of-type {
      color: #797777;
      font-size: 14px;
    }
    span:last-of-type {
      font-weight: 500;
      color: #ffffff;
      font-size: 14px;
    }
    img {
      width: 20px;
      height: auto;
      margin: 0 4px 0 10px;
    }
  }
}
.dms-center {
  width: 1198px;
  height: 241px;
  background: #1a1716;
  margin-top: 15px;
  font-size: 14px;
  .dms-center-head {
    height: 70px;
    display: flex;
    width: 100%;
    color: #ffffff;
    font-size: 14px;
    div {
      flex: 1;
      height: 100%;
      display: flex;
      align-items: center;
      padding-left: 16px;
      font-size: 14px;
    }
    div:first-of-type {
      border-right: 1px solid rgba(255, 255, 255, 0.08);
    }
  }
  .dms-center-body {
    height: 170px;
    display: flex;
    flex-direction: column;
    font-size: 14px;
    .dms-center-body-row {
      flex: 1;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      display: flex;
      font-size: 14px;
      .address {
        color: #797777;
        text-decoration: underline;
        cursor: pointer;
        font-size: 14px;
      }
      div {
        flex: 1;
        display: flex;
        height: 100%;
        align-items: center;
        font-weight: 500;
        color: #ffffff;
        padding-left: 15px;
        border-right: 1px solid rgba(255, 255, 255, 0.08);
        font-size: 14px;
        img {
          width: 20px;
          height: auto;
          margin-right: 4px;
        }
      }
      div:first-of-type,
      div:nth-of-type(3) {
        color: #797777;
        font-weight: normal;
      }
      div:last-of-type {
        border: none;
      }
    }
  }
}
.dms-bottom {
  width: 1198px;
  height: 184px;
  background: #1a1716;
  border-radius: 8px 8px 0px 0px;
  margin-top: 15px;
  font-size: 14px;
  .dms-bottom-top {
    height: 70px;
    width: 100%;
    display: flex;
    font-size: 14px;
    div {
      font-size: 14px;
      flex: 1;
      display: flex;
      align-items: center;
      color: #ffffff;
      justify-content: center;
      border-right: 1px solid rgba(255, 255, 255, 0.08);
    }
  }
  .dms-bottom-body {
    height: 114px;
    width: 100%;
    display: flex;
    flex-direction: column;
    font-size: 14px;
    img {
      width: 20px;
      height: auto;
      margin-right: 4px;
    }
    .dms-bottom-body-row:first-of-type {
      font-size: 14px;
      div {
        color: #ffffff;
        font-weight: 500;
      }
    }
    .dms-bottom-body-row:last-of-type {
      span {
        color: #999897;
        font-size: 14px;
      }
      .address {
        text-decoration: underline;
        cursor: pointer;
      }
    }

    .dms-bottom-body-row {
      flex: 1;
      height: 100%;
      display: flex;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      font-size: 14px;
      div:first-of-type {
        color: #797777;
      }
      div {
        height: 100%;
        border-right: 1px solid rgba(255, 255, 255, 0.08);
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
      }

      div:last-of-type {
        border-right: none;
      }
    }
  }
}
.dmp-total-body {
  font-size: 14px;
  width: 1200px;
  height: 252px;
  background: #1a1716;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  margin-top: 16px;
  .dmp-total-head {
    font-size: 14px;
    height: 68px;
    display: flex;
    div:first-of-type {
      border-right: 1px solid rgba(255, 255, 255, 0.12);
    }
    div {
      flex: 1;
      display: flex;
      align-items: center;
      padding-left: 16px;
      font-size: 14px;
      img {
        width: 20px;
        height: auto;
        margin: 0 4px 0 0px;
      }
      span:first-of-type {
        color: #797777;
        margin-right: 10px;
      }

      span:last-of-type {
        color: #ffffff;
        font-size: 14px;
      }
    }
  }
  .dmp-total-center {
    font-size: 14px;
    height: 69px;
    width: 100%;
    display: flex;
    border-top: 1px solid rgba(255, 255, 255, 0.12);
    font-size: 14px;
    div {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      border-right: 1px solid rgba(255, 255, 255, 0.12);
      color: #ffffff;
      font-size: 14px;
    }
    div:last-of-type {
      border: none;
    }
  }
  .dmp-total-footer {
    border-top: 1px solid rgba(255, 255, 255, 0.12);
    height: 113px;
    display: flex;
    flex-direction: column;
    font-size: 14px;
    .dmp-total-footer-row:first-of-type {
      border-bottom: 1px solid rgba(255, 255, 255, 0.12);
      font-size: 14px;
    }
    div {
      flex: 1;
      display: flex;
      font-size: 14px;
      div:last-of-type {
        border: none;
      }
      div:first-of-type {
        color: #797777;
      }
      .address {
        text-decoration: underline;
        cursor: pointer;
      }
      span {
        color: #999897;
        font-size: 14px;
      }
      div {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        border-right: 1px solid rgba(255, 255, 255, 0.12);
        color: #ffffff;
      }
    }
  }
}
</style>
