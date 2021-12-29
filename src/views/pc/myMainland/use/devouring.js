/* 龙部分逻辑处理 */

// 导入配置功能

import { reactive, onMounted, toRefs, onBeforeUnmount, inject, getCurrentInstance, toRaw, nextTick, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { getStorage, setCookie, setSession, getSession } from "@/utils/auth.js";
import { initWallet, myWallet, transferAccounts, isApproved, approved, getDpmWithdrawContract, getSendDragonContract, getMarketContract, getDragonMainlandShardsTokenContract, getBalanceHandle, setApprovalForAll, isApprovedForAll, getLbpApproveContract, getTokenMoney, getDragonDevourContract, } from "@/utils/metaMask/ethers.js";
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
import myDragonDetail from "@/views/pc/myMainland/use/myDragonDetail";




// 初始化数据
const devouringState = reactive({
    loadingForm: {
        loadingShowText: 'Loading...',
        loadingShow: false,
    },
    devouringList: [],
    pageInfo: {
        pageSize: 4,
        currentPage: 1,
        total: 0,
        totalPages: 0,
    },
    devouringMainShow: false, // 吞噬主弹框
    devouringTalentMainShow: false, // 吞噬天赋主弹框
    devouringSelectDragonShow: false, // 吞噬选择龙
    dragonDetailList: {
        leftDragonDetail: null,
        rightDragonDetail: null,
    },
    localSelectKey: null,
    devouringDragonSelectInfo: {

    },
    requirePrice: {
        dmp: 300,
        dms: 1,
    },
    wallet: {
        dms: 0,
        dmp: 0,
    },
    approveForm: {
        step: 0, // 0 未授权， 1 dmp 已授权， 2 dms 已授权  3 dragon 已授权
        dmp: {
            approveMaxPrice: 0,
            isApprove: false,
        },
        dms: {
            approveMaxPrice: 0,
            isApprove: false,
        },
        dragon: {
            approveMaxPrice: 0,
            isApprove: false,
        },
    },
    devouringSuccessShow: false, // 吞噬成功弹框
    devouringProgressShow: false, // 吞噬过程
    devouringSonDragon: {}, // 子-龙
    loveTime: null,
    moveImg: '', // 爱心动画
    timeSet: null,
    waitOrderList: [], // 待确认订单
    myAddress: null,
    skillLevelList: [], // 5个技能当前等级
    talentStatusList: [], // 5个技能对应天赋升级状态
    talentStatusDetail: [], // 5个技能对应天赋升级详情
});





export default function devouringHandle() {

    const router = useRouter()
    const route = useRoute()
    const { ctx } = getCurrentInstance()
    const API = inject("API");
    const $message = inject("$message");
    const Moment = inject("$Moment");
    const store = useStore()
    const { t } = useI18n();
    const { initPage } = pageHandle()
    const { init } = myDragonDetail()
        // onMounted(() => {
        //     getUserCoinTotal()
        //     initData()
        //     init()
        // })
    onBeforeUnmount(() => {

    })


    const initData = () => {
        // devouringState.dragonDetailList.leftDragonDetail = null
        devouringState.dragonDetailList.rightDragonDetail = null
        devouringState.devouringDragonSelectInfo = {}
        devouringState.devouringSuccessShow = false
        devouringState.devouringMainShow = false
        devouringState.pageInfo.currentPage = 1

    }

    // 点击吞噬按钮
    const devouring = async(item, myAddress) => {
        devouringState.dragonDetailList.leftDragonDetail = item
        devouringState.dragonDetailList.leftDragonDetail.devouringCount = devouringTotal(devouringState.dragonDetailList.leftDragonDetail)
        devouringState.myAddress = myAddress
        devouringState.waitOrderList = await getTakeInHistory()
        if (devouringState.waitOrderList) {
            initData()
            devouringState.devouringSuccessShow = true
        } else {
            loadingHandle(true, 'Authorisation for testing in progress...')
            initData()
            devouringState.devouringMainShow = true
            await initDevouring(item, myAddress)
        }

    }

    // 点击天赋升级
    const devouringTalent = async(item) => {
        devouringState.dragonDetailList.leftDragonDetail = item
        loadingHandle(true, 'Authorisation for testing in progress...')
        devouringState.devouringTalentMainShow = true
        await initDevouringTalent()
    }

    const initDevouringTalent = async() => {
        await getDmpBalance()
        await getDmsBalance()
        await getSkillLevelListContract()
        await getTalentStatusListContract()
        await getIsApprove(getDpmWithdrawContract, 1)
        if (devouringState.approveForm.step == 1) {
            await getIsApprove(getDragonMainlandShardsTokenContract, 2)
        }
        loadingHandle(false)
    }

    const getSkillLevelListContract = async() => {
        let params = {
                heroNo: BigNumber.from(devouringState.dragonDetailList.leftDragonDetail.no.toString()),
            }
            /*  Todo */
        const contract = getDragonDevourContract()
        console.log('contract', contract)
        try {
            let contractRes = await contract.getSkillLevels(params.heroNo)
            console.log('contractRes', contractRes)
            let contractResList = contractRes.map(item => {
                return item.toString()
            })
            devouringState.skillLevelList = contractResList
            console.log('contractResList', contractResList)
        } catch (error) {
            console.log(error)
        }
    }

    const getTalentStatusListContract = async() => {
        let params = {
                heroNo: BigNumber.from(devouringState.dragonDetailList.leftDragonDetail.no.toString()),
            }
            /*  Todo */
        const contract = getDragonDevourContract()
        console.log('contract', contract)
        try {
            let contractRes = await contract.getTalentStates(params.heroNo)
            console.log('contractRes', contractRes)
            let contractResList = contractRes.map((item, index) => {
                let keyName = 'skillNo' + (index + 1)
                return { isTalent: item, skillIndex: (index + 1), ...devouringState.dragonDetailList.leftDragonDetail[keyName] }
            })
            devouringState.talentStatusDetail = contractResList
            console.log('contractResList', contractResList)
        } catch (error) {
            console.log(error)
        }
    }



    const initDevouring = async(item, myAddress) => {
        let address = await initWallet()
        if (myAddress != address) {
            return $message({
                type: 'warning',
                message: t(`message['addressNotSamemyAddress']`),
                customClass: 'zZindex',
            })
        }

        await getDmpBalance()
        await getDmsBalance()

        await getIsApprove(getDpmWithdrawContract, 1)
        if (devouringState.approveForm.step == 1) {
            await getIsApprove(getDragonMainlandShardsTokenContract, 2)
        }
        if (devouringState.approveForm.step == 2) {
            await getIsapproveDragon()
        }
        loadingHandle(false)


    }




    const canceldevouringMain = () => {
        devouringState.devouringMainShow = false
    }

    const changeDragon = (e) => {
        devouringState.devouringSelectDragonShow = true
        devouringState.localSelectKey = e
        getdevouringList()
    }

    const selectDradon = (item) => {
        if (item.isSelected || item.isLocked) return
        console.log('item', item)
        if (devouringState.localSelectKey == 1) {
            devouringState.dragonDetailList.leftDragonDetail = item
        } else if (devouringState.localSelectKey == 2) {
            devouringState.dragonDetailList.rightDragonDetail = item
        }
        devouringState.devouringSelectDragonShow = false
        devouringState.devouringDragonSelectInfo.costDmp = devouringState.requirePrice.dmp
        devouringState.devouringDragonSelectInfo.costDms = devouringState.requirePrice.dms
        devouringState.dragonDetailList.rightDragonDetail.devouringCount = devouringTotal(devouringState.dragonDetailList.rightDragonDetail)
            // if (!!devouringState.dragonDetailList.leftDragonDetail && !!devouringState.dragonDetailList.rightDragonDetail) {
            //     getdevouringDragonInfo()
            // }

    }

    const devouringTotal = (detail) => {
        let res = detail.skillNo1.level + detail.skillNo2.level + detail.skillNo3.level + detail.skillNo4.level - 4
        return res
    }

    const back = () => {
        devouringState.devouringSelectDragonShow = false
    }

    const closeSelectBox = () => {

    }

    const leftPage = () => {
        if (devouringState.pageInfo.currentPage <= 1) {
            return
        }
        devouringState.pageInfo.currentPage--
            getdevouringList()
    }

    const rightPage = () => {
        if (devouringState.pageInfo.currentPage >= devouringState.pageInfo.totalPages) {
            return
        }
        devouringState.pageInfo.currentPage++
            getdevouringList()
    }

    const search = (data) => {
        devouringState.pageInfo.currentPage = Number(data)
        getdevouringList()
    }




    const getdevouringList = (item) => {
        let params = {
                limit: devouringState.pageInfo.pageSize,
                page: devouringState.pageInfo.currentPage,
            }
            // API.miningCamp.miningWaitCampList(params).then(res => {getAbledevouringList
        API.devouring.getAbleDevouringList(params).then(async res => {
            if (res.code == 0) {
                devouringState.devouringList = res.data.list
                let nowTime = await getNowTime()

                devouringState.devouringList.map(item => {
                    if ((!!devouringState.dragonDetailList.leftDragonDetail && item.id == devouringState.dragonDetailList.leftDragonDetail.id) || (!!devouringState.dragonDetailList.rightDragonDetail && item.id == devouringState.dragonDetailList.rightDragonDetail.id)) {
                        item.isSelected = true // 选择
                    }



                    if (item.lockStatus != 0) { // 锁定
                        item.isLocked = true
                    }
                })

                console.log(' devouringState.devouringList-------', devouringState.devouringList)
                devouringState.pageInfo = res.data.pageInfo
                initPage(res.data.pageInfo)

            }
        })
    }

    const getIsApprove = async(contractFuc, type) => {
        //  let contract = !devouringState.approveForm.dmp.isApprove ? getDpmWithdrawContract() : getDragonMainlandShardsTokenContract()
        let contract = contractFuc()
        const contractAddress = getDragonDevourContract()
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
                            devouringState.approveForm.step = 1 // dmp  已授权
                            devouringState.approveForm.dmp.isApprove = true
                            devouringState.approveForm.dmp.approveMaxPrice = balance
                        } else {
                            devouringState.approveForm.step = 0 // dmp  未授权
                            devouringState.approveForm.dmp.isApprove = false
                            devouringState.approveForm.dmp.approveMaxPrice = 0
                        }
                    } else if (type == 2) {
                        if (balance > 0) {
                            devouringState.approveForm.step = 2 // dms  已授权
                            devouringState.approveForm.dms.isApprove = true
                            devouringState.approveForm.dms.approveMaxPrice = balance
                            if (devouringState.approveForm.step == 2) {
                                await getIsapproveDragon()
                            }
                        } else {
                            devouringState.approveForm.step = 1 // dms  未授权
                            devouringState.approveForm.dms.isApprove = false
                            devouringState.approveForm.dms.approveMaxPrice = 0
                        }
                    }


                    console.log('contractRes', contractRes)
                    console.log('balance', balance)
                    console.log('approveForm', devouringState.approveForm)
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
    const getIsapproveDragon = async() => {
        const contract = getSendDragonContract()
        const contractAddress = getDragonDevourContract()
        let address = await initWallet()
        let params = {
            key: contract,
            address: address,
            contractAddress: contractAddress.address,
        }
        let res = await isApproved(params)
        if (res) {
            devouringState.approveForm.step = 3 // dms  已授权
            devouringState.approveForm.dragon.isApprove = true
            devouringState.approveForm.dragon.approveMaxPrice = 100000000
        } else {
            devouringState.approveForm.step = 2 // dms  已授权
            devouringState.approveForm.dragon.isApprove = false
            devouringState.approveForm.dragon.approveMaxPrice = 0


        }



    }
    const approve = async(type) => {
        if (type == 1 && !!devouringState.approveForm.dmp.isApprove) {
            return
        }
        if (type == 2 && !devouringState.approveForm.dmp.isApprove || !!devouringState.approveForm.dms.isApprove) {
            return
        }
        loadingHandle(true, (!devouringState.approveForm.dmp.isApprove ? 'Approving For DMP...' : 'Approving For DMS...'))

        let contract = !devouringState.approveForm.dmp.isApprove ? getDpmWithdrawContract() : getDragonMainlandShardsTokenContract()
        const contractAddress = getDragonDevourContract()
        console.log('getLbpApprove', contract)
        let params = {
            contractAddress: contractAddress.address,
            amount: ethers.utils.parseEther((100000000).toString()),
        }
        try {
            let contractRes = await contract.approve(params.contractAddress, params.amount)
            await contractRes.wait()
            await getIsApprove(getDpmWithdrawContract, 1)
            if (devouringState.approveForm.step == 1) {
                await getIsApprove(getDragonMainlandShardsTokenContract, 2)
            }
            loadingHandle(false)
        } catch (error) {
            loadingHandle(false)
            console.log(error)
        }
    }


    const approveDragon = async(type) => { // approved
        if (type == 3 && !devouringState.approveForm.dms.isApprove || !!devouringState.approveForm.dragon.isApprove) {
            return
        }


        loadingHandle(true, 'Approving For DMT...')
        const contract = getSendDragonContract()
        const contractAddress = getDragonDevourContract()
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
                await getIsapproveDragon()
                loadingHandle(false)
            } else {
                devouringState.approveForm.step = 2 // dms  已授权
                devouringState.approveForm.dragon.isApprove = false
                devouringState.approveForm.dragon.approveMaxPrice = 0
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
            devouringState.wallet.dms = common.formatValue4(ethers.utils.formatEther(balance))
            console.log(' devouringState.wallet.dmp', devouringState.wallet.dmp)
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
            devouringState.wallet.dmp = common.formatValue4(ethers.utils.formatEther(balance))
            console.log(' devouringState.wallet.dmp', devouringState.wallet.dmp)
        } catch (error) {
            console.log(error)
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


    const devouringDragons = () => {
        if (!devouringState.approveForm.dmp.isApprove || !devouringState.approveForm.dms.isApprove || !devouringState.approveForm.dragon.isApprove || !devouringState.dragonDetailList.leftDragonDetail || !devouringState.dragonDetailList.rightDragonDetail) {
            return
        }
        if (devouringState.devouringDragonSelectInfo.costDmp > devouringState.wallet.dmp) {
            return
            // return $message({
            //     type: 'warning',
            //     message: 'Your current DMP balance is insufficient.',
            //     customClass: 'zZindex',
            // })
        }
        if (devouringState.devouringDragonSelectInfo.costDms > devouringState.wallet.dms) {
            return
            // return $message({
            //     type: 'warning',
            //     message: 'Your current DMS balance is insufficient.',
            //     customClass: 'zZindex',
            // })
        }
        devouringDragonsAPi()
    }

    // 龙骨吞噬-生成订单
    const devouringDragonsAPi = async() => {
        loadingHandle(true, 'Devouring in progress...')
        let address = await initWallet()
        let params = {
            dragonNo: devouringState.dragonDetailList.leftDragonDetail.no,
            dragonDevouringNo: devouringState.dragonDetailList.rightDragonDetail.no,
        }
        console.log('params', params)
            // skullCreateProgress(true)

        await getDevouringContractHandle(params)
    }


    // 龙骨吞噬-合约相关
    const getDevouringContractHandle = async(data) => {
        let params = {
            dragonNo: BigNumber.from(data.dragonNo.toString()),
            dragonDevouringNo: BigNumber.from(data.dragonDevouringNo.toString()),
        }
        console.log('params', params)


        /*  Todo */
        const contract = getDragonDevourContract()
        console.log('contract', contract)
        try {
            let contractBuyRes = await contract.devour(params.dragonNo, params.dragonDevouringNo)
            if (contractBuyRes && contractBuyRes.hash) {

                await contractRespDevouring(contractBuyRes)
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


    // 龙骨吞噬-等待结果
    const contractRespDevouring = async(contract) => {

        try {
            loadingHandle(true, 'wait result...')
            let receipt = await contract.wait()
            $message({
                type: 'success',
                message: 'Devouring successful',
                customClass: 'zZindex',
            })
            await getDevouringResult()
                // init()
        } catch (error) {
            console.log('error', error)
            loadingHandle(false)

            return $message({
                type: 'warning',
                message: 'contract transaction failed',
                customClass: 'zZindex',
            })
        }

    }

    const getDevouringResult = async() => {
        // await absorption(devouringState.absorptionDetail, 2)
        await getDragonResult()
    }


    const getDragonResult = async(contract) => {

        let time = 0
        clearInterval(devouringState.timeSet)
        devouringState.timeSet = setInterval(async() => {
            time++
            devouringState.waitOrderList = await getTakeInHistory()
            if (time <= 60) {
                if (devouringState.waitOrderList) {
                    loadingHandle(false)
                    clearInterval(devouringState.timeSet)
                    await devouring(devouringState.dragonDetailList.leftDragonDetail, devouringState.myAddress)
                }
            } else {
                loadingHandle(false)

                clearInterval(devouringState.timeSet)
                    // $message({
                    //     type: 'success',
                    //     message: 'Absorption is complete, please check in your backpack.',
                    //     customClass: 'zZindex',
                    // })
                await devouring(devouringState.dragonDetailList.leftDragonDetail, devouringState.myAddress)
            }
        }, 1000)


    }




    // 龙骨吞噬确认-生成订单
    const devouringSureDragonsAPi = async() => {
        loadingHandle(true, 'Devouring confirmation in progress...')
        let address = await initWallet()
        let params = {
            heroNo: devouringState.dragonDetailList.leftDragonDetail.no,

        }
        API.myMainland.createDevouringOrder(params).then(async res => {
            if (res.code == 0) {
                await getDevouringSureContractHandle(res.data)
            }
        })
    }


    // 龙骨吞噬确认-合约相关
    const getDevouringSureContractHandle = async(data) => {
        let params = {
            dragonNo: BigNumber.from(data.heroNo.toString()),
            timestamp: data.timestamp,
            sign: data.sign,
        }
        console.log('params', params)


        /*  Todo */
        const contract = getDragonDevourContract()
        console.log('contract', contract)
        try {
            let contractBuyRes = await contract.confirm(params.dragonNo, params.timestamp, params.sign)
            if (contractBuyRes && contractBuyRes.hash) {
                await contractRespDevouringSure(contractBuyRes)
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


    // 龙骨吞噬确认-等待结果
    const contractRespDevouringSure = async(contract) => {

        try {
            loadingHandle(true, 'wait result...')
            let receipt = await contract.wait()
            await timeSleep(3)
            $message({
                    type: 'success',
                    message: 'Devouring confirmation successful',
                    customClass: 'zZindex',
                })
                // await getDevouringResult()
                // init()
            loadingHandle(false)
            initData()
            init()
        } catch (error) {
            console.log('error', error)
            loadingHandle(false)

            return $message({
                type: 'warning',
                message: 'contract transaction failed',
                customClass: 'zZindex',
            })
        }

    }

    const timeSleep = async(time) => { // time second
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(true)
            }, time * 1000)
        })
    }


    const getTakeInHistory = async() => {
        return new Promise((resolve, reject) => {
            let params = {
                heroNo: devouringState.dragonDetailList.leftDragonDetail.no
            }
            API.myMainland.getDevourDragonHistory(params).then(res => {
                if (res.code == 0) {
                    if (res.data) {
                        resolve(res.data)
                    } else {
                        resolve(null)
                    }
                }
            })
        })
    }

    const loadingHandle = (flag, text) => {
        if (devouringState.loadingForm.loadingShow) {
            devouringState.loadingForm.loadingShow = false

        }
        nextTick(() => {
            devouringState.loadingForm.loadingShow = flag ? flag : false
            devouringState.loadingForm.loadingShowText = text ? text : 'Loading...'
        })

    }

    const goMainland = () => {
        devouringState.devouringSuccessShow = false
        router.back()
    }

    const devouringLove = () => {
        loadingHandle(false)
        devouringState.devouringProgressShow = true
        nextTick(() => {
            let leftDragon = document.getElementById('dragonCreateLoveLeft')
            let rightDragon = document.getElementById('dragonCreateLoveRight')
            let midHeart = document.getElementById('dragonCreateLoveMid')
            let time = 0
            devouringState.loveTime = setInterval(() => {
                time++
                leftDragon.style.left = (0 + time * 1) + 'px'
                rightDragon.style.right = (0 + time * 1) + 'px'
                    //   midHeart.style.right = (0 + time * 1) + 'px'
                console.log(time)
                if (time >= 100) {
                    clearInterval(devouringState.loveTime)
                    devouringState.moveImg = "move-img"
                        //midHeart.style.transform = 'scale(10)'

                }
            }, 2)
        })



    }

    const devouringHeart = () => {
        let midHeart = document.getElementById('dragonCreateLoveMid')
        midHeart.style.transform = 'scale(3)'
        devouringState.devouringProgressShow = false
        devouringState.devouringSuccessShow = true
            //  devouringState.devouringSuccessShow = true


    }

    const getNowTime = () => {
        return new Promise((resolve, reject) => {
            API.activity.getServericeTime({}).then(res => {
                resolve(res.data.timestamp)
            })

        })

    }

    const goWallet = () => {
        router.push({ path: `/myMainland/withdrawalDmp` })
    }

    const cancelDevouringSuccess = () => {
        devouringState.devouringSuccessShow = false
    }

    const sureDeVouring = async() => {
        await devouringSureDragonsAPi()
    }

    const upTalent = async(item) => {
        await talentUpAPi(item)
    }

    // 龙升级天赋-生成订单
    const talentUpAPi = async(item) => {
        loadingHandle(true, 'Talent upgrade in progress...')
        let params = {
            heroNo: devouringState.dragonDetailList.leftDragonDetail.no,

        }
        API.myMainland.getTalentUpgradeSign(params).then(async res => {
            if (res.code == 0) {
                await getTalentUpContractHandle(res.data, item)
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


    // 龙升级天赋-合约相关
    const getTalentUpContractHandle = async(data, item) => {
        let params = {
            dragonNo: BigNumber.from(data.heroNo.toString()),
            skillId: BigNumber.from(item.skillIndex.toString()),
            timestamp: data.timestamp,
            sign: data.sign,
        }
        console.log('params', params)


        /*  Todo */
        const contract = getDragonDevourContract()
        console.log('contract', contract)
        try {
            let contractBuyRes = await contract.talent(params.dragonNo, params.skillId, params.timestamp, params.sign)
            if (contractBuyRes && contractBuyRes.hash) {
                await contractRespTalentUp(contractBuyRes)
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


    // 龙升级天赋-等待结果
    const contractRespTalentUp = async(contract) => {

        try {
            loadingHandle(true, 'wait result...')
            let receipt = await contract.wait()
            $message({
                type: 'success',
                message: 'Talent upgrade successful',
                customClass: 'zZindex',
            })
            await initDevouringTalent()
        } catch (error) {
            console.log('error', error)
            loadingHandle(false)

            return $message({
                type: 'warning',
                message: 'contract transaction failed',
                customClass: 'zZindex',
            })
        }

    }

    const canceldevouringTalentMain = () => {
        devouringState.devouringTalentMainShow = false
    }



    return {
        devouringState,
        devouring,
        devouringTalent,
        canceldevouringMain,
        changeDragon,
        back,
        selectDradon,
        closeSelectBox,
        leftPage,
        rightPage,
        search,
        approve,
        approveDragon,
        devouringDragons,
        goMainland,
        devouringLove,
        goWallet,
        cancelDevouringSuccess,
        sureDeVouring,
        upTalent,
        canceldevouringTalentMain,
    }
}