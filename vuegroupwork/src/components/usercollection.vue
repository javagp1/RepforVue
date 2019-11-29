<template>
  <div>
    <toolbar_1></toolbar_1>
    <search></search>
    <newcloth></newcloth>
    <div style="position: relative;float:right;width: 70%;margin: 50px;height: 450px;">
    <table class="table">
      <thead>
        <tr>
          <td>序号</td>
          <td>图片</td>
          <td>名称</td>
          <td>价格</td>
          <td>操作</td>

        </tr>
      </thead>
      <tbody>
        <tr v-for="(colle,i) in usercollections">
          <td>{{i+1}}</td>
          <td><div class="collecimg" :style="colle.bgimg"></div></td>
          <td>{{colle.gdname}}</td>
          <td><span style="font-size: 26px;font-weight: bold;color:#EF2F23;"><i class="fa fa-rmb"></i>{{colle.price}}</span></td>
          <td><button @click="deletecollection(colle.gdid)" class="btn btn-danger fa fa-close"></button></td>
        </tr>
      </tbody>
    </table>
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
        usercollections:[],
      }
    },
    methods:{
      getAllcollection(){
        var ob=this;

        var url="http://127.0.0.1:8086/springMVC/goodscollctionctrl/getallcollection";
        $.ajax(url,{
        		method:"post",

        		dataType:"json",
        		xhrFields: {"withCredentials": true},
        		success:function(result){

              ob.usercollections=result;
              console.log(result);
              for(var i in result){
               ob.usercollections[i].bgimg={
               	"background-image": "url('http://127.0.0.1:8086/springMVC/tp/"+result[i].gimgurl+"')"
               };

              }

        		}
        	}
        )
      },
      deletecollection(gdid){
        var ob=this;

        var url="http://127.0.0.1:8086/springMVC/goodscollctionctrl/deletecollection";
        if(confirm("确定要取消收藏吗？")){
          $.ajax(url,{

        		data:{"gdid":gdid},

        		xhrFields: {"withCredentials": true},
        		success:function(result){
              if(result){
                ob.getAllcollection()
              }


        		}
        	}
        )
        }
          
        
      },
    },
    mounted(){
      this.getAllcollection();
    }
  }
</script>

<style>
  .collecimg{
    width: 50px;
    height: 60px;
    background-color: pink;
    margin: auto;
    margin-top: 6px;
    background-size: 100%;
  }
</style>
