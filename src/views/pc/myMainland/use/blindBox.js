/* 龙部分逻辑处理 */

// 导入配置功能

import { reactive, onMounted, toRefs, onBeforeUnmount, inject, getCurrentInstance, toRaw, nextTick, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { getStorage, setCookie, setSession, getSession } from "@/utils/auth.js";
import { initWallet, myWallet, transferAccounts, getDpmWithdrawContract, getBalanceHandle, setApprovalForAll, isApprovedForAll, getDragonMainlandShardsTokenContract, getDragonBlindboxContract } from "@/utils/metaMask/ethers.js";
import { ethers, BigNumber } from "ethers";
import { useI18n } from "vue-i18n"; //要在js中使用国际化
import common from "@/utils/common";
import { useStore } from "vuex";
import { Decimal } from 'decimal.js'
import pageHandle from '@/components/page/use/index.js'
import Confetti from "@/assets/lottie/open-box/data.json";



// 初始化数据
const blindBoxState = reactive({
    loadingForm: {
        loadingShowText: 'Loading...',
        loadingShow: false,
    },
    pageLoadingForm: {
        loadingShowText: 'Loading...',
        loadingShow: false,
    },
    approveForm: {
        // dragon: { approve: false, step: 0 },
        dms: { approve: false, balance: 0, step: 0 },
    },
    pageInfo: {
        pageSize: 20,
        currentPage: 1,
        total: 0,
        totalPages: 0,
    },
    list: [],
    selectListShow1: false,
    selectItem1: {},
    selectList1: [

    ],
    selectListShow2: false,
    selectItem2: {},
    selectList2: [

    ],
    searchKey: {
        periods: 1,
        address: ''
    },
    dragonBoxBuyShow: false,
    openDragonBoxShow: false,
    openBoxSuccessShow: false,
    claimDmsShow: false,
    localDragonSKullForm: {}, // 本期龙骨信息
    wallet: {
        dms: 0
    },
    userDragonBox: {}, // 用户宝箱信息
    userDragonInfo: {}, // 用户背包龙骨信息
    isBuyBoxState: false, // 用户是否购买过宝箱
    isBuyBoxResultState: false, // 用户是否中标
    isOpenBox: false, // 是否到开奖时间
    isBoxStartBuy: 1, // 1 活动-未开始，2开始， 3 结束
    ableClaimBalance: 0,
    isHaveNext: true, // 是否有下一期
    dragonBoxStartAnimation: { // 开宝箱动画

    }
});





export default function blindBoxHandle() {

    const router = useRouter()
    const route = useRoute()
    const { ctx } = getCurrentInstance()
    const API = inject("API");
    const $message = inject("$message");
    const Moment = inject("$Moment");
    const store = useStore()
    const { t } = useI18n();
    const { initPage } = pageHandle()


    onMounted(() => {
        //  getList()
    })


    const init = async() => {
        blindBoxState.dragonBoxBuyShow = false
        blindBoxState.openDragonBoxShow = false
        blindBoxState.openBoxSuccessShow = false
        blindBoxState.claimDmsShow = false
        blindBoxState.selectItem1 = {}
        blindBoxState.selectList1 = []
        blindBoxState.selectItem2 = {}
        blindBoxState.selectList2 = []
        blindBoxState.localDragonSKullForm = {}
        blindBoxState.wallet = {
            dms: 0
        }
        blindBoxState.userDragonBox = {}
        blindBoxState.localDragonSKullForm = {}
        blindBoxState.userDragonInfo = {}
        blindBoxState.localDragonSKullForm = {}
        blindBoxState.isBuyBoxState = false
        blindBoxState.isBuyBoxResultState = false
        blindBoxState.isOpenBox = false
        blindBoxState.isBoxStartBuy = 1
        blindBoxState.ableClaimBalance = 0
        if (
            blindBoxState.localDragonSKullForm &&
            blindBoxState.localDragonSKullForm.countDownFn
        ) {
            clearInterval(blindBoxState.localDragonSKullForm.countDownFn);
        }
        getNowConfig()
        getConfigs()
        getUserSkullInfo()
        getBlindboxListUserBoxs()
        await getaAbleClaimBalance()


    }

    const initPageInfo = () => {
        blindBoxState.pageInfo.currentPage = 1
    }

    const getBlindboxListUserBoxs = () => {
        let params = {

        }
        API.blindBox.blindboxListUserBoxs(params).then(res => {
            if (res.code == 0) {
                blindBoxState.selectList1 = res.data
                if (res.data.length > 0) {
                    blindBoxState.selectList1 = res.data.map(item => {
                        return {
                            id: item.cycle,
                            name: 'Issue' + item.cycle,
                            level: item.level,
                            clazz: item.clazz,

                        }
                    })
                }

            }
        })
    }

    const getList = () => {
        let params = {
            limit: blindBoxState.pageInfo.pageSize,
            page: blindBoxState.pageInfo.currentPage,
            cycle: blindBoxState.searchKey.periods,
            address: blindBoxState.searchKey.address,
        }
        API.blindBox.blindboxList(params).then(res => {
            if (res.code == 0) {
                blindBoxState.list = res.data.list
                let pageInfo = {
                    pageSize: res.data.size,
                    currentPage: res.data.curPage,
                    total: res.data.total,
                    totalPages: res.data.totalPages,
                }
                blindBoxState.pageInfo = pageInfo
                initPage(pageInfo)
                loadingHandle(false)
            }
        })
    }


    const getUserSkullInfo = () => {
        let params = {}
        API.blindBox.userSkullInfo(params).then(res => {
            if (res.code == 0) {
                blindBoxState.userDragonInfo = res.data
            }
        })
    }

    const selectItem = (e) => {
        console.log(e)
        blindBoxState.searchKey.periods = e.id
        initPageInfo()
        getList()
    }

    const leftPage = () => {
        if (blindBoxState.pageInfo.currentPage <= 1) {
            return
        }
        blindBoxState.pageInfo.currentPage--
            getList()
    }
    const rightPage = () => {
        if (blindBoxState.pageInfo.currentPage >= blindBoxState.pageInfo.totalPages) {
            return
        }
        blindBoxState.pageInfo.currentPage++
            getList()
    }

    const search = (data) => {
        blindBoxState.pageInfo.currentPage = Number(data)
        getList()
    }

    const confirmSearch = () => {
        blindBoxState.pageInfo.currentPage = 1
        console.log(blindBoxState.searchKey)
            // if (!blindBoxState.searchKey.address) return
        loadingHandle(true, 'loading...')
        getList()
    }

    const loadingHandle = (flag, text) => {
        if (blindBoxState.loadingForm.loadingShow) {
            blindBoxState.loadingForm.loadingShow = false

        }
        nextTick(() => {
            blindBoxState.loadingForm.loadingShow = flag ? flag : false
            blindBoxState.loadingForm.loadingShowText = text ? text : 'Search...'
        })

    }


    const getNowConfig = () => {
        let params = {}
        API.blindBox.getNowConfig(params).then(async res => {
            if (res.code == 0) {
                if (res.data.startTime) {
                    blindBoxState.isHaveNext = true
                    blindBoxState.localDragonSKullForm = res.data
                        // blindBoxState.localDragonSKullForm.startTime = 1639123809000
                        // blindBoxState.localDragonSKullForm.endTime = 1639124109000
                        // blindBoxState.localDragonSKullForm.openTime = 1639131189000
                        // blindBoxState.localDragonSKullForm.nextStartTime = 1639137600000

                    blindBoxState.localDragonSKullForm.countDownTime = "00:00:00:00"
                    await countDown()
                    await getBoxBuyState()
                } else {
                    // blindBoxState.pageLoadingForm.loadingShow = true
                    blindBoxState.localDragonSKullForm = res.data
                    blindBoxState.isHaveNext = false
                }



                // blindBoxState.pageLoadingForm.loadingShow = false


            } else {
                return $message({
                    type: 'warning',
                    message: res.msg,
                    customClass: 'zZindex',
                })
            }
        })
    }

    const getConfigs = () => {
        let params = {}
        API.blindBox.getConfigs(params).then(res => {
            if (res.code == 0) {
                let list = res.data.map(item => {
                    return {
                        id: item.cycle,
                        name: 'Issue' + item.cycle,
                    }
                })
                blindBoxState.selectList2 = res.data.length > 0 ? list : [{ id: 1, name: "Issue 1" }, ]
                blindBoxState.searchKey.periods = blindBoxState.selectList2[0].id
                getList()

            }
        })
    }



    const countDown = async() => {
        let item = blindBoxState.localDragonSKullForm
        let startTime = await getNowTime(); //当前时间
        blindBoxState.isOpenBox = item.openTime <= startTime
        if (startTime < item.startTime) {
            blindBoxState.isBoxStartBuy = 1
        } else if (startTime >= item.startTime && startTime < item.endTime) {
            blindBoxState.isBoxStartBuy = 2
        } else {
            blindBoxState.isBoxStartBuy = 3
        }

        const contract = getDragonBlindboxContract()
        console.log('contract', contract)
        try {
            let contractBuyRes = 0
            if (blindBoxState.isBoxStartBuy == 2 && !blindBoxState.isOpenBox) {
                try {
                    contractBuyRes = await contract.getApplyCount()
                    console.log('contractBuyRes================', contractBuyRes)
                } catch (error) {
                    console.log('error', error)
                }

            } else if (blindBoxState.isBoxStartBuy == 3 && !blindBoxState.isOpenBox) {
                contractBuyRes = await getBuyTotal(blindBoxState.localDragonSKullForm.cycle)
            } else {
                contractBuyRes = 0 // blindBoxState.localDragonSKullForm.max
            }


            console.log('contractBuyRes', contractBuyRes)
            console.log('contractBuyRes', contractBuyRes.toString())
                // blindBoxState.localDragonSKullForm.restTotal = blindBoxState.localDragonSKullForm.max - (contractBuyRes.toString())
            blindBoxState.localDragonSKullForm.restTotal = contractBuyRes.toString()
        } catch (error) {
            console.log(error)
        }


        blindBoxState.pageLoadingForm.loadingShow = true
        if (blindBoxState.isOpenBox) {
            await getBoxBuyResultState()
        }

        let end = blindBoxState.isBoxStartBuy == 1 ? new Date(item.nextStartTime) : new Date(item.endTime); //结束时间
        // let end = new Date(item.endTime); //结束时间
        let result = parseInt((end - startTime) / 1000); //计算出豪秒
        if (
            blindBoxState.localDragonSKullForm &&
            blindBoxState.localDragonSKullForm.countDownFn
        ) {
            clearInterval(blindBoxState.localDragonSKullForm.countDownFn);
        }
        blindBoxState.localDragonSKullForm.countDownFn = setInterval(async() => {
            result -= 1
            console.log('result', result)

            item.countDownTime = countDownFun(result);
            console.log('item.countDownTime', item.countDownTime)
            if (result <= 0) {
                blindBoxState.localDragonSKullForm.isBoxStartBuy = false
                item.countDownTime = '00:00:00:00';
                return clearInterval(blindBoxState.localDragonSKullForm.countDownFn)
            }



        }, 1000)
    }

    const getNowTime = () => {
        return new Promise((resolve, reject) => {
            API.activity.getServericeTime({}).then(res => {
                resolve(res.data.timestamp)
                    // resolve(1639137600000)
            })

        })

    }


    const getBuyTotal = (value) => {
        return new Promise((resolve, reject) => {
            let params = {
                cycle: value
            }
            API.blindBox.getBuyTotal(params).then(res => {
                if (res.code == 0) {
                    resolve(res.data.count)
                }
            })
        })

    }

    // 时间校对
    const refreshPage = () => {
        window.location.reload();

    }

    //倒计时
    const countDownFun = (result) => {

        /* 倒计时5分钟强制刷新 */
        if (result >= (1 * 1) && result < (1 * 1 + 1)) {
            refreshPage()
        }
        // console.log(time)

        let d = parseInt(result / (24 * 60 * 60)); //用总共的秒数除以1天的秒数
        let h = parseInt((result / (60 * 60)) % 24); //精确小时，用去余
        let m = parseInt((result / 60) % 60); //剩余分钟就是用1小时等于60分钟进行趣余
        let s = parseInt(result % 60);
        //当倒计时结束时，改变内容
        if (result <= 0) {
            return '00:00:00:00';
        }
        if (d < 10) {
            d = "0" + d;
        }
        if (h < 10) {
            h = "0" + h;
        }
        if (m < 10) {
            m = "0" + m;
        }
        if (s < 10) {
            s = "0" + s;
        }
        if (d == 0 && h == 0 && m == 0) {
            //   return "剩余" + s + "秒";
            //  return ['00', '00', '00', s];
            return `00:00:00:${s}`;
        } else if (d == 0 && h == 0) {
            //  return "剩余" + m + "分" + s + "秒";
            // return ['00', '00', m, s];
            return `00:00:${m}:${s}`;
        } else if (d == 0) {
            // return "剩余" + h + "时" + m + "分" + s + "秒";
            // return ['00', h, m, s];
            return `00:${h}:${m}:${s}`;
        } else {
            // return "剩余" + d + "天" + h + "时" + m + "分" + s + "秒";
            // return [d, h, m, s];
            return `${d}:${h}:${m}:${s}`;
        }
    }

    const buyBox = async() => {
        blindBoxState.dragonBoxBuyShow = true
        await checkApproveForBoxDms(getDragonMainlandShardsTokenContract)
        await getDmsBalance()

    }

    const approveForDms = async() => {
        await approveDmsForBox()
    }


    const buyBoxConfirm = async() => {
        await buyBoxConfirmAPi()

    }




    const cancelBuyBox = () => {
        blindBoxState.dragonBoxBuyShow = false
    }

    const openDragonBox = () => {
        boxStart()
            // blindBoxState.openDragonBoxShow = true
    }

    const openBox = async() => {
        // 调试开宝箱动画
        // playDragonBox()
        // setTimeout(async () => {
        //     await contractRespOpenBoxSuccess()
        // }, 1500);
        await openBoxConfirmAPi()
    }

    const boxStart = () => {
        let confettiConDragonBox = ref(null);
        blindBoxState.dragonBoxStartAnimation.defaultOptions = {
            container: confettiConDragonBox.value,
            animationData: Confetti,
            loop: false,
            autoplay: false,
        }
        blindBoxState.dragonBoxStartAnimation.anim = {}

        blindBoxState.openDragonBoxShow = true
        blindBoxState.selectItem1 = blindBoxState.selectList1[0]
    }

    const handleAnimation = (anim) => {
        blindBoxState.dragonBoxStartAnimation.anim = anim;
        console.log(anim);
    }

    const playDragonBox = () => {
        blindBoxState.dragonBoxStartAnimation.anim.goToAndPlay(0, true);
    };


    const cancelOpenBox = () => {
        blindBoxState.openDragonBoxShow = false
    }

    const selectItemHandle1 = (item) => {
        console.log(item)
        blindBoxState.selectItem1 = item;
    }

    const closeOpenBoxSuccess = async() => {
        await init()
        blindBoxState.openBoxSuccessShow = false
    }

    const claimDms = () => {
        blindBoxState.claimDmsShow = true
    }

    const claimDmsHandle = async() => {
        //  blindBoxState.claimDmsShow = false
        await claimDmsBoxConfirmAPi()
    }

    const calcelClaim = () => {
        blindBoxState.claimDmsShow = false
    }

    // 合约授权检测-宝箱-dms
    const checkApproveForBoxDms = async(contractFuc) => {
            loadingHandle(true, 'Authorisation for testing in progress...')
            let contract = contractFuc()
            const contractAddress = getDragonBlindboxContract()
            let address = await initWallet()
            let params = {
                address: address,
                contractAddress: contractAddress.address,
            }
            console.log('contract', contract)
            let contractRes = await contract.allowance(params.address, params.contractAddress)
            let balance = ethers.utils.formatEther(contractRes)
            console.log('balance', balance)
            if (balance > 0) {
                blindBoxState.approveForm.dms.approve = true
                blindBoxState.approveForm.dms.balance = balance
                blindBoxState.approveForm.dms.step = 1
            } else {
                blindBoxState.approveForm.dms.approve = false
                blindBoxState.approveForm.dms.balance = 0
                blindBoxState.approveForm.dms.step = 0
            }
            console.log('blindBoxState.approveForm', blindBoxState.approveForm)
            loadingHandle(false)

        }
        // 授权dms-宝箱 
    const approveDmsForBox = async() => { // approved
        loadingHandle(true, 'Approving For DMS...')
        const contract = getDragonMainlandShardsTokenContract()
            //  const contractAddress = getBuyMarketContract()
        const contractAddress = getDragonBlindboxContract()
        let address = await initWallet()
        let params = {
            contractAddress: contractAddress.address,
            amount: ethers.utils.parseEther((100000000).toString()),
        }

        try {
            let contractRes = await contract.approve(params.contractAddress, params.amount)
            await contractRes.wait()
            await checkApproveForBoxDms(getDragonMainlandShardsTokenContract)
            loadingHandle(false)
        } catch (error) {
            loadingHandle(false)
            console.log(error)
        }

    }

    const getDmsBalance = async() => {
        let address = null
        try {
            address = await initWallet()
            let dmsContract = getDragonMainlandShardsTokenContract()
            let balance1 = await dmsContract.balanceOf(address)
            blindBoxState.wallet.dms = toEth(balance1)
            console.log('blindBoxState.wallet.dms', blindBoxState.wallet.dms)
        } catch (error) {
            console.log(error)
            blindBoxState.wallet.dms = 0
        }
    }

    const getBoxBuyState = async() => {
        if (!blindBoxState.localDragonSKullForm.cycle) return
        let contract = getDragonBlindboxContract()
        let address = await initWallet()
        console.log('blindBoxState.localDragonSKullForm.cycle', blindBoxState.localDragonSKullForm)

        let params = {
            cycle: BigNumber.from(blindBoxState.localDragonSKullForm.cycle),
            // cycle: BigNumber.from(0),
            address: address

        }
        console.log('contract', contract)
        console.log('params', params)
        try {
            let state = await contract.isApplyJoin(params.cycle, params.address)
            blindBoxState.isBuyBoxState = state
            console.log('state', state)
        } catch (error) {
            console.log('error', error)
        }
    }


    const getaAbleClaimBalance = async() => {
        let contract = getDragonBlindboxContract()
        let address = await initWallet()
        let params = {
            address: address
        }
        console.log('contract', contract)
        console.log('params', params)
        try {
            let balance = await contract.balances(params.address)
            blindBoxState.ableClaimBalance = common.formatValue4(ethers.utils.formatEther(balance))
            console.log(' blindBoxState.ableClaimBalance', blindBoxState.ableClaimBalance)
        } catch (error) {
            console.log('error', error)
        }
    }


    const getBoxBuyResultState = async() => {
        if (!blindBoxState.localDragonSKullForm.cycle) return
        let contract = getDragonBlindboxContract()
        let address = await initWallet()
        let params = {
            cycle: BigNumber.from(blindBoxState.localDragonSKullForm.cycle),
            // cycle: BigNumber.from(0),
            address: address

        }
        console.log('contract', contract)
        console.log('params', params)
        try {
            let state = await contract.isLuckyBlindbox(params.cycle, params.address)
            blindBoxState.isBuyBoxResultState = state
            console.log('state', state)
        } catch (error) {
            console.log('error', error)
        }
    }

    const toEth = (bn) => {
        const amt = ethers.utils.formatEther(bn);
        const amts = amt.split(".");
        console.log(amts);
        if (amts.length == 2) {
            const res = amts[0] + "." + amts[1].substr(0, 4);
            if (res === "0.0000") {
                return Number("0");
            }
            return Number(res);
        }
        return Number(amts[0]);
    }


    // 购买宝箱-生成订单
    const buyBoxConfirmAPi = async() => {
        loadingHandle(true, 'Purchase of blind boxes in progress...')
        await getBuyBoxContractHandle()
    }


    // 购买宝箱-合约相关
    const getBuyBoxContractHandle = async(address, data) => {

            // let params = {
            //     job: data.babyClazz,
            //     tokenId: BigNumber.from(data.babyNo),
            //     matronId: BigNumber.from(data.motherNo),
            //     sireId: BigNumber.from(data.fatherNo),
            //     owner: address,
            //     timestamp: data.timestamp,
            //     sign: data.sign,
            //     signMatron: data.motherSign,
            //     signSire: data.fatherSign,
            // }
            // console.log('params', params)


            /*  Todo */
            const contract = getDragonBlindboxContract()
            console.log('contract', contract)
            try {
                let contractBuyRes = await contract.applyJoin()
                if (contractBuyRes && contractBuyRes.hash) {
                    // let address = await initWallet()
                    // let params = {
                    //     address: address,
                    //     cycle: blindBoxState.localDragonSKullForm.cycle,
                    //     transHash: contractBuyRes.hash,
                    // }
                    // BuyBoxAPiCallBack(params, contractBuyRes)
                    await contractRespBuyBox(contractBuyRes)
                }
            } catch (error) {
                loadingHandle(false)
                if (error.code == 4001) {
                    return $message({
                        type: 'warning',
                        message: error.message,
                        customClass: 'zZindex',
                    })
                } else {
                    return $message({
                        type: 'warning',
                        message: error.data.message,
                        customClass: 'zZindex',
                    })
                }
            }

        }
        // 购买宝箱-取消订单
    const BuyBoxAPiRefuse = (data) => {

        let params = {
            id: data,
        }
        API.breed.breedOrderCancel(params).then(res => {
            if (res.code == 0) {
                loadingHandle(false)
            } else {
                loadingHandle(false)
            }
        })
    }



    // 购买宝箱-回调
    const BuyBoxAPiCallBack = async(data, contract) => {
        let params = {
            address: data.address,
            cycle: data.cycle,
            transHash: data.transHash,
        }
        API.breed.breedOrderCallBack(params).then(res => {
            if (res.code == 0) {
                contractRespBuyBox(contract)
            } else {
                loadingHandle(false)
                return $message({
                    type: 'warning',
                    message: t(`message['${res.i18n}']`),
                    customClass: 'zZindex',
                })
            }
        })
    }

    // 购买宝箱-等待结果
    const contractRespBuyBox = async(contract) => {

        try {
            loadingHandle(true, 'wait result...')
            let receipt = await contract.wait()
            $message({
                type: 'success',
                message: 'Purchase Successful',
                customClass: 'zZindex',
            })

            loadingHandle(false)
            await init()
            blindBoxState.dragonBoxBuyShow = false

        } catch (error) {
            loadingHandle(false)
            return $message({
                type: 'warning',
                message: 'fail',
                customClass: 'zZindex',
            })
        }

    }



    // 开宝箱-生成订单
    const openBoxConfirmAPi = async() => {
        loadingHandle(true, 'Open blind boxes in progress...')
        await getOpenBoxContractHandle()
    }


    // 开宝箱-合约相关
    const getOpenBoxContractHandle = async(address, data) => {
            // playDragonBox()
            // console.log('blindBoxState.selectItem1', blindBoxState.selectItem1)
            let params = {
                cycle: BigNumber.from(blindBoxState.selectItem1.id),
                // cycle: BigNumber.from(0),
            }

            /*  Todo */
            const contract = getDragonBlindboxContract()
            console.log('contract', contract)
            console.log('params', params)
            try {
                let contractBuyRes = await contract.openBlindbox(params.cycle)
                if (contractBuyRes && contractBuyRes.hash) {
                    await contractRespOpenBox(contractBuyRes)
                }
            } catch (error) {
                console.log(error)
                loadingHandle(false)
                if (error.code == 4001) {
                    return $message({
                        type: 'warning',
                        message: error.message,
                        customClass: 'zZindex',
                    })
                } else {
                    return $message({
                        type: 'warning',
                        message: error.data.message,
                        customClass: 'zZindex',
                    })
                }
            }

        }
        // 开宝箱-取消订单
    const openBoxAPiRefuse = (data) => {

        let params = {
            id: data,
        }
        API.breed.breedOrderCancel(params).then(res => {
            if (res.code == 0) {
                loadingHandle(false)
            } else {
                loadingHandle(false)
            }
        })
    }



    // 开宝箱-回调
    const openBoxAPiCallBack = async(data, contract) => {
        let params = {
            address: data.address,
            cycle: data.cycle,
            transHash: data.transHash,
        }
        API.breed.breedOrderCallBack(params).then(res => {
            if (res.code == 0) {
                contractRespOpenBox(contract)
            } else {
                loadingHandle(false)
                return $message({
                    type: 'warning',
                    message: t(`message['${res.i18n}']`),
                    customClass: 'zZindex',
                })
            }
        })
    }

    // 开宝箱-等待结果
    const contractRespOpenBox = async(contract) => {

        try {
            loadingHandle(true, 'wait result...')
            let receipt = await contract.wait()
            loadingHandle(false)
            playDragonBox()
            setTimeout(async() => {
                await contractRespOpenBoxSuccess()
            }, 1500);



        } catch (error) {
            loadingHandle(false)
            return $message({
                type: 'warning',
                message: 'fail',
                customClass: 'zZindex',
            })
        }

    }


    const contractRespOpenBoxSuccess = async() => {
        $message({
            type: 'success',
            message: 'Open the blind box successfully',
            customClass: 'zZindex',
        })

        loadingHandle(false)
        blindBoxState.openDragonBoxShow = false
        blindBoxState.openBoxSuccessShow = true
            // await init()

    }


    // 提现dms-生成订单
    const claimDmsBoxConfirmAPi = async() => {
        loadingHandle(true, 'Claim DMS in progress...')
        await getClaimDmsContractHandle()
    }


    // 提现dms-合约相关
    const getClaimDmsContractHandle = async(address, data) => {
            /*  Todo */
            const contract = getDragonBlindboxContract()
            console.log('contract', contract)
            try {
                let contractBuyRes = await contract.withdraw()
                if (contractBuyRes && contractBuyRes.hash) {
                    await contractRespClaimDms(contractBuyRes)
                }
            } catch (error) {
                console.log(error)
                loadingHandle(false)
                if (error.code == 4001) {
                    return $message({
                        type: 'warning',
                        message: error.message,
                        customClass: 'zZindex',
                    })
                } else {
                    return $message({
                        type: 'warning',
                        message: error.data.message,
                        customClass: 'zZindex',
                    })
                }
            }

        }
        // 提现dms-取消订单
    const claimDmsApiRefuse = (data) => {

        let params = {
            id: data,
        }
        API.breed.breedOrderCancel(params).then(res => {
            if (res.code == 0) {
                loadingHandle(false)
            } else {
                loadingHandle(false)
            }
        })
    }



    // 提现dms-回调
    const claimDmsAPiCallBack = async(data, contract) => {
        let params = {
            address: data.address,
            cycle: data.cycle,
            transHash: data.transHash,
        }
        API.breed.breedOrderCallBack(params).then(res => {
            if (res.code == 0) {
                contractRespOpenBox(contract)
            } else {
                loadingHandle(false)
                return $message({
                    type: 'warning',
                    message: t(`message['${res.i18n}']`),
                    customClass: 'zZindex',
                })
            }
        })
    }

    // 提现dms-等待结果
    const contractRespClaimDms = async(contract) => {

        try {
            loadingHandle(true, 'wait result...')
            let receipt = await contract.wait()
            $message({
                type: 'success',
                message: 'Claim DMS successfully',
                customClass: 'zZindex',
            })

            loadingHandle(false)
            await init()
            blindBoxState.claimDmsShow = false

        } catch (error) {
            loadingHandle(false)
            return $message({
                type: 'warning',
                message: 'fail',
                customClass: 'zZindex',
            })
        }

    }


    const createDragonSkullsImg = (state) => {
        return require(`@/assets/imgs/myMainland/bind-box/skulls-list/skulls${state}.png`);
    }







    return {
        blindBoxState,
        selectItem,
        leftPage,
        rightPage,
        search,
        confirmSearch,
        init,
        cancelBuyBox,
        buyBox,
        buyBoxConfirm,
        approveForDms,
        openDragonBox,
        openBox,
        cancelOpenBox,
        selectItemHandle1,
        closeOpenBoxSuccess,
        claimDms,
        claimDmsHandle,
        calcelClaim,
        handleAnimation,
        createDragonSkullsImg,
    }
}