<!--回路控制-->
<template>
    <div class="electric-safety-bg">
        <headNav/>
        <div class="loop-control-wrap">
            <div class="tree-box">
                <p class="title">
                    机构能耗
                    <ul>
                        <li class="act">建筑</li>
                        <li>机构</li>
                    </ul>
                </p>
                <ul id="treeDemo" class="ztree"></ul>
            </div>
            <div class="right-box">
                <div class="title">
                    <span>回路控制</span>
                    <div class="btn btn1 green">一层中庭照明全开</div>
                    <div class="btn btn2 orange">一层中庭照明全关</div>
                    <div class="btn btn3 orange">合闸</div>
                    <div class="btn btn4 green">开闸</div>
                    <div class="btn btn5 blue">情景操作日志</div>
                </div>
                <div class="list">
                    <div class="title-list">
                        <label class="checkbox"></label>
                        <span>回路名称</span>
                        <span>回路种类</span>
                        <span>回路相像</span>
                        <span>所属建筑</span>
                        <span>全年能耗</span>
                        <span>本月能耗</span>
                        <span>今日能耗</span>
                        <span class="pull">当前负荷<i></i></span>
                        <span>设备状态</span>
                        <span>上一次控制</span>
                        <span>远程控制</span>
                        <span>操作</span>
                    </div>
                    <ul>
                        <li v-for="item in 20">
                            <label class="checkbox"></label>
                            <div>四层5号照明1</div>
                            <div>照明回路</div>
                            <div>A </div>
                            <div>四层5号井</div>
                            <div>5506.45</div>
                            <div>33.15</div>
                            <div>0.00</div>
                            <div class="process">
                                <div class="box">
                                    <div class="current-val green">
                                        <span>13.8/6(81.8)</span>
                                    </div>
                                </div>
                            </div>
                            <div>离线</div>
                            <div>12</div>
                            <div class="on-off off"><i></i></div>
                            <div class="btn"><i>控制记录</i></div>
                        </li>
                    </ul>
                </div>
                <pagination :pageNum="20" @changePage="getPageLeftCar($event)"></pagination>
            </div>
            <div class="mask controlRecordMask" v-if="controlRecordMask">
                <div class="main">
                    <a href="javascript:;" class="close"></a>
                    <div class="title">控制记录</div>
                    <div class="content">
                       <table>
                           <thead>
                               <th>序号</th>
                               <th>主机名称</th>
                               <th>回路名称</th>
                               <th>设备名称</th>
                               <th>设备铭牌</th>
                               <th>开关动作</th>
                               <th>来源</th>
                               <th>创建时间</th>
                               <th>执行时间</th>
                               <th>执行结果</th>
                               <th>失败原因</th>
                           </thead>
                           <tbody>
                               <tr v-for="(item,index) in 20">
                                   <td>{{index+1}}</td>
                                   <td>1212</td>
                                   <td>12</td>
                                   <td>12</td>
                                   <td>12</td>
                                   <td>12</td>
                                   <td>12</td>
                                   <td>12</td>
                                   <td>12</td>
                                   <td>12</td>
                                   <td>12</td>
                               </tr>
                           </tbody>
                       </table>
                    </div>
                    <div class="pagination-box">
                        <span class="btn-prev">上一页</span>
                        <span class="btn-next">下一页</span>
                        <div class="inp-box clearfix">
                            <span>每页</span>
                            <input type="number">
                            <span>条</span>
                        </div>
                        <div class="inp-box clearfix">
                            <span>第</span>
                            <input type="number">
                            <span>页</span>
                        </div>
                        <span class="total-page">共28页</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import headNav from '../headNav'
    import pagination from '../../../components/pagination'
    export default {
        name: "loopControl",
        data(){
            return{
                controlRecordMask:false, // 控制记录
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
            pagination
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
        }
    }
</script>


