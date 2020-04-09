<!--设备在线状态-->
<template>
  <div class="electric-safety-bg">
    <headNav/>
    <div class="device-status content-box">设备在线状态</div>
  </div>
</template>

<script>
    import headNav from '../headNav'
    export default {
        name: "deviceStatus",
        components: {
            headNav,
        },
    }
</script>

<style scoped lang="less">
  .device-status{
    font-size: 30px;
  }
</style>



