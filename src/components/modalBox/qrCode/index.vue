<template>
  <div class="modal-backdrop">
    <div class="modal">
      <div class="modal-contain">
        <div class="modal-content">
          <div class="title">Login with QR Code</div>
          <div class="title-des">DO NOT share this QR code to anyone</div>
          <div class="qr-code-img">
            <img :src="qrCode" alt="" />
          </div>
        </div>
      </div>

      <div class="close" @click="close">
        <img src="@/assets/imgs/openBox/img-code/close.png" alt="" />
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
    });
    onMounted(() => {
      // init();
    });

    const close = () => {
      context.emit("close");
    };

    return {
      ...toRefs(state),
      close,
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
  background-color: rgba(20, 19, 19, 0.86);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99999999;
}
.modal {
  width: 588px;
  height: 450px;
  background: #282523;
  border-radius: 8px;
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.12);

  .modal-contain {
    height: 100%;
    width: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    .modal-content {
      margin: 32px 70px;
      .title {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 24px;
        font-family: GothamRounded-Medium, GothamRounded;
        font-weight: 500;
        color: #ffffff;
      }
      .title-des {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 24px;
        font-size: 14px;
        font-family: GothamRounded-Book, GothamRounded;
        font-weight: normal;
        color: rgba(255, 255, 255, 0.86);
      }
      .qr-code-img {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 48px;

        img {
          width: 235px;
          height: 235px;
        }
      }

      .no-data {
        opacity: 0.55;
      }
    }
  }

  .close {
    cursor: pointer;
    position: absolute;
    right: -17px;
    top: -17px;
    img {
      width: 32px;
      height: 32px;
    }
  }
}
</style>
