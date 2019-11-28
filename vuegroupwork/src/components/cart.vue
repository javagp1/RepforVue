<style>

	.cartimg{
		width: 50px;
		height: 60px;
		background-color: pink;
		margin: auto;
		margin-top: 6px;
		background-size: 100%;
	}

	.dv_newcloth {
		padding-left: 30px;
		border-right: #DDDDDD solid 0px;
		text-align: left;
		width: 230px;
		height: 100%;
		background-color: ;
		position: relative;
		left: 0px;
		float: left;
		padding-top: 30px;
	}

	.table tbody tr td{
		line-height: 60px;
	}

</style>

<template>
	<div>


		<search></search>
		<toolbar_1></toolbar_1>

		<div style="position: relative;margin-top:20px">
			<newcloth></newcloth>

			<div style="position: relative;float:right;width: 70%;margin: 50px;height: 450px;">
				<div style="width: 100%;height:400px ;overflow: auto;" >
					<table class="table table-condensed ">

						<thead>
							<tr class="text-warning">
								<td>序号</td>
								<td>图片</td>
								<td>尺码</td>
								<td>单价</td>
								<td>数量</td>
								<td>单项合集</td>
								<td>操作</td>
								<td>全部  <input type="checkbox" value="1" v-model="chooseAll" /> 结算</td>

							</tr>

						</thead>

						<tbody>
							<tr v-for="(item,index) in cartlist" >
							<td >{{index+1}}</td>
							<td >
								<div class="cartimg" :style="item.bgimg"></div>
							</td>
							<td >{{item.gstext}}</td>
							<td>￥  {{item.price}}</td>
							<td>

								<div>
									<button class="btn btn-link" @click="changeCountForCart(item.ctid,item.gdcount-1,index)" >
										<i class="fa fa-minus-square fa-2x text-primary"></i>
									</button>
									<span>&nbsp; {{item.gdcount}}&nbsp; </span>
									<button class="btn btn-link" @click="changeCountForCart(item.ctid,item.gdcount+1,index)" >
										<i class="fa fa-plus-square fa-2x text-primary"></i>
									</button>
								</div>

							</td>
							<td>￥  {{item.price*item.gdcount}}</td>
							<td>
								<button class="btn btn-link" @click="changeCountForCart(item.ctid,0,index)" >
									<i class="fa fa-close fa-2x text-danger"></i>
								</button>
							</td>
							<td>
								<input  class="ipt_1"  type="checkbox"  :value="index"  v-model="toPay"  >

							</td>
						</tr>

						</tbody>

					</table>

				</div>


				<div style="position: absolute;width: 100%;bottom: 0px;" >
				<hr/>
					合计 <span style="font-size: 26px;color:#ee5566;">￥{{sum}}.00 </span>

					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<button class="btn btn-link" @click="toMKOrder()">结算</button>
				</div>
			</div>




		</div>




	</div>


</template>

<script>

	import search from '@/components/search.vue'
	import toolbar_1 from '@/components/toolbar_1.vue'
	import newcloth from '@/components/newcloth.vue'


	export default{
		components:{search,toolbar_1,newcloth},

		data(){
			return {
				ctid:"",
				gdcount:0,
				//用户购物车信息
				cartlist:[],
				sum:0,
				//准备进行结算的购物车单项（被选中的）
				toPay:[],
				chooseAll:0,
				ctids:[]

			}

		},
		mounted(){

			this.getCartList();
		},
		watch:{
			toPay(){
				this.doSum();

				this.ctids=[];
				for(var i in this.toPay){
					var index=this.toPay[i];
					console.log(this.cartlist[index].ctid);
					this.ctids.push(this.cartlist[index].ctid);

				}


			},
			chooseAll(){
				this.toPay=[];
				if(this.chooseAll==1){

					for(var i in this.cartlist){

						this.toPay.push(i);
					}

				}
				else{
					this.toPay=[];
				}

			}

		},


		methods:{
			toMKOrder(){
				this.$router.push({"name":"orderinfo",query:{"ctids":this.ctids}})

			}
			,


			doSum(){
				this.sum=0;
				for(var i in this.toPay){
					var ct=this.cartlist[this.toPay[i]];
					this.sum+=ct.gdcount*ct.price;
				}
			}
			,
			changeCountForCart(cartid,count,index){

				this.ctid=cartid;
				this.gdcount=count;

				var ob=this;
				var url="http://127.0.0.1:8086/springMVC/cartctrl/changecountforcart";
				$.ajax(url,{
				data:{ctid:ob.ctid,gdcount:ob.gdcount},
				xhrFields: {"withCredentials": true},
				success:function(result){
					if(result){
						if(count==0){
							ob.cartlist.splice(index,1);
							ob.toPay.splice(index,1);
						}	else{
							ob.cartlist[index].gdcount=count;
						}
						ob.doSum();
					}
				}});


			}
			,
			getCartList(){

				var ob=this;
				var url="http://127.0.0.1:8086/springMVC/cartctrl/getcartlist";
				$.ajax(url,{
				dataType:"json",
				xhrFields: {"withCredentials": true},
				success:function(result){
					ob.cartlist=result;
					for(var i in result){
						ob.cartlist[i].bgimg={
							"background-image": "url('http://127.0.0.1:8086/springMVC/tp/"+result[i].gimgurl+"')"
						};

					}
				}});
			}

		}


	}


</script>

<style>
</style>
