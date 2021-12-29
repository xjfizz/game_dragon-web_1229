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
          <div class="title">Synthesis</div>
          <div class="item-wrap">
            <div class="item">
              <div class="item-left">DMP Required</div>
              <div class="item-right">
                <div class="text">{{ requirePrice.dmp }}</div>
                <img
                  src="@/assets/imgs/myMainland/skullCreate/dmp.png"
                  alt=""
                />
              </div>
            </div>
            <div class="item">
              <div class="item-left">DMS Required</div>
              <div class="item-right">
                <div class="text">{{ requirePrice.dms }}</div>
                <img
                  src="@/assets/imgs/myMainland/skullCreate/dms.png"
                  alt=""
                />
              </div>
            </div>

            <div class="balance-des" v-if="wallet.dmp < requirePrice.dmp">
              * Not enough! You only have {{ wallet.dmp }} DMP left in wallet.
            </div>
            <div
              class="balance-des"
              v-if="
                wallet.dmp > requirePrice.dmp && wallet.dms < requirePrice.dms
              "
            >
              * Not enough! You only have {{ wallet.dms }} DMS left in wallet.
            </div>
          </div>

          <div class="content-bottom-btns">
            <!-- approveForm -->
            <div
              class="bottom-btn hover-select"
              :class="!approveForm.dmp.isApprove ? '' : 'no-data'"
              @click="approve(1)"
            >
              <div v-if="!approveForm.dmp.isApprove" class="approve-text">
                1
              </div>
              <div v-if="approveForm.dmp.isApprove" class="img">
                <img
                  src="@/assets/imgs/myMainland/breed/breed-approve.png"
                  alt=""
                />
              </div>
              <div class="text">Approve DMP</div>
            </div>

            <div
              class="approve-line"
              :class="!approveForm.dmp.isApprove ? '' : 'no-data'"
            ></div>

            <div
              class="bottom-btn hover-select"
              :class="
                approveForm.dmp.isApprove && !approveForm.dms.isApprove
                  ? ''
                  : 'no-data'
              "
              @click="approve(2)"
            >
              <div v-if="!approveForm.dms.isApprove" class="approve-text">
                2
              </div>
              <div v-if="approveForm.dms.isApprove" class="img">
                <img
                  src="@/assets/imgs/myMainland/breed/breed-approve.png"
                  alt=""
                />
              </div>
              <div class="text">Approve DMS</div>
            </div>
            <div
              class="approve-line"
              :class="!approveForm.dms.isApprove ? '' : 'no-data'"
            ></div>

            <div
              class="bottom-btn hover-select"
              :class="
                approveForm.dmp.isApprove && approveForm.dms.isApprove && !approveForm.skull.isApprove
                  ? ''
                  : 'no-data'
              "
              @click="approveSkull(3)"
            >
              <div v-if="!approveForm.skull.isApprove" class="approve-text">
                3
              </div>
              <div v-if="approveForm.skull.isApprove" class="img">
                <img
                  src="@/assets/imgs/myMainland/breed/breed-approve.png"
                  alt=""
                />
              </div>
              <div class="text">Approve Skull</div>
            </div>
            <div
              class="approve-line"
              :class="!approveForm.dms.isApprove ? '' : 'no-data'"
            ></div>

            <div
              class="bottom-btn hover-select"
              :class="
                approveForm.dmp.isApprove &&
                approveForm.dms.isApprove &&
                approveForm.skull.isApprove &&
                wallet.dmp >= requirePrice.dmp &&
                wallet.dms >= requirePrice.dms
                  ? ''
                  : 'no-data'
              "
              @click="startCreateSkull"
            >
              <div class="img">
                <!-- <img
                  src="@/assets/imgs/myMainland/breed/breed-love.png"
                  alt=""
                /> -->
              </div>
              <div class="text">Synthesis Now</div>
            </div>
          </div>
        </div>
        <div v-if="!loadingForm.loadingShow" class="close" @click="close">
          <img src="@/assets/imgs/openBox/img-code/close.png" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>
 




<script>
import { reactive, toRefs, onMounted } from "vue";
import myDragon from "@/views/pc/myMainland/use/myDragon";
import skullCreateHandle from "@/views/pc/myMainland/use/skullCreate";
export default {
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
    const { myDragonState } = myDragon();
    const { skullCreateState, close, approve,approveSkull, startCreateSkull } =
      skullCreateHandle();
    return {
      ...toRefs(myDragonState),
      ...toRefs(skullCreateState),
      close,
      approve,
      approveSkull,
      startCreateSkull,
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
  // width: 750px;
  width: 950px;
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
        margin-top: 30px;
      }
      .item-wrap {
        margin-top: 100px;
        height: 250px;
        .item:last-child {
          border-bottom: none;
        }
        .item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 500px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.12);
          height: 70px;
          .item-left {
            font-size: 16px;
            font-family: GothamRounded-Book, GothamRounded;
            font-weight: normal;
            color: rgba(255, 255, 255, 0.48);
          }
          .item-right {
            display: flex;
            align-items: center;
            .text {
              font-size: 14px;
              font-family: GothamRounded-Medium, GothamRounded;
              font-weight: 500;
              color: #ffffff;
            }
            img {
              margin-left: 10px;
              width: 20px;
              height: 20px;
            }
          }
        }

        .balance-des {
          font-size: 16px;
          font-family: GothamRounded-Book, GothamRounded;
          font-weight: normal;
          color: rgba(255, 255, 255, 0.48);
          margin-top: 80px;
          display: flex;
          justify-content: center;
        }
      }

      .content-bottom-btns {
        display: flex;
        align-items: center;
        margin-top: 50px;
        .bottom-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 177px;
          height: 50px;
          background: #ffc763;
          border-radius: 25px;

          cursor: pointer;
          margin-right: 10px;
          .approve-text {
            width: 25px;
            height: 25px;
            border: 1px solid #2e0b00;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 16px;
            font-family: GothamRounded-Medium, GothamRounded;
            font-weight: 500;
            color: #2e0b00;
          }
          .img {
            display: flex;
            align-items: center;
            img {
              width: 20px;
              height: 20px;
            }
          }
          .text {
            margin-left: 8px;
            font-size: 16px;
            font-family: GothamRounded-Medium, GothamRounded;
            font-weight: 500;
            color: #2e0b00;
          }
        }
        .approve-line {
          width: 12px;
          height: 2px;
          background: #ffc763;
          margin-right: 10px;
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

