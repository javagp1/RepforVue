<style>


	 .box {
		height:200px;
		margin:6px;
		break-inside:avoid;
		background-size: 100%;
		background-repeat:no-repeat ;
		border-radius: 6px;
		margin-top: 12px;
	}

	.box:first-child{
		margin-top: 0px;
	}
	.spe {
		height:250px;

	}
	.box-wrapper {
	    column-count:5;
	   	column-gap:1px;
      width: 1200px;
      margin: auto;
      margin-top: 20px;
	}

  /*商品图片变化*/
  .box .goods_detail{
    width: 100%;
    height: 100%;
   /* position: absolute; */
    box-shadow: 0px 0px 166px 40px black inset;
    transition: all 0.5s;
    color: #FFFFFF;
    opacity: 0;
  }

  .goods_detail button{
    background-color: orange;
    color: paleturquoise;
    width: 40px;
    height: 40px;
    border-radius: 80px;
    border: 0px;
    font-size: 20px;
    float: right;
    margin-right: 20px;

  }
  .box:hover .goods_detail{
    opacity: 1;
  }
  .goods_detail button:first-child{
    margin-top: 20px;
  }
  .count_colle{
    background-color: red;
    color: white;
    position:relative;
    left: 115px;top:-10px;
    display: inline-block;
    padding: 0px 5px;
    font-size: 5px;
    border-radius: 15px ;
    opacity: 0.9;
  }


</style>

<template>

	<div class="box-wrapper">

		<div  v-for="(goods,i) in list"  class="box" :class="{'spe':((i%3==0)||(i%7==0))}"  :style="goods.stl">
      <div class="goods_detail" @click="getDetailByGdid(goods.gdid)">
        <br />
        <button><i class="fa fa-thumbs-o-up"></i></button>
        <br /> <br /> <br />
        <button v-if="goods.iscollected==true" @click.stop="deletecollection(goods.gdid,i)">
               <i class="fa fa-star"></i>

        </button>
        <button v-if="goods.iscollected!=true" @click.stop="addcollection(goods.gdid,i)">
           <i class="fa fa-star-o"></i>
        </button>
         <span class="count_colle">{{goods.ccount}}</span>



         <br /> <br />
        <hr  style="width: 90%;" />
        {{goods.gdname}}
      </div>
		</div>

	</div>


</template>

<script>

	export default{

		data:function(){
			return {

				list:[],
				pagecount:0,
				pagenum:1,
				lock:false,
				goodsid:"",
        collections:[],
        iscollecteds:[],
        useronline:false,
        count:0,
        counts:[],

			};

		},
		mounted(){
			this.goodsid=this.$route.query.gid;



			var ob=this;

			$(window).scroll(function(){
        /* 清除top*/
        if($(".box")==null||$(".box").length<1){
        		return;
        	}

				if(!ob.lock){
					ob.lock=true;
					if(($(document).scrollTop()+600)>=$(".box:last").offset().top){
						ob.pagenum++;
						if(ob.pagenum>ob.pagecount){
							return;
						}
						ob.getInfo(ob.pagenum);
					}
					ob.lock=false;
				}
			});
      this.valid_userOnline();
      this.getcollectongdid();
			this.getInfo(this.pagenum);

		},
		methods:{

      getDetailByGdid(gdid){
        this.$router.push({"name":"maingoodsinfodetails","query":{"gdid":gdid}})
      },

			getInfo(pagenum){
				var ob=this;

				var url="http://127.0.0.1:8086/springMVC/goodsinfoctrl/getinfoes";
				$.ajax(url,{
						method:"post",

						data:{"pagenum":pagenum},
						dataType:"json",
						xhrFields: {"withCredentials": true},
						success:function(result){

							ob.pagecount=result.pagecount;

							for(var i in result.infoes){
								result.infoes[i].stl={
									"background-image": "url('http://127.0.0.1:8086/springMVC/tp/"+result.infoes[i].gimgurl+"')",
								};

                if(ob.collections.indexOf(result.infoes[i].gdid)!=-1){
                  result.infoes[i].iscollected=true;

                }else{
                  result.infoes[i].iscollected=false;
                }

								ob.list.push(result.infoes[i]);

							}

						}
					}
				)


			},
      addcollection(gdid,i){
        var ob=this;
        if(ob.useronline==""){
          ob.$router.push({
            "name":"login"
          })
          return;
        }
        var url="http://127.0.0.1:8086/springMVC/goodscollctionctrl/addcollection";
        $.ajax(url,{

        		data:{"gdid":gdid},

        		xhrFields: {"withCredentials": true},
        		success:function(result){
              if(result){
                  ob.list[i].iscollected=true;
                  ob.list[i].ccount+=1;

              }


        		}
        	}
        )
      },
    deletecollection(gdid,i){
      var ob=this;

      var url="http://127.0.0.1:8086/springMVC/goodscollctionctrl/deletecollection";
      $.ajax(url,{

      		data:{"gdid":gdid},

      		xhrFields: {"withCredentials": true},
      		success:function(result){
            if(result){
               ob.list[i].iscollected=false;
               ob.list[i].ccount-=1;
            }


      		}
      	}
      )
    },
    getcollectongdid(){
      var ob=this;
      if(!ob.useronline){
        return;
      }
      var url="http://127.0.0.1:8086/springMVC/goodscollctionctrl/getusercollection";
      $.ajax(url,{
      		method:"post",

      		dataType:"json",
      		xhrFields: {"withCredentials": true},
      		success:function(result){
          for(var i in result){

            ob.collections.push(result[i].gdid);

          }
          console.log(ob.collections);
      		}
      	}
      )
    },
    goodiscollected(gdid){
      for(var i in this.collections){
        if(gdid==this.collections[i]){
          return true;



        }

      }
      return false;


    },
    valid_userOnline(){

    	var ob=this;
    	ob.useronline=false;
    	var url="http://127.0.0.1:8086/springMVC/userctrl/useronline";
    	$.ajax(url,{
    	xhrFields: {"withCredentials": true},
    	async:false,
    	success:function(result){

    		ob.useronline=(result!="");
    	}});

    },



		}




	}




</script>
