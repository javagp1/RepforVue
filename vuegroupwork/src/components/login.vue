<style>
	.dv_regedit{
		width:350px;
		height:450px;
		background-color:#FFFFFF;
		padding: 50px;
		line-height: 40px;
		padding-top: 20px;
    position: relative;
    	float:right;
      margin-right: 30px;
		border-radius: 26px;
    /*  box-shadow: 0px 0px 50px pink; */
	 	border:#FF4466 solid 10px;
		margin-top: 50px;
		box-shadow: 0px 0px 0px 10px #FFFFFF;

	}



	.dv_regedit div{


	}
	.dv_regedit .lab_title{
		width:300px;
		text-align:left;
		color:#EE6688;
		padding-left: 10px;
		letter-spacing: 4px;
	}

	.dv_banner{
		width:100%;
	  background-image: url(../../static/imgs/login3.jpg);
		height: 500px;
		background-position-x: 100px;
		background-repeat: no-repeat;
		background-color:;
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


</style>

<template>
	<div style="">
			<div style="height: 80px;" >
		 <div class="dv_log" style="width: 100%; height: 100%; font-weight: bold;font-size: 20px;
                text-align: left;padding-left: 120px;padding-top: 37px; color:#FF4466 ;text-shadow: 0px 5px 10px mediumvioletred;" >
		 			    <i class="fa fa-cloud" style=" float: left;font-weight: bold; font-size: 20px;
               color: #FF4466; position: absolute;top: 40px;left: 25px;">&nbsp;蘑菇街</i>
              		  <i class="fa fa-circle" style="font-size: 9px;"></i>
		 			 用户登陆
		 			 &nbsp;

		 	</div>

		</div>

		<div class="dv_banner">


				<div class="dv_regedit" >
          <div>
            <div class="lab_title">
              <i class="fa fa-user">用户登录</i>
              <i class="fa fa-bus">商家登录</i>
            </div>
              <hr />
          </div>
        

					<div>
						<div class="lab_title" >
							<i class="fa fa-user"></i> 用户名

						</div>
						<div class="dv_ipt" >
							<input type="text" class="form-control" v-model="logname"  />
						</div>
					</div>

					<div>
						<div class="lab_title" >
							<i class="fa fa-user"></i> 密码

						</div>
						<div class="dv_ipt">
							<input type="password" class="form-control"  v-model="password"  />
						</div>
					</div>
					<div>
					<div class="lab_title" >
							<i class="fa fa-user-secret"></i> 验证码 {{validCode_error}}
						</div>
						<div class="dv_ipt">
							<input type="text" v-model="validCode" @blur="validCodeIsOK()"  class="form-control"  style="float: left;width: 100px;" />

						</div>
						<img src="http://192.168.1.13:8088/springmvc190806/vaildCode" id="keycode" @click="changeCode()"/>
					</div>
					<br />
					<hr />
					<button type="button" @click="login()" class="btn btn-danger">登录</button>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<button class="btn btn-default">重置</button>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<br/><br/>
					<div class="alert alert-danger text-danger" v-if="errormessage!=''">
						{{errormessage}}
					</div>
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
				errormessage:"",
				messages:[
					"",
					"用户不存在",
					"用户已被禁用，如有需要请联系管理员",
					"密码错误",

				],
				validCode:"",
				validCode_error:""
			}

		},

		methods:{
			login(){
				this.validCodeIsOK();

				if(this.validCode_error!=""){
					return;
				}


				var ob=this;

				var url="http://192.168.1.13:8088/springmvc190806/ajaxctr/login";
				$.ajax(url,{
						method:"get",
						data:{"logname":ob.logname,"password":ob.password},
						xhrFields: {"withCredentials": true},
						success:function(result){

							if(result==1){

								ob.$router.back(-1);

							}else{
								ob.errormessage=ob.messages[result-1];
							}


						}
					}
				)


			},
			validCodeIsOK(){

				var ob=this;

				var url="http://192.168.1.13:8088/springmvc190806/ajaxctr/validisok";
				$.ajax(url,{
						method:"get",
						async:false,
						data:{"keycode":ob.validCode},
						xhrFields: {"withCredentials": true},
						success:function(result){
							if(!result){
								ob.validCode_error="不正确";
								ob.changeCode();
							}
							else{
								ob.validCode_error="";
							}



						}
					}
				)

			}
			,
			changeCode(){

				$("#keycode")[0].src="http://192.168.1.13:8088/springmvc190806/vaildCode";

			},
		}


	}


</script>
