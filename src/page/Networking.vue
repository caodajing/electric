<template>
    <div class="net_content">
        <div class="net_top">
            <Row style="height: 100%">
                <Col span="6" offset="1" style="height: 100%">
                <Card style="background-color: #E04F4C; color: white; height: 100%">
                    <div style="width: 50%;float: left;"><h2>{{ deviceWarning }}</h2><h5>设备告警</h5></div>
                    <div style="width: 50%;float: left"><i class="iconfont icon-shebeigaojing"
                            style="font-size: 50px"></i></div>
                </Card>
                </Col>
                <Col span="6" offset="2" style="height: 100%">
                <Card style="background-color:#E17248; color: white; height: 100%">
                    <div style="width: 50%;float: left;"><h2>{{ deviceBroken }}</h2><h5>故障告警</h5></div>
                    <div style="width: 50%;float: left"><i class="iconfont icon-guzhang" style="font-size: 50px"></i>
                    </div>
                </Card>
                </Col>
                <Col span="6" offset="2" style="height: 100%">
                <Card style="background-color:#DF8F48; color: white; height: 100%">
                    <div style="width: 50%;float: left;"><h2>{{ deviceOffline }}</h2><h5>离线告警</h5></div>
                    <div style="width: 50%;float: left"><i class="iconfont icon-lixian" style="font-size: 50px"></i>
                    </div>
                </Card>
                </Col>

            </Row>
        </div>
        <div class="net_down">
            <Row>
                <Col span="4">
                <h2>监测统计</h2>
                </Col>
                <Col span="3" offset="17">
                <h3 style="cursor: pointer" @click="mapDetail()"><i class="iconfont icon-ditu" style="color:#22C67F"></i> 地图模式</h3>
                </Col>
            </Row>
            <Table :columns="tableColumns" border :data="tableData">
                <template slot-scope="{ row }" slot="name">
                  <strong>{{ row.name }}</strong>
                </template>
                <template slot-scope="{row}" slot="action">
                  <Button type="primary" size="small" @click="getDetail(row)">编辑</Button> 
                </template>
            </Table>
            <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="total_tableData" :pageSize="10" size="small" show-total
                    @on-change="changePage_tableData"></Page>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
    import { getCookie } from '../assets/js/cookie.js'
    import expandRow from './index-tableExpand'
    export default {
        name: "Networking",
        data() {
            return {
                userId: getCookie('user_id'),
                deviceBroken: 0, //设备故障
                deviceOffline: 0, //设备离线
                deviceWarning: 0, //设备报警
                total_tableData: 0,
                tableData: [],
                tableDataTemp: [],
                tableColumns:[
                  {
                      type: 'expand',
                      width: 50,
                      render: (h, params) => {
                          return h(expandRow, {
                              props: {
                                  row: params.row.tempList
                              }
                          })
                      }
                  },
                  {title: '单位名称', key:'unit_name', align:'center'},
                  {title: '单位地址', key:'address', align:'center'},
                  {title: '联系人', key:'relationPerson', align:'center',
                    render: (h, params) => {
                      return h('div', params.row.relationPerson?params.row.relationPerson:'暂无');
                    }
                  },
                  {title: '负责人联系方式', key:'connect_phone_num', align:'center'},
                  {title: '接入平台时间', key:'create_time', align:'center',
                    render: (h, params) => {
                      let dayjs = require('dayjs');
                      let create_time = params.row.create_time?dayjs(params.row.create_time).format('YYYY-MM-DD HH:mm:ss'):'';
                      return h('div', create_time);
                    }
                  },
                  {title: '当前联网状态', key:'status', align:'center',
                    render: (h, params) => {
                      if(params.row.status == 0){
                        return h('div', '有效');
                      }
                      if(params.row.status == 1){
                        return h('div', '失效');
                      }
                    }
                  },
                  // {title: '操作', slot:'action', align:'center'}
                ]
            }
        },
        created() {
            this.getDeviceStatus();
            this.getTableData();
        },
        methods: {
            getDeviceStatus() {
                //获取设备异常状态数量
                this.$ajax.get('/zigbee/zigbeeWebEachStatusDeviceStatics',
                    {
                        params: {
                            user_id: this.userId
                        }
                    },
                ).then((res) => {
                    if (res.data.code == 200) {
                        this.deviceBroken = res.data.data.deviceBroken;
                        this.deviceOffline = res.data.data.deviceOffline;
                        this.deviceWarning = res.data.data.deviceWarning;
                    }
                })
            },
            getTableData() {

                this.$ajax.get('/zigbee/selectUnitByUserUnit',
                    {
                        params: {
                            permissionUnitCode: decodeURIComponent(getCookie("permission_unit_code"))
                        }
                    },
                ).then((res) => {
                    if (res.data.code == 200) {
                        this.tableDataTemp = res.data.data;
                        this.total_tableData = this.tableDataTemp.length;
                        if (this.tableDataTemp.length < 10) {
                          this.tableData = this.tableDataTemp;
                        }else{
                          this.tableData = this.tableDataTemp.slice(0, 10);
                        }
                    }
                })
            },
            mapDetail () {
                this.$router.push({path:'/baiduMap'});
            },
            changePage_tableData (index) {
              let startNum = (index - 1) * 10;
              let endNum = index * 10;
              this.tableData = this.tableDataTemp.slice(startNum, endNum);
            }
        },
    }
</script>

<style lang="less" scoped>
    .net_content {
        width: 100%;
        height: 92vh;
        padding: 1vw;
        overflow-y: auto
    }

    .net_top {
        width: 100%;
        height: 20%;
        padding: 1vw
    }

    .net_down {
        width: 100%;
        height: 80%
    }

    table {
        border: 1px solid #F4F4F4;
    }
    table td {
        border: 1px solid #F4F4F4;
    }
</style>