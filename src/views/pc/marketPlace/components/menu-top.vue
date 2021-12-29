<template>
  <div class="menu-top-main">
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
  </div>
</template>

<script>
import { reactive, onMounted, toRefs } from "vue";
// import { useRouter } from "vue-router";

import markrtPlaceHandle from "../use/dragonList.js";

export default {
  name: "marketPlace",
  components: {},
  setup() {
    //  const router = useRouter();
    const state = reactive({});
    onMounted(() => {});
    const { marketPlaceState, selectMenuItem } = markrtPlaceHandle();

    return {
      ...toRefs(state),
      ...toRefs(marketPlaceState),
      selectMenuItem,
    };
  },
};
</script>

<style lang="less" scoped>
.menu-top-main {
  height: 58px;
  background: #1a1716;
  box-shadow: 0px 1px 0px 0px rgba(255, 255, 255, 0.12);
  .menu-title {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #1a1716;
    padding: 0 27px;
    .title-item {
      height: 56px;
      display: flex;
      align-items: center;
      width: 125px;
      margin-right: 67px;
      //   padding-bottom: 4px;
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
}
</style>
