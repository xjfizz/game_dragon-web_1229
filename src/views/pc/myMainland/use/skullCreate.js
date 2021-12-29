/* 龙部分逻辑处理 */

// 导入配置功能

import { reactive, onMounted, toRefs, onBeforeUnmount, inject, getCurrentInstance, toRaw, nextTick, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { getStorage, setCookie, setSession, getSession } from "@/utils/auth.js";
import { initWallet, myWallet, transferAccounts, getDpmWithdrawContract, getBalanceHandle, setApprovalForAll, isApproved, approved, isApprovedForAll, getDragonMainlandBoneContract, getDragonBoneCompoundContract, getDragonMainlandShardsTokenContract } from "@/utils/metaMask/ethers.js";

import { ethers, BigNumber } from "ethers";
import { useI18n } from "vue-i18n"; //要在js中使用国际化
import common from "@/utils/common";
import { useStore } from "vuex";
import { Decimal } from 'decimal.js'
import pageHandle from '@/components/page/use/index.js'




// 初始化数据
const skullCreateState = reactive({
    loadingForm: {
        loadingShowText: 'Loading...',
        loadingShow: false,
    },
    tipMsgShow: false,
    tipList: [
        // ' Serial number: Each NFT dragon skull is numbered starting from 1 and increases in sequential order.',
        // ' Race: Water, Fire, Rock, Storm, and Thunder.',
        // ' Level: low, medium, and high.',
        // ' Dragon skull absorption: Up to three skulls can be absorbed by dragons of the same race to increase a random attribute.',
        // ' Dragon skull synthesis: Five low-level dragon skulls may be synthesized into a higher level dragon skull.',
        // ' Absorption history: This is a record of which dragons absorb which skulls. For example, skull No. 1 is absorbed by dragon No. 10086.'
        ' To synthesize, you need 5 dragon skulls of the same race and same level. When synthesized you have a 50% chance of getting a higher level skull or a skull of the same level.'
    ],
    dragonSkullList: [],
    dragonSkullContractList: [
        { id: 1, no: 13, clazz: 1, level: 3 },
        { id: 2, no: 12, clazz: 1, level: 2 },
        { id: 3, no: 11, clazz: 1, level: 1 },

        { id: 4, no: 23, clazz: 2, level: 3 },
        { id: 5, no: 22, clazz: 2, level: 2 },
        { id: 6, no: 21, clazz: 2, level: 1 },

        { id: 7, no: 33, clazz: 3, level: 3 },
        { id: 8, no: 32, clazz: 3, level: 2 },
        { id: 9, no: 31, clazz: 3, level: 1 },

        { id: 10, no: 43, clazz: 4, level: 3 },
        { id: 11, no: 42, clazz: 4, level: 2 },
        { id: 12, no: 41, clazz: 4, level: 1 },

        { id: 13, no: 53, clazz: 5, level: 3 },
        { id: 14, no: 52, clazz: 5, level: 2 },
        { id: 15, no: 51, clazz: 5, level: 1 },

    ],
    menuItem: 2,
    localSelectItem: null,
    createPrice: {
        mid: {
            dmp: 100,
            dms: 0.2,
        },
        low: {
            dmp: 50,
            dms: 0.1,
        }

    },
    requirePrice: {
        dmp: 0,
        dms: 0,
    },
    createDragonSkullShow: false,
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
    skullCreateProgressShow: false,
    openBoxSuccessShow: false,
    selectItem1: {},
    timeSet: null,

});





export default function skullCreateHandle() {

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
    //      if (skullCreateState.timeGetDmp) {
    //          debugger
    //         clearInterval(skullCreateState.timeGetDmp)
    //     }

    // })

    const back = () => {
        router.back()
    }

    const mouseenterWithdrawMsg = () => {
        skullCreateState.tipMsgShow = true
    }
    const mouseleaveWithdrawMsg = () => {
        skullCreateState.tipMsgShow = false
    }

    const initData = async() => {
        skullCreateState.menuItem = 2
        skullCreateState.localSelectItem = null
        skullCreateState.selectItem1 = {}
        await initBalance()
        await init()
        await initSetDetailGo()
    }

    const initSetDetailGo = async() => {
        console.log('router', router, route.query)
        if (route.query.id) {
            let item = route.query
            await selectMenuItem(item.level)
            selectSkullItem(item)

        }

    }

    const clearRouteParams = () => {

        let newQuery = JSON.parse(JSON.stringify(route.query)) // 先拷贝一个一模一样的对象
        newQuery = null
            // delete newQuery.id //再删除page
            // delete newQuery.no //再删除page
            // delete newQuery.clazz //再删除page
            // delete newQuery.level //再删除page
            // delete newQuery.usable //再删除page
        router.replace({ query: newQuery }) //再把新的替换了
            //   router.push({ query: {} });
    }

    const initBalance = async() => {
        await getDmsBalance()
        await getDmpBalance()
        await getIsApprove(getDpmWithdrawContract, 1)
        if (skullCreateState.approveForm.step == 1) {
            await getIsApprove(getDragonMainlandShardsTokenContract, 2)
        }
        if (skullCreateState.approveForm.step == 2) {
            await getIsApproveSKull()
        }
    }

    const init = async() => {
        skullCreateState.dragonSkullContractList = [
                { id: 1, no: 13, clazz: 1, level: 3 },
                { id: 2, no: 12, clazz: 1, level: 2 },
                { id: 3, no: 11, clazz: 1, level: 1 },

                { id: 4, no: 23, clazz: 2, level: 3 },
                { id: 5, no: 22, clazz: 2, level: 2 },
                { id: 6, no: 21, clazz: 2, level: 1 },

                { id: 7, no: 33, clazz: 3, level: 3 },
                { id: 8, no: 32, clazz: 3, level: 2 },
                { id: 9, no: 31, clazz: 3, level: 1 },

                { id: 10, no: 43, clazz: 4, level: 3 },
                { id: 11, no: 42, clazz: 4, level: 2 },
                { id: 12, no: 41, clazz: 4, level: 1 },

                { id: 13, no: 53, clazz: 5, level: 3 },
                { id: 14, no: 52, clazz: 5, level: 2 },
                { id: 15, no: 51, clazz: 5, level: 1 },

            ],
            getAbleList()

    }

    const getAbleList = async() => {
        loadingHandle(true, 'loading')
        skullCreateState.dragonSkullList = await dragonSKullsHandleList(skullCreateState.menuItem)
        if (skullCreateState.localSelectItem) {
            selectSkullItem(skullCreateState.localSelectItem)
        }
        loadingHandle(false)
        console.log(' skullCreateState.dragonSkullList, ', skullCreateState.dragonSkullList)
    }

    // 龙骨数据链上封装
    const dragonSKullsHandleList = async(level) => {
        const contract = getDragonMainlandBoneContract()
        console.log('contract', contract)
        let address = await initWallet()

        let addresss = new Array(skullCreateState.dragonSkullContractList.length).fill(address)
        let list = skullCreateState.dragonSkullContractList.map(item => {
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
                skullCreateState.dragonSkullContractList[index].usable = item.toString()
            })
            console.log(' myDragonState.dragonSkullList', skullCreateState.dragonSkullList)
            return skullCreateState.dragonSkullContractList.filter(item => item.usable > 0 && item.level == level)


        } catch (error) {
            console.log(error)
            return []
        }
    }


    const selectMenuItem = async(item) => {
        skullCreateState.menuItem = item
        await init()
    }

    const loadingHandle = (flag, text) => {
        if (skullCreateState.loadingForm.loadingShow) {
            skullCreateState.loadingForm.loadingShow = false;
        }
        nextTick(() => {
            skullCreateState.loadingForm.loadingShow = flag ? flag : false;
            skullCreateState.loadingForm.loadingShowText = text ? text : "Loading...";
        });
    };

    const dragonClazzImgBcHandle = (state) => {
        return require(`@/assets/imgs/myMainland/skullCreate/skull-type/skull${state}.png`);
    }

    const skullCreateImg = (level) => {
        return require(`@/assets/imgs/myMainland/skullCreate/dragon-skull${level}.png`);
    }

    const selectSkullItem = (item, type) => {
        console.log('selectSkullItem', item)
        skullCreateState.localSelectItem = null
        let time = type ? 100 : 0
        if (type) {
            setTimeout(() => {
                console.log('skullCreateState.dragonSkullList', skullCreateState.dragonSkullList)
                skullCreateState.localSelectItem = item
                skullCreateState.dragonSkullList.map(res => {
                    res.selected = res.id == item.id
                })
                if (item.level == 2) {
                    skullCreateState.requirePrice = skullCreateState.createPrice.mid
                } else if (item.level == 1) {
                    skullCreateState.requirePrice = skullCreateState.createPrice.low
                }

                console.log(skullCreateState.dragonSkullList)
            }, time)
        } else {
            console.log('skullCreateState.dragonSkullList', skullCreateState.dragonSkullList)
            skullCreateState.localSelectItem = item
            skullCreateState.dragonSkullList.map(res => {
                res.selected = res.id == item.id
            })
            if (item.level == 2) {
                skullCreateState.requirePrice = skullCreateState.createPrice.mid
            } else if (item.level == 1) {
                skullCreateState.requirePrice = skullCreateState.createPrice.low
            }

            console.log(skullCreateState.dragonSkullList)
        }




    }

    const openDragonSkullCreate = () => {
        skullCreateState.createDragonSkullShow = true
    }

    const close = () => {
        skullCreateState.createDragonSkullShow = false
    }

    const getIsApprove = async(contractFuc, type) => {
        //  let contract = !skullCreateState.approveForm.dmp.isApprove ? getDpmWithdrawContract() : getDragonMainlandShardsTokenContract()
        let contract = contractFuc()
        const contractAddress = getDragonBoneCompoundContract()
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
                            skullCreateState.approveForm.step = 1 // dmp  已授权
                            skullCreateState.approveForm.dmp.isApprove = true
                            skullCreateState.approveForm.dmp.approveMaxPrice = balance
                        } else {
                            skullCreateState.approveForm.step = 0 // dmp  未授权
                            skullCreateState.approveForm.dmp.isApprove = false
                            skullCreateState.approveForm.dmp.approveMaxPrice = 0
                        }
                    } else if (type == 2) {
                        if (balance > 0) {
                            skullCreateState.approveForm.step = 2 // dms  已授权
                            skullCreateState.approveForm.dms.isApprove = true
                            skullCreateState.approveForm.dms.approveMaxPrice = balance
                            if (skullCreateState.approveForm.step == 2) {
                                await getIsApproveSKull()
                            }
                        } else {
                            skullCreateState.approveForm.step = 1 // dms  未授权
                            skullCreateState.approveForm.dms.isApprove = false
                            skullCreateState.approveForm.dms.approveMaxPrice = 0
                        }
                    }


                    console.log('contractRes', contractRes)
                    console.log('balance', balance)
                    console.log('approveForm', skullCreateState.approveForm)
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
        const contractAddress = getDragonBoneCompoundContract()
        let address = await initWallet()
        let params = {
            key: contract,
            address: address,
            contractAddress: contractAddress.address,
        }
        let res = await isApproved(params)
        if (res) {
            skullCreateState.approveForm.step = 3 // dms  已授权
            skullCreateState.approveForm.skull.isApprove = true
            skullCreateState.approveForm.skull.approveMaxPrice = 100000000
        } else {
            skullCreateState.approveForm.step = 2 // dms  已授权
            skullCreateState.approveForm.skull.isApprove = false
            skullCreateState.approveForm.skull.approveMaxPrice = 0


        }



    }
    const approve = async(type) => {
        if (type == 1 && !!skullCreateState.approveForm.dmp.isApprove) {
            return
        }
        if (type == 2 && !skullCreateState.approveForm.dmp.isApprove || !!skullCreateState.approveForm.dms.isApprove) {
            return
        }
        loadingHandle(true, (!skullCreateState.approveForm.dmp.isApprove ? 'Approving For DMP...' : 'Approving For DMS...'))

        let contract = !skullCreateState.approveForm.dmp.isApprove ? getDpmWithdrawContract() : getDragonMainlandShardsTokenContract()
        const contractAddress = getDragonBoneCompoundContract()
        console.log('getLbpApprove', contract)
        let params = {
            contractAddress: contractAddress.address,
            amount: ethers.utils.parseEther((100000000).toString()),
        }
        try {
            let contractRes = await contract.approve(params.contractAddress, params.amount)
            await contractRes.wait()
            await getIsApprove(getDpmWithdrawContract, 1)
            if (skullCreateState.approveForm.step == 1) {
                await getIsApprove(getDragonMainlandShardsTokenContract, 2)
            }
            loadingHandle(false)
        } catch (error) {
            loadingHandle(false)
            console.log(error)
        }
    }


    const approveSkull = async(type) => { // approved
        if (type == 3 && !skullCreateState.approveForm.dms.isApprove || !!skullCreateState.approveForm.skull.isApprove) {
            return
        }


        loadingHandle(true, 'Approving For Skull...')
        const contract = getDragonMainlandBoneContract()
        const contractAddress = getDragonBoneCompoundContract()
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
                skullCreateState.approveForm.step = 2 // dms  已授权
                skullCreateState.approveForm.skull.isApprove = false
                skullCreateState.approveForm.skull.approveMaxPrice = 0
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
            skullCreateState.wallet.dms = common.formatValue4(ethers.utils.formatEther(balance))
            console.log(' skullCreateState.wallet.dmp', skullCreateState.wallet.dmp)
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
            skullCreateState.wallet.dmp = common.formatValue4(ethers.utils.formatEther(balance))
            console.log(' skullCreateState.wallet.dmp', skullCreateState.wallet.dmp)
        } catch (error) {
            console.log(error)
        }
    }

    const startCreateSkull = () => {
        if (!skullCreateState.approveForm.dmp.isApprove || !skullCreateState.approveForm.dms.isApprove || !skullCreateState.approveForm.skull.isApprove) {
            return
        }

        if (skullCreateState.requirePrice.dmp > skullCreateState.wallet.dmp) {
            // return $message({
            //     type: 'warning',
            //     message: 'Your current DMP balance is not enough.',
            //     customClass: 'zZindex',
            // })
            return
        }
        if (skullCreateState.requirePrice.dms > skullCreateState.wallet.dms) {
            // return $message({
            //     type: 'warning',
            //     message: 'Your current DMS balance is not enough.',
            //     customClass: 'zZindex',
            // })
            return
        }
        // skullCreateState.createDragonSkullShow = false
        // skullCreateState.openBoxSuccessShow = true

        synthesisDragonsAPi()
    }




    // 龙骨合成-生成订单
    const synthesisDragonsAPi = async() => {
        loadingHandle(true, 'Synthesising in progress...')
        let address = await initWallet()
        let params = {
            no: skullCreateState.localSelectItem.no,
            number: 5
        }
        console.log('params', params)
            // skullCreateProgress(true)

        await getSynthesisContractHandle(params)
    }


    // 龙骨合成-合约相关
    const getSynthesisContractHandle = async(data) => {

        let params = {
            no: BigNumber.from(data.no.toString()),
            number: BigNumber.from(data.number.toString()),
        }
        console.log('params', params)


        /*  Todo */
        const contract = getDragonBoneCompoundContract()
        console.log('contract', contract)
        try {
            let contractBuyRes = await contract.compound(params.no, params.number)
            if (contractBuyRes && contractBuyRes.hash) {
                loadingHandle(false)
                skullCreateState.createDragonSkullShow = false
                skullCreateProgress(true)
                await contractRespSynthesis(contractBuyRes)
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


    // 龙骨合成-等待结果
    const contractRespSynthesis = async(contract) => {

        try {
            // loadingHandle(true, 'wait result...')
            let receipt = await contract.wait()
                // $message({
                //     type: 'success',
                //     message: 'Synthesis succeeded',
                //     customClass: 'zZindex',
                // })
                // skullCreateProgress(false)
            await getSkullResult(contract)
                // skullCreateState.breedMainShow = false
                // skullCreateState.breedSelectDragonShow = false
                // breedHeart()


        } catch (error) {
            console.log('error', error)
            loadingHandle(false)
            skullCreateProgress(false)
            await initData()
            return $message({
                type: 'warning',
                message: 'contract transaction failed',
                customClass: 'zZindex',
            })
        }

    }

    // 龙骨合成动画
    const skullCreateProgress = (state) => {
        skullCreateState.createDragonSkullShow = false
        loadingHandle(false)
        skullCreateState.skullCreateProgressShow = state
    }

    const cancelOpenBox = async() => {
        skullCreateState.openBoxSuccessShow = false
        await initData()

    }

    const getSkullResult = async(contract) => {

        let time = 0
        clearInterval(skullCreateState.timeSet)
        skullCreateState.timeSet = setInterval(async() => {
            time++
            skullCreateState.selectItem1 = await getSkullResultAPi(contract)
            if (time <= 60) {
                if (skullCreateState.selectItem1) {
                    skullCreateProgress(false)
                    clearRouteParams()
                    clearInterval(skullCreateState.timeSet)
                    skullCreateState.openBoxSuccessShow = true
                }
            } else {
                skullCreateProgress(false)
                clearRouteParams()
                clearInterval(skullCreateState.timeSet)
                $message({
                    type: 'success',
                    message: 'Dragon skull synthesis is complete, please check in your backpack.',
                    customClass: 'zZindex',
                })
                skullCreateState.openBoxSuccessShow = false
                await initData()
            }
        }, 1000)


    }

    const getSkullResultAPi = (contract) => {
        return new Promise((resolve, reject) => {
            let params = {
                clazz: skullCreateState.localSelectItem.clazz,
                level: skullCreateState.localSelectItem.level,
                transNo: contract.hash
            }
            API.myMainland.getDragonSkullsResult(params).then(res => {
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


    return {
        skullCreateState,
        back,
        mouseenterWithdrawMsg,
        mouseleaveWithdrawMsg,
        initData,
        selectMenuItem,
        dragonClazzImgBcHandle,
        selectSkullItem,
        skullCreateImg,
        openDragonSkullCreate,
        close,
        approve,
        approveSkull,
        startCreateSkull,
        cancelOpenBox,
    }
}