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
          <div class="title">Synthesis Details</div>
          <div class="content">
            <div class="img">
              <img :src="createDragonSkullsImg(selectItem1.level)" alt="" />
            </div>
            <div class="content-item">
              <div class="content-item-left">Level</div>
              <div class="content-item-right">
                {{ createDragonSkullsLevel(selectItem1.level) }} level
              </div>
            </div>
            <div class="content-item">
              <div class="content-item-left">Class</div>
              <div class="content-item-right">
                <div class="content-item-right-img">
                  <img :src="dragonClazzImgHandle(selectItem1.clazz)" alt="" />
                </div>
                <div class="content-item-right-text">
                  {{ dragonLocalTypeName[selectItem1.clazz] }} Dragon
                </div>
              </div>
            </div>
          </div>

          <div class="content-btns">
            <div class="confirm select-hover" @click="cancelOpenBox">
              OK
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="!loadingForm.loadingShow"
        class="close"
        @click="cancelOpenBox"
      >
        <img src="@/assets/imgs/openBox/img-code/close.png" alt="" />
      </div>
    </div>
  </div>
</template>
 




<script>
import { reactive, toRefs, onMounted } from "vue";
import blindBoxHandle from "@/views/pc/myMainland/use/blindBox";
import myDragon from "@/views/pc/myMainland/use/myDragon";
import skullCreateHandle from "@/views/pc/myMainland/use/skullCreate";
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
    const {
      dragonClazzImgHandle,
      dragonLocalTypeName,
      createDragonSkullsLevel,
    } = myDragon();

    const {skullCreateState, cancelOpenBox } = skullCreateHandle();

    const {
      blindBoxState,
      openBox,

      selectItemHandle1,
      createDragonSkullsImg,
    } = blindBoxHandle();

    return {
      ...toRefs(state),
      ...toRefs(blindBoxState),
      ...toRefs(skullCreateState),
      openBox,
      cancelOpenBox,
      selectItemHandle1,
      dragonClazzImgHandle,
      createDragonSkullsImg,
      dragonLocalTypeName,
      createDragonSkullsLevel,
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
  // background-color: rgba(20, 19, 19, 0.86);
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
          margin-top: 80px;
          img {
            width: calc(275px * 0.7);
            height: calc(258px * 0.7);
          }
        }
        .content-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 329px;
          padding-bottom: 14px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.12);
          margin-bottom: 16px;
          .content-item-left {
            font-size: 16px;
            font-family: GothamRounded-Book, GothamRounded;
            font-weight: normal;
            color: rgba(255, 255, 255, 0.48);
          }
          .content-item-right {
            font-size: 16px;
            font-family: GothamRounded-Book, GothamRounded;
            font-weight: normal;
            color: rgba(255, 255, 255, 1);
            display: flex;
            align-items: center;
            .content-item-right-img {
              display: flex;
              align-items: center;
              img {
                width: 20px;
                height: 20px;
              }
            }
            .content-item-right-text {
              margin-left: 8px;
            }
          }
        }
        .content-item:last-child {
          border: none;
        }
      }

      .content-btns {
        margin-top: 80px;
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

