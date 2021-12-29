/* 龙部分逻辑处理 */

// 导入配置功能

import { reactive, onMounted,onUnmounted, toRefs, onBeforeUnmount, inject, getCurrentInstance, toRaw, ref, nextTick } from "vue";
import { useRouter, useRoute } from "vue-router";
import { getStorage, setCookie, setSession, getSession } from "@/utils/auth.js";
import { initWallet, myWallet, transferAccounts, getContract, getSendDragonContract, getExchangeContract, getBalanceHandle } from "@/utils/metaMask/ethers.js";
import { ethers, BigNumber } from "ethers";
import { useI18n } from "vue-i18n"; //要在js中使用国际化

import { path } from "animejs";
import Confetti from "@/assets/lottie/dragonEgg-claim/DragonEgg.json";
import html2canvas from "html2canvas";
import { useStore } from "vuex";
import { Decimal } from 'decimal.js'
import common from "@/utils/common";
import pageHandle from '@/components/page/use/index.js'
import barChartOptionCreator from "../components/chart/data";



// 初始化数据
const chartState = reactive({
    barChartOptionCreator:barChartOptionCreator(),
    chartTime:null
   
});





export default function chartStateHandle() {

    const router = useRouter()
    const route = useRoute()
    const { ctx } = getCurrentInstance()
    const API = inject("API");
    const store = useStore()
    const $message = inject("$message");
    const { t } = useI18n();
    const { initPage } = pageHandle()
    const Moment = inject("$Moment");

    onUnmounted(()=> {
        if(chartState.chartTime) {
            clearInterval(chartState.chartTime)
            chartState.chartTime = null
        }
    })

    const initChart = ()=> {
        getChatList()
        chartTimeUpdate()
   }
    const getChatList = ()=> {
     let params = {}
     API.lbp.latestExchangeRate(params).then(res=> {
        if(res.code == 200) {
            setChartData(res.data.reverse())
        }
     })
    }
    const setChartData = (data)=> {
        let chartList = {
            x:null,
            y:null
        }
        chartList.x = data.map(item=> {
            // Moment(activityDetail.beginTime)
            // .utc(0)
            // .format("MM.DD.YYYY (HH:mm:ss UTC)")
           // return Moment(item.ctime).format("mm:ss")
            return item.ctime
        })  
        chartList.y = data.map(item=> {
            return item.rate
        })    
        setChart(chartList)   
    }

    const setChart = (data)=> {
        chartState.barChartOptionCreator = barChartOptionCreator(data)
    }

    const chartTimeUpdate = ()=> {
        chartState.chartTime = setInterval(()=> {
            getChatList()
        },1000*60)
    }


    return {
        chartState,
        initChart,
       
    }
}