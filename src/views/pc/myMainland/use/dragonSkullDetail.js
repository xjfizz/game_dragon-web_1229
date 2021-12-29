/* 龙部分逻辑处理 */

// 导入配置功能

import { reactive, onMounted, watch, toRefs, onBeforeUnmount, inject, getCurrentInstance, toRaw, nextTick, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { getStorage, setCookie, setSession, getSession } from "@/utils/auth.js";
import {
    initWallet,
    myWallet,
    transferAccounts,
    getContract,
    getSendDragonContract,
    getMarketContract,
    getBuyMarketContract,
    getBuyMarketContractV2,
    getDragonMainlandShardsTokenContract,
    getBalanceHandle,
    setApprovalForAll,
    isApprovedForAll,
    isApproved,
    approved,
    getDragonMainlandBoneContract,
    getDragonBoneExchangeContract,
} from "@/utils/metaMask/ethers.js";
import { ethers, BigNumber } from "ethers";
import { useI18n } from "vue-i18n"; //要在js中使用国际化
import dragonLocalTypeList from "./dragonLocalTypeList"; //要在js中使用国际化
import dragonLocalTypeName from "./dragonLocalTypeName";
import Confetti from "@/assets/lottie/dragonEgg-claim/DragonEgg.json";
import html2canvas from "html2canvas";
import { useStore } from "vuex";
import { Decimal } from 'decimal.js'
import DragonExchange from '@/utils/metaMask/dragonJson/DragonExchange.json'
import pageHandle from "@/components/page/use/index.js";
import markrtPlaceHandle from "../../marketPlace/use/dragonList";
import dragonSkullContractList from "./dragonSkullContractList";

const eggToDragon = ref(null);



// 初始化数据
const myDragonDetailState = reactive({
    detailPath: 1, // 龙骨详情入口 1 背包， 2市场
    approveForm: {
        dragon: { approve: false, step: 0 },
        dms: { approve: false, balance: 0, step: 0 },
    },
    loadingForm: {
        loadingShowText: 'Loading...',
        loadingShow: false,
    },

    isOpening: false,
    sellBoxshow: false,
    sellForm: {
        type: 1,
        price: 0,
        startPrice: 0,
        endPrice: 0,
        days: 1,
        quantity: 0
    },
    myAddress: null,
    dragonAddress: null,
    dragonLocalTypeName: dragonLocalTypeName,
    dragonDetail: {
        clazz: 1,
        level: 1,
    },
    defaultOptions: {
        container: eggToDragon.value,
        animationData: Confetti,
        loop: true,
        autoplay: true,
    },
    anim: {},
    isStartDragon: false,
    selectLocalDragon: null,
    sendDragonShow: false,
    sendForm: {
        walletAddress: null,
        quantity: 0,
    },
    sendLoading: false,
    listCancelShow: false,
    buyDetailShow: false,
    timeInput: null,
    timeInputStart: null,
    timeInputEnd: null,
    selectListShow1: false,
    selectItem1: {},
    selectList1: [
        { id: 1, name: "1", value: 1 },
        { id: 2, name: "2", value: 2 },
        { id: 3, name: "3", value: 3 },

    ],
    pageInfo: {
        pageSize: 6,
        currentPage: 1,
        total: 0,
        totalPages: 0,
    },
    saleHistoryList: [],
    dragonSkullContractList: new dragonSkullContractList().getList(),
    tipList: [
        { text: ['Gift'], show: false },
        { text: ['Synthesis'], show: false },
    ]
});





export default function dragonSkullDetail() {

    const router = useRouter()
    const route = useRoute()
    const { ctx } = getCurrentInstance()
    const API = inject("API");
    const $message = inject("$message");
    const store = useStore()
    const { t } = useI18n();
    const { initPage } = pageHandle();
    const { initMarket } = markrtPlaceHandle()
    watch(route, (newValue, oldValue) => {
        if (route.params.id) {
            console.log('route-watch---', route.params.id)
            init()
        }

    })

    const initSellBox = () => {
        myDragonDetailState.sellForm.price = 0
        myDragonDetailState.sellForm.startPrice = 0
        myDragonDetailState.sellForm.endPrice = 0
        myDragonDetailState.sellForm.days = 1
        myDragonDetailState.sellForm.quantity = 0

    }


    const init = () => {
        loadingHandle(false)
        myDragonDetailState.isStartDragon = false
        myDragonDetailState.pageInfo.currentPage = 1
        initSellForm()
        myDragonDetailState.dragonSkullContractList = new dragonSkullContractList().getList()
        console.log('router', router)
        console.log('router', route)
        myDragonDetailState.dragonDetail.id = route.params.id
        myDragonDetailState.detailPath = route.params.detailPath
        myDragonDetail()
            // dragonAddressIsSameWalletAddress()
    }

    const initSellForm = () => {
        myDragonDetailState.sellBoxshow = false
        myDragonDetailState.sellForm = {
            type: 1,
            price: 0,
            startPrice: 0,
            endPrice: 0,
            days: 0,
            quantity: 0,
        }
    }



    const myDragonDetail = async() => {
        loadingHandle(true, 'loading...');
        let params = {
            id: myDragonDetailState.dragonDetail.id
        }
        if (myDragonDetailState.detailPath == 1) {
            // API.blindBox.dragonSkullDetail(params).then(async res => {
            //     if (res.code == 0) {
            //         //  myDragonDetailState.dragonDetail = res.data
            //         myDragonDetailState.dragonDetail = await dragonSKullsHandleList()
            //         console.log(' myDragonDetailState.dragonDetail', myDragonDetailState.dragonDetail)
            //         await dragonAddressIsSameWalletAddress(res.data.uid)
            //         skullSellHistory()

            //     } else {
            //         $message.warning(t(`message['${res.i18n}']`));
            //     }
            // })
            myDragonDetailState.dragonDetail = await dragonSKullsHandleList()
            if (myDragonDetailState.dragonDetail.usable < 1) {
                router.back()
            }
            console.log(' myDragonDetailState.dragonDetail', myDragonDetailState.dragonDetail)
            await dragonAddressIsSameWalletAddress()
            skullSellHistory()
        } else {
            API.blindBox.skullProductDetail(params).then(async res => {
                if (res.code == 0) {
                    myDragonDetailState.dragonDetail = res.data
                    myDragonDetailState.dragonDetail.buySureInfo = {
                        amount: myDragonDetailState.dragonDetail.skullProduct.price,
                        fee: new Decimal(myDragonDetailState.dragonDetail.skullProduct.price).mul(new Decimal(0.05)),
                        total: new Decimal(myDragonDetailState.dragonDetail.skullProduct.price).mul(new Decimal(1)),
                        quantity: 1,
                    }
                    await dragonAddressIsSameWalletAddress(res.data.skullProduct.uid)


                    if (myDragonDetailState.dragonDetail.skullProduct.saleType == 2) {
                        //  myDragonDetailState.dragonDetail.productDetail.heroProduct.price =201
                        let price = myDragonDetailState.dragonDetail.skullProduct.price
                        let start = myDragonDetailState.dragonDetail.skullProduct.auctionHighestPrice
                        let end = myDragonDetailState.dragonDetail.skullProduct.auctionLowestPrice
                        if (price >= start) {
                            myDragonDetailState.dragonDetail.timeProgress = '100%'
                        } else if (price <= end) {
                            myDragonDetailState.dragonDetail.timeProgress = '0%'
                        } else {
                            let value1 = new Decimal(price).sub(new Decimal(end))
                            let value2 = new Decimal(start).sub(new Decimal(end))
                            myDragonDetailState.dragonDetail.timeProgress = (new Decimal(new Decimal(value1).div(new Decimal(value2))).mul(new Decimal(100))) + '%'
                        }
                    }

                    skullSellHistory()
                } else {
                    $message.warning(t(`message['${res.i18n}']`));
                }
            })
        }

        loadingHandle(false);

    }

    const myDragonDetailParent = (id) => {

        return new Promise((resolve, reject) => {
            let params = {
                id: id
            }
            API.myMainland.dragonDetail(params).then(res => {
                if (res.code == 0) {
                    resolve(res.data)
                } else {
                    $message.warning(t(`message['${res.i18n}']`));
                }
            })
        })

    }

    const myDragonDetailChildren = (id) => {

        return new Promise((resolve, reject) => {
            let params = {
                heroId: id
            }
            API.myMainland.getHeroFamily(params).then(res => {
                if (res.code == 0) {
                    resolve(res.data)
                } else {
                    $message.warning(t(`message['${res.i18n}']`));
                }
            })
        })

    }


    const myDragonDetailChildrenList = (ids) => {

        return new Promise((resolve, reject) => {
            let params = {
                ids: ids
            }
            API.myMainland.getHeroByIds(params).then(res => {
                if (res.code == 0) {
                    resolve(res.data)
                } else {
                    $message.warning(t(`message['${res.i18n}']`));
                }
            })
        })

    }

    // 孵化时间倒计时

    const countDown = async() => {
        let item = myDragonDetailState.dragonDetail
        let startTime = await getNowTime(); //当前时间
        let end = new Date(item.hatchTime); //结束时间
        let result = parseInt((end - startTime) / 1000); //计算出豪秒
        myDragonDetailState.dragonDetail.countDownFn = setInterval(() => {
            result -= 1
            if (result <= 0) {
                clearInterval(myDragonDetailState.dragonDetail.countDownFn)
            }


            item.countDownTime = countDownFun(result);
        }, 1000)
    }
    const getNowTime = () => {
            return new Promise((resolve, reject) => {
                API.activity.getServericeTime({}).then(res => {
                    resolve(res.data.timestamp)
                })

            })

        }
        //倒计时
    const countDownFun = (result) => {
        // console.log(time)

        let d = parseInt(result / (24 * 60 * 60)); //用总共的秒数除以1天的秒数
        let h = parseInt((result / (60 * 60)) % 24); //精确小时，用去余
        let m = parseInt((result / 60) % 60); //剩余分钟就是用1小时等于60分钟进行趣余
        let s = parseInt(result % 60);
        //当倒计时结束时，改变内容
        if (result <= 0) {
            return false;
        }
        if (d < 10) {
            d = "0" + d;
        }
        if (h < 10) {
            h = "0" + h;
        }
        if (m < 10) {
            m = "0" + m;
        }
        if (s < 10) {
            s = "0" + s;
        }
        if (d == 0 && h == 0 && m == 0) {
            //   return "剩余" + s + "秒";
            return ['00', '00', '00', s];
        } else if (d == 0 && h == 0) {
            //  return "剩余" + m + "分" + s + "秒";
            return ['00', '00', m, s];
        } else if (d == 0) {
            // return "剩余" + h + "时" + m + "分" + s + "秒";
            return ['00', h, m, s];
        } else {
            // return "剩余" + d + "天" + h + "时" + m + "分" + s + "秒";
            return [d, h, m, s];
        }
    }

    const back = () => {
        router.back()
    }



    const openDradonEgg = async(item) => {
        if (!getSession("address")) {
            let address = await initWallet()
            setSession('address', address)
            let bindAddress = await store.dispatch("login/SET_LINK_ADDRESS_SAME_BIND", address);
            if (!bindAddress) {
                return $message.warning(t(`message['pleaseBindWalletAddress']`));
            }
            openDradonEggHandle(item)
        } else {
            let bindAddress = await store.dispatch("login/SET_LINK_ADDRESS_SAME_BIND", getSession("address"));
            if (!bindAddress) {
                return $message.warning(t(`message['pleaseBindWalletAddress']`));
            }
            openDradonEggHandle(item)
        }
    }

    const openDradonEggHandle = async(item) => {
        let address = await initWallet()
        if (myDragonDetailState.myAddress != address) {
            return $message({
                type: 'warning',
                message: t(`message['addressNotSamemyAddress']`),
                customClass: 'zZindex',
            })
        }
        //  startClaim()
        console.log('openDradonEgg', item)
        loadingHandle(true, 'Dragon being generated, please do not refresh...')
        myDragonDetailState.selectLocalDragon = item
            // const balance = await myWallet()
            // if (0 > (new Decimal(balance).sub(new Decimal(0.005))).toNumber()) {
            //     return $message({
            //         type: 'warning',
            //         message: 'Sorry, your BNB is not enough'
            //     })
            // }
        nextTick(async() => {
            await hatchDragonImg()
            let params = {
                "chainType": 1, // 1 BSC 2 ETH
                "id": item.id,

            }
            API.myMainland.dragonEggHatch(params).then(res => {
                if (res.code == 0) {
                    growUpDragonEgg(res.data)
                } else {
                    loadingHandle(false)
                    $message.warning(t(res.i18n));
                }
            })
        })




    }

    const hatchDragonImg = () => {
        return new Promise(async(resolve, reject) => {
            let params = {
                heroId: myDragonDetailState.selectLocalDragon.id,
            }
            let formData = new FormData();
            let file = await createImg()
            formData.append("file", file);
            // formData.append("heroId", params.heroId);
            API.myMainland.hatchDragon(formData, params).then(res => {
                if (res.code == 0) {
                    resolve(res)
                } else {
                    $message.warning(t(res.i18n));
                }
            })

        })
    }


    // 生成图片
    const createImg = () => {
        console.log('document', document.querySelector(".dragon-main-upload"))
        const width = document.querySelector(".dragon-main-upload").offsetWidth;
        const height = document.querySelector(".dragon-main-upload").offsetHeight;
        return new Promise((resolve, reject) => {
            html2canvas(document.querySelector(".dragon-main-upload"), {
                width,
                height,
                scrollY: 0,
                scrollX: 0,
                backgroundColor: null, //设置图片背景为透明
                dpi: window.devicePixelRatio * 2,
                scale: 1,
                useCORS: true,
            }).then((canvas) => {
                console.log("canvas", canvas);
                const href = canvas.toDataURL("image/png");
                console.log('href', href)
                let url = base64ToFile(href, 'dragon')
                resolve(url)
                    // downloadImage(href);
            });
        })

    };

    const base64ToFile = (urlData, fileName) => {
        let arr = urlData.split(',');
        let mime = arr[0].match(/:(.*?);/)[1];
        let bytes = atob(arr[1]); // 解码base64
        let n = bytes.length
        let ia = new Uint8Array(n);
        while (n--) {
            ia[n] = bytes.charCodeAt(n);
        }
        return new File([ia], fileName, { type: mime });
    }

    const downloadImage = (url) => {
        // 如果是在网页中可以直接创建一个 a 标签直接下载
        let a = document.createElement("a");
        a.href = url;
        console.log()
        a.download = "dragon";
        a.click();
    };




    const growUpDragonEgg = (data) => {
        loadingHandle(true, 'Payment is in progress, please do not refresh...')
        const contract = getSendDragonContract()
        console.log('contract', contract)

        let params = {
            id: BigNumber.from(data.no.toString()),
            geneDomi: BigNumber.from(data.geneDomi.toString()),
            geneRece: BigNumber.from((data.recessive + data.recessiveSec).toString()),
            //  geneRece: BigNumber.from(('310032200523005140042500136002270014100432004530012400215').toString()),
            matronId: BigNumber.from(data.motherNo.toString()),
            sireId: BigNumber.from(data.fatherNo.toString()),
            stage: data.no > 10000 ? 2 : 1,
            attr: {
                health: BigNumber.from(data.health.toString()),
                attack: BigNumber.from(data.attack.toString()),
                defense: BigNumber.from(data.defend.toString()),
                speed: BigNumber.from(data.speed.toString()),
                lifeForce: BigNumber.from(data.intellect.toString()),
            },
            skill: {
                horn: BigNumber.from(data.skillNo1.skillId.toString()),
                ear: BigNumber.from(data.skillNo2.skillId.toString()),
                wing: BigNumber.from(data.skillNo3.skillId.toString()),
                tail: BigNumber.from(data.skillNo4.skillId.toString()),
                talent: BigNumber.from(data.talent.talentId.toString()),
            },
            uri: data.uri,
            timestamp: BigNumber.from(data.timestamp.toString()),
            sign: data.sign,

        }
        console.log('params', params)

        contract.hatchDragonEggs(params.id, params.geneDomi, params.geneRece, params.matronId, params.sireId, params.stage, params.attr, params.skill, params.uri, params.timestamp, params.sign).then(async res => {
            console.log('res', res)
            if (res) {
                myDragonDetailState.isOpening = false
                startClaim()
                let data1 = {
                    id: data.id,
                    orderId: data.orderId,
                    transHash: res.hash,
                    no: data.no
                }
                hatchPaymentHandle(data1, res)
            }
        }).catch((error) => {
            loadingHandle(false)

            console.log('error', error)
            if (error.code == 4001) {
                $message.warning(error.message);
            } else {
                $message.warning(error.data);
            }
        })
    }
    const handleAnimation = (anim) => {
        myDragonDetailState.anim = anim;
        console.log('handleAnimation===========', anim);
    };
    const startClaim = () => {
        myDragonDetailState.isStartDragon = true;
        console.log('myDragonDetailState', myDragonDetailState)
            // myDragonDetailState.anim.goToAndPlay(0, true);
        setTimeout(() => {
            // myDragonDetailState.isStartDragon = true;
            myDragonDetailState.anim.goToAndPlay(0, true);
        }, 1000);
    };


    // 孵化回调
    const hatchPaymentHandle = (data, contract) => {
        let params = {
            id: data.id,
            orderId: data.orderId,
            transHash: data.transHash,

        }
        API.myMainland.hatchPayment(params).then(res => {
            if (res.code == 0) {
                // setIntelDragonDetail(data.no)
                contractResp(contract)

            } else {
                $message.warning(t(res.i18n));
            }
        })
    }

    const contractResp = async(contract) => {
        loadingHandle(false)
        let receipt = await contract.wait()
        console.log('receipt', receipt)
        await getBalanceHandle()
        myDragonDetail()
        $message.success('success');
    }

    const sendDragon = async() => {
        let address = await initWallet()
        if (myDragonDetailState.myAddress != address) {
            return $message({
                type: 'warning',
                message: t(`message['addressNotSamemyAddress']`),
                customClass: 'zZindex',
            })
        }
        myDragonDetailState.sendDragonShow = true
        console.log('====')
    }
    const closeBox = () => {
        myDragonDetailState.sendDragonShow = false
        myDragonDetailState.sendForm.walletAddress = ''
        myDragonDetailState.sendForm.quantity = 0
    }
    const confirm = async() => {
        console.log(myDragonDetailState.dragonDetail)
        if (myDragonDetailState.dragonDetail.usable < 1) {
            return
        }
        console.log('myDragonDetailState.sendForm.walletAddress', ethers.utils.isAddress(myDragonDetailState.sendForm.walletAddress))
        if (!ethers.utils.isAddress(myDragonDetailState.sendForm.walletAddress)) {
            return $message({
                type: 'warning',
                message: t(`message['receive.not.address']`),
                customClass: 'zZindex',
            })
        }


        // const contract = getSendDragonContract()
        // let params = {
        //     tokenId: BigNumber.from(myDragonDetailState.dragonDetail.no.toString()),

        // }
        // const tx = await contract.functions["ownerOf(uint256)"](params.tokenId);
        // console.log('tx', tx[0], myDragonDetailState.myAddress)
        // if ((tx[0]).toLowerCase() != myDragonDetailState.myAddress) {
        //     return $message({
        //         type: 'warning',
        //         message: t(`message['addressNotSamemyAddress']`),
        //         customClass: 'zZindex',
        //     })
        // }


        sendDragonApi()
    }
    const sendDragonApi = async() => {
        loadingHandle(true, 'transfer in progress...')
        let address = await initWallet()
        let params = {
            from: address,
            to: myDragonDetailState.sendForm.walletAddress,
            no: myDragonDetailState.dragonDetail.no,
            amount: myDragonDetailState.sendForm.quantity,
        }
        sendDragonContract(params)
    }

    const sendDragonContract = async(data) => {
        const contract = getDragonMainlandBoneContract()
        console.log('contract', contract)
        let params = {
            from: data.from,
            to: data.to,
            tokenId: BigNumber.from(data.no.toString()),
            amount: BigNumber.from(data.amount),
            data: '0x'

        }
        console.log('getSendDragonContract', params)

        console.log('params', params)
        try {
            const tx = await contract.safeTransferFrom(params.from, params.to, params.tokenId, params.amount, params.data);
            console.log('tx', tx)
            if (tx) {
                contractSendDragonResp(tx)
            }
        } catch (error) {
            console.log('error', error)
            loadingHandle(false)
            $message({
                type: 'warning',
                message: t(`message['${error.message}']`),
                customClass: 'zZindex',
            })


        }



    }

    const sendDragonApiCallBack = (data, contract) => {
        let params = {
            id: data.id,
            trHash: data.transHash
        }
        API.myMainland.sendDragonEggCallBack(params).then(res => {
            if (res.code == 0) {
                contractSendDragonResp(contract)

            } else {
                $message.warning(t(`message['${res.i18n}']`));
            }
        })
    }

    const contractSendDragonResp = async(contract) => {
        loadingHandle(true, 'wait result...')
        let receipt = await contract.wait()
        loadingHandle(false)
        closeBox()
        $message.success('success');
        await init()


    }

    const dragonAddressIsSameWalletAddress = async(uid) => {
        if (uid) {
            let params = {
                uid: uid
            }
            let res = await API.blindBox.getUserByUserId(params)
            if (res.code == 0) {
                myDragonDetailState.myAddress = res.data[0].openId
                myDragonDetailState.dragonAddress = await initWallet()
            } else {
                $message.warning(t(`message['${res.i18n}']`));
            }
        } else {
            myDragonDetailState.myAddress = await initWallet()
            myDragonDetailState.dragonAddress = await initWallet()
        }



    }


    const upDragon = async() => {
        // console.log('upDragon')
        // loadingHandle(true, 'isApprove...')
        // isApprove()
        myDragonDetailState.sellBoxshow = true
        await checkApprove()

    }

    // 上架-创建
    const upDragonAPi = () => {

        let params = null
        if (myDragonDetailState.sellForm.type == 1) {
            params = {
                skullType: myDragonDetailState.dragonDetail.no,
                saleType: myDragonDetailState.sellForm.type, // 1固定价格，2 拍卖,
                price: myDragonDetailState.sellForm.price,
                totalNum: myDragonDetailState.sellForm.quantity, //数量 
                // auctionHighestPrice:0, // 开始价格
                // auctionLowestPrice:0, // 结束价格
                // auctionDays: 0, // 拍卖时间
                type: 1 // 1 上架 2 下架 3 购买
            }
        } else {
            params = {
                skullType: myDragonDetailState.dragonDetail.no,
                saleType: myDragonDetailState.sellForm.type, // 1固定价格，2 拍卖,
                auctionHighestPrice: myDragonDetailState.sellForm.startPrice, // 开始价格
                auctionLowestPrice: myDragonDetailState.sellForm.endPrice, // 结束价格
                totalNum: myDragonDetailState.sellForm.quantity, // 数量
                auctionDays: myDragonDetailState.sellForm.days, // 拍卖时间
                type: 1 // 1 上架 2 下架 3 购买
            }
        }


        API.blindBox.skullProductUp(params).then(res => {
            if (res.code == 0) {
                getMarketContractHandle(res.data)

            } else {
                loadingHandle(false)
                $message({
                    type: 'warning',
                    message: res.msg,
                    customClass: 'zZindex',
                })
            }
        })
    }

    const isApprove = async() => {
        let address = await initWallet()
        if (myDragonDetailState.myAddress != address) {
            return $message({
                type: 'warning',
                message: t(`message['addressNotSamemyAddress']`),
                customClass: 'zZindex',
            })
        }
        let params = {
            address: myDragonDetailState.myAddress,
            contractAddress: process.env.NODE_ENV === 'production' ? DragonExchange.address_prod : DragonExchange.address,
            bool: 1,
        }
        let res = await setApprovalForAll(params)
        console.log('setApprovalForAll', res)
        if (res) {
            loadingHandle(true, 'uping...')
            upDragonAPi()
        }

    }

    // 上架-合约交互
    const getMarketContractHandle = async(data) => {
        //  const contract = getBuyMarketContract()
        const contract = getDragonBoneExchangeContract()
        console.log('contract', contract)
        console.log('data', data)


        let params = {
            orderId: BigNumber.from(data.id.toString()),
            number: BigNumber.from(data.totalNum.toString()),
            // tokenId: BigNumber.from(data.skullId.toString()),
            tokenId: BigNumber.from((myDragonDetailState.dragonDetail.no).toString()),
            price: ethers.utils.parseEther(data.price.toString()),
            exType: data.saleType, // BigNumber.from(data.heroNo.toString()),
            minPrice: data.saleType == 2 ? ethers.utils.parseEther(data.auctionLowestPrice.toString()) : ethers.utils.parseEther((0).toString()),
            maxPrice: data.saleType == 2 ? ethers.utils.parseEther(data.auctionHighestPrice.toString()) : ethers.utils.parseEther((0).toString()),
            timeHours: data.saleType == 2 ? BigNumber.from(data.auctionHour.toString()) : BigNumber.from((0).toString()),
        }
        console.log('params', params)

        let params1 = {
            orderId: params.orderId,
            tokenId: params.tokenId,
            price: params.price,
            amount: params.number,
        }
        let params2 = {
            exType: params.exType,
            minPrice: params.minPrice,
            maxPrice: params.maxPrice,
            timeHours: params.timeHours,
        }

        try {
            const tx = await contract.addMarket(params1, params2);
            console.log('tx', tx)
            if (tx) {
                let data1 = {
                    id: data.id,
                    transHash: tx.hash,
                }
                upDragonCallBack(data1, tx)
            }
        } catch (error) {
            console.log('error', error)
            loadingHandle(false)
                // upDragonRefuse()
            $message({
                type: 'warning',
                message: t(`message['${error.data ? error.data.message : error.message}']`),
                customClass: 'zZindex',
            })
        }
    }


    // 上架-取消订单
    const upDragonRefuse = (data) => {

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

    // 上架-回调
    const upDragonCallBack = (data, contract) => {
        let params = {
            id: data.id,
            transNo: data.transHash,
            type: 1, // 1上架 2 下架 
        }
        API.blindBox.skullProductUpCallback(params).then(res => {
            if (res.code == 0) {
                contractUpDragonResp(contract)

            } else {
                $message({
                    type: 'warning',
                    message: t(`message['${res.i18n}']`),
                    customClass: 'zZindex',
                })
            }
        })
    }

    // 上架-等待合约
    const contractUpDragonResp = async(contract) => {
        loadingHandle(true, 'wait result...')
        let receipt = await contract.wait()
        console.log('receipt', receipt)
        loadingHandle(false)
        myDragonDetailState.sellBoxshow = false
        initMarket()
        $message.success('listing success');
        router.back()
    }

    const loadingHandle = (flag, text) => {
        if (myDragonDetailState.loadingForm.loadingShow) {
            myDragonDetailState.loadingForm.loadingShow = false
            myDragonDetailState.selectLocalDragon = null
        }
        nextTick(() => {
            myDragonDetailState.loadingForm.loadingShow = flag ? flag : false
            myDragonDetailState.loadingForm.loadingShowText = text ? text : 'Loading...'
        })

    }

    const selectMethod = (type) => {
        myDragonDetailState.sellForm.type = type
        initSellBox()

    }

    const cancelSell = () => {
        myDragonDetailState.sellBoxshow = false
        initSellForm()
    }

    const confirmSell = () => {
        if (myDragonDetailState.sellForm.type == 1) {
            if (!myDragonDetailState.sellForm.price) {
                return $message({
                    type: 'warning',
                    message: 'please write price',
                    customClass: 'zZindex',
                })
            }
        }

        if (myDragonDetailState.sellForm.type == 2) {
            if (!myDragonDetailState.sellForm.startPrice) {
                return $message({
                    type: 'warning',
                    message: 'please write startPrice',
                    customClass: 'zZindex',
                })
            }
            if (!myDragonDetailState.sellForm.endPrice) {
                return $message({
                    type: 'warning',
                    message: 'please write endPrice',
                    customClass: 'zZindex',
                })
            }
            if (!myDragonDetailState.sellForm.days) {
                return $message({
                    type: 'warning',
                    message: 'please write days',
                    customClass: 'zZindex',
                })
            }
        }
        loadingHandle(true, 'Waiting for listing...')
        upDragonAPi()
    }

    const goMiningCamp = () => {
        router.push({ path: `/myMainland/miningCamp` })
    }

    const goParentDetail = (item) => {
        // route.params.id = item.id
        router.push({ path: `/myMainland/myDragonDetail/${item.id}` })
            // setTimeout(()=> {
            //     location.reload()
            // },100)

        // init()
    }

    const checkApprove = async() => {
        loadingHandle(true, 'Authorisation for testing in progress...')
        const contract = getDragonMainlandBoneContract()
        const contractAddress = getDragonBoneExchangeContract()
        let address = await initWallet()
        let params = {
            key: contract,
            address: address,
            contractAddress: contractAddress.address,
        }
        let res = await isApproved(params)
        if (res) {
            myDragonDetailState.approveForm.dragon.approve = true
            myDragonDetailState.approveForm.dragon.step = 1
        } else {
            myDragonDetailState.approveForm.dragon.approve = false
            myDragonDetailState.approveForm.dragon.step = 0
        }
        loadingHandle(false)

    }

    const approve = async() => { // approved
        loadingHandle(true, 'Approving...')

        const contract = getDragonMainlandBoneContract()
        const contractAddress = getDragonBoneExchangeContract()
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
                myDragonDetailState.approveForm.dragon.approve = true
                myDragonDetailState.approveForm.dragon.step = 1
            } else {
                myDragonDetailState.approveForm.dragon.approve = false
                myDragonDetailState.approveForm.dragon.step = 0
            }
            loadingHandle(false)
        } catch (error) {
            loadingHandle(false)
        }



    }

    const cancelListing = () => {
        console.log('cancelListing')
        myDragonDetailState.listCancelShow = true
    }


    const cancelOpt = () => {
        myDragonDetailState.listCancelShow = false
    }

    const sureCancel = async() => {
        // myDragonDetailState.listCancelShow = false
        await downDragonsAPi()
    }


    // 下架-生成订单
    const downDragonsAPi = async() => {
        loadingHandle(true, 'Waiting for removing...')
        await getDownDragonContractHandle()

    }


    // 下架-合约相关
    const getDownDragonContractHandle = async() => {
            // let address = await initWallet()
            let params = {
                orderId: BigNumber.from(myDragonDetailState.dragonDetail.skullProduct.id.toString())

            }
            console.log('params', params)


            /*  Todo */
            const contract = getDragonBoneExchangeContract()
            console.log('contract', contract)
            try {
                let contractBuyRes = await contract.removeMarket(params.orderId)

                if (contractBuyRes && contractBuyRes.hash) {
                    let data1 = {
                        id: myDragonDetailState.dragonDetail.skullProduct.id,
                        transHash: contractBuyRes.hash,
                    }
                    await downDragonAPiCallBack(data1, contractBuyRes)
                }
            } catch (error) {
                loadingHandle(false)
                console.log(error)
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
        // 下架-取消订单
    const downDragonAPiRefuse = (data) => {

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



    // 下架-回调
    const downDragonAPiCallBack = async(data, contract) => {
        let params = {
            id: data.id,
            transNo: data.transHash,
            type: 2, // 1上架 2 下架 3 购买
        }
        API.blindBox.skullProductUpCallback(params).then(res => {
            if (res.code == 0) {
                contractRespDownDragon(contract)
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

    // 下架-等待结果
    const contractRespDownDragon = async(contract) => {

        try {
            loadingHandle(true, 'wait result...')
            let receipt = await contract.wait()
            $message({
                type: 'success',
                message: 'removing successed',
                customClass: 'zZindex',
            })

            loadingHandle(false)
            myDragonDetailState.listCancelShow = false
            router.back()
                // context.emit('initMiningCamp')
                // breedState.breedMainShow = false
                // breedState.breedSelectDragonShow = false
                // breedHeart()


        } catch (error) {
            loadingHandle(false)
            return $message({
                type: 'warning',
                message: 'fail',
                customClass: 'zZindex',
            })
        }

    }


    const buyMarketDragon = async() => {
        console.log('dragonDetail.buySureInfo', myDragonDetailState.dragonDetail.buySureInfo)
        myDragonDetailState.buyDetailShow = true
        await checkApproveForMarketDms(getDragonMainlandShardsTokenContract)
    }

    const cancelBuyDetail = () => {
        myDragonDetailState.buyDetailShow = false
    }

    const sureBuyDetail = async() => {
        await buyDragonsAPi()

    }


    // 购买市场龙蛋-生成订单
    const buyDragonsAPi = async() => {
        loadingHandle(true, 'buy in progress...')
        await getbuyDragonsContractHandle()
    }


    // 购买市场龙蛋-合约相关
    const getbuyDragonsContractHandle = async() => {
            // let address = await initWallet()
            console.log(myDragonDetailState.dragonDetail.buySureInfo)
            let params = {
                orderId: BigNumber.from(myDragonDetailState.dragonDetail.skullProduct.id.toString()),
                amount: BigNumber.from(myDragonDetailState.dragonDetail.buySureInfo.quantity)
            }

            /*  Todo */

            const contract = getDragonBoneExchangeContract()
            console.log('contract', contract)
            try {

                let contractBuyRes = await contract.exchange(params.orderId, params.amount)

                if (contractBuyRes && contractBuyRes.hash) {
                    let data1 = {
                        id: myDragonDetailState.dragonDetail.skullProduct.id,
                        transHash: contractBuyRes.hash,
                    }

                    // await buyDragonsAPiCallBack(data1, contractBuyRes)
                    await contractRespBuyDragons(contractBuyRes)
                }
            } catch (error) {
                loadingHandle(false)
                console.log(error)
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
        // 购买市场龙蛋-取消订单
    const buyDragonsAPiRefuse = (data) => {

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



    // 购买市场龙蛋-回调
    const buyDragonsAPiCallBack = async(data, contract) => {
        let params = {
            id: data.id,
            transNo: data.transHash,
            type: 3, // 1上架 2 下架 3 购买
        }
        API.myMainland.upProductCallback(params).then(res => {
            if (res.code == 0) {
                contractRespBuyDragons(contract)

            } else {
                $message({
                    type: 'warning',
                    message: t(`message['${res.i18n}']`),
                    customClass: 'zZindex',
                })
            }
        })
    }

    // 购买市场龙蛋-等待结果
    const contractRespBuyDragons = async(contract) => {
        try {
            loadingHandle(true, 'wait result...')
            let receipt = await contract.wait()
            $message({
                type: 'success',
                message: 'Purchase successful',
                customClass: 'zZindex',
            })

            loadingHandle(false)
                // context.emit('initMiningCamp')
            myDragonDetailState.buyDetailShow = false
            initSellBox()
            router.back()



        } catch (error) {
            loadingHandle(false)
            return $message({
                type: 'warning',
                message: 'fail',
                customClass: 'zZindex',
            })
        }

    }







    const checkApproveForMarketDms = async(contractFuc) => {
        loadingHandle(true, 'Authorisation for testing in progress...')
        let contract = contractFuc()
        const contractAddress = getDragonBoneExchangeContract()
        let address = await initWallet()
        let params = {
            address: address,
            contractAddress: contractAddress.address,
        }
        let contractRes = await contract.allowance(params.address, params.contractAddress)
        let balance = ethers.utils.formatEther(contractRes)
        console.log('balance', balance)
        if (balance > 0) {
            myDragonDetailState.approveForm.dms.approve = true
            myDragonDetailState.approveForm.dms.balance = balance
            myDragonDetailState.approveForm.dms.step = 1
        } else {
            myDragonDetailState.approveForm.dms.approve = false
            myDragonDetailState.approveForm.dms.balance = 0
            myDragonDetailState.approveForm.dms.step = 0
        }
        console.log('myDragonDetailState.approveForm', myDragonDetailState.approveForm)
        loadingHandle(false)

    }


    const approveDmsForMarket = async() => { // approved
        loadingHandle(true, 'Approving For DMS...')
        const contract = getDragonMainlandShardsTokenContract()
            //  const contractAddress = getBuyMarketContract()
        const contractAddress = getDragonBoneExchangeContract()

        let address = await initWallet()
        let params = {
            contractAddress: contractAddress.address,
            amount: ethers.utils.parseEther((100000000).toString()),
        }

        try {
            let contractRes = await contract.approve(params.contractAddress, params.amount)
            await contractRes.wait()
            await checkApproveForMarketDms(getDragonMainlandShardsTokenContract)
            loadingHandle(false)
        } catch (error) {
            loadingHandle(false)
            console.log(error)
        }

    }

    const inputSellFormPrice = (e) => { //   inputSellFormStartPrice,inputSellFormEndPrice,inputSellFormDays
        let time = null
        if (myDragonDetailState.timeInput) {
            clearTimeout(myDragonDetailState.timeInput)

        }
        myDragonDetailState.timeInput = setTimeout(() => {
            myDragonDetailState.sellForm.price = ismoneyConfirm(e)
        }, 2000)
    }


    const inputSellFormQuantity = (e) => {
        let time = null
        if (myDragonDetailState.timeInput) {
            clearTimeout(myDragonDetailState.timeInput)

        }
        myDragonDetailState.timeInput = setTimeout(() => {
            myDragonDetailState.sellForm.quantity = isQuantityConfirm(e)
        }, 2000)
    }


    const inputSendFormQuantity = (e) => {
        let time = null
        if (myDragonDetailState.timeInput) {
            clearTimeout(myDragonDetailState.timeInput)

        }
        myDragonDetailState.timeInput = setTimeout(() => {
            myDragonDetailState.sendForm.quantity = isQuantityConfirm(e)
        }, 500)
    }

    const inputBuyFormQuantity = (e) => {
        let time = null
        if (myDragonDetailState.timeInput) {
            clearTimeout(myDragonDetailState.timeInput)

        }
        myDragonDetailState.timeInput = setTimeout(() => {
            myDragonDetailState.dragonDetail.buySureInfo.quantity = isQuantityConfirmBuy(e)
            if (myDragonDetailState.dragonDetail.buySureInfo.quantity) {
                myDragonDetailState.dragonDetail.buySureInfo.fee = new Decimal(myDragonDetailState.dragonDetail.skullProduct.price * myDragonDetailState.dragonDetail.buySureInfo.quantity).mul(new Decimal(0.05))
                myDragonDetailState.dragonDetail.buySureInfo.total = new Decimal(myDragonDetailState.dragonDetail.buySureInfo.quantity).mul(new Decimal(myDragonDetailState.dragonDetail.skullProduct.price))
            } else {
                myDragonDetailState.dragonDetail.buySureInfo.fee = 0
                myDragonDetailState.dragonDetail.buySureInfo.total = 0
            }

        }, 500)
    }

    const blurSellFormPrice = (e) => {
        myDragonDetailState.sellForm.price = ismoneyConfirm(e)
    }

    const inputSellFormStartPrice = (e) => { //   inputSellFormStartPrice,inputSellFormEndPrice,inputSellFormDays
        let time = null
        if (myDragonDetailState.timeInputStart) {
            clearTimeout(myDragonDetailState.timeInputStart)

        }
        myDragonDetailState.timeInputStart = setTimeout(() => {
            myDragonDetailState.sellForm.startPrice = ismoneyConfirmStartPrice(e)
        }, 2000)
    }


    const blurSellFormStartPrice = (e) => {
        myDragonDetailState.sellForm.startPrice = ismoneyConfirmStartPrice(e)
    }



    const inputSellFormEndPrice = (e) => { //   inputSellFormStartPrice,inputSellFormEndPrice,inputSellFormDays
        let time = null
        if (myDragonDetailState.timeInputEnd) {
            clearTimeout(myDragonDetailState.timeInputEnd)

        }
        myDragonDetailState.timeInputEnd = setTimeout(() => {
            myDragonDetailState.sellForm.endPrice = ismoneyConfirmEndPrice(e)
        }, 2000)
    }

    const blurSellFormEndPrice = () => {
        myDragonDetailState.sellForm.endPrice = ismoneyConfirmEndPrice(e)
    }

    const inputSellFormDays = (e) => { //   inputSellFormStartPrice,inputSellFormEndPrice,inputSellFormDays
        let time = null
        if (myDragonDetailState.timeInput) {
            clearTimeout(myDragonDetailState.timeInput)

        }
        myDragonDetailState.timeInput = setTimeout(() => {
            myDragonDetailState.sellForm.days = ismoneyConfirmDays(e)
        }, 2000)
    }

    const ismoneyConfirm = (money) => {
        money = Number(money)
        if (!money || money <= 0) {
            $message({
                type: 'warning',
                message: 'The currently entered value is out of range',
                customClass: 'zZindex',
            })
            return money = ''
        } else if (money > 1000000) {
            money = 1000000
        }
        if (money > 0) {
            if (Number(String(money).substring(0, 1) == 0) && String(money).indexOf('.') <= -1) {
                return '0.0001'
            }

        }
        if (money.toString().split(".")[1] && money.toString().split(".")[1].length > 4) {
            return money.toFixed(4)
        }
        if (money > 0.0001) {
            return money;
        } else {
            return '0.0001';
        };
    }


    const isQuantityConfirm = (money) => {
        money = Number(money)
        if (money > myDragonDetailState.dragonDetail.usable) {
            //  money = myDragonDetailState.dragonDetail.skullProduct.overNum
            $message({
                type: 'warning',
                message: 'The currently entered value is out of range',
                customClass: 'zZindex',
            })
            return '';
        }
        if (money == '') {
            $message({
                type: 'warning',
                message: 'The currently entered value is out of range',
                customClass: 'zZindex',
            })
            return '';
        }
        if (!(/(^[1-9]\d*$)/.test(money))) {
            $message({
                type: 'warning',
                message: 'The currently entered value is out of range',
                customClass: 'zZindex',
            })
            return '';
        } else {
            return money
        }
    }


    const isQuantityConfirmBuy = (money) => {
        money = Number(money)
        if (money > myDragonDetailState.dragonDetail.skullProduct.overNum) {
            //  money = myDragonDetailState.dragonDetail.skullProduct.overNum
            $message({
                type: 'warning',
                message: 'The currently entered value is out of range',
                customClass: 'zZindex',
            })
            return '';
        }
        if (money == '') {
            $message({
                type: 'warning',
                message: 'The currently entered value is out of range',
                customClass: 'zZindex',
            })
            return '';
        }
        if (!(/(^[1-9]\d*$)/.test(money))) {
            $message({
                type: 'warning',
                message: 'The currently entered value is out of range',
                customClass: 'zZindex',
            })
            return '';
        } else {
            return money
        }
    }


    const ismoneyConfirmStartPrice = (money) => {
        // var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
        if (!money || money <= 0) {
            $message({
                type: 'warning',
                message: 'The currently entered value is out of range',
                customClass: 'zZindex',
            })
            return money = ''

        } else if (money > 1000000) {
            money = 1000000
        }
        money = Number(money)
        if (money > 0) {
            if (Number(String(money).substring(0, 1) == 0) && String(money).indexOf('.') <= -1) {
                money = (new Decimal(myDragonDetailState.sellForm.endPrice).suv(new Decimal(0.1)).toNumber())
            }

        }
        if (money.toString().split(".")[1] && money.toString().split(".")[1].length > 4) {
            money = money.toFixed(4)
        }
        if (myDragonDetailState.sellForm.endPrice) {
            if (money > (new Decimal(myDragonDetailState.sellForm.endPrice).mul(new Decimal(10))).toNumber()) {
                // money = (new Decimal((new Decimal((new Decimal(myDragonDetailState.sellForm.endPrice).mul(new Decimal(10)))).add(new Decimal((new Decimal(myDragonDetailState.sellForm.endPrice).mul(new Decimal(1.1))))))).mul(new Decimal(0.5))).toNumber()
                // money = ((myDragonDetailState.sellForm.endPrice * 10) + (myDragonDetailState.sellForm.endPrice * 1.1)) * 0.5
                $message({
                    type: 'warning',
                    message: 'The currently entered value is out of range',
                    customClass: 'zZindex',
                })
                return money = ''
            }
            if (money < (new Decimal(myDragonDetailState.sellForm.endPrice).mul(new Decimal(1.1))).toNumber()) {
                // money = (new Decimal(myDragonDetailState.sellForm.endPrice).mul(new Decimal(1.1)))
                //  money = (new Decimal((new Decimal((new Decimal(myDragonDetailState.sellForm.endPrice).mul(new Decimal(10)))).add(new Decimal((new Decimal(myDragonDetailState.sellForm.endPrice).mul(new Decimal(1.1))))))).mul(new Decimal(0.5))).toNumber()
                // money = ((myDragonDetailState.sellForm.endPrice * 10) + (myDragonDetailState.sellForm.endPrice * 1.1)) * 0.5
                $message({
                    type: 'warning',
                    message: 'The currently entered value is out of range',
                    customClass: 'zZindex',
                })
                return money = ''
            }
        }
        if (money.toString().split(".")[1] && money.toString().split(".")[1].length > 4) {
            money = money.toFixed(4)
        }

        return money
    }

    const ismoneyConfirmEndPrice = (money) => {


        if (!money || money <= 0) {
            $message({
                type: 'warning',
                message: 'The currently entered value is out of range',
                customClass: 'zZindex',
            })
            return money = ''
        } else if (money > 1000000) {
            money = 1000000
        }
        money = Number(money)
        if (money > 0) {
            if (Number(String(money).substring(0, 1) == 0) && String(money).indexOf('.') <= -1) {
                money = (new Decimal(myDragonDetailState.sellForm.startPrice).mul(new Decimal(0.1))).toNumber()
            }

        }
        if (money.toString().split(".")[1] && money.toString().split(".")[1].length > 4) {
            money = money.toFixed(4)
        }
        if (myDragonDetailState.sellForm.startPrice) {
            if (money < (new Decimal(myDragonDetailState.sellForm.startPrice).div(new Decimal(10))).toNumber()) {
                // money = (new Decimal(myDragonDetailState.sellForm.startPrice).div(new Decimal(10))).toNumber()
                //  money = (new Decimal(new Decimal((new Decimal(myDragonDetailState.sellForm.startPrice).div(new Decimal(10)))).add(new Decimal((new Decimal(myDragonDetailState.sellForm.startPrice).div(new Decimal(1.1)))))).mul(new Decimal(0.5))).toNumber()
                // money = ((myDragonDetailState.sellForm.startPrice / 10) + (myDragonDetailState.sellForm.startPrice / 1.1)) * 0.5
                $message({
                    type: 'warning',
                    message: 'The currently entered value is out of range',
                    customClass: 'zZindex',
                })
                return money = ''


            }
            if (money > (new Decimal(myDragonDetailState.sellForm.startPrice).div(new Decimal(1.1))).toNumber()) {
                //  money = (new Decimal(myDragonDetailState.sellForm.startPrice).div(new Decimal(1.1))).toNumber()
                // money = (new Decimal(new Decimal((new Decimal(myDragonDetailState.sellForm.startPrice).div(new Decimal(10)))).add(new Decimal((new Decimal(myDragonDetailState.sellForm.startPrice).div(new Decimal(1.1)))))).mul(new Decimal(0.5))).toNumber()
                //  money = ((myDragonDetailState.sellForm.startPrice / 10) + (myDragonDetailState.sellForm.startPrice / 1.1)) * 0.5
                $message({
                    type: 'warning',
                    message: 'The currently entered value is out of range',
                    customClass: 'zZindex',
                })
                return money = ''
            }
        }
        if (money.toString().split(".")[1] && money.toString().split(".")[1].length > 4) {
            money = money.toFixed(4)
        }

        return money
    }


    const ismoneyConfirmDays = (money) => {
        // var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
        money = Number(money)
        if (money > 0) {
            if (Number(String(money).substring(0, 1) == 0) && String(money).indexOf('.') <= -1) {
                return '1'
            }

        }
        if (money.toString().split(".")[1] && money.toString().split(".")[1].length > 0) {
            return money.toFixed(0)
        }
        if (money > 3) {
            return '3';
        }
        if (money < 1) {
            return '1';
        }
    }


    const getProductDetail = (id) => { // productDetail
        return new Promise((resolve, reject) => {
            let params = {
                id: id
            }
            API.blindBox.skullProductDetail(params).then(res => {
                if (res.code == 0) {
                    resolve(res.data)
                } else {
                    $message.warning(t(`message['${res.i18n}']`));
                }
            })
        })
    }

    const selectTime = (item) => {
        myDragonDetailState.sellForm.days = item.value


    }


    const leftPage = () => {
        if (myDragonDetailState.pageInfo.currentPage <= 1) {
            return
        }
        myDragonDetailState.pageInfo.currentPage--
            skullSellHistory()
    }

    const rightPage = () => {
        if (myDragonDetailState.pageInfo.currentPage >= myDragonDetailState.pageInfo.totalPages) {
            return
        }
        myDragonDetailState.pageInfo.currentPage++
            skullSellHistory()
    }

    const search = (data) => {
        myDragonDetailState.pageInfo.currentPage = Number(data)
        skullSellHistory()
    }

    const skullSellHistory = () => {
        console.log('getSession', getSession('user'))
        let params = {
            limit: myDragonDetailState.pageInfo.pageSize,
            page: myDragonDetailState.pageInfo.currentPage,
            skullType: myDragonDetailState.detailPath == 2 ? myDragonDetailState.dragonDetail.skullProduct.skullType : myDragonDetailState.dragonDetail.no,
            uid: myDragonDetailState.detailPath == 2 ? '' : JSON.parse(getSession('user')).uid,
        }
        API.blindBox.skullProductSellHistory(params).then(res => {
            if (res.code == 0) {
                myDragonDetailState.saleHistoryList = res.data.list
                let pageInfo = {
                    pageSize: res.data.size,
                    currentPage: res.data.curPage,
                    total: res.data.total,
                    totalPages: res.data.totalPages,
                }
                myDragonDetailState.pageInfo = pageInfo
                initPage(pageInfo)
                loadingHandle(false)
            }

        })
    }


    const getDragonSkullState = (state) => {
        if (state == 1) {
            return 'low'
        } else if (state == 2) {
            return 'medium'
        } else if (state == 3) {
            return 'high'
        }
    }

    const getMaxNum = () => {
        myDragonDetailState.sellForm.quantity = myDragonDetailState.dragonDetail.usable
    }

    const getMaxNumBuy = () => {
        myDragonDetailState.dragonDetail.buySureInfo.quantity = myDragonDetailState.dragonDetail.skullProduct.overNum
        if (myDragonDetailState.dragonDetail.buySureInfo.quantity) {
            myDragonDetailState.dragonDetail.buySureInfo.fee = new Decimal(myDragonDetailState.dragonDetail.skullProduct.price * myDragonDetailState.dragonDetail.buySureInfo.quantity).mul(new Decimal(0.05))
            myDragonDetailState.dragonDetail.buySureInfo.total = new Decimal(myDragonDetailState.dragonDetail.buySureInfo.quantity).mul(new Decimal(myDragonDetailState.dragonDetail.skullProduct.price))
        } else {
            myDragonDetailState.dragonDetail.buySureInfo.fee = 0
            myDragonDetailState.dragonDetail.buySureInfo.total = 0
        }

    }

    const getMaxNumSend = () => {
        myDragonDetailState.sendForm.quantity = myDragonDetailState.dragonDetail.usable
    }


    // 龙骨数据链上封装
    const dragonSKullsHandleList = async() => {
        const contract = getDragonMainlandBoneContract()
        console.log('contract', contract)
        console.log('myDragonDetailState.dragonSkullContractList', myDragonDetailState.dragonSkullContractList)
        let address = await initWallet()
        let addresss = new Array(1).fill(address)
        let detailItem = myDragonDetailState.dragonSkullContractList.filter(item => {
            return myDragonDetailState.dragonDetail.id == item.id
        })
        console.log(detailItem)
        let detailItem1 = [BigNumber.from(detailItem[0].no.toString())]

        let params = {
            address: addresss,
            list: detailItem1
        }
        console.log('params', params)

        try {
            let contractRes = await contract.balanceOfBatch(params.address, params.list)
            console.log('contractRes', contractRes)
                // contractRes.map((item, index) => {
                //     myDragonDetailState.dragonSkullContractList[index].usable = item.toString()
                // })

            detailItem[0].usable = contractRes[0].toString()
            console.log(detailItem)
            return detailItem[0]


        } catch (error) {
            console.log(error)
        }
    }

    const goCreateSkull = () => {
        if (myDragonDetailState.dragonDetail.usable < 5) {
            return $message({
                type: 'warning',
                message: 'Your dragon skulls is less than 5',
                customClass: 'zZindex',
            })
        }
        router.push({ path: `/myMainland/skullSynthesis`, query: myDragonDetailState.dragonDetail });
    }




    return {
        myDragonDetailState,
        init,
        back,
        openDradonEgg,
        handleAnimation,
        sendDragon,
        closeBox,
        confirm,
        dragonAddressIsSameWalletAddress,
        upDragon,
        selectMethod,
        cancelSell,
        confirmSell,
        goMiningCamp,
        goParentDetail,
        approve,
        cancelListing,
        cancelOpt,
        sureCancel,
        buyMarketDragon,
        cancelBuyDetail,
        sureBuyDetail,
        approveDmsForMarket,
        inputSellFormPrice,
        inputSellFormQuantity,
        inputSellFormStartPrice,
        inputSellFormEndPrice,
        blurSellFormPrice,
        blurSellFormStartPrice,
        blurSellFormEndPrice,
        inputSellFormDays,
        selectTime,
        leftPage,
        rightPage,
        search,
        getDragonSkullState,
        inputSendFormQuantity,
        inputBuyFormQuantity,
        getMaxNum,
        getMaxNumBuy,
        goCreateSkull,
        getMaxNumSend,
    }
}