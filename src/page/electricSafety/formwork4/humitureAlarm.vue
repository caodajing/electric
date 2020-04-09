<!--温湿度报警明细-->
<template>
  <div class="electric-safety-bg">
    <headNav/>
    <div class="humiture-alarm content-box">温湿度报警明细</div>
  </div>
</template>

<script>
    import headNav from '../headNav'
    export default {
        name: "humitureAlarm",
        components: {
            headNav,
        },
    }
</script>

<style scoped lang="less">
  .humiture-alarm{
    font-size: 30px;
  }
</style>
