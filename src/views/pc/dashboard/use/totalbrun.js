import { reactive } from "vue";
import dashBoard from "@/api/dashBoard";
import { ethers, BigNumber } from "ethers";
import common from "@/utils/common";
import {
  initWallet,
  myWallet,
  transferAccounts,
  isApproved,
  getDpmWithdrawContract,
  getMarketContract,
  getDragonMainlandShardsTokenContract,
  getBalanceHandle,
  setApprovalForAll,
  isApprovedForAll,
  getLbpApproveContract,
  getTokenMoney,
} from "@/utils/metaMask/ethers.js";
import contractDestory from "@/utils/metaMask/dragonJson/contractDestory.json";
const API = dashBoard;
const state = reactive({
  statisticalData: {},
  dmpGross: null,
  dmpTurnover: null,
  contractAddress: contractDestory,
  dmsVolume: 53054000,
  totalDestroyDmp: null,
  totalWithdrawDestroyDmp: null,
});

export default function burnHandle() {
  const getStatisticalData = () => {
    API.getMarketTotal()
      .then((res) => {
        state.totalDestroyDmp = res.data.totalDestroyDmp;
        state.totalWithdrawDestroyDmp = res.data.totalWithdrawDestroyDmp;
        state.statisticalData = res.data;
        for (let i in state.statisticalData) {
          if (state.statisticalData[i]) {
            if (
              state.statisticalData[i].toString().split(".")[1] &&
              state.statisticalData[i].toString().split(".")[1].length >= 4
            ) {
              state.statisticalData[i] = state.statisticalData[i]
                .toFixed(4)
                .replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
            } else {
              state.statisticalData[i] =
                state.statisticalData[i].toLocaleString();
            }
          }
        }
        getDmpGross();
      })
      .catch((err) => {});
  };
  const goContract = (item) => {
    if (!item) {
      return;
    }
    // https://bscscan.com/address/0xdA2B827D0CF49C511D2bB2656c04931E7bF0cC2C
    let href =
      process.env.NODE_ENV === "production"
        ? `https://bscscan.com/address/${item}`
        : `https://testnet.bscscan.com/address/${item}`;
    window.open(href, "_blank");
  };

  // 龙繁殖
  const getDmpGross = async () => {
    // let address = await initWallet();
    // if (!address) return;

    /*  Todo */
    const contract = getDpmWithdrawContract();
    try {
      let result = await contract.totalSupply();
      const dmpGross = ethers.utils.formatEther(result);
      const dmpTurn = dmpGross - state.totalDestroyDmp;
      if (
        dmpTurn &&
        dmpTurn.toString().split(".")[1] &&
        dmpTurn.toString().split(".")[1].length >= 4
      ) {
        state.dmpTurnover = dmpTurn
          .toFixed(4)
          .replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
      } else {
        state.dmpTurnover = dmpTurn.toLocaleString();
      }

      // 龙繁殖
    } catch (err) {
      console.log(err, "error");
    }
  };
  return {
    state,
    getStatisticalData,
    goContract,
  };
}
