import { request } from "@/utils/axios";

// 龙-繁殖
let dashBoard = {
  getMarketTotal: (data) => {
    return request({
      url: "/api/market/statistical/total",
      method: "post",
      data,
      noToken: true,
      noLoading: true,
    });
  },
};

export default dashBoard;
