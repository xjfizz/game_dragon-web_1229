<template>
  <div class="main">
    <div class="main-wrap1" v-if="menuItem == 1">
      <div class="top">
        <div class="left">{{ pageInfo.total || 0 }} Dragons</div>
        <div class="right">
          <!-- <selectList
          :selectList="selectList1"
          :selectItem="selectItem1"
          :selectListShow="selectListShow1"
        ></selectList> -->
          <selectList
            :selectList="selectList2"
            :selectItem="selectItem2"
            :selectListShow="selectListShow2"
            @selectItem="selectItem"
          ></selectList>
        </div>
      </div>
      <div class="content">
        <div class="wrap" v-if="dragonList.length > 0">
          <div
            class="item"
            v-for="(item, index) in dragonList"
            :key="index"
            @click="goDetail(item)"
          >
            <div class="item-status3 item-selected">
              <div class="item-wrap">
                <div class="item-wrap-top">
                  <div
                    class="top-color"
                    :class="
                      'top-color-status' +
                      dragonLocalTypeList[item.heroVo.clazz]
                    "
                  >
                    # {{ item.heroVo.no }}
                  </div>
                  <div
                    class="item-wrap-top-dragon"
                    v-if="item.heroVo.status == 2"
                  >
                    <div
                      v-if="
                        setDragonVariationType(item.heroVo.parts) == 1 ||
                        setDragonVariationType(item.heroVo.parts) == 3
                      "
                      class="variation1"
                    >
                      Rare
                    </div>
                    <div
                      v-if="
                        setDragonVariationType(item.heroVo.parts) == 2 ||
                        setDragonVariationType(item.heroVo.parts) == 3
                      "
                      class="variation2"
                    >
                      Mystic
                    </div>
                    <div
                      v-if="setDragonVariationType(item.heroVo.parts) == -1"
                      class="variation3"
                    >
                      Negative Mutation
                    </div>
                  </div>
                </div>

                <div class="top-breed">
                  Breed count: {{ item.heroVo.breedCount || 0 }}
                </div>
                <div class="top-ce">
                  <div class="top-ce-img">
                    <img
                      :src="dragonClazzImgHandle(item.heroVo.clazz)"
                      alt=""
                    />
                  </div>

                  <div v-if="item.heroVo.status == 2" class="top-ce-des">
                    CE: {{ item.heroVo.ce }}
                  </div>
                  <div class="mid-dragon-skullInfo" v-if="true">
                    <div class="skull-wrap" v-if="item.heroVo.bone1Level">
                      <img
                        :src="
                          createDragonSkullsImgTakeIn(item.heroVo.bone1Level)
                        "
                        alt=""
                      />
                    </div>
                    <div class="skull-wrap" v-if="item.heroVo.bone2Level">
                      <img
                        :src="
                          createDragonSkullsImgTakeIn(item.heroVo.bone2Level)
                        "
                        alt=""
                      />
                    </div>
                    <div class="skull-wrap" v-if="item.heroVo.bone3Level">
                      <img
                        :src="
                          createDragonSkullsImgTakeIn(item.heroVo.bone3Level)
                        "
                        alt=""
                      />
                    </div>
                  </div>
                </div>
                <div class="mid-egg">
                  <div class="egg-img" v-if="item.heroVo.status == 2">
                    <dragonCreate
                      ref="dragonCreate"
                      :dragonImgEye="createDragon(item.heroVo.parts[0])"
                      :dragonImgWing="createDragon(item.heroVo.parts[4])"
                      :dragonImgHorn="createDragon(item.heroVo.parts[2])"
                      :dragonImgBody="createDragon(item.heroVo.parts[6])"
                      :dragonImgTotems="createDragon(item.heroVo.parts[1])"
                      :dragonImgEar="createDragon(item.heroVo.parts[3])"
                      :dragonImgTail="createDragon(item.heroVo.parts[5])"
                    ></dragonCreate>
                  </div>

                  <div class="egg-img" v-if="item.heroVo.status == 1">
                    <img
                      class="dragon-egg-img"
                      :src="dragonEggImgHandle(item.heroVo.clazz)"
                      alt=""
                    />
                  </div>
                </div>
                <div class="mid-bottom">
                  <div class="mid-bottom-fh">
                    <img
                      src="@/assets/imgs/openBox/marketPlace/bnb.png"
                      alt=""
                    />
                  </div>
                  <div class="mid-bottom-number">
                    {{ item.heroProduct.price || 0 }}
                  </div>
                  <!-- <div class="mid-bottom-price">$212</div> -->
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- page -->
        <page
          v-if="pageInfo.totalPages > 1"
          :pageInfo="pageInfo"
          @leftPage="leftPage"
          @rightPage="rightPage"
          @search="search"
        ></page>
        <div v-if="dragonList.length == 0" class="npData">
          <div class="noData-wrap">
            <div class="no-dragon">
              <img src="@/assets/imgs/myMainland/no-data.png" alt="" />
            </div>
            <div class="no-data-title">No data</div>
            <!-- <div class="no-data-des">
            * The marketplace will be open soon, so stay tuned !
          </div> -->
          </div>
        </div>
      </div>
    </div>
    <div class="main-wrap2" v-if="menuItem == 2">
      <div class="top">
        <div class="left">{{ dragonSkullTotal || 0 }} DragonSkulls</div>
        <div class="right">
          <!-- <selectList
          :selectList="selectList1"
          :selectItem="selectItem1"
          :selectListShow="selectListShow1"
        ></selectList> -->
          <selectList
            :selectList="selectList1"
            :selectItem="selectItem2"
            :selectListShow="selectListShow2"
            @selectItem="selectItem"
          ></selectList>
        </div>
      </div>
      <div class="content">
        <div class="wrap" v-if="dragonList.length > 0">
          <!-- <skullsItem
            v-for="(item, index) in 27"
            :key="index"
            @click="goSkullsDetail({ id: 8428 })"
          ></skullsItem> -->
          <skullsItem
            v-for="(item, index) in dragonList"
            :key="index"
            :item="item.skullProduct"
            status="2"
            @click="goSkullsDetail(item.skullProduct)"
          ></skullsItem>
        </div>
        <!-- page -->
        <page
          v-if="pageInfo.totalPages > 1"
          :pageInfo="pageInfo"
          @leftPage="leftPage"
          @rightPage="rightPage"
          @search="search"
        ></page>
        <div v-if="dragonList.length == 0" class="npData">
          <div class="noData-wrap">
            <div class="no-dragon">
              <img src="@/assets/imgs/myMainland/no-data.png" alt="" />
            </div>
            <div class="no-data-title">No data</div>
            <!-- <div class="no-data-des">
            * The marketplace will be open soon, so stay tuned !
          </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted,onBeforeUnmount, toRefs } from "vue";
// import { useRouter } from "vue-router";
import selectList from "@/components/selectList/selectList.vue";
import markrtPlaceHandle from "../use/dragonList.js";
import myDragon from "@/views/pc/myMainland/use/myDragon";
import dragonCreate from "@/views/pc/myMainland/components/dragonCreate/index.vue";
import page from "@/components/page/index.vue";
import skullsItem from "@/views/pc/myMainland/components/skulls-item/indexMarket.vue";
export default {
  name: "marketPlace",
  components: {
    selectList,
    dragonCreate,
    page,
    skullsItem,
  },
  setup() {
    //  const router = useRouter();
    const state = reactive({});
    onMounted(() => {
      initDataPage()
      init();
    });

    onBeforeUnmount(()=> {
      initDataPage()
    })
    const {
      marketPlaceState,
      handleSelect,
      handleSelectLeave,
      selectItem,
      init,
      leftPage,
      rightPage,
      search,
      goDetail,
      goSkullsDetail,
      skullTotal,
      initDataPage,
    } = markrtPlaceHandle();

    const {
      dragonClazzImgHandle,
      dragonEggImgHandle,
      createDragon,
      setDragonVariationType,
      createDragonSkullsImgTakeIn,
    } = myDragon();
    return {
      ...toRefs(state),
      ...toRefs(marketPlaceState),
      handleSelect,
      handleSelectLeave,
      selectItem,
      init,
      dragonClazzImgHandle,
      createDragon,
      leftPage,
      rightPage,
      search,
      goDetail,
      dragonEggImgHandle,
      goSkullsDetail,
      skullTotal,
      setDragonVariationType,
      createDragonSkullsImgTakeIn,
    };
  },
};
</script>

<style lang="less" scoped>
.main {
  padding-left: 40px;
  padding-right: 60px;
  .main-wrap1 {
    .top {
      display: flex;
      justify-content: space-between;
      .left {
        font-size: 28px;
        font-family: GothamRounded-Medium, GothamRounded;
        font-weight: 500;
        color: #ffffff;
      }
      .right {
        display: flex;
        justify-content: space-between;
      }
    }
    .content {
      margin-top: 30px;

      .wrap {
        display: flex;
        flex-wrap: wrap;
        .item {
          cursor: pointer;
          width: 222px;
          height: 311px;
          flex: 1;
          max-width: 222px;
          min-width: 222px;
          margin-right: 18px;
          margin-bottom: 20px;
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
          .item-selected:hover {
            background-color: #1a1716;
          }
          .item-status3 {
            width: 222px;
            height: 311px;
            background: #282523;
            border-radius: 8px;
            border: 1px solid rgba(255, 255, 255, 0.12);

            .item-wrap {
              margin: 12px;
            }
            .item-wrap-top {
              display: flex;
              align-items: center;
              .top-color {
                width: 60px;
                min-width: 60px;
                height: 20px;
                border-radius: 4px;
                font-size: 12px;
                font-family: GothamRounded-Medium, GothamRounded;
                font-weight: 500;
                color: #ffffff;
                line-height: 17px;
                display: flex;
                justify-content: center;
                align-items: center;
              }
              .item-wrap-top-dragon {
                display: flex;
                align-items: center;
                .variation1 {
                  margin-left: 4px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  width: 63px;
                  min-width: 63px;
                  height: 20px;
                  background: #12b3a8;
                  border-radius: 4px;
                  font-size: 12px;
                  font-family: GothamRounded-Medium, GothamRounded;
                  font-weight: 500;
                  color: #ffffff;
                }
                .variation2 {
                  margin-left: 4px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  width: 63px;
                  min-width: 63px;
                  height: 20px;
                  background: #9a52ff;
                  border-radius: 4px;
                  font-size: 12px;
                  font-family: GothamRounded-Medium, GothamRounded;
                  font-weight: 500;
                  color: #ffffff;
                }
                .variation3 {
                  margin-left: 4px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  width: 118px;
                  min-width: 118px;
                  height: 20px;
                  background: #707a83;
                  border-radius: 4px;
                  font-size: 12px;
                  font-family: GothamRounded-Medium, GothamRounded;
                  font-weight: 500;
                  color: #ffffff;
                }
              }
            }

            .top-breed {
              margin-top: 8px;
              font-size: 12px;
              font-family: GothamRounded-Book, GothamRounded;
              font-weight: normal;
              color: rgba(255, 255, 255, 0.48);
              line-height: 14px;
              position: relative;
            }
            .top-ce {
              margin-top: 10px;
              display: flex;
              align-items: center;
              position: relative;
              .top-ce-img {
                width: 20px;
                height: 20px;
                display: flex;
                align-items: center;
                img {
                  width: 20px;
                  height: 20px;
                }
              }
              .top-ce-des {
                margin-left: 5px;
                font-size: 12px;
                font-family: GothamRounded-Book, GothamRounded;
                font-weight: normal;
                color: #ffffff;
                line-height: 14px;
                opacity: 0.48;
              }

              .mid-dragon-skullInfo {
                position: absolute;
                // bottom: -4px;
                right: 0;
                display: flex;
                align-items: center;
                z-index: 999;
                .skull-wrap:last-child {
                  margin-right: 0;
                }
                .skull-wrap {
                  margin-right: 4px;
                  img {
                    width: calc(24px * 0.8);
                    height: calc(24px * 0.8);
                  }
                }
              }
            }
            .mid-egg {
              position: relative;
              width: 197px;
              height: 177px;

              .egg-img {
                display: flex;
                justify-content: center;
                position: absolute;
                top: 4px;
                left: 0px;
                img {
                  width: calc(602px * 0.3);
                  height: calc(536px * 0.3);
                }

                .dragon-egg-img {
                  width: calc(602px * 0.3);
                  height: calc(536px * 0.3);
                }
              }
              .egg-des {
                margin-top: -5px;
                display: flex;
                justify-content: center;
                font-size: 12px;
                font-family: GothamRounded-Book, GothamRounded;
                font-weight: normal;
                color: #ffffff;
                line-height: 14px;
                opacity: 0.48;
                // width: 222px;
              }
            }
            .mid-bottom {
              display: flex;
              justify-content: center;
              align-items: center;
              font-size: 20px;
              font-family: GothamRounded-Book, GothamRounded;
              font-weight: normal;
              color: #ffffff;
              .mid-bottom-fh {
                display: flex;
                flex-direction: column;
                font-size: 12px;
                font-family: GothamRounded-Book, GothamRounded;
                font-weight: normal;
                color: #ffffff;
                img {
                  width: 44px;
                  height: 44px;
                }
              }
              .mid-bottom-number {
                margin-left: 2px;
              }
              .mid-bottom-price {
                margin-left: 8px;
                font-size: 14px;
                font-family: GothamRounded-Book, GothamRounded;
                font-weight: normal;
                color: #ffffff;
                opacity: 0.48;
              }
            }
          }
        }
        .item:hover {
          background: #141313;
        }
      }
    }
  }
  .main-wrap2 {
    .top {
      display: flex;
      justify-content: space-between;
      .left {
        font-size: 28px;
        font-family: GothamRounded-Medium, GothamRounded;
        font-weight: 500;
        color: #ffffff;
      }
      .right {
        display: flex;
        justify-content: space-between;
      }
    }
    .content {
      margin-top: 30px;

      .wrap {
        display: flex;
        flex-wrap: wrap;
      }
    }
  }
}
</style>
