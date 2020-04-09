<!--组织机构管理-->
<template>
    <div class="electric-safety-bg">
        <headNav/>
        <div class="organize-manage-wrap">
            <div class="content">
                <p class="title">所在机构及下属机构管理</p>
                <table>
                    <thead>
                        <th style="width:100px;">序号</th>
                        <th>机构名称</th>
                        <th>负责人</th>
                        <th>联系电话</th>
                        <th>机构人数</th>
                        <th>机构类型</th>
                        <th>所在行业</th>
                        <th>所在地域</th>
                        <th>短信余量</th>
                        <th>创建人</th>
                        <th>创建时间</th>
                        <th>邮箱</th>
                        <th>状态</th>
                        <th style="width:190px;">操作</th>
                    </thead>
                    <tbody>
                        <tr v-for="(item,index) in 20">
                            <td style="width:100px;">{{index+1}}</td>
                            <td class="child parent"><i></i>武商世贸</td>
                            <td>王总</td> 
                            <td>130332323232</td>
                            <td>10000</td>
                            <td>顶级机构</td>
                            <td>租赁和商务</td>
                            <td>湖北省武汉市</td>
                            <td>10000</td>
                            <td>root</td>
                            <td>2018-02-15 12：22</td>
                            <td>wssm@wssm</td>
                            <td>正常使用</td>
                            <td style="width:190px;">
                                <span class="add" @click="addLowerMask = true">添加下级</span>
                                <span class="edit">编辑</span>
                                <span class="del">删除</span>
                            </td>
                        </tr>
                        <!-- <tr class="no-data">暂无数据</tr> -->
                    </tbody>
                </table>
            </div>
            <div class="mask add-lower-mask" v-if="addLowerMask">
                <div class="main">
                    <a href="javascript:;" class="close" @click="addLowerMask = false"></a>
                    <div class="title">添加下级结构</div>
                    <div class="content">
                        <div class="header-img-box">
                            <p class="title-common">设置头像</p>
                            <div class="header-box">
                                <span>设置机构头像：</span>
                                <div class="img-box">
                                    <img :src="picUrl" alt="">
                                    <input type="file" accept="image/*" @change="picUpload">
                                </div>
                            </div>
                        </div>
                        <div class="base-info-box">
                            <div class="title-common">机构基本信息</div>
                            <div class="base-info">
                                <div class="inp-box flex">
                                    <span>上级结构：</span>
                                    <input type="text">
                                </div>
                                <div class="inp-box flex">
                                    <span>机构名称：</span>
                                    <input type="text">
                                </div>
                                <div class="inp-box flex">
                                    <span>机构编码：</span>
                                    <input type="text">
                                </div>
                                <div class="inp-box flex">
                                    <span>大屏展示：</span>
                                    <el-select v-model="bigScreenVal" placeholder="请选择" disabled>
                                        <el-option
                                          v-for="item in bigScreenList"
                                          :key="item.value"
                                          :label="item.label"
                                          :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                            </div>
                        </div>
                        <div class="detail-info-box">
                            <div class="title-common">机构详细信息</div>
                            <div class="detail-info">
                                <div class="inp-box flex">
                                    <span>负责人：</span>
                                    <input type="text">
                                </div>
                                <div class="inp-box flex">
                                    <span>联系电话：</span>
                                    <input type="text">
                                </div>
                                <div class="inp-box flex">
                                    <span>机构人数：</span>
                                    <input type="text">
                                </div>
                                <div class="inp-box flex">
                                    <span>固定电话：</span>
                                    <input type="number">
                                </div>
                                <div class="inp-box flex">
                                    <span>机构类型：</span>
                                    <el-select v-model="organizeTypeVal" placeholder="请选择">
                                        <el-option
                                          v-for="item in organizeTypeList"
                                          :key="item.value"
                                          :label="item.label"
                                          :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                                <div class="inp-box flex">
                                    <span>所在行业：</span>
                                    <el-select v-model="industryVal" placeholder="请选择">
                                        <el-option
                                          v-for="item in industryList"
                                          :key="item.value"
                                          :label="item.label"
                                          :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                                <div class="inp-box flex">
                                    <span>邮箱：</span>
                                    <input type="text" disabled="">
                                </div>
                                <div class="inp-box flex">
                                    <span>邮箱密码：</span>
                                    <el-select v-model="mailVal" placeholder="请选择" disabled>
                                        <el-option
                                          v-for="item in mailList"
                                          :key="item.value"
                                          :label="item.label"
                                          :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                                <div class="inp-box flex">
                                    <span>费率：</span>
                                    <el-select v-model="rateVal" placeholder="请选择" disabled>
                                        <el-option
                                          v-for="item in rateList"
                                          :key="item.value"
                                          :label="item.label"
                                          :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                                <div class="textarea-box flex">
                                    <span>备注：</span>
                                    <textarea name="" id="" cols="30" rows="10"></textarea>
                                </div>
                            </div>
                        </div>
                        <div class="btn-box flex">
                            <div class="cancel-btn" @click="addLowerMask = false">取消</div>
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
        name: "organizeManage",
        data(){
            return{
                addLowerMask:false, // 添加下级弹窗
                picUrl:require('../../../assets/images/file-img.png'),
                picUrlTem:require('../../../assets/images/file-img.png'), // 上传临时展示
                bigScreenList:[], // 大屏展示
                bigScreenVal:"",
                organizeTypeList:[{  // 机构类型
                    value: '机构1',
                    label: '机构1'
                }], 
                organizeTypeVal:"",
                industryList:[{  // 所在行业
                    value: '行业1',
                    label: '行业1'
                }], 
                industryVal:"",
                mailList:[], // 邮箱
                mailVal:"",
                rateList:[], // 费率
                rateVal:""
            }
        },
        components: {
            headNav,
        },
        methods:{
            picUpload(event){   //上传图片
                this.file = event.target.files[0]; // (利用console.log输出看file文件对象)
                console.log(this.file);
                const windowURL = window.URL || window.webkitURL;
                if (this.file) {
                    this.picUrlTem = windowURL.createObjectURL(this.file);
                    this.picUrl = this.picUrlTem;
                }
                 // this.uploadEquipmentImg();
            },
        }
    }
</script>


