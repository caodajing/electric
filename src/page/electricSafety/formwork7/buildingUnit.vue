<!--建筑单元管理-->
<template>
  <div class="electric-safety-bg">
    <headNav/>
    <div class="building-unit content-box">建筑单元管理</div>
  </div>
</template>

<script>
    import headNav from '../headNav'
    export default {
        name: "buildingUnit",
        components: {
            headNav,
        },
    }
</script>

<style scoped lang="less">
  .building-unit{
    font-size: 30px;
  }
</style>

