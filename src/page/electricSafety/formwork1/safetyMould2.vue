<!--安全概况左侧子模版-->
<template>
  <div class="safety-mould2">
    <div class="latent-danger">
      <p class="title"><i class="iconfont icon-Thismonth"></i>本月安全隐患统计</p>
      <ul>
        <li class="yellow">
          <p><span>{{perilStatistics.alarm}}</span>条</p>
          <p>隐患报警总数</p>
        </li>
        <li class="yellow">
          <p><span>{{perilStatistics.node}}</span>个</p>
          <p>隐患节点总数</p>
        </li>
        <li class="green">
          <p><span>{{perilStatistics.handleAlarm}}</span>条</p>
          <p>隐患报警总数</p>
        </li>
        <li class="green">
          <p><span>{{perilStatistics.patrolNode}}</span>个</p>
          <p>隐患报警总数</p>
        </li>
      </ul>
    </div>
    <div class="early-warning-list">
      <p class="title"><i class="iconfont icon-Newest"></i>最新预警信息列表</p>
      <Table class="subject-list" :columns="tableColumns" :data="tableList" style="height:400px">
        <template slot-scope="{ row,index }" slot="type">
          <div class="type-state" :class="{event:row.type==1,warning:row.type==2}"></div>
        </template>
      </Table>
    </div>
  </div>
</template>

<script>
    export default {
        name: "safetyMould2",
        data() {
            return {
                perilStatistics: {alarm: 3761, node: 34, handleAlarm: 0, patrolNode: 0},

                heightNum:'',
                tableList:[],
                tableColumns:[
                    {
                        title: '类别',
                        slot: 'type',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '日期时间',
                        key: 'date',
                        width: 100,
                        align: 'center'
                    },
                    {
                        title: '预警内容',
                        key: 'content',
                        // width: 60,
                        tooltip:true,
                        align: 'center'
                    },
                ]
            }
        },
        created() {
            // this.heightNum=document.body.clientHeight-648;
            // this.tableList=[{type:1,date:'12-20 12:54',content:'四层3号井上的四层3号井照明总1电流四层3号井上的四层3号井照明'},
            //     {type:1,date:'12-20 12:54',content:'四层3号井上的四层3号井照明总1电流四层3号井上的四层3号井照明'},
            //     {type:1,date:'12-20 12:54',content:'四层3号井上的四层3号井照明总1电流四层3号井上的四层3号井照明'},
            //     {type:1,date:'12-20 12:54',content:'四层3号井上的四层3号井照明总1电流四层3号井上的四层3号井照明'},
            //     {type:2,date:'12-20 12:54',content:'四层3号井上的四层3号井照明总1电流四层3号井上的四层3号井照明'},
            //     {type:1,date:'12-20 12:54',content:'四层3号井上的四层3号井照明总1电流四层3号井上的四层3号井照明'},
            //     {type:1,date:'12-20 12:54',content:'四层3号井上的四层3号井照明总1电流四层3号井上的四层3号井照明'},
            //     {type:1,date:'12-20 12:54',content:'四层3号井上的四层3号井照明总1电流四层3号井上的四层3号井照明'},
            //     {type:2,date:'12-20 12:54',content:'四层3号井上的四层3号井照明总1电流四层3号井上的四层3号井照明'},
            //     {type:2,date:'12-20 12:54',content:'四层3号井上的四层3号井照明总1电流四层3号井上的四层3号井照明'},
            //     {type:1,date:'12-20 12:54',content:'四层3号井上的四层3号井照明总1电流四层3号井上的四层3号井照明'},
            //     {type:1,date:'12-20 12:54',content:'四层3号井上的四层3号井照明总1电流四层3号井上的四层3号井照明'},
            //     {type:1,date:'12-20 12:54',content:'四层3号井上的四层3号井照明总1电流四层3号井上的四层3号井照明'},
            //     {type:1,date:'12-20 12:54',content:'四层3号井上的四层3号井照明总1电流四层3号井上的四层3号井照明'},
            //     {type:1,date:'12-20 12:54',content:'四层3号井上的四层3号井照明总1电流四层3号井上的四层3号井照明'},
            //     {type:1,date:'12-20 12:54',content:'四层3号井上的四层3号井照明总1电流四层3号井上的四层3号井照明'},
            //     {type:1,date:'12-20 12:54',content:'四层3号井上的四层3号井照明总1电流四层3号井上的四层3号井照明'},
            //     {type:1,date:'12-20 12:54',content:'四层3号井上的四层3号井照明总1电流四层3号井上的四层3号井照明'}]
            this.getAlertList();
        },
        methods:{
            getAlertList(){
                this.tableList=[];
                this.$ajax.get('/zigbee/getEarlyWarningList').then((res) => {
                    if (res.data.code == 200) {
                        res.data.data.map((e)=>{
                            this.tableList.push({type:e.type,date:e.createTime.slice(5, 16),content:e.content})
                        });
                    } else {
                        this.$Message.error('最新预警信息'+res.data.message)
                    }
                }).catch(function (error) {
                    console.log(error);
                })
            }
        }
    }
</script>

<style scoped lang="less">
  .safety-mould2 {
    margin-top: 10px;

    .latent-danger {
      ul {
        display: table;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.25);

        li {
          border-left: 1px solid rgba(255, 255, 255, 0.1);
          display: table-cell;
          height: 117px;
          text-align: center;
          vertical-align: middle;

          &.yellow p span{
            font-size: 24px;
            color: #ffd200;
          }

          &.green p span{
            font-size: 24px;
            color: #27d558;
          }

          &:first-child {
            border: none;
          }
        }
      }
    }

    .early-warning-list{
      margin-top: 10px;
      .subject-list{
        border: none;
        
      }
    }
    
  }

</style>
<style>
  .subject-list .ivu-table-tip td{
    background-color: transparent;
  }
</style>
