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
          <div class="title">Dragon Devouring</div>
          <div class="content-wrap">
            <div class="left">
              <div class="devouring-dragon">
                <div class="dragon-create-wrap">
                  <dragonCreate
                    ref="dragonCreatedevouring"
                    :dragonImgEye="
                      createDragon(dragonDetailList.leftDragonDetail.parts[0])
                    "
                    :dragonImgWing="
                      createDragon(dragonDetailList.leftDragonDetail.parts[4])
                    "
                    :dragonImgHorn="
                      createDragon(dragonDetailList.leftDragonDetail.parts[2])
                    "
                    :dragonImgBody="
                      createDragon(dragonDetailList.leftDragonDetail.parts[6])
                    "
                    :dragonImgTotems="
                      createDragon(dragonDetailList.leftDragonDetail.parts[1])
                    "
                    :dragonImgEar="
                      createDragon(dragonDetailList.leftDragonDetail.parts[3])
                    "
                    :dragonImgTail="
                      createDragon(dragonDetailList.leftDragonDetail.parts[5])
                    "
                  ></dragonCreate>
                </div>
              </div>
              <div class="change-dragon-btn">
                <!-- <div class="btn hover-select" @click="changeDragon(1)">
                  change
                </div> -->
              </div>
              <div class="devouring-text">
                devouring count: 
                {{ dragonDetailList.leftDragonDetail.devouringCount || 0 }}/12
              </div>
              <div class="devouring-num">
                # {{ dragonDetailList.leftDragonDetail.no }}
              </div>
            </div>
            <div class="mid">
              <div class="mid-wrap">
                <div class="mid-dmp-img">
                  <img src="@/assets/imgs/myMainland/devouring/DMP.png" alt="" />
                </div>
                <div class="mid-dmp-num">
                  <div class="des">DMP Required:</div>
                  <div class="value require-sty">
                    {{ common.formatValue(devouringDragonSelectInfo.costDmp, 1)  || 0 }} DMP
                  </div>
                </div>
                <div class="mid-dmp-num">
                  <div class="des">DMP in wallet:</div>
                  <div class="value">{{ wallet.dmp }} DMP</div>
                </div>
              </div>
            </div>
            <div class="right" v-if="!!dragonDetailList.rightDragonDetail">
              <div class="devouring-dragon">
                <div class="dragon-create-wrap">
                  <dragonCreate
                    ref="dragonCreatedevouring"
                    :dragonImgEye="
                      createDragon(dragonDetailList.rightDragonDetail.parts[0])
                    "
                    :dragonImgWing="
                      createDragon(dragonDetailList.rightDragonDetail.parts[4])
                    "
                    :dragonImgHorn="
                      createDragon(dragonDetailList.rightDragonDetail.parts[2])
                    "
                    :dragonImgBody="
                      createDragon(dragonDetailList.rightDragonDetail.parts[6])
                    "
                    :dragonImgTotems="
                      createDragon(dragonDetailList.rightDragonDetail.parts[1])
                    "
                    :dragonImgEar="
                      createDragon(dragonDetailList.rightDragonDetail.parts[3])
                    "
                    :dragonImgTail="
                      createDragon(dragonDetailList.rightDragonDetail.parts[5])
                    "
                  ></dragonCreate>
                </div>
              </div>
              <div class="change-dragon-btn">
                <div class="btn hover-select" @click="changeDragon(2)">
                  change
                </div>
              </div>
              <div class="devouring-text">
                devouring count: 
                {{ dragonDetailList.rightDragonDetail.devouringCount || 0 }}/12
              </div>
              <div class="devouring-num">
                # {{ dragonDetailList.rightDragonDetail.no }}
              </div>
            </div>
            <div class="right" v-else>
              <div class="devouring-dragon-no" @click="changeDragon(2)">
                <div class="dragon-create-wrap-no">
                  <img
                    src="@/assets/imgs/myMainland/devouring/dragon-bc.png"
                    alt=""
                  />
                </div>
              </div>
              <div class="change-dragon-btn-no-text">Select your Dragon</div>
            </div>
          </div>
          <div class="content-bottom">
            <div class="bottom-des">
              <div class="bottom-des-title">Devouring Fee:</div>
              <div class="value">
                {{ common.formatValue(devouringDragonSelectInfo.costDms, 1) || 0 }}
                <!-- / {{wallet.dms || 0}} -->
              </div>
              <div class="img">
                <img src="@/assets/imgs/myMainland/devouring/DMS.png" alt="" />
              </div>
            </div>
            <div class="content-bottom-btns">
              <!-- approveForm -->
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
                      approveForm.dmp.isApprove &&
                      approveForm.dms.isApprove &&
                      !approveForm.dragon.isApprove
                        ? ''
                        : 'no-data'
                    "
                    @click="approveDragon(3)"
                  >
                    <div
                      v-if="!approveForm.dragon.isApprove"
                      class="approve-text"
                    >
                      3
                    </div>
                    <div v-if="approveForm.dragon.isApprove" class="img">
                      <img
                        src="@/assets/imgs/myMainland/breed/breed-approve.png"
                        alt=""
                      />
                    </div>
                    <div class="text">Approve DMT</div>
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
                      approveForm.dragon.isApprove &&
                      wallet.dmp >= requirePrice.dmp &&
                      wallet.dms >= requirePrice.dms &&
                      dragonDetailList.rightDragonDetail
                        ? ''
                        : 'no-data'
                    "
                    @click="devouringDragons"
                  >
                    <div class="img">
                      <!-- <img
                  src="@/assets/imgs/myMainland/breed/breed-love.png"
                  alt=""
                /> -->
                    </div>
                    <div class="text">Devour Now</div>
                  </div>
            </div>
          </div>

          <div class="devouring-check">
           
            <div v-if="wallet.dmp < devouringDragonSelectInfo.costDmp" class="devouring-tips2" @click="goWallet">
              <div class="devouring-tips2-text">
                * Not enough! You only have {{wallet.dmp}} DMP left in the wallet.
              </div>
              <div class="devouring-tips2-btn-text">Go to view</div>
              <div class="devouring-tips2-btn">
                <img src="@/assets/imgs/myMainland/devouring/right.png" alt="" />
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="!loadingForm.loadingShow"
          class="close"
          @click="canceldevouringMain"
        >
          <img src="@/assets/imgs/openBox/img-code/close.png" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>
 




<script>
import { reactive, toRefs, onMounted } from "vue";
import selectDragon from "@/views/pc/activity/use/dragon/selectDragon";
import myDragonDetail from "@/views/pc/myMainland/use/myDragonDetail";
import dragonCreate from "@/views/pc/myMainland/components/dragonCreate/indexCreateDevouring.vue";
import devouringHandle from "@/views/pc/myMainland/use/devouring";
import myDragon from "@/views/pc/myMainland/use/myDragon";
import common from "@/utils/common";
export default {
  name: "sendDragon",
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
    onMounted(() => {
      myDragonDetailState.sendForm.walletAddress = "";
    });
    const { dragonClazzImgHandle, createDragon } = myDragon();
    const { myDragonDetailState, closeBox, confirm } = myDragonDetail();
    const {
      devouringState,
      canceldevouringMain,
      changeDragon,
      approve,
      approveDragon,
      devouringDragons,
      goWallet,
    } = devouringHandle();
    return {
      ...toRefs(state),
      ...toRefs(myDragonDetailState),
      ...toRefs(devouringState),
      closeBox,
      confirm,
      createDragon,
      canceldevouringMain,
      changeDragon,
       approve,
      approveDragon,
      devouringDragons,
      goWallet,
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
  width: 1080px;
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
        margin-top: 32px;
        font-size: 24px;
        font-family: GothamRounded-Medium, GothamRounded;
        font-weight: 500;
        color: #ffffff;
      }
      .content-wrap {
        display: flex;
        justify-content: center;
        margin-top: 73px;

        .left {
          display: flex;
          flex-direction: column;
          align-items: center;
          .devouring-dragon {
            width: 197px;
            height: 197px;
            .dragon-create-wrap {
              transform: rotateY(180deg);
            }
          }
          .change-dragon-btn {
            margin-top: 9px;
            .btn {
              width: 108px;
              height: 32px;
              border-radius: 25px;
              border: 1px solid #ffc763;
              font-size: 16px;
              font-family: GothamRounded-Medium, GothamRounded;
              font-weight: 500;
              color: #ffc763;
              display: flex;
              justify-content: center;
              align-items: center;
              cursor: pointer;
            }
          }
          .devouring-text {
            margin-top: 16px;
            font-size: 14px;
            font-family: GothamRounded-Book;
            color: #ffffff;
            opacity: 0.48;
          }
          .devouring-num {
            margin-top: 11px;
            font-size: 14px;
            font-family: GothamRounded-Book;
            color: #ffffff;
            opacity: 0.48;
          }
        }

        .mid {
          width: 424px;
          height: 323px;
          background-repeat: no-repeat;
          background-size: cover;
          background-image: url("../../../../../../assets/imgs/myMainland/devouring/devouring-mid-bc.png");
          display: flex;
          justify-content: center;
          .mid-wrap {
            display: flex;
            justify-content: center;
            align-items: center;
            //  justify-content: flex-start;
            flex-direction: column;
            width: 250px;
            height: 185px;
            .mid-dmp-img {
              margin-bottom: 19px;
              img {
                width: 52px;
                height: 68px;
              }
            }
            .mid-dmp-num {
              margin-bottom: 8px;
              display: flex;
              align-items: flex-start;
              justify-content: space-between;
              width: 90%;
              .des {
                font-size: 14px;
                font-family: GothamRounded-Book, GothamRounded;
                font-weight: normal;
                color: #ffffff;
                opacity: 0.48;
                width: 120px;
              }
              .value {
                width: 100px;
                margin-left: 10px;
                font-size: 14px;
                font-family: GothamRounded-Medium, GothamRounded;
                font-weight: 500;
                color: #ffffff;
                // word-wrap: break-word;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
              .require-sty {
                font-size: 14px;
                font-family: GothamRounded-Medium, GothamRounded;
                font-weight: 500;
                color: #ff6fff;
              }
            }
          }
        }
        .right {
          display: flex;
          flex-direction: column;
          align-items: center;
          .devouring-dragon {
            width: 197px;
            height: 197px;
            .dragon-create-wrap {
              //   transform: rotateY(180deg);
            }
            .dragon-create-wrap-no {
              img {
                width: 198px;
                height: 198px;
              }
            }
          }
          .devouring-dragon-no {
            width: 197px;
            height: 197px;
            cursor: pointer;
            .dragon-create-wrap-no {
              img {
                width: 198px;
                height: 198px;
              }
            }
          }
          .change-dragon-btn-no-text {
            cursor: pointer;
            margin-top: 9px;
            font-size: 14px;
            font-family: GothamRounded-Book, GothamRounded;
            font-weight: normal;
            color: #ffc763;
          }
          .change-dragon-btn {
            margin-top: 9px;
            .btn {
              width: 108px;
              height: 32px;
              border-radius: 25px;
              border: 1px solid #ffc763;
              font-size: 16px;
              font-family: GothamRounded-Medium, GothamRounded;
              font-weight: 500;
              color: #ffc763;
              display: flex;
              justify-content: center;
              align-items: center;
              cursor: pointer;
            }
          }
          .devouring-text {
            margin-top: 16px;
            font-size: 14px;
            font-family: GothamRounded-Book;
            color: #ffffff;
            opacity: 0.48;
          }
          .devouring-num {
            margin-top: 11px;
            font-size: 14px;
            font-family: GothamRounded-Book;
            color: #ffffff;
            opacity: 0.48;
          }
        }
      }

      .content-bottom {
        margin-top: 50px;
        .bottom-des {
          display: flex;
          align-items: center;
          justify-content: center;
          .bottom-des-title {
            font-size: 14px;
            font-family: GothamRounded-Book, GothamRounded;
            font-weight: normal;
            color: #ffffff;
          }
          .value {
            margin-left: 10px;
            font-size: 16px;
            font-family: GothamRounded-Medium, GothamRounded;
            font-weight: 500;
            color: #ffffff;
          }
          .img {
            margin-left: 10px;
            img {
              width: 20px;
              height: 19px;
            }
          }
        }
        .content-bottom-btns {
          display: flex;
          align-items: center;
          margin-top: 11px;
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
      .devouring-check {
        margin-top: 24px;
        .devouring-tips1 {
          font-size: 16px;
          font-family: GothamRounded-Medium, GothamRounded;
          font-weight: 500;
          color: #ff5151;
        }
        .devouring-tips2 {
          display: flex;
          align-items: center;
          .devouring-tips2-text {
            font-size: 16px;
            font-family: GothamRounded-Medium, GothamRounded;
            font-weight: 500;
            color: #ffffff;
            opacity: 0.48;
          }
          .devouring-tips2-btn-text {
            height: 14px;
            font-size: 14px;
            font-family: GothamRounded-Book, GothamRounded;
            font-weight: normal;
            color: #ffc763;
            line-height: 17px;
            margin-left: 11px;
            cursor: pointer;
          }
          .devouring-tips2-btn {
            display: flex;
            align-items: flex-end;
            margin-left: 15x;
            cursor: pointer;
            img {
              margin-top: 4px;
              width: 17px;
              height: 16px;
            }
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

