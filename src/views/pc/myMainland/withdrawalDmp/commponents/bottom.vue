<template>
  <div class="withdrawlDmp-bottom-main">
    <div class="bottom-title">Reward(DMP) List</div>
    <div class="table-main">
      <div class="table-title">
        <div
          class="title-item"
          :class="selectTableTitleItem == 1 ? 'title-item-selected' : ''"
          @click="selectTableTitle(1)"
        >
          Not withdrawn
        </div>
        <div
          class="title-item"
          :class="selectTableTitleItem == 2 ? 'title-item-selected' : ''"
          @click="selectTableTitle(2)"
        >
          Already withdrawn
        </div>
      </div>
      <div class="table-wrap">
        <div class="list">
          <tableNotWithDrawn v-if="selectTableTitleItem == 1" />
          <tableWithDrawn v-if="selectTableTitleItem == 2" />
          <div class="page-wrp">
            <!-- page -->
            <page
              v-if="pageInfo.totalPages > 1"
              :pageInfo="pageInfo"
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
import { reactive, onMounted, toRefs } from "vue";
import { useRouter } from "vue-router";
import Header from "@/components/HeaderMarketPlace";

import common from "@/utils/common";
import withdrawlDmpHandle from "@/views/pc/myMainland/use/withdrawlDmp";
import tableNotWithDrawn from "./table/table-not-withdrawn";
import tableWithDrawn from "./table/table-withdrawn";
import page from "@/components/page/index.vue";
export default {
  components: {
    Header,
    tableNotWithDrawn,
    tableWithDrawn,
    page,
  },
  setup() {
    const router = useRouter();
    const state = reactive({});

    const {
      back,
      withdrawlDmpState,
      selectTableTitle,
      leftPage,
      rightPage,
      search,
    } = withdrawlDmpHandle();
    onMounted(() => {
      common.goTopScroll();
      // init();
    });

    return {
      ...toRefs(state),
      ...toRefs(withdrawlDmpState),
      back,
      selectTableTitle,
      leftPage,
      rightPage,
      search,
    };
  },
};
</script>

<style lang="less" scoped >
.withdrawlDmp-bottom-main {
  .bottom-title {
    margin-top: 40px;
    font-size: 20px;
    font-family: GothamRounded-Medium, GothamRounded;
    font-weight: 500;
    color: #ffffff;
  }
  .table-main {
    margin-top: 16px;
    .table-title {
      display: flex;
      align-items: center;
      .title-item {
        font-size: 16px;
        font-family: GothamRounded-Medium, GothamRounded;
        font-weight: 500;
        color: rgba(255, 255, 255, 0.48);
        margin-right: 37px;
        padding-bottom: 8px;
        height: 16px;
        border-bottom: 2px solid rgba(255, 255, 255, 0);
        cursor: pointer;
      }
      .title-item-selected {
        font-size: 16px;
        font-family: GothamRounded-Medium, GothamRounded;
        font-weight: 500;
        color: #ffc763;
        border-bottom: 2px solid #ffc763;
      }
    }
    .table-wrap {
      margin-top: 16px;
      .list {
      }
    }
  }
}
</style>