import { request } from '@/utils/axios'


// 交易市场
let blindBox = {
    //  往期配置列表
    getConfigs: (data) => {
        return request({
            url: '/auth/market/blind-config/getConfigs',
            method: 'post',
            data,

        })
    },

    // 获取当前期的配置
    getNowConfig: (data) => {
        return request({
            url: '/auth/market/blind-config/getNowConfig',
            method: 'post',
            data,
            noLoading: true,
        })
    },

    // 所有盲盒中标列表
    blindboxList: (data) => {
        return request({
            url: '/auth/market/user-blindbox-log/page',
            method: 'post',
            data,
            noLoading: true,
        })
    },

    // 用户盲盒未开列表
    blindboxListUserBoxs: (data) => {
        return request({
            url: '/auth/market/user-blindbox-log/userBoxs',
            method: 'post',
            data,
            noLoading: true,
        })
    },

    // 用户背包龙骨统计信息
    userSkullInfo: (data) => {
        return request({
            url: '/auth/market/user-blindbox-log/userSkullInfo',
            method: 'post',
            data,
            noLoading: true,
        })
    },

    // 龙骨操作记录
    skullProductActivites: (data) => {
        return request({
            url: '/auth/market/skullProduct/activites',
            method: 'post',
            data,
            noLoading: true,
        })
    },

    // 龙骨销售记录
    skullProductSellHistory: (data) => {
        return request({
            url: '/api/market/skullProduct/saleHistory',
            method: 'post',
            data,
            noLoading: true,
            noToken: true,
        })
    },

    // 上架龙骨商品交易
    skullProductUp: (data) => {
        return request({
            url: '/auth/market/skullProduct/skullProductUp',
            method: 'post',
            data,
            noLoading: true,
        })
    },

    // 上架龙骨商品交易回调
    skullProductUpCallback: (data) => {
        return request({
            url: '/auth/market/skullProduct/skullProductUpCallback',
            method: 'post',
            data,
            noLoading: true,
        })
    },

    // 背包龙骨列表未出售
    dragonSkullListNotSale: (data) => {
        return request({
            url: '/auth/walker/user-skull/page',
            method: 'post',
            data,
            noLoading: true,
        })
    },

    // 背包龙骨列表出售中
    dragonSkullListOnSale: (data) => {
        return request({
            url: '/auth/market/skullProduct/skullSaleList',
            method: 'post',
            data,
            noLoading: true,
        })
    },

    // 上架龙骨
    skullProductUp: (data) => {
        return request({
            url: '/auth/market/skullProduct/skullProductUp',
            method: 'post',
            data,
            noLoading: true,
        })
    },

    // 上下架，购买龙骨回调
    skullProductUpCallback: (data) => {
        return request({
            url: '/auth/market/skullProduct/skullProductUpCallback',
            method: 'post',
            data,
            noLoading: true,
        })
    },

    // 龙骨详情
    dragonSkullDetail: (data) => {
        return request({
            url: '/api/walker/user-skull/detail',
            method: 'post',
            data,
            noLoading: true,
        })
    },

    // 根据userID 查询用户详情
    getUserByUserId: (data) => {
        return request({
            url: '/api/user/userThirdLogin/uid',
            method: 'post',
            data,
            noLoading: true,
            noToken: true,
        })
    },


    // 根据ID 查询龙骨订单详情
    skullProductDetail: (data) => {
        return request({
            url: '/api/market/skullProduct/detail',
            method: 'post',
            data,
            // noLoading: true,
            noToken: true,
        })
    },

    // 龙骨操作记录
    skullsHistory: (data) => {
        return request({
            url: '/auth/market/skullProduct/skullHandleLogPage',
            method: 'post',
            data,
            noLoading: true,

        })
    },


    // 根盲盒操作记录
    blindBoxHistory: (data) => {
        return request({
            url: '/auth/market/blindbox-handle-log/list',
            method: 'post',
            data,
            noLoading: true,

        })
    },

    // 获取报名人数
    getBuyTotal: (data) => {
        return request({
            url: '/auth/market/blindbox-handle-log/getJoinNum',
            method: 'post',
            data,
            noLoading: true,
        })
    },

}
export default blindBox

