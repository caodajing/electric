<template>
  <div id="app">
    <div class="content">
      <router-view/>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>
<style lang="css">
    @import "./assets/css/style.css"
</style>
<style>
  #app {
    position: relative;
    width: 100%;
    height:1080px;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #333;
    overflow: hidden;
  }

  html {
    height: 100%;
  }

  body {
    margin: 0;
    padding: 0;
    height: 100%;
  }

  ul,ol {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  ul li,ol li, p {
    padding: 0;
    margin: 0;
  }
  .content{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }
  /*滚动条 start*/
  .scroll-bar-style{
    overflow: auto;
    float: left;
    margin: 5px;
    border: none;
  }
  .scroll-bar-style::-webkit-scrollbar {/*滚动条整体样式*/
    width: 10px;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }
  .scroll-bar-style::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background: #535353;
  }
  .scroll-bar-style::-webkit-scrollbar-track {/*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    border-radius: 10px;
    background: #EDEDED;
  }
  /*滚动条 end*/

  /*
  隐藏百度地图logo
  */
  .BMap_cpyCtrl {
    display: none;
  }
  .BMap_noprint {
    display: none;
  }
  .anchorBL {
    display: none;
  }

</style>
