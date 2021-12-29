

<template>
  <playGame v-if="playGameShow" @closeBox="closePlayGameBox"></playGame>
  <div class="main">
    <div class="main-wrap">
      <div class="top">
        <Header :headIndex="8" @createEgg="createEgg"></Header>
        <div class="top-content">
          <div class="left">
            <div class="title">Skulls</div>
            <div class="des">
              Skulls are a game prop in Dragon Mainland. There are 5 different
              races of skulls (water, fire, storm, rock and thunder) and 3
              levels (low, medium and high).
            </div>
            <div class="des-second">
              Dragon skulls are used for absorption and synthesis.
            </div>
            <!-- <div class="swap-link" @click="goSwapLink">Buy DMP - Pancake</div>
            <div class="dms-link">
              <div class="title">DMP Address:</div>
              <div class="text-wrap">
                <div class="text select-hover" @click="goDmpLink">
                  {{ dmpLink }}
                </div>
                <div class="btn" @click="copyLink(dmpLink, $event)">
                  <img src="@/assets/imgs/dms/copy.png" alt="" />
                </div>
              </div>
            </div> -->
          </div>
          <div class="right">
            <img src="@/assets/imgs/skull/top-dmp-icon.png" alt="" />
          </div>
        </div>
      </div>
      <div class="mid">
        <div class="mid-content">
          <div class="dragon-breed">
            <div class="dragon-breed-title">01. Attribute Value</div>
            <div class="dragon-breed-des">
              For absorption each dragon can absorb up to 3 skulls to improve
              its basic attributes. Each time it absorbs a single skull, it can
              only improve one attribute. And, each attribute can only be
              improved once. The maximum number any single dragon can absorb is
              three skulls in total, not per attribute. The dragon skull
              absorption attribute value increase probabilities are as follows:
            </div>
            <div class="dragon-breed-list">
              <img src="@/assets/imgs/skull/breed-list-img.png" alt="" />
            </div>
            <div class="dragon-breed-list-des">
              * Attribute Value Increase Probabilites During Skull Absorbtion
            </div>
          </div>
          <div class="dragon-bone-absorption">
            <div class="bone-title">02. Skulls Synthesis</div>
            <div class="bone-des">
              For skulls synthesis you need five skulls of the same race and
              level. Once all five have been obtained you can perform the
              synthesis. The probability of synthesis success is 50% for an
              upgrade.
            </div>
            <div class="bone-list-img">
              <img src="@/assets/imgs/skull/bone-list-img.png" alt="" />
            </div>
            <div class="des">
              As you can see, skulls can be used to enhance a dragon's attribute
              values or it can be sold in the Marketplace as an NFT.
            </div>
          </div>

          <div class="dragon-devouring">
            <div class="devouring-title">03. How to get a skull</div>
            <div class="devouring-des">
              The main way to get a skull is to buy it in the Marketplace or by
              opening a blind box.
            </div>
            <div class="devouring-des-item">
              <div class="title">Marketplace:</div>
              <div class="value select-hover" @click="goMapket">
                dragonmainland.io/#/marketPlace
              </div>
            </div>
            <div class="devouring-des-item">
              <div class="title">Blind boxes:</div>
              <div class="value select-hover" @click="goBlindBox">
                dragonmainland.io/#/myMainland/blindBox
              </div>
            </div>
            <!-- <div class="devouring-list-img">
              <img src="@/assets/imgs/dmp/devouring-list-img.png" alt="" />
            </div> -->
          </div>

          <div class="dragon-upgrade">
            <div class="upgrade-title">04. Introduction to blind boxes</div>
            <div class="upgrade-des">
              Various types of skulls can be obtained through blind boxes in
              Dragon Mainland. A blind box may contain a random level (low,
              medium, high) and a random race (water, fire, storm, rock,
              thunder) skull. The chances of each of race are equal, but the
              chances vary for the different levels.
            </div>
            <div class="upgrade-list-img">
              <img src="@/assets/imgs/skull/upgrade-list-img.png" alt="" />
            </div>
            <div class="des">*Blind Box Probabilities</div>
          </div>

          <div class="dragon-skull">
            <div class="skull-title">05. How to get a blind box</div>
            <div class="skull-des">
              Users must register in advance and pledge a specific amount of DMS
              in order to be eligible to obtain a blind box. Dragon Mainland
              will randomly select a certain number of registered users per day.
              If selected your DMS pledge will be deducted and you’ll receive a
              blind box. If you are not selected, you will have your DMS pledge
              returned.
            </div>
            <div class="des select-hover" @click="goHref">
              {{ skullLink }}
            </div>
          </div>

          <div class="bottom-menu">
            <Bottom @createEgg="createEgg"></Bottom>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, toRefs } from "vue";
import { useRouter } from "vue-router";
import Header from "@/components/Header";
import Bottom from "@/components/Bottom";
import common from "@/utils/common";
import playGame from "@/components/modalBox/playGame/index.vue";
import skullStateHandle from "./use/index";
export default {
  name: "dmp",
  components: {
    Header,
    Bottom,
    playGame,
  },
  setup() {
    const router = useRouter();
    const state = reactive({});
    onMounted(() => {
      common.goTopScroll();
    });
    const {
      skullState,
      goSwapLink,
      goDmpLink,
      copyLink,
      goHref,
      goMapket,
      goBlindBox,
    } = skullStateHandle();
    const tips = () => {};
    // 关闭提示弹框
    const closePlayGameBox = () => {
      state.playGameShow = false;
    };
    const createEgg = () => {
      state.playGameShow = true;
    };
    return {
      ...toRefs(state),
      ...toRefs(skullState),

      tips,
      closePlayGameBox,
      createEgg,
      goSwapLink,
      goDmpLink,
      copyLink,
      goHref,
      goMapket,
      goBlindBox,
    };
  },
};
</script>

<style lang="less" scoped >
.main {
  //  width: 100%;
  .main-wrap {
    width: 100%;
    // min-height: 3731px;
    min-height: 2000px;
    background: linear-gradient(
      180deg,
      #1f1c1f 0%,
      #2d1f1c 5%,
      #221d1d 18%,
      #1f1c1f 49%,
      #291e16 75%,
      #120804 90%,
      #100602 100%
    );
    .top {
      height: 678px;
      background-repeat: no-repeat;
      background-size: cover;
      background-image: url("../../../assets/imgs/dmp/top-bc.png");
      display: flex;
      flex-direction: column;
      align-items: center;
      .top-content {
        width: 1200px;
        margin-top: 104px;
        display: flex;
        justify-content: center;
        .left {
          .title {
            font-size: 48px;
            font-family: WendyOne-Regular, WendyOne;
            font-weight: 400;
            color: #ffffff;
            line-height: 50px;
            letter-spacing: 1px;
          }
          .des {
            margin-top: 43px;
            width: 888px;
            font-size: 24px;
            font-family: GothamRounded-Book, GothamRounded;
            font-weight: normal;
            color: #ffffff;
            line-height: 32px;
            opacity: 0.83;
          }
          .des-second {
            margin-top: 30px;
            width: 888px;
            font-size: 24px;
            font-family: GothamRounded-Book, GothamRounded;
            font-weight: normal;
            color: #ffffff;
            line-height: 32px;
            opacity: 0.83;
          }
          .swap-link {
            margin-top: 43px;
            width: 198px;
            height: 50px;
            border-radius: 25px;
            border: 1px solid #ffc763;
            font-size: 16px;
            font-family: GothamRounded-Medium, GothamRounded;
            font-weight: 500;
            color: #ffc763;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .swap-link:hover {
            color: #ffc763;
            opacity: 0.83;
          }
          .dms-link {
            margin-top: 10px;

            .title {
              font-size: 16px;
              font-family: GothamRounded-Book, GothamRounded;
              font-weight: normal;
              color: rgba(255, 255, 255, 0.48);
              line-height: 35px;
            }
            .text-wrap {
              display: flex;
              align-items: center;
              .text {
                font-size: 16px;
                font-family: GothamRounded-Book, GothamRounded;
                font-weight: normal;
                color: rgba(255, 255, 255, 1);
                line-height: 35px;
                display: flex;
                align-items: center;
              }
              .btn {
                margin-left: 10px;
                font-size: 16px;
                font-family: GothamRounded-Book, GothamRounded;
                font-weight: normal;
                color: rgba(255, 255, 255, 0.48);
                line-height: 35px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                img {
                  width: 24px;
                  height: 24px;
                }
              }
            }
          }
        }
        .right {
          margin-left: 55px;
          img {
            width: calc(361px * 0.8);
            height: calc(460px * 0.8);
          }
        }
      }
    }
    .mid {
      //   height: 6243px;
      min-height: 3500px;
      display: flex;
      flex-direction: column;
      align-items: center;
      .mid-content {
        width: 1200px;
        .dragon-breed {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 80px;
          height: 800px;

          .dragon-breed-title {
            font-size: 48px;
            font-family: WendyOne-Regular, WendyOne;
            font-weight: 400;
            color: #ffffff;
            line-height: 50px;
            letter-spacing: 1px;
          }
          .dragon-breed-des {
            width: 996px;
            font-size: 24px;
            font-family: GothamRounded-Book, GothamRounded;
            font-weight: normal;
            color: #ffffff;
            line-height: 32px;
            margin-top: 30px;
            opacity: 0.83;
            text-align: center;
          }
          .dragon-breed-list {
            margin-top: 48px;
            img {
              width: 857px;
              height: 331px;
            }
          }
          .dragon-breed-list-des {
            font-size: 24px;
            font-family: GothamRounded-Book, GothamRounded;
            font-weight: normal;
            color: #ffffff;
            line-height: 32px;
            margin-top: 30px;
            opacity: 0.83;
          }
          .dragon-breed-list-table {
            margin-top: 100px;
            img {
              width: 857px;
              height: 571px;
            }
          }
          .dragon-breed-list-des {
            font-size: 24px;
            font-family: GothamRounded-Book, GothamRounded;
            font-weight: normal;
            color: #ffffff;
            line-height: 32px;
            margin-top: 30px;
            opacity: 0.83;
          }
        }
        .dragon-bone-absorption {
          display: flex;
          flex-direction: column;
          align-items: center;
          height: 800px;
          // margin-top: 68px;
          .bone-title {
            font-size: 48px;
            font-family: WendyOne-Regular, WendyOne;
            font-weight: 400;
            color: #ffffff;
            line-height: 50px;
            letter-spacing: 1px;
          }
          .bone-des {
            width: 996px;
            height: 96px;
            font-size: 24px;
            font-family: GothamRounded-Book, GothamRounded;
            font-weight: normal;
            color: #ffffff;
            line-height: 32px;
            opacity: 0.86;
            margin-top: 48px;
            text-align: center;
            margin-top: 30px;
          }
          .bone-list-img {
            margin-top: 48px;
            img {
              width: 857px;
              height: 331px;
            }
          }
          .des {
            text-align: center;
            margin-top: 43px;
            width: 888px;
            font-size: 24px;
            font-family: GothamRounded-Book, GothamRounded;
            font-weight: normal;
            color: #ffffff;
            line-height: 32px;
            opacity: 0.83;
          }
        }

        .dragon-devouring {
          display: flex;
          flex-direction: column;
          align-items: center;
          height: 350px;
          //   margin-top: 68px;
          .devouring-title {
            font-size: 48px;
            font-family: WendyOne-Regular, WendyOne;
            font-weight: 400;
            color: #ffffff;
            line-height: 50px;
            letter-spacing: 1px;
          }
          .devouring-des {
            width: 800px;
            font-size: 24px;
            font-family: GothamRounded-Book, GothamRounded;
            font-weight: normal;
            color: #ffffff;
            line-height: 32px;
            opacity: 0.86;
            margin-top: 48px;
            text-align: center;
            margin-top: 30px;
            margin-bottom: 20px;
          }
          .devouring-list-img {
            margin-top: 48px;
            img {
              width: 857px;
              height: 331px;
            }
          }
          .devouring-des-item {
            margin-top: 10px;
            display: flex;
            align-items: center;
            width: 760px;
            .title {
              font-size: 24px;
              font-family: GothamRounded-Book, GothamRounded;
              font-weight: normal;
              color: #ffffff;
              line-height: 32px;
              opacity: 0.86;
            }
            .value {
              margin-left: 10px;
              cursor: pointer;
              font-size: 24px;
              font-family: GothamRounded-Book, GothamRounded;
              font-weight: normal;
              color: #ffc763;
            }
          }
        }

        .dragon-upgrade {
          display: flex;
          flex-direction: column;
          align-items: center;
          height: 800px;
          //   margin-top: 68px;
          .upgrade-title {
            font-size: 48px;
            font-family: WendyOne-Regular, WendyOne;
            font-weight: 400;
            color: #ffffff;
            line-height: 50px;
            letter-spacing: 1px;
          }
          .upgrade-des {
            width: 996px;
            font-size: 24px;
            font-family: GothamRounded-Book, GothamRounded;
            font-weight: normal;
            color: #ffffff;
            line-height: 32px;
            opacity: 0.86;
            margin-top: 48px;
            text-align: center;
            margin-top: 30px;
          }
          .upgrade-list-img {
            margin-top: 48px;
            img {
              width: 857px;
              height: 331px;
            }
          }
          .des {
            text-align: center;
            margin-top: 16px;
            width: 888px;
            font-size: 24px;
            font-family: GothamRounded-Book, GothamRounded;
            font-weight: normal;
            color: #ffffff;
            line-height: 32px;
            opacity: 0.83;
          }
        }

        .dragon-skull {
          display: flex;
          flex-direction: column;
          align-items: center;
          height: 340px;
          //   margin-top: 68px;
          .skull-title {
            font-size: 48px;
            font-family: WendyOne-Regular, WendyOne;
            font-weight: 400;
            color: #ffffff;
            line-height: 50px;
            letter-spacing: 1px;
          }
          .skull-des {
            width: 996px;
            font-size: 24px;
            font-family: GothamRounded-Book, GothamRounded;
            font-weight: normal;
            color: #ffffff;
            line-height: 32px;
            opacity: 0.86;
            margin-top: 48px;
            text-align: center;
            margin-top: 30px;
          }
          .skull-list-img {
            margin-top: 48px;
            img {
              width: 857px;
              height: 331px;
            }
          }
          .des {
            cursor: pointer;
            margin-top: 40px;
            font-size: 24px;
            font-family: GothamRounded-Book, GothamRounded;
            font-weight: normal;
            color: #ffc763;
          }
        }
        .dmp-bottom-des {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 30px;
          .dmp-bottom-des-top {
            width: 1020px;
            font-size: 24px;
            font-family: GothamRounded-Medium, GothamRounded;
            font-weight: 500;
            color: #ffffff;
            line-height: 32px;
            opacity: 0.83;
          }
          .dmp-bottom-des-title {
            width: 1020px;
            height: 32px;
            font-size: 24px;
            font-family: GothamRounded-Medium, GothamRounded;
            font-weight: 500;
            color: #ffffff;
            line-height: 32px;
            opacity: 0.83;
            margin-top: 32px;
          }
          .dmp-bottom-des-content {
            margin-top: 19px;
            width: 1020px;
            .item {
              display: flex;
              margin-bottom: 24px;
              .item-index {
                font-size: 24px;
                font-family: GothamRounded-Medium, GothamRounded;
                font-weight: 500;
                color: #ffffff;
                margin-right: 15px;
                opacity: 0.83;
              }
              .item-text {
                width: 956px;
                font-size: 20px;
                font-family: GothamRounded-Book, GothamRounded;
                font-weight: normal;
                color: #ffffff;
                line-height: 30px;
                opacity: 0.83;
              }
            }
          }
        }
        .bottom-menu {
          margin-top: 100px;
        }
      }
    }
  }
  .par-top48 {
    margin-top: 48px;
  }
}
</style>