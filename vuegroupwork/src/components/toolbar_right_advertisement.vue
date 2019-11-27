<template>
  <div class="right_advertisement">
    <div class="right_1">
    <button><i class="fa fa-home"></i>&nbsp;商城首页</button>
    </div>
    <div class="right_2">
    <button><i class="fa fa-heart"></i>&nbsp;猜你喜欢</button>
    </div>
    <div class="right_3">
    <button><i class="fa fa-send"></i>&nbsp;聚划算</button>
    </div>
    <div class="right_4">
    <button><i class="fa fa-tree"></i>&nbsp;品牌盛宴</button>
    </div>

  </div>
</template>

<script>
</script>

<style>
 .right_advertisement button{
    position: fixed;
    right: 0px;
    width: 90px;
    height: 50px;
    border-radius: 10px;
    outline: none;
    transition: all 0.3s;
  }
  .right_advertisement button:hover{
    transform: translateY(-3px);
    box-shadow: 0px 9px 6px silver;
    
  }


 .right_1 button{
   top: 150px;
   background-color:#FF4466;
   color: oldlace;

  }
  .right_2 button{
    top: 205px;
    background-color:#FFA500;
    color: oldlace;
   }

   .right_3 button{
     top: 260px;
     background-color:#6479BC;
     color: oldlace;
    }
    .right_4 button{
      top: 315px;
      background-color:#E3645E;
      color: oldlace;

     }

</style>
