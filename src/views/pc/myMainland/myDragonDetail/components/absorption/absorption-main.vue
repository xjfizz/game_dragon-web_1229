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
          <div class="title">Select skull for absorption</div>
          <div class="content-top">
            <div class="content-top-left">
              <div class="des-item">
                <div class="des-item-point">*</div>
                1. Absorption consumes only one skull at a time
              </div>
              <div class="des-item">
                2. Absorb skull randomly to get different ability growth
              </div>
              <div class="des-item">
                3. Each dragon can only get 3 ability bonuses
              </div>
            </div>
            <div class="content-top-right">
              <div class="absorptionTime">
                <div class="absorptionTime-title">Remaining times:</div>
                <div class="absorptionTime-value">
                  {{ absorptionTime || 0 }}
                </div>
              </div>
            </div>
          </div>
          <div class="content-mid">
            <div class="mid-wrap">
              <skullsItem
                v-for="(item, index) in dragonSkullList"
                :key="index"
                :item="item"
                status="2"
                @click="selectAbsorptionItem(item)"
              ></skullsItem>
            </div>
          </div>
          <div class="content-bottom">
            <div
              class="bottom-wrap1"
              v-if="absorptionTime < 3 && skullAbleTotal > 0"
            >
              <div class="bottom-wrap-top">
                <div class="btn-des" v-if="localSelectSkull">
                  <div class="btn-des-title">Required:</div>
                  <div class="btn-des-value">
                    <div class="price1">
                      <div class="value">{{ requirePrice.dmp }}</div>

                      <img
                        src="@/assets/imgs/myMainland/skullCreate/dmp.png"
                        alt=""
                      />
                    </div>
                    <div class="price-add">+</div>
                    <div class="price2">
                      <div class="value">{{ requirePrice.dms }}</div>

                      <img
                        src="@/assets/imgs/myMainland/skullCreate/dms.png"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div class="bottom-wrap-mid">
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
                      approveForm.dmp.isApprove &&
                      approveForm.dms.isApprove &&
                      !approveForm.skull.isApprove
                        ? ''
                        : 'no-data'
                    "
                    @click="approveSkull(3)"
                  >
                    <div
                      v-if="!approveForm.skull.isApprove"
                      class="approve-text"
                    >
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
                      wallet.dms >= requirePrice.dms &&
                      localSelectSkull
                        ? ''
                        : 'no-data'
                    "
                    @click="startCreateAbsorption"
                  >
                    <div class="img">
                      <!-- <img
                  src="@/assets/imgs/myMainland/breed/breed-love.png"
                  alt=""
                /> -->
                    </div>
                    <div class="text">Absorption Now</div>
                  </div>
                </div>

                <div class="balance-des" v-if="wallet.dmp < requirePrice.dmp">
                  * Not enough! You only have {{ wallet.dmp }} DMP left in
                  wallet.
                </div>
                <div
                  class="balance-des"
                  v-if="
                    wallet.dmp > requirePrice.dmp &&
                    wallet.dms < requirePrice.dms
                  "
                >
                  * Not enough! You only have {{ wallet.dms }} DMS left in
                  wallet.
                </div>
              </div>
            </div>
            <div v-if="absorptionTime >= 3" class="bottom-wrap2">
              <div class="text">
                This dragon has run out of absorption times.
              </div>
            </div>
            <div
              v-if="absorptionTime < 3 && skullAbleTotal <= 0"
              class="bottom-wrap3"
            >
              <div class="text">* You have no skull.</div>
            </div>
          </div>
        </div>
        <div
          v-if="!loadingForm.loadingShow"
          class="close"
          @click="cancelAbsorptionMain"
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
    const { dragonClazzImgHandle } = myDragon();
    const { myDragonDetailState } = myDragonDetail();
    const {
      absorptionState,
      approve,
      approveSkull,
      selectAbsorptionItem,
      cancelAbsorptionMain,
      startCreateAbsorption,
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
  width: 950px;
  height: 750px;
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
      .content-top {
        margin-top: 27px;
        width: 750px;
        display: flex;
        justify-content: space-between;
        .content-top-left {
          //  display: flex;
          // align-items: center;
          .des-item {
            margin-bottom: 10px;
            font-size: 14px;
            font-family: GothamRounded-Book, GothamRounded;
            font-weight: normal;
            color: rgba(255, 255, 255, 0.48);
            display: flex;
            align-items: center;
            position: relative;
            .des-item-point {
              position: absolute;
              left: -10px;
            }
          }
        }
        .content-top-right {
          display: flex;
          align-items: center;
          .absorptionTime {
            font-size: 16px;
            font-family: GothamRounded-Book, GothamRounded;
            font-weight: normal;
            color: #ffffff;
            display: flex;
            align-items: center;
            .absorptionTime-title {
            }
            .absorptionTime-value {
              margin-left: 10px;
            }
          }
        }
      }
      .content-mid {
        margin-top: 24px;
        width: 750px;
        min-height: 310px;
        .mid-wrap {
          display: flex;
          justify-content: space-between;
        }
      }
      .content-bottom {
        margin-top: 50px;
        .bottom-wrap1 {
          .bottom-wrap-top {
            height: 20px;

            .btn-des {
              display: flex;
              align-items: center;
              justify-content: center;
              .btn-des-title {
                font-size: 16px;
                font-family: GothamRounded-Book, GothamRounded;
                font-weight: normal;
                color: rgba(255, 255, 255, 0.48);
              }
              .btn-des-value {
                margin-left: 8px;
                display: flex;
                align-items: center;
                .price1 {
                  display: flex;
                  align-items: center;
                  .value {
                    font-size: 15px;
                    font-family: GothamRounded-Medium, GothamRounded;
                    font-weight: 500;
                    color: #ffffff;
                  }
                  img {
                    margin-left: 4px;
                    width: 20px;
                    height: 20px;
                  }
                }
                .price-add {
                  margin-left: 8px;
                  font-size: 16px;
                  font-family: GothamRounded-Book, GothamRounded;
                  font-weight: normal;
                  color: #ffffff;
                }
                .price2 {
                  display: flex;
                  align-items: center;
                  margin-left: 8px;
                  .value {
                    font-size: 15px;
                    font-family: GothamRounded-Medium, GothamRounded;
                    font-weight: 500;
                    color: #ffffff;
                  }
                  img {
                    margin-left: 8px;
                    width: 20px;
                    height: 20px;
                  }
                }
              }
            }
          }
          .bottom-wrap-mid {
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

            .balance-des {
              font-size: 16px;
              font-family: GothamRounded-Book, GothamRounded;
              font-weight: normal;
              color: #ff5151;
              margin-top: 30px;
              display: flex;
              justify-content: center;
            }
          }
        }
        .bottom-wrap2 {
          .text {
            margin-top: 70px;
            font-size: 16px;
            font-family: GothamRounded-Medium, GothamRounded;
            font-weight: 500;
            color: #f54a45;
          }
        }
        .bottom-wrap3 {
          .text {
            margin-top: 70px;
            font-size: 16px;
            font-family: GothamRounded-Medium, GothamRounded;
            font-weight: 500;
            color: #282523;
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

