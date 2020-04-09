<!--烟感报警明细-->
<template>
  <div class="electric-safety-bg">
    <headNav/>
    <div class="smoke-alarmDetails content-box">烟感报警明细</div>
  </div>
</template>

<script>
    import headNav from '../headNav'

    export default {
        name: "smokeAlarmDetails",
        components: {
            headNav,
        },
    }
</script>

<style scoped lang="less">
  .smoke-alarmDetails {
    font-size: 30px;
  }
</style>
