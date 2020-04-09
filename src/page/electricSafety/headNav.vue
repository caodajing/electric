<!--头部导航-->
<template>
    <div class="head-nav">
        <div class="header-nav">
            <span class="hw-logo"></span>
            <span class="title-text">智能用电安全与能耗监控公共云平台</span>
            <ul class="nav-list">
                <li v-for="item in pageNav">
                    <span>{{item.name}}</span>
                    <div class="nav-list-box">
                        <p v-for="temp in item.list" @click="loadNavFn(temp)">
                            <router-link :to="temp.path" @click.native="goPath(temp.path)">
                                {{temp.name}}
                            </router-link>
                        </p>
                    </div>
                </li>
            </ul>
            <div class="user-data">
                <i class="iconfont icon-Ellipse"></i>
                <p>上海<span>{{userName}}，你好！</span></p>
                <p>在线时长：<span>{{timeDate}}</span></p>
                <div class="sign-Out-Btn">
                    <i class="iconfont icon-Setup"></i>
                    <b @click="signOutBtn">退出</b>
                </div>
            </div>
        </div>
        <div class="fast-nav-box">
            <ul class="fast-nav-ul" :style="styleObj">
                <li v-for="item in this.$root.SHORTCUTNAV">
                    <!--        <i class="iconfont icon-fork"></i>-->
                    <Icon class="close-btn" v-show="item.isTrue" @click="removeShortcutNav(item)" type="ios-close"/>
                    <router-link :to="item.path">
                        <span>{{item.name}}</span>
                    </router-link>
                </li>
            </ul>
            <div class="left-right-slither" v-show="slitherState">
                <Icon type="md-arrow-dropleft" @click="rightSlither"/>
                <Icon type="md-arrow-dropright" @click="leftSlither"/>
            </div>
        </div>
        <div class="mask no-open-mask" v-if="noOpenMask">
            <div class="main">
                <a href="javascript:;" class="close" @click="noOpenMask = false"></a>
                <div class="title"></div>
                <div class="content">提示：该功能暂未开放。</div>
            </div>
        </div>
    </div>
</template>

<script>
    import {getCookie,setCookie} from '../../assets/js/cookie.js'
    import {methodSets} from './public/public.js'

    export default {
        name: "headNav",
        data() {
            return {
                noOpenMask:false,
                userName: decodeURIComponent(getCookie('username')),
                pageNav: [
                    {
                        name: '用电安全', 
                        list: [
                            {name: '安全概况', path: 'electricSafety'},
                            {name: '重点监测', path: 'keyMonitoring'}
                        ]
                    },
                    {
                        name: '能耗概况', 
                        list: [
                            {name: '机构能耗概况', path: 'consumeEnergy'}
                        ]
                    },
                    {
                        name: '回路监控', 
                        list: [
                            {name: '回路监测', path: 'loopMonitoring'},
                            {name: '回路控制', path: 'loopControl'}
                        ]
                    },
                    {
                        name: '数据查询', 
                        list: [
                            {name: '能耗查询', path: 'energyQuery'},
                            {name: '能耗明细', path: 'energyDetailed'}, 
                            {name: '电压电流明细', path: 'voltageCurrent'},
                            {name: '安全用电明细', path: 'electricityDetailed'}, 
                            // {name: '烟感报警明细', path: 'smokeAlarmDetails'},
                            // {name: '门磁状态明细', path: 'doorContactState'}, 
                            // {name: '温湿度报警明细', path: 'humitureAlarm'}
                        ]
                    },
                    {
                        name: '账单结算', 
                        list: [
                            {name: '账单结算', path: ''}
                        ]
                    },
                    {
                        name: '事件通知', 
                        list: [
                            {name: '系统公告', path: 'eventNotification'}
                        ]
                    },
                    {
                        name: '系统报告',
                        list: [
                            {name: '能耗报告', path: 'energyProfile'}, 
                            {name: '安全报告', path: 'safetyReports'}
                        ]
                    },
                    {
                        name: '系统管理', 
                        list: [
                            {name: '组织机构管理', path: 'organizeManage'},
                            {name: '角色管理', path: 'roleManager'}, 
                            {name: '用户管理', path: 'userManager'},
                            {name: '建筑单元管理', path: 'buildingUnit'}, 
                            // {name: '回路管理', path: 'circuitManager'},
                            // {name: '监测回路管理', path: 'monitoringLoopManager'}, 
                            // {name: '设备管理', path: 'deviceManager'},
                            // {name: '主机管理', path: 'hostManager'}, 
                            // {name: '设备在线状态', path: 'deviceStatus'}
                        ]
                    },
                    {
                        name: '大屏展示', 
                        list: [
                            {name: '大屏展示', path: 'largeScreen'}
                        ]
                    }],

                // shortcutNav:[],//快捷导航列表
                styleObj: {left: '0px'},

                timingTask: true,
                timeDate: '',
                tempTask: false,
                slitherState: false,
            }
        },
        mounted() {

            // document.getElementsByTagName("body").className='active';
            this.timeDate = onlineTimeFn();
            let temp=getCookie('styleObjLeft');
            this.styleObj.left=temp?temp:'0px';
            console.log(this.styleObj,temp);
            // this.tempTask = setInterval(() => {
            //     if (this.timingTask) {
            //         this.timeDate = onlineTimeFn();
            //     } else {
            //         clearInterval(this.tempTask);
            //     }
            // }, 60000);

            //快捷导航切换路由  删除状态变更
            this.$root.SHORTCUTNAV.map((e) => {
                e.isTrue = true;
                if (this.$route.path.indexOf(e.path) != -1) {
                    e.isTrue = false;
                }
            });

            if (slitherStateFn()) {
                this.slitherState = true;
            } else {
                this.slitherState = false;
            }
        },
        methods: {
            goPath(path){
                if(path == ''){
                    this.noOpenMask = true;
                }
            },  
            loadNavFn(data) {//添加快捷导航
                let temp = true;
                this.$root.SHORTCUTNAV.map((e) => {
                    e.isTrue = true;
                    if (e.path == data.path) {
                        e.isTrue = false;
                        temp = false;
                    }
                });
                if (temp) {
                    data.isTrue = false;
                    this.$root.SHORTCUTNAV.push(data);
                }
            },
            leftSlither() {//左移快捷导航
                let temp = parseInt(this.styleObj.left) - 100;
                let temp1 = document.getElementsByClassName("fast-nav-ul");
                let temp2 = document.getElementsByClassName("fast-nav-box")[0].offsetWidth;
                if (parseInt(temp2) > parseInt(temp1[0].offsetWidth) + temp) {
                    this.styleObj.left = temp2 - parseInt(temp1[0].offsetWidth) + 'px';
                    return false;
                }
                this.styleObj.left = temp + 'px';
            },
            rightSlither() {//右移快捷导航
                let temp = parseInt(this.styleObj.left) + 100;
                if (temp > 0) {
                    this.styleObj.left = '0px';
                    return false;
                }
                this.styleObj.left = temp + 'px';
            },
            removeShortcutNav(data) {
                let tempIndex = 100;
                this.$root.SHORTCUTNAV.map((e, index) => {
                    if (e.path == data.path) {
                        tempIndex = index;
                    }
                });
                this.$root.SHORTCUTNAV.splice(tempIndex, 1);

                setTimeout(()=>{
                    if (slitherStateFn()) {
                        this.slitherState = true;
                    } else {
                        this.slitherState = false;
                    }
                })
            },
            signOutBtn(){
                this.$router.push('/alarm-center')
            }
        },
        destroyed() {//销毁    离开页面事件
            let temp=this.styleObj.left?this.styleObj.left:'0px';
            setCookie('styleObjLeft',temp)
        }
    }

    function onlineTimeFn() {
        let onlineTime = '';
        let tempTimer = (new Date()).valueOf() - getCookie('timeDate');

        let hours = Math.floor(tempTimer / (3600 * 1000));
        //计算相差分钟数
        let leave1 = tempTimer % (3600 * 1000);
        let minutes = Math.floor(leave1 / (60 * 1000));
        onlineTime = hours + '时' + minutes + '分';
        return onlineTime
    }

    // 滑动控件显示状态
    function slitherStateFn() {
        let temp1 = document.getElementsByClassName("fast-nav-ul")[0].offsetWidth;
        let temp2 = document.getElementsByClassName("fast-nav-box")[0].offsetWidth;
        // console.log()
        if (temp1 > temp2) {
            return true;
        } else {
            return false;
        }
    }
</script>

<style scoped lang="less">
    .head-nav {
        .header-nav {
            position: relative;
            width: 100%;
            height: 90px;
            background-color: rgba(0, 0, 0, 0.5);

        .hw-logo {
            position: absolute;
            top: 50%;
            left: 14px;
            width: 171px;
            height: 55px;
            background-image: url("../../../static/images/logo.png");
            background-size: cover;
            background-repeat: no-repeat;
            transform: translateY(-50%);
        }

    
        .nav-list {
            position: absolute;
            left: 577px;
            height: 100%;
            z-index: 999;

            li {
                position: relative;
                display: inline-block;
                height: 100%;

                span {
                        display: inline-block;
                    // width: 112px;
                    padding: 0 7px 0 7px;
                    // margin-right: 13px;
                    height: 100%;
                    line-height: 90px;
                    text-align: center;
                    font-size: 17px;
                    color: #fff;
                    cursor: pointer;
                } 

                .nav-list-box {
                    display: none;
                    position: absolute;
                    left: 50%;
                    width: 82px;
                    transform: translateX(-50%);
                    background-color: #2c4157;

                    p:hover {
                        background-color: #358f98;
                    }
                }

                &:hover .nav-list-box {
                    display: block;
                }

                a {
                    display: block;
                    height: 100%;
                    line-height: 32px;
                    text-align: center;
                    font-size: 12px;
                    color: #fff;
                    &.router-link-active {
                        // background-color: rgba(0,0,0,0.35);
                        background-color: #358f98;
                    }
                }
            }
        }

        .title-text {
            position: absolute;
            top: 50%;
            left: 195px;
            transform: translateY(-50%);
            font-size: 25px;
        }

        .user-data {
            position: absolute;
            right: 1rem;
            top: 50%;
            padding: 0.2rem 2.2rem 0.2rem 1.6rem;
            transform: translateY(-50%);
            background-color: rgba(0, 0, 0, 0.7);
            border-radius: 26px;
            font-size: 14px;

            .icon-Ellipse {
                position: absolute;
                left: 6px;
                top: 50%;
                color: #d1d310;
                font-size: 14px;
                transform: translateY(-50%);
            }

            .sign-Out-Btn{
                position: absolute;
                right: 12px;
                top: 50%;
                transform: translateY(-50%);
                .icon-Setup {
                    color: #fff;
                    font-size: 14px;
                    cursor: pointer;
                }
                b{
                    display: none;
                    position: absolute;
                    bottom: -1.6rem;
                    left: -0.6rem;
                    padding: 0.1rem 0.4rem;
                    white-space:nowrap;
                    text-align: center;
                    border-radius: 4px;
                    background-color: rgba(255,255,255,0.4);
                    cursor: pointer;
                }
                &:hover b{
                    display: inline-block;
                }
            }
        }
    }
    @media screen and (min-width: 1450px) {
        .header-nav {
            .nav-list {
                position: absolute;
                left: 701px;
                height: 100%;
                z-index: 999;

                li {
                    position: relative;
                    display: inline-block;
                    height: 100%;

                    span {
                        display: inline-block;
                        width: 112px;
                        height: 100%;
                        line-height: 90px;
                        text-align: center;
                        font-size: 20px;
                        color: #fff;
                        padding:0;
                        margin-right: 0;
                    }

                    .nav-list-box {
                        display: none;
                        position: absolute;
                        left: 50%;
                        width: 112px;
                        transform: translateX(-50%);
                        background-color: rgba(0, 0, 0, 0.5);
                    }
                }
            }
        }
        
        
    }
    .fast-nav-box {
      position: relative;
      margin-top: 1px;
      width: 100%;
      height: 40px;
      background-color: rgba(0, 0, 0, 0.3);

      ul {
        position: absolute;
        left: 0;
        top: 0;
        padding-right: 42px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        transition: all 0.3s ease-in-out;

        li {
          position: relative;
          display: inline-block;

          a {
            display: inline-block;
            padding: 0 20px;
            height: 40px;
            line-height: 40px;
            font-size: 16px;
            color: rgba(255, 255, 255, 0.5);
            border-right: 1px solid #222;

            &.router-link-active {
              background-color: rgba(0, 0, 0, 0.3);
              color: #fff;

              .close-btn {
                display: none;
              }
            }
          }

          .close-btn {
            position: absolute;
            right: 2px;
            top: 2px;
            font-size: 18px;
            color: rgba(255, 255, 255, 0.5);
            cursor: pointer;
            transition: color 0.25s ease-in-out;

            &:hover {
              color: rgba(255, 255, 255, 1);
            }
          }
        }
      }

      .left-right-slither {
        position: absolute;
        right: 0;
        top: 0;
        height: 40px;
        line-height: 40px;
        background-color: #222;

        i {
          color: rgba(255, 255, 255, 0.7);
          font-size: 1.2rem;
          cursor: pointer;
          transition: color 0.25s ease-in-out;

          &:hover {
            color: rgba(255, 255, 255, 1);
          }
        }
      }
    }
  }
</style>
<style>
  @import "./public/public.css";
</style>
<!--<style>-->
<!--  body{-->
<!--    min-width: 1920px;-->
<!--    overflow-x: auto;-->
<!--    overflow-y: hidden;-->
<!--  }-->
<!--</style>-->
