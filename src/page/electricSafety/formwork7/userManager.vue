<!--用户管理-->
<template>
    <div class="electric-safety-bg">
        <headNav/>
        <div class="user-manager-wrap">
            <div class="left-box">
                <div class="tree-box">
                    <p class="title">机构列表</p>
                    <ul id="treeDemo" class="ztree"></ul>
                </div>
            </div>
            <div class="right-box">
                <div class="title">
                    机构下用户列表
                    <span @click="addUserMask = true">新增</span>
                </div>
                <table>
                    <thead>
                        <th>登录名</th>
                        <th>真实姓名</th>
                        <th>机构名称</th>
                        <th>角色名称</th>
                        <th>性别</th>
                        <th>用户地址</th>
                        <th>联系电话</th>
                        <th>用户余额</th>
                        <th>创建人</th>
                        <th>出生日期</th>
                    </thead>
                    <tbody>
                        <tr v-for="item,index in 5">
                            <td>admin</td>
                            <td>dajiing</td>
                            <td>机构</td>
                            <td>role</td>
                            <td>女</td>
                            <td>地址123</td>
                            <td>134232323323</td>
                            <td>343</td>
                            <td>admin</td>
                            <td>1994-08-08</td>
                        </tr>
                        <!-- <tr class="no-data">暂无数据</tr> -->
                    </tbody>
                </table>
            </div>
            <div class="mask add-user-mask" v-if="addUserMask">
                <div class="main">
                    <a href="javascript:;" class="close" @click="addUserMask = false"></a>
                    <div class="title">添加用户</div>
                    <div class="content clearfix">
                        <div class="inp-box flex">
                            <span class="span">登录名：</span>
                            <input type="text">
                        </div>
                        <div class="inp-box flex">
                            <span class="span">真实姓名：</span>
                            <input type="text">
                        </div>
                        <div class="inp-box flex">
                            <span class="span">所属机构：</span>
                            <input type="text">
                        </div>
                        <div class="inp-box flex">
                            <span class="span">联系电话：</span>
                            <input type="number">
                        </div>
                        <div class="inp-box flex">
                            <span class="span">语音电话：</span>
                            <input type="number">
                        </div>
                        <div class="inp-box flex">
                            <span class="span">证件号码：</span>
                            <input type="text">
                        </div>
                        <div class="inp-box flex">
                            <span class="span">性别：</span>
                            <div class="radio-box flex">
                                <el-radio v-model="sexRadio" label="1">男</el-radio>
                                <el-radio v-model="sexRadio" label="2">女</el-radio>
                            </div>
                        </div>
                        <div class="inp-box flex">
                            <span class="span">出生年月：</span>
                            <input type="text">
                        </div>
                        <div class="inp-box flex">
                            <span class="span">创建人：</span>
                            <input type="text">
                        </div>
                        <div class="inp-box flex">
                            <span class="span">邮箱：</span>
                            <input type="text">
                        </div>
                        <div class="inp-box flex">
                            <span class="span">用户地址：</span>
                            <input type="text">
                        </div>
                        <div class="role-box flex">
                            <span class="span">角色：</span>
                            <div class="radio-box flex">
                                <el-radio v-model="roleRadio" label="1">项目管理员（无配电有计费）</el-radio>
                                <el-radio v-model="roleRadio" label="2">武商普通用户</el-radio>
                            </div>
                        </div>
                        <div class="btn-box flex">
                            <div class="cancel-btn" @click="addUserMask = false">取消</div>
                            <div class="sure-btn">确定</div>
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
        name: "userManager",
        data(){
            return{
                addUserMask:false, // 新增用户弹窗
                sexRadio: '1',
                roleRadio: '1', 
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

