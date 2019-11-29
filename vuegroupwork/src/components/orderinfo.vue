<style>
  input{
    position: relative;
    margin: 15px;
  }
</style>

<template>

	<div>
    <div class="input-group-addon" style="font-size: 20px;">
      <!--
      		{{ctids}}
       -->
      		收件人地址：<input type="text" v-model="address" ><br />
      		收件人姓名：<input type="text" v-model="recipient" ><br />
      		收件人电话：<input type="text" v-model="contactnumber"><br />
      		<button @click="pay()" class="btn btn-info">付款</button>
    </div>

	</div>

</template>

<script>
	export default{

		data(){
			return {
				address:"",
				recipient:"",
				contactnumber:"",
				ctids:[],


			}
		},
		mounted(){
			this.ctids=this.$route.query.ctids;
			console.log(this.ctids.length);

		},
		methods:{

			pay(){

				var ob=this;
				var url="http://127.0.0.1:8086/springMVC/orderinfoctrl/creatorder";
				$.ajax(url,{
				data:{
					address:ob.address,
					recipient:ob.recipient,
					contactnumber:ob.contactnumber,
					"ctid":ob.ctids

				},
				xhrFields: {"withCredentials": true},
				traditional:true,//防止深度序列化

				success:function(result){
					if(result){
					ob.$router.push({"name":"orderinfo_records"});

					}

				}});
			}

		}
	}

</script>
