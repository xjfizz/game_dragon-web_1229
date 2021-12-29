/* 龙部分逻辑处理 */

// 导入配置功能

import { reactive, onMounted, toRefs, onBeforeUnmount, inject, getCurrentInstance, toRaw, ref, nextTick } from "vue";
import { useRouter, useRoute } from "vue-router";
import { getStorage, setCookie, setSession, getSession } from "@/utils/auth.js";
import { initWallet, myWallet, transferAccounts, getContract, getSendDragonContract, getExchangeContract, getBalanceHandle, getTokenMoney } from "@/utils/metaMask/ethers.js";
import { ethers, BigNumber } from "ethers";
import { useI18n } from "vue-i18n"; //要在js中使用国际化

import { path } from "animejs";
import Confetti from "@/assets/lottie/dragonEgg-claim/DragonEgg.json";
import html2canvas from "html2canvas";
import { useStore } from "vuex";
import { Decimal } from 'decimal.js'
import common from "@/utils/common";
import clip from "@/utils/clipboard";




// 初始化数据
const dmpState = reactive({
    swapLink: 'https://pancakeswap.finance/swap',
    dmpLink: '0x599107669322B0E72be939331f35A693ba71EBE2'

});





export default function dmpStateHandle() {

    const router = useRouter()
    const route = useRoute()
    const { ctx } = getCurrentInstance()
    const API = inject("API");
    const store = useStore()
    const $message = inject("$message");
    const { t } = useI18n();



    const goSwapLink = () => {
        window.open('https://pancakeswap.finance/info/token/0x599107669322b0e72be939331f35a693ba71ebe2', "_blank");
    }


    const goDmpLink  = () => { //https://bscscan.com/address/0x9a26e6D24Df036B0b015016D1b55011c19E76C87
        window.open(`https://bscscan.com/address/${dmpState.dmpLink}`, "_blank");
    }

    const copyLink = (url, event) => {
        console.log('===========', url)
        clip(url, event, 'Contract address copied successfully');
    }


    return {
        dmpState,
        goSwapLink,
        goDmpLink,
        copyLink,
    }
}


