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
          <div class="title">Confirm Details</div>
          <div class="content">
            <div class="content-des1">
              The winner’s list will be released at
              {{
                Moment(localDragonSKullForm.openTime)
                  .utc(0)
                  .format("YYYY-MM-DD HH:mm:ss UTC")
              }}
            </div>
            <div class="content-des2">
              If you do not win, DMS will be returned at the end of this issue,
              please remember to collect it in time!
            </div>
            <div class="img">
              <img
                src="../../../../../assets/imgs/myMainland/bind-box/bind-box.png"
                alt=""
              />
            </div>
            <div class="price-text">Box Price</div>
            <div class="price-value">
              <div class="price-value-value">
                {{ localDragonSKullForm.price }}
              </div>
              <div class="price-value-img">
                <img
                  src="../../../../../assets/imgs/myMainland/bind-box/dms.png"
                  alt=""
                />
              </div>
            </div>
            <div class="price-des">
              <div v-if="localDragonSKullForm.price > wallet.dms" class="text">
                * Not enough balance in your wallet
              </div>
            </div>
          </div>

          <div class="content-btns">
            <div
              v-if="!approveForm.dms.approve"
              class="cancel select-hover"
              @click="approveForDms"
            >
              Approve DMS
            </div>

            <div v-if="approveForm.dms.approve" class="cancel no-data">
              Approve DMS
            </div>
            <div
              v-if="approveForm.dms.approve"
              class="confirm select-hover"
              @click="buyBoxConfirm"
            >
              Stake Now
            </div>
            <div
              v-if="!approveForm.dms.approve"
              class="confirm select-hover no-data"
            >
              Stake Now
            </div>
          </div>
        </div>
      </div>

      <div v-if="!loadingForm.loadingShow" class="close" @click="cancelBuyBox">
        <img src="@/assets/imgs/openBox/img-code/close.png" alt="" />
      </div>
    </div>
  </div>
</template>
 




<script>
import { reactive, toRefs, onMounted } from "vue";
import blindBoxHandle from "@/views/pc/myMainland/use/blindBox";
import Moment from "moment";
export default {
  name: "earnedDetail",
  components: {},
  props: {
    classHeader: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, context) {
    const state = reactive({});
    onMounted(() => {
      // init();
    });
    const { blindBoxState, cancelBuyBox, buyBoxConfirm, approveForDms } =
      blindBoxHandle();

    return {
      ...toRefs(state),
      ...toRefs(blindBoxState),
      Moment,
      cancelBuyBox,
      buyBoxConfirm,
      approveForDms,
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
        display: flex;
        align-items: center;
        flex-direction: column;
        .content-des1 {
          margin-top: 48px;
          width: 480px;
          font-size: 14px;
          font-family: GothamRounded-Book, GothamRounded;
          font-weight: normal;
          color: #ffffff;
        }
        .content-des2 {
          margin-top: 16px;
          width: 480px;
          font-size: 14px;
          font-family: GothamRounded-Book, GothamRounded;
          font-weight: normal;
          color: rgba(255, 255, 255, 0.48);
        }
        .img {
          margin-top: 28px;
          img {
            width: calc(275px * 0.7);
            height: calc(258px * 0.7);
          }
        }
        .price-text {
          margin-top: 13px;
          font-size: 16px;
          font-family: GothamRounded-Book, GothamRounded;
          font-weight: normal;
          color: rgba(255, 255, 255, 0.48);
        }
        .price-value {
          display: flex;
          align-items: center;
          margin-top: 10px;
          .price-value-value {
            font-size: 20px;
            font-family: GothamRounded-Medium, GothamRounded;
            font-weight: 500;
            color: #ffffff;
          }
          .price-value-img {
            margin-left: 8px;
            img {
              width: 20px;
              height: 20px;
            }
          }
        }
        .price-des {
          margin-top: 15px;
          .text {
            font-size: 16px;
            font-family: GothamRounded-Book, GothamRounded;
            font-weight: normal;
            color: #ff5151;
          }
        }
      }

      .content-btns {
        margin-top: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        .cancel {
          width: 177px;
          height: 50px;
          background: #ffc763;
          border-radius: 25px;
          border: 1px solid rgba(255, 255, 255, 0.28);
          font-size: 16px;
          font-family: GothamRounded-Medium, GothamRounded;
          font-weight: 500;
          color: #2e0b00;
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

