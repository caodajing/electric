<!--安全报告-->
<template>
    <div class="electric-safety-bg">
        <headNav/>
        <div class="energy-profile-wrap safety-reports-wrap">
            <div class="left-box">
                <div class="month-box">
                    <p class="title">用电安全月报</p>
                    <ul>
                        <li>2019年01月</li>
                        <li>2019年02月</li>
                        <li>2019年03月</li>
                        <li>2019年04月</li>
                        <li>2019年05月</li>
                        <li>2019年06月</li>
                        <li>2019年07月</li>
                        <li>2019年08月</li>
                        <li>2019年09月</li>
                        <li>2019年10月</li>
                        <li>2019年11月</li>
                        <li>2019年12月</li>
                    </ul>
                </div>
                <div class="quarter-box">
                    <p class="title">用电安全季报</p>
                    <ul>
                        <li>2019年01月-2019年03月</li>
                        <li>2019年04月-2019年06月</li>
                        <li>2019年07月-2019年09月</li>
                        <li>2019年10月-2019年12月</li>
                    </ul>
                </div>
                <div class="year-box">
                    <p class="title">用电安全年报</p>
                    <ul>
                        <li>2019年</li>
                    </ul>
                </div>
            </div>
            <div class="right-box">
                <p class="title">2019年01月用电能耗报告</p>
                <div class="content">
                    <p>能耗报告月度：2019年01月</p>
                    <p>能耗统计项目：武商世贸</p>
                    <p>报告内容：</p>
                    <p>1、月度能耗概况</p>
                    <p class="indent">本月总能耗为270894.0kWh，同比下降.00%，环比上升160.96%。自EnergyRiver系统运行以来，本月整体能耗同比下降.00%，节能效果未能体现。 本月主要用电能耗类型为照明回路设备用电，能耗总额为270894.0kWh。 月度能耗排名前三的部门／机构是:世贸广场一层、世贸广场六层、世贸广场七层，月度能耗158327.2kWh，占企业月度总能耗的58.45%； 本月整体人均能耗指标为27.09kWh/人，同比下降.00%。 本月整体单位面积能耗指标为2.71kWh/m2，同比下降.00%。</p>
                    <p>2、月度能耗构成分析</p>
                    <p>(1)能耗构成汇总分析</p>
                    <p class="indent"> 本月能耗分用电类型构成情况分析如下：</p>
                    <p class="indent">本月主要用电能耗类型为照明回路类设备用电，能耗总额为149457.44kWh，占总能耗55.17%，同比上升.00%，环比上升167.86%。</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import headNav from '../headNav'
    export default {
        name: "safetyReports",
        components: {
            headNav,
        },
    }
</script>

