<template>
  <div class="main">
    <div class="item-title">
      <div>{{ sliderTitle }}</div>
      <div class="reset-btn" @click="handleReset">Reset</div>
    </div>
    <div class="item-wrap">
      <div class="item-slider">
        <el-slider
          class="slider"
          v-model="sliderValueSet"
          :min="isMin"
          :max="88"
          range
          @change="onChange"
        ></el-slider>
      </div>
      <div class="item-slider-value">
        <div>{{ mintext }}</div>
        <div>88+</div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, toRefs } from "vue";
export default {
  name: "marketPlace",
  props: {
    sliderTitle: {
      type: String,
      default: "",
    },
    mintext: {
      type: String,
      default: "40",
    },
    isMin: {
      type: String,
      default: "40",
    },
    slideArrName: {
      type: String,
      default: "",
    },
    sliderValueSet: {
      type: Array,
      default: () => [40, 88],
    },
  },

  components: {},
  setup(props, context) {
    const state = reactive({
      // sliderValueSet: {
      //   list: [10, 40],
      // },
    });
    onMounted(() => {});
    const onChange = (e) => {
      context.emit("onChange", e, props.slideArrName);
    };
    const handleReset = () => {
      context.emit("handleReset", props.slideArrName);
    };
    return {
      ...toRefs(state),
      onChange,
      handleReset,
    };
  },
};
</script>

<style lang="less" scoped>
.main {
  .item-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 11px;
    font-family: GothamRounded-Book, GothamRounded;
    font-weight: normal;
    color: #ffffff;
    opacity: 0.48;
    .reset-btn {
      font-size: 11px;
      font-family: GothamRounded-Book, GothamRounded;
      font-weight: normal;
      color: #ffc763;
      cursor: pointer;
    }
  }
  .item-wrap {
    margin-top: 12px;

    .item-slider {
      .slider {
        /deep/ .el-slider__runway {
          background-color: #1a1716;
          height: 5px;
        }
        /deep/ .el-slider__bar {
          background-color: #f59e64;
          height: 5px;
        }
        /deep/ .el-slider__button {
          width: 12px;
          height: 12px;
          background-color: #dddddd;
          border: 1px solid #ffffff;
        }
      }
    }
    .item-slider-value {
      display: flex;
      justify-content: space-between;
      margin-top: 2px;
      font-size: 11px;
      font-family: GothamRounded-Medium, GothamRounded;
      font-weight: 500;
      color: #ffffff;
    }
  }
}
</style>
