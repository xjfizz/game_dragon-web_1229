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
import pageHandle from '@/components/page/use/index.js'




// 初始化数据
const topTransactionsState = reactive({
    loadingForm: {
        loadingShowText: 'Loading...',
        loadingShow: false,
    },
    selectItem: 1,
    isBottom: false,
    list: [],
    dragonEggListPageInfo: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
        totalPages: 0,

    },

});





export default function topTransactionsStateHandle() {

    const router = useRouter()
    const route = useRoute()
    const { ctx } = getCurrentInstance()
    const API = inject("API");
    const store = useStore()
    const $message = inject("$message");
    const { t } = useI18n();
    const { initPage } = pageHandle()

    const selectMenuItem = (item) => {
        topTransactionsState.selectItem = item
        topTransactionsState.list = []
        topTransactionsState.dragonEggListPageInfo = {
            pageSize: 10,
            currentPage: 1,
            total: 0,
            totalPages: 0,
        }
        getList()
    }
    const initList = () => {
        initData()
        getList()
    }
    const initData = () => {
        topTransactionsState.selectItem = 1
        topTransactionsState.dragonEggListPageInfo = {
            pageSize: 10,
            currentPage: 1,
            total: 0,
            totalPages: 0,
        }
        topTransactionsState.list = []


    }

    const getMore = () => {
        if (topTransactionsState.isBottom) {
            return
        }
        topTransactionsState.pageInfo.page += 1
        getList()
    }



    const getList = async () => {
        // return topTransactionsState.list = []
        loadingHandle(true, 'loading...')
        let address = null
        if (topTransactionsState.selectItem == 2) {
            address = await initWallet()
        }


        let params = {
            caller: topTransactionsState.selectItem == 1 ? '' : address,
            page_size: topTransactionsState.dragonEggListPageInfo.pageSize,
            page: topTransactionsState.dragonEggListPageInfo.currentPage,
        }
        API.lbp.getSwapList(params).then(res => {
            if (res.code == 200) {
                if (!res.data) {
                    topTransactionsState.list = []
                    loadingHandle(false)
                    return
                }
                res.data.map(item => {
                    item.create_at = Number(item.create_at) * 1000
                    item.volume_out = common.formatValue4(item.volume_out)
                    item.fh = item.token_in == getTokenMoney('dmst_address') ? true : false // -:+
                })
                topTransactionsState.list = res.data
                topTransactionsState.dragonEggListPageInfo = res.pager
                initPage(topTransactionsState.dragonEggListPageInfo)
                loadingHandle(false)
            } else {
                return $message({
                    type: 'warning',
                    message: res.msg,
                    customClass: 'zZindex',
                })
            }
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


    const leftPage = () => {
        if (topTransactionsState.dragonEggListPageInfo.currentPage <= 1) {
            return
        }
        topTransactionsState.dragonEggListPageInfo.currentPage--
        getList()
    }

    const rightPage = () => {
        if (topTransactionsState.dragonEggListPageInfo.currentPage >= topTransactionsState.dragonEggListPageInfo.totalPages) {
            return
        }
        topTransactionsState.dragonEggListPageInfo.currentPage++
        getList()
    }

    const search = (data) => {
        topTransactionsState.dragonEggListPageInfo.currentPage = Number(data)
        getList()
    }


    const loadingHandle = (flag, text) => {
        if (topTransactionsState.loadingForm.loadingShow) {
            topTransactionsState.loadingForm.loadingShow = false
            topTransactionsState.selectLocalDragon = null
        }
        nextTick(() => {
            topTransactionsState.loadingForm.loadingShow = flag ? flag : false
            topTransactionsState.loadingForm.loadingShowText = text ? text : 'Loading...'
        })

    }




    return {
        topTransactionsState,
        selectMenuItem,
        initList,
        getMore,
        toEth,
        leftPage,
        rightPage,
        search,
    }
}