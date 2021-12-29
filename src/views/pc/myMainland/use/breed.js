/* 龙部分逻辑处理 */

// 导入配置功能

import { reactive, onMounted, toRefs, onBeforeUnmount, inject, getCurrentInstance, toRaw, nextTick, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { getStorage, setCookie, setSession, getSession } from "@/utils/auth.js";
import { initWallet, myWallet, transferAccounts, isApproved, getDpmWithdrawContract, getMarketContract, getDragonMainlandShardsTokenContract, getBalanceHandle, setApprovalForAll, isApprovedForAll, getLbpApproveContract, getTokenMoney, } from "@/utils/metaMask/ethers.js";
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





// 初始化数据
const breedState = reactive({
    loadingForm: {
        loadingShowText: 'Loading...',
        loadingShow: false,
    },
    breedList: [],
    pageInfo: {
        pageSize: 4,
        currentPage: 1,
        total: 0,
        totalPages: 0,
    },
    breedMainShow: false, // 繁殖主弹框
    breedSelectDragonShow: false, // 繁殖选择龙
    dragonDetailList: {
        leftDragonDetail: null,
        rightDragonDetail: null,
    },
    localSelectKey: null,
    breedDragonSelectInfo: {},
    wallet: {
        dms: 0,
        dmp: 0,
    },
    approveForm: {
        step: 0, // 0 未授权， 1 dmp 已授权， 2 dms 已授权
        dmp: {
            approveMaxPrice: 0,
            isApprove: false,
        },
        dms: {
            approveMaxPrice: 0,
            isApprove: false,
        },
        breed: {},
    },
    breedSuccessShow: false, // 繁殖成功弹框
    breedProgressShow: false, // 繁殖过程
    breedSonDragon: {}, // 子-龙
    loveTime: null,
    moveImg: '', // 爱心动画
});





export default function breedHandle() {

    const router = useRouter()
    const route = useRoute()
    const { ctx } = getCurrentInstance()
    const API = inject("API");
    const $message = inject("$message");
    const Moment = inject("$Moment");
    const store = useStore()
    const { t } = useI18n();
    const { initPage } = pageHandle()

    // onMounted(() => {
    //     getUserCoinTotal()
    //     initData()
    //     init()
    // })
    onBeforeUnmount(() => {

    })


    const initData = () => {
        breedState.dragonDetailList.leftDragonDetail = null
        breedState.dragonDetailList.rightDragonDetail = null
        breedState.breedDragonSelectInfo = {}

    }

    // 点击繁殖按钮
    const breed = async (item, myAddress) => {

        let address = await initWallet()
        if (myAddress != address) {
            return $message({
                type: 'warning',
                message: t(`message['addressNotSamemyAddress']`),
                customClass: 'zZindex',
            })
        }
        if (item.isCool) {
            return $message({
                type: 'warning',
                message: `Dragon needs rest after breeding,next time:${Moment(item.restEndTime).utc(0).format('YYYY-MM-DD hh:mm:ss')}`,
                customClass: 'zZindex',
            })
        }


        loadingHandle(true, 'Authorisation for testing in progress...')
        initData()
        console.log(item)
        breedState.dragonDetailList.leftDragonDetail = item
        // breedState.dragonDetailList.rightDragonDetail = item
        breedState.breedMainShow = true
        await getDmpBalance()
        await getContractBalance()
        await getIsApprove(getDpmWithdrawContract, 1)
        if (breedState.approveForm.step == 1) {
            await getIsApprove(getDragonMainlandShardsTokenContract, 2)
        }

        loadingHandle(false)
    }

    const cancelBreedMain = () => {
        breedState.breedMainShow = false
    }

    const changeDragon = (e) => {
        breedState.breedSelectDragonShow = true
        breedState.localSelectKey = e
        getBreedList()
    }

    const selectDradon = (item) => {
        if (item.isSelected || item.isCool || item.isLocked) return
        console.log('item', item)
        breedState.localSelectKey
        if (breedState.localSelectKey == 1) {
            breedState.dragonDetailList.leftDragonDetail = item
        } else if (breedState.localSelectKey == 2) {
            breedState.dragonDetailList.rightDragonDetail = item
        }
        breedState.breedSelectDragonShow = false
        if (!!breedState.dragonDetailList.leftDragonDetail && !!breedState.dragonDetailList.rightDragonDetail) {
            getBreedDragonInfo()
        }

    }

    const back = () => {
        breedState.breedSelectDragonShow = false
    }

    const closeSelectBox = () => {

    }

    const leftPage = () => {
        if (breedState.pageInfo.currentPage <= 1) {
            return
        }
        breedState.pageInfo.currentPage--
        getBreedList()
    }

    const rightPage = () => {
        if (breedState.pageInfo.currentPage >= breedState.pageInfo.totalPages) {
            return
        }
        breedState.pageInfo.currentPage++
        getBreedList()
    }

    const search = (data) => {
        breedState.pageInfo.currentPage = Number(data)
        getBreedList()
    }




    const getBreedList = (item) => {
        let params = {
            limit: breedState.pageInfo.pageSize,
            page: breedState.pageInfo.currentPage,
        }
        // API.miningCamp.miningWaitCampList(params).then(res => {getAbleBreedList
        API.breed.getAbleBreedList(params).then(async res => {
            if (res.code == 0) {
                breedState.breedList = res.data.list
                let nowTime = await getNowTime()

                breedState.breedList.map(item => {
                    if ((!!breedState.dragonDetailList.leftDragonDetail && item.id == breedState.dragonDetailList.leftDragonDetail.id) || (!!breedState.dragonDetailList.rightDragonDetail && item.id == breedState.dragonDetailList.rightDragonDetail.id)) {
                        item.isSelected = true  // 选择
                    }

                    if (item.restEndTime && item.restEndTime >= nowTime) {  // 冷却
                        item.isCool = true
                    }

                    if (item.lockStatus != 0) { // 锁定
                        item.isLocked = true
                    }
                })

                console.log(' breedState.breedList-------', breedState.breedList)
                breedState.pageInfo = res.data.pageInfo
                initPage(res.data.pageInfo)

            }
        })
    }


    const getBreedDragonInfo = async () => {
        let address = await initWallet()
        console.log(breedState.dragonDetailList.leftDragonDetail)
        console.log(breedState.dragonDetailList.rightDragonDetail)
        let params = {
            address: address,
            fatherId: breedState.dragonDetailList.leftDragonDetail.id,
            fatherNo: breedState.dragonDetailList.leftDragonDetail.no,
            motherId: breedState.dragonDetailList.rightDragonDetail.id,
            motherNo: breedState.dragonDetailList.rightDragonDetail.no,
        }
        API.breed.isBreed(params).then(res => {
            if (res.code == 0) {
                breedState.breedDragonSelectInfo = res.data
                breedState.breedDragonSelectInfo.isInbreeding = res.data.related != 0 ? true : false
            }

        })
    }





    const getDmpBalance = async () => {
        let address = null
        try {
            address = await initWallet()
            let dmsContract = getLbpApproveContract(getTokenMoney('dmst_address'))
            let balance1 = await dmsContract.balanceOf(address)
            breedState.wallet.dms = toEth(balance1)
        } catch (error) {
            console.log(error)
            breedState.wallet.dms = 0
        }
    }

    // 获取链上资产余额
    const getContractBalance = async () => {
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
            breedState.wallet.dmp = common.formatValue4(ethers.utils.formatEther(balance))
            console.log(' breedState.wallet.dmp', breedState.wallet.dmp)
        } catch (error) {
            console.log(error)
        }
    }



    const getIsApprove = async (contractFuc, type) => {
        //  let contract = !breedState.approveForm.dmp.isApprove ? getDpmWithdrawContract() : getDragonMainlandShardsTokenContract()
        let contract = contractFuc()
        console.log('contract', contract)
        let address = null
        try {
            address = await initWallet()
            if (address) {
                let params = {
                    address: address,
                    contractAddress: process.env.NODE_ENV === "production" ? DragonExchange.address_prod : DragonExchange.address,
                }
                try {
                    let contractRes = await contract.allowance(params.address, params.contractAddress)
                    let balance =  ethers.utils.formatEther(contractRes)
                    if (type == 1) {
                        if (balance > 0) {
                            breedState.approveForm.step = 1 // dmp  已授权
                            breedState.approveForm.dmp.isApprove = true
                            breedState.approveForm.dmp.approveMaxPrice = balance
                        } else {
                            breedState.approveForm.step = 0 // dmp  未授权
                            breedState.approveForm.dmp.isApprove = false
                            breedState.approveForm.dmp.approveMaxPrice = 0
                        }
                    } else if (type == 2) {
                        if (balance > 0) {
                            breedState.approveForm.step = 2 // dms  已授权
                            breedState.approveForm.dms.isApprove = true
                            breedState.approveForm.dms.approveMaxPrice = balance
                        } else {
                            breedState.approveForm.step = 1 // dms  未授权
                            breedState.approveForm.dms.isApprove = false
                            breedState.approveForm.dms.approveMaxPrice = 0
                        }
                    }


                    console.log('contractRes', contractRes)
                    console.log('balance', balance)
                    console.log('approveForm', breedState.approveForm)
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

    const approve = async (type) => {
        if (type == 1 && !!breedState.approveForm.dmp.isApprove) {
            return
        }
        if (type == 2 && !breedState.approveForm.dmp.isApprove || !!breedState.approveForm.dms.isApprove) {
            return
        }
        loadingHandle(true, (!breedState.approveForm.dmp.isApprove ? 'Approving For DMP...' : 'Approving For DMS...'))

        let contract = !breedState.approveForm.dmp.isApprove ? getDpmWithdrawContract() : getDragonMainlandShardsTokenContract()

        console.log('getLbpApprove', contract)
        let params = {
            contractAddress: process.env.NODE_ENV === "production" ? DragonExchange.address_prod : DragonExchange.address,
            amount: ethers.utils.parseEther((100000000).toString()),
        }
        try {
            let contractRes = await contract.approve(params.contractAddress, params.amount)
            await contractRes.wait()
            await getIsApprove(getDpmWithdrawContract, 1)
            if (breedState.approveForm.step == 1) {
                await getIsApprove(getDragonMainlandShardsTokenContract, 2)
            }
            loadingHandle(false)
        } catch (error) {
            loadingHandle(false)
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


    const breedDragons = () => {
        if (!breedState.approveForm.dmp.isApprove || !breedState.approveForm.dms.isApprove || !breedState.dragonDetailList.leftDragonDetail || !breedState.dragonDetailList.rightDragonDetail) {
            return
        }
        if (breedState.breedDragonSelectInfo.costDmp > breedState.wallet.dmp) {
            return $message({
                type: 'warning',
                message: 'Your current DMP balance is insufficient.',
                customClass: 'zZindex',
            })
        }
        if (breedState.breedDragonSelectInfo.costDms > breedState.wallet.dms) {
            return $message({
                type: 'warning',
                message: 'Your current DMS balance is insufficient.',
                customClass: 'zZindex',
            })
        }
        breedDragonsAPi()
    }

    // 繁殖-生成订单
    const breedDragonsAPi = async () => {
        loadingHandle(true, 'Breeding in progress...')
        let address = await initWallet()
        let params = {
            address: address,
            fatherId: breedState.dragonDetailList.leftDragonDetail.id,
            fatherNo: breedState.dragonDetailList.leftDragonDetail.no,
            motherId: breedState.dragonDetailList.rightDragonDetail.id,
            motherNo: breedState.dragonDetailList.rightDragonDetail.no,
        }
        API.breed.breedOrder(params).then(async res => {
            if (res.code == 0) {

                //    let data2 = {
                //         id: res.data.id,
                //         address: address,
                //         amount: res.data.totalAmount,
                //         feeAmt: res.data.fee,
                //         timestamp: res.data.timestamp,
                //         sign: res.data.sign
                //     }
                breedState.breedSonDragon = res.data
                await getBreedContractHandle(address, res.data)

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


    // 繁殖-合约相关
    const getBreedContractHandle = async (address, data) => {

        let params = {
            job: data.babyClazz,
            tokenId: BigNumber.from(data.babyNo),
            matronId: BigNumber.from(data.motherNo),
            sireId: BigNumber.from(data.fatherNo),
            owner: address,
            timestamp: data.timestamp,
            sign: data.sign,
            signMatron: data.motherSign,
            signSire: data.fatherSign,
        }
        console.log('params', params)


        /*  Todo */
        const contract = getMarketContract()
        console.log('contract', contract)
        try {
            let contractBuyRes = await contract.breedDragonEggs(params.job, params.tokenId, params.matronId, params.sireId, params.owner, params.timestamp, params.sign, params.signMatron, params.signSire,)
            if (contractBuyRes && contractBuyRes.hash) {
                let params = {
                    id: data.id,
                    transHash: contractBuyRes.hash,
                }
                breedLove()
                breedAPiCallBack(params, contractBuyRes)
            }
        } catch (error) {
            loadingHandle(false)
            breedAPiRefuse(data.id) // 取消订单
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
    // 繁殖-取消订单
    const breedAPiRefuse = (data) => {

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



    // 繁殖-回调
    const breedAPiCallBack = async (data, contract) => {
        let params = {
            id: data.id,
            transHash: data.transHash,
        }
        API.breed.breedOrderCallBack(params).then(res => {
            if (res.code == 0) {
                contractRespBreed(contract)
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

    // 繁殖-等待结果
    const contractRespBreed = async (contract) => {

        try {
            // loadingHandle(true, 'wait result...')
            let receipt = await contract.wait()
            $message({
                type: 'success',
                message: 'Breed succeeded',
                customClass: 'zZindex',
            })

            loadingHandle(false)
            // context.emit('initMiningCamp')
            breedState.breedMainShow = false
            breedState.breedSelectDragonShow = false
            breedHeart()


        } catch (error) {
            loadingHandle(false)
            return $message({
                type: 'warning',
                message: 'fail',
                customClass: 'zZindex',
            })
        }

    }

    const loadingHandle = (flag, text) => {
        if (breedState.loadingForm.loadingShow) {
            breedState.loadingForm.loadingShow = false

        }
        nextTick(() => {
            breedState.loadingForm.loadingShow = flag ? flag : false
            breedState.loadingForm.loadingShowText = text ? text : 'Loading...'
        })

    }

    const goMainland = () => {
        breedState.breedSuccessShow = false
        router.back()
    }

    const breedLove = () => {
        loadingHandle(false)
        breedState.breedProgressShow = true
        nextTick(() => {
            let leftDragon = document.getElementById('dragonCreateLoveLeft')
            let rightDragon = document.getElementById('dragonCreateLoveRight')
            let midHeart = document.getElementById('dragonCreateLoveMid')
            let time = 0
            breedState.loveTime = setInterval(() => {
                time++
                leftDragon.style.left = (0 + time * 1) + 'px'
                rightDragon.style.right = (0 + time * 1) + 'px'
                //   midHeart.style.right = (0 + time * 1) + 'px'
                console.log(time)
                if (time >= 100) {
                    clearInterval(breedState.loveTime)
                    breedState.moveImg = "move-img"
                    //midHeart.style.transform = 'scale(10)'

                }
            }, 2)
        })



    }

    const breedHeart = () => {
        let midHeart = document.getElementById('dragonCreateLoveMid')
        midHeart.style.transform = 'scale(3)'
        breedState.breedProgressShow = false
        breedState.breedSuccessShow = true
        //  breedState.breedSuccessShow = true


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


    return {
        breedState,
        breed,
        cancelBreedMain,
        changeDragon,
        back,
        selectDradon,
        closeSelectBox,
        leftPage,
        rightPage,
        search,
        approve,
        breedDragons,
        goMainland,
        breedLove,
        goWallet,
    }
}