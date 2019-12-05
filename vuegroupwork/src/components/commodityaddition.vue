<template>
  <div>
    <search></search>
    <toolbar_1></toolbar_1>
    <div class="comm_frame">

      <form enctype="multipart/form-data">

        <div class="comm_tupian">
          <input type="file" multiple="multiple" id="file" ref="file" name="file" @change="getgimg($event)" />
          <button style=" position: absolute;
     margin-top: -25px;
     margin-left: 140px;
     float: right;"
            @click="fileupload()">上传</button>
          <i class="fa fa-plus" style="font-size: 150px; position: relative; margin-top: 150px;color: gainsboro" @click=""></i>
        </div>
      </form>


      <div class="comm_goodsinfo_add">
        <div class="comm_name_title" style="font-size: 20px; font-weight: bold;">
          商品名称：
          <br />
          <br />
          <input v-model="gdname" style="width: 500px; height: 40px; font-size: 20px;" />
        </div>
        <hr />
        <div class="comm_name_title" style="font-size: 20px; font-weight: bold;">
          商品价格：
          <br />
          <br />
          ￥ <input v-model="price1" style="width: 100px; height: 40px; font-size: 20px;" />
          ￥ <input v-model="price2" style="width: 100px; height: 40px; font-size: 20px;" />
          ￥ <input v-model="price3" style="width: 100px; height: 40px; font-size: 20px;" />
          ￥ <input v-model="price4" style="width: 100px; height: 40px; font-size: 20px;" />
          ￥ <input v-model="price5" style="width: 100px; height: 40px; font-size: 20px;" />
          ￥ <input v-model="price6" style="width: 100px; height: 40px; font-size: 20px;" />
        </div>
        <hr />

        <div class="comm_name_title" style="font-size: 20px; font-weight: bold;">
          商品关键字：
        </div>
        <br />
        <div style="width: 500px; height: 50px;">
          <input type="text" v-model="gtkeywords"/>

        </div>
        <hr />

        <div>
          <button class="btn btn-primary" style="font-size: 20px;" @click="addgoodsinfo()">添加</button>
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

  export default {
    components: {
      search,
      toolbar_1
    },
    data() {
      return {
        comm_size: ["S", "M", "L", "ML", "XL", "XXL", "均码"],
        gimg: "",
        gimgurl: "",
        gdname: "",
        gtkeywords: "",
        price1:0,
        price2:0,
        price3:0,
        price4:0,
        price5:0,
        price6:0,
        price:[],
      }
    },

    mounted() {
      
    },
    methods: {
      getgimg(event) {
        event.preventDefault();
        this.gimg = this.$refs.file.files[0];
        this.gimgurl = this.gimg.name;
        console.log(this.gimg.name);
      },

      fileupload() {
        var formData = new FormData();
        formData.append("file", this.gimg);
        var ob = this;
        var url = "http://127.0.0.1:8086/springMVC/filecontrollerupload";
        $.ajax(url, {
          xhrFields: {
            "withCredentials": true
          },

          method: "post",
          dataType: "json",
          processData: false,
          contentType: false,
          async: true,


          data: formData,
          success: function(result) {

            console.log(result)

          }
        });


      },
      addgoodsinfo() {
        this.price.push(this.price1);
        this.price.push(this.price2);
        this.price.push(this.price3);
        this.price.push(this.price4);
        this.price.push(this.price5);
        this.price.push(this.price6);
        var ob = this;
        var url = "http://127.0.0.1:8086/springMVC/goodsinfoctrl/addgoodsinfo";
        $.ajax(url, {
          xhrFields: {
            "withCredentials": true
          },

          method: "post",
          dataType: "json",
          traditional:true,


          data: {
            gdname: ob.gdname,
            gtkeywords: ob.gtkeywords,
            price: ob.price,
            gimgurl: ob.gimgurl,

          },
          success: function(result) {

            if(result){
              alert("添加成功")
            }else{
              alert("添加失败")
            }

          }
        });


      },
    },



  }
</script>

<style>
  .comm_frame {
    width: 1200px;
    height: 600px;
    margin: auto;
    margin-top: 30px;
    position: relative;
  }

  .comm_tupian {
    width: 400px;
    height: 500px;
    float: left;
    background-color: powderblue;


  }

  .comm_goodsinfo_add {
    width: 522px;
    height: 56px;
    float: left;
    margin-left: 30px;
    text-align: left;
    font-size: 13px;
    padding: 0px;

  }

  .goods_size {
    float: left;
    min-width: 30px;
    height: 30px;
    line-height: 20px;
    box-shadow: 0px 0px 1px 1px #DDDDDD inset;
    text-align: center;
    color: black;
    font-size: 13px;
    font-weight: bold;
    margin-left: 10px;
    padding: 5px;
  }

  button {}
</style>
