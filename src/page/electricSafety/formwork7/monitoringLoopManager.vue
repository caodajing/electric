<!--监测回路管理-->
<template>
  <div class="electric-safety-bg">
    <headNav/>
    <div class="monitoring-loop-manager content-box">监测回路管理</div>
  </div>
</template>

<script>
    import headNav from '../headNav'
    export default {
        name: "monitoringLoopManager",
        components: {
            headNav,
        },
    }
</script>

<style scoped lang="less">
  .monitoring-loop-manager{
    font-size: 30px;
  }
</style>


