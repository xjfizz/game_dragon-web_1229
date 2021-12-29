/* 龙部分逻辑处理 */

// 导入配置功能

import { reactive, onMounted, watch, toRefs, onBeforeUnmount, inject, getCurrentInstance, toRaw, nextTick, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { getStorage, setCookie, setSession, getSession } from "@/utils/auth.js";
import { initWallet, myWallet, transferAccounts, getContract, getSendDragonContract, getMarketContract, getBuyMarketContract, getBuyMarketContractV2, getDragonMainlandShardsTokenContract, getBalanceHandle, setApprovalForAll, isApprovedForAll, isApproved, approved, getDragonBoneAbsorbContract } from "@/utils/metaMask/ethers.js";
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


const eggToDragon = ref(null);



// 初始化数据
const myDragonDetailState = reactive({
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
    },
    myAddress: null,
    dragonAddress: null,
    dragonLocalTypeName: dragonLocalTypeName,
    dragonDetail: {
        countDownTime: [],
        clazz: 1
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
        walletAddress: null
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
    absorptionRecordList: [], // 吸收历史记录
    takeInPageInfo: {
        pageSize: 6,
        currentPage: 1,
        total: 0,
        totalPages: 0,
    },
    absorptionTime: 0, // 龙骨吸收次数
    tipList: [
        { text: ['Gift'], show: false },
        { text: ['Breed'], show: false },
        { text: ['Absorption'], show: false },
        { text: ['Devouring'], show: false },
        { text: ['Talent'], show: false },
    ],
    isWaitOrder: 0, // 0 无 1 吸收， 2 吞噬， 3 吸收/吞噬

});





export default function myDragonDetail() {

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

    }


    const init = async() => {
        loadingHandle(false)
        myDragonDetailState.isStartDragon = false
        myDragonDetailState.takeInPageInfo.currentPage = 1
        console.log('router', router)
        console.log('router', route)
        myDragonDetailState.dragonDetail.id = route.params.id
        myDragonDetail()
            // await dragonAddressIsSameWalletAddress()
    }

    const initSellForm = () => {
        myDragonDetailState.sellBoxshow = false
        myDragonDetailState.sellForm = {
            type: 1,
            price: 0,
            startPrice: 0,
            endPrice: 0,
            days: 0,
        }
    }



    const myDragonDetail = () => {
        let params = {
            id: myDragonDetailState.dragonDetail.id
        }
        API.myMainland.dragonDetail(params).then(async res => {
            if (res.code == 0) {
                myDragonDetailState.dragonDetail = res.data
                await dragonAddressIsSameWalletAddress()
                if (myDragonDetailState.dragonDetail.no > 10000) {

                    myDragonDetailState.dragonDetail.hatchTime = new Date(myDragonDetailState.dragonDetail.createTime).getTime() + 3 * 24 * 60 * 60 * 1000 // ID  大于10000 3天
                } else {
                    myDragonDetailState.dragonDetail.hatchTime = new Date(myDragonDetailState.dragonDetail.createTime).getTime() + 7 * 24 * 60 * 60 * 1000 // ID  小于等于10000 7天
                }
                console.log('myDragonDetailState.dragonList', myDragonDetailState.dragonDetail)

                myDragonDetailState.dragonDetail.countDownTime = ['00', '00', '00', '00']
                let nowTime = await getNowTime()
                if (myDragonDetailState.dragonDetail.restEndTime && myDragonDetailState.dragonDetail.restEndTime >= nowTime) {
                    myDragonDetailState.dragonDetail.isCool = true
                }
                countDown()
                if (myDragonDetailState.dragonDetail.lockStatus == 3) { // getProductDetail
                    myDragonDetailState.dragonDetail.productDetail = await getProductDetail(res.data.sale)
                    if (myDragonDetailState.dragonDetail.productDetail.heroProduct.saleType == 2) {
                        //  myDragonDetailState.dragonDetail.productDetail.heroProduct.price =201
                        let price = myDragonDetailState.dragonDetail.productDetail.heroProduct.price
                        let start = myDragonDetailState.dragonDetail.productDetail.heroProduct.auctionHighestPrice
                        let end = myDragonDetailState.dragonDetail.productDetail.heroProduct.auctionLowestPrice
                        if (price >= start) {
                            myDragonDetailState.dragonDetail.productDetail.timeProgress = '100%'
                        } else if (price <= end) {
                            myDragonDetailState.dragonDetail.productDetail.timeProgress = '0%'
                        } else {
                            let value1 = new Decimal(price).sub(new Decimal(end))
                            let value2 = new Decimal(start).sub(new Decimal(end))
                            myDragonDetailState.dragonDetail.productDetail.timeProgress = (new Decimal(new Decimal(value1).div(new Decimal(value2))).mul(new Decimal(100))) + '%'
                        }
                    }

                    myDragonDetailState.dragonDetail.buySureInfo = {
                        amount: myDragonDetailState.dragonDetail.productDetail.heroProduct.price,
                        fee: new Decimal(myDragonDetailState.dragonDetail.productDetail.heroProduct.price).mul(new Decimal(0.05)),
                        total: new Decimal(myDragonDetailState.dragonDetail.productDetail.heroProduct.price).mul(new Decimal(1)),
                    }
                }
                // 获取家庭
                if (res.data.father) {
                    myDragonDetailState.dragonDetail.fatherDetail = await myDragonDetailParent(res.data.father)
                }
                if (res.data.mother) {
                    myDragonDetailState.dragonDetail.motherDetail = await myDragonDetailParent(res.data.mother)
                }
                myDragonDetailState.dragonDetail.familyIds = await myDragonDetailChildren(res.data.id)
                if (myDragonDetailState.dragonDetail.familyIds.childIds && myDragonDetailState.dragonDetail.familyIds.childIds.length > 0) {
                    let res = await myDragonDetailChildrenList(myDragonDetailState.dragonDetail.familyIds.childIds)
                    myDragonDetailState.dragonDetail.family = res
                }
                getAbsorptionRecord()
                await getAbsorptionTime()



            } else {
                $message.warning(t(`message['${res.i18n}']`));
            }
        })
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
            //  myDragonDetail()
        init()
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
    }
    const confirm = async() => {
        console.log(myDragonDetailState.dragonDetail)
        if (myDragonDetailState.dragonDetail.lockStatus != 0) {
            return $message({
                type: 'warning',
                message: 'Your dragon is locked, please try again in 3 minutes',
                customClass: 'zZindex',
            })
        }
        console.log('myDragonDetailState.sendForm.walletAddress', ethers.utils.isAddress(myDragonDetailState.sendForm.walletAddress))
        if (!ethers.utils.isAddress(myDragonDetailState.sendForm.walletAddress)) {
            return $message({
                type: 'warning',
                message: t(`message['receive.not.address']`),
                customClass: 'zZindex',
            })
        }


        const contract = getSendDragonContract()
        let params = {
            tokenId: BigNumber.from(myDragonDetailState.dragonDetail.no.toString()),

        }
        const tx = await contract.functions["ownerOf(uint256)"](params.tokenId);
        console.log('tx', tx[0], myDragonDetailState.myAddress)
        if ((tx[0]).toLowerCase() != myDragonDetailState.myAddress) {
            return $message({
                type: 'warning',
                message: t(`message['addressNotSamemyAddress']`),
                customClass: 'zZindex',
            })
        }


        sendDragonApi()
    }
    const sendDragonApi = async() => {
        // const balance = await myWallet()
        // if (0 > (new Decimal(balance).sub(new Decimal(0.005))).toNumber()) {
        //     return $message({
        //         type: 'warning',
        //         message: 'Sorry, your BNB is not enough'
        //     })
        // }
        myDragonDetailState.sendLoading = true
        let params = {
            heroId: myDragonDetailState.dragonDetail.id,
            recvAddress: myDragonDetailState.sendForm.walletAddress
        }
        API.myMainland.sendDragonEgg(params).then(res => {
            if (res.code == 0) {
                sendDragonContract(res.data)
            } else {
                myDragonDetailState.sendLoading = false
                $message({
                    type: 'warning',
                    message: t(`message['${res.i18n}']`),
                    customClass: 'zZindex',
                })
            }
        })
    }

    const sendDragonContract = async(data) => {
        const contract = getSendDragonContract()
        let params = {
            from: data.sendAddr,
            to: data.recvAddr,
            tokenId: BigNumber.from(data.heroNo.toString()),

        }
        console.log('getSendDragonContract', params)


        try {
            const tx = await contract.functions["safeTransferFrom(address,address,uint256)"](params.from, params.to, params.tokenId);
            console.log('tx', tx)
            if (tx) {
                let data1 = {
                    id: data.id,
                    transHash: tx.hash,
                }
                sendDragonApiCallBack(data1, tx)
            }
        } catch (error) {
            console.log('error', error)
            myDragonDetailState.sendLoading = false
            $message({
                type: 'warning',
                message: t(`message['${error.message}']`),
                customClass: 'zZindex',
            })
            let cancelParams = {
                id: data.id,
            }
            API.myMainland.sendDragonEggCancel(cancelParams).then(res => {

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
        let receipt = await contract.wait()
        console.log('receipt', receipt)
        await getBalanceHandle()
        myDragonDetailState.sendLoading = false
        myDragonDetailState.sendDragonShow = false
        $message.success('success');
        router.back()
    }

    const dragonAddressIsSameWalletAddress = async() => {
        let params = {
            heroId: myDragonDetailState.dragonDetail.id
        }
        let res = await API.myMainland.GetWalletAddressByID(params)
        if (res.code == 0) {
            myDragonDetailState.myAddress = res.data.ownerAddress
            myDragonDetailState.dragonAddress = await initWallet()
        } else {
            $message.warning(t(`message['${res.i18n}']`));
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
                heroId: myDragonDetailState.dragonDetail.id,
                saleType: myDragonDetailState.sellForm.type, // 1固定价格，2 拍卖,
                price: myDragonDetailState.sellForm.price,
                // auctionHighestPrice:0, // 开始价格
                // auctionLowestPrice:0, // 结束价格
                // auctionDays: 0, // 拍卖时间
                type: 1 // 1 上架 2 下架 3 购买
            }
        } else {
            params = {
                heroId: myDragonDetailState.dragonDetail.id,
                saleType: myDragonDetailState.sellForm.type, // 1固定价格，2 拍卖,
                auctionHighestPrice: myDragonDetailState.sellForm.startPrice, // 开始价格
                auctionLowestPrice: myDragonDetailState.sellForm.endPrice, // 结束价格
                auctionDays: myDragonDetailState.sellForm.days, // 拍卖时间
                type: 1 // 1 上架 2 下架 3 购买
            }
        }


        API.myMainland.productUp(params).then(res => {
            if (res.code == 0) {
                getMarketContractHandle(res.data)

            } else {
                loadingHandle(false)
                $message({
                    type: 'warning',
                    message: t(`message['${res.i18n}']`),
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
        const contract = getBuyMarketContractV2()
        console.log('contract', contract)
        console.log('data', data)
        let params = {
            tokenId: BigNumber.from(data.heroProduct.heroNo.toString()),
            price: ethers.utils.parseEther(data.heroProduct.price.toString()),
            exType: data.heroProduct.saleType, // BigNumber.from(data.heroNo.toString()),
            minPrice: data.heroProduct.saleType == 2 ? ethers.utils.parseEther(data.heroProduct.auctionLowestPrice.toString()) : ethers.utils.parseEther((0).toString()),
            maxPrice: data.heroProduct.saleType == 2 ? ethers.utils.parseEther(data.heroProduct.auctionHighestPrice.toString()) : ethers.utils.parseEther((0).toString()),
            timeHours: data.heroProduct.saleType == 2 ? BigNumber.from(data.heroProduct.auctionHour.toString()) : BigNumber.from((0).toString()),
        }
        console.log('getSendDragonContract', params)


        try {
            const tx = await contract.addMarket(params.tokenId, params.price, params.exType, params.minPrice, params.maxPrice, params.timeHours);
            console.log('tx', tx)
            if (tx) {
                let data1 = {
                    id: data.heroProduct.id,
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
        API.myMainland.upProductCallback(params).then(res => {
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
        if (item.status == -1) return
        router.push({ path: `/myMainland/myDragonDetail/${item.id}` })

    }

    const checkApprove = async() => {
        loadingHandle(true, 'Authorisation for testing in progress...')
        const contract = getSendDragonContract()
            // const contractAddress = getBuyMarketContract()
        const contractAddress = getBuyMarketContractV2()
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
        const contract = getSendDragonContract()
            // const contractAddress = getBuyMarketContract()
        const contractAddress = getBuyMarketContractV2()
        let address = await initWallet()
        let params = {
            key: contract,
            bool: true,
            contractAddress: contractAddress.address,
        }
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
                //  address:  address,
                tokenId: BigNumber.from(myDragonDetailState.dragonDetail.no.toString()),
                orderId: myDragonDetailState.dragonDetail.productDetail.heroProduct.orderId ? BigNumber.from(myDragonDetailState.dragonDetail.productDetail.heroProduct.orderId.toString()) : '',

            }
            console.log('params', params)


            /*  Todo */
            const contract = myDragonDetailState.dragonDetail.productDetail.heroProduct.orderId ? getBuyMarketContractV2() : getBuyMarketContract()
            console.log('contract', contract)
            try {
                let contractBuyRes = null
                if (myDragonDetailState.dragonDetail.productDetail.heroProduct.orderId) {
                    contractBuyRes = await contract.removeMarket(params.tokenId, params.orderId)
                } else {
                    contractBuyRes = await contract.removeMarket(params.tokenId)
                }

                if (contractBuyRes && contractBuyRes.hash) {
                    let data1 = {
                        id: myDragonDetailState.dragonDetail.productDetail.heroProduct.id,
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
        API.myMainland.upProductCallback(params).then(res => {
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
            let timestamp = new Date().getTime()
            console.log(myDragonDetailState.dragonDetail.buySureInfo)
            let params = {
                tokenId: BigNumber.from(myDragonDetailState.dragonDetail.no.toString()),
                orderId: myDragonDetailState.dragonDetail.productDetail.heroProduct.orderId ? BigNumber.from(myDragonDetailState.dragonDetail.productDetail.heroProduct.orderId.toString()) : ''
                    // price: ethers.utils.parseEther(myDragonDetailState.dragonDetail.buySureInfo.amount.toString()),
                    // timestamp: BigNumber.from(timestamp),

            }
            console.log('params', params)


            /*  Todo */
            const contract = myDragonDetailState.dragonDetail.productDetail.heroProduct.orderId ? getBuyMarketContractV2() : getBuyMarketContract()
            console.log('contract', contract)
            try {

                let contractBuyRes = null
                if (myDragonDetailState.dragonDetail.productDetail.heroProduct.orderId) {
                    contractBuyRes = await contract.exchange(params.tokenId, params.orderId)
                } else {
                    contractBuyRes = await contract.exchange(params.tokenId)
                }

                if (contractBuyRes && contractBuyRes.hash) {
                    let data1 = {
                        id: myDragonDetailState.dragonDetail.productDetail.heroProduct.id,
                        transHash: contractBuyRes.hash,
                    }

                    await buyDragonsAPiCallBack(data1, contractBuyRes)
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
                message: 'buy success',
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
        const contractAddress = myDragonDetailState.dragonDetail.productDetail.heroProduct.orderId ? getBuyMarketContractV2() : getBuyMarketContract()
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
        const contractAddress = myDragonDetailState.dragonDetail.productDetail.heroProduct.orderId ? getBuyMarketContractV2() : getBuyMarketContract()

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
        // var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
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
            API.myMainland.productDetail(params).then(res => {
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
    const getSkillItemBac = (state) => {
        return require(`@/assets/imgs/myMainland/dragonDetail/skill/skill-card/item-bc${state}.png`);
    }

    const getSkillItemNumBac = () => {
        return require(`@/assets/imgs/myMainland/dragonDetail/skill/skill-card/num-bc.png`);
    }

    const getSkillItemMidBac = (clazz, name) => {
        return require(`@/assets/imgs/myMainland/dragonDetail/skill/skill-card/skill/${getSkillItemMidBacHandle(clazz)}/${name}.png`);
    }

    const getSkillItemMidBacHandle = (state) => {
        if (state == 1) {
            return 'water'
        } else if (state == 2) {
            return 'fire'
        } else if (state == 3) {
            return 'rock'
        } else if (state == 4) {
            return 'storm'
        } else if (state == 5) {
            return 'thunder'
        }
    }

    const getSkillItemAttack = (state) => {
        return require(`@/assets/imgs/myMainland/dragonDetail/skill/skill-card/attack${state}.png`);
    }

    const getSkillItemAttackIcon = () => {
        return require(`@/assets/imgs/myMainland/dragonDetail/skill/skill-card/attack.png`);
    }

    const getSkillItemDefenceIcon = () => {
        return require(`@/assets/imgs/myMainland/dragonDetail/skill/skill-card/defence.png`);
    }

    const getAbsorptionRecord = () => {
        let params = {
            //  heroNo: myDragonDetailState.dragonDetail.no,
            no: myDragonDetailState.dragonDetail.no,
            limit: myDragonDetailState.takeInPageInfo.pageSize,
            page: myDragonDetailState.takeInPageInfo.currentPage,
        }
        API.myMainland.getHeroDevelopHistory(params).then(async res => { // getHeroDevelopHistory getHeroSkullAbsorbHistory
            if (res.code == 0) {
                myDragonDetailState.absorptionRecordList = res.data.list
                let pageInfo = {
                    pageSize: res.data.size,
                    currentPage: res.data.curPage,
                    total: res.data.total,
                    totalPages: res.data.totalPages,
                }
                myDragonDetailState.takeInPageInfo = pageInfo
                initPage(pageInfo)
                loadingHandle(false)
                let res1 = await getAbsorptionWaitOrder()
                let res2 = await getDevouringWaitOrder()
                if ((res1.length > 0 && res1[0].status == 1) && !res2) {
                    myDragonDetailState.isWaitOrder = 1
                } else if ((res1.length > 0 && res1[0].status == 1) && res2) {
                    myDragonDetailState.isWaitOrder = 3
                } else if (!(res1.length > 0 && res1[0].status == 1) && !res2) {
                    myDragonDetailState.isWaitOrder = 0
                } else if (!(res1.length > 0 && res1[0].status == 1) && res2) {
                    myDragonDetailState.isWaitOrder = 2
                } else {
                    myDragonDetailState.isWaitOrder = 0
                }
            }
        })
    }

    //  待吞噬-订单
    const getDevouringWaitOrder = async() => {
        return new Promise((resolve, reject) => {
            let params = {
                heroNo: myDragonDetailState.dragonDetail.no,
            }
            API.myMainland.getDevourDragonHistory(params).then(res => {
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

    //  待吸收-订单
    const getAbsorptionWaitOrder = async() => {
        return new Promise((resolve, reject) => {
            let params = {
                heroNo: myDragonDetailState.dragonDetail.no,
                limit: myDragonDetailState.takeInPageInfo.pageSize,
                page: myDragonDetailState.takeInPageInfo.currentPage,
            }
            API.myMainland.getHeroSkullAbsorbHistory(params).then(res => {
                if (res.code == 0) {
                    if (res.data) {
                        resolve(res.data.list)
                    }
                }
            })
        })
    }

    const absorbedTypeImg = (type) => {
        let list = {
            1: 'heatthy',
            2: 'attack',
            3: 'defense',
            4: 'speed',
            5: 'spirit',
        }
        return require(`@/assets/imgs/myMainland/stats/${list[type]}.png`)

    }

    const getAbsorptionTime = async() => {
        let params = {
            dragonNo: BigNumber.from(myDragonDetailState.dragonDetail.no),
        }
        console.log('params', params)


        /*  Todo */
        const contract = getDragonBoneAbsorbContract()
        console.log('contract', contract)
        try {
            let contractBuyRes = await contract.absorbCount(params.dragonNo)
            myDragonDetailState.absorptionTime = contractBuyRes.toNumber()
        } catch (error) {
            console.log(error)
        }



    }

    const takeInLeftPage = () => {
        if (myDragonDetailState.takeInPageInfo.currentPage <= 1) {
            return
        }
        myDragonDetailState.takeInPageInfo.currentPage--
            getAbsorptionRecord()
    }

    const takeInRightPage = () => {
        if (myDragonDetailState.takeInPageInfo.currentPage >= myDragonDetailState.takeInPageInfo.totalPages) {
            return
        }
        myDragonDetailState.takeInPageInfo.currentPage++
            getAbsorptionRecord()
    }

    const takeInSearch = (data) => {
        myDragonDetailState.takeInPageInfo.currentPage = Number(data)
        getAbsorptionRecord()
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
        inputSellFormStartPrice,
        inputSellFormEndPrice,
        blurSellFormPrice,
        blurSellFormStartPrice,
        blurSellFormEndPrice,
        inputSellFormDays,
        selectTime,
        getSkillItemBac,
        getSkillItemNumBac,
        getSkillItemMidBac,
        getSkillItemAttack,
        getSkillItemAttackIcon,
        getSkillItemDefenceIcon,
        absorbedTypeImg,
        takeInLeftPage,
        takeInRightPage,
        takeInSearch,
    }
}