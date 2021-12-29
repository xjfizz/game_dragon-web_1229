<template>
  <div class="modal-backdrop">
    <div
      class="modal"
      v-loading="loadingForm.loadingShow"
      :element-loading-text="loadingForm.loadingShowText"
      element-loading-spinner="el-icon-loading"
    >
      <div class="modal-contain">
        <div class="modal-content">
          <div class="title">Confirm Transaction</div>
          <div class="content">
            <div class="detail-top">
              <div
                class="dragon-img"
                v-if="dragonDetail && dragonDetail.status == 2"
              >
                <dragonCreate
                  ref="dragonCreateBuy"
                  :dragonImgEye="createDragon(dragonDetail.parts[0])"
                  :dragonImgWing="createDragon(dragonDetail.parts[4])"
                  :dragonImgHorn="createDragon(dragonDetail.parts[2])"
                  :dragonImgBody="createDragon(dragonDetail.parts[6])"
                  :dragonImgTotems="createDragon(dragonDetail.parts[1])"
                  :dragonImgEar="createDragon(dragonDetail.parts[3])"
                  :dragonImgTail="createDragon(dragonDetail.parts[5])"
                ></dragonCreate>
              </div>
              <div
                class="dragon-img"
                v-if="dragonDetail && dragonDetail.status == 1"
              >
                <img
                  class="egg-img"
                  :src="dragonEggImgHandle(dragonDetail.clazz)"
                  alt=""
                />
              </div>
            </div>
            <div class="detail-mid">
              <div class="detail-left">Amount</div>
              <!-- {{dragonDetail}} -->
              <div class="detail-right">
                {{ dragonDetail.buySureInfo.amount }} DMS
              </div>
            </div>
            <div class="detail-mid-require">
              <div class="detail-left">Transaction Fee</div>
              <div class="detail-right">
                {{ dragonDetail.buySureInfo.fee }} DMS
              </div>
            </div>

            <div class="detail-mid-bottom">
              <div class="detail-left">Total</div>
              <div class="detail-right">
                {{ dragonDetail.buySureInfo.total }} DMS
              </div>
            </div>
          </div>

          <div class="content-btns">
            <div class="cancel select-hover" @click="cancelBuyDetail">
              Cancel
            </div>
            <div
              v-if="approveForm.dms.approve"
              class="confirm select-hover"
              @click="sureBuyDetail"
            >
              Confirm
            </div>
            <div
              v-else
              class="confirm select-hover"
              @click="approveDmsForMarket"
            >
              Approve DMS
            </div>
            <!-- <div v-else class="confirm select-hover no-data">Claim Now</div> -->
          </div>
        </div>
      </div>

      <div
        v-if="!loadingForm.loadingShow"
        class="close"
        @click="cancelBuyDetail"
      >
        <img src="@/assets/imgs/openBox/img-code/close.png" alt="" />
      </div>
    </div>
  </div>
</template>
 




<script>
import { reactive, toRefs, onMounted } from "vue";
import common from "@/utils/common";
import withdrawlDmpHandle from "@/views/pc/myMainland/use/withdrawlDmp";
import dragonCreate from "@/views/pc/myMainland/components/dragonCreate/indexCreateBreed.vue";
import myDragonDetail from "@/views/pc/myMainland/use/myDragonDetail";
import myDragon from "@/views/pc/myMainland/use/myDragon";
export default {
  components: {
    dragonCreate,
  },
  props: {
    classHeader: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, context) {
    const state = reactive({});
    onMounted(() => {});

    const { createDragon, dragonEggImgHandle } = myDragon();
    const {
      myDragonDetailState,
      cancelBuyDetail,
      sureBuyDetail,
      approveDmsForMarket,
    } = myDragonDetail();

    return {
      ...toRefs(state),
      ...toRefs(myDragonDetailState),
      cancelBuyDetail,
      sureBuyDetail,
      common,
      createDragon,
      approveDmsForMarket,
      dragonEggImgHandle,
    };
  },
};
</script>

<style scoped lang="less">
.modal-backdrop {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(20, 19, 19, 0.86);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99999999;
}
.modal {
  width: 588px;
  height: 660px;
  background: #282523;
  border-radius: 8px;
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.12);

  .modal-contain {
    height: 100%;
    width: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    .modal-content {
      margin: 32px 70px;
      .title {
        font-size: 28px;
        font-family: GothamRounded-Medium, GothamRounded;
        font-weight: 500;
        color: #ffffff;
        display: flex;
        justify-content: center;
      }
      .content {
        margin-top: 40px;
        min-height: 340px;
        // margin-bottom: 38px;
        .detail-top {
          display: flex;
          justify-content: center;
          .dragon-img {
            .egg-img {
              width: calc(602px * 0.32);
              height: calc(536px * 0.32);
            }
          }
        }
        .detail-mid {
          display: flex;
          justify-content: space-between;
          padding-bottom: 40px;
          margin-top: 16px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.12);
          .detail-left {
            font-size: 16px;
            font-family: GothamRounded-Book, GothamRounded;
            font-weight: normal;
            color: rgba(255, 255, 255, 0.48);
          }
          .detail-right {
            font-size: 16px;
            font-family: GothamRounded-Medium, GothamRounded;
            font-weight: 500;
            color: #ffffff;
            cursor: pointer;
          }
        }
        .detail-mid-require {
          display: flex;
          justify-content: space-between;
          padding-bottom: 37px;
          margin-top: 16px;
          border-bottom: 1px solid rgba(255, 255, 255, 1);
          .detail-left {
            font-size: 16px;
            font-family: GothamRounded-Book, GothamRounded;
            font-weight: normal;
            color: rgba(255, 255, 255, 0.48);
          }
          .detail-right {
            font-size: 16px;
            font-family: GothamRounded-Medium, GothamRounded;
            font-weight: 500;
            color: #ffffff;
          }
        }
        .detail-mid-bottom {
          display: flex;
          justify-content: space-between;
          margin-top: 16px;
          .detail-left {
            font-size: 16px;
            font-family: GothamRounded-Book, GothamRounded;
            font-weight: normal;
            color: rgba(255, 255, 255, 0.48);
          }
          .detail-right {
            font-size: 16px;
            font-family: GothamRounded-Medium, GothamRounded;
            font-weight: 500;
            color: #ffffff;
          }
        }

        .tips {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 69px;
          font-size: 16px;
          font-family: GothamRounded-Book, GothamRounded;
          font-weight: normal;
          color: #ff5151;
        }
      }

      .content-btns {
        margin-top: 38px;
        display: flex;
        justify-content: center;
        align-items: center;
        .cancel {
          width: 148px;
          height: 50px;
          border-radius: 25px;
          border: 1px solid rgba(255, 255, 255, 0.28);
          font-size: 16px;
          font-family: GothamRounded-Medium, GothamRounded;
          font-weight: 500;
          color: #ffffff;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
        }
        .confirm {
          margin-left: 24px;
          width: 148px;
          height: 50px;
          background: #ffc763;
          box-shadow: 0px 2px 0px 0px rgba(0, 0, 0, 0.38);
          border-radius: 25px;
          font-size: 16px;
          font-family: GothamRounded-Medium, GothamRounded;
          font-weight: 500;
          color: #2e0b00;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
        }
      }

      .no-data {
        opacity: 0.55;
      }
    }
  }

  .close {
    cursor: pointer;
    position: absolute;
    right: -17px;
    top: -17px;
    img {
      width: 32px;
      height: 32px;
    }
  }
}
</style>

