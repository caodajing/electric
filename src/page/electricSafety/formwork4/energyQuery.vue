<!--能耗查询-->
<template>
    <div class="electric-safety-bg">
        <headNav/>
        <div class="energy-query-wrap">
            <div class="left-box">
                <div class="tree-box">
                    <p class="title">月度能耗统计</p>
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
            </div>
            <div class="right-box">
                <div class="top-box">
                    <p class="title">
                        <span class="_title">武商世贸月度能耗统计报表</span>
                        <span class="time">统计时间：2020年03月06日11:45:12</span>
                    </p>
                    <table>
                        <thead>
                            <th>月度</th>
                            <th>本月能耗</th>
                            <th>本月同比</th>
                            <th>本月占比</th>
                            <th>年度能耗</th>
                            <th>年度排名</th>
                        </thead>
                        <tbody>
                            <tr v-for="item in 20">
                                <td>202003</td>
                                <td>1332.01</td>
                                <td>-99.67</td>
                                <td>0.4%</td>
                                <td>20665.54</td>
                                <td>3</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="bottom-box">
                    <ul class="filter-list">
                        <li class="act">分区域能耗统计报表</li>
                        <li>分用电类型能耗统计报表</li>
                        <li>全部设备能耗统计报表</li>
                    </ul>
                    <p class="title">
                        <span class="_title">武商世贸 202003月度 分区域能耗</span>
                        <span class="time">统计时间：2020年03月06日11:45:12</span>
                    </p>
                    <table>
                        <thead>
                            <th>区域</th>
                            <th>本月能耗</th>
                            <th>本月同比</th>
                            <th>本月占比</th>
                            <th>本月排名</th>
                            <th>年度能耗</th>
                            <th>年度同比</th>
                            <th>年度占比</th>
                            <th>年度排名</th>
                        </thead>
                        <tbody>
                            <tr v-for="item in 20">
                                <td>202003</td>
                                <td>1332.01</td>
                                <td>-99.67</td>
                                <td>0.4%</td>
                                <td>20665.54</td>
                                <td>0.4%</td>
                                <td>20665.54</td>
                                <td>121.54</td>
                                <td>3</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import headNav from '../headNav'
    export default {
        name: "energyQuery",
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
        },
        methods:{

        }
    }
</script>

