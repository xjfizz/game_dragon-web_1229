/* 龙部分逻辑处理 */

// 导入配置功能

import { reactive, onMounted, toRefs, onBeforeUnmount, inject, getCurrentInstance, toRaw } from "vue";
import { useRouter, useRoute } from "vue-router";

import { initWallet, getSiner } from "@/utils/metaMask/ethers.js";

import common from "@/utils/common";
import { setSession, getSession, getStorage, getToken } from "@/utils/auth.js";






// 初始化数据
const state = reactive({
    applicatForm: {
        total: 0
    },
    isShow: false,
    gameVideoShow: false,
    playGameShow: false,
    activityBoxShow: false,
    activityStartShow: false,
    homeHeight: "",
    frontTransform: {
        front1: {
            translateX: 0,
            translateY: 0,
        },
        front2: {
            translateX: 0,
            translateY: 0,
        },
        front3: {
            translateX: 0,
            translateY: 0,
        },
    },
    qrCodeShow: false,
    qrCodeUrl: require('../../../../assets/imgs/home/down-load-game/down-load-game.png'),
});





export default function homeHandle() {

    const router = useRouter()
    const route = useRoute()
    const { ctx } = getCurrentInstance()
    const API = inject("API");
    const $message = inject("$message");



    // 鼠标偏移前景设置
    const touchmove = (e) => {

        let X = e.clientX
        let Y = e.clientY

        state.frontTransform = {
            front1: {
                translateX: (-(X / 1020)) + '%',
                translateY: (-(Y / 675)) + '%'
            },
            front2: {
                translateX: (-(X / 820)) + '%',
                translateY: (-(Y / 875)) + '%'
            },
            front3: {
                translateX: (-(X / 1420)) + '%',
                translateY: (-(Y / 1075)) + '%'
            }
        }
    }



    const setActivityNoFirst = () => {
        setSession("isNoFirstHome", true);
    };
    const showActivity = () => {
        if (!getSession("isNoFirstHome")) {
            state.activityBoxShow = true;
            setActivityNoFirst();
        }
    };

    const goToDetail = (item) => {
        router.push({ path: `/product/${item.goodsId}` });
    };

    const tips = () => {};
    // 打开视频弹框
    const openVideoBox = () => {
        state.gameVideoShow = true;
    };
    // 关闭视频弹框
    const closeVideoBox = () => {
        state.gameVideoShow = false;
    };
    const openPlayGameBox = () => {
        state.playGameShow = true;
    };
    // 关闭视频弹框
    const closePlayGameBox = () => {
        state.playGameShow = false;
    };
    const createEgg = () => {
        state.playGameShow = true;
        // initMoney();
    };
    const initMoney = async() => {
        let res = await initWallet();
        console.log("initMoney", res);
    };
    // 打开首页活动弹框
    const goActivity = () => {
        // router.push({ path: "/activityStart" });
        getActivityStartTime();
    };
    const closeActivity = () => {
        state.activityBoxShow = false;
    };
    const closeActivityStart = () => {
        state.activityStartShow = false;
    };
    const learnMore = () => {
        closeActivity();
        getActivityStartTime();
    };
    const getNowTime = () => {
        return new Promise((resolve, reject) => {
            API.activity.getServericeTime({}).then((res) => {
                resolve(res.data.timestamp);
                // resolve('1636167645975');
            });
        });
    };
    const getActivityStartTime = () => {
        // state.playGameShow = true;
        // return
        if (!getToken()) {
            return router.push({ path: "/login" });
        }
        let params = {
            id: getSession("user").uid,
        };
        API.activity.getActivityStartTime(params).then(async(res) => {
            console.log("res", res);
            if (res.code == 0) {
                console.log(
                    "getActivityStartTime",
                    new Date(),
                    new Date(res.data.recommendStartTime),
                    new Date(res.data.beginTime)
                );
                // let localTime = new Date().getTime();
                let localTime = await getNowTime();
                let beginTime1 = new Date(res.data.recommendStartTime).getTime();
                let beginTime2 = new Date(res.data.beginTime).getTime();
                if (localTime < beginTime1) {
                    // if (true) {
                    // 邀请活动之前
                    // state.activityStartShow = true;
                    let routeUrl = router.resolve({
                        path: "/activityBefore",
                    });
                    window.open(routeUrl.href, "_blank");
                } else if (
                    localTime >= beginTime1 &&
                    localTime < beginTime2 - 24 * 60 * 60 * 1000
                ) {
                    // 购买活动24小时前
                    // 邀请活动开启
                    let routeUrl = router.resolve({
                        path: "/activityStart",
                    });
                    window.open(routeUrl.href, "_blank");
                    // router.push({ path: "/activityStart" });
                } else if (localTime >= beginTime2 - 24 * 60 * 60 * 1000) {
                    // 购买已开启
                    let routeUrl = router.resolve({
                        path: "/activity",
                    });
                    window.open(routeUrl.href, "_blank");
                    //  router.push({ path: "/activity" });
                }
            }
        });
    };

    const isShowActivity = async() => {


        // let localTime = await getNowTime();
        // // let beginTime1 = new Date('2021/11/17 21:00:00').getTime();
        // let beginTime1 = process.env.NODE_ENV === "production" ? new Date('2021/11/17 20:00:00').getTime() : new Date('2021/11/17 20:00:00').getTime(); // start 
        // //  let beginTime1 =  new Date('2021/11/17 21:00:00').getTime() ; // start 
        // let beginTime2 = new Date('2021/11/19 20:00:00').getTime(); // end
        // if (localTime < beginTime1) {
        //     state.isShow = false
        // } else if (localTime >= beginTime1 && localTime < beginTime2) {
        //     state.isShow = true
        // } else if (localTime > beginTime2) {
        //     state.isShow = false
        // }

        state.isShow = true
    }

    const goSubmit = async() => {
        router.push({ path: "/luckDraw" });
    }


    const getApplicationTotal = () => {
        let params = {}
        API.dragonSignUp.getIdoTotal(params).then(res => {
            if (res.code == 0) {
                state.applicatForm.total = res.data.total
            }
        })
    }

    const downLoadGame = () => {
        state.qrCodeShow = true;
    }

    const closeImgCode = () => {
        state.qrCodeShow = false;
    };




    return {
        state,
        touchmove,
        goToDetail,
        tips,
        openVideoBox,
        closeVideoBox,
        openPlayGameBox,
        closePlayGameBox,
        createEgg,
        initMoney,
        goActivity,
        closeActivity,
        learnMore,
        closeActivityStart,
        goSubmit,
        showActivity,
        isShowActivity,
        getApplicationTotal,
        downLoadGame,
        closeImgCode,
    }
}