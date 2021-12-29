/* 龙部分逻辑处理 */

// 导入配置功能

import { reactive, onMounted, toRefs, onBeforeUnmount, inject, getCurrentInstance, toRaw, nextTick, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { getStorage, setCookie, setSession, getSession } from "@/utils/auth.js";
import { initWallet, myWallet, transferAccounts, getDpmWithdrawContract, getBalanceHandle, setApprovalForAll, isApprovedForAll } from "@/utils/metaMask/ethers.js";
import { ethers, BigNumber } from "ethers";
import { useI18n } from "vue-i18n"; //要在js中使用国际化
import common from "@/utils/common";
import { useStore } from "vuex";
import { Decimal } from 'decimal.js'
import pageHandle from '@/components/page/use/index.js'




// 初始化数据
const withdrawlDmpState = reactive({
    loadingForm: {
        loadingShowText: 'Loading...',
        loadingShow: false,
    },
    list: [ ],
    haveSelectedList: [],
    selectTableTitleItem: 1, // 1 not withDrawn, 2 already withdrawn 0 
    userDmp: 0,
    pageInfo: {
        pageSize: 20,
        currentPage: 1,
        total: 0,
        totalPages: 0,
    },
    isSelectedAll: false,
    detailShow: false,
    withdrawDetail: {},
    isSingle: false,
    withdrawmsgList: [
        ' DMP obtained on day 1 is locked for the first five days. It is unlocked at 00:00 UTC on day 6.',
        ' DMP unlocked and withdrawn at 00:00 UTC on day 6 will be charged a 30% handling fee. This fee can be decreased by 3% per day thereafter until day 16 when the handling fee is zero.'
    ],
    withdrawmsgShow: false,
    eyeShow: true,
    chainAssets: {
        balance: 0,
        fee: 0,
    },
    timeGetDmp: null,
});





export default function withdrawlDmpHandle() {

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
    // onBeforeUnmount(() => {
    //      if (withdrawlDmpState.timeGetDmp) {
    //          debugger
    //         clearInterval(withdrawlDmpState.timeGetDmp)
    //     }

    // })
    const init = () => {
        getDmpList()
    }
    const initData = () => {
        withdrawlDmpState.selectTableTitleItem = 1
        withdrawlDmpState.pageInfo.currentPage = 1
        withdrawlDmpState.list = []
        withdrawlDmpState.haveSelectedList = []
    }

    const back = () => {
        router.back()
    }

    const selectTableTitle = (item) => {
        loadingHandle(true, 'loading')
        initData()
        withdrawlDmpState.selectTableTitleItem = item
        //  withdrawlDmpState.isSelectedAll = false
        getDmpList()
    }

    const getUserCoinTotal = () => {
        let params = {}
        API.myMainland.userCoinTotal(params).then(res => {
            if (res.code == 0) {
                withdrawlDmpState.userDmp = common.formatValue4(res.data)
            }
        })
    }


    const getDmpList = () => {
        let params = {
            limit: withdrawlDmpState.pageInfo.pageSize,
            page: withdrawlDmpState.pageInfo.currentPage,
            status: withdrawlDmpState.selectTableTitleItem,
        }
        API.myMainland.userCoinList(params).then(res => {
            if (res.code == 0) {
                res.data.list = res.data.list.map(item => {
                    item.day = item.day.toString()
                    let day = `${(item.day).substring(0, 4)}/${(item.day).substring(4, 6)}/${(item.day).substring(6, 8)}`
                    item.claimedDay = day
                    item.withdrawalTime = common.formatTimeAdd(day, 6)
                    return item
                })


                withdrawlDmpState.list = res.data.list
                withdrawlDmpState.list.map(item => {
                    withdrawlDmpState.haveSelectedList.map(item2 => {
                        if (item.id == item2.id) {
                            item.isSelected = true
                        }
                    })
                })
                // withdrawlDmpState.isSelectedAll = withdrawlDmpState.list.filter(item=> {
                //     return item.rate != -1
                // }).every(item=> {
                //     return item.isSelected

                // })
                console.log(' withdrawlDmpState.list', withdrawlDmpState.list)
                withdrawlDmpState.pageInfo = res.data.pageInfo
                initPage(withdrawlDmpState.pageInfo)
                loadingHandle(false)

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

    const loadingHandle = (flag, text) => {
        if (withdrawlDmpState.loadingForm.loadingShow) {
            withdrawlDmpState.loadingForm.loadingShow = false

        }
        nextTick(() => {
            withdrawlDmpState.loadingForm.loadingShow = flag ? flag : false
            withdrawlDmpState.loadingForm.loadingShowText = text ? text : 'Loading...'
        })

    }


    const leftPage = () => {
        withdrawlDmpState.isSelectedAll = false
        if (withdrawlDmpState.pageInfo.currentPage <= 1) {
            return
        }
        withdrawlDmpState.pageInfo.currentPage--
        getDmpList()
    }

    const rightPage = () => {
        withdrawlDmpState.isSelectedAll = false
        if (withdrawlDmpState.pageInfo.currentPage >= withdrawlDmpState.pageInfo.totalPages) {
            return
        }
        withdrawlDmpState.pageInfo.currentPage++
        getDmpList()
    }

    const search = (data) => {
        withdrawlDmpState.isSelectedAll = false
        withdrawlDmpState.pageInfo.currentPage = Number(data)
        getDmpList()
    }

    const selectData = (item, status) => {
        if (item.rate == -1) return
        withdrawlDmpState.isSingle = false
        item.isSelected = !item.isSelected
        if (status == 1) { // add
            withdrawlDmpState.haveSelectedList.push(item)
            item.isSelected = true
        } else { // remove
            item.isSelected = false
            withdrawlDmpState.haveSelectedList = withdrawlDmpState.haveSelectedList.filter(res => {
                return res.id != item.id
            })
        }

    }

    const selectedAllData = () => {
        withdrawlDmpState.isSingle = false
        if (withdrawlDmpState.isSelectedAll) {
            withdrawlDmpState.list.map(item => {
                if (item.rate != -1) {
                    item.isSelected = false
                }

            })
            withdrawlDmpState.haveSelectedList = []
        } else {
            // withdrawlDmpState.list.filter(item => item.rate != -1).map(item2 => {
            //     item2.isSelected = true
            // })
            withdrawlDmpState.list.map(item => {
                if (item.rate != -1) {
                    item.isSelected = true
                }
            })
            withdrawlDmpState.haveSelectedList = withdrawlDmpState.list.filter(item => item.isSelected)
        }
        getDmpList()

        withdrawlDmpState.isSelectedAll = !withdrawlDmpState.isSelectedAll
    }

    const withdrawl = () => {
        console.log(withdrawlDmpState.haveSelectedList)
        let ids = withdrawlDmpState.haveSelectedList.map(item => {
            return item.id
        })
        getWithdrawInfoDetail(ids)
    }

    const withdrawlItem = (item) => {
        withdrawlDmpState.isSingle = true
        withdrawlDmpState.isSelectedAll = false
        console.log(withdrawlDmpState.haveSelectedList)
        withdrawlDmpState.haveSelectedList = [item]
        let ids = withdrawlDmpState.haveSelectedList.map(item => {
            return item.id
        })
        getWithdrawInfoDetail(ids)
        init()

    }


    const getWithdrawInfoDetail = async (id) => {
        console.log(withdrawlDmpState.haveSelectedList)
        let address = await initWallet()
        let ids = id
        let params = {
            address: address,
            ids: ids
        }
        API.myMainland.withdrawInfoDetail(params).then(res => {
            if (res.code == 0) {
                withdrawlDmpState.withdrawDetail = res.data
                withdrawlDmpState.detailShow = true
            } else {
                return $message({
                    type: 'warning',
                    message: res.msg,
                    customClass: 'zZindex',
                })
            }
        })
    }

    const cancelDetail = () => {
        withdrawlDmpState.detailShow = false
        if (withdrawlDmpState.isSingle) {
            withdrawlDmpState.haveSelectedList = []
        }
        init()

    }

    const sureDetail = () => {
        withdrawAPi()

    }





    // 提现-生成订单
    const withdrawAPi = async () => {
        loadingHandle(true, 'withdrawing in progress...')
        let address = await initWallet()
        let ids = withdrawlDmpState.haveSelectedList.map(item => {
            return item.id
        })
        let params = {
            address: address,
            ids: ids
        }
        API.myMainland.withdrawCreate(params).then(async res => {
            if (res.code == 0) {

                withdrawlDmpState.detailShow = false
                $message({
                    type: 'success',
                    message: 'withdrawal succeeded',
                    customClass: 'zZindex',
                })
                initData()
                init()
                getUserCoinTotal()
                loadingHandle(false)
                // let data2 = {
                //     id: res.data.id,
                //     address: address,
                //     amount: res.data.totalAmount,
                //     feeAmt: res.data.fee,
                //     timestamp: res.data.timestamp,
                //     sign: res.data.sign
                // }
                // await getwithdrawContractHandle(data2)

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


    // 提现-合约相关
    const getwithdrawContractHandle = async (data) => {
        let params = {
            address: data.address,
            amount: BigNumber.from(data.amount), // ethers.utils.parseEther(data.amount.toString()),
            feeAmt: BigNumber.from(data.feeAmt), // ethers.utils.parseEther(data.feeAmt.toString()),
            timestamp: data.timestamp,
            sign: data.sign
        }
        /*  Todo */
        const contract = getDpmWithdrawContract()

        try {
            let contractBuyRes = await contract.mint(params.address, params.amount, params.feeAmt, params.timestamp, params.sign,)
            if (contractBuyRes && contractBuyRes.hash) {
                let params = {
                    id: data.id,
                    transHash: contractBuyRes.hash,
                }
                withdrawAPiCallBack(params, contractBuyRes)
            }
        } catch (error) {
            loadingHandle(false)
            withdrawAPiRefuse(data.id) // 取消订单
            console.log('error', error)
            // if (error.code == 4001) {
            //     return $message({
            //         type: 'warning',
            //         message: error.message,
            //         customClass: 'zZindex',
            //     })
            // } else {
            //     return $message({
            //         type: 'warning',
            //         message: error.data.message,
            //         customClass: 'zZindex',
            //     })
            // }
        }

    }
    // 提现-取消订单
    const withdrawAPiRefuse = (data) => {
        initData()
        init()
        // getDmpListWithNoDmp()
        return $message({
            type: 'warning',
            message: 'You have cancelled the withdrawal,DMP is locked, please try again in 5 minutes',
            duration: 5000,
            customClass: 'zZindex',
        })
        // let params = {
        //     id: data,
        // }
        // API.myMainland.withdrawCancel(params).then(res => {
        //     if (res.code == 0) {
        //         loadingHandle(false)
        //     } else {
        //         loadingHandle(false)
        //     }
        // })
    }



    // 提现-回调
    const withdrawAPiCallBack = async (data, contract) => {
        let params = {
            id: data.id,
            transHash: data.transHash,
        }
        API.myMainland.withdrawCallBack(params).then(res => {
            if (res.code == 0) {
                contractRespWithdrwaBuy(contract)
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

    // 提现-等待结果
    const contractRespWithdrwaBuy = async (contract) => {

        try {
            loadingHandle(true, 'wait result...')
            let receipt = await contract.wait()
            withdrawlDmpState.detailShow = false
            $message({
                type: 'success',
                message: 'withdrawal succeeded',
                customClass: 'zZindex',
            })
            initData()
            init()
            getUserCoinTotal()
            loadingHandle(false)
            // context.emit('initMiningCamp')

        } catch (error) {
            loadingHandle(false)
            return $message({
                type: 'warning',
                message: 'fail',
                customClass: 'zZindex',
            })
        }

    }


    const clearSelect = () => {
        withdrawlDmpState.haveSelectedList = []
        init()
    }

    const withdrawWithNoFee = () => {
        withdrawlDmpState.isSingle = true
        withdrawlDmpState.isSelectedAll = false
        withdrawlDmpState.haveSelectedList = []
        withdrawlDmpState.list.map(item => {
            item.isSelected = false
        })
        getDmpListWithNoDmp()
    }

    const getDmpListWithNoDmp = () => {
        let params = {
            limit: 100000,
            page: 1,
            status: 0,
        }
        API.myMainland.userCoinList(params).then(res => {
            if (res.code == 0) {
                if (res.data.list.length > 0) {
                    getDmpListWithNoDmpListHandle(res.data.list)
                } else {
                    return $message({
                        type: 'warning',
                        message: 'No DMP available for withdrawal at the moment',
                        customClass: 'zZindex',
                    })
                }


            } else {
                loadingHandle(false)
                return $message({
                    type: 'warning',
                    message: 'You currently have no service charge of 0',
                    customClass: 'zZindex',
                })

            }
        })
    }

    const getDmpListWithNoDmpListHandle = (data) => {
        console.log(data)
        withdrawlDmpState.haveSelectedList = data
        let ids = withdrawlDmpState.haveSelectedList.map(item => {
            return item.id
        })
        getWithdrawInfoDetail(ids)
    }


    const mouseenterWithdrawMsg = () => {
        withdrawlDmpState.withdrawmsgShow = true
    }
    const mouseleaveWithdrawMsg = () => {
        withdrawlDmpState.withdrawmsgShow = false
    }


    const eyeShowChange = () => {
        withdrawlDmpState.eyeShow = !withdrawlDmpState.eyeShow
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
            let balance = await contract.mintedTotal(params.address)
            let fee = await contract.mintedTotalFee(params.address)
            withdrawlDmpState.chainAssets.balance = common.formatValue4(ethers.utils.formatEther(balance))
            withdrawlDmpState.chainAssets.fee = common.formatValue4(ethers.utils.formatEther(fee))
            console.log('chainAssets.balance', balance, fee, withdrawlDmpState.chainAssets)
        } catch (error) {
            console.log(error)
        }
    }



    const timeGetContractBalance = () => {
        withdrawlDmpState.timeGetDmp = setInterval(async () => {
            await getContractBalance()
        }, 5000)
    }


    return {
        withdrawlDmpState,
        back,
        selectTableTitle,
        getUserCoinTotal,
        getDmpList,
        getUserCoinTotal,
        initData,
        init,
        leftPage,
        rightPage,
        search,
        selectData,
        selectedAllData,
        withdrawl,
        cancelDetail,
        sureDetail,
        withdrawlItem,
        clearSelect,
        withdrawWithNoFee,
        mouseenterWithdrawMsg,
        mouseleaveWithdrawMsg,
        eyeShowChange,
        getContractBalance,
        timeGetContractBalance,
    }
}