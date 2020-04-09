<!--电压电流明细-->
<template>
    <div class="electric-safety-bg">
        <headNav/>
        <div class="electricity-detailed-wrap voltage-current-wrap">
            <div class="left-box">
                <div class="tree-box">
                    <p class="title">查询条件</p>
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
                <p class="title">
                    <span class="_title">电表电压电流明细数据</span>
                    <span class="time">统计时间：2020年03月06日11:45:12</span>
                </p>
                <table>
                    <thead>
                        <th>序号</th>
                        <th>所在回路</th>
                        <th>时间</th>
                        <th>A相电压</th>
                        <th>A相电流</th>
                        <th>A相功率</th>
                        <th>B相电压</th>
                        <th>B相电流</th>
                        <th>B相功率</th>
                        <th>C相电压</th>
                        <th>C相电流</th>
                        <th>C相功率</th>
                        <th>抄表度数</th>
                    </thead>
                    <tbody>
                        <tr v-for="(item,index) in 40">
                            <td>{{index + 1}}</td>
                            <td>二号变压器总表回路</td>
                            <td>2020-03-03  00:00  </td>
                            <td>248</td>
                            <td>248</td>
                            <td>248</td>
                            <td>248</td>
                            <td>248</td>
                            <td>248</td>
                            <td>248</td>
                            <td>248</td>
                            <td>248</td>
                            <td>248</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import headNav from '../headNav'
    export default {
        name: "electricityDetailed",data(){
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
    }
</script>

