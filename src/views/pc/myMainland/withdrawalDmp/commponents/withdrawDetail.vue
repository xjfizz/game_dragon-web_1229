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
          <div class="title">Withdraw</div>
          <div class="content">
            <div class="detail-mid">
              <div class="detail-left">DMP withdrawal amount</div>
              <div class="detail-right">{{common.formatValue(withdrawDetail.totalAmount,4) || 0}}</div>
            </div>
            <div class="detail-mid-require">
              <div class="detail-left">Gas fee</div>
              <div class="detail-right">{{common.formatValue(withdrawDetail.fee,4) || 0 }} DMP</div>
            </div>

            <div class="detail-mid-bottom">
              <div class="detail-left">Total</div>
              <div class="detail-right">{{common.formatValue(withdrawDetail.total,4) || 0 }} DMP</div>
            </div>
          </div>

          <div class="content-btns">
            <div class="cancel select-hover" @click="cancelDetail">Cancel</div>
            <div class="confirm select-hover" @click="sureDetail">Sure</div>
            <!-- <div v-else class="confirm select-hover no-data">Claim Now</div> -->
          </div>
        </div>
      </div>

      <div v-if="!loadingForm.loadingShow" class="close" @click="cancelDetail">
        <img src="@/assets/imgs/openBox/img-code/close.png" alt="" />
      </div>
    </div>
  </div>
</template>
 




<script>
import { reactive, toRefs, onMounted } from "vue";
import common from "@/utils/common";
import withdrawlDmpHandle from "@/views/pc/myMainland/use/withdrawlDmp";

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
    onMounted(() => {});

    const { withdrawlDmpState, cancelDetail, sureDetail } =
      withdrawlDmpHandle();

    return {
      ...toRefs(state),
      ...toRefs(withdrawlDmpState),
      cancelDetail,
      sureDetail,
      common,
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
        margin-top: 60px;
        height: 340px;
        // margin-bottom: 38px;
        .detail-top {
          display: flex;
          justify-content: space-between;
          padding-bottom: 16px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.12);
          .detail-left {
            font-size: 16px;
            font-family: GothamRounded-Book, GothamRounded;
            font-weight: normal;
            color: rgba(255, 255, 255, 0.48);
          }
          .detail-right {
            font-size: 13px;
            font-family: GothamRounded-Medium, GothamRounded;
            font-weight: 500;
            color: rgba(255, 255, 255, 1);
            .total {
              display: flex;
              justify-content: flex-end;
            }
            .power {
              margin-top: 8px;
              font-size: 13px;
              font-family: GothamRounded-Medium, GothamRounded;
              font-weight: 500;
              color: rgba(255, 255, 255, 0.48);
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

