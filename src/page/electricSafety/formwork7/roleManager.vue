<!--角色管理-->
<template>
    <div class="electric-safety-bg">
        <headNav/>
        <div class="role-manager-wrap">
            <div class="content">
                <div class="title">
                    角色管理
                    <span>增加角色</span>
                </div>
                <table>
                    <thead>
                        <th style="width:85px;">序号</th>
                        <th>角色名</th>
                        <th>超级管理员</th>
                        <th>描述</th>
                        <th style="width:185px;">操作</th>
                    </thead>
                    <tbody>
                        <tr v-for="item,index in 5">
                            <td style="width:85px;">{{index+1}}</td>
                            <td>项目管理员（无配电有计费）</td>
                            <td></td>
                            <td></td>
                            <td style="width:185px;">
                                <span class="edit">编辑</span>
                                <span class="del">删除</span>
                            </td>
                        </tr>
                        <!-- <tr class="no-data">暂无数据</tr> -->
                    </tbody>
                </table>
            </div>
            <div class="mask add-role-mask" v-if="addRoleMask">
                <div class="main">
                    <a href="javascript:;" class="close" @click="addRoleMask = false"></a>
                    <div class="title">添加角色标题</div>
                    <div class="box">
                        <div class="inp-box flex">
                            <span>角色名： </span>
                            <input type="text">
                        </div>
                        <div class="inp-box flex">
                            <span class="span">描述： </span>
                            <input type="text">
                        </div>
                        <div class="tree-box flex">
                            <span class="span">权限分配：</span>
                            <ul id="treeDemo" class="ztree"></ul>
                        </div>
                        <div class="btn-box flex">
                            <div class="cancel-btn" @click="addRoleMask = false">取消</div>
                            <div class="sure-btn">确定添加角色</div>
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
        name: "roleManager",
        data(){
            return{
                addRoleMask:false,
                zNodes:[
                    {name:"系统管理", open:true, children:[
                        {name:"组织机构管理",}, 
                        {name:"角色管理",},
                        {name:"用户管理",}, 
                        {name:"建筑单元管理",}]
                    },
                    {name:"用电安全", open:false,  children:[
                        {name:"安全概况",}, 
                        {name:"重点监测",}]
                    },
                    {name:"能耗概况", open:false,  children:[
                        {name:"机构能耗概况",}]
                    },
                    {name:"回路监控", open:false,  children:[
                        {name:"回路监测",}, 
                        {name:"回路控制",}]
                    },
                    {name:"数据查询", open:false,  children:[
                        {name:"能耗查询",}, 
                        {name:"能耗明细",},
                        {name:"电压电流明细",},
                        {name:"安全用电明细",}]
                    },
                    {name:"能耗收费", open:false,  children:[
                        {name:"test2_1",}, 
                        {name:"test2_2",}]
                    },
                    {name:"事件通知", open:false,  children:[
                        {name:"系统公告",}]
                    },
                    {name:"系统报告", open:false,  children:[
                        {name:"能耗报告",}, 
                        {name:"安全报告",}]
                    }
                ],
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
            var setting = {
                check : {
                    enable : true,
                    chkStyle : "checkbox",    //复选框
                    chkboxType : {
                        "Y" : "s",
                        "N" : "ps"
                    }
                }
            };
           
            $(document).ready(function(){
                zTreeObj = $.fn.zTree.init($("#treeDemo"), setting, vm.zNodes);
            });
            
        },
    }
</script>


