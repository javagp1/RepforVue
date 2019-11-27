
<template>
  <div>
    <div class="header-wrap">
       <div class="logo" @click="home()"></div>
    </div>
  <div class="center_box">

    <div class="loginbox" :class="{'loginbox_withtip':error_show}">
      <div style="width: 100%;min-height: 100%;">
        <div style="width: 100%;height: 50px;">
          <div class="logtitle">用户登录</div>
          <div class="logtitle"></div>
        </div>

      <div :class="{'errortip':error_show}" >{{tip}}{{validCode_error}}</div>
    <div class="iptbox"> <input class="logipt" type="text" placeholder="用户名" v-model="logname" />
      </span>
    </div>
    <div class="iptbox"><input class="logipt" placeholder="密码" type="password" v-model="password" /> </div>
    <div class="iptbox">
      <div style="height: 50px;width: 315px;margin: auto;">
        <input class="valid" placeholder="验证码"  type="text"  v-model="validCode" />
        <img id="keycode" @click="changeCode()" src="http://192.168.1.19:8086/springMVC/vaildCode" style="margin-left: 0px;cursor: pointer;" height="40px"/>
      </div>
    </div>
    <div class="iptbox">

      <button class="submit" @click="login()">登录</button>

 
    </div>
    <div class="iptbox"><a @click="register()">免费注册</a> </div>
    </div>
    </div>
  </div>
  </div> 
</template>

<script>
  export default {
    data() {

      return {

        logname: "",
        password: "",


        validCode: "",
        validCode_error: "",


        tiptext:["用户不存在","密码错误","用户已被冻结"],
        tip:"",
        error_show:false
      };

    },


    methods: {
      home(){
        this.$router.push(
        {
          "name":"main"
        })
      },
      login() {




          var ob = this;
          ob.tip="";
          ob.validCodeIsOK();
          if(ob.validCode_error != ""){
            return;
          }

          var url = "http://192.168.1.19:8086/springMVC/userctrl/login";
          $.ajax(url, {
            method: "post",
            data: {
              "logname": ob.logname,
              "password": ob.password
            },
            xhrFields: {
              "withCredentials": true
            },
            success: function(result) {
              var regok= ob.$route.query.regok;
              if(result==1){
                if(regok){
                    ob.$router.go(-3);
                    ob.error_show=false;
                }else{
                    ob.$router.back(-1);
                    ob.error_show=false;
                }

              }else{
                ob.tip=ob.tiptext[result-2]
                ob.error_show=true;
              }
            }
          })





      },
      isReady() {

        if (!this.logname_valid_class) {
          return false;
        }
        if (this.password != this.password_confirm) {
          return false;
        }
        if (this.validCode_error != "" || this.validCode == "") {
          return false;
        }
        this.regeditReady = true;
        return true;
      }

      ,
      validCodeIsOK() {

        var ob = this;

        var url = "http://192.168.1.19:8086/springMVC/userctrl/validisok";
        $.ajax(url, {
          method: "get",
          async: false,
          data: {
            "keycode": ob.validCode
          },
          xhrFields: {
            "withCredentials": true
          },
          success: function(result) {
            if (!result) {

              ob.validCode_error = "验证码不正确";
              ob.changeCode();
              ob.error_show=true;
            } else {
              ob.validCode_error = "";
              ob.error_show=false;
            }


          }
        })
      },




      changeCode() {

        $("#keycode")[0].src = "http://192.168.1.19:8086/springMVC/vaildCode";

      },
      register(){
        this.$router.push(
        {
          "name":"register"
        })
      }

    }


  }
</script>

<style>
  .header-wrap {
    height: 90px;
    width: 100%;
    margin: auto;
    background-color: white;
    z-index: 20;
  }
  .logo {
    float: left;
    width: 130px;
    height: 90px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-image: url(../../static/img/logo260x200.png);
    margin-left: 30px;
    margin-top: 0px;
  }
  .center_box{
    width: 100%;
    height: 600px;
    background: url(../../static/img/login_1920x600.png) center center no-repeat;
  }
  .loginbox {
    width: 400px;
    height: 350px;
    /* background-color: #2AABD2; */
    margin: auto;
    /* padding: 30px; */
    float: right;
    margin-top: 80px;
    margin-right: 90px;
    background-color: #ffeceb;
    opacity: .9;
  }
  .loginbox_withtip{
    height: 400px;
  }
  .logtitle{
    width: 50%;
    height: 100%;
    margin-top: 0px;
    float: left;
    text-align: center;
    line-height: 50px;
    color: #fe617a;
    font-size: 14px;
    font-weight: 700;
    border-bottom: 1px solid #ccc;
    margin-bottom:9px;
  }
  .errortip{
        background: url(https://s10.mogucdn.com/pic/140408/o613k_kqzfunswozbg2s2ugfjeg5sckzsew_16x16.png) 12px no-repeat #fffff8;
        border: 1px solid #ffd797;
        height: 30px;
        line-height: 30px;
        color: #ff1877;
        width: 315px;
        padding-left: 40px;

        display: ;
        margin: auto;
        margin-bottom: 10px;
        margin-top: 15px;
        text-align: left;
  }
  .iptbox{
    margin: auto;
    margin-bottom: 15px;
  }




  .loginbox .logipt {

    background: none!important;
    border: 1px solid #ccc;
    padding: 0 6px;
    outline: 0;
    height: 40px;
    width: 315px;
  }
  .valid{
    width: 80px;
    height:40px;
    background: none!important;
    border: 1px solid #ccc;
    padding: 0 6px;
    outline: 0;
    float: left;
  }
  .submit{
        /* display: inline; */

        border: none;
        width: 314px;
        height: 40px;
        background: #ff5777;
        border-radius: 2px;
        cursor: pointer;
        color: #fff;
  }

  .iptbox a{
     color: #959595;
     float:right;
     text-decoration: underline;
     cursor:pointer;
     margin-right:40px
  }
</style>
