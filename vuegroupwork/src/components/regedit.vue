<style>

	.dv_regedit{
		width:400px;
		height:470px;
	  background-color :#EDB0DA;
		margin: auto;
		padding: 10px;
    position: absolute;
    float: left;
    margin-left: 900px;
    margin-top: 40px;
    border-radius: 40px;
    opacity: 0.9;
    border:#EDB0DA solid 10px;
    margin-top: 80px;
    box-shadow: 0px 0px 0px 10px #FFFFFF;


	}

	.dv_regedit div{
		text-align: left;
		padding: 10px;;
	}

.dv_banner{
		width:100%;
		background-image: url(../../static/imgs/login.png);
		height: 650px;
		background-position-x: -400px;
		background-position-y: 100px;
		background-size: 160%;
		background-repeat: no-repeat;
	/* 	background-color: pink; */
	}

	#keycode{
		float:left;margin-left: 30px;
		width: 100px;
		height: 50px;
		margin-top: -0px;
		border-radius: 9px;
		border: 2px dashed silver;

	}
	.form-control{
		border-color: transparent;
		background-color: #E9BEC1;
		color:#ffffff;
		border-radius: 0px;
	}
  input{
    border-radius: 7px;
     outline: none;
     width: 130px;
     height: 30px;
     position: relative;
     margin-top: 0px;

  }




</style>

<template>

	<div class="dv_banner">
    <div style="text-shadow: 0px 5px 10px mediumvioletred;">
      <i class="fa fa-cloud" style=" float: left;font-weight: bold; font-size: 20px;
       color: #FF4466; position: absolute;top: 40px;left: 25px;">&nbsp;蘑菇街</i>
       <div style="position: relative; margin-left: 120px; color: #FF4466;float: left; font-size: 20px;
             font-weight: bold;margin-top: 35px;">
         <i class="fa fa-circle" style="font-size: 9px;"></i>
         用户注册
       </div>
    </div>
		<div class="dv_regedit" >

      <div style="font-size: 25px;text-align: center;color: crimson;font-weight: bold;">
        注册页面
      </div>
      <br />
			<div>
				用&nbsp;&nbsp;户&nbsp;&nbsp;名：<input type="text" v-model="logname" @input="lognameIsOK()" />
				<span :class="{'text-success':logname_valid_class,'text-danger':(!logname_valid_class)}" >{{logname_valid}}</span>
			</div>
			<div>
				密 &nbsp;&nbsp;&nbsp; &nbsp;&nbsp; 码：<input type="text" v-model="password" />
			</div>
			<div>
				确认密码：<input type="text" v-model="password_confirm" @input="passwordConfirm()" />
				<span class="text-danger" >{{password_valid}}</span>
			</div>
			<div>
				验&nbsp;&nbsp;证&nbsp;&nbsp;码：<input  v-model="validCode" type="text" style="width: 100px;" @blur="validCodeIsOK()" />

        <img id="keycode" @click="changeCode()" style="float: right;" src="http://192.168.1.14:8088/springmvc190806/vaildCode"   />
		    <br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span class="text-danger">{{validCode_error}}</span>
      </div>
			<div style="text-align: center;">

				<hr />
				<button class="btn btn-danger" @click="doRegedit()"  >注册</button>
				<button class="btn btn-default">重置</button>
			</div>
		</div>
	</div>
</template>

<script>

	export default{

		data(){

			return {

				logname:"",
				password:"",
				password_confirm:"",
				logname_valid:"",
				logname_valid_class:true,
				password_valid:"",

				validCode:"",
				validCode_error:"",

				regeditReady:false
			};

		}


		,
		methods:{
			doRegedit(){

				var ok=this.isReady();

				if(ok){

					var ob=this;

					var url="http://192.168.1.14:8088/springmvc190806/ajaxctr/doregedit";
					$.ajax(url,{
							method:"get",
							data:{"logname":ob.logname,"password":ob.password},
							xhrFields: {"withCredentials": true},
							success:function(result){
								if(result){

									if(window.confirm("是否立即登陆？")){

										ob.$router.push({"name":"login"})
									}
									else{

										ob.$router.back(-1);
									}


								}
							}
						}
					)


				}else{
					console.log("错误");
				}


			}
			,
			isReady(){

				if(!this.logname_valid_class){
					return false;
				}
				if(this.password!=this.password_confirm){
					return false;
				}
				if(this.validCode_error!=""||this.validCode==""){
					return false;
				}
				this.regeditReady=true;
				return true;
			}

			,validCodeIsOK(){

				var ob=this;

				var url="http://192.168.1.14:8088/springmvc190806/ajaxctr/validisok";
				$.ajax(url,{
						method:"get",
						data:{"keycode":ob.validCode},
						xhrFields: {"withCredentials": true},
						success:function(result){
							if(!result){
								ob.validCode_error="验证码不正确";
								ob.changeCode();
							}
							else{
								ob.validCode_error="";
							}

							ob.isReady();
						}
					}
				)

			}
			,
			passwordConfirm(){

				if(this.password==this.password_confirm){
					this.password_valid="";
				}
				else{
					this.password_valid="两次输入不一致";

				}
				this.isReady();
			}

			,lognameIsOK(){
				var ob=this;

				var url="http://192.168.1.14:8088/springmvc190806/ajaxctr/lognameisok";
				$.ajax(url,{
						method:"get",
						data:{"logname":ob.logname},
						xhrFields: {"withCredentials": true},
						success:function(result){

							if(result){
								ob.logname_valid="用户名可用";
								ob.logname_valid_class=true;

							}
							else{
								ob.logname_valid="用户名已存在";
								ob.logname_valid_class=false;
							}

							ob.isReady();
						}
					}
				)


			}
			,
			changeCode(){

				$("#keycode")[0].src="http://192.168.1.14:8088/springmvc190806/vaildCode";

			},

		}


	}


</script>

<style>



</style>
