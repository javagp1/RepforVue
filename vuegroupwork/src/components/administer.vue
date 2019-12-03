<template>
  <div>
    <table class="table">
      <thead>
        <tr>
          <td>图片</td>
          <td>商品</td>
          <td>时长</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><input type="file"  multiple="multiple" id="file" ref="file" @change="getimg($event)" /> </td>
          <td><input type="text" v-model="gdid"/> </td>
          <td><input type="number" v-model="cimgshowtime"/> </td>
        </tr>
        <tr><td colspan="3"><button @click="addcrouseimg(),addcrouseimginfo()">添加</button> </td></tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default{
    data(){
      return {
        cimgurl:"",
        gdid:0,
        cimgshowtime:0,
        cimg:"",

      }
    },
    methods:{
      addcrouseimginfo(){
      	var ob=this;
      	var url="http://127.0.0.1:8086/springMVC/carouselimgctrl/addcarouseimg";
      	$.ajax(url,{
      	xhrFields: {"withCredentials": true},
      	async:false,
        method:"post",
        data:{
          "cimgurl":ob.cimgurl,
          "gdid":ob.gdid,
          "cimgshowtime":ob.cimgshowtime
        },
      	success:function(result){
      		if(result){



      		}

      	}});

      },
      getimg(event){
        event.preventDefault();
        this.cimg=this.$refs.file.files[0];
        this.cimgurl=this.cimg.name;
        console.log(this.cimgurl);
      },

      addcrouseimg(){
        var formData = new FormData();
        formData.append("file",this.cimg);
      	var ob=this;
      	var url="http://127.0.0.1:8086/springMVC/carouselimgctrl/uploadimg";
      	$.ajax(url,{
      	xhrFields: {"withCredentials": true},

        method:"post",
        dataType:"json",
        processData:false,
        contentType:false,
        async:true,

        data:formData,

      	success:function(result){


      	}});

      },
    }
  }
</script>

<style>
</style>
