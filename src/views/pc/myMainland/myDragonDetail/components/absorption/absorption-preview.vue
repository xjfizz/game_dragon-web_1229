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
          <div class="title">Congratulations ! !</div>
          <div class="top">
            Dragon #{{ dragonDetail.no }}'s {{absorbedType(takeInHistory[0].attributeType)}} value will increase by {{takeInHistory[0].attributeVal}}
            points.
          </div>
          <div class="mid">
            <div class="mid-wrap">
              <div class="status-item">
                <div class="status-top">Health</div>
                <div class="status-bottom">
                  <img
                    src="@/assets/imgs/myMainland/stats/heatthy.png"
                    alt=""
                  />
                  <div class="text">{{ dragonDetail.health }}</div>
                  <div
                    class="add-wrap"
                    v-if="takeInHistory[0].attributeType == 1"
                  >
                    <div class="add-wrap-img">
                      <img
                        src="@/assets/imgs/myMainland/stats/add.png"
                        alt=""
                      />
                    </div>
                    <div class="add-wrap-text">
                      + {{ takeInHistory[0].attributeVal }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="status-item">
                <div class="status-top">Attack</div>
                <div class="status-bottom">
                  <img src="@/assets/imgs/myMainland/stats/attack.png" alt="" />
                  <div class="text">{{ dragonDetail.attack }}</div>
                  <div
                    class="add-wrap"
                    v-if="takeInHistory[0].attributeType == 2"
                  >
                    <div class="add-wrap-img">
                      <img
                        src="@/assets/imgs/myMainland/stats/add.png"
                        alt=""
                      />
                    </div>
                    <div class="add-wrap-text">
                      + {{ takeInHistory[0].attributeVal }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="status-item">
                <div class="status-top">Defense</div>
                <div class="status-bottom">
                  <img
                    src="@/assets/imgs/myMainland/stats/defense.png"
                    alt=""
                  />
                  <div class="text">{{ dragonDetail.defend }}</div>
                  <div
                    class="add-wrap"
                    v-if="takeInHistory[0].attributeType == 3"
                  >
                    <div class="add-wrap-img">
                      <img
                        src="@/assets/imgs/myMainland/stats/add.png"
                        alt=""
                      />
                    </div>
                    <div class="add-wrap-text">
                      + {{ takeInHistory[0].attributeVal }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="status-item">
                <div class="status-top">Speed</div>
                <div class="status-bottom">
                  <img src="@/assets/imgs/myMainland/stats/speed.png" alt="" />
                  <div class="text">{{ dragonDetail.speed }}</div>
                  <div
                    class="add-wrap"
                    v-if="takeInHistory[0].attributeType == 4"
                  >
                    <div class="add-wrap-img">
                      <img
                        src="@/assets/imgs/myMainland/stats/add.png"
                        alt=""
                      />
                    </div>
                    <div class="add-wrap-text">
                      + {{ takeInHistory[0].attributeVal }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="status-item">
                <div class="status-top">LifeForce</div>
                <div class="status-bottom">
                  <img src="@/assets/imgs/myMainland/stats/spirit.png" alt="" />
                  <div class="text">{{ dragonDetail.intellect }}</div>
                  <div
                    class="add-wrap"
                    v-if="takeInHistory[0].attributeType == 5"
                  >
                    <div class="add-wrap-img">
                      <img
                        src="@/assets/imgs/myMainland/stats/add.png"
                        alt=""
                      />
                    </div>
                    <div class="add-wrap-text">
                      + {{ takeInHistory[0].attributeVal }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
          <div class="bottom">
            <div class="btns">
              <div class="sure-btn select-hover" @click="surePreviewAbsorb">
                Get it ！
              </div>
              <div class="cancel-btn select-hover" @click="cancelPreview">
                Don't Want This Bonus Point
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="!loadingForm.loadingShow"
          class="close"
          @click="closePreview"
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
      approve,
      approveSkull,
      selectAbsorptionItem,
      cancelAbsorptionMain,
      startCreateAbsorption,
      surePreviewAbsorb,
      cancelPreview,
      closePreview,
      absorbedType,
    } = absorptionHandle();
    return {
      ...toRefs(state),
      ...toRefs(myDragonDetailState),
      ...toRefs(absorptionState),
      approve,
      approveSkull,
      selectAbsorptionItem,
      cancelAbsorptionMain,
      startCreateAbsorption,
      dragonClazzImgHandle,
      dragonLocalTypeName,
      createDragonSkullsLevel,
      surePreviewAbsorb,
      cancelPreview,
      closePreview,
      absorbedType,
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
      .title {
        margin-top: 32px;
        font-size: 24px;
        font-family: GothamRounded-Medium, GothamRounded;
        font-weight: 500;
        color: #ffffff;
      }
      .top {
        width: 712px;
        margin-top: 40px;
        font-size: 14px;
        font-family: GothamRounded-Medium, GothamRounded;
        font-weight: 500;
        color: #ffffff;
      }
      .mid {
        margin-top: 16px;
        width: 712px;
        height: 91px;
        background: #1a1716;
        border-radius: 8px;
        border: 1px solid rgba(255, 255, 255, 0.12);
        .mid-wrap {
          padding: 24px 32px;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          .status-item {
            .status-top {
              font-size: 16px;
              font-family: GothamRounded-Book, GothamRounded;
              font-weight: normal;
              color: #ffffff;
              opacity: 0.48;
            }
            .status-bottom {
              display: flex;
              align-items: center;
              margin-top: 8px;
              img {
                width: 20px;
                height: 20px;
              }
              .text {
                margin-left: 8px;
                font-size: 14px;
                font-family: GothamRounded-Medium, GothamRounded;
                font-weight: 500;
                color: #ffffff;
              }
              .add-wrap {
                display: flex;
                align-items: center;
                margin-left: 7px;
                .add-wrap-img {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  img {
                    width: 20px;
                    height: 20px;
                  }
                }
                .add-wrap-text {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  font-size: 14px;
                  font-family: GothamRounded-Medium, GothamRounded;
                  font-weight: 500;
                  color: #53b372;
                }
              }
            }
          }
        }
      }
      .mid-des {
        margin-top: 24px;
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
      .bottom {
        margin-top: 61px;
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
            margin-top: 24px;
            width: 296px;
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

