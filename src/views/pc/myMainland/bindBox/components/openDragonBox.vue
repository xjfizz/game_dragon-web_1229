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
          <div class="title">Open BOX</div>
          <div class="content">
            <div class="img">
              <!-- <img
                src="../../../../../assets/imgs/myMainland/bind-box/bind-box.png"
                alt=""
              /> -->
              <div ref="confettiConDragonBox" id="confettiConDragonBox" class="lottieDragonBox">
                <lottie
                  :options="dragonBoxStartAnimation.defaultOptions"
                  v-on:animCreated="handleAnimation"
                />
              </div>
            </div>
            <div class="price-text">Select the number of issue</div>
            <div class="select-item-wrap">
              <selectList
                v-if="selectList1.length > 0"
                :selectList="selectList1"
                :selectItem="selectItem1"
                :selectListShow="selectListShow1"
                @selectItem="selectItemHandle1"
              ></selectList>
            </div>
          </div>

          <div class="content-btns">
            <div class="confirm select-hover" @click="openBox">Unlock</div>
          </div>
        </div>
      </div>

      <div v-if="!loadingForm.loadingShow" class="close" @click="cancelOpenBox">
        <img src="@/assets/imgs/openBox/img-code/close.png" alt="" />
      </div>
    </div>
  </div>
</template>
 




<script>
import { reactive, toRefs, onMounted } from "vue";
import blindBoxHandle from "@/views/pc/myMainland/use/blindBox";
import selectList from "@/components/selectList/selectListBlindBox.vue";
import lottie from "vue-lottie/src/lottie.vue";

export default {
  name: "earnedDetail",
  components: { selectList, lottie },
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
    const {
      blindBoxState,
      openBox,
      cancelOpenBox,
      selectItemHandle1,
      handleAnimation,
    } = blindBoxHandle();

    return {
      ...toRefs(state),
      ...toRefs(blindBoxState),
      openBox,
      cancelOpenBox,
      selectItemHandle1,
      handleAnimation,
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
        .img {
          //margin-top: 80px;
          .lottieDragonBox {
            width: calc(352px * 1);
            height: calc(320px * 1);
          }
        }
        .price-text {
          margin-top: 30px;
          font-size: 16px;
          font-family: GothamRounded-Book, GothamRounded;
          font-weight: normal;
          color: rgba(255, 255, 255, 0.48);
        }
        .select-item-wrap {
          margin-top: 20px;
          display: flex;
          justify-content: center;
        }
        .price-des {
          margin-top: 55px;
          .text {
            font-size: 16px;
            font-family: GothamRounded-Book, GothamRounded;
            font-weight: normal;
            color: #ff5151;
          }
        }
      }

      .content-btns {
        margin-top: 50px;
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
         // margin-left: 24px;
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

