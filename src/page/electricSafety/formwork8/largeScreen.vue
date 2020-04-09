<!--大屏展示-->
<template>
    <div class="electric-safety-bg">
      <headNav/>
      <div class="large-screen content-box">大屏展示</div>
    </div>
</template>

<script>
    import headNav from '../headNav'
    export default {
        name: "largeScreen",
        components: {
            headNav,
        },
    }
</script>

<style scoped lang="less">
  .large-screen{
    font-size: 30px;
  }
</style>
