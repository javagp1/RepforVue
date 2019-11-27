<template>
  <div class="toolbar_right">

    <div @click="toTop()" class="dv_top">
       <i class="fa fa-hand-o-up " style="font-size: 20px; margin-top: 5px;" ></i><br />
      Top</div>

  </div>
</template>

<script>
  export default{

    methods:{
      toTop(){
        $(window).scrollTop(0);
        }
      }

    }
</script>

<style>
  .toolbar_right{
    position: fixed;
    margin-right: 0px;
    width: 60px;
    height: 60px;
    background-color: lightskyblue;
    z-index: 30;
    right: 10px;
    bottom: 30px;
    border-radius: 30px;
    box-shadow: 0px 0px 10px #AFEEEE;
  }
  .dv_top{
    font-size: 20px;
   /* margin-top: 3px; */
  }
  .dv_top:hover{
    cursor: pointer;
  }
</style>
