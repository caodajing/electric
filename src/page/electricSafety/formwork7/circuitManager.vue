<!--回路管理-->
<template>
  <div class="electric-safety-bg">
    <headNav/>
    <div class="circuit-manager content-box">回路管理</div>
  </div>
</template>

<script>
    import headNav from '../headNav'
    export default {
        name: "circuitManager",
        components: {
            headNav,
        },
    }
</script>

<style scoped lang="less">
  .circuit-manager{
    font-size: 30px;
  }
</style>

