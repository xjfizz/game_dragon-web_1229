<template>
  <div
    class="dmp-withDrawDmp-main-bottom"
    v-loading="skullCreateProgressShow"
    element-loading-text="Synthesising in progress..."
    element-loading-spinner="el-icon-loading"
  >
    <div class="wrap">
      <div class="bottom-title">Please Select A Type Of The Skull</div>
      <div class="menu-wrap">
        <div
          class="menu-item select-hover"
          :class="menuItem == 2 ? 'menu-item-selected' : ''"
          @click="selectMenuItem(2)"
        >
          Medium level
        </div>
        <div
          class="menu-item select-hover"
          :class="menuItem == 1 ? 'menu-item-selected' : ''"
          @click="selectMenuItem(1)"
        >
          Low level
        </div>
      </div>
      <div
        class="wrap-contant"
        v-loading="loadingForm.loadingShow"
        :element-loading-text="loadingForm.loadingShowText"
        element-loading-spinner="el-icon-loading"
      >
        <div class="level1">
          <div class="item-content" v-if="dragonSkullList.length > 0">
            <div
              class="item"
              v-for="(item, index) in dragonSkullList"
              :key="index"
            >
              <div class="item-mid">
                <div class="mid-top">
                  <div class="top-left">
                    <img :src="dragonClazzImgHandle(item.clazz)" alt="" />
                  </div>
                  <div class="top-mid">
                    <img
                      src="../../../../../assets/imgs/myMainland/skullCreate/point.png"
                      alt=""
                    />
                  </div>
                  <div class="top-right">
                    {{ createDragonSkullsLevel(item.level) }} level
                  </div>
                </div>
                <div class="mid-img">
                  <div class="mid-img-bc">
                    <img :src="dragonClazzImgBcHandle(item.clazz)" alt="" />
                  </div>
                  <div class="mid-img-skull">
                    <img :src="dragonSkullsImgHandle(item.level)" alt="" />
                  </div>
                </div>
                <div class="mid-bottom">X {{ item.usable }}</div>
              </div>
              <div class="item-bottom">
                <div v-if="item.selected" class="btn1">
                  <img
                    src="../../../../../assets/imgs/myMainland/skullCreate/selected.png"
                    alt=""
                  />
                  <div class="text">Selected</div>
                </div>
                <div
                  v-if="!item.selected && item.usable >= 5"
                  class="btn2"
                  @click="selectSkullItem(item, 1)"
                >
                  <img
                    src="../../../../../assets/imgs/myMainland/skullCreate/add.png"
                    alt=""
                  />
                  <div class="text">Selected</div>
                </div>

                <div v-if="!item.selected && item.usable < 5" class="btn3">
                  <div class="text">Not eligible for synthesis</div>
                </div>
              </div>
            </div>
          </div>
          <div class="item-content-no" v-else>
            <div class="no-data">No data</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, toRefs } from "vue";
import { useRouter } from "vue-router";
import Header from "@/components/HeaderMarketPlace";
import common from "@/utils/common";
import skullCreateHandle from "@/views/pc/myMainland/use/skullCreate";
import myDragon from "@/views/pc/myMainland/use/myDragon";
export default {
  name: "withdrawalDmp",
  components: {
    Header,
  },
  setup() {
    const router = useRouter();
    const state = reactive({});
    const {
      createDragonPart,
      dragonClazzImgHandle,
      createDragonSkullsLevel,
      dragonSkullsImgHandle,
    } = myDragon();
    const {
      back,
      skullCreateState,
      selectMenuItem,
      dragonClazzImgBcHandle,
      selectSkullItem,
    } = skullCreateHandle();
    onMounted(() => {
      common.goTopScroll();
      // init();
    });

    return {
      ...toRefs(state),
      ...toRefs(skullCreateState),
      back,
      dragonClazzImgHandle,
      selectMenuItem,
      createDragonSkullsLevel,
      dragonClazzImgBcHandle,
      dragonSkullsImgHandle,
      selectSkullItem,
    };
  },
};
</script>

<style lang="less" scoped >
.dmp-withDrawDmp-main-bottom {
  margin-top: 40px;

  .wrap {
    // display: flex;
    // flex-direction: column;
    // align-items: center;
    .bottom-title {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 28px;
      font-family: WendyOne-Regular, WendyOne;
      font-weight: 400;
      color: #ffffff;
    }
    .menu-wrap {
      margin-top: 25px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-bottom: 1px solid rgba(255, 255, 255, 0.12);
      .menu-item-selected {
        border-bottom: 1px solid rgba(255, 199, 99, 1) !important;
      }
      .menu-item {
        font-size: 16px;
        font-family: GothamRounded-Medium, GothamRounded;
        font-weight: 500;
        color: rgba(255, 255, 255, 0.48);
        margin-right: 70px;
        height: 25px;
        min-width: 130px;
        border-bottom: 1px solid rgba(255, 199, 99, 0);
        display: flex;
        justify-content: center;
        cursor: pointer;
      }
      .menu-item:last-child {
        margin-right: 0;
      }
    }
    .wrap-contant {
      margin-top: 16px;

      .level1 {
        .item-content {
          display: flex;
          // justify-content: space-between;
          .item:last-child {
            margin-right: 0;
          }
          .item {
            width: calc(186px);
            height: calc(242px);
            background-repeat: no-repeat;
            background-size: cover;
            background-image: url("../../../../../assets/imgs/myMainland/skullCreate/item-bc.png");
            // padding: 30px;
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-right: 68px;
            // cursor: pointer;

            .item-mid {
              margin-top: 16px;
              width: 156px;
              height: 157px;
              background-color: rgba(46, 11, 0, 1);
              display: flex;
              flex-direction: column;
              align-items: center;
              .mid-top {
                display: flex;
                align-items: center;
                margin-top: 10px;
                .top-left {
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  img {
                    width: 16px;
                    height: 16px;
                  }
                }
                .top-mid {
                  margin-left: 8px;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  img {
                    width: 4px;
                    height: 4px;
                  }
                }
                .top-right {
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  margin-left: 8px;
                  font-size: 12px;
                  font-family: GothamRounded-Book, GothamRounded;
                  font-weight: normal;
                  color: #ffffff;
                }
              }
              .mid-img {
                margin-top: 2px;
                width: calc(124px);
                height: calc(108px);
                // background-repeat: no-repeat;
                // background-size: cover;
                // background-image: url("../../../../../assets/imgs/myMainland/skullCreate/item-bc.png");
                position: relative;
                .mid-img-bc {
                  position: absolute;
                  left: 50%;
                  top: 50%;
                  transform: translate(-50%, -50%);
                  width: calc(124px);
                  height: calc(108px);
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  img {
                    width: calc(124px * 1.1);
                    height: calc(108px * 1.1);
                  }
                }
                .mid-img-skull {
                  width: calc(154px * 0.8);
                  height: calc(154px * 0.8);
                  position: absolute;
                  left: 50%;
                  top: 50%;
                  transform: translate(-50%, -50%);
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  img {
                    width: calc(154px * 0.8);
                    height: calc(154px * 0.8);
                  }
                }
              }
              .mid-bottom {
                margin-top: -3px;
                font-size: 11px;
                font-family: GothamRounded-Book, GothamRounded;
                font-weight: normal;
                color: rgba(255, 255, 255, 0.83);
              }
            }
            .item-bottom {
              margin-top: 16px;
              .btn1 {
                width: 120px;
                height: 40px;
                border-radius: 25px;
                border: 1px solid #2e0b00;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                img {
                  width: 20px;
                  height: 20px;
                }
                .text {
                  margin-left: 5px;
                  font-size: 16px;
                  font-family: GothamRounded-Medium, GothamRounded;
                  font-weight: 500;
                  color: #2e0b00;
                }
              }
              .btn2 {
                width: 120px;
                height: 40px;
                border-radius: 25px;
                background: #ffc763;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                img {
                  width: 10px;
                  height: 10px;
                }
                .text {
                  margin-left: 5px;
                  font-size: 16px;
                  font-family: GothamRounded-Medium, GothamRounded;
                  font-weight: 500;
                  color: #2e0b00;
                }
              }
              .btn3 {
                // margin-top: 15px;
                font-size: 13px;
                font-family: GothamRounded-Book, GothamRounded;
                font-weight: normal;
                color: rgba(46, 11, 0, 0.63);
                display: flex;
                justify-content: center;
                align-items: center;
                height: 40px;
                .text {
                  // width: 150px;
                  text-align: center;
                  // overflow: hidden;
                  // text-overflow: ellipsis;
                  // white-space: nowrap;
                }
              }
            }
          }
        }
        .item-content-no {
          display: flex;
          justify-content: center;
          min-height: 250px;
          .no-data {
            margin-top: 50px;
            font-size: 16px;
            font-family: GothamRounded-Book, GothamRounded;
            font-weight: normal;
            color: rgba(255, 255, 255, 0.83);
          }
        }
      }
    }
  }
}
</style>
