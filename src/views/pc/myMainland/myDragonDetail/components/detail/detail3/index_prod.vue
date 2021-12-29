<template>
  <div
    class="wrap3"
    v-if="dragonDetail.status == 2 && dragonDetail.lockStatus != 3"
  >
    <div class="left">
      <div class="top">
        <div class="top-wrap" @click="back">
          <div class="back-btn">
            <img src="@/assets/imgs/myMainland/myDragon/back.png" alt="" />
          </div>
          <div class="back-text">Back</div>
        </div>
      </div>
      <div class="detail-color">
        <div
          class="color-wrap"
          :class="'top-color-status' + dragonLocalTypeList[dragonDetail.clazz]"
        >
          # {{ dragonDetail.no }}
        </div>
        <div class="color-genesis" v-if="dragonDetail.no <= 10000">Genesis</div>
        <!-- <div v-if="dragonAddress == myAddress && dragonDetail.lockStatus == 0" class="seng-dragon" @click="sendDragon">
          <img src="@/assets/imgs/myMainland/dragonDetail/send.png" alt="" />
          <div class="send-dragon-text">Transfer</div>
        </div> -->
      </div>
      <div class="tetail-title">
        <div class="title-name">Dragon</div>
        <div class="title-color"># {{ dragonDetail.no }}</div>
        <div
          class="dragon-my-btn"
          v-if="dragonAddress == myAddress && dragonDetail.lockStatus == 0"
        >
          <div class="btn-wrap">
            <div
              class="item-btn select-bc-hover"
              @click="sendDragon"
              @mouseenter="tipList[0].show = true"
              @mouseleave="tipList[0].show = false"
            >
              <img
                src="@/assets/imgs/myMainland/dragonDetail/dragon-my-btn/gift.png"
                alt=""
              />
              <PopupMsg
                class="right-img-msg"
                :showPopop="tipList[0].show"
                :msgList="tipList[0].text"
                :showIndex="false"
              />
            </div>
            <div
              class="item-btn select-bc-hover"
              @click="breed(dragonDetail, myAddress)"
              @mouseenter="tipList[1].show = true"
              @mouseleave="tipList[1].show = false"
            >
              <img
                src="@/assets/imgs/myMainland/dragonDetail/dragon-my-btn/hearts.png"
                alt=""
              />
              <PopupMsg
                class="right-img-msg"
                :showPopop="tipList[1].show"
                :msgList="tipList[1].text"
                :showIndex="false"
              />
            </div>
            <div
              class="item-btn select-bc-hover"
              @click="absorption(dragonDetail)"
              @mouseenter="tipList[2].show = true"
              @mouseleave="tipList[2].show = false"
            >
              <img
                src="@/assets/imgs/myMainland/dragonDetail/dragon-my-btn/absorption.png"
                alt=""
              />

              <PopupMsg
                class="right-img-msg"
                :showPopop="tipList[2].show"
                :msgList="tipList[2].text"
                :showIndex="false"
              />
            </div>

            <div
              v-if="false"
              class="item-btn select-bc-hover"
              @click="devouring(dragonDetail, myAddress)"
              @mouseenter="tipList[3].show = true"
              @mouseleave="tipList[3].show = false"
            >
              <img
                src="@/assets/imgs/myMainland/dragonDetail/dragon-my-btn/devouring.png"
                alt=""
              />

              <PopupMsg
                class="right-img-msg"
                :showPopop="tipList[3].show"
                :msgList="tipList[3].text"
                :showIndex="false"
              />
            </div>

            <!-- <div class="item-btn">
              <img
                src="@/assets/imgs/myMainland/dragonDetail/dragon-my-btn/stake.png"
                alt=""
              />
            </div> -->
          </div>
        </div>
      </div>
      <div class="detail-talent" v-if="false">
        <div class="title">Talent:</div>
        <div class="value" v-if="dragonDetail.talent.level - 1 > 0">
          <div
            class="item"
            v-for="(item, index) in dragonDetail.talent.level - 1"
            :key="index"
          >
            <img
              src="@/assets/imgs/myMainland/dragonDetail/five-star.png"
              alt=""
            />
          </div>
        </div>
        <div class="value" v-else>
          <div class="item">
            <img
              src="@/assets/imgs/myMainland/dragonDetail/five-star-empty.png"
              alt=""
            />
          </div>
        </div>
      </div>
      <div class="mid-wrap">
        <div class="mid-egg">
          <!-- <img
                class="egg-img"
                :src="dragonEggImgHandle(dragonDetail.clazz)"
                alt=""
              /> -->
          <div class="egg-img">
            <dragonCreate
              ref="dragonCreate"
              :dragonImgEye="createDragon(dragonDetail.parts[0])"
              :dragonImgWing="createDragon(dragonDetail.parts[4])"
              :dragonImgHorn="createDragon(dragonDetail.parts[2])"
              :dragonImgBody="createDragon(dragonDetail.parts[6])"
              :dragonImgTotems="createDragon(dragonDetail.parts[1])"
              :dragonImgEar="createDragon(dragonDetail.parts[3])"
              :dragonImgTail="createDragon(dragonDetail.parts[5])"
            ></dragonCreate>
          </div>
          <!-- <img
                class="egg-bottom-img"
                src="@/assets/imgs/myMainland/myDragon/egg-bottom.png"
                alt=""
              /> -->
        </div>
        <!-- <div class="mid-egg-bottom">
            
            </div> -->
        <div class="mid-egg-bottom-stone">
          <img
            src="@/assets/imgs/myMainland/myDragon/egg-bottom-stone.png"
            alt=""
          />
        </div>
      </div>
      <!-- $process_env === 'production' -->
      <div class="btns-wrap-main" v-if="dragonAddress == myAddress">
        <div class="mid-des" v-if="$process_env === 'false'">
          <div v-if="dragonDetail.lockStatus != 2">
            * The marketplace will be open for trading soon, so stay tuned !
          </div>
          <div class="btn-wraps-lock" v-else>
            <div class="lock-text">Staking in progress…</div>
            <div class="lock-list-btn">
              <div class="btn" @click="goMiningCamp">View the lists</div>
            </div>
          </div>
        </div>
        <div v-else class="bottom">
          <div class="btn-wraps" v-if="dragonDetail.lockStatus != 2">
            <!-- <div
              v-if="dragonAddress == myAddress && dragonDetail.lockStatus == 0"
              class="bottom-bottom-text-breed hover-select"
              @click="breed(dragonDetail, myAddress)"
            >
              <img
                src="@/assets/imgs/myMainland/dragonDetail/breed.png"
                alt=""
              />
              <div class="btn-text">Breed</div>
            </div> -->

            <div
              v-if="dragonAddress == myAddress"
              class="bottom-bottom-text-sell hover-select"
              @click="upDragon"
            >
              <img
                src="@/assets/imgs/myMainland/dragonDetail/sell.png"
                alt=""
              />
              <div class="btn-text">Sell</div>
            </div>
            <!-- <div class="bottom-bottom-text-breed">
            <img
              src="@/assets/imgs/myMainland/dragonDetail/mining.png"
              alt=""
            />
            <div class="btn-text">Mining</div>
          </div> -->
          </div>

          <div class="btn-wraps-lock" v-else>
            <div class="lock-text">Staking in progress…</div>
            <div class="lock-list-btn">
              <div class="btn" @click="goMiningCamp">View the lists</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="right-wrap">
        <div class="right-about">
          <div class="title">About</div>
          <div class="about-content">
            <div class="about-content-wrap">
              <div class="about-top">
                <div class="about-left">
                  <div class="about-left-top">Class</div>
                  <div class="about-left-bottom">
                    <div class="left-bottom-img">
                      <img
                        :src="dragonClazzImgHandle(dragonDetail.clazz)"
                        alt=""
                      />
                    </div>
                    <div class="left-bottom-text">
                      {{ dragonLocalTypeName[dragonDetail.clazz] }} Dragon
                    </div>
                  </div>
                </div>
                <div class="about-mid">
                  <div class="about-mid-top">Breed count</div>
                  <div class="about-mid-bottom">
                    {{ dragonDetail.breedCount }}/7
                  </div>
                </div>
                <div class="about-right">
                  <div class="about-right-top">CE</div>
                  <div class="about-right-bottom">
                    {{ dragonDetail.ce }}
                  </div>
                </div>
              </div>
              <div class="right-about-bottom">
                <div class="title">Owner</div>
                <div class="address">
                  {{ myAddress }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="right-status">
          <div class="title">
            Stats
            <div class="title-des-tip">
              Number of times absorbed ({{ absorptionTime || 0 }}/3)
            </div>
          </div>
          <div class="content">
            <div class="content-wrap">
              <div class="status-item">
                <div class="status-top">Health</div>
                <div class="status-bottom">
                  <img
                    src="@/assets/imgs/myMainland/stats/heatthy.png"
                    alt=""
                  />
                  <div class="text">{{ dragonDetail.health }}</div>
                </div>
              </div>
              <div class="status-item">
                <div class="status-top">Attack</div>
                <div class="status-bottom">
                  <img src="@/assets/imgs/myMainland/stats/attack.png" alt="" />
                  <div class="text">{{ dragonDetail.attack }}</div>
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
                </div>
              </div>
              <div class="status-item">
                <div class="status-top">Speed</div>
                <div class="status-bottom">
                  <img src="@/assets/imgs/myMainland/stats/speed.png" alt="" />
                  <div class="text">{{ dragonDetail.speed }}</div>
                </div>
              </div>
              <div class="status-item">
                <div class="status-top">LifeForce</div>
                <div class="status-bottom">
                  <img src="@/assets/imgs/myMainland/stats/spirit.png" alt="" />
                  <div class="text">{{ dragonDetail.intellect }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="right-parts">
          <div class="title">Body parts</div>
          <div class="content">
            <div class="content-wrap">
              <div class="item">
                <div class="item-img">
                  <img :src="createDragonPart(dragonDetail.parts[0])" alt="" />
                </div>
                <div class="item-text">
                  <div class="item-text-top">
                    {{ dragonDetail.parts[0].dnaNameEn }}
                  </div>
                  <div
                    class="item-text-bottom1"
                    v-if="dragonDetail.parts[0].mutation == 1"
                  >
                    (Rare)
                  </div>
                  <div
                    class="item-text-bottom2"
                    v-if="dragonDetail.parts[0].mutation == 2"
                  >
                    (Mystic)
                  </div>
                  <div
                    class="item-text-bottom3"
                    v-if="dragonDetail.parts[0].mutation < 0"
                  >
                    (Negative Mutation)
                  </div>
                </div>
              </div>
              <div class="item">
                <div class="item-img">
                  <img :src="createDragonPart(dragonDetail.parts[3])" alt="" />
                </div>
                <div class="item-text">
                  <div class="item-text-top">
                    {{ dragonDetail.parts[3].dnaNameEn }}
                  </div>
                  <div
                    class="item-text-bottom1"
                    v-if="dragonDetail.parts[3].mutation == 1"
                  >
                    (Rare)
                  </div>
                  <div
                    class="item-text-bottom2"
                    v-if="dragonDetail.parts[3].mutation == 2"
                  >
                    (Mystic)
                  </div>
                  <div
                    class="item-text-bottom3"
                    v-if="dragonDetail.parts[3].mutation < 0"
                  >
                    (Negative Mutation)
                  </div>
                </div>
              </div>
              <div class="item">
                <div class="item-img">
                  <img :src="createDragonPart(dragonDetail.parts[2])" alt="" />
                </div>
                <div class="item-text">
                  <div class="item-text-top">
                    {{ dragonDetail.parts[2].dnaNameEn }}
                  </div>
                  <div
                    class="item-text-bottom1"
                    v-if="dragonDetail.parts[2].mutation == 1"
                  >
                    (Rare)
                  </div>
                  <div
                    class="item-text-bottom2"
                    v-if="dragonDetail.parts[2].mutation == 2"
                  >
                    (Mystic)
                  </div>
                  <div
                    class="item-text-bottom3"
                    v-if="dragonDetail.parts[2].mutation < 0"
                  >
                    (Negative Mutation)
                  </div>
                </div>
              </div>
              <div class="item">
                <div class="item-img">
                  <img :src="createDragonPart(dragonDetail.parts[4])" alt="" />
                </div>
                <div class="item-text">
                  <div class="item-text-top">
                    {{ dragonDetail.parts[4].dnaNameEn }}
                  </div>
                  <div
                    class="item-text-bottom1"
                    v-if="dragonDetail.parts[4].mutation == 1"
                  >
                    (Rare)
                  </div>
                  <div
                    class="item-text-bottom2"
                    v-if="dragonDetail.parts[4].mutation == 2"
                  >
                    (Mystic)
                  </div>
                  <div
                    class="item-text-bottom3"
                    v-if="dragonDetail.parts[4].mutation < 0"
                  >
                    (Negative Mutation)
                  </div>
                </div>
              </div>
              <div class="item">
                <div class="item-img">
                  <img :src="createDragonPart(dragonDetail.parts[1])" alt="" />
                </div>
                <div class="item-text">
                  <div class="item-text-top">
                    {{ dragonDetail.parts[1].dnaNameEn }}
                  </div>
                  <div
                    class="item-text-bottom1"
                    v-if="dragonDetail.parts[1].mutation == 1"
                  >
                    (Rare)
                  </div>
                  <div
                    class="item-text-bottom2"
                    v-if="dragonDetail.parts[1].mutation == 2"
                  >
                    (Mystic)
                  </div>
                  <div
                    class="item-text-bottom3"
                    v-if="dragonDetail.parts[1].mutation < 0"
                  >
                    (Negative Mutation)
                  </div>
                </div>
              </div>
              <div class="item">
                <div class="item-img">
                  <img :src="createDragonPart(dragonDetail.parts[5])" alt="" />
                </div>
                <div class="item-text">
                  <div class="item-text-top">
                    {{ dragonDetail.parts[5].dnaNameEn }}
                  </div>
                  <div
                    class="item-text-bottom1"
                    v-if="dragonDetail.parts[5].mutation == 1"
                  >
                    (Rare)
                  </div>
                  <div
                    class="item-text-bottom2"
                    v-if="dragonDetail.parts[5].mutation == 2"
                  >
                    (Mystic)
                  </div>
                  <div
                    class="item-text-bottom3"
                    v-if="dragonDetail.parts[5].mutation < 0"
                  >
                    (Negative Mutation)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="right-takeIn-history"
          v-if="absorptionRecordList.length > 0"
        >
          <div class="title">
            Develop history
            <div
              class="title-des-tip"
              v-if="absorptionRecordList[0].status == 1"
            >
              (The dragon has a pending order)
            </div>
          </div>
          <div class="about-content">
            <div class="about-content-wrap">
              <div class="history-item-wrap-top">
                <div class="history-left">
                  <div class="history-item-top">Operator</div>
                </div>
                <div class="history-mid">
                  <div class="history-item-top">Time</div>
                </div>
                <div class="history-mid2">
                  <div class="history-item-top">Type</div>
                </div>
                <div class="history-right">
                  <div class="history-item-top">Event</div>
                </div>
              </div>
            </div>
            <div class="about-content-wrap">
              <div
                class="history-item"
                v-for="(item, index) in absorptionRecordList"
                :key="index"
              >
                <div class="history-left">
                  <div class="history-item-bottom">
                    {{ item.address || "--" }}
                  </div>
                </div>
                <div class="history-mid">
                  <div class="history-item-bottom">
                    {{ Moment(item.createTime).utc(0).format("YYYY.MM.DD") }}
                  </div>
                </div>
                <div class="history-mid2">
                  <div class="history-item-bottom">Skull Absorption</div>
                </div>
                <div class="history-right">
                  <div v-if="item.status == 1" class="history-item-bottom">
                    To be absorbed
                  </div>
                  <div v-if="item.status == 2" class="history-item-bottom">
                    <img :src="absorbedTypeImg(item.attributeType)" alt="" />
                    + {{ item.attributeVal }}
                  </div>
                  <div v-if="item.status == 3" class="history-item-bottom">
                    Have cancelled
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- page -->
          <page
            v-if="takeInPageInfo.totalPages > 1"
            :pageInfo="takeInPageInfo"
            @leftPage="takeInLeftPage"
            @rightPage="takeInRightPage"
            @search="takeInSearch"
          ></page>
        </div>

        <div class="right-skill">
          <div class="title">Skills</div>
          <div class="content">
            <div class="content-wrap">
              <div class="item">
                <!-- <img
                  src="@/assets/imgs/myMainland/dragonDetail/skill-bc.png"
                  alt=""
                /> -->
                <skill-item :item="dragonDetail.skillNo1"></skill-item>
              </div>
              <div class="item">
                <!-- <img
                  src="@/assets/imgs/myMainland/dragonDetail/skill-bc.png"
                  alt=""
                /> -->
                <skill-item :item="dragonDetail.skillNo2"></skill-item>
              </div>
              <div class="item">
                <!-- <img
                  src="@/assets/imgs/myMainland/dragonDetail/skill-bc.png"
                  alt=""
                /> -->
                <skill-item :item="dragonDetail.skillNo3"></skill-item>
              </div>
              <div class="item">
                <!-- <img
                  src="@/assets/imgs/myMainland/dragonDetail/skill-bc.png"
                  alt=""
                /> -->
                <skill-item :item="dragonDetail.skillNo4"></skill-item>
              </div>
            </div>
          </div>
        </div>

        <div
          class="right-parents"
          v-if="!!dragonDetail.fatherDetail && !!dragonDetail.motherDetail"
        >
          <div class="title">Parents</div>
          <div class="content">
            <div class="content-wrap">
              <div class="wrap-item">
                <div
                  class="item"
                  @click="goParentDetail(dragonDetail.fatherDetail)"
                >
                  <div class="parent-wrap">
                    <div class="top">
                      <div
                        class="color-wrap"
                        :class="
                          'top-color-status' +
                          dragonLocalTypeList[dragonDetail.fatherDetail.clazz]
                        "
                      >
                        # {{ dragonDetail.fatherDetail.no }}
                      </div>
                    </div>
                    <div class="breed">
                      Breed count: {{ dragonDetail.fatherDetail.breedCount }}
                    </div>
                    <div class="ce">
                      <div class="top-ce">
                        <div class="top-ce-img">
                          <img
                            :src="
                              dragonClazzImgHandle(
                                dragonDetail.fatherDetail.clazz
                              )
                            "
                            alt=""
                          />
                        </div>

                        <!-- <div class="top-ce-des">CE: {{ dragonDetail.ce }}</div> -->
                      </div>
                    </div>
                    <div class="dragon">
                      <dragonCreateParent
                        ref="dragonCreateParent"
                        :dragonImgEye="
                          createDragon(dragonDetail.fatherDetail.parts[0])
                        "
                        :dragonImgWing="
                          createDragon(dragonDetail.fatherDetail.parts[4])
                        "
                        :dragonImgHorn="
                          createDragon(dragonDetail.fatherDetail.parts[2])
                        "
                        :dragonImgBody="
                          createDragon(dragonDetail.fatherDetail.parts[6])
                        "
                        :dragonImgTotems="
                          createDragon(dragonDetail.fatherDetail.parts[1])
                        "
                        :dragonImgEar="
                          createDragon(dragonDetail.fatherDetail.parts[3])
                        "
                        :dragonImgTail="
                          createDragon(dragonDetail.fatherDetail.parts[5])
                        "
                      ></dragonCreateParent>
                    </div>
                  </div>
                </div>
                <div
                  class="item"
                  @click="goParentDetail(dragonDetail.motherDetail)"
                >
                  <div class="parent-wrap">
                    <div class="top">
                      <div
                        class="color-wrap"
                        :class="
                          'top-color-status' +
                          dragonLocalTypeList[dragonDetail.motherDetail.clazz]
                        "
                      >
                        # {{ dragonDetail.motherDetail.no }}
                      </div>
                    </div>
                    <div class="breed">
                      Breed count: {{ dragonDetail.motherDetail.breedCount }}
                    </div>
                    <div class="ce">
                      <div class="top-ce">
                        <div class="top-ce-img">
                          <img
                            :src="
                              dragonClazzImgHandle(
                                dragonDetail.motherDetail.clazz
                              )
                            "
                            alt=""
                          />
                        </div>

                        <!-- <div class="top-ce-des">CE: {{ dragonDetail.ce }}</div> -->
                      </div>
                    </div>
                    <div class="dragon">
                      <dragonCreateParent
                        ref="dragonCreateParent"
                        :dragonImgEye="
                          createDragon(dragonDetail.motherDetail.parts[0])
                        "
                        :dragonImgWing="
                          createDragon(dragonDetail.motherDetail.parts[4])
                        "
                        :dragonImgHorn="
                          createDragon(dragonDetail.motherDetail.parts[2])
                        "
                        :dragonImgBody="
                          createDragon(dragonDetail.motherDetail.parts[6])
                        "
                        :dragonImgTotems="
                          createDragon(dragonDetail.motherDetail.parts[1])
                        "
                        :dragonImgEar="
                          createDragon(dragonDetail.motherDetail.parts[3])
                        "
                        :dragonImgTail="
                          createDragon(dragonDetail.motherDetail.parts[5])
                        "
                      ></dragonCreateParent>
                    </div>
                  </div>
                </div>
              </div>
              <!-- <div v-else class="no-data">No data</div> -->
            </div>
          </div>
        </div>

        <div
          class="right-childrens"
          v-if="dragonDetail.family && dragonDetail.family.length > 0"
        >
          <div class="title">Children</div>
          <div class="content">
            <div class="content-wrap">
              <div class="wrap-item">
                <div
                  class="item"
                  v-for="(item, index) in dragonDetail.family"
                  :key="index"
                  @click="goParentDetail(item)"
                >
                  <div class="parent-wrap">
                    <div class="top">
                      <div
                        class="color-wrap"
                        :class="
                          'top-color-status' + dragonLocalTypeList[item.clazz]
                        "
                      >
                        # {{ item.no }}
                      </div>
                    </div>
                    <div class="breed">Breed count: {{ item.breedCount }}</div>
                    <div class="ce">
                      <div class="top-ce">
                        <div class="top-ce-img">
                          <img :src="dragonClazzImgHandle(item.clazz)" alt="" />
                        </div>
                      </div>
                    </div>
                    <div class="dragon">
                      <dragonCreateParent
                        v-if="item.status == 2"
                        ref="dragonCreateParent"
                        :dragonImgEye="createDragon(item.parts[0])"
                        :dragonImgWing="createDragon(item.parts[4])"
                        :dragonImgHorn="createDragon(item.parts[2])"
                        :dragonImgBody="createDragon(item.parts[6])"
                        :dragonImgTotems="createDragon(item.parts[1])"
                        :dragonImgEar="createDragon(item.parts[3])"
                        :dragonImgTail="createDragon(item.parts[5])"
                      ></dragonCreateParent>
                      <img
                        v-if="item.status == 1"
                        class="dragon-egg-img"
                        :src="dragonEggImgHandle(item.clazz)"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, toRefs } from "vue";
import { useRouter } from "vue-router";
import common from "@/utils/common";
import myDragonDetail from "@/views/pc/myMainland/use/myDragonDetail";
import myDragon from "@/views/pc/myMainland/use/myDragon";
import breedHandle from "@/views/pc/myMainland/use/breed";
import absorptionHandle from "@/views/pc/myMainland/use/absorption";
import devouringHandle from "@/views/pc/myMainland/use/devouring";
import sellBox from "@/components/modalBox/marketPlace/sellBox/index.vue";
import dragonCreate from "../../../../components/dragonCreate/indexCreateDetail.vue";
import dragonCreateParent from "../../../../components/dragonCreate/indexCreateParent.vue";
import indexCreateUpload from "../../../../components/dragonCreate/indexCreateUpload.vue";
import lottie from "vue-lottie/src/lottie.vue";
import skillItem from "../components/skill/skill-item.vue";
import Moment from "moment";
import PopupMsg from "@/components/popup/dragon-opt-tip.vue";
import page from "@/components/page/index.vue";
export default {
  name: "detail1",
  components: {
    dragonCreate,
    indexCreateUpload,
    dragonCreateParent,
    lottie,
    sellBox,
    skillItem,
    PopupMsg,
    page,
  },
  setup() {
    const router = useRouter();
    const state = reactive({});
    const {
      dragonEggImgHandle,
      myDragonState,
      createDragon,
      createDragonPart,
      dragonClazzImgHandle,
    } = myDragon();
    const {
      myDragonDetailState,
      init,
      back,
      openDradonEgg,
      handleAnimation,
      sendDragon,
      upDragon,
      goMiningCamp,
      goParentDetail,
      absorbedTypeImg,
      takeInLeftPage,
      takeInRightPage,
      takeInSearch,
    } = myDragonDetail();
    const { breedState, breed } = breedHandle();
    const { absorptionState, absorption } = absorptionHandle();
    const { devouringState, devouring } = devouringHandle();
    onMounted(() => {
      common.goTopScroll();
    });

    return {
      ...toRefs(state),
      ...toRefs(myDragonState),
      ...toRefs(myDragonDetailState),
      dragonEggImgHandle,
      back,
      openDradonEgg,
      createDragon,
      createDragonPart,
      handleAnimation,
      handleAnimation,
      dragonClazzImgHandle,
      sendDragon,
      upDragon,
      goMiningCamp,
      breed,
      goParentDetail,
      absorption,
      Moment,
      absorbedTypeImg,
      takeInLeftPage,
      takeInRightPage,
      takeInSearch,
      devouring,
    };
  },
};
</script>

<style lang="less" scoped >
.wrap3 {
  display: flex;
  justify-content: space-between;
  width: 1200px;
  margin-top: 30px;
  .left {
    width: 463px;

    .top {
      display: flex;
      align-items: center;
      .top-wrap {
        display: flex;
        align-items: center;
        cursor: pointer;
        .back-btn {
          display: flex;
          align-items: center;
          img {
            width: calc(48px * 0.5);
            height: calc(48px * 0.5);
          }
        }
        .back-text {
          display: flex;
          align-items: center;
          margin-left: 4px;
          font-size: 14px;
          font-family: GothamRounded-Medium, GothamRounded;
          font-weight: 500;
          color: #ffffff;
        }
      }
    }
    .detail-color {
      margin-top: 29px;
      display: flex;
      align-items: center;
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
      .color-genesis {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 8px;
        width: 71px;
        height: 20px;
        background: #8247d5;
        border-radius: 4px;
        font-size: 14px;
        font-family: GothamRounded-Medium, GothamRounded;
        font-weight: 500;
        color: #ffffff;
      }
      .seng-dragon {
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
        img {
          width: 20px;
          height: 20px;
        }
        .send-dragon-text {
          margin-left: 9px;
        }
      }
    }
    .tetail-title {
      margin-top: 16px;
      display: flex;
      align-items: center;
      .title-name {
        font-size: 28px;
        font-family: GothamRounded-Medium, GothamRounded;
        font-weight: 500;
        color: #ffffff;
      }
      .title-color {
        margin-left: 10px;
        font-size: 28px;
        font-family: GothamRounded-Medium, GothamRounded;
        font-weight: 500;
        color: #ffffff;
      }
    }
    .detail-talent {
      display: flex;
      align-items: center;
      margin-top: 12px;
      .title {
        font-size: 16px;
        font-family: GothamRounded-Book, GothamRounded;
        font-weight: normal;
        color: #ffffff;
        opacity: 0.48;
      }
      .value {
        margin-left: 10px;
        display: flex;
        align-items: center;
        .item {
          margin-right: 5px;

          img {
            width: 14px;
            height: 14px;
          }
        }
      }
    }
    .mid-wrap {
      width: 100%;
      height: 488px;
      position: relative;
      // background-color: #ff5400;
      .mid-egg {
        width: 100%;
        position: absolute;
        top: 30px;
        left: 50%;
        transform: translateX(-50%);
        animation: eggMove 2s infinite alternate;
        -webkit-animation: eggMove 2s infinite alternate;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        z-index: 500;
        .egg-img {
          // position: relative;
          // z-index: 10000;
          width: 300px;
          height: 300px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .egg-bottom-img {
          margin-top: -170px;
          width: calc(488px * 0.7);
          height: calc(365px * 0.7);
        }
      }

      .mid-egg-bottom-stone {
        position: absolute;
        top: 180px;
        left: 50%;
        transform: translateX(-50%);
        img {
          width: calc(463px * 1);
          height: calc(239px * 1);
        }
      }
    }
    .mid-des {
      text-align: center;
      width: 388px;
      height: 48px;
      font-size: 16px;
      font-family: GothamRounded-Book, GothamRounded;
      font-weight: normal;
      color: #ffffff;
      line-height: 24px;
      // opacity: 0.48;
      margin: 0 auto;
      .btn-wraps-lock {
        .lock-text {
          font-size: 16px;
          font-family: GothamRounded-Medium, GothamRounded;
          font-weight: 500;
          color: #ffffff;
        }
        .lock-list-btn {
          margin-top: 24px;
          display: flex;
          justify-content: center;
          align-items: center;
          .btn {
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 154px;
            height: 50px;
            border-radius: 25px;
            border: 1px solid #ffc763;
            font-size: 16px;
            font-family: GothamRounded-Medium, GothamRounded;
            font-weight: 500;
            color: #ffc763;
          }
        }
      }
    }
    .bottom {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: -50px;
      .bottom-top-text {
        font-size: 24px;
        font-family: GothamRounded-Book, GothamRounded;
        font-weight: normal;
        color: #ffffff;
        display: flex;
        align-items: center;
        .top-text {
          display: flex;
          flex-direction: column;
          font-size: 14px;
        }
        .top-price {
          margin-left: 10px;
          font-size: 18px;
        }
      }
      .bottom-mid-text {
        font-size: 16px;
        font-family: GothamRounded-Book, GothamRounded;
        font-weight: normal;
        color: #ffffff;
        opacity: 0.48;
        margin-top: 8px;
      }
      .btn-wraps {
        display: flex;
        align-items: center;
        position: relative;
        z-index: 999;
        .bottom-bottom-text-sell {
          margin-left: 20px;
          width: 154px;
          height: 50px;
          background: #ffc763;
          border-radius: 25px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 24px;
          cursor: pointer;
          border: 1px solid #ffc763;
          img {
            width: 19px;
            height: 18px;
          }
          .btn-text {
            margin-left: 8px;
            font-size: 16px;
            font-family: GothamRounded-Medium, GothamRounded;
            font-weight: 500;
            color: #2e0b00;
          }
        }
        .bottom-bottom-text-breed {
          margin-left: 8px;
          width: 154px;
          height: 50px;
          background: #282523;
          border-radius: 25px;
          border: 1px solid rgba(255, 255, 255, 0.28);
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 24px;
          cursor: pointer;
          img {
            width: 20px;
            height: 20px;
          }
          .btn-text {
            margin-left: 8px;
            font-size: 16px;
            font-family: GothamRounded-Medium, GothamRounded;
            font-weight: 500;
            color: #ffffff;
          }
        }
        .bottom-bottom-text-mining {
          margin-left: 8px;
          width: 110px;
          height: 50px;
          background: #282523;
          border-radius: 25px;
          border: 1px solid rgba(255, 255, 255, 0.28);
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 24px;
          cursor: pointer;
          img {
            width: 25px;
            height: 24px;
          }
          .btn-text {
            margin-left: 8px;
            font-size: 16px;
            font-family: GothamRounded-Medium, GothamRounded;
            font-weight: 500;
            color: #ffffff;
          }
        }
      }
      .btn-wraps-lock {
        .lock-text {
          font-size: 16px;
          font-family: GothamRounded-Medium, GothamRounded;
          font-weight: 500;
          color: #ffffff;
        }
        .lock-list-btn {
          margin-top: 24px;
          .btn {
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 154px;
            height: 50px;
            border-radius: 25px;
            border: 1px solid #ffc763;
            font-size: 16px;
            font-family: GothamRounded-Medium, GothamRounded;
            font-weight: 500;
            color: #ffc763;
          }
        }
      }
    }
  }
  .right {
    width: 737px;
    height: 700px;
    min-height: 700px;
    overflow-y: scroll;
    .right-wrap {
      // height: 1000px;
      // overflow-y: scroll;
      margin-left: 126px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      // background-color: #ff5400;
      .right-about {
        .title {
          font-size: 20px;
          font-family: GothamRounded-Medium, GothamRounded;
          font-weight: 500;
          color: #ffffff;
        }
        .about-content {
          width: 591px;
          height: 190px;
          background: #282523;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          margin-top: 16px;
          .about-content-wrap {
            padding: 24px 32px;
            .about-top {
              display: flex;
              // justify-content: space-between;
              .about-left {
                .about-left-top {
                  font-size: 16px;
                  font-family: GothamRounded-Book, GothamRounded;
                  font-weight: normal;
                  color: #ffffff;
                  opacity: 0.48;
                }
                .about-left-bottom {
                  margin-top: 8px;
                  display: flex;
                  align-items: center;
                  .left-bottom-img {
                    margin-left: -10px;
                    img {
                      width: 32px;
                      height: 32px;
                    }
                  }
                  .left-bottom-text {
                    font-size: 14px;
                    font-family: GothamRounded-Medium, GothamRounded;
                    font-weight: 500;
                    color: #ffffff;
                    white-space: nowrap;
                  }
                }
              }
              .about-mid {
                margin-left: 100px;
                .about-mid-top {
                  font-size: 16px;
                  font-family: GothamRounded-Book, GothamRounded;
                  font-weight: normal;
                  color: #ffffff;
                  opacity: 0.48;
                  white-space: nowrap;
                }
                .about-mid-bottom {
                  display: flex;
                  align-items: center;
                  height: 32px;
                  margin-top: 8px;
                  font-size: 14px;
                  font-family: GothamRounded-Medium, GothamRounded;
                  font-weight: 500;
                  color: #ffffff;
                }
              }
              .about-right {
                margin-left: 100px;
                .about-right-top {
                  font-size: 16px;
                  font-family: GothamRounded-Book, GothamRounded;
                  font-weight: normal;
                  color: #ffffff;
                  opacity: 0.48;
                }
                .about-right-bottom {
                  display: flex;
                  align-items: center;
                  height: 32px;
                  margin-top: 8px;
                  font-size: 14px;
                  font-family: GothamRounded-Medium, GothamRounded;
                  font-weight: 500;
                  color: #ffffff;
                }
              }
            }
            .right-about-bottom {
              margin-top: 32px;
              .title {
                font-size: 16px;
                font-family: GothamRounded-Book, GothamRounded;
                font-weight: normal;
                color: #ffffff;
                opacity: 0.48;
              }
              .address {
                margin-top: 8px;
                font-size: 14px;
                font-family: GothamRounded-Medium, GothamRounded;
                font-weight: 500;
                color: #ffffff;
              }
            }
          }
        }
      }
      .right-status {
        margin-top: 40px;
        .title {
          font-size: 20px;
          font-family: GothamRounded-Medium, GothamRounded;
          font-weight: 500;
          color: #ffffff;
          display: flex;
          //align-items: center;
          .title-des-tip {
            display: flex;
            align-items: flex-end;
            margin-left: 10px;
            font-size: 16px;
            font-family: GothamRounded;
            color: rgba(255, 255, 255, 0.48);
          }
        }
        .content {
          width: 591px;
          height: 92px;
          background: #282523;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          margin-top: 16px;
          .content-wrap {
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
                  margin-left: 10px;
                  font-size: 20px;
                  font-family: GothamRounded-Medium, GothamRounded;
                  font-weight: 500;
                  color: #ffffff;
                }
              }
            }
          }
        }
      }
      .right-parts {
        margin-top: 40px;
        .title {
          font-size: 20px;
          font-family: GothamRounded-Medium, GothamRounded;
          font-weight: 500;
          color: #ffffff;
        }
        .content {
          width: 591px;
          min-height: 141px;
          background: #282523;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          margin-top: 16px;
          .content-wrap {
            padding: 24px 32px 0 32px;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            .item {
              display: flex;
              align-items: center;
              justify-content: flex-start;
              width: 33%;
              margin-bottom: 32px;

              .item-img {
                width: calc(80px * 0.5);
                height: calc(80px * 0.5);
                img {
                  width: calc(80px * 0.5);
                  height: calc(80px * 0.5);
                }
              }
              .item-text {
                margin-left: 8px;
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                .item-text-top {
                  font-size: 12px;
                  font-family: GothamRounded-Medium, GothamRounded;
                  font-weight: 500;
                  color: #ffffff;
                  white-space: nowrap;
                  margin-bottom: 4px;
                }
                .item-text-bottom1 {
                  font-size: 12px;
                  font-family: GothamRounded-Book, GothamRounded;
                  font-weight: normal;
                  color: #12b3a8;
                }
                .item-text-bottom2 {
                  font-size: 12px;
                  font-family: GothamRounded-Book, GothamRounded;
                  font-weight: normal;
                  color: #9a52ff;
                }

                .item-text-bottom3 {
                  font-size: 12px;
                  font-family: GothamRounded-Book, GothamRounded;
                  font-weight: normal;
                  color: #707a83;
                }
              }
            }
          }
        }
      }

      .right-takeIn-history {
        margin-top: 25px;
        .title {
          font-size: 20px;
          font-family: GothamRounded-Medium, GothamRounded;
          font-weight: 500;
          color: #ffffff;
          display: flex;
          //align-items: center;
          .title-des-tip {
            display: flex;
            align-items: flex-end;
            margin-left: 10px;
            font-size: 16px;
            font-family: GothamRounded;
            color: rgba(255, 255, 255, 0.48);
          }
        }
        .about-content {
          width: 591px;
          min-height: 540px;
          background: #282523;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          margin-top: 16px;
          .about-content-wrap {
            .history-item-wrap-top {
              padding: 24px 32px;
              display: flex;
              align-items: center;
              justify-content: center;
              height: calc(89px- 48px);
              border-bottom: 1px solid rgba(255, 255, 255, 0.08);
              .history-left {
                flex: 1.2;
                .history-item-top {
                  font-size: 16px;
                  font-family: GothamRounded-Book, GothamRounded;
                  font-weight: normal;
                  color: rgba(255, 255, 255, 0.48);
                }
                .history-item-bottom {
                  margin-top: 10px;
                  font-size: 14px;
                  font-family: GothamRounded-Medium, GothamRounded;
                  font-weight: 500;
                  color: #ffffff;
                }
              }
              .history-mid {
                flex: 0.8;
                .history-item-top {
                  font-size: 16px;
                  font-family: GothamRounded-Book, GothamRounded;
                  font-weight: normal;
                  color: rgba(255, 255, 255, 0.48);
                }
                .history-item-bottom {
                  margin-top: 10px;
                  font-size: 14px;
                  font-family: GothamRounded-Medium, GothamRounded;
                  font-weight: 500;
                  color: #ffffff;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }
              }
              .history-mid2 {
                flex: 1;
                .history-item-top {
                  font-size: 16px;
                  font-family: GothamRounded-Book, GothamRounded;
                  font-weight: normal;
                  color: rgba(255, 255, 255, 0.48);
                }
                .history-item-bottom {
                  margin-top: 10px;
                  font-size: 14px;
                  font-family: GothamRounded-Medium, GothamRounded;
                  font-weight: 500;
                  color: #ffffff;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }
              }
              .history-right {
                flex: 1;
                .history-item-top {
                  display: flex;
                  justify-content: flex-end;
                  font-size: 16px;
                  font-family: GothamRounded-Book, GothamRounded;
                  font-weight: normal;
                  color: rgba(255, 255, 255, 0.48);
                }
                .history-item-bottom {
                  display: flex;
                  justify-content: flex-end;
                  align-items: center;
                  margin-top: 10px;
                  font-size: 14px;
                  font-family: GothamRounded-Medium, GothamRounded;
                  font-weight: 500;
                  color: #ffffff;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  img {
                    margin-right: 4px;
                    width: 20px;
                    height: 20px;
                  }
                }
              }
            }
            .history-item {
              padding: 24px 32px;
              display: flex;
              align-items: center;
              justify-content: center;
              height: calc(89px- 48px);
              border-bottom: 1px solid rgba(255, 255, 255, 0.08);
              .history-left {
                flex: 1.2;
                .history-item-top {
                  font-size: 16px;
                  font-family: GothamRounded-Book, GothamRounded;
                  font-weight: normal;
                  color: rgba(255, 255, 255, 0.48);
                }
                .history-item-bottom {
                  margin-top: 10px;
                  font-size: 14px;
                  font-family: GothamRounded-Medium, GothamRounded;
                  font-weight: 500;
                  color: #ffffff;
                }
              }
              .history-mid {
                flex: 0.8;
                .history-item-top {
                  font-size: 16px;
                  font-family: GothamRounded-Book, GothamRounded;
                  font-weight: normal;
                  color: rgba(255, 255, 255, 0.48);
                }
                .history-item-bottom {
                  margin-top: 10px;
                  font-size: 14px;
                  font-family: GothamRounded-Medium, GothamRounded;
                  font-weight: 500;
                  color: #ffffff;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }
              }
              .history-mid2 {
                flex: 1;
                .history-item-top {
                  font-size: 16px;
                  font-family: GothamRounded-Book, GothamRounded;
                  font-weight: normal;
                  color: rgba(255, 255, 255, 0.48);
                }
                .history-item-bottom {
                  margin-top: 10px;
                  font-size: 14px;
                  font-family: GothamRounded-Medium, GothamRounded;
                  font-weight: 500;
                  color: #ffffff;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }
              }
              .history-right {
                flex: 1;
                .history-item-top {
                  display: flex;
                  justify-content: flex-end;
                  font-size: 16px;
                  font-family: GothamRounded-Book, GothamRounded;
                  font-weight: normal;
                  color: rgba(255, 255, 255, 0.48);
                }
                .history-item-bottom {
                  display: flex;
                  justify-content: flex-end;
                  align-items: center;
                  margin-top: 10px;
                  font-size: 14px;
                  font-family: GothamRounded-Medium, GothamRounded;
                  font-weight: 500;
                  color: #ffffff;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  img {
                    margin-right: 4px;
                    width: 20px;
                    height: 20px;
                  }
                }
              }
            }
            .history-item:last-child {
              border-bottom: none;
            }
          }
        }
      }

      .right-skill {
        margin-top: 40px;
        height: 760px;
        .title {
          font-size: 20px;
          font-family: GothamRounded-Medium, GothamRounded;
          font-weight: 500;
          color: #ffffff;
        }
        .content {
          width: 591px;
          height: 700px;
          background: #282523;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          margin-top: 16px;
          .content-wrap {
            padding: 40px 10px;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            .item {
              display: flex;
              align-items: center;
              justify-content: center;
              width: 50%;
              margin-bottom: 32px;
              /*  cursor: pointer; */
              /*  width: calc(240px * 0.8);
              height: calc(320px * 0.8); */
              img {
                /* width: calc(240px * 0.8);
                height: calc(320px * 0.8); */
                width: calc(240px);
                height: calc(338px);
              }
              .item-text {
                margin-left: 8px;
                font-size: 12px;
                font-family: GothamRounded-Medium, GothamRounded;
                font-weight: 500;
                color: #ffffff;
                white-space: nowrap;
              }
            }
          }
        }
      }

      .right-parents {
        margin-top: 20px;
        height: 340px;
        .title {
          font-size: 20px;
          font-family: GothamRounded-Medium, GothamRounded;
          font-weight: 500;
          color: #ffffff;
        }
        .content {
          width: 591px;
          height: 141px;
          background: #282523;
          border-radius: 8px;
          //   border: 1px solid rgba(255, 255, 255, 0.08);
          margin-top: 16px;
          .content-wrap {
            padding: 24px 0;
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            align-items: center;
            .wrap-item {
              display: flex;

              .item {
                width: 181px;
                height: 242px;
                background: #282523;
                border-radius: 8px;
                border: 1px solid rgba(255, 255, 255, 0.08);
                margin-right: 14px;
                cursor: pointer;
                .parent-wrap {
                  padding: 12px;
                  .top {
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
                  .breed {
                    margin-top: 10px;
                    font-size: 12px;
                    font-family: GothamRounded-Book, GothamRounded;
                    font-weight: normal;
                    color: #ffffff;
                    opacity: 0.48;
                  }
                  .ce {
                    margin-top: 10px;
                    font-size: 12px;
                    font-family: GothamRounded-Book, GothamRounded;
                    font-weight: normal;
                    color: #ffffff;
                    .top-ce {
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
                    }
                  }
                  .dragon {
                    margin-top: 5px;
                  }
                }
              }
            }
            .no-data {
              display: flex;
              justify-content: center;
              font-size: 16px;
              font-family: GothamRounded-Book, GothamRounded;
              font-weight: normal;
              color: #ffffff;
              line-height: 24px;
              opacity: 0.48;
            }
          }
        }
      }

      .right-childrens {
        margin-top: 20px;
        height: 340px;
        .title {
          font-size: 20px;
          font-family: GothamRounded-Medium, GothamRounded;
          font-weight: 500;
          color: #ffffff;
        }
        .content {
          width: 591px;
          height: 141px;
          background: #282523;
          border-radius: 8px;
          //   border: 1px solid rgba(255, 255, 255, 0.08);
          margin-top: 16px;
          .content-wrap {
            padding: 24px 0;
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            align-items: center;
            .wrap-item {
              display: flex;
              flex-wrap: wrap;

              .item {
                cursor: pointer;
                width: 181px;
                height: 242px;
                flex: 1;
                max-width: 181px;
                min-width: 181px;
                margin-right: 14px;
                margin-bottom: 20px;
                border: 1px solid rgba(255, 255, 255, 0.08);
                .parent-wrap {
                  padding: 12px;
                  .top {
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
                  .breed {
                    margin-top: 10px;
                    font-size: 12px;
                    font-family: GothamRounded-Book, GothamRounded;
                    font-weight: normal;
                    color: #ffffff;
                    opacity: 0.48;
                  }
                  .ce {
                    margin-top: 10px;
                    font-size: 12px;
                    font-family: GothamRounded-Book, GothamRounded;
                    font-weight: normal;
                    color: #ffffff;
                    .top-ce {
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
                    }
                  }
                  .dragon {
                    margin-top: 5px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    .dragon-egg-img {
                      width: calc(602px * 0.25);
                      height: calc(536px * 0.25);
                    }
                  }
                }
              }
            }
            .no-data {
              display: flex;
              justify-content: center;
              font-size: 16px;
              font-family: GothamRounded-Book, GothamRounded;
              font-weight: normal;
              color: #ffffff;
              line-height: 24px;
              opacity: 0.48;
            }
          }
        }
      }
    }
  }
}
</style>