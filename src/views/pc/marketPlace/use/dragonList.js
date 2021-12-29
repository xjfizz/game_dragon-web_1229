// 导入配置功能

import { reactive, onMounted, toRefs, onBeforeUnmount, computed, inject, getCurrentInstance, toRaw, ref, nextTick } from "vue";
import { useRouter, useRoute } from "vue-router";
import { getStorage, setCookie, setSession, getSession } from "@/utils/auth.js";
import { initWallet, myWallet, transferAccounts, getContract, getMarketContract, getBalanceHandle } from "@/utils/metaMask/ethers.js";
import { ethers, BigNumber } from "ethers";
import { useI18n } from "vue-i18n"; //要在js中使用国际化
import dragonLocalTypeList from "../../myMainland/use/dragonLocalTypeList";
import { path } from "animejs";
import Confetti from "@/assets/lottie/dragonEgg-claim/DragonEgg.json";
import html2canvas from "html2canvas";
import { useStore } from "vuex";
import { Decimal } from 'decimal.js'
import pageHandle from '@/components/page/use/index.js'


const eggToDragon = ref(null);

// 初始化数据
const marketPlaceState = reactive({
    dragonLocalTypeList: dragonLocalTypeList,
    dragonList: [],
    // dragonSkullList: [],
    selectListShow1: false,
    selectItem1: {},
    selectList1: [
        { id: 3, name: "Latest" },
        { id: 1, name: "Lowest Price" },
        { id: 2, name: "Highest Price" },
    ],
    selectItem2: {},
    selectList2: [
        { id: 3, name: "Latest" },
        { id: 1, name: "Lowest Price" },
        { id: 2, name: "Highest Price" },
        { id: 4, name: "Lowest ID" },
        { id: 5, name: "Highest ID" },

    ],
    pageInfo: {
        pageSize: 24,
        currentPage: 1,
        total: 0,
        totalPages: 0,
    },
    searchKey: {
        clazz: [],
        stage: [], // 1：龙蛋 2：龙
        saleType: [], // 1:固定价格 2：拍卖
        sortRole: 2, // 0 按照id排 1 按价格排 2 按上架时间排
        sortType: 1, // 0 升序 1 降序
        dna: [], // 基因部位
        attackArr: [], // 攻击力
        defenseArr: [], // 防御力
        healthArr: [], // 生命力
        speedArr: [], // 速度
        intelligenceArr: [], // 灵魂力
        ceArr: [], // 战力
        breedCountArr: [], // 繁殖次数
        levelArr: [], // 龙骨等级
    },
    menuItem: 1, // 1dragon 2 skulls
    dragonSkullTotal: 0, // 龙骨数量
});





export default function markrtPlaceHandle() {

    const router = useRouter()
    const route = useRoute()
    const { ctx } = getCurrentInstance()
    const API = inject("API");
    const store = useStore()
    const $message = inject("$message");
    const { t } = useI18n();
    const { initPage } = pageHandle()
    const skullTotal = computed(() => {
        return countTotal(marketPlaceState.dragonList, 'overNum')
    });

    const countTotal = (arr, keyName) => {
        let $total = 0;
        $total = arr.reduce(function(total, currentValue, currentIndex, arr) {
            return currentValue['skullProduct'][keyName] ? (total + currentValue['skullProduct'][keyName]) : total;
        }, 0);
        return $total;
    }

    const init = () => {
        initData()
        if (marketPlaceState.menuItem == 1) {
            getMarketList()
        } else if (marketPlaceState.menuItem == 2) {
            getDragonSkullMarketList()
        }

    }

    const initDataPage = () => {
        marketPlaceState.pageInfo.currentPage = 1
        marketPlaceState.selectItem1 = {}
        marketPlaceState.searchKey.sortRole = 2
        marketPlaceState.searchKey.sortType = 1
        marketPlaceState.dragonList = []
    }

    const initData = () => {
        marketPlaceState.pageInfo.currentPage = 1

    }
    const initMarket = () => {
        init()
    }
    const initSearch = () => {
        init()
    }


    const getMarketList = () => {
        let params = {
            clazz: marketPlaceState.searchKey.clazz, //种类
            limit: marketPlaceState.pageInfo.pageSize,
            page: marketPlaceState.pageInfo.currentPage,
            stage: marketPlaceState.searchKey.stage,
            saleType: marketPlaceState.searchKey.saleType,
            sortRole: marketPlaceState.searchKey.sortRole,
            sortType: marketPlaceState.searchKey.sortType,
            dna: marketPlaceState.searchKey.dna, // 基因部位
            attackArr: marketPlaceState.searchKey.attackArr, // 攻击力
            defenseArr: marketPlaceState.searchKey.defenseArr, // 防御力
            healthArr: marketPlaceState.searchKey.healthArr, // 生命力
            speedArr: marketPlaceState.searchKey.speedArr, // 速度
            intelligenceArr: marketPlaceState.searchKey.intelligenceArr, // 灵魂力
            ceArr: marketPlaceState.searchKey.ceArr, // 战力
            breedCountArr: marketPlaceState.searchKey.breedCountArr, // 繁殖次数

        }
        API.marketPlace.marketPlaceList(params).then(res => {
            if (res.code == 0) {
                marketPlaceState.dragonList = res.data.list
                let pageInfo = {
                    pageSize: res.data.size,
                    currentPage: res.data.curPage,
                    total: res.data.total,
                    totalPages: res.data.totalPages,
                }
                marketPlaceState.pageInfo = pageInfo
                initPage(pageInfo)
            } else {
                $message.warning(t(`message['${res.i18n}']`));
            }
        })
    }


    // 龙骨列表
    const getDragonSkullMarketList = () => {
        let params = {
            clazz: marketPlaceState.searchKey.clazz, //种类
            limit: marketPlaceState.pageInfo.pageSize,
            page: marketPlaceState.pageInfo.currentPage,
            saleType: marketPlaceState.searchKey.saleType,
            sortRole: marketPlaceState.searchKey.sortRole,
            sortType: marketPlaceState.searchKey.sortType,
            levelArr: marketPlaceState.searchKey.levelArr,

        }
        API.marketPlace.dragonSkullmarketPlaceList(params).then(res => {
            if (res.code == 0) {
                marketPlaceState.dragonList = res.data.list
                let pageInfo = {
                    pageSize: res.data.size,
                    currentPage: res.data.curPage,
                    total: res.data.total,
                    totalPages: res.data.totalPages,
                }
                marketPlaceState.pageInfo = pageInfo
                initPage(pageInfo)
                getSkullsTotal()
            } else {
                $message.warning(t(`message['${res.i18n}']`));
            }
        })
    }



    const getSkullsTotal = () => {
        let params = {
            clazz: marketPlaceState.searchKey.clazz, //种类
            limit: marketPlaceState.pageInfo.pageSize,
            page: marketPlaceState.pageInfo.currentPage,
            saleType: marketPlaceState.searchKey.saleType,
            sortRole: marketPlaceState.searchKey.sortRole,
            sortType: marketPlaceState.searchKey.sortType,
            levelArr: marketPlaceState.searchKey.levelArr,

        }
        API.marketPlace.dragonSkullmarketPlaceListTotal(params).then(res => {
            if (res.code == 0) {
                marketPlaceState.dragonSkullTotal = res.data

            } else {
                $message.warning(t(`message['${res.i18n}']`));
            }
        })
    }






    const handleSelect = () => {
        marketPlaceState.selectListShow1 = true;
    };
    const handleSelectLeave = () => {
        marketPlaceState.selectListShow1 = false;
    };
    const selectItem = (item) => {
        console.log(item)
        marketPlaceState.selectItem1 = item;
        // clazz: [],
        // stage: [], // 1：龙蛋 2：龙
        // saleType: [], // 1:固定价格 2：拍卖
        // sortRole: 2,// 0 按照id排 1 按价格排 2 按上架时间排
        // sortType: 1,// 0 升序 1 降序
        if (item.id == 3) { // 时间
            marketPlaceState.searchKey.sortRole = 2
            marketPlaceState.searchKey.sortType = 1
        } else if (item.id == 1) { // 最低价格
            marketPlaceState.searchKey.sortRole = 1
            marketPlaceState.searchKey.sortType = 0

        } else if (item.id == 2) { // 最高价格
            marketPlaceState.searchKey.sortRole = 1
            marketPlaceState.searchKey.sortType = 1
        } else if (item.id == 4) { // ID 升序
            marketPlaceState.searchKey.sortRole = 0
            marketPlaceState.searchKey.sortType = 0
        } else if (item.id == 5) { // ID 降序
            marketPlaceState.searchKey.sortRole = 0
            marketPlaceState.searchKey.sortType = 1
        }
        init()
    };


    const leftPage = () => {
        if (marketPlaceState.pageInfo.currentPage <= 1) {
            return
        }
        marketPlaceState.pageInfo.currentPage--
            if (marketPlaceState.menuItem == 1) {
                getMarketList()
            } else
        if (marketPlaceState.menuItem == 2) {
            getDragonSkullMarketList()
        }
    }

    const rightPage = () => {
        if (marketPlaceState.pageInfo.currentPage >= marketPlaceState.pageInfo.totalPages) {
            return
        }
        marketPlaceState.pageInfo.currentPage++
            if (marketPlaceState.menuItem == 1) {
                getMarketList()
            } else
        if (marketPlaceState.menuItem == 2) {
            getDragonSkullMarketList()
        }
    }

    const search = (data) => {
        marketPlaceState.pageInfo.currentPage = Number(data)
        if (marketPlaceState.menuItem == 1) {
            getMarketList()
        } else if (marketPlaceState.menuItem == 2) {
            getDragonSkullMarketList()
        }
    }

    // const goDetail = (item)=> {
    //   console.log('item', item);
    //   router.push({ path: `/marketPlace/detail/${item.id}` })

    // }

    const goDetail = (item) => {
        console.log(item)
            // router.push({ path: `/marketPlace/detail/${item.heroVo.id}` })
        router.push({ path: `/myMainland/myDragonDetail/${item.heroVo.id}` })
    }

    const selectMenuItem = (item) => {
        if (marketPlaceState.menuItem == item) return
        marketPlaceState.dragonList = []
        marketPlaceState.menuItem = item
            // init()
    }


    const goSkullsDetail = (item) => {
        console.log(item);
        router.push({ path: `/myMainland/myDragonSkullsDetail/2/${item.id}` });
    }




    return {
        marketPlaceState,
        handleSelect,
        handleSelectLeave,
        selectItem,
        init,
        leftPage,
        rightPage,
        search,
        goDetail,
        initSearch,
        initMarket,
        selectMenuItem,
        goSkullsDetail,
        skullTotal,
        initDataPage,
    }
}