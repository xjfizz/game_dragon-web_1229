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
          <div class="dragon-img">
            <img
              class="egg-img"
              :src="dragonEggImgHandle(breedSonDragon.babyClazz)"
              alt=""
            />
          </div>
          <div class="dragon-img-bottom">
            <img
              src="@/assets/imgs/myMainland/breed/breed-dragon-bottom.png"
              alt=""
            />
          </div>
          <div class="dragon-no">
            <div
              class="color-wrap"
              :class="
                'top-color-status' + dragonLocalTypeList[breedSonDragon.babyClazz]
              "
            >
              # {{  breedSonDragon.babyNo}}
            </div>
          </div>
          <div class="dragon-no-des">Dragon #{{ breedSonDragon.babyNo }}</div>
          <div class="dragon-go" @click="goMainland">
            <div class="text">Go to My mainland</div>
            <div class="btn">
              <img src="@/assets/imgs/myMainland/breed/right.png" alt="" />
            </div>
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
    const { breedState, goMainland } = breedHandle();
    return {
      ...toRefs(breedState),
      ...toRefs(myDragonState),
      dragonEggImgHandle,
      goMainland,
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
      .dragon-img {
        margin-top: 80px;
        .egg-img {
          width: calc(602px * 0.4);
          height: calc(536px * 0.4);
        }
      }
      .dragon-img-bottom {
        margin-top: 10px;
        img {
          width: 106px;
          height: 22px;
        }
      }
      .dragon-no {
        margin-top: 47px;
        .color-wrap {
          width: 68px;
          height: 20px;
          background: #d58047;
          border-radius: 4px;
          font-size: 14px;
          font-family: GothamRounded-Medium, GothamRounded;
          font-weight: 500;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          white-space: nowrap;
        }
        .top-color-status1 {
          background: #d58047;
        }
        .top-color-status2 {
          background: #d5b32d;
        }
        .top-color-status3 {
          background: #44a3cf;
        }
        .top-color-status4 {
          background: #53b372;
        }
        .top-color-status5 {
          background: #926b59;
        }
      }
      .dragon-no-des {
        margin-top: 15px;
        font-size: 24px;
        font-family: GothamRounded-Medium, GothamRounded;
        font-weight: 500;
        color: #ffffff;
      }
      .dragon-go {
        margin-top: 73px;
        display: flex;
        align-items: center;
        cursor: pointer;
        .text {
          font-size: 20px;
          font-family: GothamRounded-Book, GothamRounded;
          font-weight: normal;
          color: #ffc763;
        }

        .btn {
          margin-top: 3px;
          img {
            width: 17px;
            height: 17px;
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

