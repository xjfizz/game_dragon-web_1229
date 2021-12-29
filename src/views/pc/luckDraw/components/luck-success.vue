<template>
  <div class="modal-backdrop">
    <div class="modal">
      <div
        class="modal-contain"
        v-loading="loadingForm.loadingShow"
        :element-loading-text="loadingForm.loadingShowText"
        element-loading-spinner="el-icon-loading"
      >
        <div class="modal-content">
          <div class="title">Congratulations！！</div>
          <div class="mid-img">
            <img src="../../../../assets/imgs/luckDraw/dms.png" alt="" />
          </div>
          <div class="mid-dms">{{lotteryResult.dms}} DMS</div>
          <div class="mid-line"></div>
          <div class="mid-des">
            *They will be transferred to your wallet within 3 days, please check
            in time
          </div>

          <div class="bottom">
            <div class="btns">
              <div class="cancel-btn select-hover" @click="closeSuccess">
                OK
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="!loadingForm.loadingShow"
          class="close"
          @click="closeSuccess"
        >
          <img src="@/assets/imgs/openBox/img-code/close.png" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>
 




<script>
import { reactive, toRefs, onMounted } from "vue";
import luckDrawHandle from "../use/luckDraw";

import common from "@/utils/common";
export default {
  name: "sendDragon",
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

    const { luckDrawState, closeSuccess } = luckDrawHandle();
    return {
      ...toRefs(state),
      ...toRefs(luckDrawState),

      closeSuccess,
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
  background-color: rgba(20, 19, 19, 0);
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
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      position: relative;
      .title {
        font-size: 28px;
        font-family: GothamRounded-Medium, GothamRounded;
        font-weight: 500;
        color: #ffffff;
        margin-top: 24px;
      }
      .mid-img {
        margin-top: 58px;
        img {
          width: 197px;
          height: 197px;
        }
      }
      .mid-dms {
        margin-top: 32px;
        font-size: 14px;
        font-family: GothamRounded-Medium, GothamRounded;
        font-weight: 500;
        color: #ffffff;
      }
      .mid-line {
        margin-top: 26px;
        width: 380px;
        height: 1px;
        background: #ffffff;
        opacity: 0.12;
      }
      .mid-des {
        margin-top: 24px;
        width: 380px;
        height: 48px;
        font-size: 14px;
        font-size: 14px;
        font-family: GothamRounded-Medium, GothamRounded;
        font-weight: 500;
        color: rgba(255, 255, 255, 0.48);
        text-align: center;
        line-height: 24px;
      }

      .bottom {
        margin-top: 68px;
        .btns {
          .sure-btn {
            width: 296px;
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
          }
          .cancel-btn {
            width: 296px;
            height: 50px;
            border-radius: 25px;
            border: 1px solid rgba(255, 255, 255, 0.12);
            font-size: 16px;
            font-family: GothamRounded-Medium, GothamRounded;
            font-weight: 500;
            color: #ffffff;
            display: flex;
            justify-content: center;
            align-items: center;
          }
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

  .close {
    cursor: pointer;
    position: absolute;
    right: -20px;
    top: 10px;
    img {
      width: 77px;
      height: 77px;
    }
  }
}
</style>

