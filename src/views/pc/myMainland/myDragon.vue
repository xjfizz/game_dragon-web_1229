<template>
  <exchangeDragon v-if="exchangeDragonShow"></exchangeDragon>
  <!-- <div
    class="exchangeDragon-wrap"
    v-if="$process_env === 'production' ? isShowExchange : true"
  > -->
  <div class="my-dragon-main-wrap">
    <div class="dragon-list-top" v-if="true">
      <div class="left">
        <div class="item-left">
          <div class="img">
            <img
              src="../../../assets/imgs/myMainland/dragon-top/bone.png"
              alt=""
            />
          </div>
          <div class="number">
            {{ dragonEggListPageInfoTop.total || 0 }}
          </div>
          <div class="text">Dragons</div>
        </div>
        <div class="item-right">
          <div class="text">Stamina:</div>
          <div class="stamina-num" v-if="staminaForm.userPower">
            {{ staminaForm.userPower.power || 0 }}
          </div>
          <div class="stamina-mid">/</div>
          <div class="stamina-total">{{ staminaForm.maxPower || 0 }}</div>
          <div
            class="img"
            @mouseenter="mouseenterPower"
            @mouseleave="mouseleavePower"
          >
            <img
              src="../../../assets/imgs/myMainland/dragon-top/question.png"
              alt=""
            />
          </div>
          <div class="power-recover" v-if="powerRecoverShow">
            <div class="recover-wrap">
              <div class="power-point">
                <div class="power-title">Recover 1 point：</div>
                <div
                  v-if="staminaForm.maxPower >= staminaForm.userPower.power"
                  class="power-time"
                >
                  {{ staminaForm.timeList[1].countDownTime }}
                </div>
                <div v-else class="power-time">00:00:00</div>
              </div>
            </div>

            <div class="recover-wrap">
              <div class="power-point">
                <div class="power-title">Recover all：</div>
                <div
                  v-if="staminaForm.maxPower >= staminaForm.userPower.power"
                  class="power-time"
                >
                  {{ staminaForm.timeList[0].countDownTime }}
                </div>
                <div v-else class="power-time">00:00:00</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mid" @click="goWithdrawalDmp">
        <div class="item-left">
          <div class="img">
            <img
              src="../../../assets/imgs/myMainland/dragon-top/dmp.png"
              alt=""
            />
          </div>
          <div class="num">{{ userDmp || 0 }}</div>
          <div class="unit">DMP</div>
        </div>
        <div class="item-mid">
          <div class="img">
            <img
              src="../../../assets/imgs/myMainland/dragon-top/right.png"
              alt=""
            />
          </div>
        </div>
      </div>
      <div v-if="true" class="right" @click="goSkullCreate">
        <div class="item-left">
          <div class="img">
            <img
              src="../../../assets/imgs/myMainland/dragon-top/dragon-bone.png"
              alt=""
            />
          </div>
          <!-- <div class="num">{{ dragonSkullListPageInfoTop.total || 0 }}</div>
          <div class="unit">Skulls</div> -->
          <div class="num">Synthesis</div>
        </div>
        <div class="item-right">
          <div class="img">
            <img
              src="../../../assets/imgs/myMainland/dragon-top/right.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
    <div class="exchangeDragon-wrap">
      <div class="exchange-btn" @click="exchangeDragonClick">Redeem</div>
    </div>

    <div class="menu-main">
      <div class="menu-title">
        <div
          class="title-item select-hover"
          :class="menuItem == 1 ? 'title-item-selected' : ''"
          @click="selectMenuItem(1)"
        >
          <div class="img">
            <img
              src="@/assets/imgs/myMainland/dragon-top/menu-dragon-icon.png"
              alt=""
            />
          </div>
          <div class="text">Dragons</div>
        </div>
        <div
          class="title-item hover-select"
          :class="menuItem == 2 ? 'title-item-selected' : ''"
          @click="selectMenuItem(2)"
        >
          <div class="img">
            <img
              src="@/assets/imgs/myMainland/dragon-top/menu-skulls-icon.png"
              alt=""
            />
          </div>
          <div class="text">Skulls</div>
        </div>
      </div>
      <div class="menu-content">
        <div v-if="menuItem == 1" class="menu-content-wrap1">
          <div
            v-if="dragonList.length > 0"
            class="my-dragon-main"
            v-loading="loadingForm.loadingShow"
            :element-loading-text="loadingForm.loadingShowText"
            element-loading-spinner="el-icon-loading"
          >
            <div class="my-dragon-bottom">
              <div class="wrap">
                <div
                  class="item"
                  v-for="(item, index) in dragonList"
                  :key="index"
                  @click="goDetail(item)"
                >
                  <!--1 蛋-未孵化-未出售 -->
                  <div
                    v-if="
                      !!item.countDownTime &&
                      item.status == 1 &&
                      item.lockStatus != 3
                    "
                    class="item-status1 item-selected"
                  >
                    <div class="item-wrap">
                      <div
                        class="top-color"
                        :class="
                          'top-color-status' + dragonLocalTypeList[item.clazz]
                        "
                      >
                        # {{ item.no }}
                      </div>
                      <div class="top-breed">
                        Breed count: {{ item.breedCount || 0 }}
                      </div>
                      <div class="top-ce">
                        <div class="top-ce-img">
                          <img :src="dragonClazzImgHandle(item.clazz)" alt="" />
                        </div>

                        <!-- <div class="top-ce-des">CE: {{ item.ce }}</div> -->
                      </div>
                      <div class="mid-egg">
                        <div class="egg-img">
                          <img :src="dragonEggImgHandle(item.clazz)" alt="" />
                        </div>
                        <div class="egg-des">Egg is hatching</div>
                      </div>
                      <div class="mid-bottom">
                        <div class="time-list">
                          <div
                            class="time-item"
                            v-for="(item2, index2) in item.countDownTime"
                            :key="index2"
                          >
                            {{ item2 }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!--5 蛋-未孵化-出售中 -->
                  <div
                    v-if="
                      !!item.countDownTime &&
                      item.status == 1 &&
                      item.lockStatus == 3
                    "
                    class="item-status5 item-selected"
                  >
                    <div class="item-wrap">
                      <div
                        class="top-color"
                        :class="
                          'top-color-status' + dragonLocalTypeList[item.clazz]
                        "
                      >
                        # {{ item.no }}
                      </div>
                      <div class="top-breed">
                        Breed count: {{ item.breedCount || 0 }}
                      </div>
                      <div class="top-ce">
                        <div class="top-ce-img">
                          <img :src="dragonClazzImgHandle(item.clazz)" alt="" />
                        </div>

                        <!-- <div class="top-ce-des">CE: {{ item.ce }}</div> -->
                      </div>
                      <div class="mid-egg">
                        <div class="egg-img">
                          <img :src="dragonEggImgHandle(item.clazz)" alt="" />
                        </div>
                        <!-- <div class="egg-des">Egg is hatching</div> -->
                      </div>
                      <div class="mid-bottom">
                        <div class="mid-bottom-fh">
                          <img
                            src="../../../assets/imgs/myMainland/bnb-coin.png"
                            alt=""
                          />
                        </div>
                        <div class="mid-bottom-number">For sale</div>
                        <!-- <div class="mid-bottom-price">$212</div> -->
                      </div>
                    </div>
                  </div>
                  <!--2 蛋-已孵化- 未出售 -->
                  <div
                    v-if="
                      !item.countDownTime &&
                      item.status == 1 &&
                      item.lockStatus != 3
                    "
                    class="item-status2 item-selected"
                  >
                    <div class="item-wrap">
                      <div
                        class="top-color"
                        :class="
                          'top-color-status' + dragonLocalTypeList[item.clazz]
                        "
                      >
                        # {{ item.no }}
                      </div>
                      <div class="top-breed">
                        Breed count: {{ item.breedCount || 0 }}
                      </div>
                      <div class="top-ce">
                        <div class="top-ce-img">
                          <img :src="dragonClazzImgHandle(item.clazz)" alt="" />
                        </div>

                        <!-- <div class="top-ce-des">CE: {{ item.ce }}</div> -->
                      </div>
                      <div class="mid-egg">
                        <div class="egg-img">
                          <img
                            v-show="!item.isStartDragon"
                            :src="dragonEggImgHandle(item.clazz)"
                            alt=""
                          />
                          <div
                            v-if="item.isStartDragon"
                            ref="eggToDragon"
                            id="eggToDragon"
                            class="lottie"
                          >
                            <lottie
                              :options="defaultOptions"
                              v-on:animCreated="handleAnimation"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="mid-bottom" v-show="!item.isStartDragon">
                        <div
                          class="mid-bottom-btn"
                          @click.stop="openDradonEgg(item)"
                        >
                          Claim
                        </div>
                      </div>
                    </div>
                  </div>
                  <!--2 蛋-已孵化- 已出售 -->
                  <div
                    v-if="
                      !item.countDownTime &&
                      item.status == 1 &&
                      item.lockStatus == 3
                    "
                    class="item-status6 item-selected"
                  >
                    <div class="item-wrap">
                      <div
                        class="top-color"
                        :class="
                          'top-color-status' + dragonLocalTypeList[item.clazz]
                        "
                      >
                        # {{ item.no }}
                      </div>
                      <div class="top-breed">
                        Breed count: {{ item.breedCount || 0 }}
                      </div>
                      <div class="top-ce">
                        <div class="top-ce-img">
                          <img :src="dragonClazzImgHandle(item.clazz)" alt="" />
                        </div>

                        <!-- <div class="top-ce-des">CE: {{ item.ce }}</div> -->
                      </div>
                      <div class="mid-egg">
                        <div class="egg-img">
                          <img
                            v-show="!item.isStartDragon"
                            :src="dragonEggImgHandle(item.clazz)"
                            alt=""
                          />
                          <div
                            v-if="item.isStartDragon"
                            ref="eggToDragon"
                            id="eggToDragon"
                            class="lottie"
                          >
                            <lottie
                              :options="defaultOptions"
                              v-on:animCreated="handleAnimation"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="mid-bottom" v-show="!item.isStartDragon">
                        <!-- <div class="mid-bottom-btn" @click.stop="openDradonEgg(item)">
                    Claim
                  </div> -->

                        <div class="mid-bottom-fh">
                          <img
                            src="../../../assets/imgs/myMainland/bnb-coin.png"
                            alt=""
                          />
                        </div>
                        <div class="mid-bottom-number">For sale</div>
                        <!-- <div class="mid-bottom-price">$212</div> -->
                      </div>
                    </div>
                  </div>
                  <!-- 龙-未出售 -->
                  <div
                    v-if="item.status == 2 && item.lockStatus != 3"
                    class="item-status3 item-selected"
                  >
                    <div class="item-wrap">
                      <div class="item-wrap-top">
                        <div
                          class="top-color"
                          :class="
                            'top-color-status' + dragonLocalTypeList[item.clazz]
                          "
                        >
                          # {{ item.no }}
                        </div>
                        <div
                          class="item-wrap-top-dragon"
                          v-if="item.status == 2"
                        >
                          <div
                            v-if="
                              setDragonVariationType(item.parts) == 1 ||
                              setDragonVariationType(item.parts) == 3
                            "
                            class="variation1"
                          >
                            Rare
                          </div>
                          <div
                            v-if="
                              setDragonVariationType(item.parts) == 2 ||
                              setDragonVariationType(item.parts) == 3
                            "
                            class="variation2"
                          >
                            Mystic
                          </div>
                          <div
                            v-if="setDragonVariationType(item.parts) == -1"
                            class="variation3"
                          >
                            Negative Mutation
                          </div>
                        </div>
                      </div>
                      <div class="top-breed">
                        Breed count: {{ item.breedCount || 0 }}
                      </div>
                      <div class="top-ce">
                        <div class="top-ce-img">
                          <img :src="dragonClazzImgHandle(item.clazz)" alt="" />
                        </div>

                        <div class="top-ce-des">CE: {{ item.ce }}</div>
                        <div class="mid-dragon-skullInfo" v-if="true">
                          <div class="skull-wrap" v-if="item.bone1Level">
                            <img
                              :src="
                                createDragonSkullsImgTakeIn(item.bone1Level)
                              "
                              alt=""
                            />
                          </div>
                          <div class="skull-wrap" v-if="item.bone2Level">
                            <img
                              :src="
                                createDragonSkullsImgTakeIn(item.bone2Level)
                              "
                              alt=""
                            />
                          </div>
                          <div class="skull-wrap" v-if="item.bone3Level">
                            <img
                              :src="
                                createDragonSkullsImgTakeIn(item.bone3Level)
                              "
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                      <div
                        class="mid-egg"
                        :class="
                          item.lockStatus == 2 ? 'dragon-lock-status' : ''
                        "
                      >
                        <div class="egg-img">
                          <!-- <img
                    :src="createDragon(item.parts[0])"
                    alt=""
                  /> -->
                          <!-- <img src="../../../assets/dragon/dragon-part/eye/fire/Fire_eye02.png" alt=""> -->
                          <dragonCreate
                            ref="dragonCreate"
                            :dragonImgEye="createDragon(item.parts[0])"
                            :dragonImgWing="createDragon(item.parts[4])"
                            :dragonImgHorn="createDragon(item.parts[2])"
                            :dragonImgBody="createDragon(item.parts[6])"
                            :dragonImgTotems="createDragon(item.parts[1])"
                            :dragonImgEar="createDragon(item.parts[3])"
                            :dragonImgTail="createDragon(item.parts[5])"
                          ></dragonCreate>
                        </div>
                      </div>
                      <div v-if="item.lockStatus == 2" class="dragon-lock">
                        Staking in progress…
                      </div>
                    </div>
                  </div>
                  <!-- 龙-出售中 -->
                  <div
                    v-if="item.status == 2 && item.lockStatus == 3"
                    class="item-status4 item-selected"
                  >
                    <div class="item-wrap">
                      <div class="item-wrap-top">
                        <div
                          class="top-color"
                          :class="
                            'top-color-status' + dragonLocalTypeList[item.clazz]
                          "
                        >
                          # {{ item.no }}
                        </div>
                        <div
                          class="item-wrap-top-dragon"
                          v-if="item.status == 2"
                        >
                          <div
                            v-if="
                              setDragonVariationType(item.parts) == 1 ||
                              setDragonVariationType(item.parts) == 3
                            "
                            class="variation1"
                          >
                            Rare
                          </div>
                          <div
                            v-if="
                              setDragonVariationType(item.parts) == 2 ||
                              setDragonVariationType(item.parts) == 3
                            "
                            class="variation2"
                          >
                            Mystic
                          </div>
                          <div
                            v-if="setDragonVariationType(item.parts) == -1"
                            class="variation3"
                          >
                            Negative Mutation
                          </div>
                        </div>
                      </div>
                      <div class="top-breed">
                        Breed count: {{ item.breedCount || 0 }}
                      </div>
                      <div class="top-ce">
                        <div class="top-ce-img">
                          <img :src="dragonClazzImgHandle(item.clazz)" alt="" />
                        </div>

                        <div class="top-ce-des">CE: {{ item.ce }}</div>
                        <div class="mid-dragon-skullInfo" v-if="true">
                          <div class="skull-wrap" v-if="item.bone1Level">
                            <img
                              :src="
                                createDragonSkullsImgTakeIn(item.bone1Level)
                              "
                              alt=""
                            />
                          </div>
                          <div class="skull-wrap" v-if="item.bone2Level">
                            <img
                              :src="
                                createDragonSkullsImgTakeIn(item.bone2Level)
                              "
                              alt=""
                            />
                          </div>
                          <div class="skull-wrap" v-if="item.bone3Level">
                            <img
                              :src="
                                createDragonSkullsImgTakeIn(item.bone3Level)
                              "
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                      <div class="mid-egg">
                        <div class="egg-img">
                          <dragonCreate
                            ref="dragonCreate"
                            :dragonImgEye="createDragon(item.parts[0])"
                            :dragonImgWing="createDragon(item.parts[4])"
                            :dragonImgHorn="createDragon(item.parts[2])"
                            :dragonImgBody="createDragon(item.parts[6])"
                            :dragonImgTotems="createDragon(item.parts[1])"
                            :dragonImgEar="createDragon(item.parts[3])"
                            :dragonImgTail="createDragon(item.parts[5])"
                          ></dragonCreate>
                        </div>
                      </div>
                      <div class="mid-bottom">
                        <div class="mid-bottom-fh">
                          <img
                            src="../../../assets/imgs/myMainland/bnb-coin.png"
                            alt=""
                          />
                        </div>
                        <div class="mid-bottom-number">For sale</div>
                        <!-- <div class="mid-bottom-price">$212</div> -->
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- page -->
            <page
              v-if="dragonEggListPageInfo.totalPages > 1"
              :pageInfo="dragonEggListPageInfo"
              @leftPage="leftPage"
              @rightPage="rightPage"
              @search="search"
            ></page>
            <div
              class="create-selete-img"
              v-if="selectLocalDragon && loadingForm.loadingShow"
            >
              <div class="dragon">
                <indexCreateUpload
                  ref="dragonCreate"
                  :dragonImgEye="createDragon(selectLocalDragon.parts[0])"
                  :dragonImgWing="createDragon(selectLocalDragon.parts[4])"
                  :dragonImgHorn="createDragon(selectLocalDragon.parts[2])"
                  :dragonImgBody="createDragon(selectLocalDragon.parts[6])"
                  :dragonImgTotems="createDragon(selectLocalDragon.parts[1])"
                  :dragonImgEar="createDragon(selectLocalDragon.parts[3])"
                  :dragonImgTail="createDragon(selectLocalDragon.parts[5])"
                ></indexCreateUpload>
              </div>
            </div>
          </div>
          <div v-else class="npData">
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
        <div
          v-if="menuItem == 2"
          class="menu-content-wrap2"
          v-loading="loadingForm.loadingShow"
          :element-loading-text="loadingForm.loadingShowText"
          element-loading-spinner="el-icon-loading"
        >
          <div class="wrap-top">
            <selectList
              :selectList="selectList1"
              :selectItem="selectItem1"
              :selectListShow="selectListShow1"
              @selectItem="selectItem"
            ></selectList>
          </div>
          <div class="wrap-bottoom">
            <div
              v-if="dragonSkullList.length > 0 && selectItem1.id == 1"
              class="wrap"
            >
              <skullsItem1
                v-for="(item, index) in dragonSkullList"
                :key="index"
                :item="item"
                :status="selectItem1.id"
                @click="goSkullsDetail(item)"
              ></skullsItem1>
            </div>

            <div
              v-if="dragonSkullList.length > 0 && selectItem1.id == 2"
              class="wrap"
            >
              <skullsItem2
                v-for="(item, index) in dragonSkullList"
                :key="index"
                :item="item.skullProduct"
                :status="selectItem1.id"
                @click="goSkullsDetail(item.skullProduct)"
              ></skullsItem2>
            </div>

            <div v-if="dragonSkullList.length == 0" class="npData">
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

            <!-- page -->
            <page
              v-if="dragonEggListPageInfo.totalPages > 1"
              :pageInfo="dragonEggListPageInfo"
              @leftPage="leftPage"
              @rightPage="rightPage"
              @search="search"
            ></page>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, toRefs, ref, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";

import common from "@/utils/common";
import myDragon from "@/views/pc/myMainland/use/myDragon";
import myMainland from "@/views/pc/myMainland/use/myMainland";
import dragonLocalTypeList from "./use/dragonLocalTypeList";
import dragonCreate from "./components/dragonCreate/index.vue";
import indexCreateUpload from "./components/dragonCreate/indexCreateUpload.vue";
import lottie from "vue-lottie/src/lottie.vue";
import page from "@/components/page/index.vue";
import exchangeDragon from "./components/exchangeDragon/index.vue";
import { getToken } from "@/utils/auth.js";
import miningCampLeftHandle from "@/views/pc/myMainland/use/miningCamp/left";
import withdrawlDmpHandle from "@/views/pc/myMainland/use/withdrawlDmp";
import skullsItem1 from "@/views/pc/myMainland/components/skulls-item/index.vue";
import skullsItem2 from "@/views/pc/myMainland/components/skulls-item/indexMarket.vue";
import selectList from "@/components/selectList/selectList.vue";
export default {
  name: "myDragon",
  components: {
    dragonCreate,
    indexCreateUpload,
    lottie,
    page,
    exchangeDragon,
    skullsItem1,
    skullsItem2,
    selectList,
  },
  setup(props, context) {
    const router = useRouter();
    const state = reactive({});

    const {
      dragonEggList,
      openDradonEgg,
      myDragonState,
      dragonEggImgHandle,
      dragonClazzImgHandle,
      goDetail,
      goSkullsDetail,
      createDragon,
      handleAnimation,
      startClaimTest,
      leftPage,
      rightPage,
      search,
      timeCheck,
      exchangeDragonClick,
      showExchange,
      goWithdrawalDmp,
      goSkullCreate,
      selectMenuItem,
      selectItem,
      initPageList,
      setDragonVariationType,
      createDragonSkullsImgTakeIn,
    } = myDragon();
    const { myMainlandState } = myMainland();

    const {
      miningCampLeftState,
      getMyPower,
      mouseenterPower,
      mouseleavePower,
    } = miningCampLeftHandle(context);
    const { withdrawlDmpState, getUserCoinTotal } = withdrawlDmpHandle();
    onMounted(() => {
      if (!getToken()) {
        return router.push("/login");
      }
      myMainlandState.leftItemSelected = 1;
      common.goTopScroll();
      dragonEggList();
      showExchange();
      getMyPower();
      getUserCoinTotal();
      initPageList();
      document.addEventListener("visibilitychange", timeCheck);
      console.log(
        "miningCampLeftState==========================",
        miningCampLeftState
      );
    });

    onBeforeUnmount(() => {
      // miningCampRightState.miningCampList = []
      if (myDragonState.dragonList && myDragonState.dragonList.length > 0) {
        myDragonState.dragonList.map((item) => {
          if (item.countDownFn) {
            clearInterval(item.countDownFn);
          }
        });
      }
    });

    return {
      ...toRefs(miningCampLeftState),
      ...toRefs(withdrawlDmpState),
      ...toRefs(state),
      ...toRefs(myDragonState),
      openDradonEgg,
      dragonEggImgHandle,
      dragonClazzImgHandle,
      goDetail,
      dragonLocalTypeList,
      createDragon,
      handleAnimation,
      startClaimTest,
      leftPage,
      rightPage,
      search,
      exchangeDragonClick,
      goWithdrawalDmp,
      goSkullCreate,
      mouseenterPower,
      mouseleavePower,
      selectMenuItem,
      selectItem,
      goSkullsDetail,
      setDragonVariationType,
      createDragonSkullsImgTakeIn,
    };
  },
};
</script>

<style lang="less" scoped >
.my-dragon-main-wrap {
  margin: 0 104px 0 104px;
  .dragon-list-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 88px;
    margin-bottom: 30px;
    //  margin-top: 30px;
    .left {
      width: calc(468px - 48px);
      //  width: 45%;
      padding: 20px 24px;
      border-radius: 8px;
      border: 1px solid rgba(255, 255, 255, 0.12);
      display: flex;
      align-items: center;
      justify-content: space-between;
      .item-left {
        display: flex;
        align-items: center;
        .img {
          img {
            width: 48px;
            height: 48px;
          }
        }
        .number {
          margin-left: 16px;
          font-size: 24px;
          font-family: GothamRounded-Medium, GothamRounded;
          font-weight: 500;
          color: #ffffff;
        }
        .text {
          margin-left: 8px;
          font-size: 24px;
          font-family: GothamRounded-Medium, GothamRounded;
          font-weight: 500;
          color: #ffffff;
        }
      }
      .item-right {
        display: flex;
        align-items: center;
        position: relative;

        .text {
          font-size: 16px;
          font-family: GothamRounded-Book, GothamRounded;
          font-weight: normal;
          color: #ffffff;
        }
        .stamina-num {
          margin-left: 10px;
          font-size: 16px;
          font-family: GothamRounded-Book, GothamRounded;
          font-weight: normal;
          color: #ffffff;
        }
        .stamina-mid {
          margin-left: 10px;
          font-size: 16px;
          font-family: GothamRounded-Book, GothamRounded;
          font-weight: normal;
          color: #ffffff;
        }
        .stamina-total {
          margin-left: 10px;
          font-size: 16px;
          font-family: GothamRounded-Book, GothamRounded;
          font-weight: normal;
          color: #ffffff;
        }
        .img {
          margin-left: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          img {
            width: 16px;
            height: 16px;
          }
        }
        .power-recover {
          position: absolute;
          left: 0;
          top: 30px;
          width: 168px;
          height: 168px;
          background: #050303;
          border-radius: 4px;
          opacity: 0.86;
          z-index: 99999;
          .recover-wrap {
            // padding: 16px;
            .power-point:last-child {
              border: none;
            }
            .power-point {
              border-bottom: 1px solid rgba(255, 255, 255, 0.08);
              padding: 16px;
              .power-title {
                font-size: 14px;
                font-family: GothamRounded-Book, GothamRounded;
                font-weight: normal;
                color: rgba(255, 255, 255, 0.48);
              }
              .power-time {
                margin-top: 8px;
                width: 90px;
                height: 20px;
                font-size: 14px;
                font-family: GothamRounded-Medium, GothamRounded;
                font-weight: 500;
                color: #ffffff;
                line-height: 17px;
                letter-spacing: 2px;
              }
            }
          }
        }
      }
    }
    .mid {
      width: calc(468px - 48px);
      //  width: 45%;
      padding: 20px 24px;
      border-radius: 8px;
      border: 1px solid rgba(255, 255, 255, 0.12);
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      .item-left {
        display: flex;
        align-items: center;
        .img {
          img {
            width: 48px;
            height: 48px;
          }
        }
        .num {
          margin-left: 16px;
          font-size: 24px;
          font-family: GothamRounded-Medium, GothamRounded;
          font-weight: 500;
          color: #ffffff;
        }
        .unit {
          font-size: 24px;
          font-family: GothamRounded-Medium, GothamRounded;
          font-weight: 500;
          color: #ffffff;
          margin-left: 10px;
        }
      }
      .item-right {
        display: flex;
        align-items: center;
        cursor: pointer;
        .img {
          img {
            width: 24px;
            height: 24px;
          }
        }
      }
    }
    .right {
      width: calc(468px - 48px);
      padding: 20px 24px;
      border-radius: 8px;
      border: 1px solid rgba(255, 255, 255, 0.12);
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      .item-left {
        display: flex;
        align-items: center;
        .img {
          img {
            width: 48px;
            height: 48px;
          }
        }
        .num {
          margin-left: 16px;
          font-size: 24px;
          font-family: GothamRounded-Medium, GothamRounded;
          font-weight: 500;
          color: #ffffff;
        }
        .unit {
          font-size: 24px;
          font-family: GothamRounded-Medium, GothamRounded;
          font-weight: 500;
          color: #ffffff;
          margin-left: 10px;
        }
      }
      .item-right {
        display: flex;
        align-items: center;
        cursor: pointer;
        .img {
          img {
            width: 24px;
            height: 24px;
          }
        }
      }
    }
  }
  .exchangeDragon-wrap {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    // margin: 0 104px 0 104px;
    .exchange-btn {
      width: 140px;
      height: 50px;
      border-radius: 25px;
      border: 1px solid rgba(255, 255, 255, 0.28);
      font-size: 16px;
      font-family: GothamRounded-Medium, GothamRounded;
      font-weight: 500;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: auto;
      cursor: pointer;
      // margin-top: 30px;
    }
  }
  .menu-main {
    .menu-title {
      display: flex;
      align-items: center;
      border-bottom: 1px solid #1a1716;
      .title-item {
        display: flex;
        align-items: center;
        width: 125px;
        margin-right: 67px;
        padding-bottom: 4px;
        cursor: pointer;
        border-bottom: 2px solid rgba(255, 255, 255, 0);
        opacity: 0.68;
        .img {
          img {
            width: 48px;
            height: 48px;
          }
        }
        .text {
          margin-left: 4px;
          font-size: 16px;
          font-family: GothamRounded-Medium, GothamRounded;
          font-weight: 500;
          color: #ffffff;
        }
      }
      .title-item-selected {
        border-bottom: 2px solid #ffc763;
        opacity: 1;
      }
    }
    .menu-content {
      .menu-content-wrap1 {
        .my-dragon-main {
          //margin-top: 40px;
          // height: 700px;
          // min-height: 700px;
          // overflow-y: scroll;
          .my-dragon-top {
            height: 40px;
            .left {
              font-size: 28px;
              font-family: GothamRounded-Medium, GothamRounded;
              font-weight: 500;
              color: #ffffff;
              line-height: 34px;
            }
          }
          .my-dragon-bottom {
            margin-top: 30px;
            .wrap {
              display: flex;
              flex-wrap: wrap;
              //   justify-content: flex-start;
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
                .item-status1 {
                  width: 222px;
                  height: 311px;
                  background: #282523;
                  border-radius: 8px;
                  border: 1px solid rgba(255, 255, 255, 0.12);

                  .item-wrap {
                    margin: 12px;
                  }

                  .top-color {
                    width: 68px;
                    min-width: 68px;
                    height: 20px;
                    padding: 2px 3px;
                    border-radius: 4px;
                    font-size: 14px;
                    font-family: GothamRounded-Medium, GothamRounded;
                    font-weight: 500;
                    color: #ffffff;
                    line-height: 17px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    white-space: nowrap;
                  }

                  .top-breed {
                    margin-top: 8px;
                    font-size: 12px;
                    font-family: GothamRounded-Book, GothamRounded;
                    font-weight: normal;
                    color: #ffffff;
                    line-height: 14px;
                    opacity: 0.48;
                  }
                  .top-ce {
                    margin-top: 10px;
                    display: flex;
                    align-items: center;
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
                  }
                  .mid-egg {
                    position: relative;
                    width: 197px;
                    height: 190px;
                    .egg-img {
                      display: flex;
                      justify-content: center;
                      img {
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
                    .time-list {
                      display: flex;
                      justify-content: center;
                      .time-item {
                        width: 28px;
                        height: 28px;
                        background: #09090a;
                        border-radius: 4px;
                        font-size: 14px;
                        font-family: GothamRounded-Medium, GothamRounded;
                        font-weight: 500;
                        color: #ffc763;
                        line-height: 17px;
                        margin-right: 8px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                      }
                    }
                  }
                }

                .item-status5 {
                  width: 222px;
                  height: 311px;
                  background: #282523;
                  border-radius: 8px;
                  border: 1px solid rgba(255, 255, 255, 0.12);

                  .item-wrap {
                    margin: 12px;
                  }

                  .top-color {
                    width: 68px;
                    min-width: 68px;
                    height: 20px;
                    padding: 2px 3px;
                    border-radius: 4px;
                    font-size: 14px;
                    font-family: GothamRounded-Medium, GothamRounded;
                    font-weight: 500;
                    color: #ffffff;
                    line-height: 17px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    white-space: nowrap;
                  }

                  .top-breed {
                    margin-top: 8px;
                    font-size: 12px;
                    font-family: GothamRounded-Book, GothamRounded;
                    font-weight: normal;
                    color: #ffffff;
                    line-height: 14px;
                    opacity: 0.48;
                  }
                  .top-ce {
                    margin-top: 10px;
                    display: flex;
                    align-items: center;
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
                  }
                  .mid-egg {
                    position: relative;
                    width: 197px;
                    height: 176px;
                    .egg-img {
                      display: flex;
                      justify-content: center;
                      img {
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
                      justify-content: center;
                      align-items: center;
                      img {
                        width: calc(28px * 0.7);
                        height: calc(28px * 0.7);
                      }
                    }
                    .mid-bottom-number {
                      margin-left: 3px;
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
                .item-status2 {
                  width: 222px;
                  height: 311px;
                  background: #282523;
                  border-radius: 8px;
                  border: 1px solid rgba(255, 255, 255, 0.12);

                  .item-wrap {
                    margin: 12px;
                  }

                  .top-color {
                    width: 68px;
                    min-width: 68px;
                    height: 20px;
                    padding: 2px 3px;
                    border-radius: 4px;
                    font-size: 14px;
                    font-family: GothamRounded-Medium, GothamRounded;
                    font-weight: 500;
                    color: #ffffff;
                    line-height: 17px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    white-space: nowrap;
                  }
                  .top-breed {
                    margin-top: 8px;
                    font-size: 12px;
                    font-family: GothamRounded-Book, GothamRounded;
                    font-weight: normal;
                    color: #ffffff;
                    line-height: 14px;
                    opacity: 0.48;
                  }
                  .top-ce {
                    margin-top: 10px;
                    display: flex;
                    align-items: center;
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
                  }
                  .mid-egg {
                    position: relative;
                    width: 197px;
                    height: 177px;
                    .egg-img {
                      display: flex;
                      justify-content: center;
                      img {
                        width: calc(602px * 0.3);
                        height: calc(536px * 0.3);
                      }
                      .lottie {
                        width: 200px;
                        height: 220px;
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
                    .mid-bottom-btn {
                      width: 108px;
                      height: 32px;
                      border-radius: 25px;
                      border: 1px solid #ffc763;
                      font-size: 16px;
                      font-family: GothamRounded-Medium, GothamRounded;
                      font-weight: 500;
                      color: #ffc763;
                      line-height: 19px;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                    }
                  }
                }

                .item-status6 {
                  width: 222px;
                  height: 311px;
                  background: #282523;
                  border-radius: 8px;
                  border: 1px solid rgba(255, 255, 255, 0.12);

                  .item-wrap {
                    margin: 12px;
                  }

                  .top-color {
                    width: 68px;
                    min-width: 68px;
                    height: 20px;
                    padding: 2px 3px;
                    border-radius: 4px;
                    font-size: 14px;
                    font-family: GothamRounded-Medium, GothamRounded;
                    font-weight: 500;
                    color: #ffffff;
                    line-height: 17px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    white-space: nowrap;
                  }
                  .top-breed {
                    margin-top: 8px;
                    font-size: 12px;
                    font-family: GothamRounded-Book, GothamRounded;
                    font-weight: normal;
                    color: #ffffff;
                    line-height: 14px;
                    opacity: 0.48;
                  }
                  .top-ce {
                    margin-top: 10px;
                    display: flex;
                    align-items: center;
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
                  }
                  .mid-egg {
                    position: relative;
                    width: 197px;
                    height: 177px;
                    .egg-img {
                      display: flex;
                      justify-content: center;
                      img {
                        width: calc(602px * 0.3);
                        height: calc(536px * 0.3);
                      }
                      .lottie {
                        width: 200px;
                        height: 220px;
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
                    .mid-bottom-btn {
                      width: 108px;
                      height: 32px;
                      border-radius: 25px;
                      border: 1px solid #ffc763;
                      font-size: 16px;
                      font-family: GothamRounded-Medium, GothamRounded;
                      font-weight: 500;
                      color: #ffc763;
                      line-height: 19px;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                    }

                    .mid-bottom-fh {
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      img {
                        width: calc(28px * 0.7);
                        height: calc(28px * 0.7);
                      }
                    }
                    .mid-bottom-number {
                      margin-left: 8px;
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
                      top: 0px;
                      left: 0px;
                      img {
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
                      justify-content: center;
                      align-items: center;
                      img {
                        width: calc(28px * 0.7);
                        height: calc(28px * 0.7);
                      }
                    }
                    .mid-bottom-number {
                      margin-left: 8px;
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
                  .dragon-lock {
                    display: flex;
                    justify-content: center;
                    margin-top: 10px;
                    font-size: 12px;
                    font-family: GothamRounded-Book, GothamRounded;
                    font-weight: normal;
                    color: rgba(255, 255, 255, 0.48);
                  }
                  .dragon-lock-status {
                    opacity: 0.48;
                  }
                }
                .item-status4 {
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
                      top: 0px;
                      left: 0px;
                      img {
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
                      justify-content: center;
                      align-items: center;
                      img {
                        width: calc(28px * 0.7);
                        height: calc(28px * 0.7);
                      }
                    }
                    .mid-bottom-number {
                      margin-left: 3px;
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
            }
          }
          .create-selete-img {
            // visibility: hidden;
            position: absolute;
            z-index: -10000;
            top: -2000px;
            left: 0;
          }
        }
      }
      .menu-content-wrap2 {
        .wrap-top {
          margin-top: 21px;
        }
        .wrap-bottoom {
          margin-top: 16px;
          .wrap {
            display: flex;
            flex-wrap: wrap;
          }
        }
        .noData-wrap {
          display: flex;
          flex-direction: column;

          align-items: center;
          margin-top: 115px;
          .no-dragon {
            img {
              width: 248px;
              height: 248px;
            }
          }
          .no-data-title {
            margin-top: 8px;
            font-size: 24px;
            font-family: GothamRounded-Medium, GothamRounded;
            font-weight: 500;
            color: #ffffff;
            line-height: 29px;
            opacity: 0.48;
          }
          .no-data-des {
            margin-top: 8px;
            width: 299px;
            height: 48px;
            font-size: 16px;
            font-family: GothamRounded-Book, GothamRounded;
            font-weight: normal;
            color: #ffffff;
            line-height: 24px;
            opacity: 0.48;
            text-align: center;
          }
        }
      }
    }
  }
}
</style>
