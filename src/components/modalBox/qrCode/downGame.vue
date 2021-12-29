<template>
  <div class="modal-backdrop">
    <div class="modal">
      <div class="modal-contain">
        <div class="modal-content">
          <div class="modal-contain-title">
            Scan the QR code to download the APP and start your epic Dragon
            Mainland journey now!
          </div>
          <div class="modal-contain-text">
            <div class="modal-contain-text-top-text">
              <img
                src="@/assets/imgs/home/down-load-game/down-load-game2.png"
                alt=""
              />
            </div>
            <div class="down-link select-hover" @click="downLink">
              {{ downUrl }}
            </div>
          </div>
        </div>
      </div>
      <div class="modal-close" @click="close">
        <img src="@/assets/imgs/openBox/play-game/play-game-close.png" />
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted } from "vue";

export default {
  components: {},
  props: {
    qrCodeUrl: {
      type: String,
      default: "",
    },
  },
  setup(props, context) {
    // console.log("props", props);
    const state = reactive({
      qrCode: props.qrCodeUrl,
      downUrl: " https://dragonmainland.io/api/downloads/dragon/android",
    });
    onMounted(() => {
      // init();
    });

    const close = () => {
      context.emit("close");
    };

    const downLink = () => {
      window.open(state.downUrl, "_blank");
    };

    return {
      ...toRefs(state),
      close,
      downLink,
    };
  },
};
</script>

<style scoped lang="less">
.modal-backdrop {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.86);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99999999;
}
.modal {
  width: 836px;
  height: 527px;
  // background: #140500;
  border-radius: 16px;
  position: relative;

  .modal-contain {
    height: 100%;
    width: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    background-image: url("../../../assets/imgs/openBox/play-game/play-game-bc.png");
    .modal-content {
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      .modal-contain-title {
        margin-top: 130px;
        text-align: center;
        width: 436px;
        height: 42px;
        font-size: 14px;
        font-family: GothamRounded-Medium, GothamRounded;
        font-weight: 500;
        color: #2e0b00;
      }
      .modal-contain-text {
        margin-top: 16px;
        width: 572px;
        text-align: center;
        font-size: 24px;
        font-family: GothamRounded-Medium;
        color: #2e0b00;
        line-height: 32px;

        img {
          width: 168px;
          height: 168px;
        }
        .down-link {
          margin-top: 16px;
          font-size: 14px;
          font-family: GothamRounded-Book, GothamRounded;
          font-weight: normal;
          color: #d58047;
          cursor: pointer;
        }
      }
    }
  }
  .modal-close {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 40px;
    cursor: pointer;
    img {
      width: 200px;
      height: 83px;
    }
  }
}
</style>
