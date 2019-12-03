<template>
  <div class="dv_main_1">
    <div class="dv_carousel"  @mouseover="stopchangeImg()" @mouseout="changeImg_auto()">

     <transition name="fade" v-for="(cr,index) in carouselimg" key="index">
     	<div class="carousel"  v-if="index==c_index"  @click="getDetailByGdid(cr.gdid)" :style="cr.stl"></div>
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
        carouselimg:[],
        c_index:0,
        themes:[],
        timer1:"",

      };
    },
    mounted(){
      for(var i=1;i<=5;i++){
        var img={};
         img.stl={"background-image":"url(\"../static/mgj/mgj"+i+".png\")"},
         img.gdid=0;
         this.carousels.push(img);
      }
      console.log(this.carousels);


      this.getcrouselimg();
      this.changeImg_auto();



      this.themes.push("../static/theme/theme1.png");
      this.themes.push("../static/theme/theme2.png");
      this.themes.push("../static/theme/theme3.png");
      this.themes.push("../static/theme/theme4.png");
      this.themes.push("../static/theme/theme5.png");
      for(var i in this.carousels){
        if(this.carouselimg.length<5){

          this.carouselimg.push(this.carousels[i])
          if(this.carouselimg.length==5){
            break;
          }
        }
      }


      console.log(this.carouselimg)


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
          // console.log(ob.c_index);
        },5000)

      },
      stopchangeImg(){
        window.clearTimeout(this.timer1);
      },
      getcrouselimg(){
        var ob=this;
        var url="http://127.0.0.1:8086/springMVC/carouselimgctrl/getcarouseimg";
        $.ajax(url,{
        xhrFields: {"withCredentials": true},
        async:false,
        method:"post",

        success:function(result){
        	for(var i in result){
        		result[i].stl={
        			"background-image": "url('http://127.0.0.1:8086/springMVC/carouselimg/"+result[i].cimgurl+"')",

        		};
            ob.carouselimg.push(result[i]);
            }
        }});
      },
      getDetailByGdid(gdid){
        if(gdid>0){
           this.$router.push({"name":"maingoodsinfodetails","query":{"gdid":gdid}})
        }

      },

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
