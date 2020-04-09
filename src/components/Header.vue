<template>
  <div class="header">
    <Row align="middle" type="flex" style="height: 100%">
        <Col span="1"><i class="iconfont icon-logo" style="font-size:2vw"></i></Col>
        <Col span="4">
          <Row type="flex">
            <Col span="24"><span style="font-size:1.4vw; color: aqua">智慧消防物联网监测平台</span></Col>
            <Col span="24"><span style="font-size:1vw">Intelligent Fire Monitoring Platform</span></Col>
          </Row>
        </Col>
        <Col span="2" offset="14">欢迎您：{{ userName }}</Col>
        <Col span="2">
          <Row>
            <Col span="8" class="mouse-pointer" >
              <Row>
                <Col span="24"><i class="iconfont icon-tophome" @click="toIndex"></i></Col>
              </Row>
              <Row>
                <Col span="24">首页</Col>
              </Row>
            </Col>
            <Col span="8" class="mouse-pointer">
              <Row>
                <Col span="24"><i class="iconfont icon-topfanhui" @click="goBack"></i></Col>
              </Row>
              <Row>
                <Col span="24">返回</Col>
              </Row>
            </Col>
            <Col span="8" class="mouse-pointer">
              <Row>
                <Col span="24"><i class="iconfont icon-toptuichu" @click="logOut"></i></Col>
              </Row>
              <Row>
                <Col span="24">退出</Col>
              </Row>
            </Col>
          </Row>
        </Col>
    </Row>
    <div class="right">

    </div>
  </div>
</template>

<script>
  import { getCookie, delCookie } from '../assets/js/cookie.js'
  export default {
    name: "Header",
    data() {
      return {
        userName: decodeURIComponent(getCookie('username'))
      }
    },
    methods: {
      toIndex() {
        this.$router.push({ path:'/'  })
      },
      goBack() {
        this.$router.go(-1)
      },
      logOut() {
        delCookie('token');
        this.$router.push('/login')
      }
    },
  }
</script>

<style lang="less" scoped>
  @color-bg:#2A3783;
  .header{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 90px;
    background-color: @color-bg;
    color: #fff;
    z-index: 9;
    text-align: center
  }
  .mouse-pointer{
    cursor: pointer;
  }
</style>
