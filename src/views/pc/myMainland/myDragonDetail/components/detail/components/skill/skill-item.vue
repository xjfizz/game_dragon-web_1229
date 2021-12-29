<template>
  <div class="skill-item-main-wrap">
    <div
      class="skill-item-main"
      :style="{
        'background-image': 'url(' + getSkillItemBac(item.clazz) + ')',
      }"
    >
      <div
        class="energy-top"
        :style="{
          'background-image': 'url(' + getSkillItemNumBac(item.clazz) + ')',
        }"
      >
        <div class="top-num">{{ item.energy }}</div>
      </div>
      <div class="item-title">{{ item.nameEn }}</div>
      <div
        class="item-mid"
        :style="{
          'background-image':
            'url(' + getSkillItemMidBac(item.clazz, item.prefab) + ')',
        }"
      ></div>
      <div
        class="item-attack"
        :style="{
          'background-image': 'url(' + getSkillItemAttack(item.clazz) + ')',
        }"
      >
        <div
          class="item-attack-icon"
          :style="{
            'background-image': 'url(' + getSkillItemAttackIcon() + ')',
          }"
        >
          <div class="value">{{ item.damage }}</div>
        </div>
      </div>
      <div
        class="item-defence"
        :style="{
          'background-image': 'url(' + getSkillItemAttack(item.clazz) + ')',
        }"
      >
        <div
          class="item-attack-icon"
          :style="{
            'background-image': 'url(' + getSkillItemDefenceIcon() + ')',
          }"
        >
          <div class="value">{{ item.shield }}</div>
        </div>
      </div>
      <div
        :class="
          item.clazz != 5 ? 'item-bottom' : 'item-bottom item-bottom-color'
        "
      >
        {{ common.formatText(item.des) }}
      </div>
    </div>
    <div class="skill-level-wrap">
      <div class="mid-level">
        <div
          class="level-wrap"
          v-for="(item1, index) in item.level - 1"
          :key="index"
        >
          <img src="@/assets/imgs/myMainland/devouring/star-level.png" alt="" />
        </div>
        <div
          class="level-wrap"
          v-for="(item1, index) in 4 - item.level"
          :key="index"
        >
          <img
            src="@/assets/imgs/myMainland/devouring/star-no-level.png"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, toRefs } from "vue";
import { useRouter } from "vue-router";
import common from "@/utils/common";
import myDragonDetail from "@/views/pc/myMainland/use/myDragonDetail";
import myDragon from "@/views/pc/myMainland/use/myDragon";

export default {
  name: "detail1",
  components: {},
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    const router = useRouter();
    const state = reactive({
      item: props.item,
    });
    const {
      myDragonState,

      dragonClazzImgHandle,
    } = myDragon();
    const {
      myDragonDetailState,
      getSkillItemBac,
      getSkillItemNumBac,
      getSkillItemMidBac,
      getSkillItemAttack,
      getSkillItemAttackIcon,
      getSkillItemDefenceIcon,
    } = myDragonDetail();
    onMounted(() => {
      common.goTopScroll();
    });

    return {
      ...toRefs(state),
      ...toRefs(myDragonState),
      ...toRefs(myDragonDetailState),
      dragonClazzImgHandle,
      getSkillItemBac,
      getSkillItemNumBac,
      getSkillItemMidBac,
      getSkillItemAttack,
      getSkillItemAttackIcon,
      getSkillItemDefenceIcon,
      common,
    };
  },
};
</script>

<style lang="less" scoped >
@scaleSize: 0.35;
.skill-item-main-wrap {
  .skill-item-main {
    //width: calc(240px);
    //height: calc(338px);
    width: calc(605px * @scaleSize);
    height: calc(852px * @scaleSize);
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
    .energy-top {
      position: absolute;
      top: -20px;
      left: -20px;
      width: calc(192px * 0.3);
      height: calc(185px * 0.3);
      background-repeat: no-repeat;
      background-size: cover;
      display: flex;
      justify-content: center;
      align-items: center;
      .top-num {
        font-size: 30px;
        font-family: WendyOne-Regular, WendyOne;
        font-weight: 400;
        color: #ffffff;
        line-height: 37px;
        -webkit-text-stroke: 1px #2e0b00;
        text-stroke: 1px #2e0b00;
      }
    }
    .item-title {
      position: absolute;
      // left: 50%;
      top: 28px;
      // transform: translateX(-50%);
      width: 100%;
      height: 26px;
      font-size: 24px;
      font-family: WendyOne-Regular, WendyOne;
      font-weight: 400;
      color: #ffffff;
      line-height: 26px;
      -webkit-text-stroke: 1px #2e0b00;
      text-stroke: 1px #2e0b00;
      display: flex;
      justify-content: center;
    }
    .item-mid {
      position: absolute;
      left: 50%;
      top: 65px;
      transform: translate(-50%);
      width: calc(553px * @scaleSize);
      height: calc(359px * @scaleSize);
      background-repeat: no-repeat;
      background-size: cover;
    }
    .item-attack {
      position: absolute;
      left: -17px;
      top: 75px;
      width: calc(194px * @scaleSize);
      height: calc(191px * @scaleSize);
      background-repeat: no-repeat;
      background-size: cover;
      display: flex;
      justify-content: center;
      align-items: center;
      .item-attack-icon {
        width: calc(108px * @scaleSize);
        height: calc(113px * @scaleSize);
        background-repeat: no-repeat;
        background-size: cover;
        display: flex;
        justify-content: center;
        align-items: center;
        .value {
          font-size: 20px;
          font-family: WendyOne-Regular, WendyOne;
          font-weight: 400;
          color: #ffffff;
          line-height: 21px;
          // -webkit-text-stroke: 2px #2e0b00;
          // text-stroke: 2px #2e0b00;
        }
      }
    }
    .item-defence {
      position: absolute;
      left: -17px;
      top: 151px;
      width: calc(194px * @scaleSize);
      height: calc(191px * @scaleSize);
      background-repeat: no-repeat;
      background-size: cover;
      display: flex;
      justify-content: center;
      align-items: center;
      .item-attack-icon {
        width: calc(108px * @scaleSize);
        height: calc(113px * @scaleSize);
        background-repeat: no-repeat;
        background-size: cover;
        display: flex;
        justify-content: center;
        align-items: center;
        .value {
          font-size: 20px;
          font-family: WendyOne-Regular, WendyOne;
          font-weight: 400;
          color: #ffffff;
          line-height: 21px;
          // -webkit-text-stroke: 2px #2e0b00;
          // text-stroke: 2px #2e0b00;
        }
      }
    }
    .item-bottom {
      position: absolute;
      left: 50%;
      top: 200px;
      transform: translate(-50%);
      width: 140px;
      height: 50px;
      font-size: 12px;
      font-family: GothamRounded-Book, GothamRounded;
      font-weight: normal;
      color: rgba(255, 255, 255, 0.68);
      line-height: 20px;
      word-wrap: break-word;
      word-break: break-all;
    }
    .item-bottom-color {
      color: #2e0b00;
    }
  }
  .skill-level-wrap {
    display: flex;
    justify-content: center;
    .mid-level {
      margin-top: 4px;
      display: flex;
      align-items: center;
      .level-wrap:last-child {
        margin-right: 0;
      }
      .level-wrap {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 16px;
        img {
          width: 16px;
          height: 16px;
        }
      }
    }
  }
}
</style>