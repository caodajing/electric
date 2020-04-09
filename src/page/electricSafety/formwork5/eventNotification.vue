<!--事件通知-系统公告-->
<template>
    <div class="electric-safety-bg">
        <headNav/>
        <div class="event-notification-wrap">
            <div class="left-box">
                <div class="top-box">
                    <p class="title">警告事件（<span>未处理</span> / 总数）</p>
                    <ul>
                        <li v-for="item in 20">电流（<span>27856</span> / 27947）</li>
                    </ul>
                </div>
                <div class="bottom-box">
                    <p class="title">隐患处置</p>
                    <ul>
                        <li v-for="item in 20">派发记录（27947）</li>
                    </ul>
                </div>
            </div>
            <div class="right-box">
                <div class="content">
                    <p class="title">
                        <span class="_title">武商世贸月度能耗账单汇总表</span>
                        <span class="time">统计时间：2020年03月10日</span>
                    </p>
                    <table>
                        <thead>
                            <th style="width:75px;">序号</th>
                            <th style="width:160px;">日期时间</th>
                            <th style="width:80px;">警告类型</th>
                            <th style="width:200px;">标题</th>
                            <th>警告内容</th>
                            <th style="width:110px;">处理状态</th>
                        </thead>
                        <tbody>
                            <tr v-for="(item,index) in 20">
                                <td style="width:75px;">{{index+1}}</td>
                                <td style="width:160px;">2020-02-19 13:45:56 </td>
                                <td style="width:80px;">事件</td>
                                <td style="width:200px;">四层4号井的四层4号照明...</td>
                                <td>四层4号井的四层4号照明2上四层4号井照明2181102000665监测到电流为12.65A，达到该回路额定电流...</td>
                                <td style="width:110px;"> 
                                    <span class="dispatch" @click="dispatchMask = true">派单</span>
                                    <span class="sure" @click="sureMask = true">确认</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <pagination :pageNum="20" @changePage="getPageLeftCar($event)"></pagination>
            </div>
            <div class="mask dispatch-mask" v-if="dispatchMask">
                <div class="main">
                    <a href="javascript:;" class="close" @click="dispatchMask = false"></a>
                    <div class="title">用电安全隐患处置派工单</div>
                    <div class="content">
                        <p class="number">任务编号：  Y0811802010211125625</p>
                        <div class="textarea-box">
                            <span>任务内容：</span>
                            <textarea name="" id="" cols="30" rows="10"></textarea>
                        </div>
                        <div class="inp-box">
                            <span>派单对象：</span>
                            <el-select v-model="dispatchVal" placeholder="请选择">
                                <el-option
                                  v-for="item in dispatchList"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value">
                                </el-option>
                          </el-select>
                        </div>
                        <div class="inp-box">
                            <span>处置期限：</span>
                            <el-select v-model="dispatchVal" placeholder="请选择">
                                <el-option
                                  v-for="item in dispatchList"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value">
                                </el-option>
                          </el-select>
                        </div>
                        <div class="btn-box flex">
                            <div class="cancel-btn" @click="dispatchMask = false">取消</div>
                            <div class="dispatch-btn">派单</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mask sure-mask" v-if="sureMask">
                <div class="main">
                   <a href="javascript:;" class="close" @click="sureMask = false"></a>
                   <div class="title">完善处理备注信息</div>
                   <div class="content">
                       <div class="textarea-box">
                            <span>备注：</span>
                            <textarea name="" id="" cols="30" rows="10"></textarea>
                        </div>
                        <div class="btn-box flex">
                            <div class="cancel-btn" @click="sureMask = false">取消</div>
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
import pagination from '../../../components/pagination'
export default {
    name: "eventNotification",
    data(){
        return{
            dispatchMask:false,
            sureMask:false,
            dispatchList: [{
                value: '选项1',
                label: '黄金糕'
            }, 
            {
                value: '选项2',
                label: '双皮奶'
            }, 
            {
                value: '选项3',
                label: '蚵仔煎'
            }, 
            {
                value: '选项4',
                label: '龙须面'
            }, 
            {
                value: '选项5',
                label: '北京烤鸭'
            }],
            dispatchVal: ''
        }
    },
    components: {
        headNav,
        pagination
    },
}
</script>

