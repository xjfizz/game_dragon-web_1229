<template>
  <div class="bind-box-left-main">
    <div class="wrap">
      <div class="wrap-top">
        <div class="top-title">Total skulls unlocked</div>
        <div class="top-num">
          {{ localDragonSKullForm.allNum ?  common.formatValueQian(localDragonSKullForm.allNum) : 0 }}
        </div>
        <div class="top-img">
          <img src="@/assets/imgs/myMainland/bind-box/bind-box.png" alt="" />
        </div>
        <!-- <div class="top-next-time">
          <div class="title">Next Issue Time:</div>
          <div class="value" v-if="isBoxStartBuy == 3 || isBoxStartBuy == 1">
            <div
              v-if="
                localDragonSKullForm.nextStartTime !=
                localDragonSKullForm.startTime || isBoxStartBuy == 1
              "
            >
              {{
                Moment(localDragonSKullForm.nextStartTime)
                  .utc(0)
                  .format("MMM.DD,YYYY (HH:mm:ss UTC)")
              }}
            </div>
            <div v-else>--</div>
          </div>
          <div class="value" v-else>--</div>
        </div> -->
        <div
          v-if="isBoxStartBuy == 3 || isBoxStartBuy == 1"
          class="top-next-time"
        >
          <div v-if="isOpenBox  || isBoxStartBuy == 1" class="title">Next Issue Time:</div>
          <div v-if="isOpenBox  || isBoxStartBuy == 1" class="value">
            <div
              v-if="
                localDragonSKullForm.nextStartTime !=
                  localDragonSKullForm.startTime || isBoxStartBuy == 1
              "
            >
              {{
                localDragonSKullForm.nextStartTime ? Moment(localDragonSKullForm.nextStartTime).utc(0).format("MMM.DD,YYYY (HH:mm:ss UTC)") : '--'
              }}
            </div>
            <div v-else>--</div>
          </div>

          <div v-if="!isOpenBox && isBoxStartBuy != 1" class="title">Jackpot time:</div>
          <div v-if="!isOpenBox && isBoxStartBuy != 1" class="value">
            <div>
              {{
                Moment(localDragonSKullForm.openTime)
                  .utc(0)
                  .format("MMM.DD,YYYY (HH:mm:ss UTC)")
              }}
            </div>
          </div>
          <!-- <div class="value" v-else>--</div> -->
        </div>

        <div v-else class="top-next-time">
          <div class="title">Jackpot time:</div>
          <div class="value">
            <div>
              {{
                Moment(localDragonSKullForm.openTime)
                  .utc(0)
                  .format("MMM.DD,YYYY (HH:mm:ss UTC)")
              }}
            </div>
          </div>
          <!-- <div class="value" v-else>--</div> -->
        </div>
      </div>
      <div class="wrap-bottom">
        <div class="bottom-item">
          <div class="left">
            <div class="img">
              <img src="@/assets/imgs/myMainland/bind-box/level1.png" alt="" />
            </div>
          </div>
          <div class="right">
            <div class="right-top">{{ localDragonSKullForm.low || "--" }}</div>
            <div class="right-bottom">low</div>
          </div>
        </div>
        <div class="bottom-item">
          <div class="left">
            <div class="img">
              <img src="@/assets/imgs/myMainland/bind-box/level2.png" alt="" />
            </div>
          </div>
          <div class="right">
            <div class="right-top">
              {{ localDragonSKullForm.middle || "--" }}
            </div>
            <div class="right-bottom">medium</div>
          </div>
        </div>
        <div class="bottom-item">
          <div class="left">
            <div class="img">
              <img src="@/assets/imgs/myMainland/bind-box/level3.png" alt="" />
            </div>
          </div>
          <div class="right">
            <div class="right-top">{{ localDragonSKullForm.high || "--" }}</div>
            <div class="right-bottom">high</div>
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
import myMainland from "@/views/pc/myMainland/use/myMainland";
import blindBoxHandle from "@/views/pc/myMainland/use/blindBox";
import Moment from "moment";

export default {
  name: "blindBox",
  components: {},
  setup() {
    const router = useRouter();
    const state = reactive({});
    const { blindBoxState } = blindBoxHandle();
    return {
      ...toRefs(state),
      ...toRefs(blindBoxState),
      Moment,
      common,
    };
  },
};
</script>

<style scoped lang="less">
.bind-box-left-main {
  width: 588px;
  //height: 535px;
  height: 100%;
  background: #1a1716;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  .wrap {
    .wrap-top {
      // height: 458px;
      height: 478px;
      display: flex;
      flex-direction: column;
      align-items: center;
      .top-title {
        margin-top: 48px;
        font-size: 14px;
        font-family: GothamRounded-Book, GothamRounded;
        font-weight: normal;
        color: rgba(255, 255, 255, 0.48);
      }
      .top-num {
        margin-top: 4px;
        font-size: 28px;
        font-family: GothamRounded-Medium, GothamRounded;
        font-weight: 500;
        color: #ffffff;
      }
      .top-img {
        margin-top: 40px;
        img {
          width: 275px;
          height: 258px;
        }
      }
      .top-next-time {
        display: flex;
        align-items: center;
        margin-top: 15px;
        .title {
          font-size: 16px;
          font-family: GothamRounded-Book, GothamRounded;
          font-weight: normal;
          color: rgba(255, 255, 255, 0.48);
        }
        .value {
          margin-left: 8px;
          font-size: 16px;
          font-family: GothamRounded-Medium, GothamRounded;
          font-weight: 500;
          color: #ffffff;
        }
      }
    }
    .wrap-bottom {
      height: 77px;
      background: #282523;
      border-radius: 0px 0px 8px 8px;
      border: 1px solid rgba(255, 255, 255, 0.12);
      display: flex;
      align-items: center;
      justify-content: space-around;
      padding-left: 58px;
      padding-right: 58px;
      .bottom-item {
        display: flex;
        align-items: center;
        justify-content: space-around;

        .left {
          .img {
            img {
              width: 32px;
              height: 32px;
            }
          }
        }
        .right {
          margin-left: 8px;
          .right-top {
            font-size: 14px;
            font-family: GothamRounded-Medium, GothamRounded;
            font-weight: 500;
            color: #ffffff;
          }
          .right-bottom {
            margin-top: 4px;

            font-size: 14px;
            font-family: GothamRounded-Book, GothamRounded;
            font-weight: normal;
            color: rgba(255, 255, 255, 0.48);
          }
        }
      }
    }
  }
}
</style>