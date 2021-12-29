import { request } from '@/utils/axios'


// 龙-吞噬
let devouring = {

    //获取龙列表
    getAbleDevouringList: (data) => {
        return request({
            url: '/auth/game/hero/getUserHeros',
            method: 'post',
            data,
            noLoading: true
        })
    },

}

export default devouring