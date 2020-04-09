<template>
  <div style="height: 92vh; width:100%">
    <Row type="flex" align="middle" style="width: 100%; height: 8vh">
      <Col span="1"><i class="iconfont icon-home" style="cursor: pointer" @click="mapIndex"></i></Col>
      <Col span="5"><Input suffix="ios-search" v-model="searchContent" @on-change="inputChange"
        placeholder="输入单位名称开始查找" /></Col>
      <Col span="1">区域：</Col>
      <Col span="4">
      <Select filterable v-model="areaCode" @on-change="chooseAreaCode">
        <Option v-for="(item, index) in mapAreaList" :value="item.area_code" :key="index">{{ item.area_name }}</Option>
      </Select>
      </Col>
      <Col span="10">
      <CheckboxGroup v-model="checkAllGroup" @on-change="checkAllGroupChange">
        <Checkbox label="显示告警相关"></Checkbox>
        <Checkbox label="显示故障相关"></Checkbox>
        <Checkbox label="显示离线告警"></Checkbox>
      </CheckboxGroup>
      </Col>
    </Row>
    <div class="map-area" id="allMap"></div>
    <Drawer class="drawerClass" title="监控点" :closable="false" placement="left" v-model="drawerModal">
      <h2 span="20">{{ unitObject.unitName }}</h2>
      <div class="demo-drawer-profile">
        <Row>
          <Col span="2">
          <i style="font-size: 11px" class="iconfont icon-dingwei"></i>
          </Col>
          <Col span="22">{{ unitObject.address }}</Col>
        </Row>
        <Row>
          <Col span="2">
          </Col>
          <Col span="22">{{ unitObject.unitDescribe }}</Col>
        </Row>
        <Row>
          <Col span="2">
          <Icon type="logo-buffer" />
          </Col>
          <Col span="22">维保单位：{{ unitObject.maintenceCompany }}</Col>
        </Row>
        <Row>
          <Col span="2">
          <Icon type="ios-call-outline" />
          </Col>
          <Col span="22">联系方式：{{ unitObject.phone }}</Col>
        </Row>
      </div>
      <Row type="flex" align="middle" style="background-color:#80B0F1;height:30px;margin:10px 0;cursor:pointer" v-for="(item, index) in deviceType" :key="index">
        <Col span="12" push="1">
          <div @click="aaa(item.name)">
          <span>{{item.name}}</span>
          <span style="color:red" v-if="item.name=='报警主机'">（{{totalCount}}）</span>
          </div>
        </Col>
      </Row>
      <!-- <Collapse accordion>
        <Panel :name="item.deviceTypeName" v-for="(item, index) in monitorDeviceList" :key="index">
          {{ item.deviceTypeName }}<span style="color: red">({{ item.deviceNum }})</span>
          <div slot="content">
            <p>检测设备<span style="color:rgb(37, 201, 37);font-weight: bolder"> {{item.deviceNum}} </span>个</p>
            <Row style="margin-top: 10px" v-for="(temp, index) in item.deviceList" :key="index">
              <Col span="4"><i class="iconfont" :class="iconChange(item)" style="color: orchid; font-size: 14px"></i>
              </Col>
              <Col span="10">位置：{{ temp.address }}</Col>
              <Col span="10">状态：<span @click="changeDevice(temp, item)"
                :class="classChange(temp)">{{ stateChange(temp) }}</span></Col>
            </Row>
          </div>
        </Panel>
      </Collapse> -->
      <Card :padding="5" v-for="(temp, i) in drawerData" :key="temp+i" style="margin: 5px 0;" >
        <div style="cursor:pointer">
          <Row type="flex" :gutter="30" align="middle">
            <Col span="4"><i style="font-size:30px; color:#6DD7C7" class="iconfont icon-shipin"></i></Col>
            <Col span="20">
              <Row >
                <Col span="18">位置：{{temp.deviceName}}</Col>
                <Col span="6"><span style="color:red">报警</span></Col>
              </Row>
              <Row>
                <Col span="24">设备型号：{{temp.deviceTypeName}}</Col>
              </Row>
              <Row>
                <Col span="24">报警时间：{{temp.createTimeToDate}} {{temp.createTimeToTime}}</Col>
              </Row>
            </Col>
          </Row>
        </div>
      </Card>
      <div style="margin: 5px;overflow: hidden">
        <div style="float: right;">
          <Page :total="drawerDataTotal" simple :pageSize="2" :current.sync="drawerCurPage" size="small" @on-change="changeDrawerpage"></Page>
        </div>
      </div>
    </Drawer>

    <Modal v-model="zhixianModal" :title="zhixianModalTitle" class="modalClass" width="900" >
      <v-chart :options="polarData" style="width:900px" />
      <div slot="footer">
      </div>
    </Modal>

    <Modal class="iModal" v-model="newModal" :title="newModalTitle" :scrollable="true" :footer-hide="false">
      <Row :gutter="10" type="flex" align="middle" class="row_style">
        <Col span="20">
          所属大类：
          <Select v-model="deviceName" @on-change="deviceTypeChange" style="width:150px">
            <Option v-for="(item, index) in deviceType" :value="item.id" :key="index">{{item.name}}</Option>
          </Select>
          设备类型：
          <Select v-model="smallId" style="width:150px">
            <Option v-for="(item, index) in smallDeviceType" :value="item.id" :key="index">{{item.zigbee_device_type_name}}</Option>
          </Select>
        </Col>
        <Col span="4">
          <Button type="primary" @click="searchBtn()">搜索</Button>
        </Col>
      </Row>
      <Table :columns="deviceColumns" :data="deviceListData">
        <template slot-scope="{ row }" slot="action">
          <Button type="primary" size="small" ghost @click="historyData(row)">查看历史数据</Button>
        </template>
      </Table>
      <div style="margin: 10px; overflow: hidden">
        <div style="float: right;">
          <Page :total="total" :pageSize="5" :current.sync="currentPage" show-total @on-change="changePage"></Page>
        </div>
      </div>
      <div slot="footer"></div>
    </Modal>

    <Modal class="iModal" v-model="baojingModal" title="报警主机" :scrollable="true" :footer-hide="false">
      <Table border :columns="baojingColumns" :data="baojingData" :max-height="400">
        <template slot-scope="{ row }" slot="action">
          <Button type="primary" v-if="row.status==1" size="small" @click="updataBtn(row)">处置</Button>
        </template>
      </Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page :total="total_baojingData" size="small" :pageSize="10" show-total @on-change="changePage2"></Page>
        </div>
      </div>
      <div slot="footer"></div>
    </Modal>
  </div>

</template>
<script>
  import { getCookie } from '../assets/js/cookie.js'
  import loadBMap from '../assets/js/loadBMap.js'
  import Vue from 'vue'
  import expandRow from '../components/table-expand.vue'
  import expandRows from '../components/AlarmType-expand.vue'

  import ECharts from 'vue-echarts/components/ECharts.vue'
  // 手动引入 ECharts 各模块来减小打包体积
  import 'echarts/lib/chart/line'
  import 'echarts/lib/component/tooltip'
  import 'echarts/lib/component/legend'
  import 'echarts/lib/component/title.js'
  Vue.component('v-chart', ECharts)

  export default {
    components: { expandRow, expandRows },
    name: "baiduMap",
    data() {
      return {
        myMap: null,
        userId: decodeURIComponent(getCookie('user_id')),
        areaCode: '',
        searchContent: '', //输入框搜索内容 
        mapAreaList: [], //区域列表
        deviceStatus: [],
        markerTemp: [],
        markerTemp1: [],
        checkAllGroup: [],
        checkStatus: '',
        drawerModal: false,
        unitObject: {
          unitName: '',
          unitDescribe: '', //单位描述：一般单位...
          address: '',
          maintenceCompany: '',//维保单位
          phone: '' //联系方式
        },
        monitorDeviceList: [],
        zhixianModal: false,
        zhixianModalTitle: '最近24小时水压曲线图',
        polarData: {}, //折线图数据
        xAxisData: [],
        newModal: false, //设备弹窗
        deviceColumns:[
          {
              type: 'expand',
              width: 50,
              render: (h, params) => {
                  return h(expandRow, {
                      props: {
                          row: params.row.tempListInnerLayer
                      }
                  })
              }
          },
          {key: 'device_type_id', title: '设备类型id', align: 'center'},
          {key: 'device_name', title: '设备名', align: 'center'},
          {key: 'device_status', title: '状态', align: 'center',
              render:(h, params) => {
                if (params.row.device_status == 0){
                  return h('div',[h('Badge',{
                    props:{
                        status: 'success',
                        text: '正常'
                      }
                  })])
                }
                if (params.row.device_status == 1){
                  return h('div',[h('Badge',{
                    props:{
                        status: 'warning',
                        text: '环境异常'
                      }
                  })])
                }
                if (params.row.device_status == -1){
                  return h('div',[h('Badge',{
                    props:{
                        status: 'error',
                        text: '设备损坏'
                      }
                  })])
                }
              }
          },
          {key: 'update_time', title: '更新时间', align: 'center'},
          {slot: 'action', title: '操作', align: 'center'}
        ],
        deviceListData: [],
        deviceType: [],//大类别
        smallDeviceType: [],//小类别
        deviceName: '',
        smallId: '',
        total: 0,
        currentPage: 1,
        unitCode: '',
        newModalTitle: '',
        totalCount: 0,
        baojingModal: false,
        baojingColumns: [
        {
            type: 'expand',
            width: 50,
            render: (h, params) => {
                return h(expandRows, {
                    props: {
                        row: params.row
                    }
                })
            }
        },
        {key: 'alarmType', title: '报警类型', align: 'center'},
        {key: 'deviceName', title: '设备描述', align: 'center'},
        {key: 'createTimeToTime', title: '报警时间', align: 'center',
          render(h, params) {
            return h('div', params.row.createTimeToDate+' '+ params.row.createTimeToTime);
          },
        },
        {slot: 'action', title: '操作', align: 'center'}
      ],
      baojingData: [],
      total_baojingData: 0,
      drawerCurPage: 1,
      drawerData: [],
      drawerDataTotal: 0
      }
    },
    created() {
      //this.initMap();
      this.getAreaList();
      this.addMapMarker();
    },
    methods: {
      initMap() {
        loadBMap('isZkHarwgZspmmnDOBpTGgGDpoMKRBAx')
          .then(() => {
            // 百度地图API功能
            this.myMap = new BMap.Map("allMap") // 创建Map实例
            this.myMap.centerAndZoom(new BMap.Point(121.542550, 31.235010), 11) // 初始化地图,设置中心点坐标和地图级别
            //添加地图类型控件
            this.myMap.addControl(
              new BMap.MapTypeControl({
                mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP]
              })
            )
            this.myMap.setCurrentCity('上海') // 设置地图显示的城市 此项是必须设置的
            this.myMap.enableScrollWheelZoom(true) //开启鼠标滚轮缩放
          })
          .catch(err => {
            console.log('地图加载失败')
          })
      },
      getAreaList() {
        //获取区域下拉列表
        this.$ajax.get('/zigbee/zigbeeWebMapAreaList',
          {
            params: {
              user_id: this.userId
            }
          },
        ).then((res) => {
          if (res.data.code == 200) {
            this.mapAreaList = res.data.data;
            this.mapAreaList.unshift({ area_name: '请选择', area_code: '' })
          }
        })
      },
      addMapMarker() {
        //获取各个区域 及各个区域的设备数量
        this.$ajax.get('/zigbee/zigbeeWebMapDeviceAndUnitNumInEachArea',
          {
            params: {
              user_id: this.userId
            }
          },
        ).then((res) => {
          if (res.data.code == 200) {
            this.deviceStatus = res.data.data;
            this.addingMulch();
          }
        })
      },
      stateChange(data) {
        switch (data.device_status) {
          case -1:
            return '故障';
          case 0:
            return '正常';
          case 1:
            return '报警';
          case 2:
            return '离线';
        }
      },
      classChange(data) {
        switch (data.device_status) {
          case -1:
            return 'guzhang'
            break;
          case 0:
            return 'zhengchang'
          case 1:
            return 'baojing'
          case 2:
            return 'lixian'
        }
      },
      iconChange(data) {
        switch (data.deviceTypeName) {
          case '水压监控':
            return 'icon-shuidi'
          case '电器监控':
            return 'icon-dianqi'
          case '视频监控':
            return 'icon-shipin'
          case '燃气监控':
            return 'icon-keranqiti'
          case '电梯监控':
            return 'icon-diantiguanli'
          case '风道监控':
            return 'icon-fengdao'
            break;
        }
      },
      addingMulch() {
        this.markerTemp = [];
        loadBMap('isZkHarwgZspmmnDOBpTGgGDpoMKRBAx').then(() => {

          this.myMap = new BMap.Map("allMap");  // 创建Map实例
          this.myMap.centerAndZoom(new BMap.Point(121.542550, 31.235010), 11); // 初始化地图,设置中心点坐标和地图级别
          this.myMap.setCurrentCity("上海市"); // 设置地图显示的城市 此项是必须设置的
          let mapStyle = { style: "normal" }//normal、light、dark、redalert、googlelite、grassgreen、midnight、pink、darkgreen、bluish、grayscale、hardedge
          this.myMap.setMapStyle(mapStyle);
          this.myMap.enableScrollWheelZoom(true);  //开启鼠标滚轮缩放

          /////////////////////////////////////////////默认打开第一个
            let _that = this;
            _that.$ajax.get('/zigbee/zigbeeWebMapDeviceNumInEachUnit',
                {
                  params: {
                    user_id: _that.userId,
                    area_code: _that.deviceStatus[0].area_code,
                    unit_name: _that.searchContent,
                    type: 1
                  }
                },
              ).then((res) => {
                if (res.data.code == 200) {
                  _that.myMap.clearOverlays();
                  let unitList = res.data.data;
                  let centerPointer = new BMap.Point(unitList[0].lon, unitList[0].lat);
                  _that.myMap.centerAndZoom(centerPointer, 19);
                    let point = new BMap.Point(unitList[0].lon, unitList[0].lat);
                    let opts = {
                      position: point,    // 指定文本标注所在的地理位置
                      offset: new BMap.Size(10, -40)    //设置文本偏移量
                    };
                    let label = new BMap.Label(unitList[0].unit_name + "报警", opts);  // 创建文本标注对象 equipmentNum

                    label.setStyle({
                      color: "#fff",
                      backgroundColor: '#f54a1f',
                      fontSize: "12px",
                      padding: '15px 11px',
                      textAlign: "center",
                      lineHeight: "20px",
                      height: '75px',
                      width: '75px',
                      whiteSpace: 'unset',
                      wordBreak: 'break-all',
                      borderColor: '#f54a1f',
                      borderRadius: '50px',
                      fontFamily: "微软雅黑"
                    });
                    _that.myMap.addOverlay(label);
                    _that.$ajax.get('/zigbee/selectAlarmList',
                        {
                          params: {
                            startTime: null,
                            endTime: null,
                            alarmType: null,
                            node: null,
                            deviceTypeId: null,
                            status: 1,
                            pageSize: 2,
                            pageNum: 1
                          }
                        },
                      ).then((res) => {
                      if (res.data.code == 200) {
                        _that.drawerCurPage = 1;
                        _that.drawerDataTotal = res.data.total;
                        _that.drawerData = res.data.data;
                      }else{
                        _that.drawerData = [];
                        _that.drawerDataTotal = 0;
                      }
                      })
                    label.addEventListener('click', function () {
                      _that.$ajax.get('/zigbee/selectAlarmList',
                        {
                          params: {
                            startTime: null,
                            endTime: null,
                            alarmType: null,
                            node: null,
                            deviceTypeId: null,
                            status: 1,
                            pageSize: 2,
                            pageNum: 1
                          }
                        },
                      ).then((res) => {
                      if (res.data.code == 200) {
                        _that.drawerCurPage = 1;
                        _that.drawerDataTotal = res.data.total;
                        _that.drawerData = res.data.data;
                      }else{
                        _that.drawerData = [];
                        _that.drawerDataTotal = 0;
                      }
                      })
                      _that.drawerModal = true; //显示左侧抽屉
                      _that.newModal = true;
                    })
                    //默认展开抽屉，水压设备信息
                      _that.drawerModal = true; //显示左侧抽屉
                      _that.newModal = true;
                      _that.unitObject.unitName = unitList[0].unit_name;
                      _that.unitObject.unitDescribe = unitList[0].unit_type_describe;
                      _that.unitObject.address = unitList[0].address;
                      _that.unitObject.maintenceCompany = unitList[0].response_maintenance_company;
                      _that.unitObject.phone = unitList[0].connect_phone_num;
                      _that.unitCode = unitList[0].unit_code;
                      _that.newModalTitle = unitList[0].unit_name;
                      //获取点击地图中的该单位的设备详情
                      _that.$ajax.get('/zigbee/zigbeeWebMapDeviceListInUnit',
                        {
                          params: {
                            unit_code: _that.unitCode,
                            type: 1
                          }
                        },
                      ).then((res) => {
                        if (res.data.code == 200) {
                          _that.monitorDeviceList = res.data.data;
                        }
                      });
                      _that.getAlarmGroupByAlarmType();
                      //获取大类型列表
                      _that.$ajax.get('/zigbee/selectDeviceOuterDeviceType').then((res) => {
                        if (res.data.code == 200) {
                          _that.deviceType = res.data.data;
                          _that.deviceName = 1;
                          _that.deviceTypeChange();
                          setTimeout(()=>{
                            _that.searchBtn();
                          },500)
                          
                        }else{
                           _that.deviceType = [];
                        }
                      });
                }
                if (res.data.code == -1) {
                  _that.$Message.warning(res.data.message);
                }
              })
        });
      },
      checkAllGroupChange(data) {
        // data:选中的复选框数组值
        let checkArray = new Array();
        for (let i = 0; i < data.length; i++) {
          if (data[i] == "显示告警相关") {
            checkArray.push(2);
          }
          if (data[i] == "显示故障相关") {
            checkArray.push(3);
          }
          if (data[i] == "显示离线告警") {
            checkArray.push(4);
          }
        }
        let str = "";
        for (let m = 0; m < checkArray.length; m++) {
          str += checkArray[m] + ",";

        }
        this.checkStatus = str.substring(0, str.length - 1);
        this.deviceNumInEachUnit();
      },
      chooseAreaCode() {
        this.deviceNumInEachUnit();
      },
      inputChange() {
        this.deviceNumInEachUnit();
      },
      deviceNumInEachUnit() {
        this.myMap.clearOverlays();
        if (this.checkStatus == '') {
          this.checkStatus = 1;
        }
        this.$ajax.get('/zigbee/zigbeeWebMapDeviceNumInEachUnit',
          {
            params: {
              user_id: this.userId,
              area_code: this.areaCode,
              unit_name: this.searchContent,
              type: this.checkStatus
            }
          },
        ).then((res) => {
          if (res.data.code == 200) {
            let unitList = res.data.data;
            let centerPointer = new BMap.Point(unitList[0].lon, unitList[0].lat);
            this.myMap.centerAndZoom(centerPointer, 19);
            for (let i = 0; i < unitList.length; i++) {
              let point = new BMap.Point(unitList[i].lon, unitList[i].lat);
              let opts = {
                position: point,    // 指定文本标注所在的地理位置
                offset: new BMap.Size(10, -40)    //设置文本偏移量
              };
              let label = new BMap.Label(unitList[i].unit_name + " " + unitList[i].device_num + "个监控设备", opts);  // 创建文本标注对象 equipmentNum
              label.setStyle({
                color: "#fff",
                backgroundColor: '#00B262',
                fontSize: "10px",
                padding: '2px 6px',
                textAlign: "center",
                height: 'auto',
                width: 'auto',
                borderColor: '#00B262',
                borderRadius: '50px',
                fontFamily: "微软雅黑"
              });
              this.myMap.addOverlay(label);
              label.addEventListener('click',  ()=> {
                this.drawerModal = true;
                this.newModal = true;
                this.unitObject.unitName = unitList[i].unit_name;
                this.unitObject.unitDescribe = unitList[i].unit_type_describe;
                this.unitObject.address = unitList[i].address;
                this.unitObject.maintenceCompany = unitList[i].response_maintenance_company;
                this.unitObject.phone = unitList[i].connect_phone_num;
                this.unitCode = unitList[i].unit_code;
                this.newModalTitle = unitList[i].unit_name;
                //获取点击地图中的该单位的设备详情
                this.$ajax.get('/zigbee/zigbeeWebMapDeviceListInUnit',
                  {
                    params: {
                      unit_code: unitList[i].unit_code,
                      type: 1
                    }
                  },
                ).then((res) => {
                  if (res.data.code == 200) {
                    this.monitorDeviceList = res.data.data;
                  }else{
                    this.monitorDeviceList = [];
                  }
                });
                //获取大类型列表
                this.$ajax.get('/zigbee/selectDeviceOuterDeviceType').then((res) => {
                  if (res.data.code == 200) {
                    this.deviceType = res.data.data;
                  }else{
                    this.deviceType = [];
                  }
                });
              })
            }

          }
          if (res.data.code == -1) {
            this.$Message.warning(res.data.message);
          }
        })
      },
      changeDevice(data, device) {
        //设备折线图
        if(device == '水压监控'){
        this.zhixianModal = true;

            this.xAxisData = ["19:00","20:00","21:00","22:00","23:00","00:00","01:00","02:00","03:00","04:00","05:00","06:00","07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00"];
            this.polarData = {
              title: {
                text: '最近24小时水压曲线图',
                x: 'left'
              },
              tooltip: {
                trigger: 'axis',
              },
              legend: {
                show: true,
                orient: 'vertical',
                left: 'left',
                data: ['最近水压值']
              },
              xAxis: {
                type: 'category',
                boundaryGap: false,
                axisLabel: {
                  interval: 0
                },
                data: this.xAxisData
              },
              dataZoom: [{
                type: 'slider',
                start: 0,
                end: 10
              }],

              yAxis: [
                {
                  type: 'value'
                }
              ],
              series: [
                {
                  type: 'line',
                  areaStyle: {
                    color: ["#F6C0FF"]
                  },
                  itemStyle : { 
                  normal : { 
                  color:'#8cd5c2', //改变折线点的颜色
                  lineStyle:{ 
                  color:'#F6C0FF' //改变折线颜色
                  } 
                  } 
                  },
                  smooth: true,
                  data: [
                      "0.30",
                      "0.15",
                      "0.20",
                      "1.10",
                      "1.05",
                      "0.70",
                      "0.10",
                      "0.80",
                      "0.20",
                      "0.50",
                      "0.60",
                      "0.40",
                      "0.50",
                      "0.30",
                      "0.10",
                      "0.20",
                      "0.30",
                      "0.40",
                      "0.50",
                      "0.60",
                      "0.60",
                      "0.20",
                      "0.20",
                      "0.90"
                      ]
                }
              ]
            }
      }else{
        this.$Message.warning('暂未开放');
      }
    },
    mapIndex() {
      this.myMap.clearOverlays();
      this.addMapMarker();
    },
    deviceTypeChange (){
      this.$ajax.get('/zigbee/selectDeviceTypeListByDeviceOuterTypeId',
        {
          params: {
            id: this.deviceName?this.deviceName: ''
          }
        },
      ).then((res) => {
        this.smallId = "";
        if (res.data.code == 200) {
          this.smallDeviceType = res.data.data;
          this.smallId = this.smallDeviceType[0].id;
        }else{
          this.smallDeviceType = [];
        }
      });
    },
    searchBtn(curPage) {
      this.$ajax.get('/zigbee/zigbeeWebMapDeviceListInUnit',
        {
          params: {
            unit_code: this.unitCode,
            type: 1,
            deviceTypeId: this.smallId?this.smallId: this.smallDeviceType[0].id,
            curPage: curPage?curPage:''
          }
        },
      ).then((res) => {
        if(!curPage){
          this.currentPage = 1;
        }else{
          this.currentPage = curPage;
        }
        if (res.data.code == 200) {
          this.deviceListData = res.data.data.deviceList;
          this.total = res.data.data.total;
        }else{
          this.deviceListData = [];
        }
      });
    },
    changePage (index){
      this.searchBtn(index);
    },
    changePage2(index) {
        this.baojingModal = true;
        this.newModalTitle = name+"列表";
        this.$ajax.get('/zigbee/selectAlarmList',
          {
            params: {
              startTime: null,
              endTime: null,
              alarmType: null,
              node: null,
              deviceTypeId: null,
              status: 1,
              pageSize: 5,
              pageNum: index
            }
          },
        ).then((res) => {
        if (res.data.code == 200) {
          this.total_baojingData = res.data.total;
          this.baojingData = res.data.data;
        }else{
          this.baojingData = [];
          this.total_baojingData = 0;
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
          for (let i = 0; i < res.data.data.length; i++) {
            if(res.data.data[i].alarmType == "全部"){
              this.totalCount = res.data.data[i].alarmTypeCount;
            }
          }
        }
      })
    },
    aaa(name) {
      
      if(name == "报警主机") {
        this.baojingModal = true;
        this.newModalTitle = name+"列表";
        this.$ajax.get('/zigbee/selectAlarmList',
          {
            params: {
              startTime: null,
              endTime: null,
              alarmType: null,
              node: null,
              deviceTypeId: null,
              status: 1,
              pageSize: 5,
              pageNum: 1
            }
          },
        ).then((res) => {
        if (res.data.code == 200) {
          this.total_baojingData = res.data.total;
          this.baojingData = res.data.data;
        }else{
          this.baojingData = [];
          this.total_baojingData = 0;
        }
        })
      }else if(name == "水压"){
        this.newModal = true;
        this.$router.push('/waterGage');
      }else if (name == "水位") {
        this.newModal = false;
        this.$router.push('/waterLevel');
      }else if (name == "电气火灾") {
        this.newModal = false;
        this.$router.push('/electricalFire');
      }
    },
    updataBtn(data) {
      this.$Modal.confirm({
        title: '提示',
        content: '<p>是否确认处置该报警信息？</p>',
        onOk: () => {
          let params = new URLSearchParams();
          params.append('alarmId', data.id);

          this.$ajax({
              method: 'post',
              url: '/zigbee/processAlarm',
              data: params
          }).then((res) => {
              console.log(res)
              if (res.data.code == 200) {
                  this.$Message.success(res.data.message);
                  this.aaa("报警主机");
                  this.getAlarmGroupByAlarmType();
              }else{
                  this.$Message.error(res.data.message);
              }
          }).catch(function (error) {
              console.log(error)
          })
        }
      })
    },
    historyData(data) {
      //查看历史数据
      this.changeDevice('618e9b030000_L1.127', '水压监控');
      this.zhixianModal= true;
    },
    changeDrawerpage(index) {
      this.$ajax.get('/zigbee/selectAlarmList',
        {
          params: {
            startTime: null,
            endTime: null,
            alarmType: null,
            node: null,
            deviceTypeId: null,
            status: 1,
            pageSize: 2,
            pageNum: index
          }
        },
      ).then((res) => {
      if (res.data.code == 200) {
        this.drawerDataTotal = res.data.total;
        this.drawerData = res.data.data;
      }else{
        this.drawerData = [];
        this.drawerDataTotal = 0;
      }
      })
    }
    }
  }
</script>
<style scoped>
  .row_style{
    margin: 10px 0
  }
  .map-area {
    width: 100%;
    height: 84vh;
  }
  .guzhang {
    color: #E17248;
    cursor: pointer;
  }
  .zhengchang {
    color: #27d558;
    cursor: pointer;
  }
  .baojing {
    color: #E04F4C;
    cursor: pointer;
  }
  .lixian {
    color: #DF8F48;
    cursor: pointer;
  }

  /*
  左侧弹出抽屉样式修改，弹出位置居左侧240px，无背景色
  */
  .drawerClass /deep/ .ivu-drawer-mask{
    background-color: transparent !important;
  }
 .drawerClass /deep/ .ivu-drawer{
    top: 16vh !important;
    max-height: 84vh;
  }
 .drawerClass /deep/ .ivu-drawer-left{
    left: 240px !important;
  }
  .drawerClass /deep/ .ivu-modal{
    top: 16vh !important;
    left: 110px;
  }
  .iModal /deep/ .ivu-modal{
    width: 700px !important;
    left: 240px;
    top: 16vh !important;
  }
  /*
  弹出抽屉中样式修改
  */
  .demo-drawer-profile{
    margin-top: 12px;
    font-size: 11px;
  }
  .demo-drawer-profile .ivu-col{
    margin-bottom: 12px;
  }
  /*
折叠面板背景色
*/
.ivu-collapse{
  background-color: #51a2ec;
}
.ivu-collapse>.ivu-collapse-item>.ivu-collapse-header{
  color: #EDEDED
}

.modalClass /deep/ .ivu-modal{
  left: 496px !important;
  top: 16vh !important;
  position: fixed !important;
}
.modalClass /deep/ .ivu-modal-mask{
  background-color: transparent !important;
}

</style>