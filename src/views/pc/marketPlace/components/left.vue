<template>
  <div class="main" @click="testin($event)">
    <div class="top">
      <div class="top-title">
        <div class="top-title-left">Filter ({{ filterNum }})</div>
        <div class="top-title-right" @click="clearFilter()">Clear filter</div>
      </div>
      <div class="top-select" v-show="menuItem == 1" ref="searchContainer">
        <div class="top-item-list">
          <div
            class="top-item"
            :class="filterSelectItem == 1 ? 'top-item-select' : ''"
            @click="selectFilterItem(1)"
          >
            General
          </div>
          <div
            class="top-item"
            :class="filterSelectItem == 2 ? 'top-item-select' : ''"
            @click="selectFilterItem(2)"
          >
            Parts
          </div>
          <div
            class="top-item"
            :class="filterSelectItem == 3 ? 'top-item-select' : ''"
            @click="selectFilterItem(3)"
          >
            Stats
          </div>
        </div>
      </div>
    </div>
    <div class="content" v-show="menuItem == 1">
      <div class="general" v-show="filterSelectItem == 1">
        <div class="content-item-class">
          <div class="item-title">CLASS</div>
          <div class="item-wrap">
            <div
              class="item"
              v-for="(item, index) in classList"
              :key="index"
              @click.stop="selectClass(item)"
            >
              <div class="select">
                <img
                  v-if="!item.selected"
                  src="@/assets/imgs/marketplace/class/no-selected.png"
                />
                <img
                  v-else
                  src="@/assets/imgs/marketplace/class/selected.png"
                />
              </div>
              <div class="goods">
                <div class="goods-icon">
                  <img :src="item.icon" />
                </div>
                <div class="goods-text">
                  {{ item.text }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="content-item-stage">
          <div class="item-title">STAGE</div>
          <div class="item-wrap">
            <div
              class="item"
              v-for="(item, index) in stageList"
              :key="index"
              @click.stop="selectStage(item)"
            >
              <div class="select">
                <img
                  v-if="!item.selected"
                  src="@/assets/imgs/marketplace/class/no-selected.png"
                />
                <img
                  v-else
                  src="@/assets/imgs/marketplace/class/selected.png"
                />
              </div>
              <div class="goods">
                <div class="goods-text">
                  {{ item.text }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="content-item-stage">
          <div class="item-title">STATUS</div>
          <div class="item-wrap">
            <div
              class="item"
              v-for="(item, index) in saleList"
              :key="index"
              @click.stop="selectSale(item)"
            >
              <div class="select">
                <img
                  v-if="!item.selected"
                  src="@/assets/imgs/marketplace/class/no-selected.png"
                />
                <img
                  v-else
                  src="@/assets/imgs/marketplace/class/selected.png"
                />
              </div>
              <div class="goods">
                <div class="goods-text">
                  {{ item.text }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="content-breed">
          <div class="item-title">BREED COUNT</div>
          <div class="item-wrap">
            <div class="item-slider">
              <el-slider
                class="slider"
                v-model="breedCountArr"
                range
                @change="onChangeBreed"
                :max="7"
              ></el-slider>
            </div>
            <div class="item-slider-value">
              <div>0</div>
              <div>7</div>
            </div>
          </div>
        </div>

        <div class="content-ce">
          <div class="item-title">CE</div>

          <!-- <div class="item-title-des">CE 1 - CE 1000</div> -->
          <div class="item-wrap">
            <div class="item-slider">
              <el-slider
                class="slider"
                v-model="ceValue"
                :min="26702"
                :max="49008"
                range
                @change="onChangeCe"
              ></el-slider>
            </div>
            <div class="item-slider-value">
              <span>26702</span>
              <span>49008+</span>
            </div>
          </div>
        </div>
        <!-- <div class="content-item-class content-item-stage">
          <div class="item-title">CE</div>
          <div class="item-wrap">
            <div
              class="item"
              v-for="(item, index) in ceList"
              :key="index"
              @click.stop="selectClass(item)"
            >
              <div class="select">
                <img
                  v-if="!item.selected"
                  src="@/assets/imgs/marketplace/class/no-selected.png"
                />
                <img
                  v-else
                  src="@/assets/imgs/marketplace/class/selected.png"
                />
              </div>
              <div class="goods">
                <div class="goods-icon">
                  <img :src="item.icon" />
                </div>
                <div class="goods-text">
                  {{ item.text }}
                </div>
              </div>
            </div>
          </div>
        </div> -->
        <!-- <div class="content-pureness">
          <div class="item-title">PURENESS</div>

          <div class="item-wrap">
            <div class="item-slider">
              <el-slider
                :max="6"
                class="slider"
                v-model="purenessValue"
                :marks="purenessMarks"
                :show-tooltip="false"
                @change="onChangeCe"
              ></el-slider>
            </div>
            <div class="item-slider-value">
              <span>{{ breedValue[0] }}</span>
              <span>{{ breedValue[1] }}</span>
            </div>
          </div>
        </div> -->
      </div>

      <div class="parts" v-show="filterSelectItem == 2">
        <div class="top">
          <div class="search">
            <el-input
              v-model="searchValue"
              placeholder="Search parts and abilities"
              @click.stop="handleSearch($event)"
              @input="handleSearch($event)"
              @keyup.enter="handleSearch($event)"
              ref="searchInput"
            >
              <template #prefix>
                <i class="el-input__icon el-icon-search search-icon"></i>
              </template>
            </el-input>
          </div>
          <div class="search-result" v-show="hasSearchResult">
            <div class="content-list select-list">
              <div
                class="item"
                v-for="(item, index) in searchResult"
                :key="index"
                @click.stop="popupSelect(item)"
              >
                <div class="left">
                  <img :src="createDragonPart1(item)" alt="" />
                </div>
                <div class="right">
                  <div class="right-top">
                    {{ item.dnaNameEn }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="content-select content">
          <div class="content-list select-list">
            <div class="item" v-for="(item, index) in selectList" :key="index">
              <div class="left">
                <img :src="createDragonPart1(item)" alt="" />
              </div>
              <div class="right">
                <div class="right-top">
                  {{ item.dnaNameEn }}
                </div>
              </div>
              <div class="cancel" @click.stop="claerSelect(item, index)">x</div>
            </div>
          </div>
        </div>
        <div class="content">
          <div class="content-title">SUGGESTION</div>
          <div class="content-list">
            <div
              class="item"
              @click.stop="searchSelect(item)"
              v-for="(item, index) in searchList"
              :key="index"
            >
              <div class="left">
                <img :src="createDragonPart1(item)" alt="" />
              </div>
              <div class="right">
                <div class="right-top">
                  {{ item.dnaNameEn }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="stats" v-show="filterSelectItem == 3">
        <div class="content">
          <div class="item">
            <slider
              sliderTitle="Attack"
              slideArrName="attackArr"
              @handleReset="handleReset"
              @onChange="onChangeSlide"
              :isMin="40"
              :mintext="40"
              :sliderValueSet="attackArr"
            ></slider>
          </div>
          <div class="item">
            <slider
              sliderTitle="Defense"
              slideArrName="defenseArr"
              @onChange="onChangeSlide"
              :isMin="40"
              :mintext="40"
              @handleReset="handleReset"
              :sliderValueSet="defenseArr"
            ></slider>
          </div>
          <div class="item">
            <slider
              sliderTitle="Health"
              slideArrName="healthArr"
              :isMin="40"
              :mintext="40"
              @onChange="onChangeSlide"
              @handleReset="handleReset"
              :sliderValueSet="healthArr"
            ></slider>
          </div>
          <div class="item">
            <slider
              sliderTitle="Speed"
              slideArrName="speedArr"
              :isMin="40"
              :mintext="40"
              @onChange="onChangeSlide"
              @handleReset="handleReset"
              :sliderValueSet="speedArr"
            ></slider>
          </div>
          <div class="item">
            <slider
              :sliderValueSet="intelligenceArr"
              sliderTitle="LifeForce"
              slideArrName="intelligenceArr"
              :isMin="40"
              :mintext="40"
              @onChange="onChangeSlide"
              @handleReset="handleReset"
            ></slider>
          </div>
        </div>
      </div>
    </div>
    <div class="content" v-show="menuItem == 2">
      <div class="general">
        <div class="content-item-class">
          <div class="item-title">CLASS</div>
          <div class="item-wrap">
            <div
              class="item"
              v-for="(item, index) in classList"
              :key="index"
              @click.stop="selectClass(item)"
            >
              <div class="select">
                <img
                  v-if="!item.selected"
                  src="@/assets/imgs/marketplace/class/no-selected.png"
                />
                <img
                  v-else
                  src="@/assets/imgs/marketplace/class/selected.png"
                />
              </div>
              <div class="goods">
                <div class="goods-icon">
                  <img :src="item.icon" />
                </div>
                <div class="goods-text">
                  {{ item.text }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="content-item-stage">
          <div class="item-title">STATUS</div>
          <div class="item-wrap">
            <div
              class="item"
              v-for="(item, index) in saleList"
              :key="index"
              @click.stop="selectSale(item)"
            >
              <div class="select">
                <img
                  v-if="!item.selected"
                  src="@/assets/imgs/marketplace/class/no-selected.png"
                />
                <img
                  v-else
                  src="@/assets/imgs/marketplace/class/selected.png"
                />
              </div>
              <div class="goods">
                <div class="goods-text">
                  {{ item.text }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="content-item-stage">
          <div class="item-title">LEVEL</div>
          <div class="item-wrap">
            <div
              class="item"
              v-for="(item, index) in leaveList"
              :key="index"
              @click.stop="selectLeave(item)"
            >
              <div class="select">
                <img
                  v-if="!item.selected"
                  src="@/assets/imgs/marketplace/class/no-selected.png"
                />
                <img
                  v-else
                  src="@/assets/imgs/marketplace/class/selected.png"
                />
              </div>
              <div class="goods">
                <div class="goods-text">
                  {{ item.text }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <div class="main" @click="testin($event)" v-show="!showDragon">
    <div class="top">
      <div class="top-title">
        <div class="top-title-left">Filter ({{ filterNum }})</div>
        <div class="top-title-right" @click="clearFilter()">Clear filter</div>
      </div>
    </div>

  </div> -->
</template>

<script>
import { reactive, toRefs, ref, onMounted, watch } from "vue";

// import { useRouter } from "vue-router";
import LeftHandle from "../use/left";
import slider from "./slider.vue";
import myDragon from "@/views/pc/myMainland/use/myDragon";
import markrtPlaceHandle from "../use/dragonList.js";
export default {
  name: "left",
  components: {
    slider,
  },
  setup() {
    const { marketPlaceState } = markrtPlaceHandle();
    const { createDragonPart1 } = myDragon();
    const {
      leftState,
      selectClass,
      selectStage,
      onChangeBreed,
      onChangeCe,
      clearFilter,
      selectFilterItem,
      selectSale,
      selectLeave,
      filterNum,
      searchSelect,
      claerSelect,
      handleSearch,
      popupSelect,
      onChangeSlide,
      handleReset,
      getAdvise,
      testin,
      changeTab,
    } = LeftHandle();
    const searchContainer = ref(null);

    getAdvise();
    watch(
      () => marketPlaceState.menuItem,
      (v1, v2) => {
        clearFilter();
      },
      {
        deep: true, // 深度监听的参数
      }
    );

    onMounted(() => {
      clearFilter();
      // const bodyHeight = document.documentElement.clientHeight;
      // const { offsetTop, offsetHeight } = searchContainer.value;
      // leftState.maxheight = bodyHeight - offsetTop - offsetHeight - 100;
      //.offsetTop
      // .offsetHeight
    });

    return {
      ...toRefs(leftState),
      ...toRefs(marketPlaceState),
      // ...toRefs(state),
      clearFilter,
      selectFilterItem,
      selectClass,
      selectStage,
      onChangeBreed,
      onChangeCe,
      selectSale,
      selectLeave,
      filterNum,
      searchSelect,
      claerSelect,
      handleSearch,
      popupSelect,
      onChangeSlide,
      createDragonPart1,
      searchContainer,
      handleReset,
      getAdvise,
      testin,
      changeTab,
    };
  },
};
</script>

<style lang="less" scoped>
.main {
  .top {
    width: 100%;
    .top-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .top-title-left {
        font-size: 20px;
        font-family: GothamRounded-Medium, GothamRounded;
        font-weight: 500;
        color: #ffffff;
        line-height: 24px;
      }
      .top-title-right {
        font-size: 14px;
        font-family: GothamRounded-Book, GothamRounded;
        font-weight: normal;
        color: #ffc763;
        line-height: 17px;
        cursor: pointer;
      }
    }
    .top-select {
      margin-top: 24px;
      .top-item-list {
        width: 100%;
        height: 38px;
        // background: rgba(245, 158, 100, 0.18);
        border-radius: 4px;
        border: 1px solid #514d4a;
        display: flex;
        align-items: center;
        .top-item {
          flex: 1;
          height: 38px;
          display: flex;
          justify-content: center;
          align-items: center;
          border-right: 1px solid #514d4a;
          cursor: pointer;
          font-size: 12px;
          font-family: GothamRounded-Book, GothamRounded;
          font-weight: normal;
          color: #ffffff;
        }
        .top-item:last-child {
          border-right: none;
        }
        .top-item:hover {
          background: rgba(245, 158, 100, 0.1);
        }
        .top-item-select {
          background: rgba(245, 158, 100, 0.18);
          //background:#ff5400;
        }
      }
    }
  }
  .content {
    margin-top: 24px;
    .general {
      .content-item-class {
        .item-title {
          font-size: 11px;
          font-family: GothamRounded-Book, GothamRounded;
          font-weight: normal;
          color: #ffffff;
          opacity: 0.48;
        }
        .item-wrap {
          margin-top: 12px;
          display: flex;
          flex-wrap: wrap;
          .item {
            display: flex;
            align-items: center;
            width: 50%;
            margin-bottom: 16px;
            cursor: pointer;
            // justify-content: space-between;
            .select {
              margin-left: 8px;
              width: 20px;
              height: 20px;
              display: flex;
              justify-content: center;
              align-items: center;
              img {
                width: 20px;
                height: 20px;
              }
            }
            .goods {
              display: flex;
              align-items: center;
              margin-left: 8px;
              width: 100%;

              .goods-icon {
                width: 20px;
                height: 20px;
                display: flex;
                justify-content: center;
                align-items: center;
                img {
                  width: 20px;
                  height: 20px;
                }
              }
              .goods-text {
                margin-left: 4px;
                font-size: 11px;
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
      }
      .content-item-stage {
        margin-top: 40px;
        .item-title {
          font-size: 11px;
          font-family: GothamRounded-Book, GothamRounded;
          font-weight: normal;
          color: #ffffff;
          opacity: 0.48;
        }
        .item-wrap {
          margin-top: 12px;
          display: flex;
          flex-wrap: wrap;
          .item {
            display: flex;
            align-items: center;
            width: 50%;
            margin-bottom: 16px;
            cursor: pointer;
            // justify-content: space-between;
            .select {
              margin-left: 8px;
              width: 20px;
              height: 20px;
              display: flex;
              justify-content: center;
              align-items: center;
              img {
                width: 20px;
                height: 20px;
              }
            }
            .goods {
              display: flex;
              align-items: center;
              margin-left: 8px;
              width: 100%;

              .goods-icon {
                width: 20px;
                height: 20px;
                img {
                  width: 20px;
                  height: 20px;
                }
              }
              .goods-text {
                margin-left: 8px;
                font-size: 11px;
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
      }
      .content-breed {
        margin-top: 40px;
        .item-title {
          font-size: 11px;
          font-family: GothamRounded-Book, GothamRounded;
          font-weight: normal;
          color: #ffffff;
          opacity: 0.48;
        }
        .item-wrap {
          margin-top: 12px;

          .item-slider {
            .slider {
              /deep/ .el-slider__runway {
                background-color: #1a1716;
                height: 5px;
              }
              /deep/ .el-slider__bar {
                background-color: #f59e64;
                height: 5px;
              }
              /deep/ .el-slider__button {
                width: 12px;
                height: 12px;
                background-color: #dddddd;
                border: 1px solid #ffffff;
              }
            }
          }
          .item-slider-value {
            display: flex;
            justify-content: space-between;
            margin-top: 2px;
            font-size: 11px;
            font-family: GothamRounded-Medium, GothamRounded;
            font-weight: 500;
            color: #ffffff;
          }
        }
      }
      .content-ce {
        margin-top: 40px;
        .item-title {
          font-size: 11px;
          font-family: GothamRounded-Book, GothamRounded;
          font-weight: normal;
          color: #ffffff;
          opacity: 0.48;
        }
        .item-title-des {
          margin-top: 12px;
          font-size: 11px;
          font-family: GothamRounded-Medium, GothamRounded;
          font-weight: 500;
          color: #ffffff;
        }
        .item-wrap {
          margin-top: 12px;

          .item-slider {
            .slider {
              /deep/ .el-slider__runway {
                background-color: #1a1716;
                height: 5px;
              }
              /deep/ .el-slider__bar {
                background-color: #f59e64;
                height: 5px;
              }
              /deep/ .el-slider__button {
                width: 12px;
                height: 12px;
                background-color: #dddddd;
                border: 1px solid #ffffff;
              }
            }
          }
          .item-slider-value {
            display: flex;
            justify-content: space-between;
            margin-top: 12px;
            font-size: 11px;
            font-family: GothamRounded-Medium, GothamRounded;
            font-weight: 500;
            color: #ffffff;
          }
        }
      }

      .content-pureness {
        margin-top: 40px;
        .item-title {
          font-size: 11px;
          font-family: GothamRounded-Book, GothamRounded;
          font-weight: normal;
          color: #ffffff;
          opacity: 0.48;
        }

        .item-wrap {
          margin-top: 12px;

          .item-slider {
            .slider {
              /deep/ .el-slider__runway {
                background-color: #1a1716;
                height: 5px;
              }
              /deep/ .el-slider__bar {
                // background-color: #f59e64;
                background-color: #1a1716;
                height: 5px;
              }
              /deep/ .el-slider__stop {
                // top: -3px;
                width: 10px;
                height: 10px;
                background: #1a1716;
                border-radius: 10px;
              }
              /deep/ .el-slider__marks-text {
                color: #ffffff;
              }
              /deep/ .el-slider__button {
                width: 12px;
                height: 12px;
                background-color: #dddddd;
                border: 1px solid #ffffff;
              }
            }
          }
          .item-slider-value {
            display: flex;
            justify-content: space-between;
            margin-top: 12px;
            font-size: 11px;
            font-family: GothamRounded-Medium, GothamRounded;
            font-weight: 500;
            color: #ffffff;
          }
        }
      }
    }
    .parts {
      position: relative;
      .top {
        .search {
          /deep/ .el-input__inner {
            // width: 271px;
            height: 40px;
            background: #1a1716;
            border-radius: 4px;
            border: 1px solid rgba(255, 255, 255, 0.16);
            color: #ffffff;
            opacity: 0.47;
          }
          /deep/ input::-webkit-input-placeholder {
            opacity: 0.47;
            color: #ffffff;
          }
          /deep/ input::-moz-input-placeholder {
            opacity: 0.47;
            color: #ffffff;
          }
          /deep/ input::-ms-input-placeholder {
            opacity: 0.47;
            color: #ffffff;
          }
          .search-icon {
            color: #ffffff;
          }
        }
        .search-result {
          // padding: 12px 0;
          background: #1a1716;
          width: 100%;
          max-height: calc(100vh - 350px);
          overflow-y: scroll;
          position: absolute;
          z-index: 88;
        }
        .content-list {
          margin-top: 21px;

          .item {
            display: flex;
            align-items: center;
            margin-bottom: 24px;
            position: relative;
            cursor: pointer;
            .left {
              margin-right: 8px;

              img {
                width: 24px;
                height: 24px;
              }
            }
            .right {
              .right-top {
                font-size: 11px;
                font-family: GothamRounded-Medium, GothamRounded;
                font-weight: 500;
                color: #ffffff;
              }
              .right-bottom {
                margin-top: 4px;
                font-size: 11px;
                font-family: GothamRounded-Book, GothamRounded;
                font-weight: normal;
                color: #ffffff;
                opacity: 0.68;
              }
            }
            .cancel {
              position: absolute;
              right: 12px;
            }
          }
        }
      }
      .content {
        .content-title {
          font-size: 11px;
          font-family: GothamRounded-Book, GothamRounded;
          font-weight: normal;
          color: #ffffff;
          opacity: 0.48;
        }

        .content-list {
          margin-top: 21px;

          .item {
            display: flex;
            align-items: center;
            margin-bottom: 24px;
            position: relative;
            cursor: pointer;
            .left {
              margin-right: 8px;

              img {
                width: 24px;
                height: 24px;
              }
            }
            .right {
              .right-top {
                font-size: 11px;
                font-family: GothamRounded-Medium, GothamRounded;
                font-weight: 500;
                color: #ffffff;
              }
              .right-bottom {
                margin-top: 4px;
                font-size: 11px;
                font-family: GothamRounded-Book, GothamRounded;
                font-weight: normal;
                color: #ffffff;
                opacity: 0.68;
              }
            }
            .cancel {
              position: absolute;
              right: 12px;
              width: 24px;
              height: 24px;
              font-size: 11px;
              display: flex;
              font-weight: 500;
              font-family: GothamRounded-Book, GothamRounded;
              align-items: center;
              justify-content: center;
            }
          }
        }
      }
    }
    .stats {
      .content {
        .item {
          margin-bottom: 40px;
        }
      }
    }
  }
}
</style>
