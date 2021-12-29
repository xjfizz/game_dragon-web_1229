<template>
  <div class="luck-list-main">
    <div class="luck-main-bc">
      <div class="luck-wrap" id="luck-wrap">
        <div class="list-item" v-for="(item, index) in luckList" :key="index">
          <div class="main-time">
            {{ Moment(item.createTime).utc(0).format("MM.DD HH:mm") }}
          </div>
          <div class="main-address">
            {{ common.formatAddress2(item.address) }}
          </div>
          <div class="main-dms">
            {{ item.dms }}
            <img src="../../../../assets/imgs/luckDraw/list-img.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
 




<script>
import { reactive, toRefs, onMounted } from "vue";
import luckDrawHandle from "../use/luckDraw";
import Moment from "moment";
import common from "@/utils/common";
export default {
  name: "sendDragon",
  components: {},
  props: {
    classHeader: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, context) {
    const state = reactive({});
    onMounted(() => {});

    const { luckDrawState, closeSuccess } = luckDrawHandle();
    return {
      ...toRefs(state),
      ...toRefs(luckDrawState),
      common,
      Moment,
      closeSuccess,
    };
  },
};
</script>

<style scoped lang="less">
.luck-list-main {
  position: absolute;
  top: 10px;
  left: -230px;
  display: flex;
  //   align-items: center;
  width:calc(724px * 0.64) ;
  height:calc(172px * 0.64) ;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url("../../../../assets/imgs/luckDraw/luck-list-bc.png");

  .luck-main-bc {
    overflow: hidden;
    height: 30px;
    margin-top: 34px;
    position: relative;
    width: 100%;
    .luck-wrap {
      // display: flex;
      position: absolute;
      top: 0;
      left: 0;
      height: 30px;
      width: 100%;
      .list-item {
        display: flex;
        align-items: center;
        margin-bottom: 5px;
        height: 30px;
        width: 94%;
        .main-time {
           margin-left: 50px;
          font-size: 16px;
          font-family: GothamRounded-Book, GothamRounded;
          font-weight: normal;
          color: #2e0b00;
          flex: 4;
        }
        .main-address {
          flex: 5;
          font-size: 16px;
          font-family: GothamRounded-Medium, GothamRounded;
          font-weight: 500;
          color: #278957;
        }
        .main-dms {
          flex: 4;
          font-size: 18px;
          font-family: GothamRounded-Medium, GothamRounded;
          font-weight: 500;
          color: #2e0b00;
          display: flex;
          align-items: flex-end;
          justify-content: flex-end;
          img {
            margin-left: 10px;
            width: 20px;
            height: 20px;
          }
        }
      }
    }
  }
}
</style>

