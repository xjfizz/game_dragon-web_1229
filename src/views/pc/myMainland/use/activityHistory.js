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
const activityHistoryState = reactive({
    loadingForm: {
        loadingShowText: 'Loading...',
        loadingShow: false,
    },
    list: [],
    menuItem: 1


});





export default function activityHistoryHandle() {

    const router = useRouter()
    const route = useRoute()
    const { ctx } = getCurrentInstance()
    const API = inject("API");
    const $message = inject("$message");
    const Moment = inject("$Moment");
    const store = useStore()
    const { t } = useI18n();
    const { initPage } = pageHandle()


    onMounted(() => {
        initData()
    })

    const initData = () => {
        activityHistoryState.list = []
        activityHistoryState.menuItem = 1
        getList()
    }


    const selectMenuItem = (item) => {
        activityHistoryState.menuItem = item
        activityHistoryState.list = []
        if (item == 1) {
            getList()
        } else if (item == 2) {
            skullsHistory()
        } else {
            blindBoxHistory()
        }

    }


    const getList = () => {
        let params = {}
        API.myMainland.activitesHistory(params).then(res => {
            if (res.code == 0) {
                activityHistoryState.list = res.data
            }
        })
    }

    const skullsHistory = () => {
        let params = {
            // limit:1000000,
            // page:1
        }
        API.blindBox.skullsHistory(params).then(res => {
            if (res.code == 0) {
                activityHistoryState.list = res.data
            }
        })
    }

    const blindBoxHistory = () => {
        let params = {}
        API.blindBox.blindBoxHistory(params).then(res => {
            if (res.code == 0) {
                activityHistoryState.list = res.data
            }
        })
    }

    const goContract = (item) => {
        console.log(item)
        if (!item) {
            return
        }
        let href = process.env.NODE_ENV === "production" ? `https://bscscan.com/tx/${item}` : `https://testnet.bscscan.com/tx/${item}`
        window.open(
            href,
            "_blank"
        );
    }

    return {
        activityHistoryState,
        goContract,
        selectMenuItem,
    }
}