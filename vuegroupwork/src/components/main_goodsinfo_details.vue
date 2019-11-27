<style>
.dv_goodsdetail{
		width: 1200px;
		height:700px;
		margin: auto;
		margin-top: 30px;
		position: relative;
	}
	.dv_goodsdetail_img{
		width: 400px;height: 500px;float:left;
		background-size: 100%;
		float: left;
		margin-right: 40px;
		border-radius:6px ;
	}
	.dv_goodsdetail_item{
		width: 522px;
		height: 56px;
		float: left;
		margin-bottom: 20px;
		text-align: left;
		font-size: 13px;
		padding: 0px;

	}

	.dv_goodsdetail_item .item_title{
		min-width:40px;
		background-color: ;
		color:#999999;
		float: left;
		padding-left:10px ;
		margin-top: 0px;
		text-align: center;
	}

	.btn_buy_now,.btn_buy_cart{
		width: 200px;height: 50px;line-height: 50px;font-size: 20px;text-align: center;display: inline-block;
		border:#DDDDDD 1px solid;
		margin-right: 10px;
	}
	.btn_buy_now{
		background-color:#EF2F23;color:#ffffff;border:#EF2F23 1px solid;
		margin-left: 80px;
	}
	.dv_goodssize{
		float:left;
		min-width: 30px;
		height: 30px;
		line-height: 20px;
		box-shadow: 0px 0px 1px 1px #DDDDDD inset;
		text-align: center;
		color: black;
		font-size: 13px;
		font-weight: bold;
		margin-left:10px ;
		padding: 5px;
	}
	.dv_goodssize:hover{
		box-shadow: 0px 0px 1px 2px gray  inset;


	}

	.dv_goodssize_selected{
		background-color: #EF2F23;
		color:#FFFFFF
	}

	.dv_count{
		width: 97px;
		height: 27px;
		float: left;
		border: 1px #DDDDDD solid;
		margin-left: 10px;
	}
	.dv_count *{
		outline: none;
	}
	.dv_count button{
		width: 24px;
		height: 25px;
		border: 0px;
		background-color: transparent;
		color:gray;
		border-right: 1px #DDDDDD solid;
	}
	.dv_count button:last-child{
		border-right: 0px #DDDDDD solid;
		border-left: 1px #DDDDDD solid;

	}
	.dv_count input{
		width: 39px;
		height: 25px;
		border: 0px;
		text-align: center;

	}
	.icon_ali,
	.icon_wechat {
		width: 21px;
		height: 21px;
		background-image: url(../../static/imgs/icons.png);
		background-position-y: -295px;
		background-position-x: -38px;
		background-repeat: no-repeat;
		float: left;
		margin-left: 10px;
	}

	.icon_wechat {
		background-position-x: -65px;
	}

	/* 可以设置不同的进入和离开动画 */
	/* 设置持续时间和动画函数 */

	.slide-fade-enter-active {
		transition: all .3s ease;
	}

	.slide-fade-leave-active {
		transition: all 0s cubic-bezier(1.0, 0.5, 0.8, 1.0);
	}

	.slide-fade-enter,
	.slide-fade-leave-to
	/* .slide-fade-leave-active for below version 2.1.8 */

	{
		transform: translateY(50px);
		opacity: 0;
	}

</style>

<template>
	<div class="container">
		<search></search>
		<toolbar_1></toolbar_1>



		<div style="background-position-x:-330px;
					background-position-y:-1px;

					background-repeat:no-repeat ;
					background-size: 80%;
					width: 1200px;
					margin: auto;
					margin-top: 20px;
					height: 110px;background-image:url(../../static/imgs/dianpu.png)">


	 	</div>




		<div  class="dv_goodsdetail ">
			<div class="dv_goodsdetail_img bg-info" :style="gimg_style" ></div>

			<div class="dv_goodsdetail_item text-left"  style="height: 60px;line-height: 30px;font-size: 21px;font-weight: bold;">
				{{goodsinfo.gdname}}
			</div>
			<div class="dv_goodsdetail_item" style="background-color: #F6F6F6;height:66px;line-height: 60px ;">
				<div class="item_title">
					价格：
				</div> &nbsp; <span style="font-size: 26px;font-weight: bold;color:#EF2F23;"><i class="fa fa-rmb "></i> &nbsp;{{goodsinfo.price}}</span>
			</div>
			<div class="dv_goodsdetail_item">
				<div class="item_title">
					尺码：
				</div>
				<div  v-for="(gsize,index) in goodssize" class="dv_goodssize"
					 :class="{'dv_goodssize_selected':(index+1)==gsid}"

					 @click="chooseGsid(index)"

					 >{{gsize.gstext}}</div>
			</div>
			<div class="dv_goodsdetail_item">
				<div class="item_title">
				数量：
				</div>

				<div class="dv_count">
					<button @click="changeGoodsCount(-1)">
						<i class="fa fa-minus"></i>
					</button>
					<input type="text" v-model="goodscount" >
					<button @click="changeGoodsCount(1)">
						<i class="fa fa-plus"></i>
					</button>
				</div>

			</div>

			<div class="dv_goodsdetail_item">


				<div　class="btn_buy_now" >立即购买</div>


				<div　class="btn_buy_cart" style="position: relative;" @click="addToCart()" >


				<transition name="slide-fade">
					<div v-if="gscount_show"   style="text-shadow: 0px 3px 3px black;font-size: 40px;color:red;position: absolute;left:100px;top:-30px;">+{{goodscount}}</div>

				</transition>

					加入购物车
				</div>
			</div>

			<div class="dv_goodsdetail_item" style="margin-top: 20px;">
				<div class="item_title">
				服务说明：
				</div>

				<div style="float:left;width: 430px;line-height: 35px;margin-top: -5px;">
					<div v-for="p in server_promise" style="margin-left: 10px;float:left;">
					<i class="fa fa-check-circle-o fa-2x" style="color:#ee6688;float:left;margin-top:3px ;"></i>
					&nbsp;{{p}}
					</div>


				</div>

			</div>

			<div class="dv_goodsdetail_item" style="margin-top: 30px;">
				<div class="item_title">
				支付方式：

				</div>

				<div class="icon_ali"></div>

				<div class="icon_wechat"></div>
			</div>
        <newcloth></newcloth>
 


		</div>

		 	<div style="width: 100%; background-color: #FD579F;" >
        <img src="../../static/imgs/xiafang.jpg" />
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

			return{
				gdid:"",
				gimg_style:"",
				goodsinfo:"",
				goodssize:[],
				goodscount:1,
				server_promise:["72小时发货","7天无理由退货","延误必赔","退货补运费","全国包邮"],
				gsid:1,
				useronline:false,
				gscount_show:false


			}

		},
		mounted(){
//
//			$(window).unbind("scroll");

			this.gdid=this.$route.query.gdid;
			this.getGoodsDetailByGdid();
			this.getAllGoodsSize();
		},

		methods:{
			chooseGsid(i){
				this.gsid=i+1;
			}

			,
			valid_userOnline(){

				var ob=this;
				ob.useronline=false;
				var url="http://192.168.1.19:8086/springMVC/userctrl/useronline";
				$.ajax(url,{
				xhrFields: {"withCredentials": true},
				async:false,
				success:function(result){

					ob.useronline=(result!="");
				}});

			},

			addToCart(){
				this.valid_userOnline();
				if(!this.useronline){
					this.$router.push({"name":"login"});
					return;

				}
				var ob=this;
				if(ob.gscount_show){
					return ;
				}
				var url="http://192.168.1.13:8088/springmvc190806/ajaxctr/addtocart";
				$.ajax(url,{
						method:"get",
						data:{
							gdid:ob.gdid,
							gsid:ob.gsid,
							gdcount:ob.goodscount

						},
						dataType:"json",
						xhrFields: {"withCredentials": true},
						success:function(result){

							if(result){
								ob.gscount_show=true;

								window.setTimeout(function(){
									ob.gscount_show=false;
								},1000);


							}

						}
					}
				)

			}
			,
			changeGoodsCount(num){
				this.goodscount+=num;
				if(this.goodscount<1){
					this.goodscount=1;
				}
			}
			,
			getAllGoodsSize(){
				var ob=this;

				var url="http://192.168.1.13:8088/springmvc190806/ajaxctr/getallgoodssize";
				$.ajax(url,{
						method:"get",
						dataType:"json",
						xhrFields: {"withCredentials": true},
						success:function(result){
							ob.goodssize=result;

						}
					}
				)
			}
			,
			getGoodsDetailByGdid(){

				var ob=this;

				var url="http://192.168.1.13:8088/springmvc190806/ajaxctr/getgoodsdetailbygdid";
				$.ajax(url,{
						method:"get",
						data:{"gdid":ob.gdid},
						dataType:"json",
						xhrFields: {"withCredentials": true},
						success:function(result){
							ob.goodsinfo=result;
							ob.gimg_style={backgroundImage:"url('http://192.168.1.13:8088/springmvc190806/tp/"+result.gimgurl+"')"}

						}
					}
				)

			}

		}


	}

</script>
