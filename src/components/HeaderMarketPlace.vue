
<template>
  <div class="head">
    <qrCode
      :qrCodeUrl="qrCodeUrl"
      @close="closeImgCode"
      v-if="qrCodeShow"
    ></qrCode>
    <div class="head-wrap">
      <div class="icon" @click="goPath('/', 5)"></div>
      <div class="menu-wrap">
        <div
          :class="
            selectItem == 3
              ? 'menu-item' + selectItem + ' menu-item-hover' + selectItem
              : 'menu-item' + selectItem
          "
          @click="goPath('/myMainland/myDragon', 3)"
        >
          <span>My Mainland</span>
        </div>
        <!-- <div
          :class="
            selectItem == 7
              ? 'menu-item' + selectItem + ' menu-item-hover' + selectItem
              : 'menu-item' + selectItem
          "
          @click="goPath('/dashboard', 7)"
        >
          <span>Dashboard</span>
        </div> -->

        <div
          :class="
            selectItem == 1
              ? 'menu-item' + selectItem + ' menu-item-hover' + selectItem
              : 'menu-item' + selectItem
          "
          @click="goPath('/marketPlace', 1)"
        >
          <span>Marketplace</span>
        </div>

        <!-- <div
          :class="
            selectItem == 4
              ? 'menu-item' + selectItem + ' menu-item-hover' + selectItem
              : 'menu-item' + selectItem
          "
          @click="goPath('/lbp', 4)"
        >
          <span>LBP</span>
        </div> -->
        <div class="user-wrap">
          <div class="buy-dms select-hover" @click="GoBuyDms">
            <div class="btn-left">Buy DMS</div>
            <!-- <div class="btn-right">$8.68</div> -->
          </div>
          <div
            v-if="loginState"
            class="show-qr select-hover"
            @click="showQrCode"
          >
            <div class="btn-left">
              <img
                src="@/assets/imgs/head/marketPlace/qr-code-line.png"
                alt=""
              />
            </div>
            <div class="btn-right">Show QR</div>
          </div>
          <div class="user-message" v-if="loginState">
            <div class="user-email" v-if="userEmail">
              {{ userEmail || "" }}
            </div>
            <div class="user-bottom">
              <div class="user-balance" v-if="userWalletBanlance">
                <img src="../assets/imgs/login/bnb.png" alt="" />
                {{
                  Number(userWalletBanlance).toFixed(4) > 0
                    ? Number(userWalletBanlance).toFixed(4)
                    : 0
                }}
              </div>
              <div class="user-address" v-if="userWalletAddress">
                [{{
                  userWalletAddress.substring(0, 6) +
                    "***" +
                    userWalletAddress.substring(
                      userWalletAddress.length - 4,
                      userWalletAddress.length
                    ) || 0
                }}]
              </div>
            </div>

            <!-- <div class="user-address" v-if="userWalletAddress">{{ userWalletAddress || "" }}</div> -->
          </div>
          <div v-if="selectItem != 4">
            <div
              v-if="!loginState"
              class="login-btn"
              @click="goPath('/login', 2)"
            >
              <span v-if="loginHeadText">Logout</span>
              <span v-else>Login</span>
            </div>
            <div v-else class="login-btn" @click="logout('/logout', 2)">
              <span>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  reactive,
  toRefs,
  inject,
  onMounted,
  computed,
  watch,
  readonly,
} from "vue";
import { ElMessageBox, ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import { getToken } from "@/utils/auth.js";
import { useStore } from "vuex";
import qrCode from "@/components/modalBox/qrCode/index.vue";
import QRCode from "qrcodejs2";
import { initWallet } from "@/utils/metaMask/ethers.js";
import { useI18n } from "vue-i18n"; //要在js中使用国际化
export default {
  components: {
    qrCode,
  },
  props: {
    classHeader: {
      type: Object,
      default: () => {},
    },
    headIndex: {
      type: String,
      default: "",
    },
    loginHeadText: {
      type: String,
      default: "",
    },
  },
  setup(props, context) {
    console.log("==", props.classHeader, context);
    const store = useStore();
    const router = useRouter();
    const API = inject("API");
    const { t } = useI18n();
    const $message = inject("$message");
    const state = reactive({
      classHeader: props.classHeader,
      loginHeadText: props.loginHeadText,
      name: "",
      selectItem: 1,
      qrCodeShow: false,
      qrCodeUrl: null,
      userEmail: null,
    });
    onMounted(() => {
      console.log("1111", state.classHeader, state.name);
      if (props.headIndex) {
        state.selectItem = props.headIndex;
      }

      if (getToken()) {
        getUserEmail();
      }
    });
    let loginState = computed(() => store.state.login.loginState); // 钱包连接标识
    let userWalletAddress = computed(() => store.state.login.userWalletAddress); // 钱包连接标识
    let userWalletBanlance = computed(
      () => store.state.login.userWalletBanlance
    ); // 钱包连接标识
    const count = computed(() => {
      return store.state.cartCount;
    });

    // watch(
    //   () => userWalletAddress,
    //   (v1, v2) => {
    //     getUserEmail();
    //   },
    //   {
    //     // immediate: true,
    //     deep: true,
    //     //  lazy:true
    //   }
    // );

    const getUserEmail = () => {
      if (!getToken()) {
        return;
      }
      let params = {
        // id: JSON.parse(getSession('user')).uid
      };
      API.activity.getUser(params).then(async (res) => {
        if (res.code == 0) {
          state.userEmail = res.data.email;
          let address = await initWallet();
          if (
            res.data &&
            res.data.walletAddress &&
            res.data.walletAddress != address
          ) {
            sessionStorage.clear();
            store.commit("login/SET_LOGIN");
            return $message({
              type: "warning",
              message: `Your wallet address does not match your account 【${res.data.walletAddress}】`,
              customClass: "zZindex",
              duration: 5000,
            });
          }
        }
      });
    };

    const goPath = (e, type) => {
      if (type == 1) {
        console.log("e", e);
        state.selectItem = type;
        router.push(e);
      } else if (type == 3) {
        state.selectItem = type;
        router.push(e);
      } else if (type == 4) {
        state.selectItem = type;
        router.push(e);
      } else if (type == 5) {
        state.selectItem = type;
        router.push(e);
      } else if (type == 2) {
        // marketPlace
        console.log(window);
        if (window.history.state.current == e) {
          context.emit("headHandle");
        } else {
          state.selectItem = type;
          router.push(e);
        }
      } else if (type == 7) {
        state.selectItem = type;
        router.push(e);
      }
    };

    const logout = () => {
      ElMessageBox.confirm("Are you sure you want to log out?", "Warning", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "warning",
      })
        .then(() => {
          sessionStorage.clear();
          store.commit("login/SET_LOGIN");
          ElMessage({
            type: "success",
            message: "Logout successful!",
          });
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "Logout canceled!",
          });
        });
    };

    const GoBuyDms = () => {
      window.open(
        "https://pancakeswap.finance/info/pool/0xce8b34910a536807c4ccaa5f35fe9e546ef733e8",
        "_blank"
      );
    };

    const showQrCode = async () => {
      state.qrCodeUrl = await getQrCode();
      console.log("qrCodeUrl", state.qrCodeUrl);
      state.qrCodeShow = true;
    };

    const getQrCode = () => {
      return new Promise((resolve, reject) => {
        let params = {};
        API.login.loginByQrCode(params).then((res) => {
          console.log(res);

          let img =
            "data:image/png;base64," +
            btoa(
              new Uint8Array(res).reduce(
                (res, byte) => res + String.fromCharCode(byte),
                ""
              )
            );

          resolve(img);
        });
      });
    };

    const closeImgCode = () => {
      state.qrCodeShow = false;
    };

    return {
      ...toRefs(state),
      count,
      goPath,
      loginState,
      userWalletAddress,
      userWalletBanlance,
      logout,
      GoBuyDms,
      showQrCode,
      closeImgCode,
    };
  },
};
</script>

<style lang="less" scoped >
.head {
  width: 100%;
  height: 80px;
  z-index: -1;
  background: #050303;

  .head-wrap {
    display: flex;
    // justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 5px 45px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;

    .icon {
      width: 151px;
      height: 72px;
      transform: scale(0.9);
      background-repeat: no-repeat;
      background-size: contain;
      background-position: 0;
      background-image: url("../assets/imgs/dragon-icon4.png");
      cursor: pointer;
    }
    .menu-wrap {
      margin-left: 31px;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      font-size: 16px;
      font-weight: 500;
      justify-content: flex-start;
      width: 100%;
      .user-wrap {
        margin-left: auto;
        display: flex;
        align-items: center;
        .buy-dms {
          margin-right: 24px;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 165px;
          height: 50px;
          border-radius: 25px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          .btn-left {
            font-size: 16px;
            font-family: GothamRounded-Medium, GothamRounded;
            font-weight: 500;
            color: #ffffff;
          }
          .btn-right {
            margin-left: 8px;
            font-size: 16px;
            font-family: GothamRounded-Medium, GothamRounded;
            font-weight: 500;
            color: #ffc763;
          }
        }
        .show-qr {
          margin-right: 24px;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 165px;
          height: 50px;
          border-radius: 25px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          .btn-left {
            display: flex;
            justify-content: center;
            align-items: center;
            img {
              width: 24px;
              height: 24px;
            }
          }
          .btn-right {
            margin-left: 8px;
            font-size: 16px;
            font-family: GothamRounded-Medium, GothamRounded;
            font-weight: 500;
            color: rgba(255, 255, 255, 1);
          }
        }
        .user-message {
          margin-right: 30px;
          font-size: 14px;
          font-family: GothamRounded-Medium, GothamRounded;
          color: #ffffff;
          width: 200px;
          text-align: center;
          .user-email {
          }
          .user-bottom {
            margin-top: 6px;
            display: flex;
            align-items: center;
            justify-content: center;
            .user-balance {
              font-size: 12px;
              font-family: GothamRounded;
              color: rgba(255, 255, 255, 0.68);
              display: flex;
              align-items: center;
              margin-right: 4px;
              img {
                width: 16px;
                height: 16px;
                margin-right: 2px;
              }
            }
            .user-address {
              color: rgba(255, 255, 255, 0.68);
              font-family: GothamRounded;
              margin-left: 3px;
              font-size: 12px;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              /*! autoprefixer: off */
              -webkit-box-orient: vertical;
              /* autoprefixer: on */
              -webkit-line-clamp: 1;
              word-break: break-all; /*追加这一行代码*/
            }
          }
        }
        .login-btn {
          width: 148px;
          height: 50px;
          background: #ffc763;
          border-radius: 25px;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          span {
            font-size: 16px;
            font-family: GothamRounded-Medium, GothamRounded;
            font-weight: 500;
            color: #2e0b00;
          }
        }
        .login-btn:hover {
          opacity: 0.8;
        }
      }

      .menu-item1 {
        position: relative;
        cursor: pointer;
        white-space: nowrap;
        margin-right: 47px;
        span {
          font-size: 16px;
          font-family: GothamRounded-Medium, GothamRounded;
          color: #ffffff;
          opacity: 0.68;
        }
      }
      .menu-item-hover1 {
        span {
          font-size: 16px;
          font-family: GothamRounded-Medium, GothamRounded;
          // font-weight: bold;
          color: #ffffff;
          opacity: 1;
        }
      }
      .menu-item1:hover {
        span {
          font-size: 16px;
          font-family: GothamRounded-Medium, GothamRounded;
          // font-weight: bold;
          color: #ffffff;
          opacity: 1;
        }
      }

      .menu-item2 {
        position: relative;
        cursor: pointer;
        white-space: nowrap;
        margin-right: 47px;
        span {
          font-size: 16px;
          font-family: GothamRounded-Medium, GothamRounded;
          color: #ffffff;
          opacity: 0.68;
        }
      }
      .menu-item-hover2 {
        span {
          font-size: 16px;
          font-family: GothamRounded-Bold, GothamRounded;
          font-weight: bold;
          color: #ffffff;
          opacity: 1;
        }
      }
      .menu-item2:hover {
        span {
          font-size: 16px;
          font-family: GothamRounded-Medium, GothamRounded;
          // font-weight: bold;
          color: #ffffff;
          opacity: 1;
        }
      }

      .menu-item3 {
        position: relative;
        cursor: pointer;
        white-space: nowrap;
        margin-right: 47px;
        span {
          font-size: 16px;
          font-family: GothamRounded-Medium, GothamRounded;
          color: #ffffff;
          opacity: 0.68;
        }
      }
      .menu-item-hover3 {
        span {
          font-size: 16px;
          font-family: GothamRounded-Bold, GothamRounded;
          font-weight: bold;
          color: #ffffff;
          opacity: 1;
        }
      }
      .menu-item3:hover {
        span {
          font-size: 16px;
          font-family: GothamRounded-Medium, GothamRounded;
          // font-weight: bold;
          color: #ffffff;
          opacity: 1;
        }
      }

      .menu-item4 {
        position: relative;
        cursor: pointer;
        white-space: nowrap;
        margin-right: 47px;
        span {
          font-size: 16px;
          font-family: GothamRounded-Medium, GothamRounded;
          color: #ffffff;
          opacity: 0.68;
        }
      }
      .menu-item-hover4 {
        span {
          font-size: 16px;
          font-family: GothamRounded-Bold, GothamRounded;
          font-weight: bold;
          color: #ffffff;
          opacity: 1;
        }
      }
      .menu-item4:hover {
        span {
          font-size: 16px;
          font-family: GothamRounded-Medium, GothamRounded;
          // font-weight: bold;
          color: #ffffff;
          opacity: 1;
        }
      }

      .menu-item5 {
        position: relative;
        cursor: pointer;
        white-space: nowrap;
        margin-right: 47px;
        span {
          font-size: 16px;
          font-family: GothamRounded-Medium, GothamRounded;
          color: #2e0b00;
          opacity: 0.68;
        }
      }
      .menu-item-hover5 {
        span {
          font-size: 16px;
          font-family: GothamRounded-Bold, GothamRounded;
          font-weight: bold;
          color: #2e0b00;
          opacity: 1;
        }
      }
      .menu-item5:hover {
        span {
          font-size: 16px;
          font-family: GothamRounded-Medium, GothamRounded;
          // font-weight: bold;
          color: #2e0b00;
          opacity: 1;
        }
      }

      .menu-item6 {
        position: relative;
        cursor: pointer;
        white-space: nowrap;
        margin-right: 47px;
        span {
          font-size: 16px;
          font-family: GothamRounded-Medium, GothamRounded;
          color: #2e0b00;
          opacity: 0.68;
        }
      }
      .menu-item-hover6 {
        span {
          font-size: 16px;
          font-family: GothamRounded-Bold, GothamRounded;
          font-weight: bold;
          color: #2e0b00;
          opacity: 1;
        }
      }
      .menu-item6:hover {
        span {
          font-size: 16px;
          font-family: GothamRounded-Medium, GothamRounded;
          // font-weight: bold;
          color: #2e0b00;
          opacity: 1;
        }
      }

      .menu-item7 {
        position: relative;
        cursor: pointer;
        white-space: nowrap;
        margin-right: 47px;
        span {
          font-size: 16px;
          font-family: GothamRounded-Medium, GothamRounded;
          color: #ffffff;
          opacity: 0.68;
        }
      }
      .menu-item-hover7 {
        span {
          font-size: 16px;
          font-family: GothamRounded-Bold, GothamRounded;
          font-weight: bold;
          color: #ffffff;
          opacity: 1;
        }
      }
      .menu-item7:hover {
        span {
          font-size: 16px;
          font-family: GothamRounded-Medium, GothamRounded;
          // font-weight: bold;
          color: #ffffff;
          opacity: 1;
        }
      }
    }
    .color {
      display: flex;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 2px;
      .color-item {
        flex: 1;
        height: 2px;
      }
    }
  }
}
</style>
