<!--设备管理-->
<template>
  <div class="electric-safety-bg">
    <headNav/>
    <div class="device-manager content-box">设备管理</div>
  </div>
</template>

<script>
    import headNav from '../headNav'
    export default {
        name: "deviceManager",
        components: {
            headNav,
        },
    }
</script>

<style scoped lang="less">
  .device-manager{
    font-size: 30px;
  }
</style>



