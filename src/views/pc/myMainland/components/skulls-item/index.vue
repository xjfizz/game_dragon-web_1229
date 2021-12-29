<template>
  <div class="item">
    <div class="item-wrap item-selected">
      <div class="item-top">
        <div class="left">
          <div class="text">
            <div class="text-img">
              <img :src="dragonClazzImgHandle(item.clazz)" alt="" />
            </div>
            <div class="text-value">{{ dragonLocalTypeName[item.clazz] }}</div>
          </div>
        </div>
        <div class="mid">·</div>
        <div class="right">{{ createDragonSkullsLevel(item.level) }} level</div>
      </div>
      <div class="item-top-num">
        <div class="wrap">X {{ item.usable }}</div>
      </div>
      <div class="item-mid">
        <div class="img">
          <img :src="createDragonSkullsImg(item.level)" alt="" />
        </div>
      </div>
      <div v-if="status == 2" class="item-bottom">
        <div class="left">Unit price:</div>
        <div class="right">
          <div class="img">
            <img src="@/assets/imgs/myMainland/bind-box/dms.png" alt="" />
          </div>
          <div class="num">500</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, toRefs } from "vue";
import { useRouter } from "vue-router";

import common from "@/utils/common";
import myDragon from "@/views/pc/myMainland/use/myDragon";

export default {
  name: "skulls-item",
  components: {},
  props: {
    item: {
      type: Object,
      default: () => {},
    },
    status: {
      type: Number,
      default: 1,
    },
  },
  setup(props, context) {
    const router = useRouter();
    const state = reactive({
      item: props.item,
      status: props.status,
    });

    onMounted(() => {
      common.goTopScroll();
    });

    const {
      createDragonSkullsImg,
      dragonClazzImgHandle,
      dragonLocalTypeName,
      createDragonSkullsLevel,
    } = myDragon();

    const goSkullsDetail = (item) => {
      //context.emit("goSkullsDetail", item);
      context.emit("goSkullsDetail", { id: 8428 });
    };

    return {
      ...toRefs(state),
      goSkullsDetail,
      createDragonSkullsImg,
      dragonClazzImgHandle,
      dragonLocalTypeName,
      createDragonSkullsLevel,
    };
  },
};
</script>

<style lang="less" scoped >
.item {
  cursor: pointer;
  width: 222px;
  height: 311px;
  flex: 1;
  max-width: 222px;
  min-width: 222px;
  margin-right: 18px;
  margin-bottom: 20px;
  .item-selected:hover {
    background-color: #1a1716;
  }
  .item-wrap {
    background: #282523;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    padding: 17px 13px;

    .item-top {
      display: flex;
      align-items: center;
      justify-content: center;
      .left {
        .text {
          font-size: 12px;
          font-family: GothamRounded-Medium, GothamRounded;
          font-weight: 500;
          color: #ffffff;
          display: flex;
          align-items: center;
          .text-img {
            img {
              width: 20px;
              height: 20px;
            }
          }
          .text-value {
            margin-left: 5px;
          }
        }
      }
      .mid {
        font-size: 12px;
        font-family: GothamRounded-Medium, GothamRounded;
        font-weight: 500;
        color: rgba(255, 255, 255, 0.48);
        margin-left: 8px;
        margin-right: 8px;
      }
      .right {
        min-width:10px;
        font-size: 12px;
        font-family: GothamRounded-Medium, GothamRounded;
        font-weight: 500;
        color: #ffffff;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .item-top-num {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 12px;
      .wrap {
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 45px;
        padding-left: 5px;
        padding-right: 5px;
        height: 24px;
        background: rgba(26, 23, 22, 0.68);
        border-radius: 4px;
        //   opacity: 0.68;
        font-size: 11px;
        font-family: GothamRounded-Book, GothamRounded;
        font-weight: normal;
        color: rgba(255, 255, 255, 0.83);
      }
    }
    .item-mid {
      display: flex;
      justify-content: center;
      align-items: center;
      .img {
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width:calc(197px * 1);
          height:calc(197px * 1);
        }
      }
    }
    .item-bottom {
      display: flex;
      justify-content: center;
      align-items: center;
      .left {
        font-size: 12px;
        font-family: GothamRounded-Book, GothamRounded;
        font-weight: normal;
        color: rgba(255, 255, 255, 0.48);
      }
      .right {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 10px;
        .img {
          img {
            width: 14px;
            height: 13px;
          }
        }
        .num {
          margin-left: 7px;
          font-size: 16px;
          font-family: GothamRounded-Book, GothamRounded;
          font-weight: normal;
          color: #ffffff;
        }
      }
    }
  }
}
</style>