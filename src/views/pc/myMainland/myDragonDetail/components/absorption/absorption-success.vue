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
          <div class="top-wrap">
            <div class="top-title">
              {{ absorbedType(takeInHistory[0].attributeType) }}
            </div>
            <div class="top-type">
              <div class="img" v-if="takeInHistory[0]">
                <img
                  :src="absorbedTypeImg(takeInHistory[0].attributeType)"
                  alt=""
                />
              </div>
              <div class="text">{{ takeInHistory[0].newAttributeVal }}</div>
            </div>
          </div>
          <div class="mid-des-wrap">
            <div class="mid-des">
              <div class="des-title">Absorbed skull:</div>
              <div class="des-value">
                <img
                  :src="dragonClazzImgHandle(takeInHistory[0].skullClazz)"
                  alt=""
                />
                {{ dragonLocalTypeName[takeInHistory[0].skullClazz] }}
                <div class="des-value-x">X</div>
                {{ createDragonSkullsLevel(takeInHistory[0].skullLevel) }} level
              </div>
            </div>
            <div class="mid-des">
              <div class="des-title">Remaining times:</div>
              <div class="des-value">{{ absorptionTime || 0 }}</div>
            </div>
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
import myDragonDetail from "@/views/pc/myMainland/use/myDragonDetail";
import skullsItem from "@/views/pc/myMainland/components/skulls-item/indexAbsorption.vue";
import absorptionHandle from "@/views/pc/myMainland/use/absorption";
import myDragon from "@/views/pc/myMainland/use/myDragon";
import common from "@/utils/common";
export default {
  name: "sendDragon",
  components: {
    skullsItem,
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
    const {
      dragonClazzImgHandle,
      dragonLocalTypeName,
      createDragonSkullsLevel,
    } = myDragon();
    const { myDragonDetailState } = myDragonDetail();
    const {
      absorptionState,
      sureCancelTakeIn,
      backToPrevious,
      closeCancelSure,
      absorbedType,
      absorbedTypeImg,
      closeSuccess,
    } = absorptionHandle();
    return {
      ...toRefs(state),
      ...toRefs(myDragonDetailState),
      ...toRefs(absorptionState),
      dragonClazzImgHandle,
      dragonLocalTypeName,
      createDragonSkullsLevel,
      sureCancelTakeIn,
      backToPrevious,
      closeCancelSure,
      absorbedType,
      absorbedTypeImg,
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
  background-color: rgba(20, 19, 19, 0.86);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99999999;
}
.modal {
  width: 840px;
  height: 494px;
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
      .top-wrap {
        width: 296px;
        height: 91px;
        background: #1a1716;
        border-radius: 8px;
        border: 1px solid rgba(255, 255, 255, 0.12);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        margin-top: 87px;

        .top-title {
          font-size: 16px;
          font-family: GothamRounded-Book, GothamRounded;
          font-weight: normal;
          color: #ffffff;
        }
        .top-type {
          display: flex;
          align-items: center;
          margin-top: 9px;
          .img {
            img {
              width: 20px;
              height: 20px;
            }
          }
          .text {
            margin-left: 8px;
            font-size: 14px;
            font-family: GothamRounded-Medium, GothamRounded;
            font-weight: 500;
            color: #ffffff;
          }
        }
      }

      .mid-des-wrap {
        margin-top: 36px;
        .mid-des {
          margin-top: 16px;
          display: flex;
          align-items: center;
          .des-title {
            font-size: 14px;
            font-family: GothamRounded-Book, GothamRounded;
            font-weight: normal;
            color: rgba(255, 255, 255, 0.48);
          }
          .des-value {
            margin-left: 12px;
            font-size: 12px;
            font-family: GothamRounded-Medium, GothamRounded;
            font-weight: 500;
            color: #ffffff;
            display: flex;
            align-items: center;
            img {
              margin-right: 5px;
              width: 20px;
              height: 20px;
            }
            .des-value-x {
              margin-left: 8px;
              margin-right: 8px;
              color: rgba(255, 255, 255, 0.48);
            }
          }
        }
      }

      .bottom {
        margin-top: 73px;
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

