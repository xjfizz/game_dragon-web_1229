<template>
  <div class="lightning" v-show="showLighting">
    <div class="animation">
      <div class="animation-left">
        <img
          class="left"
          src="../../../../../assets/imgs/lightning/left.png"
          alt=""
        />
      </div>
      <div class="animation-center">
        <img
          class="center"
          src="../../../../../assets/imgs/lightning/center.png"
          alt=""
        />
        <img
          class="dim"
          src="../../../../../assets/imgs/lightning/dim.png"
          alt=""
        />
      </div>
      <div class="animation-right">
        <img
          class="right"
          src="../../../../../assets/imgs/lightning/right.png"
          alt=""
        />
        <img
          class="dim dim2"
          src="../../../../../assets/imgs/lightning/dim.png"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "lightning",

  props: {
    showLighting: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="less" scoped>
.lightning {
  position: relative;
  width: 239px;
  height: 269px;
  .imgs {
    width: 154px;
    height: 154px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
.animation {
  width: 264px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  .animation-left {
    width: 100px;
  }
  .animation-center {
    width: 108px;
    margin-left: -27.5px;
  }
  .animation-right {
    width: 111px;
    margin-left: -27.5px;
  }
  div {
    flex: 1;
    display: flex;
    height: 100%;
    img {
      opacity: 0;
    }
    img:nth-of-type(1) {
      width: 100px;
      height: 301px;
      animation-play-state: running;
    }
    .left {
      animation: lightning 0.2s ease 0.1s infinite alternate;
    }
    .center {
      animation: lightning 0.2s ease 0.2s infinite alternate;
      animation-play-state: running;
    }
    .right {
      transform: rotate(360deg);
      animation: lightning 0.2s ease 0.3s infinite alternate;
    }

    .dim {
      width: 112px;
      height: 300px;
      margin-left: -125px;
      animation: lightning2 0.15s ease 0.2s infinite alternate;
      animation-play-state: running;
      transform: rotate(360deg);
    }

    .dim2 {
      transform: rotate(180deg);
      margin-left: -110px;
      animation: lightning2 0.18s ease 0.3s infinite alternate;
      animation-play-state: running;
    }
  }
}
@keyframes lightning2 {
  0% {
    opacity: 100%;
  }
  50% {
    opacity: 50%;
  }

  100% {
    opacity: 0;
  }
}
@keyframes lightning {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 50%;
  }
  100% {
    opacity: 100%;
  }
}
@keyframes lightning3 {
  0% {
    opacity: 50;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 100%;
  }
}
</style>
