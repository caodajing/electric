<!--安全概况-->
<template>
    <div class="electric-safety-bg">
        <headNav/>
        <div class="electric-safety content-box electric-safety-wrap">
            <div class="left">
                <safetyMould1/>
                <safetyMould2/>
            </div>
            <div class="right">
                <rightChart1/>
                <!--<rightChart2/>-->
            </div>
            <div class="mask alarm-mask" v-if="alarmMask">
                <div class="main">
                    <a href="javascript:;" class="close" @click="alarmMask = false"></a>
                    <div class="title">今日告警、报警详情</div>
                    <div class="box">
                        <div class="alarm-number-box">
                            <div class="title">今日安全警告次数：0次（0节点）</div>
                            <div class="list">
                                <table>
                                    <thead>
                                        <th>机构名称</th>
                                        <th>建筑名称</th>
                                        <th>回路名称</th>
                                        <th>告警类型</th>
                                        <th>日期时间</th>
                                        <th>警告内容</th>
                                    </thead>
                                    <tbody>
                                        <tr v-for="item in 10">
                                            <td>1212</td>
                                            <td>1212</td>
                                            <td>12</td>
                                            <td>1221</td>
                                            <td>1212</td>
                                            <td>122</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="alarm-number-box remind-number-box">
                            <div class="title">今日安全提醒次数：6次（1节点）</div>
                            <div class="list">
                                <table>
                                    <thead>
                                        <th>机构名称</th>
                                        <th>建筑名称</th>
                                        <th>回路名称</th>
                                        <th>告警类型</th>
                                        <th>日期时间</th>
                                        <th>警告内容</th>
                                    </thead>
                                    <tbody>
                                        <tr v-for="item in 10">
                                            <td>1212</td>
                                            <td>1212</td>
                                            <td>12</td>
                                            <td>1221</td>
                                            <td>1212</td>
                                            <td>122</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mask warn-mask" v-if="warnMask">
                <div class="main">
                    <div class="box">
                        <img src="../../../assets/images/warn-icon.png" alt="">
                        <div class="info-box">
                            <p class="clearfix">
                                <span>节点名称：</span>
                                <i>食堂1插座1(181218001192)</i>
                            </p>
                            <p class="clearfix">
                                <span>预警时间：</span>
                                <i>2019-12-13 09:54:45</i>
                            </p>
                            <p class="clearfix">
                                <span>警告内容：</span>
                                <i>2019-12-13 09:54:45,食堂1插座1上的食堂1插座1(181218001192)的电流达到16.51A,该回路的额定电流为16.0A,告警阈值比例为90%。</i>
                            </p>
                            <p class="clearfix"> 
                                <span>处置意见：</span>
                                <i>请即排查！</i>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import headNav from '../headNav'
    import safetyMould1 from './safetyMould1'
    import safetyMould2 from './safetyMould2'
    import rightChart1 from './rightChart1'
    // import rightChart2 from './rightChart2'

    export default {
        name: "electricSafety",
        data(){
            return{
                alarmMask:false,
                warnMask:false
            }
        },
        components: {
            headNav, 
            safetyMould1, 
            safetyMould2, 
            rightChart1
        },
        mounted() {
            // fullScreen();
        }
    }


    function fullScreen(){
        var el = document.documentElement;
        var rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullScreen;

        //typeof rfs != "undefined" && rfs
        if (rfs) {
            rfs.call(el);
        }
        else if (typeof window.ActiveXObject !== "undefined") {
            //for IE，这里其实就是模拟了按下键盘的F11，使浏览器全屏
            var wscript = new ActiveXObject("WScript.Shell");
            if (wscript != null) {
                wscript.SendKeys("{F11}");
            }
        }
    }
</script>

<style scoped lang="less">
  .electric-safety {
    .left {
      display: inline-block;
      width: 512px;
      font-size: 16px;
    }

    .right {
      display: inline-block;
      margin-left: 10px;
      width: calc(100% - 526px);
      height: calc(100vh - 151px);
      vertical-align: top;
    }
  }
</style>
