<!--耗能概况-->
<template>
    <div class="electric-safety-bg">
        <headNav/>
        <div class="consume-energy-wrap">
            <div class="tree-box">
                <p class="title">机构能耗</p>
                <ul id="treeDemo" class="ztree"></ul>
            </div>
            <div class="right-box">
                <div class="top-box">
                    <div class="box1">
                        <p class="title">年度能耗概况</p>
                        <div class="month-energy-box common">
                            <p>本月能耗<span>1238</span><i>kw-h</i></p>
                            <p>能耗同比：<label>0.121212121212</label></p>
                            <p>单位能耗：<label>0.0030222919021565㎡</label></p>
                            <p>节能指数：<label>-408194.41级，优</label></p>
                            <p>累计减排：<label>164910.54t</label></p>
                        </div>
                        <div class="year-energy-box common">
                            <p>年度能耗<span>1238</span><i>kw-h</i></p>
                            <p>能耗同比：<label>0.121212121212</label></p>
                            <p>单位能耗：<label>0.0030222919021565㎡</label></p>
                            <p>节能指数：<label>-408194.41级，优</label></p>
                            <p>累计减排：<label>164910.54t</label></p>
                        </div>
                    </div>
                    <div class="box2">
                        <p class="title"><i></i>本月分项能耗比例</p>
                        <div class="echart-box" >
                            <div id="month-echart1"></div>
                        </div>
                    </div>
                    <div class="box3 box2">
                        <p class="title"><i></i>本月机构能耗比例</p>
                        <div class="echart-box">
                            <div id="month-echart2"></div>
                        </div>
                    </div>
                    <div class="box4">
                        <p class="title">
                            <i></i>一周能耗排名
                            <ul class="clearfix">
                                <li class="act">设备</li>
                                <li>机构</li>
                            </ul> 
                        </p>
                        <ul class="con">
                            <li v-for="item in 10">
                                <img src="../../../assets/images/jiantou-down.png" alt="" class="down">
                                <!-- <img src="../../../assets/images/jiantou-right.png" alt="" class="right"> -->
                                <span>半秋山普通用电</span>
                                <span>931.5kw/h</span>
                            </li>
                        </ul>
                    </div>
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
    // 引入基本模板
    let echarts = require('echarts/lib/echarts');
    // 引入饼状图组件
    require('echarts/lib/chart/pie')
    import headNav from '../headNav'

    export default {
        name: "consumeEnergy",
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
                ]
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

            // ----------------------创建扇形图
            // 本月分项能耗比例
            vm.create_pie_echart('month-echart1',['照明回路', '空调回路', '其他'],['#ff0707','#dd870d','#02eb02'],
                [
                    {
                        name: '本月分项能耗比例',
                        type: 'pie',
                        radius: '85%',
                        center: ['50%', '50%'],
                        label:{
                            show:false
                        },
                        data: [
                            {value: 335, name: '照明回路'},
                            {value: 310, name: '空调回路'},
                            {value: 234, name: '其他'}
                        ],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            );
            // 本月机构能耗比例
            vm.create_pie_echart('month-echart2',['半秋山', '秀玉2', '茶港','U顶冒菜'],['#ff0707','#dd870d','#02eb02','#0ad6e3'],
                [
                    {
                        name: '本月机构能耗比例',
                        type: 'pie',
                        radius: '85%',
                        center: ['50%', '50%'],
                        label:{
                            show:false
                        },
                        data: [
                            {value: 335, name: '半秋山'},
                            {value: 310, name: '秀玉2'},
                            {value: 234, name: '茶港'},
                            {value: 234, name: 'U顶冒菜'}
                        ],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            );
            vm.create_category_echart('category-echart');
            
        },
        methods:{
            create_pie_echart(obj,legendData,color,series){  // 饼状图
                let myChart = echarts.init(document.getElementById(obj));
                // 指定图表的配置项和数据
                let option = {
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)'
                    },
                    legend: {
                        orient: 'vertical',
                        bottom: 'bottom',
                        data: legendData,
                        textStyle:{
                            color:"#fff"
                        },
                        itemWidth: 14,
                        itemHeight: 14,
                        itemGap: 10
                    },
                    color:color,
                    series: series
                };

                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
            },
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

<style scoped lang="less">
    .consume-energy {
        font-size: 40px;
    }
</style>
