<template  >
  <div style="margin:10px;overflow-y:auto;height:92vh">
    <Row>
      <Col span="4">
        <div class="topstyle">报警中心</div>
        <div class="bottomstyle">操作人员：{{ userName }}</div>
      </Col>
    </Row>
    <Row >
      <Col span="24" >
        <Tabs value="name1" @on-click="tabClick" style="min-height:50vh">
            <TabPane :label="label1" name="name1" >
              <div style="margin-bottom:10px">
                <DatePicker type="date" v-model="startTime" placeholder="起始日期" style="width: 120px"></DatePicker>
                <DatePicker type="date" v-model="endTime" placeholder="结束日期" style="width: 120px"></DatePicker>
                <Select v-model="alarmType" placeholder="报警类型" style="width: 120px">
                  <Option value="">全部</Option>
                  <Option value="火警">火警</Option>
                  <Option value="预警">预警</Option>
                  <Option value="联动">联动</Option>
                  <Option value="反馈">反馈</Option>
                  <Option value="监管">监管</Option>
                  <Option value="故障">故障</Option>
                  <Option value="屏蔽">屏蔽</Option>
                </Select>
                <Select v-model="deviceTypeName" placeholder="设备类型" style="width: 120px">
                  <Option v-for="(item, index) in deviceList" :value="item.id" :key="index">{{item.zigbee_device_type_name}}</Option>
                </Select>
                <Select v-model="status" placeholder="当前状态" style="width: 120px">
                  <Option value="">全部</Option>
                  <Option value="1">未处置</Option>
                  <Option value="2">已处置</Option>
                </Select>
                <Input v-model="Loop" placeholder="回路"  style="width: 100px"></Input>
                <Input v-model="node" placeholder="节点"  style="width: 100px"></Input>
                <Button type="primary" @click="getTableData()">搜索</Button>
                <Button type="info" @click="oneKeyDisposal('')" v-show="processAuth == 'true'">一键处置</Button>
              </div>
              <Table border :columns="columns1" :data="data1" :loading="loading">
                <template slot-scope="{ row }" slot="action">
                  <Button type="primary" v-show="row.status==1 && processAuth == 'true'" @click="updataBtn(row)">处置</Button>
                </template>
              </Table>
              <div style="margin: 10px;overflow: hidden">
                <div style="float: right;">
                  <Page :total="totalData1" :pageSize="10" :current.sync="currentPage" show-total @on-change="changePage1"></Page>
                </div>
              </div>
            </TabPane>
            <TabPane :label="label2" name="name2">
              <div style="margin-bottom:10px">
                <DatePicker type="date" v-model="startTime" placeholder="起始日期" style="width: 120px"></DatePicker>
                <DatePicker type="date" v-model="endTime" placeholder="结束日期" style="width: 120px"></DatePicker>
                <Select v-model="alarmType" placeholder="报警类型" style="width: 120px">
                  <Option value="">全部</Option>
                  <Option value="火警">火警</Option>
                  <Option value="预警">预警</Option>
                  <Option value="联动">联动</Option>
                  <Option value="反馈">反馈</Option>
                  <Option value="监管">监管</Option>
                  <Option value="故障">故障</Option>
                  <Option value="屏蔽">屏蔽</Option>
                </Select>
                <Select v-model="deviceTypeName" placeholder="设备类型" style="width: 120px">
                  <Option v-for="(item, index) in deviceList" :value="item.id" :key="index">{{item.zigbee_device_type_name}}</Option>
                </Select>
                <Select v-model="status" placeholder="当前状态" style="width: 120px">
                  <Option value="">全部</Option>
                  <Option value="1">未处置</Option>
                  <Option value="2">已处置</Option>
                </Select>
                <Input v-model="Loop" placeholder="回路"  style="width: 100px"></Input>
                <Input v-model="node" placeholder="节点"  style="width: 100px"></Input>
                <Button type="primary" @click="getTableData()">搜索</Button>
                <Button type="info" @click="oneKeyDisposal('火警')" v-show="processAuth == 'true'">一键处置</Button>
              </div>
              <Table border :columns="columns1" :data="data1">
                <template slot-scope="{ row }" slot="action">
                  <Button type="primary" v-show="row.status==1 && processAuth == 'true'" @click="updataBtn(row)">处置</Button>
                </template>
              </Table>
              <div style="margin: 10px;overflow: hidden">
                <div style="float: right;">
                  <Page :total="totalData1" :pageSize="10" :current.sync="currentPage" show-total @on-change="changePage1"></Page>
                </div>
              </div>
            </TabPane>
            <TabPane :label="label3" name="name3"></TabPane>
            <TabPane :label="label4" name="name4"></TabPane>
            <TabPane :label="label5" name="name5">
              <div style="margin-bottom:10px">
                <DatePicker type="date" v-model="startTime" placeholder="起始日期" style="width: 120px"></DatePicker>
                <DatePicker type="date" v-model="endTime" placeholder="结束日期" style="width: 120px"></DatePicker>
                <Select v-model="alarmType" placeholder="报警类型" style="width: 120px">
                  <Option value="">全部</Option>
                  <Option value="火警">火警</Option>
                  <Option value="预警">预警</Option>
                  <Option value="联动">联动</Option>
                  <Option value="反馈">反馈</Option>
                  <Option value="监管">监管</Option>
                  <Option value="故障">故障</Option>
                  <Option value="屏蔽">屏蔽</Option>
                </Select>
                <Select v-model="deviceTypeName" placeholder="设备类型" style="width: 120px">
                  <Option v-for="(item, index) in deviceList" :value="item.id" :key="index">{{item.zigbee_device_type_name}}</Option>
                </Select>
                <Select v-model="status" placeholder="当前状态" style="width: 120px">
                  <Option value="">全部</Option>
                  <Option value="1">未处置</Option>
                  <Option value="2">已处置</Option>
                </Select>
                <Input v-model="Loop" placeholder="回路"  style="width: 100px"></Input>
                <Input v-model="node" placeholder="节点"  style="width: 100px"></Input>
                <Button type="primary" @click="getTableData()">搜索</Button>
                <Button type="info" @click="oneKeyDisposal('反馈')" v-show="processAuth == 'true'">一键处置</Button>
              </div>
              <Table border :columns="columns1" :data="data1">
                <template slot-scope="{ row }" slot="action">
                  <Button type="primary" v-show="row.status==1 && processAuth == 'true'" @click="updataBtn(row)">处置</Button>
                </template>
              </Table>
              <div style="margin: 10px;overflow: hidden">
                <div style="float: right;">
                  <Page :total="totalData1" :pageSize="10" :current.sync="currentPage" show-total @on-change="changePage1"></Page>
                </div>
              </div>
            </TabPane>
            <TabPane :label="label6" name="name6">
              <div style="margin-bottom:10px">
                <DatePicker type="date" v-model="startTime" placeholder="起始日期" style="width: 120px"></DatePicker>
                <DatePicker type="date" v-model="endTime" placeholder="结束日期" style="width: 120px"></DatePicker>
                <Select v-model="alarmType" placeholder="报警类型" style="width: 120px">
                  <Option value="">全部</Option>
                  <Option value="火警">火警</Option>
                  <Option value="预警">预警</Option>
                  <Option value="联动">联动</Option>
                  <Option value="反馈">反馈</Option>
                  <Option value="监管">监管</Option>
                  <Option value="故障">故障</Option>
                  <Option value="屏蔽">屏蔽</Option>
                </Select>
                <Select v-model="deviceTypeName" placeholder="设备类型" style="width: 120px">
                  <Option v-for="(item, index) in deviceList" :value="item.id" :key="index">{{item.zigbee_device_type_name}}</Option>
                </Select>
                <Select v-model="status" placeholder="当前状态" style="width: 120px">
                  <Option value="">全部</Option>
                  <Option value="1">未处置</Option>
                  <Option value="2">已处置</Option>
                </Select>
                <Input v-model="Loop" placeholder="回路"  style="width: 100px"></Input>
                <Input v-model="node" placeholder="节点"  style="width: 100px"></Input>
                <Button type="primary" @click="getTableData()">搜索</Button>
                <Button type="info" @click="oneKeyDisposal('监管')" v-show="processAuth == 'true'">一键处置</Button>
              </div>
              <Table border :columns="columns1" :data="data1">
                <template slot-scope="{ row }" slot="action">
                  <Button type="primary" v-show="row.status==1 && processAuth == 'true'" @click="updataBtn(row)">处置</Button>
                </template>
              </Table>
              <div style="margin: 10px;overflow: hidden">
                <div style="float: right;">
                  <Page :total="totalData1" :pageSize="10" :current.sync="currentPage" show-total @on-change="changePage1"></Page>
                </div>
              </div>
            </TabPane>
            <TabPane :label="label7" name="name7">
              <div style="margin-bottom:10px">
                <DatePicker type="date" v-model="startTime" placeholder="起始日期" style="width: 120px"></DatePicker>
                <DatePicker type="date" v-model="endTime" placeholder="结束日期" style="width: 120px"></DatePicker>
                <Select v-model="alarmType" placeholder="报警类型" style="width: 120px">
                  <Option value="">全部</Option>
                  <Option value="火警">火警</Option>
                  <Option value="预警">预警</Option>
                  <Option value="联动">联动</Option>
                  <Option value="反馈">反馈</Option>
                  <Option value="监管">监管</Option>
                  <Option value="故障">故障</Option>
                  <Option value="屏蔽">屏蔽</Option>
                </Select>
                <Select v-model="deviceTypeName" placeholder="设备类型" style="width: 120px">
                  <Option v-for="(item, index) in deviceList" :value="item.id" :key="index">{{item.zigbee_device_type_name}}</Option>
                </Select>
                <Select v-model="status" placeholder="当前状态" style="width: 120px">
                  <Option value="">全部</Option>
                  <Option value="1">未处置</Option>
                  <Option value="2">已处置</Option>
                </Select>
                <Input v-model="Loop" placeholder="回路"  style="width: 100px"></Input>
                <Input v-model="node" placeholder="节点"  style="width: 100px"></Input>
                <Button type="primary" @click="getTableData()">搜索</Button>
                <Button type="info" @click="oneKeyDisposal('故障')" v-show="processAuth == 'true'">一键处置</Button>
              </div>
              <Table border :columns="columns1" :data="data1">
                <template slot-scope="{ row }" slot="action">
                  <Button type="primary" v-show="row.status==1 && processAuth == 'true'" @click="updataBtn(row)">处置</Button>
                </template>
              </Table>
              <div style="margin: 10px;overflow: hidden">
                <div style="float: right;">
                  <Page :total="totalData1" :pageSize="10" :current.sync="currentPage" show-total @on-change="changePage1"></Page>
                </div>
              </div>
            </TabPane>
            <TabPane :label="label8" name="name8">

            </TabPane>
        </Tabs>
      </Col>
    </Row>
  </div>
</template>

<script>
import { getCookie } from '../assets/js/cookie.js'
export default {
  name: 'alarm-center',
  data() {
    return {
      processAuth: decodeURIComponent(getCookie("processAuth")),
      userName: decodeURIComponent(getCookie('username')),
      startTime: '',
      endTime: '',
      alarmType: '',
      deviceTypeName: '',
      status: '',
      Loop: '',
      node: '',
      label1: (h) => {
        let vm = this;
          return h('div', [
              h('span', '全部'),
              h('Badge', {
                  props: {
                      count: vm.count1
                  }
              })
          ])
      },
      label2: (h) => {
        let vm = this;
          return h('div', [
              h('span', '火警'),
              h('Badge', {
                  props: {
                      count: vm.count2
                  }
              })
          ])
      },
      label3: (h) => {
        let vm = this;
          return h('div', [
              h('span', '预警'),
              h('Badge', {
                  props: {
                      count: vm.count3
                  }
              })
          ])
      },
      label4: (h) => {
        let vm = this;
          return h('div', [
              h('span', '联动'),
              h('Badge', {
                  props: {
                      count: vm.count4
                  }
              })
          ])
      },
      label5: (h) => {
        let vm = this;
          return h('div', [
              h('span', '反馈'),
              h('Badge', {
                  props: {
                      count: vm.count5
                  }
              })
          ])
      },
      label6: (h) => {
        let vm = this;
          return h('div', [
              h('span', '监管'),
              h('Badge', {
                  props: {
                      count: vm.count6
                  }
              })
          ])
      },
      label7: (h) => {
        let vm = this;
          return h('div', [
              h('span', '故障'),
              h('Badge', {
                  props: {
                      count: vm.count7
                  }
              })
          ])
      },
      label8: (h) => {
        let vm = this;
          return h('div', [
              h('span', '屏蔽'),
              h('Badge', {
                  props: {
                      count: vm.count8
                  }
              })
          ])
      },
      columns1: [
        {key: 'id', title: '记录编号', align: 'center'},
        {key: 'alarmType', title: '报警类型', align: 'center'},
        {key: 'deviceCode', title: '地址', align: 'center'},
        {key: 'deviceTypeName', title: '设备类型', align: 'center'},
        {key: 'deviceName', title: '设备描述', align: 'center'},
        {key: 'status', title: '当前状态', align: 'center',
          render(h, params) {
            if (params.row.status == 1){
              return h('div',
              {
                style:{
                  color: 'red'
                }
              },'未处置')
            }
            if (params.row.status == 2){
              return h('div','已处置')
            }
          },
        },
        {key: 'createTimeToDate', title: '报警日期', align: 'center'},
        {key: 'createTimeToTime', title: '报警时间', align: 'center'},
        {key: 'processTimeToDate', title: '处置日期', align: 'center'},
        {key: 'processTimeToTime', title: '处置时间', align: 'center'},
        {key: 'processName', title: '处理人', align: 'center'},
        {key: 'remark', title: '备注', align: 'center'},
        {slot: 'action', title: '操作', align: 'center'}
      ],
      data1: [],
      totalData1: 0,
      currentPage: 1,
      count1: 0,
      count2: 0,
      count3: 0,
      count4: 0,
      count5: 0,
      count6: 0,
      count7: 0,
      count8: 0,
      deviceList: [],
      loading: false
    };
  },
  created() {
    this.getTableData();
    this.getAlarmGroupByAlarmType();
    this.getDeviceList();
  },
  methods: {
    changePage1(index) {
      this.getTableData(index);
    },
    getTableData(e) {
      this.currentPage = e?e:1;
      this.loading = true;
      let dayjs = require('dayjs');
      let startTime = this.startTime?dayjs(new Date(this.startTime)).format('YYYY-MM-DD HH:mm:ss'):'';
      let endTime = this.endTime?dayjs(new Date(this.endTime)).format('YYYY-MM-DD HH:mm:ss'):'';

      this.$ajax.get('/zigbee/selectAlarmList',
          {
            params: {
              startTime: startTime==""?null:startTime,
              endTime: endTime==""?null:endTime,
              alarmType: this.alarmType==""?null:this.alarmType,
              node: this.node==""?null:this.node,
              deviceTypeId: this.deviceTypeName==""?null:this.deviceTypeName,
              status: this.status==""?null:this.status,
              pageSize:10,
              pageNum:e?e:1
            }
          },
        ).then((res) => {
          this.loading = false;
        if (res.data.code == 200) {
          this.totalData1 = res.data.total;
          this.data1 = res.data.data;
        }else{
          this.data1 = [];
          this.totalData1 = 0;
        }
      })
    },
    getAlarmGroupByAlarmType() {
      this.$ajax.get('/zigbee/selectAlarmGroupByAlarmType',
        {
          params:{
            alarmHostNumber: getCookie("alarmHostNumber")
          }
        }
      ).then((res) => {
        if (res.data.code == 200) {
          this.count5 = 0;
          this.count1 = 0;
          this.count8 = 0;
          this.count7 = 0;
          this.count2 = 0;
          this.count6 = 0;
          for (let i = 0; i < res.data.data.length; i++) {
            if(res.data.data[i].alarmType == "反馈"){
              this.count5 = res.data.data[i].alarmTypeCount;
            }
            if(res.data.data[i].alarmType == "全部"){
              this.count1 = res.data.data[i].alarmTypeCount;
            }
            if(res.data.data[i].alarmType == "屏蔽_隔离"){
              this.count8 = res.data.data[i].alarmTypeCount;
            }
            if(res.data.data[i].alarmType == "故障"){
              this.count7 = res.data.data[i].alarmTypeCount;
            }
            if(res.data.data[i].alarmType == "火警"){
              this.count2 = res.data.data[i].alarmTypeCount;
            }
            if(res.data.data[i].alarmType == "监管"){
              this.count6 = res.data.data[i].alarmTypeCount;
            }

          }
        }
      })
    },
    updataBtn(data) {
      let params = new URLSearchParams();
      params.append('alarmId', data.id);
      params.append('userId', getCookie("sid"));

      this.$ajax({
          method: 'post',
          url: '/zigbee/processAlarm',
          data: params
      }).then((res) => {
          if (res.data.code == 200) {
              this.$Message.success(res.data.message);
              this.getTableData();
              this.getAlarmGroupByAlarmType();
          }else{
              this.$Message.error(res.data.message);
          }
      }).catch(function (error) {
          console.log(error)
      })
    },
    getDeviceList() {
      //获取设备列表
      this.$ajax.get('/zigbee/selectDeviceTypeListByDeviceOuterTypeId').then((res) => {
        if (res.data.code == 200) {
          this.deviceList = res.data.data;
          this.deviceList.unshift({id: '', zigbee_device_type_name: '全部'});
        }else{
          this.deviceList = [];
        }
      });
    },
    tabClick(name) {
      this.startTime ="";
      this.endTime = "";
      this.deviceTypeName = "";
      this.status = "";
      this.Loop ="";
      this.node ="";
      this.currentPage = 1;
      this.totalData1 = 0;
      this.data1 = [];
      this.data1Temp = [];
      if(name == "name1") {
        this.alarmType ="";
        this.getTableData();
      }
      if(name == "name2") {
        this.alarmType ="火警";
        this.getTableData();
      }
      if(name == "name5") {
        this.alarmType ="反馈";
        this.getTableData();
      }
      if(name == "name6") {
        this.alarmType ="监管";
        this.getTableData();
      }
      if(name == "name7") {
        this.alarmType ="故障";
        this.getTableData();
      }
      if(name == "name8") {
        this.alarmType ="屏蔽";
        this.getTableData();
      }
    },
    oneKeyDisposal(name) {
      console.log(name)
      let params = new URLSearchParams();
      params.append('processId', getCookie("sid"));
      params.append('alarmType', name);
      this.$Modal.confirm({
        title: '提示',
        content: '<p>确定要处理全部报警消息吗？</p>',
        onOk: () => {
          this.$ajax({
              method: 'post',
              url: '/zigbee/batchProcessAlarm',
              data: params
          }).then((res) => {
              if (res.data.code == 200) {
                  this.$Message.success(res.data.message);
                  this.getTableData();
                  this.getAlarmGroupByAlarmType();
              }else{
                  this.$Message.error(res.data.message);
              }
          }).catch(function (error) {
              console.log(error)
          })
        }
      })
    }
  },
};
</script>

<style scoped>
.topstyle {
  font-size: 1.3rem;
}
.bottomstyle {
  font-size: 1rem
}
</style>
