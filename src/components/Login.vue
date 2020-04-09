<template>
  <div class="login-box">
    <div class="login-wrap">
      <div class="input-box">
        <Input class="login-input" v-model="username" prefix="ios-contact" type="text" placeholder="请输入用户名"/><br>
        <Input class="login-input" v-model="password" prefix="ios-lock" type="password" placeholder="请输入密码"/><br>
        <Button class="login-btn" @click="login()" type="info">登录</Button>
      </div>
    </div>
  </div>
</template>

<script>
    import {setCookie, getCookie} from '../assets/js/cookie.js'

    export default {
        name: "Login",
        data() {
            return {
                showLogin: true,
                showRegister: false,
                username: '',
                password: '',
            }
        },
        created() {
            document.onkeydown = (e) => {
                let key = window.event.keyCode;
                if (key == 13) {
                    this.login();
                }
            }
        },
        methods: {
            login() {
                if (this.username == "" || this.password == "") {
                    this.$swal({
                        text: '请输入正确的账号和密码',
                        confirmButtonText: '确认',
                        showCancelButton: false
                    })
                } else {
                    /*接口请求*/
                    this.$ajax.get('/zigbee/zigbeeManagerAndMaintainerLogin', {
                        params: {
                            username: this.username,
                            password: this.password
                        }
                    }).then((res) => {
                        console.log(res)
                        if (res.data.code == 200) {
                            setCookie('token', res.data.data.fullname);//临时把dept_code作为token
                            setCookie('timeDate', (new Date()).valueOf());
                            setCookie('user_id', res.data.data.username);
                            setCookie('sid', res.data.data.id);
                            setCookie('username', encodeURIComponent(res.data.data.fullname));
                            setCookie('alarmHostNumber', encodeURIComponent(res.data.data.alarmHostNumber));
                            setCookie('processAuth', encodeURIComponent(res.data.data.processAuth));
                            setCookie('permission_unit_code', encodeURIComponent(res.data.data.permission_unit_code));
                            this.$router.push('/alarm-center')
                        } else {
                            this.$swal({
                                text: '请输入正确的账号和密码',
                                confirmButtonText: '确认',
                                showCancelButton: false
                            })
                        }
                    }).catch(function (error) {
                        console.log(error);
                    })
                }
            }
        }
    }
</script>

<style scoped lang="less">
  .login-box {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    text-align: center;
    background-image: url("../assets/images/bg.jpg");
    background-size: cover;
    background-repeat: no-repeat;

    .login-wrap {
      position: absolute;
      top: 50%;
      right: 10%;
      width: 593px;
      height: 573px;
      transform: translateY(-50%);
      background-image: url("../assets/images/login.png");
      background-size: cover;
      background-repeat: no-repeat;
      font-size: 20px;
      font-weight: normal;
      color: #fff;

      .input-box {
        position: absolute;
        top: 55%;
        transform: translateY(-50%);
        width: 100%;

        .login-input {
          width: 80%;
          margin: 10px 0;
        }

        .login-btn {
          margin-top: 10px;
          width: 80%;
        }
      }
    }
  }
</style>
