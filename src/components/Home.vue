<template>
  <div class="content-box">
    <Header/>
    <LeftNav/>
    <router-view></router-view>
  </div>
</template>

<script>
  import Header from './Header'
  import LeftNav from './LeftNav'

  export default {
    name: "Home",
    components: {
      Header,
      LeftNav
    },
  }
</script>

<style lang="less" scoped>
  .content-box {
    width: calc(100vw-240px);
    height: 100%;
    margin-top: 8vh;
    margin-left: 240px;
  }
</style>
