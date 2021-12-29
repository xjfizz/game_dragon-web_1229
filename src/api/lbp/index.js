import { request } from '@/utils/axios'


// 质押背包
let lbp = {
    // 获取用户登录绑定的钱包地址信息
    getLbpList: (data) => {
        return request({
            proxyUrl: 'LBP',
            url: '/person',
            method: 'post',
            parsms: data,
            noLoading: true,
            noToken: true,
        })
    },

    getSwapList: (data) => {
        return request({
            proxyUrl: 'LBP',
            url: '/swap/list',
            method: 'get',
            params: data,
            noLoading: true,
            noToken: true,
        })
    },

    getSwapTotal: (data) => {
        return request({
            proxyUrl: 'LBP',
            url: '/swap/total',
            method: 'get',
            params: data,
            noLoading: true,
            noToken: true,
        })
    },


    getSwapPrice: (data) => {
        return request({
            proxyUrl: 'LBP',
            url: 'swap/price',
            method: 'get',
            params: data,
            noLoading: true,
            noToken: true,
        })
    },

    latestExchangeRate: (data) => {
        return request({
            proxyUrl: 'LBP',
            url: 'swap/rate',
            method: 'get',
            params: data,
            noLoading: true,
            noToken: true,
        })
    },

}
export default lbp

