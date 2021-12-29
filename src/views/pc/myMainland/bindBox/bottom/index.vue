<template>
  <div class="bind-box-bottom-main">
    <div class="wrap">
      <div class="wrap-top">
        <div class="top-address-left">Winners address check</div>
        <div class="top-address-mid">
          <selectList
            v-if="selectList2.length > 0"
            :selectList="selectList2"
            :selectItem="selectItem2"
            :selectListShow="selectListShow2"
            @selectItem="selectItem"
          ></selectList>
        </div>
        <div class="top-address-right">
          <div class="item-input">
            <div class="search-icon" @click="confirmSearch">
              <img src="@/assets/imgs/myMainland/bind-box/search.png" alt="" />
            </div>
            <el-input
              v-model="searchKey.address"
              placeholder="Search by creator collectible or collection"
              @keyup.enter="confirmSearch"
            ></el-input>
          </div>
        </div>
      </div>
      <div
        class="wrap-bottom"
        v-loading="loadingForm.loadingShow"
        :element-loading-text="loadingForm.loadingShowText"
        element-loading-spinner="el-icon-loading"
      >
        <div class="item-wrap" v-if="list.length > 0">
          <div class="item" v-for="(item, index) in list" :key="index">
            {{ item.address }}
          </div>
          <!-- <div v-if="list.length % 2 != 0" class="item" :key="index"></div> -->
        </div>

        <div class="item-wrap-no" v-if="list.length == 0">
          <div class="no-data">No data</div>
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
</template>

<script>
import { reactive, onMounted, toRefs } from "vue";
import { useRouter } from "vue-router";

import common from "@/utils/common";
import myMainland from "@/views/pc/myMainland/use/myMainland";
import blindBoxHandle from "@/views/pc/myMainland/use/blindBox";
import Moment from "moment";
import selectList from "@/components/selectList/selectListBlindBox.vue";
import page from "@/components/page/index.vue";
export default {
  name: "blindBox",
  components: {
    selectList,
    page,
  },
  setup() {
    const router = useRouter();
    const state = reactive({});
    const {
      blindBoxState,
      selectItem,
      leftPage,
      rightPage,
      search,
      confirmSearch,
    } = blindBoxHandle();
    return {
      ...toRefs(state),
      ...toRefs(blindBoxState),
      selectItem,
      leftPage,
      rightPage,
      search,
      confirmSearch,
    };
  },
};
</script>

<style scoped lang="less">
.bind-box-bottom-main {
  min-height: 624px;
  background: #1a1716;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.12);

  .wrap {
    height: 100%;

    .wrap-top {
      height: 72px;
      background: #282523;
      border-radius: 8px 8px 0px 0px;
      border: 1px solid rgba(255, 255, 255, 0.08);
      display: flex;
      align-items: center;
      position: relative;
      z-index: 100;
      .top-address-left {
        margin-left: 32px;
        font-size: 16px;
        font-family: GothamRounded-Medium, GothamRounded;
        font-weight: 500;
        color: #ffffff;
      }
      .top-address-mid {
        margin-left: 24px;
      }
      .top-address-right {
        margin-left: 16px;
        width: 730px;
        height: 48px;

        .item-input {
          height: 48px;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          font-size: 14px;
          padding: 0 10px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          //  background: #1a1716;
          .search-icon {
            cursor: pointer;
            img {
              width: 16px;
              height: 16px;
            }
          }
          .item-input {
            width: 90%;
          }

          /deep/ input::-webkit-input-placeholder {
            opacity: 0.47;
            color: #ffffff;
            font-size: 14px;
          }
          /deep/ input::-moz-input-placeholder {
            opacity: 0.47;
            color: #ffffff;
            font-size: 14px;
          }
          /deep/ input::-ms-input-placeholder {
            opacity: 0.47;
            color: #ffffff;
            font-size: 14px;
          }
          /deep/ .el-input__inner {
            // width: 271px;
            background: transparent;
            border: none;
            border-radius: 48px;
            font-size: 14px;
            opacity: 0.68;
            color: #ffffff;
          }
        }
      }
    }

    .wrap-bottom {
      padding: 24px;
      display: flex;
      justify-content: center;
      // position: relative;
      // z-index: 99;
      .item-wrap {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        flex-direction: column;
        min-width: 400px;
        .item {
          width: 400px;
          font-size: 14px;
          font-family: GothamRounded-Book, GothamRounded;
          font-weight: normal;
          color: rgba(255, 255, 255, 0.48);
          margin-bottom: 8px;
          display: flex;
          justify-content: flex-start;
        }
      }
      .item-wrap-no {
        display: flex;
        justify-content: center;
        .no-data {
          margin-top: 40px;
          font-size: 16px;
          opacity: 0.68;
          color: #ffffff;
          display: flex;
          justify-content: center;
        }
      }
    }
  }
}
</style>