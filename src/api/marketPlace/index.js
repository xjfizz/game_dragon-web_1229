import { request } from '@/utils/axios'


// 交易市场
let marketPlace = {
    // 获取交易市场列表
    marketPlaceList: (data) => {
        return request({
            url: '/api/market/product/page',
            method: 'post',
            data,
            noToken: true,
        })
    },
    // 获取龙骨交易市场列表
    dragonSkullmarketPlaceList: (data) => {
        return request({
            url: '/api/market/skullProduct/page',
            method: 'post',
            data,
            noToken: true,
        })
    },

    // 获取龙骨交易市场列表总数
    dragonSkullmarketPlaceListTotal: (data) => {
        return request({
            url: '/api/market/skullProduct/skullCount',
            method: 'post',
            data,
            noToken: true,
        })
    },

    // 部位模糊搜索
    partSearch: (data) => {
        return request({
            url: '/api/market/product/partSearch',
            method: 'post',
            data,
            noToken: true,
            noLoading: true,
        })
    },
    // 部位搜索推荐
    partSearchRecommend: (data) => {
        return request({
            url: '/api/market/product/partSearchRecommend',
            method: 'post',
            data,
            noToken: true,
            noLoading: true,
        })
    },
}
export default marketPlace

