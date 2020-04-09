<template>
  <div class="one-box">
    <p>每日警情处理</p>
    <v-chart :options="policeColumnar"/>
  </div>
</template>

<script>
  import ECharts from 'vue-echarts'
  import 'echarts/lib/chart/bar'
  import 'echarts/lib/component/legend'

  export default {
    name: "HomeFooterOne",
    components: {
      'v-chart': ECharts
    },
    data() {
      return {
        policeColumnar: {
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar'
          }]
        }
    }
    },
    created() {
      this.getAlarmMaoData()
    },
    methods: {
      getAlarmMaoData() {
      }
    }
  }
</script>

<style scoped lang="less">

  p {
    position: absolute;
  }

  .one-box {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .echarts {
    width: 100%;
    height: 100%;
  }
</style>
