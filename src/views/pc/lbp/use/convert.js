/* 龙部分逻辑处理 */

// 导入配置功能

import { reactive, onMounted, computed, toRefs, onBeforeUnmount, inject, getCurrentInstance, toRaw, ref, nextTick, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { getStorage, setCookie, setSession, getSession } from "@/utils/auth.js";
import { initWallet, myWallet, transferAccounts, getBPoolContract, getConfigurableRightsPoolContract, getLbpApproveContract, getTokenMoney, getBalanceHandle, switchSwitchEthereumChain } from "@/utils/metaMask/ethers.js";
import { ethers, BigNumber } from "ethers";
import { useI18n } from "vue-i18n"; //要在js中使用国际化
import BPool from "@/utils/metaMask/dragonJson/BPool.json"; // lbp-bpool
import { path } from "animejs";
import Confetti from "@/assets/lottie/dragonEgg-claim/DragonEgg.json";
import html2canvas from "html2canvas";
import { useStore } from "vuex";
import { Decimal } from 'decimal.js'
import common from "@/utils/common";
import pageHandle from '@/components/page/use/index.js'
import lbpHandle from "./index";
import topTransactionsStateHandle from "./topTransactions";





// 初始化数据
const convertState = reactive({
    contractComputing: false,
    LbpTime: 2, // 1,2,3
    debounceTime: null, //定义一个变量存放定时器
    timeSet: null,
    loadingForm: {
        loadingShowText: 'Loading...',
        loadingShow: false,
    },
    convertStateForm: {
        dms: {
            inputValue: '',
            balance: 0,
        },
        usdt: {
            inputValue: '',
            balance: 0,
        }
    },
    list: [
        // { id: 1, value: 0.0005, text: '0.05%' },
        { id: 2, value: 0.001, text: '0.1%' },
        { id: 3, value: 0.005, text: '0.5%' },

    ],
    loacalGetItem: 1,// 1dmp,2usdt
    definePrice: { id: 4, value: '1', text: '1' },
    localSelectedPrice: {
        id: 1, value: '0.1%', text: '0.05%'
    },
    approveForm: {
        isApprove: false,
        approveMaxPrice: 0,
    },
    loaclType: 1,

});





export default function convertStateHandle() {

    const router = useRouter()
    const route = useRoute()
    const { ctx } = getCurrentInstance()
    const API = inject("API");
    const store = useStore()
    const $message = inject("$message");
    const { t } = useI18n();
    const { initPage } = pageHandle()
    const { lbpState, ininData } = lbpHandle()
    const { initList } = topTransactionsStateHandle()



    watch(() => convertState.convertStateForm.dms.inputValue, async (newValue, old) => {
        if (convertState.loacalGetItem == 2) {
            // await confirm(1)
        } else {
            //  await confirm(2)
        }
    });

    watch(() => convertState.convertStateForm.usdt.inputValue, async (newValue, old) => {
        if (convertState.loacalGetItem == 2) {
            // await confirm(2)
        } else {
            // await confirm(1)
        }
    });

    onMounted(async () => {
        // const res =    await initWallet()
        // timeSetFun(timeSetValue)
        getLbpTime()
    })

    //防抖
    const debounce = (fn, wait) => {
        if (this.timer !== null) {
            clearTimeout(this.timer)
        }
        this.timer = setTimeout(fn, wait)
    }

    const init = async () => {
        convertState.localSelectedPrice = convertState.list[1]
        //  await initWallet()
        getLbpApprove()
        await getBalance()

    }

    const getBalance = async () => {
        let address = null
        try {
            address = await initWallet()
            if (address) {
                let dmsContract = getLbpApproveContract(getTokenMoney('dmst_address'))
                let usdtContract = getLbpApproveContract(getTokenMoney('usdt_address'))
                let balance1 = await dmsContract.balanceOf(address)
                let balance2 = await usdtContract.balanceOf(address)
                convertState.convertStateForm.dms.balance = toEth(balance1)
                convertState.convertStateForm.usdt.balance = toEth(balance2)
            } else {
                let dmsContract = getLbpApproveContract(getTokenMoney('dmst_address'))
                let usdtContract = getLbpApproveContract(getTokenMoney('usdt_address'))
                convertState.convertStateForm.dms.balance = 0
                convertState.convertStateForm.usdt.balance = 0

            }
        } catch (error) {
            let dmsContract = getLbpApproveContract(getTokenMoney('dmst_address'))
            let usdtContract = getLbpApproveContract(getTokenMoney('usdt_address'))
            convertState.convertStateForm.dms.balance = 0
            convertState.convertStateForm.usdt.balance = 0
        }



    }



    const swapItem = async () => {
        // TODO
        convertState.loacalGetItem = convertState.loacalGetItem == 2 ? 1 : 2
        convertState.approveForm.isApprove = false
        convertState.approveForm.approveMaxPrice = 0
        await getLbpApprove()

    }

    const getLbpApprove = async () => {
        let contractAddress = convertState.loacalGetItem == 2 ? getTokenMoney('dmst_address') : getTokenMoney('usdt_address')
        let contract = getLbpApproveContract(contractAddress)
        let address = null
        try {
            address = await initWallet()
            if (address) {
                console.log('getLbpApprove', contract)
                let params = {
                    address: address,
                    contractAddress: process.env.NODE_ENV === "production" ? BPool.address_prod : BPool.address,
                }
                try {
                    let contractRes = await contract.allowance(params.address, params.contractAddress)
                    let balance = ethers.utils.formatEther(contractRes)
                    if (balance <= 0) {
                        convertState.approveForm.isApprove = false
                        convertState.approveForm.approveMaxPrice = 0
                    } else {
                        convertState.approveForm.isApprove = true
                        convertState.approveForm.approveMaxPrice = balance
                    }
                    console.log('contractRes', contractRes)
                    console.log('balance', balance)
                } catch (error) {

                }
            } else {

                convertState.approveForm.isApprove = false
                convertState.approveForm.approveMaxPrice = 0
            }
        } catch (error) {
            convertState.approveForm.isApprove = false
            convertState.approveForm.approveMaxPrice = 0
        }



    }

    const approve = async () => {
        loadingHandle(true, (convertState.loacalGetItem == 2 ? 'Approving For DMST...' : 'Approving For USDT...'))
        let contractAddress = convertState.loacalGetItem == 2 ? getTokenMoney('dmst_address') : getTokenMoney('usdt_address')
        let contract = getLbpApproveContract(contractAddress)

        console.log('getLbpApprove', contract)
        let params = {
            contractAddress: process.env.NODE_ENV === "production" ? BPool.address_prod : BPool.address,
            amount: ethers.utils.parseEther((100000000).toString()),
        }
        try {
            let contractRes = await contract.approve(params.contractAddress, params.amount)
            await contractRes.wait()
            convertState.approveForm.isApprove = true
            await getLbpApprove()
            await getBalance()
            loadingHandle(false)
        } catch (error) {
            loadingHandle(false)
            console.log(error)
        }
    }

    const selectPrice = async (item) => {
        console.log('selectPrice', item)
        convertState.localSelectedPrice = item
        let type = convertState.loaclType
        if (type == 1) {
            await getReceivePrice()
        } else {
            await getPayPrice()
        }

    }

    const debounceTimeFuc = (func, type, wait) => {
        if (convertState.debounceTime) clearTimeout(convertState.debounceTime)
        convertState.debounceTime = setTimeout(() => {
            func(type)
        }, wait)
    }


    const confirm = async (type) => {
        convertState.contractComputing = true
        debounceTimeFuc(await confirmDebounce, type, 2000)
    }

    const confirmDebounce = async (type) => {
        convertState.loaclType = type
        console.log('type', type)
        if (type == 1) {
            if (convertState.loacalGetItem == 2) {
                convertState.convertStateForm.dms.inputValue = ismoneyConfirm(convertState.convertStateForm.dms.inputValue)
            } else {
                convertState.convertStateForm.usdt.inputValue = ismoneyConfirm(convertState.convertStateForm.usdt.inputValue)
            }

            await getReceivePrice()
        } else {
            if (convertState.loacalGetItem == 1) {
                convertState.convertStateForm.dms.inputValue = ismoneyConfirm(convertState.convertStateForm.dms.inputValue)
            } else {
                convertState.convertStateForm.usdt.inputValue = ismoneyConfirm(convertState.convertStateForm.usdt.inputValue)
            }
            await getPayPrice()
        }
        convertState.contractComputing = false

    }

    const ismoneyConfirm = (money) => {
        // var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
        money = Number(money)
        if (money > 0) {
            if (Number(String(money).substring(0, 1) == 0)) {
                return '1.1'
            }

        }
        if (money > 1.1) {
            return money;
        } else {
            return '1.1';
        };
    }


    const timeSetValue = () => {
        console.log('===timeSetValue================')
        return new Promise(async (resolve, reject) => {
            let type = convertState.loaclType
            if (type == 1) {
                await getReceivePrice()
                resolve(true)
            } else {
                await getPayPrice()
                resolve(true)
            }
        })

    }

    const timeSetFun = (fn) => {
        // convertState.timeSet = setInterval(() => {
        //     timeSetValue()
        // }, 3000)

        let timeout = null; // 创建一个标记用来存放定时器的返回值
        clearTimeout(timeout); // 每当用户输入的时候把前一个 setTimeout clear 掉
        timeout = setTimeout(async () => { // 然后又创建一个新的 setTimeout, 这样就能保证输入字符后的 interval 间隔内如果还有字符输入的话，就不会执行 fn 函数
            await fn()
        }, 3000);

    }

    const blurDefineIput = () => {
        console.log('blurDefineIput')
        convertState.definePrice.value = ismoney(convertState.definePrice.value)
        convertState.localSelectedPrice = JSON.parse(JSON.stringify(convertState.definePrice))
        convertState.localSelectedPrice.value = convertState.definePrice.value / 100
    }

    const ismoney = (money) => {
        // var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
        if (money > 0) {
            return money;
        } else {
            return '1';
        };
    }

    const getReceivePrice = async () => {
        let contract = getBPoolContract()
        let configurableRightsPoolContract = getConfigurableRightsPoolContract()
        let dmst_address = getTokenMoney('dmst_address')
        let usdt_address = getTokenMoney('usdt_address')
        let dmst_balance = await contract.getBalance(dmst_address)
        let usdt_balance = await contract.getBalance(usdt_address)
        let dmstBalance = common.formatValue4(ethers.utils.formatEther(dmst_balance))
        let usdtBalance = common.formatValue4(ethers.utils.formatEther(usdt_balance))

        let dmst_weight = await configurableRightsPoolContract.getDenormalizedWeight(dmst_address)
        let usdt_weight = await configurableRightsPoolContract.getDenormalizedWeight(usdt_address)
        let dmsWeight = common.formatValue4(ethers.utils.formatEther(dmst_weight))
        let usdtWeight = common.formatValue4(ethers.utils.formatEther(usdt_weight))

        let params = null
        if (convertState.loacalGetItem == 2) {
            if (!convertState.convertStateForm.dms.inputValue) {
                return
            }
            params = {
                tokenInBalance: ethers.utils.parseEther(dmstBalance.toString()),// usdt balance
                tokenInWeight: ethers.utils.parseEther(dmsWeight.toString()), // BigNumber.from(usdtWeight.toString()), // usdt weight
                tokenOutBalance: ethers.utils.parseEther(usdtBalance.toString()), // dms balance 
                tokenOutWeight: ethers.utils.parseEther(usdtWeight.toString()),// BigNumber.from(dmsWeight.toString()), // dms weight
                tokenAmountIn: ethers.utils.parseEther(convertState.convertStateForm.dms.inputValue.toString()),// BigNumber.from(convertState.convertStateForm.dms.inputValue.toString()), // dms balance 
                swapFee: BigNumber.from(Math.pow(10, 12).toString()),  // // 10,12次方   BigNumber.from(convertState.convertStateForm.dms.inputValue.toString()),
            }
        } else {
            if (!convertState.convertStateForm.usdt.inputValue) {
                return
            }
            params = {
                tokenInBalance: ethers.utils.parseEther(usdtBalance.toString()),
                tokenInWeight: ethers.utils.parseEther(usdtWeight.toString()),// BigNumber.from(dmsWeight.toString()),
                tokenOutBalance: ethers.utils.parseEther(dmstBalance.toString()),
                tokenOutWeight: ethers.utils.parseEther(dmsWeight.toString()),// BigNumber.from(usdtWeight.toString()),
                tokenAmountIn: ethers.utils.parseEther(convertState.convertStateForm.usdt.inputValue.toString()),// BigNumber.from(convertState.convertStateForm.usdt.inputValue.toString()), // dms balance 
                swapFee: BigNumber.from(Math.pow(10, 12).toString()), //BigNumber.from(convertState.convertStateForm.usdt.inputValue.toString()),
            }
        }
        console.log('params', params)

        try {
            let contractRes = await contract.calcOutGivenIn(params.tokenInBalance, params.tokenInWeight, params.tokenOutBalance, params.tokenOutWeight, params.tokenAmountIn, params.swapFee,)
            console.log('contractRes', contractRes)
            if (convertState.loacalGetItem == 2) {
                convertState.convertStateForm.usdt.inputValue = common.formatValue4(ethers.utils.formatEther(contractRes))  // common.formatValue4(ethers.utils.formatEther(contractRes))
                console.log(' convertState.convertStateForm.usdt.inputValue', convertState.convertStateForm.usdt.inputValue)
            } else {
                convertState.convertStateForm.dms.inputValue = common.formatValue4(ethers.utils.formatEther(contractRes)) // common.formatValue4(ethers.utils.formatEther(contractRes))
                console.log(' convertState.convertStateForm.dms.inputValue', convertState.convertStateForm.dms.inputValue)
            }



        } catch (error) {
            console.log('error', error)
        }
    }

    const getPayPrice = async () => {
        let contract = getBPoolContract()
        let configurableRightsPoolContract = getConfigurableRightsPoolContract()

        let dmst_address = getTokenMoney('dmst_address')
        let usdt_address = getTokenMoney('usdt_address')
        let dmst_balance = await contract.getBalance(dmst_address)
        let usdt_balance = await contract.getBalance(usdt_address)
        let dmstBalance = common.formatValue4(ethers.utils.formatEther(dmst_balance))
        let usdtBalance = common.formatValue4(ethers.utils.formatEther(usdt_balance))

        let dmst_weight = await configurableRightsPoolContract.getDenormalizedWeight(dmst_address)
        let usdt_weight = await configurableRightsPoolContract.getDenormalizedWeight(usdt_address)
        let dmsWeight = common.formatValue4(ethers.utils.formatEther(dmst_weight))
        let usdtWeight = common.formatValue4(ethers.utils.formatEther(usdt_weight))

        let params = null
        if (convertState.loacalGetItem == 1) {
            if (!convertState.convertStateForm.dms.inputValue) {
                return
            }
            params = {
                tokenInBalance: ethers.utils.parseEther(dmstBalance.toString()),// usdt balance
                tokenInWeight: ethers.utils.parseEther(dmsWeight.toString()),// ethers.utils.parseEther(usdtWeight.toString()),// BigNumber.from(usdtWeight.toString()), // usdt weight
                tokenOutBalance: ethers.utils.parseEther(usdtBalance.toString()), // dms balance 
                tokenOutWeight: ethers.utils.parseEther(usdtWeight.toString()),// BigNumber.from(dmsWeight.toString()), // dms weight
                tokenAmountIn: ethers.utils.parseEther(convertState.convertStateForm.dms.inputValue.toString()), // dms balance 
                swapFee: BigNumber.from(Math.pow(10, 12).toString()),  // // 10,12次方   BigNumber.from(convertState.convertStateForm.dms.inputValue.toString()),
            }
        } else {
            if (!convertState.convertStateForm.dms.inputValue) {
                return
            }
            params = {
                tokenInBalance: ethers.utils.parseEther(usdtBalance.toString()),
                tokenInWeight: ethers.utils.parseEther(usdtWeight.toString()),// BigNumber.from(dmsWeight.toString()),
                tokenOutBalance: ethers.utils.parseEther(dmstBalance.toString()),
                tokenOutWeight: ethers.utils.parseEther(dmsWeight.toString()),// BigNumber.from(usdtWeight.toString()),
                tokenAmountIn: ethers.utils.parseEther(convertState.convertStateForm.usdt.inputValue.toString()), // dms balance 
                swapFee: BigNumber.from(Math.pow(10, 12).toString()), //BigNumber.from(convertState.convertStateForm.usdt.inputValue.toString()),
            }
        }

        try {
            let contractRes = await contract.calcOutGivenIn(params.tokenInBalance, params.tokenInWeight, params.tokenOutBalance, params.tokenOutWeight, params.tokenAmountIn, params.swapFee,)
            console.log('contractRes', contractRes)
            if (convertState.loacalGetItem == 1) {
                convertState.convertStateForm.usdt.inputValue = common.formatValue4(ethers.utils.formatEther(contractRes)) // common.formatValue4(ethers.utils.formatEther(contractRes))
                console.log(' convertState.convertStateForm.usdt.inputValue', convertState.convertStateForm.usdt.inputValue)
            } else {
                convertState.convertStateForm.dms.inputValue = common.formatValue4(ethers.utils.formatEther(contractRes))// common.formatValue4(ethers.utils.formatEther(contractRes))
                console.log(' convertState.convertStateForm.dms.inputValue', convertState.convertStateForm.dms.inputValue)
            }


        } catch (error) {
            console.log('error', error)

        }
    }

    const convert = async () => {
        return
        await getLbpTime()
        let network = await switchSwitchEthereumChain()
        if (!network) {
            return
        }
        if (convertState.LbpTime == 1) {
            return $message({
                type: 'warning',
                message: 'LBP has not started',
                customClass: 'zZindex',
            })
        }
        if (convertState.LbpTime == 3) {
            return $message({
                type: 'warning',
                message: 'LBP has closed',
                customClass: 'zZindex',
            })
        }

        if (convertState.loacalGetItem == 2) {
            if (convertState.convertStateForm.dms.balance < convertState.convertStateForm.dms.inputValue) {
                return $message({
                    type: 'warning',
                    message: 'Your balance is not enough',
                    customClass: 'zZindex',
                })
            }
            if (convertState.convertStateForm.dms.inputValue < 1.1) {
                return $message({
                    type: 'warning',
                    message: 'The DMS you exchanged must be at least 1.1',
                    customClass: 'zZindex',
                })
            }
        } else {
            if (convertState.convertStateForm.usdt.balance < convertState.convertStateForm.usdt.inputValue) {
                return $message({
                    type: 'warning',
                    message: 'Your balance is not enough',
                    customClass: 'zZindex',
                })
            }
            if (convertState.convertStateForm.usdt.inputValue < 1.1) {
                return $message({
                    type: 'warning',
                    message: 'The USDT you exchanged must be at least 1.1',
                    customClass: 'zZindex',
                })
            }
        }

        loadingHandle(true, 'Swap...')
        //  await timeSetValue()
        convertContract()
    }



    const convertContract = async () => {
        let price = (new Decimal(convertState.convertStateForm.dms.inputValue).mul(new Decimal(1).sub(new Decimal(Number(convertState.localSelectedPrice.value))))).toString()
        console.log('=======debugger========', price)
        let contract = getBPoolContract(true)
        let dmst_address = getTokenMoney('dmst_address')
        let usdt_address = getTokenMoney('usdt_address')
        console.log('contract', contract)
        let params = null
        if (convertState.loacalGetItem == 2) { // 兑换 usdt
            params = {
                tokenIn: dmst_address, // 输入框的币地址dmstca
                tokenAmountIn: ethers.utils.parseEther(convertState.convertStateForm.dms.inputValue.toString()), // 输入框的币价格dmst
                tokenOut: usdt_address, // 购买的币地址  usdt
                // minAmountOut: ethers.utils.parseEther((convertState.convertStateForm.usdt.inputValue * (1 - Number(convertState.localSelectedPrice.value))).toString()),
                //  maxPrice: ethers.utils.parseEther((convertState.convertStateForm.usdt.inputValue * (1 + Number(convertState.localSelectedPrice.value))).toString()),
                minAmountOut: ethers.utils.parseEther(new Decimal(convertState.convertStateForm.usdt.inputValue).mul(new Decimal(new Decimal(1).sub(Number(convertState.localSelectedPrice.value)))).toString()),
                maxPrice: ethers.utils.parseEther(new Decimal(convertState.convertStateForm.usdt.inputValue).mul(new Decimal(new Decimal(1).add(Number(convertState.localSelectedPrice.value)))).toString()),

            }
        } else {
            params = {

                tokenIn: usdt_address,
                tokenAmountIn: ethers.utils.parseEther(convertState.convertStateForm.usdt.inputValue.toString()),
                tokenOut: dmst_address,
                // minAmountOut: ethers.utils.parseEther((convertState.convertStateForm.dms.inputValue * (1 - Number(convertState.localSelectedPrice.value))).toString()),
                //  maxPrice: ethers.utils.parseEther((convertState.convertStateForm.dms.inputValue * (1 + Number(convertState.localSelectedPrice.value))).toString()),
                minAmountOut: ethers.utils.parseEther(new Decimal(convertState.convertStateForm.dms.inputValue).mul(new Decimal(new Decimal(1).sub(Number(convertState.localSelectedPrice.value)))).toString()),
                maxPrice: ethers.utils.parseEther(new Decimal(convertState.convertStateForm.dms.inputValue).mul(new Decimal(new Decimal(1).add(Number(convertState.localSelectedPrice.value)))).toString()),
            }
        }

        try {
            console.log('params', params, (convertState.convertStateForm.usdt.inputValue * (1 - Number(convertState.localSelectedPrice.value))).toString())
            let contractRes = await contract.swapExactAmountIn(params.tokenIn, params.tokenAmountIn, params.tokenOut, params.minAmountOut, params.maxPrice,)
            console.log('contractRes', contractRes)
            if (contractRes) {
                loadingHandle(true, 'wait result...')
                await contractRes.wait()
                await getBalance()
                ininData()
                // initPage()
                initList()
                loadingHandle(false)
            }
        } catch (error) {
            console.log(error)
            loadingHandle(false)
            timeSetValue()

            if (error.code == 4001) {
                return $message({
                    type: 'warning',
                    message: error.message,
                    customClass: 'zZindex',
                })
            } else {
                console.log('error', error)

                return $message({
                    type: 'warning',
                    message: error.data.message,
                    customClass: 'zZindex',
                })
            }

        }
    }

    const blurDefineEnter = (e) => {
        console.log('blurDefineEnter', e)
        e.target.blur()
    }
    const focusDefineInput = () => {
        convertState.localSelectedPrice = convertState.definePrice
    }

    const loadingHandle = (flag, text) => {
        if (convertState.loadingForm.loadingShow) {
            convertState.loadingForm.loadingShow = false
            convertState.selectLocalDragon = null
        }
        nextTick(() => {
            convertState.loadingForm.loadingShow = flag ? flag : false
            convertState.loadingForm.loadingShowText = text ? text : 'Loading...'
        })

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

    const getLbpTime = async () => {
        // let localTime = await getNowTime();
        // // let beginTime1 = new Date('2021/11/17 20:00:00').getTime(); // start 
        // let beginTime1 =  process.env.NODE_ENV === "production" ? new Date('2021/11/17 20:00:00').getTime() : new Date('2021/11/17 18:00:00').getTime() ; // start 
        // let beginTime2 = new Date('2021/11/19 20:00:00').getTime(); // end

        // if (localTime < beginTime1) {
        //     convertState.LbpTime = 1
        // } else if (localTime >= beginTime1 && localTime < beginTime2) {
        //     convertState.LbpTime = 2
        // } else if (localTime > beginTime2) {
        //     convertState.LbpTime = 3
        // }

        convertState.LbpTime = 2

    }

    const getNowTime = () => {
        return new Promise((resolve, reject) => {
            API.activity.getServericeTime({}).then((res) => {
                resolve(res.data.timestamp);
            });
        });
    }

    return {
        convertState,
        swapItem,
        selectPrice,
        confirm,
        init,
        blurDefineIput,
        convert,
        blurDefineEnter,
        approve,
        focusDefineInput,
        getBalance,

    }
}