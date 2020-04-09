<!--右侧图表模板-->
<template>
  <div class="right-chart1">
    <p class="right-title">
      <i class="iconfont icon-place"></i><span>{{singleDevice.name}}</span>
      <span class="operate-box">
        <a @click="detailsSwitchFn(false)"><i class="iconfont icon-Theprevious1"></i></a>
         <a @click="switchCarousel1=false" v-show="switchCarousel1"><i class="iconfont icon-suspend"></i></a>
        <a @click="switchCarousel1=true" v-show="!switchCarousel1"><i class="iconfont icon-bofangsanjiaoxing"></i></a>
        <a @click="detailsSwitchFn(true)"><i class="iconfont icon-Next1"></i></a>
        <!--                <a><i class="iconfont icon-Popup"></i></a>-->
      </span>
    </p>
    <div class="abnormal-chart">
      <div class="real-time-current">
        <div class="abnormal-left">
          <p class="subheading">分相实时电流监测（A）
            <i v-show="singleDevice.electricityAMax||singleDevice.electricityBMax||singleDevice.electricityCMax" class="iconfont icon-Callthepolice"></i></p>
          <ul>
            <li :class="{active:singleDevice.electricityAMax}"><span>{{singleDevice.electricityA}}</span><a>A相</a></li>
            <li :class="{active:singleDevice.electricityBMax}"><span>{{singleDevice.electricityB}}</span><a>B相</a></li>
            <li :class="{active:singleDevice.electricityCMax}"><span>{{singleDevice.electricityC}}</span><a>C相</a></li>
          </ul>
        </div>
        <div class="chart-box" id="myChart1"></div>
      </div>
      <div class="real-time-temperature">
        <div class="abnormal-left">
          <p class="subheading">分相实时母排温度监测（℃）
            <i v-show="singleDevice.temperatureAMax||singleDevice.temperatureBMax||singleDevice.temperatureCMax" class="iconfont icon-Callthepolice"></i></p>
          <ul>
            <li :class="{active:singleDevice.temperatureAMax}"><span>{{singleDevice.temperatureA}}</span><a>A相</a></li>
            <li :class="{active:singleDevice.temperatureBMax}"><span>{{singleDevice.temperatureB}}</span><a>B相</a></li>
            <li :class="{active:singleDevice.temperatureCMax}"><span>{{singleDevice.temperatureC}}</span><a>C相</a></li>
          </ul>
        </div>
        <div class="chart-box" id="myChart2"></div>
      </div>
      <div class="residual-current">
        <div class="abnormal-left">
          <p class="subheading">分相实时剩余电流监测（mA）
            <i v-show="singleDevice.residualCurrentMax" class="iconfont icon-Callthepolice"></i></p>
          <div class="text" :class="{active:singleDevice.residualCurrentMax}">
            <span>{{singleDevice.residualCurrent}}</span>
          </div>
        </div>
        <div class="chart-box" id="myChart3"></div>
      </div>
    </div>
    <div class="normal-chart">
      <div class="each-box" v-for="(item,index1) in normalCircuit">
        <p class="right-title">
          <i class="iconfont icon-place"></i><span>{{item.name}}</span>
          <i @click="detailsClickFn(item)" class="iconfont icon-Popup"></i>
        </p>
        <table>
          <tr>
            <td v-if="index1==0"></td>
            <td><a>A相</a></td>
            <td><a>B相</a></td>
            <td><a>C相</a></td>
          </tr>
          <tr>
            <td v-if="index1==0"><a>实时电流（A）</a></td>
            <td v-for="(data,index) in item.dataA">
              <a :class="'line'+index">{{data}}</a>
              <span class="progress-bar">
                <i class="iconfont icon-Progressbar" :style="{left:calculateCurrent(data,item.dataA2[index])}"></i>
                <i class="early-warning" :style="{width:earlyWarningFn(item.dataA1[index],item.dataA2[index])}"></i>
                <i class="alarm"></i>
              </span>
            </td>
          </tr>
          <tr>
            <td v-if="index1==0"><a>实时温度（℃）</a></td>
            <td v-for="(data,index) in item.dataB">
              <a :class="'line'+index">{{data}}</a>
              <span class="progress-bar">
                <i class="iconfont icon-Progressbar" :style="{left:calculateCurrent(data,item.dataB2[index])}"></i>
                <i class="early-warning" :style="{width:earlyWarningFn(item.dataB1[index],item.dataB2[index])}"></i>
                <i class="alarm"></i>
              </span>
            </td>
          </tr>
          <tr>
            <td v-if="index1==0"><a>剩余电流（mA）</a></td>
            <td colspan="3"><a class="special">{{item.dataC[0]}}</a>
              <span class="progress-bar">
                <i class="iconfont icon-Progressbar" :style="{left:calculateCurrent(item.dataC[0],item.dataC[2])}"></i>
                <i class="early-warning" :style="{width:earlyWarningFn(item.dataC[1],item.dataC[2])}"></i>
                <i class="alarm"></i>
              </span>
            </td>
          </tr>
        </table>
      </div>
      <div class="switch-btn">
        <a @click="handoverMethod(false)"><i class="iconfont icon-Theprevious"></i></a>
        <a @click="switchCarousel2=false" v-show="switchCarousel2"><i class="iconfont icon-suspend"></i></a>
        <a @click="switchCarousel2=true" v-show="!switchCarousel2"><i class="iconfont icon-bofangsanjiaoxing"></i></a>
        <a @click="handoverMethod(true)"><i class="iconfont icon-Next"></i></a>
      </div>
    </div>
    <div class="mask-popup" v-show="maskPopup">
      <Spin fix></Spin>
    </div>
  </div>
</template>

<script>
    // 引入基本模板
    let echarts = require('echarts/lib/echarts');
    // 引入饼状图组件
    // require('echarts/lib/chart/bar');
    require('echarts/lib/component/tooltip');
    require('echarts/lib/component/legend');
    require('echarts/lib/component/title');
    require('echarts/lib/component/markLine');
    // require('echarts/lib/chart/connect')

    export default {
        name: "rightChart1",
        data() {
            return {
                maskPopup: true,//遮罩弹窗

                switchCarousel1: false,//详情轮播开关
                switchCarousel2: false,//底部轮播开关
                allNormalCircuit: [],//全部的数据
                singleDevice: {
                    name: '', residualCurrent: '', electricityA: '', electricityB: '', electricityC: '',
                    temperatureA: '', temperatureB: '', temperatureC: ''
                },//上部详情的信息
                checkedSeat: 1,//底部表格选择的第几个三
                normalCircuit:
                    [{
                        name: '',
                        dataA: [0, 0, 0],//实时电流 A、B、C 值
                        dataA1: [1, 1, 1],//实时电流 预警A、B、C 值
                        dataA2: [2, 2, 2],//实时电流 报警A、B、C 值
                        dataB: [0, 0, 0],//实时温度 A、B、C 值
                        dataB1: [1, 1, 1],//实时温度 预警A、B、C 值
                        dataB2: [2, 2, 2],//实时温度 报警A、B、C 值
                        dataC: [0, 1, 2],//剩余电流实时、预警、报警值
                    },
                        {
                            name: '',
                            dataA: [0, 0, 0],
                            dataA1: [1, 1, 1],
                            dataA2: [2, 2, 2],
                            dataB: [0, 0, 0],
                            dataB1: [1, 1, 1],
                            dataB2: [2, 2, 2],
                            dataC: [0, 1, 2],
                        },
                        {
                            name: '',
                            dataA: [0, 0, 0],
                            dataA1: [1, 1, 1],
                            dataA2: [2, 2, 2],
                            dataB: [0, 0, 0],
                            dataB1: [1, 1, 1],
                            dataB2: [2, 2, 2],
                            dataC: [0, 1, 2],
                        }],//展示的三个数据
                // normalHead:['实时电流（A）','实时温度（℃）','剩余电流（mA）'],

                XData1Name: [],
                XData2Name: [],
                XData3Name: [],
                XData1: [],//['09:00', '09:15', '09:30', '09:45', '10:00', '10:15', '10:30', '10:45', '11:00', '11:15', '11:30',
                // '11:45', '12:00', '12:15', '12:30', '12:45', '13:00', '13:15', '13:30', '13:45', '14:00', '14:15',
                // '14:30', '14:45', '15:00', '15:15', '15:30', '15:45', '16:00', '16:15', '16:30', '16:45'],
                XData2: [],//['09:00', '09:15', '09:30', '09:45', '10:00', '10:15', '10:30', '10:45', '11:00', '11:15', '11:30',
                // '11:45', '12:00', '12:15', '12:30', '12:45', '13:00', '13:15', '13:30', '13:45', '14:00', '14:15',
                // '14:30', '14:45', '15:00', '15:15', '15:30', '15:45', '16:00', '16:15', '16:30', '16:45'],
                XData3: [],//['09:00', '09:15', '09:30', '09:45', '10:00', '10:15', '10:30', '10:45', '11:00', '11:15', '11:30',
                // '11:45', '12:00', '12:15', '12:30', '12:45', '13:00', '13:15', '13:30', '13:45', '14:00', '14:15',
                // '14:30', '14:45', '15:00', '15:15', '15:30', '15:45', '16:00', '16:15', '16:30', '16:45'],
                YData1A: [],//[50, 52, 52, 52, 52, 58, 52, 55, 48, 52, 52, 52, 54, 52, 52, 52, 50, 52, 52, 52, 52, 52, 55, 52, 52, 49, 52, 52, 52, 52, 52],
                YData1B: [],//[30, 32, 32, 32, 32, 38, 32, 33, 36, 32, 32, 32, 34, 32, 32, 32, 39, 32, 32, 32, 32, 32, 33, 32, 32, 23, 32, 32, 32, 32, 32],
                YData1C: [],//[10, 11, 12, 13, 11, 9, 11, 12, 13, 11, 9, 8, 10, 12, 13, 11, 9, 8, 10, 12, 10, 13, 11, 9, 11, 12, 13, 11, 9, 8, 10],
                YData2A: [],//[50, 52, 52, 52, 52, 58, 52, 55, 48, 52, 52, 52, 54, 52, 52, 52, 50, 52, 52, 52, 52, 52, 55, 52, 52, 49, 52, 52, 52, 52, 52],
                YData2B: [],//[30, 32, 32, 32, 32, 38, 32, 33, 36, 32, 32, 32, 34, 32, 32, 32, 39, 32, 32, 32, 32, 32, 33, 32, 32, 23, 32, 32, 32, 32, 32],
                YData2C: [],//[10, 11, 12, 13, 11, 9, 11, 12, 13, 11, 9, 8, 10, 12, 13, 11, 9, 8, 10, 12, 10, 13, 11, 9, 11, 12, 13, 11, 9, 8, 10],
                YData3: [],//[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 14, 0, 0, 0, 0, 5, 8, 12],
                fontSize: '14',
                intervalX: 0,//X周间隔
                pageTimer: '',
            }
        },
        created() {
            this.getEquipmentData();
        },
        mounted() {
            let tempNum = 0;
            this.pageTimer = setInterval(() => {
                tempNum++;
                if (this.switchCarousel1) {
                    this.detailsSwitchFn(true);
                }
                if(this.switchCarousel2){
                    this.handoverMethod(true);
                }
                if (tempNum % 30 == 0) {
                    this.getEquipmentData()
                }
            }, 20000)
        },
        destroyed() {
            clearInterval(this.pageTimer);
            // console.log("我已经离开了！");
        },
        methods: {
            drawingCharts() {
                let myChart1 = echarts.init(document.getElementById('myChart1'));
                let myChart2 = echarts.init(document.getElementById('myChart2'));
                let myChart3 = echarts.init(document.getElementById('myChart3'));

                let option1 = {
                    // backgroundColor: '#0A1651',
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            lineStyle: {
                                color: '#57617B'
                            }
                        }
                    },
                    legend: {
                        // icon: 'diamond',
                        itemGap: 13,
                        data: this.XData1Name,
                        top: '3%',
                        left: 'center',
                        textStyle: {
                            fontSize: 12,
                            color: '#F1F1F3'
                        }
                    },
                    grid: {
                        bottom: '26px',
                        left: '50px'
                    },
                    xAxis: [{
                        type: 'category',
                        boundaryGap: false,
                        axisLine: {
                            lineStyle: {
                                color: '#57617B'
                            }
                        },
                        axisLabel: {
                            interval: this.intervalX,
                            show: true,
                            textStyle: {
                                color: '#fff',
                                fontSize: this.fontSize
                            }
                        },
                        data: this.XData1
                    }],
                    yAxis: [{
                        type: 'value',
                        name: '(A)',
                        // splitNumber: 4,
                        nameTextStyle: {
                            color: '#fff',
                            fontSize: 16,
                            padding: [20, 0, 0, -40]
                        },
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            show: false,
                            // lineStyle: {
                            //     color: '#57617B'
                            // }
                        },
                        // interval: 4,
                        axisLabel: {
                            margin: 16,

                            textStyle: {
                                color: "#fff",
                                fontSize: this.fontSize
                            }
                        },
                        splitLine: {
                            lineStyle: {
                                color: "rgba(255,255,255,0.1)",
                            }
                        }
                    }],
                    // visualMap: [{
                    //     show: false,
                    //     pieces: [
                    //         {
                    //             gt: 0,
                    //             lt: 30,
                    //             color: '#FFFF00',
                    //         },
                    //         {
                    //             gt: 30,
                    //             lt: 54,
                    //             color: '#00A1EA',
                    //         }
                    //     ],
                    //     outOfRange: {
                    //         color: '#FF5D1D',
                    //     },
                    // }, ],
                    series: [{
                        name: this.XData1Name[0],
                        type: 'line',
                        smooth: true,
                        // markLine: { //最大值和最小值
                        //     data: [{
                        //         name: '阈值54',
                        //         yAxis: 54,
                        //         label: {
                        //             show: 'true',
                        //             position: 'end',
                        //             formatter: 'A相标准'
                        //         },
                        //         lineStyle: {
                        //             normal: {
                        //                 width: 1,
                        //                 color: "#ffd200",
                        //             }
                        //         }
                        //
                        //     },
                        //     ]
                        // },
                        lineStyle: {
                            normal: {
                                width: 1,
                                color: "#ffd200",
                            }
                        },
                        symbol: 'circle',
                        symbolSize: 4,
                        itemStyle: {
                            normal: {
                                color: '#ffd200',
                                // borderColor: 'blue', //拐点边框颜色
                            }
                        },
                        data: this.YData1A
                    }, {
                        name: this.XData1Name[1],
                        type: 'line',
                        smooth: true,
                        // markLine: { //最大值和最小值
                        //     data: [{
                        //         name: '阈值30',
                        //         yAxis: 30,
                        //         label: {
                        //             show: 'true',
                        //             position: 'end',
                        //             formatter: 'B相标准'
                        //         },
                        //         lineStyle: {
                        //             normal: {
                        //                 width: 1,
                        //                 color: "#03c70c",
                        //             }
                        //         }
                        //
                        //     },
                        //     ]
                        // },
                        lineStyle: {
                            normal: {
                                width: 1,
                                color: '#03c70c'
                            }
                        },
                        symbol: 'circle',
                        symbolSize: 4,
                        itemStyle: {
                            normal: {
                                color: '#03c70c',
                                // borderColor: 'blue', //拐点边框颜色
                            }
                        },
                        data: this.YData1B
                    }, {
                        name: this.XData1Name[2],
                        type: 'line',
                        smooth: true,
                        // markLine: { //最大值和最小值
                        //     data: [
                        //         {
                        //             name: '阈值10',
                        //             yAxis: 10,
                        //             label: {
                        //                 show: 'true',
                        //                 position: 'end',
                        //                 formatter: 'C相标准'
                        //             },
                        //             lineStyle: {
                        //                 normal: {
                        //                     width: 1,
                        //                     color: "#f00",
                        //                 }
                        //             }
                        //         },
                        //
                        //     ]
                        // },
                        lineStyle: {
                            normal: {
                                width: 1,
                                color: '#f00'
                            }
                        },
                        symbol: 'circle',
                        symbolSize: 4,
                        itemStyle: {
                            normal: {
                                color: '#f00',
                                // borderColor: 'blue', //拐点边框颜色
                            }
                        },
                        data: this.YData1C
                    }]

                };
                let option2 = {
                    // backgroundColor: '#0A1651',
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            lineStyle: {
                                color: '#57617B'
                            }
                        }
                    },
                    legend: {
                        // icon: 'diamond',
                        itemGap: 13,
                        data: this.XData2Name,
                        top: '3%',
                        left: 'center',
                        textStyle: {
                            fontSize: 12,
                            color: '#F1F1F3'
                        }
                    },
                    grid: {
                        bottom: '26px',
                        left: '50px'
                    },
                    xAxis: [{
                        type: 'category',
                        boundaryGap: false,
                        axisLine: {
                            lineStyle: {
                                color: '#57617B'
                            }
                        },
                        axisLabel: {
                            interval: this.intervalX,
                            show: true,
                            textStyle: {
                                color: '#fff',
                                fontSize: this.fontSize
                            }
                        },
                        data: this.XData2
                    }],
                    yAxis: [{
                        type: 'value',
                        name: '(℃)',
                        // splitNumber: 4,
                        nameTextStyle: {
                            color: '#fff',
                            fontSize: 16,
                            padding: [20, 0, 0, -40]
                        },
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            show: false,
                            // lineStyle: {
                            //     color: '#57617B'
                            // }
                        },
                        // interval: 4,
                        axisLabel: {
                            margin: 16,

                            textStyle: {
                                color: "#fff",
                                fontSize: this.fontSize
                            }
                        },
                        splitLine: {
                            lineStyle: {
                                color: "rgba(255,255,255,0.1)",
                            }
                        }
                    }],
                    series: [{
                        name: this.XData2Name[0],
                        type: 'line',
                        smooth: true,
                        // markLine: { //最大值和最小值
                        //     data: [{
                        //         name: '阈值54',
                        //         yAxis: 54,
                        //         label: {
                        //             show: 'true',
                        //             position: 'end',
                        //             formatter: 'A相标准'
                        //         },
                        //         lineStyle: {
                        //             normal: {
                        //                 width: 1,
                        //                 color: "#ffd200",
                        //             }
                        //         }
                        //
                        //     },
                        //     ]
                        // },
                        lineStyle: {
                            normal: {
                                width: 1,
                                color: "#ffd200",
                            }
                        },
                        symbol: 'circle',
                        symbolSize: 4,
                        itemStyle: {
                            normal: {
                                color: '#ffd200',
                                // borderColor: 'blue', //拐点边框颜色
                            }
                        },
                        data: this.YData2A
                    }, {
                        name: this.XData2Name[1],
                        type: 'line',
                        smooth: true,
                        // markLine: { //最大值和最小值
                        //     data: [{
                        //         name: '阈值30',
                        //         yAxis: 30,
                        //         label: {
                        //             show: 'true',
                        //             position: 'end',
                        //             formatter: 'B相标准'
                        //         },
                        //         lineStyle: {
                        //             normal: {
                        //                 width: 1,
                        //                 color: "#03c70c",
                        //             }
                        //         }
                        //
                        //     },
                        //
                        //     ]
                        // },
                        lineStyle: {
                            normal: {
                                width: 1,
                                color: '#03c70c'
                            }
                        },
                        symbol: 'circle',
                        symbolSize: 4,
                        itemStyle: {
                            normal: {
                                color: '#03c70c',
                                // borderColor: 'blue', //拐点边框颜色
                            }
                        },
                        data: this.YData2B
                    }, {
                        name: this.XData2Name[2],
                        type: 'line',
                        smooth: true,
                        // markLine: { //最大值和最小值
                        //     data: [
                        //         {
                        //             name: '阈值10',
                        //             yAxis: 10,
                        //             label: {
                        //                 show: 'true',
                        //                 position: 'end',
                        //                 formatter: 'C相标准'
                        //             },
                        //             lineStyle: {
                        //                 normal: {
                        //                     width: 1,
                        //                     color: "#f00",
                        //                 }
                        //             }
                        //         },
                        //
                        //     ]
                        // },
                        lineStyle: {
                            normal: {
                                width: 1,
                                color: '#f00'
                            }
                        },
                        symbol: 'circle',
                        symbolSize: 4,
                        itemStyle: {
                            normal: {
                                color: '#f00',
                                // borderColor: 'blue', //拐点边框颜色
                            }
                        },
                        data: this.YData2C
                    }]

                };
                let option3 = {
                    // backgroundColor: '#0A1651',
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            lineStyle: {
                                color: '#57617B'
                            }
                        }
                    },
                    legend: {
                        // icon: 'diamond',
                        itemGap: 13,
                        data: this.XData3Name,
                        top: '3%',
                        left: 'center',
                        textStyle: {
                            fontSize: 12,
                            color: '#F1F1F3'
                        }
                    },
                    grid: {
                        bottom: '26px',
                        left: '50px'
                    },
                    xAxis: [{
                        type: 'category',
                        boundaryGap: false,
                        axisLine: {
                            lineStyle: {
                                color: '#57617B'
                            }
                        },
                        axisLabel: {
                            interval: this.intervalX,
                            show: true,
                            textStyle: {
                                color: '#fff',
                                fontSize: this.fontSize
                            }
                        },
                        data: this.XData3
                    }],
                    yAxis: [{
                        type: 'value',
                        name: '(mA)',
                        // splitNumber: 4,
                        nameTextStyle: {
                            color: '#fff',
                            fontSize: 16,
                            padding: [20, 0, 0, -40]
                        },
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            show: false,
                            // lineStyle: {
                            //     color: '#57617B'
                            // }
                        },
                        // interval: 4,
                        axisLabel: {
                            margin: 16,

                            textStyle: {
                                color: "#fff",
                                fontSize: this.fontSize
                            }
                        },
                        splitLine: {
                            lineStyle: {
                                color: "rgba(255,255,255,0.1)",
                            }
                        }
                    }],
                    series: [{
                        name: this.XData3Name[0],
                        type: 'line',
                        smooth: true,
                        lineStyle: {
                            normal: {
                                width: 1,
                                color: "#0bedfb",
                            }
                        },
                        symbol: 'circle',
                        symbolSize: 4,
                        itemStyle: {
                            normal: {
                                color: '#0bedfb',
                                // borderColor: 'blue', //拐点边框颜色
                            }
                        },
                        data: this.YData3
                    }]
                };

                myChart1.setOption(option1);
                myChart2.setOption(option2);
                myChart3.setOption(option3);

                // //联动配置
                echarts.connect([myChart1, myChart2, myChart3]);
            },
            getCurveData() {//获取折线图数据
                let date = new Date();
                let year = date.getFullYear();
                let month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1));
                let day = date.getDate() > 9 ? date.getDate() : ('0' + date.getDate());
                this.$ajax.get('/zigbee/selectHistoricalCurrentDetection',
                    {
                        params: {
                            loopName: this.singleDevice.name,
                            startTime: year + '-' + month + '-' + day + ' 00:00:00',
                            endTime: year + '-' + month + '-' + day + ' 23:59:59'
                        }
                    },
                ).then((res) => {
                    if (res.data.code == 200) {
                        this.XData1 = [];
                        this.XData2 = [];
                        this.XData3 = [];
                        this.YData1A = [];
                        this.YData1B = [];
                        this.YData1C = [];
                        this.YData2A = [];
                        this.YData2B = [];
                        this.YData2C = [];
                        this.YData3 = [];
                        this.intervalX = 0;
                        //实时电流监测
                        if (Array.isArray(res.data.data.splitPhaseRealTimeCurrentDetection.newZigbeeDeviceDetailMaps.aElectricCurrent)) {
                            res.data.data.splitPhaseRealTimeCurrentDetection.newZigbeeDeviceDetailMaps.aElectricCurrent.map((e, index) => {
                                this.XData1.push(e.createTime.slice(11, 16));
                                this.YData1A.push(e.curDetection);
                                if (index == 0) {
                                    this.XData1Name.push(e.name)
                                }
                            });
                            this.intervalX = parseInt(res.data.data.splitPhaseRealTimeCurrentDetection.newZigbeeDeviceDetailMaps.aElectricCurrent.length / 10);
                        } else {
                            this.YData1A = [];
                        }
                        if (Array.isArray(res.data.data.splitPhaseRealTimeCurrentDetection.newZigbeeDeviceDetailMaps.bElectricCurrent)) {
                            res.data.data.splitPhaseRealTimeCurrentDetection.newZigbeeDeviceDetailMaps.bElectricCurrent.map((e, index) => {
                                // this.XData1.push(e.createTime.slice(11, 16));
                                this.YData1B.push(e.curDetection);
                                if (index == 0) {
                                    this.XData1Name.push(e.name)
                                }
                            });
                        } else {
                            this.YData1B = [];
                        }
                        if (Array.isArray(res.data.data.splitPhaseRealTimeCurrentDetection.newZigbeeDeviceDetailMaps.cElectricCurrent)) {
                            res.data.data.splitPhaseRealTimeCurrentDetection.newZigbeeDeviceDetailMaps.cElectricCurrent.map((e, index) => {
                                // this.XData1.push(e.createTime.slice(11, 16));
                                this.YData1C.push(e.curDetection);
                                if (index == 0) {
                                    this.XData1Name.push(e.name)
                                }
                            });
                        } else {
                            this.YData1C = [];
                        }

                        // //母排温度监测
                        if (Array.isArray(res.data.data.splitPhaseRealTimeBusTemperatureDetection.newZigbeeDeviceDetailMaps.aModuleTemperature)) {
                            res.data.data.splitPhaseRealTimeBusTemperatureDetection.newZigbeeDeviceDetailMaps.aModuleTemperature.map((e, index) => {
                                this.XData2.push(e.createTime.slice(11, 16));
                                this.YData2A.push(e.curDetection);
                                if (index == 0) {
                                    this.XData2Name.push(e.name)
                                }
                            });
                        } else {
                            this.YData2A = [];
                        }
                        if (Array.isArray(res.data.data.splitPhaseRealTimeBusTemperatureDetection.newZigbeeDeviceDetailMaps.bModuleTemperature)) {
                            res.data.data.splitPhaseRealTimeBusTemperatureDetection.newZigbeeDeviceDetailMaps.bModuleTemperature.map((e, index) => {
                                // this.XData2.push(e.createTime.slice(11, 16));
                                this.YData2B.push(e.curDetection);
                                if (index == 0) {
                                    this.XData2Name.push(e.name)
                                }
                            });
                        } else {
                            this.YData2B = [];
                        }
                        if (Array.isArray(res.data.data.splitPhaseRealTimeBusTemperatureDetection.newZigbeeDeviceDetailMaps.cModuleTemperature)) {
                            res.data.data.splitPhaseRealTimeBusTemperatureDetection.newZigbeeDeviceDetailMaps.cModuleTemperature.map((e, index) => {
                                // this.XData2.push(e.createTime.slice(11, 16));
                                this.YData2C.push(e.curDetection);
                                if (index == 0) {
                                    this.XData2Name.push(e.name)
                                }
                            });
                        } else {
                            this.YData2C = [];
                        }
                        //
                        // //剩余电流检测

                        if (Array.isArray(res.data.data.splitPhaseRealTimeRemainingBatteryDetectionMap)) {
                            res.data.data.splitPhaseRealTimeRemainingBatteryDetectionMap.map((e, index) => {
                                this.XData3.push(e.createTime.slice(11, 16));
                                this.YData3.push(e.curDetection);
                                if (index == 0) {
                                    this.XData3Name.push(e.name)
                                }
                            });
                        } else {
                            this.YData3 = [];
                        }
                    } else {
                        // this.$Message.error(res.data.message)
                    }
                    this.drawingCharts();
                    this.maskPopup = false;
                }).catch(function (error) {
                    this.maskPopup = false;
                    console.log(error);
                })
            },
            getEquipmentData() {//获取所有设备数据
                this.$ajax.get('/zigbee/selectDeviceList',
                    {
                        params: {
                            deviceCode: '8293482342434MTS3'
                        }
                    },
                ).then((res) => {
                    if (res.data.code == 200) {
                        this.normalCircuit = [];
                        this.allNormalCircuit = [];
                        this.checkedSeat = 1;
                        res.data.data.map((e, index) => {
                            this.allNormalCircuit.push({
                                name: e.name, surplus: e.lineCurrent.curDetection,
                                dataA: [e.aelectricCurrent.curDetection, e.belectricCurrent.curDetection, e.celectricCurrent.curDetection],
                                dataA1: [e.aelectricCurrent.levelOneThreshold, e.belectricCurrent.levelOneThreshold, e.celectricCurrent.levelOneThreshold],
                                dataA2: [e.aelectricCurrent.levelTwoThreshold, e.belectricCurrent.levelTwoThreshold, e.celectricCurrent.levelTwoThreshold],
                                dataB: [e.amoduleTemperature.curDetection, e.bmoduleTemperature.curDetection, e.cmoduleTemperature.curDetection],
                                dataB1: [e.amoduleTemperature.levelOneThreshold, e.bmoduleTemperature.levelOneThreshold, e.cmoduleTemperature.levelOneThreshold],
                                dataB2: [e.amoduleTemperature.levelTwoThreshold, e.bmoduleTemperature.levelTwoThreshold, e.cmoduleTemperature.levelTwoThreshold],
                                dataC: [e.lineCurrent.curDetection, e.lineCurrent.levelOneThreshold, e.lineCurrent.levelTwoThreshold]
                            });
                            if (index < 3) {
                                this.normalCircuit.push({
                                    name: e.name, surplus: e.lineCurrent.curDetection,
                                    dataA: [e.aelectricCurrent.curDetection, e.belectricCurrent.curDetection, e.celectricCurrent.curDetection],
                                    dataA1: [e.aelectricCurrent.levelOneThreshold, e.belectricCurrent.levelOneThreshold, e.celectricCurrent.levelOneThreshold],
                                    dataA2: [e.aelectricCurrent.levelTwoThreshold, e.belectricCurrent.levelTwoThreshold, e.celectricCurrent.levelTwoThreshold],
                                    dataB: [e.amoduleTemperature.curDetection, e.bmoduleTemperature.curDetection, e.cmoduleTemperature.curDetection],
                                    dataB1: [e.amoduleTemperature.levelOneThreshold, e.bmoduleTemperature.levelOneThreshold, e.cmoduleTemperature.levelOneThreshold],
                                    dataB2: [e.amoduleTemperature.levelTwoThreshold, e.bmoduleTemperature.levelTwoThreshold, e.cmoduleTemperature.levelTwoThreshold],
                                    dataC: [e.lineCurrent.curDetection, e.lineCurrent.levelOneThreshold, e.lineCurrent.levelTwoThreshold]
                                })
                            }
                        });
                        this.detailsDataFn(0);
                        this.getCurveData();
                    }
                })
            },
            handoverMethod(data) {//底部三表格同时切换方法
                let tempNum1 = 0;
                let tempNum2 = 1;
                let tempNum3 = 2;
                this.normalCircuit = [];
                this.checkedSeat = data ? (this.checkedSeat + 1) : (this.checkedSeat - 1);
                if ((this.allNormalCircuit.length / 3) < this.checkedSeat && (this.allNormalCircuit.length % 3 != 0)) {
                    tempNum1 = this.allNormalCircuit.length - 3;
                    tempNum2 = this.allNormalCircuit.length - 2;
                    tempNum3 = this.allNormalCircuit.length - 1;
                    this.checkedSeat = 0;
                } else if (this.checkedSeat <= 0) {
                    tempNum1 = this.allNormalCircuit.length - 3;
                    tempNum2 = this.allNormalCircuit.length - 2;
                    tempNum3 = this.allNormalCircuit.length - 1;
                    this.checkedSeat = Math.ceil(this.allNormalCircuit.length / 3);
                } else {
                    tempNum1 = 3 * this.checkedSeat - 3;
                    tempNum2 = 3 * this.checkedSeat - 2;
                    tempNum3 = 3 * this.checkedSeat - 1;
                }

                this.allNormalCircuit.map((e, index) => {
                    if (index == tempNum1 || index == tempNum2 || index == tempNum3) {
                        this.normalCircuit.push(e);
                    }
                });
            },
            detailsSwitchFn(data) {//详情切换
                let num = 0;
                for (let i = 0; i < this.allNormalCircuit.length; i++) {
                    if (this.allNormalCircuit[i].name == this.singleDevice.name) {
                        num = data ? (i + 1) : (i - 1);
                        num = (num >= this.allNormalCircuit.length) ? 0 : (num < 0 ? (this.allNormalCircuit.length - 1) : num);
                        this.detailsDataFn(num);
                        return false;
                    }
                }
                // this.detailsDataFn(num);
                // this.getCurveData();
            },
            detailsClickFn(data) {//详情点击
                // this.singleDevice.name = data.name;
                // this.getCurveData();
                for (let i = 0; i < this.allNormalCircuit.length; i++) {
                    if (this.allNormalCircuit[i].name == data.name) {
                        this.detailsDataFn(i);
                        return false
                    }
                }
            },
            calculateCurrent(num1, num2) {//计算当前位置
                // ((data/item.dataD[index]-0.2)*100
                let data1 = (num1 - 0) ? (num1 - 0) : 0;
                let data2 = (num2 - 0) ? (num2 - 0) : 0;
                let num = (data1 / (data2 / 0.8)) * 100
                if (num < 95 && num > 5) {
                    return num + '%';
                } else if (num <= 4) {
                    return '4%';
                } else if (num > 95) {
                    return '95%';
                } else {
                    return '4%';
                }
            },
            detailsDataFn(num){
                this.singleDevice.name = this.allNormalCircuit[num].name;
                // this.singleDevice.residualCurrent = num==1?this.allNormalCircuit[num].dataC[0]-0+11:this.allNormalCircuit[num].dataC[0];
                // this.singleDevice.residualCurrentMax = parseInt(this.allNormalCircuit[num].dataC[2]) < this.singleDevice.residualCurrent;
                this.singleDevice.residualCurrent = this.allNormalCircuit[num].dataC[0];
                this.singleDevice.residualCurrentMax = parseInt(this.allNormalCircuit[num].dataC[2]) < this.allNormalCircuit[num].dataC[0];
                this.singleDevice.electricityA = this.allNormalCircuit[num].dataA[0];
                this.singleDevice.electricityAMax = parseInt(this.allNormalCircuit[num].dataA2[0]) < this.allNormalCircuit[num].dataA[0];
                this.singleDevice.electricityB = this.allNormalCircuit[num].dataA[1];
                this.singleDevice.electricityBMax = parseInt(this.allNormalCircuit[num].dataA2[1]) < this.allNormalCircuit[num].dataA[1];
                this.singleDevice.electricityC = this.allNormalCircuit[num].dataA[2];
                this.singleDevice.electricityCMax = parseInt(this.allNormalCircuit[num].dataA2[2]) < this.allNormalCircuit[num].dataA[2];
                this.singleDevice.temperatureA = this.allNormalCircuit[num].dataB[0];
                this.singleDevice.temperatureAMax = parseInt(this.allNormalCircuit[num].dataB2[0]) < this.allNormalCircuit[num].dataB[0];
                this.singleDevice.temperatureB = this.allNormalCircuit[num].dataB[1];
                this.singleDevice.temperatureBMax = parseInt(this.allNormalCircuit[num].dataB2[1]) < this.allNormalCircuit[num].dataB[1];
                this.singleDevice.temperatureC = this.allNormalCircuit[num].dataB[2];
                this.singleDevice.temperatureCMax = parseInt(this.allNormalCircuit[num].dataB2[2]) < this.allNormalCircuit[num].dataB[2];
                this.getCurveData();
            },
            earlyWarningFn(num1, num2) {//计算预警位置
                let data1 = (num1 - 0) ? (num1 - 0) : 0;
                let data2 = (num2 - 0) ? (num2 - 0) : 0;
                if (data1 < data2) {
                    let num = ((data2 / 0.8) - data1) / (data2 / 0.8) * 100;
                    return num + '%';
                } else {
                    return '20%';
                }

            }
        }
    }
</script>

<style scoped lang="less">
  .right-chart1 {
    height: 100%;

    .right-title {
      position: relative;
      margin-bottom: -1px;
      padding: 0 0.6rem 0 0.6rem;
      margin-left: 2px;
      width: calc(100% - 4px);
      height: 40px;
      line-height: 40px;
      background-color: rgba(0, 0, 0, 0.4);

      > i {
        margin-right: 0.6rem;
        font-size: 18px;
      }

      span {
        font-size: 20px;
      }

      .operate-box {
        position: absolute;
        right: 0;
        top: 50%;
        display: table;
        transform: translateY(-50%);

        a {
          display: table-cell;
          border-left: 1px solid rgba(255, 255, 255, 0.2);
          cursor: pointer;

          i {
            padding: 0 0.8rem;
            color: rgba(255, 255, 255, 0.7);
            transition: all 0.25s ease-in-out;
          }

          &:hover i {
            color: rgba(255, 255, 255, 1);
          }
        }
      }
    }

    .abnormal-chart {
      display: inline-block;
      width: 100%;
      height: 507px;

      .abnormal-left {
        display: inline-block;
        width: 30%;
        height: 100%;
      }

      .real-time-current {
        height: calc(33.3% - 7px);
      }

      .real-time-temperature {
        margin-top: 10px;
        height: calc(33.3% - 7px);
      }

      .residual-current {
        margin-top: 10px;
        height: 162px;

        .text {
          position: relative;
          height: 116px;
          font-size: 36px;
          color: #0bedfb;
          background-color: rgba(0, 0, 0, 0.2);

          span {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
          &.active{
            background-color: #A91A20;
          }
        }
      }

      ul {
        display: table;
        width: 100%;
        height: 117px;
        text-align: center;

        li {
          display: table-cell;
          width: 33.3%;
          vertical-align: middle;
          background-color: rgba(0, 0, 0, 0.2);
          border-right: 1px solid rgba(255, 255, 255, 0.1);

          &:nth-child(1) span {
            color: #ffd200;
          }

          &:nth-child(2) span {
            color: #03c70c;
          }

          &:nth-child(3) {
            border: none;

            span {
              color: #f00;
            }
          }

          span {
            font-size: 36px;
          }

          a {
            display: block;
            margin-top: 0.4rem;
            font-size: 1rem;
          }

          &.active{
            background-color: #A91A20;
          }
        }
      }

      .chart-box {
        display: inline-block;
        width: calc(70% - 4px);
        height: 158px;
        vertical-align: top;
        background-color: rgba(0, 0, 0, 0.2);
      }

      .subheading {
        position: relative;
        padding: 0 0.6rem;
        margin-bottom: 1px;
        height: 40px;
        line-height: 40px;
        font-size: 1rem;
        background-color: rgba(0, 0, 0, 0.3);

        i {
          position: absolute;
          right: 0.6rem;
          top: 50%;
          font-size: 1.4rem;
          transform: translateY(-50%);
          color: #f00;
        }
      }
    }

    .normal-chart {
      margin-top: 10px;
      height: 340px;

      .each-box {
        display: inline-block;
        width: 30%;
        height: 100%;
        margin-left: 6px;
        vertical-align: top;

        table {
          display: table;
          width: 100%;
          height: 304px;
          text-align: center;

          tr {
            /*width: 100%;*/
            display: table-row;

            &:nth-child(1) {
              background-color: rgba(0, 0, 0, 0.3);
            }

            td {
              position: relative;
              display: table-cell;
              width: 25%;
              vertical-align: middle;
              font-size: 1rem;
              background-color: rgba(0, 0, 0, 0.2);
              /*border-left: 2px solid rgba(255,255,255,0.1);*/
              /*border-bottom: 2px solid rgba(255,255,255,0.1);*/

              a {
                cursor: auto;

                &.line0 {
                  font-size: 30px;
                  color: #ffd200;
                }

                &.line1 {
                  font-size: 30px;
                  color: #03c70c;
                }

                &.line2 {
                  font-size: 30px;
                  color: #f00;
                }

                &.special {
                  font-size: 30px;
                  color: #0bedfb;
                }
              }

              .progress-bar {
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 6px;
                border-top: 1px solid rgba(43, 133, 228, 0.3);
                border-bottom: 1px solid rgba(43, 133, 228, 0.3);
                box-sizing: border-box;

                .early-warning {
                  position: absolute;
                  right: 0;
                  top: 0;
                  height: 100%;
                  background-color: rgba(255, 210, 0, 0.4);
                  content: '';
                }

                .alarm {
                  position: absolute;
                  right: 0;
                  top: 0;
                  width: 20%;
                  height: 100%;
                  background-color: rgba(255, 0, 0, 0.7);
                  content: '';
                }

                .iconfont {
                  position: absolute;
                  top: -18px;
                  transform: translateX(-50%);
                }
              }
            }
          }
        }

        &:first-child table tr:nth-child(2) td:first-child, &:first-child table tr:nth-child(3) td:first-child, &:first-child table tr:nth-child(4) td:first-child {
          background-color: rgba(0, 0, 0, 0.4);
        }


        &:nth-child(1) {
          margin-left: 0;
          width: calc(40% - 60px);
        }

        .right-title {
          .icon-Popup {
            position: absolute;
            right: 0;
            cursor: pointer;
            color: rgba(255, 255, 255, 0.7);
            transition: all 0.25s ease-in-out;

            &:hover {
              color: rgba(255, 255, 255, 1);
            }
          }

        }
      }

      .switch-btn {
        display: inline-block;
        width: 42px;
        height: 100%;
        font-size: 0;

        a {
          position: relative;
          display: inline-block;
          margin-top: 3px;
          width: 100%;
          height: calc(33% - 2px);
          font-size: 1rem;
          background-color: rgba(0, 0, 0, 0.4);

          .iconfont {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: rgba(255, 255, 255, 0.6);
            transition: all 0.25s ease-in-out;
          }

          &:hover .iconfont {
            color: rgba(255, 255, 255, 1);
            /*transform: translate(-50%,-50%) scale(1.1); !*放大1.1倍*!*/
          }

          &:first-child {
            margin-top: 0;
          }
        }
      }
    }
  }

  .mask-popup {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    /*background-color: rgba(0,0,0,0.5);*/
    z-index: 8888;
  }
</style>
<style>
  .mask-popup .ivu-spin-fix {
    background-color: rgba(255, 255, 255, 0.5);
  }
</style>
