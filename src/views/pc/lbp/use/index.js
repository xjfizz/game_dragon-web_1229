/* 龙部分逻辑处理 */

// 导入配置功能

import { reactive, onMounted, toRefs, onBeforeUnmount, inject, getCurrentInstance, toRaw, ref, nextTick } from "vue";
import { useRouter, useRoute } from "vue-router";
import { getStorage, setCookie, setSession, getSession } from "@/utils/auth.js";
import { initWallet, myWallet, transferAccounts, getBPoolContract, getConfigurableRightsPoolContract, getTokenMoney, getBalanceHandle } from "@/utils/metaMask/ethers.js";
import { ethers, BigNumber } from "ethers";
import { useI18n } from "vue-i18n"; //要在js中使用国际化

import { path } from "animejs";
import Confetti from "@/assets/lottie/dragonEgg-claim/DragonEgg.json";
import html2canvas from "html2canvas";
import { useStore } from "vuex";
import { Decimal } from 'decimal.js'
import common from "@/utils/common";
import pageHandle from '@/components/page/use/index.js'




// 初始化数据
const lbpState = reactive({
    poolTokenMoneyData: {
        dmst: {
            balance: 0,
            weight: 0,
        },
        usdt: {
            balance: 0,
            weight: 0,
        },
    },
    topData: {
        poolValue: 0
    },
    swapTotal: {},
    swapPrice: {
        dms: { price: 0 },
        usdt: { price: 0 },
    },

});





export default function lbpHandle() {

    const router = useRouter()
    const route = useRoute()
    const { ctx } = getCurrentInstance()
    const API = inject("API");
    const store = useStore()
    const $message = inject("$message");
    const { t } = useI18n();
    const { initPage } = pageHandle()

    onMounted(async () => {
        // await initWallet()
       // init()
    })

    const init = () => {
        // getPoolTokenMoney()
    }

    const ininData = () => {
        getSwapTotal()
    }


    const getSwapTotal = () => {
        let params = {}
        API.lbp.getSwapTotal(params).then(res => {
            if (res.code == 200) {
                lbpState.swapPrice.dms.price = common.formatValue4(res.data.dms.price_out)
                // lbpState.swapPrice.usdt.price = common.formatValue4(res.data.usdt.price_out)
                lbpState.swapTotal = res.data
                lbpState.swapTotal.midData = common.formatValueQian(Number(lbpState.swapTotal.volume.volume_in))
                lbpState.swapTotal.rightData = common.formatValue4(lbpState.swapTotal.dms.price_out)
                initPoolTokenData()
            }
        })
    }

    const getSwapPrice = () => {

    }

    const initPoolTokenData = () => {
        getPoolTokenMoneyBalance()
        getPoolTokenMoneyWeight()
    }

    const getPoolTokenMoneyBalance = async () => {
        // await initWallet()
        let contract = getBPoolContract()
        let dmst_address = getTokenMoney('dmst_address')
        let usdt_address = getTokenMoney('usdt_address')
        console.log('contract', contract)
        try {
            // 获取DMST/USDT balance
            let dmst_balance = await contract.getBalance(dmst_address)
            let usdt_balance = await contract.getBalance(usdt_address)
            lbpState.poolTokenMoneyData.dmst.balance = common.formatValue4(ethers.utils.formatEther(dmst_balance))
            lbpState.poolTokenMoneyData.usdt.balance = common.formatValue4(ethers.utils.formatEther(usdt_balance))
            console.log('ethers.utils.formatEther(dmst_balance)', ethers.utils.formatEther(dmst_balance))
            console.log('ethers.utils.formatEther(usdt_balance)', ethers.utils.formatEther(usdt_balance))
            lbpState.topData.poolValue = common.formatValueQian((lbpState.swapPrice.dms.price * lbpState.poolTokenMoneyData.dmst.balance) + lbpState.poolTokenMoneyData.usdt.balance)
            console.log('lbpState.poolTokenMoneyData', lbpState.poolTokenMoneyData)

        } catch (error) {

        }
    }


    const getPoolTokenMoneyWeight = async () => {
        // await initWallet()
        let contract = getConfigurableRightsPoolContract()
        let dmst_address = getTokenMoney('dmst_address')
        let usdt_address = getTokenMoney('usdt_address')
        console.log('contract', contract)
        try {
            // 获取DMST/USDT weight
            let dmst_weight = await contract.getDenormalizedWeight(dmst_address)
            let usdt_weight = await contract.getDenormalizedWeight(usdt_address)
            lbpState.poolTokenMoneyData.dmst.weight = new Decimal(common.formatValue4(ethers.utils.formatEther(dmst_weight))).mul(new Decimal(2))  // common.formatValue4(ethers.utils.formatEther(dmst_weight))
            // new Decimal(balance).sub new Decimal(50)          

            // lbpState.poolTokenMoneyData.usdt.weight =   common.formatValue4((50 - lbpState.poolTokenMoneyData.dmst.weight))  // common.formatValue4(ethers.utils.formatEther(usdt_weight))
            lbpState.poolTokenMoneyData.usdt.weight = new Decimal(100).sub(new Decimal(lbpState.poolTokenMoneyData.dmst.weight))
            console.log('lbpState.poolTokenMoneyData', lbpState.poolTokenMoneyData)

        } catch (error) {
            console.log(error)
        }
    }


    return {
        lbpState,
        initPoolTokenData,
        getSwapTotal,
        getSwapPrice,
        ininData,

    }
}