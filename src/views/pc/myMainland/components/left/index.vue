<template>
  <div class="left-main">
    <div
      class="item"
      v-for="(item, index) in leftItemList"
      :key="index"
      :class="item.id == leftItemSelected ? 'item-selected' : ''"
      @click="selectLeftItemMenu(item)"
    >
      <div class="item-img">
        <img :src="item.img" alt="" />
      </div>
      <div class="item-text">{{ item.title }}</div>
    </div>
    <div class="sellList">
      <div class="btn select-hover" @click="goSellHistory()">
        <div class="img">
          <img src="@/assets/imgs/myMainland/sell-history.png" alt="" />
        </div>
        <div class="text">Activity</div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, toRefs } from "vue";
import { useRouter } from "vue-router";

import Header from "@/components/HeaderMarketPlace";

import common from "@/utils/common";
import myMainland from "@/views/pc/myMainland/use/myMainland";

export default {
  name: "marketPlace",
  components: {
    Header,
  },
  setup() {
    const router = useRouter();
    const state = reactive({});
    const { myMainlandState, selectLeftItemMenu, goSellHistory } = myMainland();
    onMounted(() => {
      common.goTopScroll();
    });

    return {
      ...toRefs(state),
      ...toRefs(myMainlandState),
      selectLeftItemMenu,
      goSellHistory,
    };
  },
};
</script>

<style lang="less" scoped>
.left-main {
  // position: relative;
  .item {
    display: flex;
    align-items: center;
    height: 48px;
    width: calc(100% -4px);
    margin-bottom: 24px;
    cursor: pointer;
    .item-img {
      margin-left: 32px;

      img {
        width: 48px;
        height: 48px;
      }
    }
    .item-text {
      margin-left: 12px;
      font-size: 16px;
      font-family: GothamRounded-Medium, GothamRounded;
      font-weight: 500;
      color: #ffffff;
      line-height: 19px;
      display: flex;
      align-items: center;
      opacity: 0.48;
    }
  }
  .item-selected {
    border-right: 4px solid #ffc763;

    .item-text {
      color: #ffc763;
      opacity: 1;
    }
  }
  .sellList {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    bottom: 40px;
    left: 32px;
    .btn {
      width: 196px;
      height: 48px;
      background: #1a1716;
      border-radius: 4px;
      border: 1px solid rgba(255, 255, 255, 0.12);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      .img {
        display: flex;
        align-items: center;
        img {
          width: 24px;
          height: 24px;
        }
      }
      .text {
        margin-left: 20px;
        font-size: 16px;
        font-family: GothamRounded-Medium, GothamRounded;
        font-weight: 500;
        color: #ffffff;
        opacity: 0.48;
      }
    }
  }
}
</style>