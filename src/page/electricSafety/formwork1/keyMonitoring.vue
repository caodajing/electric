<!--重点监测-->
<template>
    <div class="electric-safety-bg">
        <headNav/>
        <div class="key-monitoring-wrap">
            <div class="left-box">
                <p class="title">监测点信息</p>
                <div class="common-box">
                    <div class="title-common" @click="keyWatch = !keyWatch">重点监测<i :class="[keyWatch ? 'top' :'']"></i></div>
                    <ul id="treeDemo" class="ztree" v-show="keyWatch"></ul>
                </div>
                <div class="common-box">
                    <div class="title-common" @click="allWatch = !allWatch">全部<i :class="[allWatch ? 'top' :'','all']"></i></div>
                    <ul id="treeDemo1" class="ztree" v-show="allWatch"></ul>
                </div>
            </div>
            <div class="right-box">
                <div class="title">重点配电节点运行监测</div>
                <div class="content">
                    <div class="dashed-box" v-for="item in 2">
                        <p class="">大客户</p>
                        <div class="solid-box">
                            <div class="box">
                                <div class="each" v-for="item in 10">
                                    <div class="name clearfix">
                                        <i></i>
                                        <span>思域美发</span>
                                    </div>
                                    <div class="A-box common">A相：229.1v  OA 14.3</div>
                                    <div class="B-box common">A相：229.1v  OA 14.3</div>
                                    <div class="C-box common">A相：229.1v  OA 14.3</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import headNav from '../headNav'

    export default {
        name: "keyMonitoring",
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
                keyWatch:true,
                allWatch:false
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
                zTreeObj = $.fn.zTree.init($("#treeDemo1"), setting, vm.zNodes);
            });
        },
    }
</script>
