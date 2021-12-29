import { ethers, BigNumber } from "ethers";
// import { Message } from "element-ui";
import { ElMessage } from "element-plus";
import transform from "lodash.transform";
// import preSaleDragonEggJson from './PreSaleDragonEggV1.json'
import preSaleDragonEggJson from "./dragonJson/PreSaleDragonEgg.json"; // 预购
import DragonMainlandToken from "./dragonJson/DragonMainlandToken.json"; // 龙合约
import DragonExchange from "./dragonJson/DragonExchange.json"; // 繁殖-交易
import DragonExchange_market from "./dragonJson/DragonExchange_market.json"; // 市场-交易
import DragonExchange_market_v2 from "./dragonJson/DragonExchange_market_v2.json"; // 市场-交易-new
import DragonMainlandVoucher from "./dragonJson/DragonMainlandVoucher.json"; // 兑换
import DragonMainlandShardIDO from "./dragonJson/DragonMainlandShardIDO.json"; // IDO报名
import DragonStaking from "./dragonJson/DragonStaking.json"; // 质押
import BPool from "./dragonJson/BPool.json"; // lbp-bpool
import ConfigurableRightsPool from "./dragonJson/ConfigurableRightsPool.json"; // lbp-右滑阀
import IERC20_sol_IERC20 from "./dragonJson/IERC20_sol_IERC20.json"; // lbp授权
import DragonMiraclePotionToken from "./dragonJson/DragonMiraclePotionToken.json"; // 提现
import DragonMainlandShardsToken from "./dragonJson/DragonMainlandShardsToken.json"; // DMS
import tokenMoney from "./dragonJson/tokenMoney.json"; // lbp-右滑阀
import DragonBlindbox from "./dragonJson/DragonBlindbox.json"; // 宝箱合约
import DragonMainlandBone from "./dragonJson/DragonMainlandBone.json"; // 龙骨合约
import DragonBoneCompound from "./dragonJson/DragonBoneCompound.json"; // 龙骨合成合约
import DragonBoneAbsorb from "./dragonJson/DragonBoneAbsorb.json"; // 龙骨吸收合约
import DragonDevour from "./dragonJson/DragonDevour.json"; // 龙骨吞噬合约
import DragonBoneExchange from "./dragonJson/DragonBoneExchange.json"; // 龙骨交易-合约
import { getSession, removeSession } from "@/utils/auth.js";
import store from "@/store";
import router from "@/router";

// const store = useStore();
function getProvider() {
    let provider = new ethers.providers.Web3Provider(window.ethereum);
    return provider;
}

// 获取钱包余额
async function myWallet() {
    let banlance = await getProvider().getBalance(getSession("address"));
    let balanceFormat = ethers.utils.formatEther(banlance);
    return balanceFormat;
}

// 钱包交易转账
function transferAccounts() {
    let getSigner = getProvider().getSigner();
    const tx = getSigner.sendTransaction({
        to: "0xD305B9Aa6dA059Ee4c80CE0B0f6EEa85B622bE7F",
        value: ethers.utils.parseEther("0.01"),
    });
    return tx;
}

// 获取签名
function getSiner(txt) {
    let getSigner = getProvider().getSigner();
    let signer = getSigner.signMessage(txt);
    return signer;
}

/*  合约方法-start */

// 获取预售合约
function getContract() {
    console.log("=======preSaleDragonEggJson======", window.ethereum);
    if (!window.ethereum.selectedAddress) {
        return initWallet;
    }
    let abi = preSaleDragonEggJson.abi;
    // let provider = getProvider();
    let wallet = getProvider().getSigner();
    // 地址来自上面部署的合约
    let contractAddress =
        process.env.NODE_ENV === "production" ?
        preSaleDragonEggJson.address_prod :
        preSaleDragonEggJson.address;
    // 使用Provider 连接合约，将只有对合约的可读权限
    let contract = new ethers.Contract(contractAddress, abi, wallet);
    return contract;
}

// 获取赠送龙蛋合约
function getSendDragonContract() {
    if (!window.ethereum.selectedAddress) {
        return initWallet;
    }
    let abi = DragonMainlandToken.abi;
    let wallet = getProvider().getSigner();
    // 地址来自上面部署的合约
    let contractAddress =
        process.env.NODE_ENV === "production" ?
        DragonMainlandToken.address_prod :
        DragonMainlandToken.address;
    // 使用Provider 连接合约，将只有对合约的可读权限
    let contract = new ethers.Contract(contractAddress, abi, wallet);
    return contract;
}

// 获取繁殖市场合约
function getMarketContract() {
    if (!window.ethereum.selectedAddress) {
        return initWallet;
    }
    let abi = DragonExchange.abi;
    let wallet = getProvider().getSigner();
    // 地址来自上面部署的合约
    let contractAddress =
        process.env.NODE_ENV === "production" ?
        DragonExchange.address_prod :
        DragonExchange.address;
    // 使用Provider 连接合约，将只有对合约的可读权限
    let contract = new ethers.Contract(contractAddress, abi, wallet);
    return contract;
}

// 获取交易市场合约
function getBuyMarketContract() {
    if (!window.ethereum.selectedAddress) {
        return initWallet;
    }
    let abi = DragonExchange_market.abi;
    let wallet = getProvider().getSigner();
    // 地址来自上面部署的合约
    let contractAddress =
        process.env.NODE_ENV === "production" ?
        DragonExchange_market.address_prod :
        DragonExchange_market.address;
    // 使用Provider 连接合约，将只有对合约的可读权限
    let contract = new ethers.Contract(contractAddress, abi, wallet);
    return contract;
}

// 获取交易市场合约-new
function getBuyMarketContractV2() {
    if (!window.ethereum.selectedAddress) {
        return initWallet;
    }
    let abi = DragonExchange_market_v2.abi;
    let wallet = getProvider().getSigner();
    // 地址来自上面部署的合约
    let contractAddress =
        process.env.NODE_ENV === "production" ?
        DragonExchange_market_v2.address_prod :
        DragonExchange_market_v2.address;
    // 使用Provider 连接合约，将只有对合约的可读权限
    let contract = new ethers.Contract(contractAddress, abi, wallet);
    return contract;
}

// 获取宝箱合约
function getDragonBlindboxContract() {
    if (!window.ethereum.selectedAddress) {
        return initWallet;
    }
    let abi = DragonBlindbox.abi;
    let wallet = getProvider().getSigner();
    // 地址来自上面部署的合约
    let contractAddress =
        process.env.NODE_ENV === "production" ?
        DragonBlindbox.address_prod :
        DragonBlindbox.address;
    // 使用Provider 连接合约，将只有对合约的可读权限
    let contract = new ethers.Contract(contractAddress, abi, wallet);
    return contract;
}

// 获取龙骨合约
function getDragonMainlandBoneContract() {
    if (!window.ethereum.selectedAddress) {
        return initWallet;
    }
    let abi = DragonMainlandBone.abi;
    let wallet = getProvider().getSigner();
    // 地址来自上面部署的合约
    let contractAddress =
        process.env.NODE_ENV === "production" ?
        DragonMainlandBone.address_prod :
        DragonMainlandBone.address;
    // 使用Provider 连接合约，将只有对合约的可读权限
    let contract = new ethers.Contract(contractAddress, abi, wallet);
    return contract;
}

// 获取龙骨合成合约
function getDragonBoneCompoundContract() {
    if (!window.ethereum.selectedAddress) {
        return initWallet;
    }
    let abi = DragonBoneCompound.abi;
    let wallet = getProvider().getSigner();
    // 地址来自上面部署的合约
    let contractAddress =
        process.env.NODE_ENV === "production" ?
        DragonBoneCompound.address_prod :
        DragonBoneCompound.address;
    // 使用Provider 连接合约，将只有对合约的可读权限
    let contract = new ethers.Contract(contractAddress, abi, wallet);
    return contract;
}


// 获取龙骨吸收合约
function getDragonBoneAbsorbContract() {
    if (!window.ethereum.selectedAddress) {
        return initWallet;
    }
    let abi = DragonBoneAbsorb.abi;
    let wallet = getProvider().getSigner();
    // 地址来自上面部署的合约
    let contractAddress =
        process.env.NODE_ENV === "production" ?
        DragonBoneAbsorb.address_prod :
        DragonBoneAbsorb.address;
    // 使用Provider 连接合约，将只有对合约的可读权限
    let contract = new ethers.Contract(contractAddress, abi, wallet);
    return contract;
}

// 获取龙骨吞噬合约
function getDragonDevourContract() {
    if (!window.ethereum.selectedAddress) {
        return initWallet;
    }
    let abi = DragonDevour.abi;
    let wallet = getProvider().getSigner();
    // 地址来自上面部署的合约
    let contractAddress =
        process.env.NODE_ENV === "production" ?
        DragonDevour.address_prod :
        DragonDevour.address;
    // 使用Provider 连接合约，将只有对合约的可读权限
    let contract = new ethers.Contract(contractAddress, abi, wallet);
    return contract;
}

// 获取龙骨交易市场合约
function getDragonBoneExchangeContract() {
    if (!window.ethereum.selectedAddress) {
        return initWallet;
    }
    let abi = DragonBoneExchange.abi;
    let wallet = getProvider().getSigner();
    // 地址来自上面部署的合约
    let contractAddress =
        process.env.NODE_ENV === "production" ?
        DragonBoneExchange.address_prod :
        DragonBoneExchange.address;
    // 使用Provider 连接合约，将只有对合约的可读权限
    let contract = new ethers.Contract(contractAddress, abi, wallet);
    return contract;
}

// 获取龙蛋兑换合约
function getExchangeContract() {
    if (!window.ethereum.selectedAddress) {
        return initWallet;
    }
    let abi = DragonMainlandVoucher.abi;
    let wallet = getProvider().getSigner();
    // 地址来自上面部署的合约
    let contractAddress =
        process.env.NODE_ENV === "production" ?
        DragonMainlandVoucher.address_prod :
        DragonMainlandVoucher.address;
    // 使用Provider 连接合约，将只有对合约的可读权限
    let contract = new ethers.Contract(contractAddress, abi, wallet);
    return contract;
}

// 获取龙蛋兑换合约
function getDragonMainlandShardIDOContract() {
    if (!window.ethereum.selectedAddress) {
        return initWallet;
    }
    let abi = DragonMainlandShardIDO.abi;
    let wallet = getProvider().getSigner();
    // 地址来自上面部署的合约
    let contractAddress =
        process.env.NODE_ENV === "production" ?
        DragonMainlandShardIDO.address_prod :
        DragonMainlandShardIDO.address;
    // 使用Provider 连接合约，将只有对合约的可读权限
    let contract = new ethers.Contract(contractAddress, abi, wallet);
    return contract;
}

// 获取质押合约
function getDragonStakingContract() {
    if (!window.ethereum.selectedAddress) {
        return initWallet;
    }
    let abi = DragonStaking.abi;
    let wallet = getProvider().getSigner();
    // 地址来自上面部署的合约
    let contractAddress =
        process.env.NODE_ENV === "production" ?
        DragonStaking.address_prod :
        DragonStaking.address;
    // 使用Provider 连接合约，将只有对合约的可读权限
    let contract = new ethers.Contract(contractAddress, abi, wallet);
    return contract;
}
// 获取提现合约
function getDpmWithdrawContract() {
    if (!window.ethereum.selectedAddress) {
        return initWallet;
    }
    let abi = DragonMiraclePotionToken.abi;
    let wallet = getProvider().getSigner();
    // 地址来自上面部署的合约
    let contractAddress =
        process.env.NODE_ENV === "production" ?
        DragonMiraclePotionToken.address_prod :
        DragonMiraclePotionToken.address;
    // 使用Provider 连接合约，将只有对合约的可读权限
    let contract = new ethers.Contract(contractAddress, abi, wallet);
    return contract;
}


// 获取DMS合约
function getDragonMainlandShardsTokenContract() {
    if (!window.ethereum.selectedAddress) {
        return initWallet;
    }
    let abi = DragonMainlandShardsToken.abi;
    let wallet = getProvider().getSigner();
    // 地址来自上面部署的合约
    let contractAddress =
        process.env.NODE_ENV === "production" ?
        DragonMainlandShardsToken.address_prod :
        DragonMainlandShardsToken.address;
    // 使用Provider 连接合约，将只有对合约的可读权限
    let contract = new ethers.Contract(contractAddress, abi, wallet);
    return contract;
}

// 获取BPool合约
function getBPoolContract(flag) {
    // if (!window.ethereum.selectedAddress) {
    //   return initWallet;
    // }
    let abi = BPool.abi;
    let wallet = flag ? getProvider().getSigner() : getProvider();
    // let wallet = getProvider()
    // 地址来自上面部署的合约
    let contractAddress =
        process.env.NODE_ENV === "production" ? BPool.address_prod : BPool.address;
    // 使用Provider 连接合约，将只有对合约的可读权限
    let contract = new ethers.Contract(contractAddress, abi, wallet);
    // contract.connect(getProvider().getSigner())
    return contract;
}

// 获取ConfigurableRightsPool合约
function getConfigurableRightsPoolContract(flag) {
    // if (!window.ethereum.selectedAddress) {
    //   return initWallet;
    // }
    let abi = ConfigurableRightsPool.abi;
    // let wallet = getProvider().getSigner();
    let wallet = flag ? getProvider().getSigner() : getProvider();

    // 地址来自上面部署的合约
    let contractAddress =
        process.env.NODE_ENV === "production" ?
        ConfigurableRightsPool.address_prod :
        ConfigurableRightsPool.address;
    // 使用Provider 连接合约，将只有对合约的可读权限
    let contract = new ethers.Contract(contractAddress, abi, wallet);
    return contract;
}

// 获取代币DMST/USDT
function getTokenMoney(key) {
    let contractAddress =
        process.env.NODE_ENV === "production" ?
        tokenMoney[key + '_prod'] :
        tokenMoney[key];
    return contractAddress
}


// lbp获取授权合约
function getLbpApproveContract(key) {
    // if (!window.ethereum.selectedAddress) {
    //   return initWallet;
    // }
    let abi = tokenMoney.abi;
    let wallet = getProvider().getSigner();
    // 地址来自上面部署的合约
    let contractAddress = key
        // 使用Provider 连接合约，将只有对合约的可读权限
    let contract = new ethers.Contract(contractAddress, abi, wallet);
    return contract;
}



// 合约授权一次
async function setApprovalForAll(data) {
    console.log("setApprovalForAll", data);
    let isApprove = await isApprovedForAll(data);
    console.log("isApprove", isApprove);

    if (isApprove) {
        return true;
    }
    const contract = getSendDragonContract();
    let params = {
        contractAddress: data.contractAddress,
        bool: data.bool,
    };
    console.log("setApprovalForAll", contract);

    try {
        let res = await contract.setApprovalForAll(
            params.contractAddress,
            params.bool
        );
        let receipt = await res.wait();
        return res;
    } catch (error) {
        return false;
    }
}

// 开始授权-已检测
async function startApprovalForAll(data) {
    const contract = getSendDragonContract();
    let params = {
        contractAddress: data.contractAddress,
        bool: data.bool,
    };
    try {
        let res = await contract.setApprovalForAll(
            params.contractAddress,
            params.bool
        );
        let receipt = await res.wait();
        return res;
    } catch (error) {
        return false;
    }
}

// 是否授权
async function isApprovedForAll(data) {
    const contract = getSendDragonContract();
    let params = {
        address: data.address,
        contractAddress: data.contractAddress,
    };
    let res = await contract.isApprovedForAll(
        params.address,
        params.contractAddress
    );
    return res;
}

// 是否授权-整体封装
async function isApproved(data) {

    const contract = data.key;
    let params = {
        address: data.address,
        contractAddress: data.contractAddress,
    };
    console.log('params', params, contract)
    let res = await contract.isApprovedForAll(
        params.address,
        params.contractAddress
    );
    return res;
}

// 授权-整体封装
async function approved(data) {

    const contract = data.key;
    let params = {
        contractAddress: data.contractAddress,
        bool: data.bool
    };
    console.log('params', params, contract)
    try {
        let res = await contract.setApprovalForAll(
            params.contractAddress,
            params.bool

        );
        return res;
    } catch (error) {

    }

}


// 是否授权-所有授权封装

/*  合约方法-end */


// 切换网络
async function switchSwitchEthereumChain() {
    let chainId = process.env.NODE_ENV === "production" ? '0x38' : '0x61';
    let rpcUrl = process.env.NODE_ENV === "production" ? 'https://bsc-dataseed1.binance.org/' : 'https://data-seed-prebsc-1-s1.binance.org:8545/';
    try {
        await ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: chainId }],
        });
        return true
    } catch (switchError) {
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code === 4902) {
            try {
                await ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [{ chainId: chainId, rpcUrl: rpcUrl }],
                });
                return true
            } catch (addError) {
                ElMessage.error(
                    chainId === 56 ?
                    "Please switch to BSCMainnet network！" :
                    "Please switch to BSCTestnet network！"
                );
                return false
                    // handle "add" error
            }
        }
        ElMessage.error(
            chainId === 56 ?
            "Please switch to BSCMainnet network！" :
            "Please switch to BSCTestnet network！"
        );
        return false
            // handle other "switch" errors
    }


}
// 初始化ethers
async function initWallet() {
    if (typeof window.ethereum === "undefined") {
        ElMessage.error("You do not have BSC wallet installed！");
        return "";
    }

    const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
        jsonrpc: "2.0",
    });



    if (!accounts || accounts.length == 0) {
        ElMessage.error("You have not unlocked the BSC wallet！");
        return "";
    }
    let address = accounts[0];

    console.log("window.ethereum.networkVersion=============", window.ethereum);
    let currNetwork = process.env.NODE_ENV === "production" ? 56 : 97;
    if (window.ethereum.networkVersion != currNetwork) {
        ElMessage.error(
            currNetwork === 56 ?
            "Please switch to BSCMainnet network！" :
            "Please switch to BSCTestnet network！"
        );
        return "";
    }
    let banlance = 0
    try {
        banlance = await getProvider().getBalance(address);
    } catch (error) {
        banlance = 0
    }

    let balanceFormat = ethers.utils.formatEther(banlance);
    sessionStorage.setItem("address", address);
    sessionStorage.setItem("banlance", balanceFormat);
    store.commit("login/SET_USER_WALLET");
    return address;
}

async function getBalanceHandle() {
    let address = sessionStorage.getItem("address");
    let banlance = await getProvider().getBalance(address);
    let balanceFormat = ethers.utils.formatEther(banlance);
    sessionStorage.setItem("banlance", balanceFormat);
    // sessionStorage.setItem("banlance", '0.14');
    console.log("getBalanceHandle=============balanceFormat", balanceFormat);
    store.commit("login/SET_USER_WALLET");
}

// 监听钱包更换地址
(() => {
    if (window.ethereum && window.ethereum.on) {
        window.ethereum.on("accountsChanged", (accounts) => {
            console.log("accountsChanged", accounts);
            // let address = accounts[0];
            // sessionStorage.setItem("address", address);
            // console.log('store', store,)
            // store.commit('metaMask/SET_ISLINKMETAMASK',)
            sessionStorage.removeItem("Token");
            sessionStorage.removeItem("user");
            sessionStorage.removeItem("address");
            sessionStorage.removeItem("banlance");
            console.log(window.location.href)
            if (window.location.href.indexOf('lbp') > -1) {
                store.commit("login/SET_USER_WALLET");
                return
            }
            store.commit("login/SET_LOGIN");
            router.push("/login");
        });

        //监听网络切换
        window.ethereum.on("chainChanged", (networkIDstring) => {
            console.log("networkIDstring=====", networkIDstring);
        });
    }
})();

//导出相应的方法
export {
    initWallet,
    getSiner,
    myWallet,
    transferAccounts,
    getContract,
    getSendDragonContract,
    getMarketContract,
    getBuyMarketContract,
    getBuyMarketContractV2,
    getExchangeContract,
    getDragonMainlandShardIDOContract,
    getDragonStakingContract,
    getDpmWithdrawContract,
    getBPoolContract,
    getConfigurableRightsPoolContract,
    getBalanceHandle,
    setApprovalForAll,
    isApprovedForAll,
    isApproved,
    startApprovalForAll,
    getTokenMoney,
    getLbpApproveContract,
    switchSwitchEthereumChain,
    getDragonMainlandShardsTokenContract,
    approved,
    getDragonBlindboxContract,
    getDragonMainlandBoneContract,
    getDragonBoneCompoundContract,
    getDragonBoneAbsorbContract,
    getDragonBoneExchangeContract,
    getDragonDevourContract,
};