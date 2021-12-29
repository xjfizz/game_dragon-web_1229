import { request } from '@/utils/axios'


// 龙-繁殖
let breed = {

    //获取龙繁殖列表
    getAbleBreedList: (data) => {
        return request({
            url: '/auth/game/hero/getUserHeros',
            method: 'post',
            data,
            noLoading: true
        })
    },
    // 查询选择的龙是否可以繁殖
    isBreed: (data) => {
        return request({
            url: '/auth/market/breed-order/isBreed',
            method: 'post',
            data,
            noLoading: true
        })
    },
    // 繁殖-创建
    breedOrder: (data) => {
        return request({
            url: '/auth/market/breed-order/breedOrder',
            method: 'post',
            data,
            noLoading: true
        })
    },
    // 繁殖-取消
    breedOrderCancel: (data) => {
        return request({
            url: '/auth/market/breed-order/cancel',
            method: 'post',
            data,
            noLoading: true
        })
    },
    // 繁殖-回调
    breedOrderCallBack: (data) => {
        return request({
            url: '/auth/market/breed-order/callback',
            method: 'post',
            data,
            noLoading: true
        })
    },
}

export default breed

