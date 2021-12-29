import * as echarts from "echarts";
import Moment from 'moment'
export default function barChartOptions(data) {
    return {

        tooltip: {
            trigger: 'axis',//'axis',
            textStyle: {
                fontSize: 12,
                color: '#666'
            },

            // axisPointer: {
            //     type: 'cross', //'cross',
            //     label: {
            //         backgroundColor: '#fff',
            //         borderColor: '#aaa',
            //         borderWidth: 100,
            //         shadowBlur: 0,
            //         shadowOffsetX: 0,
            //         shadowOffsetY: 0,
            //         color: '#fff'
            //     }
            // }
        },
        legend: {
            data: ['DMS/USDT'],
            x: '10',
            y: '10',
            textStyle: {
                fontSize: 12,
                color: '#fff'
            }

        },
        color: ["#0080ff", "#4cd5ce"],

        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                // show: false,//不显示坐标轴线、坐标轴刻度线和坐标轴上的文字
                type: 'category',
                boundaryGap: false,
                data: data ? data.x : [], // ['1', '2', '3', '4', '5', '6', '7'],
                axisLabel: {
                    formatter: (item) => {
                        return Moment(item).format("HH:mm:ss")
                    }
                }
            }
        ],
        yAxis: [
            {
                // show: false,//不显示坐标轴线、坐标轴刻度线和坐标轴上的文字
                //  show:true,
                axisLine: { show: true },
                axisTick: { show: true },
                //  splitLine:{show:true},
                type: 'value',
                splitLine: {
                    show: false //去掉折线图中的横线
                },
                scale:true,
                // min:2 ,// 'dataMin' // 最小值
            }
        ],
        series: [

            {
                name: 'DMS/USDT',
                type: 'line',
                smooth: true,
                stack: '总量',
                itemStyle: {
                    normal: {   //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0, color: 'rgba(255, 199, 90, 0.5)' // 0% 处的颜色
                        }, {
                            offset: 0.2, color: 'rgba(255, 199, 90, 0.4)' // 100% 处的颜色
                        }, {
                            offset: 0.4, color: 'rgba(255, 199, 90, 0.3)' // 100% 处的颜色
                        }, {
                            offset: 0.6, color: 'rgba(255, 199, 90, 0.2)' // 100% 处的颜色
                        }, {
                            offset: 0.8, color: 'rgba(255, 199, 90, 0.1)' // 100% 处的颜色
                        }, {
                            offset: 1, color: 'rgba(255, 199, 90, 0)' // 100% 处的颜色
                        }]
                        ),  //背景渐变色 
                        lineStyle: {        // 系列级个性化折线样式  
                            width: 2,
                            type: 'solid',
                            color: "rgba(255, 199, 90, 0.9)"
                        }
                    },

                },//线条样式  
                symbolSize: (item) => {
                    console.log(item)
                    return 0
                }, //折线点的大小
                // areaStyle: { normal: {} },
                data: data ? data.y : [], // [320, 332, 601, 134, 120, 230, 210]
            }

        ]


    };
}