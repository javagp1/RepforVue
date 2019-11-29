<template>
  <div>
    <div class="header-wrap" style="box-shadow: 0px 1px 10px 0px #DBDBDB;">
      <div class="logo" @click="home()"></div>
      <div class="logotitle"><span style="margin: 0px 10px;color:  #666666;font-size: 22px;">|</span>注册蘑菇街账号

      </div>
      <div style="float: right;height:90px;line-height:90px;margin-right:50px">已有账号，立即<a style="cursor: pointer;"
          @click="toLogin()">登录</a> </div>

    </div>

    <div class="centerbox">
      <p><label>用户名:</label> <input placeholder="请设置用户名,最长14个字符" type="text" required="required" v-model="logname"
          @blur="lognameIsOK()" />
        <span class="tips" :class="{'text-success':logname_valid_class,'text-danger':(!logname_valid_class)}">{{logname_valid}}</span>
      </p>
      <p><label>密码:</label><input placeholder="请设置登录密码,长度为6~16个字符" type="password" v-model="password" @blur="passwordIsOk()" />
        <span class="text-danger tips">{{password_ok}}</span> </p>
      <p><label>确认密码:</label> <input placeholder="请再次输入密码" type="password" v-model="password_confirm" @blur="passwordConfirm()" />
        <span class="tips text-danger">{{password_valid}}</span>
      </p>
      <p><label>验证码:</label> <input placeholder="请输入验证码" type="text" style="width: 180px;" v-model="validCode" />
        <img id="keycode" @click="changeCode()" src="http://127.0.0.1:8086/springMVC/vaildCode" style="float: left;width: 160px;height: 40px;cursor: pointer;" />
        <span class="tips text-danger">{{validCode_error}}</span>
      </p><br />
      <p>

        <button class="btnreg" @click="validCodeIsOK(),doRegedit()">注册</button>


      </p>
    </div>
  </div>
</template>

<script>
  export default {
    data() {

      return {

        logname: "",
        password: "",
        password_ok: "",
        password_confirm: "",
        logname_valid: "",
        logname_valid_class: true,
        password_valid: "",

        validCode: "",
        validCode_error: "",

        regeditReady: false
      };

    },


    methods: {
      home() {
        this.$router.push({
          "name": "main"
        })
      },
      toLogin() {
        this.$router.push({
          "name": "login",
          query: {
            "regok": true
          }
        });

      },
      doRegedit() {

        var ok = this.isReady();

        if (ok) {

          var ob = this;

          var url = "http://127.0.0.1:8086/springMVC/userctrl/doregister";
          $.ajax(url, {
                method: "get",
                data: {
                  "logname": ob.logname,
                  "password": ob.password
                },
                xhrFields: {
                  "withCredentials": true
                },
                success: function(result) {
                  if (result) {


                    if (confirm("注册完成,是否立即登录？")) {
                      ob.$router.push({
                        "name": "login",
                        query: {
                          "regok": true
                        }
                      })
                      console.log(result);
                    } else {
                      ob.$router.go(-2);
                    }

                  } else {
                    console.log("错误");
                  }
                  }
                })




            }
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
            passwordIsOk() {
              if (this.password.length < 6 || this.password.length > 16) {
                this.password_ok = "请输入6~16个字符";
              } else {
                this.password_ok = "";
              }

            },
            validCodeIsOK() {

              var ob = this;

              var url = "http://127.0.0.1:8086/springMVC/userctrl/validisok";
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
                  } else {
                    ob.validCode_error = "";
                  }

                  ob.isReady();
                }
              })
            },
            passwordConfirm() {

              if (this.password == this.password_confirm) {
                this.password_valid = "";
              } else {
                this.password_valid = "两次输入不一致";

              }
              this.isReady();
            }

            ,
            lognameIsOK() {
              var ob = this;

              var url = "http://127.0.0.1:8086/springMVC/userctrl/lognameisok";
              $.ajax(url, {
                method: "get",
                data: {
                  "logname": ob.logname
                },
                xhrFields: {
                  "withCredentials": true
                },
                success: function(result) {

                  if (result && ob.logname.length != 0 && ob.logname.length <= 14) {
                    ob.logname_valid = "用户名可用";
                    ob.logname_valid_class = true;

                  } else if (ob.logname.length == 0) {
                    ob.logname_valid = "请输入用户名";
                    ob.logname_valid_class = false;
                  } else if (ob.logname.length > 14) {
                    ob.logname_valid = "请输入少于14个字符";
                    ob.logname_valid_class = false;
                  } else {
                    ob.logname_valid = "用户名已存在";
                    ob.logname_valid_class = false;
                  }

                  ob.isReady();
                }
              })


            },



            changeCode() {

              $("#keycode")[0].src = "http://127.0.0.1:8086/springMVC/vaildCode";

            },

        }


      }
</script>

<style>
  .centerbox {
    width: 720px;
    height: 400px;
    /* background-color: #2AABD2; */
    margin-top: 40px;
    margin-left: 100px;
    padding: 20px;

  }

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
    cursor: pointer;
  }

  .logotitle {
    width: 300px;
    height: 100%;
    float: left;
    line-height: 90px;
    font-size: 20px;
    text-align: left;
  }

  .centerbox p {
    height: 40px;
    display: block;
    position: relative;
    clear: both;
    margin-bottom: 20px;
    zoom: 1;

  }


  .centerbox label {
    display: block;
    float: left;
    height: 42px;
    width: 65px;
    margin-right: 10px;
    line-height: 42px;
    font-size: 14px;
    color: #666;
    font-weight: 700;
    text-align: right;
  }

  .centerbox input {
    display: block;
    position: relative;
    float: left;
    height: 40px;
    width: 350px;
    padding: 11px 10px;
    margin-right: 10px;
    border: 1px solid #ddd;
    font-size: 14px;
    color: #666;
    transition: .3s;
  }

  .centerbox span {
    display: block;
    height: 40px;
    float: left;
    line-height: 40px;
  }

  .tips {
    margin-left: 10px;
  }

  .btnreg {
    background-color: #ff5777;
    display: block;
    height: 50px;
    width: 350px;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    color: #fff;
    background-image: none;
    border-radius: 3px;
    border: 0;
    margin-left: 75px;
  }
</style>
