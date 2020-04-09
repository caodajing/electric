<!--主机管理-->
<template>
  <div class="electric-safety-bg">
    <headNav/>
    <div class="host-manager content-box">主机管理</div>
  </div>
</template>

<script>
    import headNav from '../headNav'
    export default {
        name: "hostManager",
        components: {
            headNav,
        },
    }
</script>

<style scoped lang="less">
  .host-manager{
    font-size: 30px;
  }
</style>



