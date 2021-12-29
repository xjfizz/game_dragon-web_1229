import { request } from '@/utils/axios'


// 我的背包
let myMainland = {

    // 通过ID 数组查询龙列表
    getHeroByIds: (data) => {
        return request({
            url: '/api/game/hero/ids',
            method: 'post',
            data,
            noToken: true,
            noLoading: true
        })
    },

    // 获取背包龙蛋列表
    myDragonEgg: (data) => {
        return request({
            // url: '/auth/game/hero/my',
            url: '/auth/game/hero/getMyHeroByPage',
            method: 'post',
            data,
            // noToken: true,

        })
    },
    // 龙蛋孵化
    dragonEggHatch: (data) => {
        return request({
            url: '/auth/market/order/hatch',
            method: 'post',
            data,
            // noToken: true,
            noLoading: true
        })
    },
    // 龙蛋孵化支付
    hatchPayment: (data) => {
        return request({
            url: '/auth/market/order/hatchPayment',
            method: 'post',
            data,
            noLoading: true
        })
    },

    // 龙详情
    dragonDetail: (data) => {
        return request({
            url: '/api/game/hero/detail',
            method: 'post',
            data,
            // noLoading: true,
            // noToken: true,
        })
    },

    // 龙详情-查询父母孩子
    getHeroFamily: (data) => {
        return request({
            url: '/api/game/hero/getHeroFamily',
            method: 'post',
            data,
            noToken: true,
            noLoading: true,
        })
    },


    // 获取龙蛋信息
    getDragonEggDetailByHeroId: (data) => {
        return request({
            // url: '/api/game/hero/getHeroDetailByNoOrHeroId',
            url: '/api/game/hero/getHeroDetailByNo',
            method: 'post',
            data,
            noLoading: true
        })
    },

    // 根据龙蛋ID 查询 绑定的钱包地址
    GetWalletAddressByID: (data) => {
        return request({
            url: '/api/game/hero/getHeroOwnerAddress', // /api/game/hero/getHeroOwnerAddress
            method: 'post',
            data,
            noLoading: true,
            noToken: true,
        })
    },

    // 孵化上传图片
    hatchDragon: (formData, params) => {
        return request({
            url: '/auth/game/hero-extra/data',
            method: 'post',
            data: formData,
            params: params,
            noLoading: true
        })
    },
    // 赠送龙蛋
    sendDragonEgg: (data) => {
        return request({
            url: '/auth/market/order/heroSend',
            method: 'post',
            data,
            noLoading: true
        })
    },
    // 赠送龙蛋-取消
    sendDragonEggCancel: (data) => {
        return request({
            url: '/auth/market/order/heroSendCancel',
            method: 'post',
            data,
            noLoading: true
        })
    },

    // 获取龙蛋信息
    sendDragonEggCallBack: (data) => {
        return request({
            url: '/auth/market/order/heroSendCallback',
            method: 'post',
            data,
            noLoading: true
        })
    },

    // 龙上架
    productUp: (data) => {
        return request({
            url: '/auth/market/heroProduct/productUp',
            method: 'post',
            data,
            noLoading: true
        })
    },

    // // 龙下架
    // productDown: (data) => {
    //     return request({
    //         url: '/auth/market/product/productDown',
    //         method: 'post',
    //         data,
    //         noLoading: true
    //     })
    // },

    // 龙上架回调
    upProductCallback: (data) => {
        return request({
            url: '/auth/market/heroProduct/productUpCallback',
            method: 'post',
            data,
            noLoading: true
        })
    },

    // 兑换龙蛋预购
    presaleExchange: (data) => {
        return request({
            url: '/auth/market/presale/exchange',
            method: 'post',
            data,
            noLoading: true
        })
    },

    // 获取用户当前的dmp
    userCoinTotal: (data) => {
        return request({
            url: '/auth/game/user-coin/total',
            method: 'post',
            data,
            noLoading: true
        })
    },

    // 获取用户当前的dmp列表
    userCoinList: (data) => {
        return request({
            url: '/auth/game/user-coin/page',
            method: 'post',
            data,
            noLoading: true
        })
    },


    //提现生成订单
    withdrawCreate: (data) => {
        return request({
            url: '/auth/market/withdraw-coin-order/withdraw',
            method: 'post',
            data,
            noLoading: true
        })
    },




    //提现取消
    withdrawCancel: (data) => {
        return request({
            url: '/auth/market/withdraw-coin-order/cancel',
            method: 'post',
            data,
            noLoading: true
        })
    },

    //提现回调
    withdrawCallBack: (data) => {
        return request({
            url: '/auth/market/withdraw-coin-order/callback',
            method: 'post',
            data,
            noLoading: true
        })
    },

    //提现详情
    withdrawInfoDetail: (data) => {
        return request({
            url: '/auth/market/withdraw-coin-order/withdrawInfo',
            method: 'post',
            data,
            noLoading: true
        })
    },



    //查询出售中的商品详情
    productDetail: (data) => {
        return request({
            url: '/api/market/product/detail',
            method: 'post',
            data,
            noLoading: true,
            noToken: true,
        })
    },


    //查询出售中的商品操作记录
    activitesHistory: (data) => {
        return request({
            url: '/auth/market/heroProduct/activites',
            method: 'post',
            data,
            noLoading: true
        })
    },

    //获取龙骨合成结果
    getDragonSkullsResult: (data) => {
        return request({
            url: '/auth/market/skull/dragonBoneCompoundResult',
            method: 'post',
            data,
            noLoading: true
        })
    },

    //获取龙骨吸收记录
    getHeroSkullAbsorbHistory: (data) => {
        return request({
            url: '/api/walker/user-skull/getHeroSkullAbsorbHistory',
            method: 'post',
            data,
            noLoading: true,
            noToken: true,
        })
    },

    //获取龙骨吸收签名
    getSkullAbsorbSign: (data) => {
        return request({
            url: '/auth/walker/user-skull/getSkullAbsorbSign',
            method: 'post',
            data,
            noLoading: true,
        })
    },

    //获取龙骨吸收记录
    getSkullAbsorbResult: (data) => {
        return request({
            url: '/auth/walker/user-skull/getSkullAbsorbResult',
            method: 'post',
            data,
            noLoading: true,
        })
    },

    //获取龙骨操作记录
    getHeroDevelopHistory: (data) => {
        return request({
            url: '/api/game/hero/getHeroDevelopHistory',
            method: 'post',
            data,
            noLoading: true,
            noToken: true,
        })
    },

    //获取未完成吞噬你记录
    getDevourDragonHistory: (data) => {
        return request({
            url: '/api/game/hero/getDevourDragonHistory',
            method: 'post',
            data,
            noLoading: true,
            noToken: true,
        })
    },

    //吞噬生成订单
    createDevouringOrder: (data) => {
        return request({
            url: '/auth/game/hero/getDevourConfirmSign',
            method: 'post',
            data,
            noLoading: true,
        })
    },
    //天赋升级订单
    getTalentUpgradeSign: (data) => {
        return request({
            url: '/auth/game/hero/getTalentUpgradeSign',
            method: 'post',
            data,
            noLoading: true,
        })
    },







}
export default myMainland