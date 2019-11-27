<template>
  <div class="dv_main_1">
    <div class="dv_carousel"  @mouseover="stopchangeImg()" @mouseout="changeImg_auto()">

     <transition name="fade" v-for="(cr,index) in carousels" key="index">
     	<div class="carousel"  v-if="index==c_index"  :style="cr"></div>
     </transition>
     <div class="toolbar_btn_next_previous">
       <button @click="changeImg(-1)"><i class="fa fa-chevron-left"></i></button>
       <button @click="changeImg(1)"><i class="fa fa-chevron-right"></i></button>
     </div>
    </div>
    <div class="dv_themes">
      <img v-for="th in themes" :src="th" />
    </div>

  </div>
</template>

<script>
  export default{
    data:function(){
      return{
        carousels:[],
        c_index:0,
        themes:[],
        timer1:""
      };
    },
    mounted(){
      this.carousels.push({backgroundImage:"url(\"../static/mgj/mgj1.png\")"});
      this.carousels.push({backgroundImage:"url(\"../static/mgj/mgj2.png\")"});
      this.carousels.push({backgroundImage:"url(\"../static/mgj/mgj3.png\")"});
      this.carousels.push({backgroundImage:"url(\"../static/mgj/mgj4.png\")"});
      this.carousels.push({backgroundImage:"url(\"../static/mgj/mgj5.png\")"});



      this.themes.push("../static/theme/theme1.png");
      this.themes.push("../static/theme/theme2.png");
      this.themes.push("../static/theme/theme3.png");
      this.themes.push("../static/theme/theme4.png");
      this.themes.push("../static/theme/theme5.png");

      this.changeImg_auto();


    },
    methods:{
      changeImg(step){
        var ob=this;
        this.c_index+=step;
        if(ob.c_index==ob.carousels.length){
          ob.c_index=0;
        }
        if(ob.c_index<0){
          ob.c_index=ob.carousels.length-1;
        }

      },

      changeImg_auto(){
        var ob=this;
        ob.timer1=window.setTimeout(function(){
          ob.c_index++;
          if(ob.c_index==ob.carousels.length){
            ob.c_index=0;
          }
          ob.changeImg_auto();

        },5000)

      },
      stopchangeImg(){
        window.clearTimeout(this.timer1);
      }
    },
}

</script>

<style>
  .dv_main_1{
   width: 1200px;
   		height: 460px;
   		margin: auto;
   		background-color: ;
   		position: relative;
   		margin-top: 20px;

  }
  .dv_main_1 .dv_carousel{
    width: 80%;
    height: 100%;
    float: left;
    position: relative;
    border-radius: 10px;
    background-color:;

  }
  .dv_main_1 .dv_themes{
    width: 20%;
    height: 100%;
    float: left;
     background-color:;
  }
  .dv_main_1 .dv_themes img{

  	width:200px;float:right;margin-bottom: 10px;
  	transition: all 0.3s;
  	border-radius: 9px;
  }
  .dv_main_1 .dv_themes img:hover{

  	transform: translateY(-3px);
  	box-shadow: 0px 9px 6px silver;
  }
  .dv_carousel .carousel{
    width: 100%;
    height: 100%;
    background-size: 100% 100%;
    position: absolute;
    border-radius: 9px;
    background-position-y: -1px;
    background-repeat: no-repeat;


  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  .toolbar_btn_next_previous{
    position: absolute;
    top: 40%;
    width: 100%;
    display: none;
  }
  .dv_carousel:hover .toolbar_btn_next_previous{
    display: block;
  }
  .toolbar_btn_next_previous button{
    width: 50px;
     height: 50px;
     border-radius: 50%;
     outline: none;
     background-color: transparent;
     color: #FFFFFF;
     font-size: 40px;
     border: 0px;
     margin: 20px;
     float: left;

  }

  .toolbar_btn_next_previous button:last-child{
    float: right;

  }
</style>
