/* 龙部分逻辑处理 */

// 导入配置功能

import { reactive, onMounted, toRefs, onBeforeUnmount, inject, getCurrentInstance, toRaw, nextTick, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { getStorage, setCookie, setSession, getSession } from "@/utils/auth.js";
import { initWallet, isApproved, approved, getDragonMainlandBoneContract, getDragonBoneAbsorbContract, getDpmWithdrawContract, getDragonMainlandShardsTokenContract, } from "@/utils/metaMask/ethers.js";
import { ethers, BigNumber } from "ethers";
import DragonMiraclePotionToken from "@/utils/metaMask/dragonJson/DragonMiraclePotionToken.json"; // 提现
import DragonMainlandShardsToken from "@/utils/metaMask/dragonJson/DragonMainlandShardsToken.json"; // DMS
import DragonExchange from "@/utils/metaMask/dragonJson/DragonExchange.json"; // 市场
import { useI18n } from "vue-i18n"; //要在js中使用国际化
import common from "@/utils/common";
import { useStore } from "vuex";
import { Decimal } from 'decimal.js'
import pageHandle from '@/components/page/use/index.js'
import Moment from "moment";
import dragonSkullContractList from "./dragonSkullContractList";
import myDragonDetail from "@/views/pc/myMainland/use/myDragonDetail";



// 初始化数据
const absorptionState = reactive({
    loadingForm: {
        loadingShowText: 'Loading...',
        loadingShow: false,
    },
    absorptionMainShow: false, // 吸收主弹框
    absorptionPreviewShow: false, // 吸收预览展示弹框
    cancelBonusPointShow: false, // 吸收预览取消弹框
    absorptionSuccessShow: false, // 确认吸收龙骨成功
    dragonSkullList: [],
    dragonSkullContractList: new dragonSkullContractList().getList(),
    absorptionDetail: null,
    absorptionTime: 0, // 吸收次数
    localSelectSkull: null,
    takeInHistory: [],
    requirePrice: {
        dmp: 0,
        dms: 0,
    },
    wallet: {
        dms: 0,
        dmp: 0,
    },
    approveForm: {
        step: 0, // 0 未授权， 1 dmp 已授权， 2 dms 已授权  3 skull 已授权
        dmp: {
            approveMaxPrice: 0,
            isApprove: false,
        },
        dms: {
            approveMaxPrice: 0,
            isApprove: false,
        },
        skull: {
            approveMaxPrice: 0,
            isApprove: false,
        },
    },
    createPrice: {
        high: {
            dmp: 300,
            dms: 1,
        },
        mid: {
            dmp: 100,
            dms: 0.3,
        },
        low: {
            dmp: 50,
            dms: 0.1,
        },

    },
    skullAbleTotal: 0, // 可用龙骨数
    timeSet: null,
});





export default function absorptionHandle() {

    const router = useRouter()
    const route = useRoute()
    const { ctx } = getCurrentInstance()
    const API = inject("API");
    const $message = inject("$message");
    const Moment = inject("$Moment");
    const store = useStore()
    const { t } = useI18n();
    const { init } = myDragonDetail()
    const { initPage } = pageHandle()

    // onMounted(() => {
    //     getUserCoinTotal()
    //     initData()
    //     init()
    // })
    onBeforeUnmount(() => {

        })
        // const filterNum = computed(() => {
        //     return 344
        // });

    const initAbsort = async() => {
        await initBalance()
        absorptionState.dragonSkullList = await dragonSKullsHandleList()
        absorptionState.skullAbleTotal = getListTotal(absorptionState.dragonSkullList, 'usable') //可用龙骨数
        loadingHandle(false)
    }


    const initData = async() => {
        absorptionState.absorptionMainShow = false
        absorptionState.absorptionPreviewShow = false
        absorptionState.cancelBonusPointShow = false
        absorptionState.absorptionSuccessShow = false
        absorptionState.takeInHistory = []
        absorptionState.dragonSkullList = []
        absorptionState.dragonSkullContractList = new dragonSkullContractList().getList()
            // absorptionState.absorptionDetail = null
        absorptionState.localSelectSkull = null
    }

    const getAbsorptionTime = async() => {
        console.log(absorptionState.absorptionDetail)
        let params = {
            dragonNo: BigNumber.from(absorptionState.absorptionDetail.no),
        }
        console.log('params', params)


        /*  Todo */
        const contract = getDragonBoneAbsorbContract()
        console.log('contract', contract)
        try {
            let contractBuyRes = await contract.absorbCount(params.dragonNo)
            absorptionState.absorptionTime = contractBuyRes.toNumber()
            console.log('contractBuyRes', contractBuyRes.toString())
        } catch (error) {
            console.log(error)
        }



    }



    const absorption = async(dragonDetail, type) => {
        await initData()
        absorptionState.absorptionDetail = dragonDetail
        await getAbsorptionTime()
        absorptionState.takeInHistory = await getTakeInHistory()
        console.log('takeList', absorptionState.takeInHistory)
        if (type == 2) {
            if (absorptionState.takeInHistory.length > 0 && absorptionState.takeInHistory[0].status == 1) {
                await openAbsorptionPreview(dragonDetail)

            } else {
                $message({
                    type: 'success',
                    message: 'Absorption is complete, please check in your backpack.',
                    customClass: 'zZindex',
                })
                await initData()
                init()
            }
        } else {
            if (absorptionState.takeInHistory.length > 0 && absorptionState.takeInHistory[0].status == 1) {
                await openAbsorptionPreview(dragonDetail)

            } else {
                await openAbsorptionMain(dragonDetail)
            }
        }


        //  absorptionState.absorptionSuccessShow = true


    }

    const getTakeInHistory = async() => {
        return new Promise((resolve, reject) => {
            let params = {
                heroNo: absorptionState.absorptionDetail.no
            }
            API.myMainland.getHeroSkullAbsorbHistory(params).then(res => {
                if (res.code == 0) {
                    resolve(res.data.list)
                }
            })
        })
    }

    const openAbsorptionMain = async(dragonDetail) => {
        absorptionState.absorptionMainShow = true
        loadingHandle(true, 'Authorisation for testing in progress...')
        console.log('absorption', dragonDetail)
        await initAbsort()
    }

    const openAbsorptionPreview = async(dragonDetail) => {
        absorptionState.absorptionPreviewShow = true
    }




    const cancelAbsorptionMain = () => {
        absorptionState.absorptionMainShow = false
    }

    const initBalance = async() => {
        await getDmsBalance()
        await getDmpBalance()
        await getIsApprove(getDpmWithdrawContract, 1)
        if (absorptionState.approveForm.step == 1) {
            await getIsApprove(getDragonMainlandShardsTokenContract, 2)
        }
        if (absorptionState.approveForm.step == 2) {
            await getIsApproveSKull()
        }
    }


    const getIsApprove = async(contractFuc, type) => {
        //  let contract = !absorptionState.approveForm.dmp.isApprove ? getDpmWithdrawContract() : getDragonMainlandShardsTokenContract()
        let contract = contractFuc()
        const contractAddress = getDragonBoneAbsorbContract()
        console.log('contract', contract)
        let address = null
        try {
            address = await initWallet()
            if (address) {
                let params = {
                    address: address,
                    contractAddress: contractAddress.address,
                }
                try {
                    let contractRes = await contract.allowance(params.address, params.contractAddress)
                    let balance = ethers.utils.formatEther(contractRes)
                    if (type == 1) {
                        if (balance > 0) {
                            absorptionState.approveForm.step = 1 // dmp  已授权
                            absorptionState.approveForm.dmp.isApprove = true
                            absorptionState.approveForm.dmp.approveMaxPrice = balance
                        } else {
                            absorptionState.approveForm.step = 0 // dmp  未授权
                            absorptionState.approveForm.dmp.isApprove = false
                            absorptionState.approveForm.dmp.approveMaxPrice = 0
                        }
                    } else if (type == 2) {
                        if (balance > 0) {
                            absorptionState.approveForm.step = 2 // dms  已授权
                            absorptionState.approveForm.dms.isApprove = true
                            absorptionState.approveForm.dms.approveMaxPrice = balance
                            if (absorptionState.approveForm.step == 2) {
                                await getIsApproveSKull()
                            }
                        } else {
                            absorptionState.approveForm.step = 1 // dms  未授权
                            absorptionState.approveForm.dms.isApprove = false
                            absorptionState.approveForm.dms.approveMaxPrice = 0
                        }
                    }


                    console.log('contractRes', contractRes)
                    console.log('balance', balance)
                    console.log('approveForm', absorptionState.approveForm)
                } catch (error) {
                    console.log(error)
                }
            } else {
                console.log(address)
            }
        } catch (error) {
            console.log(error)
        }



    }
    const getIsApproveSKull = async() => {
        const contract = getDragonMainlandBoneContract()
        const contractAddress = getDragonBoneAbsorbContract()
        let address = await initWallet()
        let params = {
            key: contract,
            address: address,
            contractAddress: contractAddress.address,
        }
        let res = await isApproved(params)
        if (res) {
            absorptionState.approveForm.step = 3 // dms  已授权
            absorptionState.approveForm.skull.isApprove = true
            absorptionState.approveForm.skull.approveMaxPrice = 100000000
        } else {
            absorptionState.approveForm.step = 2 // dms  已授权
            absorptionState.approveForm.skull.isApprove = false
            absorptionState.approveForm.skull.approveMaxPrice = 0


        }



    }
    const approve = async(type) => {
        if (type == 1 && !!absorptionState.approveForm.dmp.isApprove) {
            return
        }
        if (type == 2 && !absorptionState.approveForm.dmp.isApprove || !!absorptionState.approveForm.dms.isApprove) {
            return
        }
        loadingHandle(true, (!absorptionState.approveForm.dmp.isApprove ? 'Approving For DMP...' : 'Approving For DMS...'))

        let contract = !absorptionState.approveForm.dmp.isApprove ? getDpmWithdrawContract() : getDragonMainlandShardsTokenContract()
        const contractAddress = getDragonBoneAbsorbContract()
        console.log('getLbpApprove', contract)
        let params = {
            contractAddress: contractAddress.address,
            amount: ethers.utils.parseEther((100000000).toString()),
        }
        try {
            let contractRes = await contract.approve(params.contractAddress, params.amount)
            await contractRes.wait()
            await getIsApprove(getDpmWithdrawContract, 1)
            if (absorptionState.approveForm.step == 1) {
                await getIsApprove(getDragonMainlandShardsTokenContract, 2)
            }
            loadingHandle(false)
        } catch (error) {
            loadingHandle(false)
            console.log(error)
        }
    }


    const approveSkull = async(type) => { // approved
        if (type == 3 && !absorptionState.approveForm.dms.isApprove || !!absorptionState.approveForm.skull.isApprove) {
            return
        }


        loadingHandle(true, 'Approving For Skull...')
        const contract = getDragonMainlandBoneContract()
        const contractAddress = getDragonBoneAbsorbContract()
        let address = await initWallet()
        let params = {
            key: contract,
            bool: true,
            contractAddress: contractAddress.address,
        }
        try {
            let res = await approved(params)
            let receipt = await res.wait()
            console.log('res=========', res)
            if (res) {
                await getIsApproveSKull()
                loadingHandle(false)
            } else {
                absorptionState.approveForm.step = 2 // dms  已授权
                absorptionState.approveForm.skull.isApprove = false
                absorptionState.approveForm.skull.approveMaxPrice = 0
            }
            loadingHandle(false)
        } catch (error) {
            console.log(error)
            loadingHandle(false)
        }


    }

    const getDmsBalance = async() => {
        let address = await initWallet()
        if (!address) return
        let params = {
                address: address,
            }
            /*  Todo */
        const contract = getDragonMainlandShardsTokenContract()
        console.log('contract', contract)
        try {
            // let balance = await contract.mintedTotal(params.address)
            let balance = await contract.balanceOf(params.address)
            absorptionState.wallet.dms = common.formatValue4(ethers.utils.formatEther(balance))
            console.log(' absorptionState.wallet.dmp', absorptionState.wallet.dmp)
        } catch (error) {
            console.log(error)
        }
    }


    const getDmpBalance = async() => {
        let address = await initWallet()
        if (!address) return
        let params = {
                address: address,
            }
            /*  Todo */
        const contract = getDpmWithdrawContract()
        console.log('contract', contract)
        try {
            // let balance = await contract.mintedTotal(params.address)
            let balance = await contract.balanceOf(params.address)
            absorptionState.wallet.dmp = common.formatValue4(ethers.utils.formatEther(balance))
            console.log(' absorptionState.wallet.dmp', absorptionState.wallet.dmp)
        } catch (error) {
            console.log(error)
        }
    }



    // 龙骨数据链上封装
    const dragonSKullsHandleList = async() => {
        const contract = getDragonMainlandBoneContract()
        console.log('contract', contract)
        let address = await initWallet()

        let addresss = new Array(absorptionState.dragonSkullContractList.length).fill(address)
        let list = absorptionState.dragonSkullContractList.map(item => {
            return BigNumber.from(item.no.toString())
        })
        let params = {
            address: addresss,
            list: list
        }
        console.log('params', params)

        try {
            let contractRes = await contract.balanceOfBatch(params.address, params.list)
            console.log('contractRes', contractRes)
            contractRes.map((item, index) => {
                absorptionState.dragonSkullContractList[index].usable = item.toString()
            })
            console.log(' absorptionState.dragonSkullList', absorptionState.dragonSkullContractList)
            console.log(' absorptionState.absorptionDetail', absorptionState.absorptionDetail)
            return absorptionState.dragonSkullContractList.filter(item => item.clazz == absorptionState.absorptionDetail.clazz)


        } catch (error) {
            console.log(error)
            return []
        }
    }


    const getListTotal = (arr, keyName) => {
        let $total = 0;
        $total = arr.reduce(function(total, currentValue, currentIndex, arr) {
            return currentValue[keyName] ? (Number(total) + Number(currentValue[keyName])) : Number(total);
        }, 0);
        return $total;
    }

    const selectAbsorptionItem = (item) => {
        console.log(item)
        if (item.usable <= 0 || absorptionState.absorptionTime >= 3) return
        item.selected = !item.selected
        if (absorptionState.localSelectSkull && absorptionState.localSelectSkull.id == item.id) {
            absorptionState.localSelectSkull = null
            if (item.level == 2) {
                absorptionState.requirePrice = 0
            } else if (item.level == 1) {
                absorptionState.requirePrice = 0
            } else if (item.level == 3) {
                absorptionState.requirePrice = 0
            }
        } else {
            absorptionState.localSelectSkull = item
            if (item.level == 2) {
                absorptionState.requirePrice = absorptionState.createPrice.mid
            } else if (item.level == 1) {
                absorptionState.requirePrice = absorptionState.createPrice.low
            } else if (item.level == 3) {
                absorptionState.requirePrice = absorptionState.createPrice.high
            }
        }
        absorptionState.dragonSkullList.map(res => {
            if (item.id != res.id) {
                res.selected = false
            }
        })
    }

    const loadingHandle = (flag, text) => {
        if (absorptionState.loadingForm.loadingShow) {
            absorptionState.loadingForm.loadingShow = false

        }
        nextTick(() => {
            absorptionState.loadingForm.loadingShow = flag ? flag : false
            absorptionState.loadingForm.loadingShowText = text ? text : 'Loading...'
        })

    }

    const startCreateAbsorption = () => {
        if (!absorptionState.approveForm.dmp.isApprove || !absorptionState.approveForm.dms.isApprove || !absorptionState.approveForm.skull.isApprove) {
            return
        }

        if (absorptionState.requirePrice.dmp > absorptionState.wallet.dmp) {
            return
        }
        if (absorptionState.requirePrice.dms > absorptionState.wallet.dms) {
            return
        }
        if (!absorptionState.localSelectSkull) {
            return
        }


        absorptionBeforeDragonsAPi()
    }

    // 龙骨吸收预览-生成订单
    const absorptionBeforeDragonsAPi = async() => {
        loadingHandle(true, 'Skull absorption preview in progress...')
        let address = await initWallet()
        console.log(absorptionState.absorptionDetail)
        console.log(absorptionState.localSelectSkull)
        let params = {
            dragonNo: absorptionState.absorptionDetail.no,
            skullNo: absorptionState.localSelectSkull.no
        }
        console.log('params', params)
            // skullCreateProgress(true)

        await getAbsorptionBeforeContractHandle(params)
    }


    // 龙骨吸收预览-合约相关
    const getAbsorptionBeforeContractHandle = async(data) => {

        let params = {
            dragonNo: BigNumber.from(data.dragonNo.toString()),
            skullNo: BigNumber.from(data.skullNo.toString()),
        }
        console.log('params', params)


        /*  Todo */
        const contract = getDragonBoneAbsorbContract()
        console.log('contract', contract)
        try {
            let contractBuyRes = await contract.preview(params.dragonNo, params.skullNo)
            if (contractBuyRes && contractBuyRes.hash) {

                await contractRespAbsorptionBefore(contractBuyRes)
            }
        } catch (error) {
            //   await initData()
            loadingHandle(false)
            console.log('error', error)
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


    // 龙骨吸收预览-等待结果
    const contractRespAbsorptionBefore = async(contract) => {

        try {
            loadingHandle(true, 'wait result...')
            let receipt = await contract.wait()
            $message({
                type: 'success',
                message: 'Skull absorption preview succeeded',
                customClass: 'zZindex',
            })
            getAbsorptionResult()
            init()
        } catch (error) {
            console.log('error', error)
            loadingHandle(false)
                // skullCreateProgress(false)
                // await initData()
            return $message({
                type: 'warning',
                message: 'contract transaction failed',
                customClass: 'zZindex',
            })
        }

    }

    const closeSuccess = async() => {
        loadingHandle(false)
        await initData()
        init()
            // await init()
    }

    const getAbsorptionResult = async() => {
        // await absorption(absorptionState.absorptionDetail, 2)
        await getSkullResult()
    }


    const getSkullResult = async(contract) => {

        let time = 0
        clearInterval(absorptionState.timeSet)
        absorptionState.timeSet = setInterval(async() => {
            time++
            absorptionState.takeInHistory = await getTakeInHistory()
            if (time <= 60) {
                if ((absorptionState.takeInHistory.length > 0 && absorptionState.takeInHistory[0].status == 1)) {
                    loadingHandle(false)
                    clearInterval(absorptionState.timeSet)
                    await absorption(absorptionState.absorptionDetail, 2)
                }
            } else {
                loadingHandle(false)

                clearInterval(absorptionState.timeSet)
                    // $message({
                    //     type: 'success',
                    //     message: 'Absorption is complete, please check in your backpack.',
                    //     customClass: 'zZindex',
                    // })
                await absorption(absorptionState.absorptionDetail, 2)
            }
        }, 1000)


    }



    const surePreviewAbsorb = () => {
        console.log('surePreviewAbsorb')
        surePreviewAbsorbAPi()

    }

    // 吸收确认-生成订单
    const surePreviewAbsorbAPi = async() => {
        loadingHandle(true, 'Skull absorption confirmation in progress...')
        let address = await initWallet()
        let params = {
            heroNo: absorptionState.absorptionDetail.no,
        }
        API.myMainland.getSkullAbsorbSign(params).then(async res => {
            if (res.code == 0) {
                await getSurePreviewAbsorbContractHandle(res.data)

            } else {
                loadingHandle(false)
                return $message({
                    type: 'warning',
                    message: res.msg,
                    customClass: 'zZindex',
                })
            }
        })
    }


    // 吸收确认-合约相关
    const getSurePreviewAbsorbContractHandle = async(data) => {

        let params = {
            dragonNo: BigNumber.from(data.heroNo),
            timestamp: data.timestamp,
            sign: data.sign,
        }
        console.log('params', params)


        /*  Todo */
        const contract = getDragonBoneAbsorbContract()
        console.log('contract', contract)
        try {
            let contractBuyRes = await contract.confirm(params.dragonNo, params.timestamp, params.sign)
            if (contractBuyRes && contractBuyRes.hash) {

                contractRespSurePreviewAbsorb(contractBuyRes)
            }
        } catch (error) {
            loadingHandle(false)
            console.log('error', error)
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

    // 吸收确认-等待结果
    const contractRespSurePreviewAbsorb = async(contract) => {

        try {
            loadingHandle(true, 'wait result...')
            let receipt = await contract.wait()
            loadingHandle(false)

            $message({
                type: 'success',
                message: 'Skull absorption confirmation succeeded',
                customClass: 'zZindex',
            })
            await getAbsorptionTime()
            absorptionState.absorptionSuccessShow = true
            init()
        } catch (error) {
            loadingHandle(false)
            return $message({
                type: 'warning',
                message: 'fail',
                customClass: 'zZindex',
            })
        }

    }









    const cancelPreview = () => {
        absorptionState.cancelBonusPointShow = true
    }

    // 确认取消吸收龙骨
    const sureCancelTakeIn = async() => {
        console.log('sureCancelTakeIn')
        await sureCancelTakeInAPi()

    }

    // 吸收确认-取消-生成订单
    const sureCancelTakeInAPi = async() => {
        loadingHandle(true, 'Skull absorption cancellation in progress...')
        let address = await initWallet()
        let params = {
            heroNo: absorptionState.absorptionDetail.no,
        }
        await getSureCancelTakeInContractHandle(params)
    }


    // 吸收确认-取消-合约相关
    const getSureCancelTakeInContractHandle = async(data) => {

        let params = {
            dragonNo: BigNumber.from(data.heroNo),
        }
        console.log('params', params)


        /*  Todo */
        const contract = getDragonBoneAbsorbContract()
        console.log('contract', contract)
        try {
            let contractBuyRes = await contract.cancel(params.dragonNo)
            if (contractBuyRes && contractBuyRes.hash) {

                contractRespSureCancelTakeIn(contractBuyRes)
            }
        } catch (error) {
            loadingHandle(false)
            console.log('error', error)
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

    // 吸收确认-取消-等待结果
    const contractRespSureCancelTakeIn = async(contract) => {

        try {
            loadingHandle(true, 'wait result...')
            let receipt = await contract.wait()
            $message({
                type: 'success',
                message: 'Skull absorption cancellation in progress succeeded',
                customClass: 'zZindex',
            })

            loadingHandle(false)
            await initData()
            init()


        } catch (error) {
            loadingHandle(false)
            return $message({
                type: 'warning',
                message: 'fail',
                customClass: 'zZindex',
            })
        }

    }


    //  返回上一弹框
    const backToPrevious = () => {
        absorptionState.cancelBonusPointShow = false
    }

    // 取消预览弹框
    const closePreview = () => {
        absorptionState.absorptionPreviewShow = false
    }

    // 关闭取消确认弹框
    const closeCancelSure = () => {
        absorptionState.cancelBonusPointShow = false
    }

    const absorbedType = (type) => {
        let list = {
            1: 'Health',
            2: 'Attack',
            3: 'Defense',
            4: 'Speed',
            5: 'LifeForce',
        }
        return list[type]

    }

    const absorbedTypeImg = (type) => {
        let list = {
            1: 'heatthy',
            2: 'attack',
            3: 'defense',
            4: 'speed',
            5: 'spirit',
        }
        return require(`@/assets/imgs/myMainland/stats/${list[type]}.png`)

    }




    return {
        absorptionState,
        absorption,
        cancelAbsorptionMain,
        selectAbsorptionItem,
        cancelAbsorptionMain,
        startCreateAbsorption,
        approve,
        approveSkull,
        surePreviewAbsorb,
        cancelPreview,
        sureCancelTakeIn,
        backToPrevious,
        closePreview,
        closeCancelSure,
        absorbedType,
        absorbedTypeImg,
        closeSuccess,

    }
}