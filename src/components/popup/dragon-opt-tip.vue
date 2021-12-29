<template>
  <div
    :class="[
      direction === 'top'
        ? 'popup-msg-top'
        : direction === 'right'
        ? 'popup-msg-right'
        : direction === 'left'
        ? 'popup-msg-left'
        : direction === 'bottom'
        ? 'bottom'
        : 'popup-msg-bottom',
      'popup-msg-container',
    ]"
    v-show="showPopop"
  >
    <div class="popup-msg">
      <div class="msg" v-for="(item, index) in msgList" :key="index">
        <span v-show="showIndex">{{ index + 1 }}.</span>{{ item }}
      </div>

      <div
        :class="[
          direction === 'top'
            ? 'triangle-top'
            : direction === 'right'
            ? 'triangle-right'
            : direction === 'left'
            ? 'triangle-left'
            : direction === 'bottom'
            ? 'bottom'
            : 'triangle-bottom',
          'triangle',
        ]"
      ></div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
export default {
  name: "DragonOptTip",
  props: {
    // 是否显示弹窗，默认不展示
    showPopop: {
      default: false,
      type: Boolean,
    },
    //方向 4个值 top left right bottom
    direction: {
      default: "top",
      type: String,
    },
    // 消息列表数据
    msgList: {
      default: [],
      type: Array,
    },
    // 是否展示序号,默认展示
    showIndex: {
      default: true,
      type: Boolean,
    },
  },
  setup() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.popup-msg-container {
  position: absolute;
  z-index: 100;
  margin-top: 10px;
}
.popup-msg-top {
  transform: translate(-50%, 0);
  left: 50%;
  top: 100%;
}
.popup-msg-left {
  transform: translate(25%, -50%);
  top: 50%;
  left: 50%;
}
.popup-msg-bottom {
  transform: translate(-50%, -50%);
  left: 50%;
  bottom: 50%;
}
.popup-msg-right {
  transform: translate(25%, -50%);
  top: 50%;
  left: 0;
}
.popup-msg {
  min-width: 100px;
  min-height: 38px;
  //padding: 32px 24px 0 32px;
  background: #09090a;
  border: 1px solid rgba(255, 199, 99, 0.38);
  font-size: 14px;
  font-family: GothamRounded-Book, GothamRounded;
  font-weight: normal;
  color: #ffffff;
  border-radius: 6px;
  position: relative;
  display: flex;
  justify-content:center;
  align-items: center;
  .msg {
    // margin-bottom: 32px;
    // line-height: 21px;
  }
  .triangle {
    position: absolute;
    width: 11px;
    height: 11px;
    border-style: solid;
    background: #09090a;
    border-width: 1px;
  }
  .triangle-right {
    right: -6.6px;
    top: 50%;
    transform: translateY(-50%) rotate(45deg);
    border-color: rgba(255, 199, 99, 0.38) rgba(255, 199, 99, 0.38) #09090a
      #09090a;
  }
  .triangle-top {
    top: -6.6px;
    left: 50%;
    transform: translateX(-50%) rotate(45deg);
    border-color: rgba(255, 199, 99, 0.38) #09090a #09090a
      rgba(255, 199, 99, 0.38);
    z-index: 6 !important;
  }
  .triangle-left {
    left: -6.6px;
    top: 50%;
    transform: translateY(-50%) rotate(45deg);
    border-color: #09090a #09090a rgba(255, 199, 99, 0.38)
      rgba(255, 199, 99, 0.38);
  }
  .triangle-bottom {
    bottom: -6.6px;
    left: 50%;
    transform: translateX(-50%) rotate(45deg);
    border-color: #09090a rgba(255, 199, 99, 0.38) rgba(255, 199, 99, 0.38)
      #09090a;
  }
}
</style>
