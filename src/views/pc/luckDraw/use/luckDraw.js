import { reactive, onMounted, toRefs, onBeforeUnmount, inject, getCurrentInstance, toRaw, computed, watch, nextTick } from "vue";
import { useStore } from 'vuex'
import { useRouter, useRoute } from "vue-router";
import { getSession, setSession, getToken, setCookie } from "@/utils/auth.js";
import { initWallet, myWallet, getDragonMainlandShardIDOContract, getBalanceHandle, setApprovalForAll, isApprovedForAll } from "@/utils/metaMask/ethers.js";
import { ethers, BigNumber } from "ethers";
import pageHandle from '@/components/page/use/index.js'
import { useI18n } from "vue-i18n"; //要在js中使用国际化






// 初始化数据
const luckDrawState = reactive({
    loadingForm: {
        loadingShowText: 'Loading...',
        loadingShow: false,
    },
    isLottery: false,
    withdrawmsgList: [
        ' Buy any DM NFT (Dragons, eggs or skulls) in the Marketplace during the event for a chance to win up to 10,000 DMS.',
        ' Get between 2 to 10,000 DMS, one time per user. The DMS to be distributed 3 days after the draw.',
        ' Merry Christmas!'
    ],
    withdrawmsgShow: false,
    drawSuccessShow: false,
    lotteryResult: null,
    isHaveLottery: false,
    luckList: [],
    listMoveTime: null,
});








export default function luckDrawHandle() {

    const router = useRouter()
    const route = useRoute()

    const { ctx } = getCurrentInstance()
    const API = inject("API");
    const $message = inject("$message");
    const { t } = useI18n();
    const store = useStore();
    const { initPage } = pageHandle()
        //  onMounted(() => {});


    const init = async() => {
        initData()
        luckDrawState.isLottery = await getIsLottery()
        luckDrawState.isHaveLottery = await initList()
        getLuckList()
        console.log('luckDrawState.isLottery', luckDrawState.isLottery)
    }

    const initData = () => {
        luckDrawState.isLottery = false
        luckDrawState.drawSuccessShow = false
        luckDrawState.lotteryResult = null
    }

    const initList = async() => {
        return new Promise(async(resolve, reject) => {
            let address = await initWallet()
            let params = {
                address: address
            }
            API.luckDraw.getLottery(params).then(res => {
                if (res.code == 0) {
                    if (res.data) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }

                }
            })
        })
    }


    const getIsLottery = async() => {
        return new Promise(async(resolve, reject) => {
            let address = await initWallet()
            let params = {
                address: address
            }
            API.luckDraw.isLottery(params).then(res => {
                if (res.code == 0) {
                    resolve(res.data);
                }
            })
        })
    }

    const startLottery = () => {
        if (!luckDrawState.isLottery) return
            // luckDrawState.drawSuccessShow = true
        loadingHandle(true, 'Drawing in progress...')
        startLotteryApi()
    }
    const startLotteryApi = async() => {
        let address = await initWallet()
        let params = {
            address: address
        }
        API.luckDraw.lottery(params).then(async res => {
            if (res.code == 0) {
                await sleepPrograme(2000)
                    // $message({
                    //     type: 'success',
                    //     message: 'Drawing successful',
                    //     customClass: 'zZindex',
                    // })
                loadingHandle(false)
                luckDrawState.lotteryResult = res.data
                luckDrawState.drawSuccessShow = true
            } else {
                loadingHandle(false)
                $message({
                    type: 'warning',
                    message: res.msg,
                    customClass: 'zZindex',
                })
            }
        })
    }

    const sleepPrograme = async(time) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(true)
            }, time)
        })
    }


    const back = () => {
        router.back()
    }

    const closeSuccess = async() => {
        await init()
    }

    const loadingHandle = (flag, text) => {
        if (luckDrawState.loadingForm.loadingShow) {
            luckDrawState.loadingForm.loadingShow = false;
        }
        nextTick(() => {
            luckDrawState.loadingForm.loadingShow = flag ? flag : false;
            luckDrawState.loadingForm.loadingShowText = text ? text : "Loading...";
        });
    };

    const getLuckList = () => {
        let params = {}
        API.luckDraw.getLuckList(params).then(res => {
            if (res.code == 0) {
                luckDrawState.luckList = res.data
                if (luckDrawState.luckList.length > 1) {
                    listMove()
                }
            }
        })
    }

    const listMove = () => {
        nextTick(() => {
            let luckWrapID = document.getElementById('luck-wrap')
            let time = 0
            if (luckDrawState.listMoveTime) {
                clearInterval(luckDrawState.listMoveTime)
            }
            luckDrawState.listMoveTime = setInterval(() => {
                time++
                luckWrapID.style.top = -(0 + time * 1) + 'px'
                console.log(time)
                if (time >= (30 * (luckDrawState.luckList.length + 1))) {
                    luckWrapID.style.top = 0
                    clearInterval(luckDrawState.listMoveTime)
                    listMove()
                        // clearInterval(luckDrawState.loveTime)
                }
            }, 100)
        })
    }


    return {
        luckDrawState,
        init,
        startLottery,
        back,
        closeSuccess,
    }
}