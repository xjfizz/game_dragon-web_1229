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
            

            <div class="content-item-total">
              <div class="item-left">Total</div>
              <div class="item-right">
                <div class="item-right-top">
                  <div class="item-right-top-text">{{ableClaimBalance || 0}}</div>
                  <div class="item-right-top-img">
                    <img
                      src="../.././../../../assets/imgs/myMainland/bind-box/dms.png"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="content-btns">
            <!-- <div class="cancel select-hover" @click="approveDms">
              Approve DMS
            </div> -->
            <div class="confirm select-hover" @click="claimDmsHandle">Claim</div>
          </div>
        </div>
      </div>

      <div v-if="!loadingForm.loadingShow" class="close" @click="calcelClaim">
        <img src="@/assets/imgs/openBox/img-code/close.png" alt="" />
      </div>
    </div>
  </div>
</template>
 




<script>
import { reactive, toRefs, onMounted } from "vue";
import blindBoxHandle from "@/views/pc/myMainland/use/blindBox";

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
    const { blindBoxState, claimDmsHandle , calcelClaim } = blindBoxHandle();

    return {
      ...toRefs(state),
      ...toRefs(blindBoxState),
      claimDmsHandle,
      calcelClaim,
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
  height: 400px;
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
        height: 180px;
        overflow-y: scroll;
        margin-top: 40px;

        .content-item {
          margin-top: 16px;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          width: 329px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.12);
          padding-bottom: 13px;
          .item-left {
            font-size: 16px;
            font-family: GothamRounded-Book, GothamRounded;
            font-weight: normal;
            color: rgba(255, 255, 255, 0.48);
          }
          .item-right {
            .item-right-top {
              display: flex;
              align-items: center;
              .item-right-top-text {
                font-size: 20px;
                font-family: GothamRounded-Medium, GothamRounded;
                font-weight: 500;
                color: #ffffff;
              }
              .item-right-top-img {
                margin-left: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                img {
                  width: 28px;
                  height: 28px;
                }
              }
            }
            .item-right-bottom {
              margin-top: 8px;
              font-size: 16px;
              font-family: GothamRounded-Book, GothamRounded;
              font-weight: normal;
              color: rgba(255, 255, 255, 0.48);
            }
          }
        }
        .content-item:nth-last-child(2) {
          border-bottom: 1px solid rgba(255, 255, 255, 1);
        }

        .content-item-total {
          margin-top: 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 329px;
          padding-bottom: 13px;
          .item-left {
            font-size: 16px;
            font-family: GothamRounded-Book, GothamRounded;
            font-weight: normal;
            color: rgba(255, 255, 255, 0.48);
          }
          .item-right {
            .item-right-top {
              display: flex;
              align-items: center;
              .item-right-top-text {
                font-size: 20px;
                font-family: GothamRounded-Medium, GothamRounded;
                font-weight: 500;
                color: #ffffff;
              }
              .item-right-top-img {
                margin-left: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                img {
                  width: 28px;
                  height: 28px;
                }
              }
            }
            .item-right-bottom {
              margin-top: 8px;
              font-size: 16px;
              font-family: GothamRounded-Book, GothamRounded;
              font-weight: normal;
              color: rgba(255, 255, 255, 0.48);
            }
          }
        }
      }

      .content-btns {
        //margin-top: 40px;
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

