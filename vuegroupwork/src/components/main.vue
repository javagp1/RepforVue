
<style>


</style>

<template>
  <div class="container">

    	 	<!--顶部工具栏1-->
    	 	<toolbar_1></toolbar_1>

    	 	<!--logo 搜索 工具-->
    	 	<search></search>

    	 	<!--轮播传送-->
    	 	<crouselandthemes></crouselandthemes>

        <br />
        <div>
          <img src="../../static/imgs/qq.png" style="width:1200px;height: 100%;"/>
        </div>
         <br />

        <!-- 瀑布流-->
        <goodsinfo></goodsinfo>

        <!-- 右边回到顶部-->
        <toolbar_right></toolbar_right>

        <!-- 右边广告部分-->
        <toolbar_right_advertisement></toolbar_right_advertisement>





  </div>

</template>

<script>
import search from '@/components/search.vue'
import crouselandthemes from '@/components/crouselandthemes.vue'
import toolbar_1 from '@/components/toolbar_1.vue'
import goodsinfo from '@/components/goodsinfo.vue'
import toolbar_right from '@/components/toolbar_right.vue'
import toolbar_right_advertisement from '@/components/toolbar_right_advertisement.vue'

export default{

		components:{crouselandthemes,search,toolbar_1,goodsinfo,toolbar_right,toolbar_right_advertisement}


	}

</script>
