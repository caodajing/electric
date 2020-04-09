<!--回路监控-->
<template>
    <div class="electric-safety-bg">
        <headNav/>
        <div class="loop-monitoring-wrap">
            <div class="left-box">
                <div class="tree-box">
                    <p class="title">能耗监测</p>
                    <div class="time-box">
                        <el-date-picker
                          v-model="date"
                          type="daterange"
                          range-separator=""
                          start-placeholder="开始时间"
                          format="yyyy-MM-dd"
                          end-placeholder="结束时间">
                        </el-date-picker>
                    </div>
                    <ul id="treeDemo" class="ztree"></ul>
                </div>
                <div class="history-list">
                    <p class="title">历史能耗监测记录</p>
                    <div class="con-list">
                        <div class="title-list">
                            <span>机构名称</span>
                            <span>建筑名称</span>
                            <span>回路名称</span>
                        </div>
                        <ul>
                            <li v-for="item in 10" class="clearfix">
                                <span>一层武商网柜台</span>
                                <span>世贸广场一层 </span>
                                <span>一层1号照明</span>
                            </li>
                            
                        </ul>
                    </div>
                </div>
            </div>
            <div class="right-box">
                <div class="top-box">
                    <div class="title-list">
                        <span>回路名称</span>
                        <span>回路类型</span>
                        <span>全年能耗</span>
                        <span>全年占比</span>
                        <span>本月能耗</span>
                        <span>本月占比</span>
                        <span>今日能耗</span>
                        <span>今日占比</span>
                        <span>监测起码</span>
                        <span>监测止码</span>
                        <span>监测能耗</span>
                    </div>
                    <ul>
                        <li v-for="item in 10">
                            <span>一层enzo柜台</span>
                            <span>照明回路</span>
                            <span>全年能耗</span>
                            <span>6635.92</span>
                            <span> 0.00%</span>
                            <span> 207.6</span>
                            <span> 0.00%</span>
                            <span>10.98 </span>
                            <span>0.00%</span>
                            <span>4814.34</span>
                            <span>4814.34</span>
                        </li>
                    </ul>
                </div>
                <div class="bottom-box">
                    <p class="title">
                        <i></i>
                        能耗统计曲线图
                        <ul>
                            <li class="act">24H</li>
                            <li>7D</li>
                            <li>1M</li>
                            <li>1Y</li>
                            <li>2Y</li>
                        </ul>
                    </p>
                    <div class="category-echart" id="category-echart"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import headNav from '../headNav'
    // 引入基本模板
    let echarts = require('echarts/lib/echarts');
    export default {
        name: "loopMonitoring",
        data(){
            return{
                zNodes:[
                    {name:"test1", open:true, icon: require('../../../assets/images/tree-icon2.png'),children:[
                        {name:"test1_1",icon: require('../../../assets/images/tree-icon3.png')}, 
                        {name:"test1_2",icon: require('../../../assets/images/tree-icon3.png')}]
                    },
                    {name:"test2", open:true, icon: require('../../../assets/images/tree-icon2.png'), children:[
                        {name:"test2_1",icon: require('../../../assets/images/tree-icon3.png')}, 
                        {name:"test2_2",icon: require('../../../assets/images/tree-icon3.png')}]
                    },
                    {name:"test2", open:true, icon: require('../../../assets/images/tree-icon2.png'), children:[
                        {name:"test2_1",icon: require('../../../assets/images/tree-icon3.png')}, 
                        {name:"test2_2",icon: require('../../../assets/images/tree-icon3.png')}]
                    },
                    {name:"test2", open:true, icon: require('../../../assets/images/tree-icon2.png'), children:[
                        {name:"test2_1",icon: require('../../../assets/images/tree-icon3.png')}, 
                        {name:"test2_2",icon: require('../../../assets/images/tree-icon3.png')}]
                    }
                ],
                date:""
            }
        },
        components: {
            headNav,
        },
        mounted(){
            let vm = this;

            // ----------------------创建树状图

            var zTreeObj;
            // zTree 的参数配置，深入使用请参考 API 文档（setting 配置详解）
            var setting = {};
           
            $(document).ready(function(){
                console.log(vm.zNodes)
                zTreeObj = $.fn.zTree.init($("#treeDemo"), setting, vm.zNodes);
            });
            
            // 折线图
            vm.create_category_echart('category-echart');
        },
        methods:{
            create_category_echart(obj){ // 折线图
                let myChart = echarts.init(document.getElementById(obj));
                let option = {
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
                        itemGap: 65,
                        data: ['总能耗','空调回路','照明回路','其他'],
                        bottom: '10px',
                        left: 'center',
                        textStyle: {
                            fontSize: 16,
                            color: '#fff'
                        }
                    },
                    grid: {
                        bottom: '60px',
                        left: '50px'
                    },
                    xAxis: [{
                        type: 'category',
                        boundaryGap: true,
                        axisLine: {
                            lineStyle: {
                                color: '#57617B'
                            }
                        },
                        axisLabel: {
                            // interval: this.intervalX,
                            show: true,
                            textStyle: {
                                color: '#fff',
                                fontSize: 14
                            }
                        },
                        axisPointer: {
                            type: 'shadow'
                        },
                        data: [1,2,3,4,5,6,7,8]
                    }],
                    yAxis: [{
                        type: 'value',
                        name: '',
                        nameTextStyle: {
                            color: '#fff',
                            fontSize: 14,
                            padding: [20, 0, 0, -40]
                        },
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            show: false,
                        },
                        axisLabel: {
                            margin: 16,
                            textStyle: {
                                color: "#fff",
                                fontSize: 14
                            }
                        },
                        splitLine: {
                            lineStyle: {
                                color: "rgba(255,255,255,0.1)",
                            }
                        }
                    }],
                    series: [{
                        name: '空调回路',
                        type: 'line',
                        smooth: true,
                        lineStyle: {
                            normal: {
                                width: 2,
                                color: "#dd870d",
                            }
                        },
                        symbol: 'circle',
                        symbolSize: 8,
                        itemStyle: {
                            normal: {
                                color: '#dd870d',
                                // borderColor: 'blue', //拐点边框颜色
                            }
                        },
                        data: [120, 132, 101, 134, 90, 230, 210,90]
                    }, 
                    {
                        name: '照明回路',
                        type: 'line',
                        smooth: true,
                        lineStyle: {
                            normal: {
                                width: 2,
                                color: '#ff0707'
                            }
                        },
                        symbol: 'circle',
                        symbolSize: 8,
                        itemStyle: {
                            normal: {
                                color: '#ff0707',
                                // borderColor: 'blue', //拐点边框颜色
                            }
                        },
                        data: [150, 232, 201, 154, 190, 330, 410,90]
                    }, 
                    {
                        name: '其他',
                        type: 'line',
                        smooth: true,
                        lineStyle: {
                            normal: {
                                width: 2,
                                color: '#02eb02'
                            }
                        },
                        symbol: 'circle',
                        symbolSize: 8,
                        itemStyle: {
                            normal: {
                                color: '#02eb02',
                                // borderColor: 'blue', //拐点边框颜色
                            }
                        },
                        data: [320, 332, 301, 334, 390, 330, 320,90]
                    },
                    {
                        name: '总能耗',
                        type: 'bar',
                        itemStyle:{
                            barBorderRadius: [40,40,0,0]
                        },
                        color:"#1e74e3",
                        data: [200, 132, 181, 264, 198, 281, 320,90]
                    }]

                };
                myChart.setOption(option);
            }
        }
    }
</script>

