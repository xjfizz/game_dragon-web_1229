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
          <div class="title">It’s WooHoo time！</div>
          <div class="love-main">
            <div class="love-main-wrap">
              <div class="left" id="dragonCreateLoveLeft">
                <div class="dragon-img">
                  <dragonCreate
                    ref="dragonCreateLove"
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
              <div class="mid" @click="breedLove" id="dragonCreateLoveMid">
                <img
                  class="move-img"
                  src="@/assets/imgs/myMainland/breed/heart.png"
                  alt=""
                />
              </div>
              <div class="right" id="dragonCreateLoveRight">
                <div class="dragon-img">
                  <dragonCreate
                    ref="dragonCreateLove"
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
            </div>
          </div>
          <div class="bottom-des">
            * Please don't refresh or close the page while breeding An egg will
            be delivered to you soon
          </div>
        </div>
        <!-- <div
          v-if="!loadingForm.loadingShow"
          class="close"
          @click="cancelBreedMain"
        >
          <img src="@/assets/imgs/openBox/img-code/close.png" alt="" />
        </div> -->
      </div>
    </div>
  </div>
</template>
 




<script>
import { reactive, toRefs, onMounted } from "vue";
import selectDragon from "@/views/pc/activity/use/dragon/selectDragon";
import myDragonDetail from "@/views/pc/myMainland/use/myDragonDetail";
import dragonCreate from "@/views/pc/myMainland/components/dragonCreate/indexCreateBreed.vue";
import breedHandle from "@/views/pc/myMainland/use/breed";
import myDragon from "@/views/pc/myMainland/use/myDragon";
export default {
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
    onMounted(() => {});
    const {
      dragonEggImgHandle,
      myDragonState,
      createDragon,
      createDragonPart,
      dragonClazzImgHandle,
    } = myDragon();
    const { breedState, goMainland, breedLove } = breedHandle();
    return {
      ...toRefs(breedState),
      ...toRefs(myDragonState),
      dragonEggImgHandle,
      goMainland,
      createDragon,
      breedLove,
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
        font-size: 28px;
        font-family: GothamRounded-Medium, GothamRounded;
        font-weight: 500;
        color: #ffffff;
      }
      .love-main {
        height: 200px;
        margin-top: 52px;
        display: flex;
        justify-content: center;
        .love-main-wrap {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 700px;
          height: 200px;
          position: relative;
          .left {
            position: absolute;
            left: 0;

            .dragon-img {
              width: 200px;
              height: 200px;
              transform: rotateY(180deg);
            }
          }
          .mid {
            position: absolute;
            left: 50%;
            transform: translate(-50%);
            img {
              width: 32px;
              height: 32px;
            }
          }
          .right {
            position: absolute;
            right: 0;
            .dragon-img {
              width: 200px;
              height: 200px;
            }
          }
        }
      }
      .bottom-des {
        margin-top: 139px;
        width: 557px;
        height: 60px;
        font-size: 20px;
        font-family: GothamRounded-Medium, GothamRounded;
        font-weight: 500;
        color: #ffffff;
        line-height: 30px;
        opacity: 0.48;
        text-align: center;
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
  .move-img {
    animation-name: scaleDraw; /*关键帧名称*/
    animation-timing-function: ease-in-out; /*动画的速度曲线*/
    animation-iteration-count: infinite; /*动画播放的次数*/
    animation-duration: 5s; /*动画所花费的时间*/
  }
  @keyframes scaleDraw {
    /*定义关键帧、scaleDrew是需要绑定到选择器的关键帧名称*/
    0% {
      transform: scale(1); /*开始为原始大小*/
    }
    25% {
      transform: scale(1.5); /*放大1.1倍*/
    }
    50% {
      transform: scale(1);
    }
    75% {
      transform: scale(1.5);
    }
  }
}
</style>

