<!-- 顶部搜索栏 2 ：logo 搜索  登录 -->
<template>
   <transition name="slide-fade">
  <div class="toolbar_top2" :style="style_1" v-if="searchshow">
    <div style="width: 1200px; margin: auto;height: 100%;position: relative;">
     <i class="fa fa-cloud" style=" float: left;font-size: 30px;font-weight: bold;color: #FF4466; position: absolute;top: 40px;left: 25px;">&nbsp;蘑菇街</i>
   <i class="fa fa-bars" style="font-size: 20px; position: absolute; left: 170px; top: 45px; float: left;">目录</i>
   <!-- 商品搜索 div-->
    <div class="dv_search">
      <i class="fa fa-gift " style="position: absolute;top: 15px;z-index: 1; font-size: 20px; color: deeppink" v-if="keyword=='' "></i>
      <input class="ipt_search"  @input="getItems($event)" @keyup.up="chooseItem(-1)" @keyup.down="chooseItem(1)" v-model="keyword" />
      <div class="dv_btn_search">
        <i class="fa fa-search" style="color: #e9e9e9; font-size: 22px; float: left; margin-top: 12px;margin-left: 15px; " ></i>
      </div>


      <div class="dv_items_search" v-if="items.length>0">
      <div v-for="(item,index) in items" class="item" :class="{'bg-info':(item_selected_index==index)}">{{item.gdname}}</div>
      </div>

    </div>

    	 			<div style="width: 400px;height:50px;position:absolute;right: -10px;top:34px" >

    	 				<div class="toolbar_top2_user_ct">
    	 					<i class="fa fa-commenting-o fa-2x"></i>
    	 					消息
    	 				</div>
    	 				<div class="toolbar_top2_user_ct">
    	 					<i class="fa fa-star-o fa-2x"></i>
    	 					收藏
    	 				</div>
    	 				<div class="toolbar_top2_user_ct" style="width: 40px;" @click="browseCart()">
							<i class="fa fa-shopping-cart fa-2x"></i>
							购物车
						  </div>
						  <div class="toolbar_top2_user_ct" style="width: 40px;" @click="browseOrder()">
						  	<i class="fa fa-list-alt fa-2x"></i>
						  	订单
						    </div>
    	 				<div class="toolbar_top2_user_ct" style="width: 50px;">
    	 					<i class="fa fa-qrcode fa-2x" style="display: block;"></i>
    	 					App下载
    	 				</div>
              <div v-if="useronline==''" style="float: right;margin-top: 6px;" @click="toLogin()">
                 <i class="fa fa-sign-in" style="font-size:18px;background-color: orangered;width: 30px;height: 30px;border-radius: 100px;line-height: 30px;color:#ffffff" ></i>
                 &nbsp;登&nbsp;录
              </div>
              <div v-if="useronline!=''" style="float: right;margin-top: 6px;font-size: 15px;" >
                你好，{{useronline.logname}}<button class="btn btn-link" @click="logout()" >退出</button>
              </div>
    	 			</div>


    </div>
    </div>
  </div>
  </transition>
</template>

<script>
	export default{

		data(){
			return {

				keyword:"",
				dv_items_show:false,
				items:[],
				item_selected_index:-1,
				style_1:true,
				searchshow:true,
				timer2:"",
				useronline:""

			};
		},

		mounted(){

			this.searchFollow();
			this.valid_userOnline();

		}
		,methods:{
      browseOrder(){
        this.valid_userOnline();
        if(this.useronline==""){
        	this.$router.push({"name":"login"});
        	return;
        }
        this.$router.push({"name":"orderinfo_records"});	
       },

      browseCart(){

      				this.valid_userOnline();
      				if(this.useronline==""){
      					this.$router.push({"name":"login"});
      					return;
      				}
      				this.$router.push({"name":"cart"});
      			}
      			,
      			logout(){
      				var ob=this;
              var url="http://192.168.1.13:8088/springmvc190806/ajaxctr/logout";
              $.ajax(url,{
              xhrFields: {"withCredentials": true},
              success:function(result){
                if(result){

                  ob.useronline="";
                  ob.$router.push({"name":"main"});
                }

              }});

      			}
      			,valid_userOnline(){
      				var ob=this;
      				var url="http://192.168.1.13:8088/springmvc190806/ajaxctr/useronline";
      				$.ajax(url,{
      				xhrFields: {"withCredentials": true},
      				async:false,
      				success:function(result){
      					if(result){

      						ob.useronline=result;

      					}

      				}});

      			},


      			searchFollow(){
      				var ob=this;
      				$(window).scroll(function(){
      					if($(window).scrollTop()>=400){

      						if(ob.style_1['position']=="fixed"){
      							return;
      						}

      						ob.searchshow=false;


      						ob.timer2=window.setTimeout(function(){


      							ob.style_1={position:"fixed",boxShadow:"0px 6px 16px gray","width":"1300px","left":"20px","border-radius":"10px",top:"10px"};
      							ob.searchshow=true;


      						},300);

      					}
      					else{
      						ob.style_1={position:"relative",boxShadow:"0px 0px 0px transparent"};
      					}

      				});
      			}
      			,toLogin(){
      				this.$router.push({"name":"login"});

      			}
      			,
      			chooseItem(idx){
      				this.item_selected_index+=idx;
      				if(this.item_selected_index==this.items.length){
      					this.item_selected_index=0;
      				}
      				if(this.item_selected_index<0){
      					this.item_selected_index=this.items.length-1;
      				}
      				this.keyword=this.items[this.item_selected_index].gdname;

      			},

      			getItems(event){

      				if(event.keyCode==38||event.keyCode==40){
      					return;
      				}


      				var ob=this;

      				if(ob.keyword==""){
      					ob.items=[];
      					return;
      				}

      				var url="http://192.168.1.13:8088/springmvc190806/ajaxctr/goods_top10";
      				$.ajax(url,{
      				data:{"keyword":ob.keyword},
      				xhrFields: {"withCredentials": true},
      				success:function(result){
      					if(result){

      						ob.items=result;
      					}

      				}});

      			}


			}

		}

</script>
<style>

  .toolbar_top2{
    width: 100%;
    height: 100px;
  /*  border-bottom: 1px silver solid; */
     z-index: 30;
    background-color: #FFFFFF;

  }
  .dv_search{
    width: 500px;
    height: 48px;
    background-color:gold ;
    margin: auto;
    position: absolute;
    top: 30px;
    left: 25%;
    border-radius: 10px;

  }
  .ipt_search{
    width: 433px;
    height: 100%;
    border: 0px;
    background-color:gold;
    outline: none;
    color:black;
  }
  .dv_btn_search{
    width: 50px;
    height: 100%;
    background-color:orange;
    float: right;
    border-radius: 5px;
  }
  /* 返回搜索结果*/
  .dv_items_search{
    width: 450px;
    height: 300px;
    background-color:#FFFFFF;
    border: 1px silver solid;
    border-top: 0px;
    position: absolute;
    z-index: 9;
    border-radius: 0px 0px 10px 10px;
    opacity: 0.97;
    color: orange;
  }
  .dv_items_search:hover{
    cursor: pointer;
  }
  .dv_items_search .item{
    text-align: left;
    height: 30px;
    line-height: 30px;
    padding-bottom: 20px;
    padding-left: 20px;
  }
  .dv_items_search .item:last-child{
  		border-radius: 0px 0px 8px 8px;
  	}

  	.toolbar_top2_user_ct{
  		width: 30px;
      height: 45px;
      font-size: 13px;
  		float: left;
  	  margin-right: 15px;
  	}

    /* 可以设置不同的进入和离开动画 */
    /* 设置持续时间和动画函数 */
    .slide-fade-enter-active {
      transition: all .3s ease;
    }
    .slide-fade-leave-active {
      transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */ {
      transform: translateY(-10px);
      opacity: 0;
    }
</style>
