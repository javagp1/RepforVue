<template>
<!--  顶部工具栏 1 -->
  <div class="toolbar_top1">

    <div class="pull-right" style="color:#999999;font-size: 15px;" >
      
      <button class="btn btn-link" @click="browseMain()"><i class="fa fa-home"  ></i>&nbsp;&nbsp;首页&nbsp;&nbsp;&nbsp;&nbsp;|</button>
      <button class="btn btn-link"><i class="fa fa-shopping-bag"></i>&nbsp;&nbsp;&nbsp;&nbsp;商城&nbsp;&nbsp;&nbsp;&nbsp;|</button>
      <button class="btn btn-link">我的订单&nbsp;&nbsp;&nbsp;&nbsp;|</button>
      <button class="btn btn-link">关于我们</button>
      <button class="btn btn-link">商家</button>
    </div>

  </div>


</template>

<script>
  export default{
    methods:{
      browseMain(){
      				this.$router.push({"name":"main"});
      			},

    },
  }
</script>

<style>

  .toolbar_top1{
    width: 100%;
    height: 33px;
   /* border-bottom: 1px silver solid; */
    position: relative;
    background-color:#222222 ;
  }
  .toolbar_top1 .btn-link{
  		color:orangered;
  		font-size: 15px;
  		margin-top: 1px;
  	}
  	.toolbar_top1 .btn-link:last-child{
  		margin-right: 60px;
  	}
  	.toolbar_top1 .btn-link:hover{
  		text-decoration: none;
  	}
  	.toolbar_top1 .btn-link i{
  		color: orangered;
  		font-size: 15px;
  	}
    .zhuce{
      font-size: 15px;
      margin-top: 10px;
    }
</style>
