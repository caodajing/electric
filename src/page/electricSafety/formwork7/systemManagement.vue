<!--系统管理-->
<template>
    <div class="electric-safety-bg">
      <headNav/>
      <div class="system-management content-box">系统管理</div>
    </div>
</template>

<script>
    import headNav from '../headNav'
    export default {
        name: "systemManagement",
        components: {
            headNav,
        },
    }
</script>

<style scoped lang="less">
  .system-management{
    font-size: 30px;
  }
</style>
