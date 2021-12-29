import { request } from '@/utils/axios'


// 我的背包
let luckDraw = {
    // 是否可以抽奖
    isLottery: (data) => {
        return request({
            url: '/auth/market/lottery-act/isLottery',
            method: 'post',
            data,
            noLoading: true
        })

    },

    // 抽奖
    lottery: (data) => {
        return request({
            url: '/auth/market/lottery-act/lottery',
            method: 'post',
            data,
            noLoading: true
        })

    },

    // 获取抽奖结果
    getLottery: (data) => {
        return request({
            url: '/auth/market/lottery-act/getLottery',
            method: 'post',
            data,
            noLoading: true
        })

    },

    // 获取抽奖滚屏列表
    getLuckList: (data) => {
        return request({
            url: '/auth/market/lottery-act/list',
            method: 'post',
            data,
            noLoading: true
        })

    },






}
export default luckDraw