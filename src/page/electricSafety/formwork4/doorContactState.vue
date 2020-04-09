<!--门磁状态明细-->
<template>
  <div class="electric-safety-bg">
    <headNav/>
    <div class="door-contactState content-box">门磁状态明细</div>
  </div>
</template>

<script>
    import headNav from '../headNav'

    export default {
        name: "doorContactState",
        components: {
            headNav,
        },
    }
</script>

<style scoped lang="less">
  .door-contactState {
    font-size: 30px;
  }
</style>
