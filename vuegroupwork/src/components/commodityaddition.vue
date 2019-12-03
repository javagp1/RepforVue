<template>
  <div>
    <search></search>
    <toolbar_1></toolbar_1>
    <div class="comm_frame">

      <form enctype="multipart/form-data">

        <div class="comm_tupian">
          <input type="file"  name="file1" />
          <button style=" position: absolute;
     margin-top: -25px;
     margin-left: 140px;
     float: right;">上传</button>
          <i  class="fa fa-plus" style="font-size: 150px; position: relative; margin-top: 150px;color: gainsboro" @click=""></i>
        </div>
      </form>


    <div class="comm_goodsinfo_add">
      <div class="comm_name_title" style="font-size: 20px; font-weight: bold;">
        商品名称：
        <br />
        <br />
        <input style="width: 500px; height: 40px; font-size: 20px;" />
     </div>
     <hr />
     <div class="comm_name_title" style="font-size: 20px; font-weight: bold;">
        商品价格：
        <br />
        <br />
        ￥ <input style="width: 100px; height: 40px; font-size: 20px;" />
     </div>
     <hr />

     <div class="comm_name_title" style="font-size: 20px; font-weight: bold;">
        商品尺寸：
     </div>
    <br />
     <div style="width: 500px; height: 50px;">
       <div v-for="size in comm_size" class="goods_size" >{{size}}</div>

     </div>
     <hr />

    <div >
      <button class="btn btn-primary"style="font-size: 20px;">添加</button>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <button class="btn btn-success" style="font-size: 20px;">重置</button>
    </div>

    </div>

    </div>
  </div>

</template>

<script>

  import search from '@/components/search.vue'
  import toolbar_1 from '@/components/toolbar_1.vue'

  export default{
    components:{search,toolbar_1},
    data(){
      return{
        	comm_size:["S","M","L","ML","XL","XXL","均码"]
      }
    },

    mounted(){

    },
    methods:{

     fileupload(){
        var ob=this;
        var url="http://127.0.0.1:8086/springMVC/filecontrollerupload";
        $.ajax(url,{
          method: "post",
        dataType:"json",
        xhrFields: {"withCredentials": true},
        success:function(result){

          console.log(result)

        }});


      },
    },



  }
</script>

<style>
  .comm_frame{
    width: 1200px;
    height: 600px;
    margin: auto;
    margin-top: 30px;
    position: relative;
  }
  .comm_tupian{
    width: 400px;
     height: 500px;
     float: left;
     background-color:powderblue;


  }
  .comm_goodsinfo_add{
    width: 522px;
    height: 56px;
    float: left;
    margin-left: 30px;
    text-align: left;
    font-size: 13px;
    padding: 0px;

  }
  .goods_size{
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
  button{

  }
</style>
