import md5 from 'js-md5';
let encryptKey = 'VPWD7R5XQC'
let common = {
    goTopScroll: function() {
        let distance = document.documentElement.scrollTop || document.body.scrollTop; //获得当前高度
        let step = distance / 30; //每步的距离
        (function jump() {
            if (distance > 0) {
                distance -= step;
                window.scrollTo(0, distance);
                setTimeout(jump, 10);
            }
        })();
    },

    md5Encryption: function(data) { // 登录加密sign
        return new Promise((resolve, reject) => {
            let sign = data.nonce + data.pubAddr + encryptKey + data.timeStamp
            let md5Value = md5(sign) //6f43dd5db792acb25d6fe32f3dddac70
            resolve(md5Value)
        })
    },

    md5BuyDragon: function(data) { // buy dragon  sign
        return new Promise((resolve, reject) => {
            let key = 'X2lV0iejIMfx9sfaKm2WqFGoEY8'
            let sign = data.uid + data.contractAddress + data.timestamp + key
            let md5Value = md5(sign)
            resolve(md5Value)
        })
    },

    md5BuyImgCode: function(data) { // buy dragon img code  sign
        return new Promise((resolve, reject) => {
            let key = 'X2lV0iejIMfx9sfaKm2WqFGoEY8'
            let sign = data.code + data.contractAddress + data.timestamp + key
            let md5Value = md5(sign)
            resolve(md5Value)
        })
    },

    md5Exange: function(data) { // buy dragon img code  sign
        return new Promise((resolve, reject) => {
            let key = 'X2lV0iejIMfx9sfaKm2WqFGoEY8'
            let sign = data.contractAddress + data.timestamp + key
            let md5Value = md5(sign)
            resolve(md5Value)
        })
    },

    formatValue: function(data, key) {
        //  return parseFloat(String(data).replace(`/^(.*\..{${key}}).*$/`, "$1"))
        return data ? (Number(data)).toFixed(key) : 0
    },

    formatValue4: function(data) {
        return parseFloat(String(data).replace(/^(.*\..{4}).*$/, "$1"))
    },
    formatValue2: function(data) {
        // return parseFloat(String(data).replace(/^(.*\..{2}).*$/, "$1"))
        return data.toFixed(2)
    },

    formatValueQian: function(num) {
        let res = parseFloat(String(num).replace(/^(.*\..{2}).*$/, "$1"))

        res += '';
        if (!res.includes('.')) res += '.';
        let res1 = res.replace(/(\d)(?=(\d{3})+\.)/g, function($0, $1) {
            return $1 + ',';
        }).replace(/\.$/, '');


        return res1
    },

    formatTimeAdd: function(date, addNum) {
        let time = new Date(date).getTime() + (1000 * 60 * 60 * 24 * addNum)

        return time
    },
    trimRightAndLeft: function(data) { // 去除左右空格
        return data.replace(/(^\s*)|(\s*$)/g, "");
    },

    formatAddress: function(data) { // 地址格式化
        return (data.substring(0, 6) +
            "****" +
            data.substring(
                data.length - 6,
                data.length
            ) || 0)
    },
    formatAddress2: function(data) { // 地址格式化
        return (data.substring(0, 6) +
            "***" +
            data.substring(
                data.length - 4,
                data.length
            ) || 0)
    },
    formatText: function(data) { // 文字格式化
        let text = data.replace(/&/, ',')
        return text
    }



}
export default common