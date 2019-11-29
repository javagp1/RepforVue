<template>
<div>


		<search></search>
		<toolbar_1></toolbar_1>

		<div style="position: relative;margin-top:20px">
			<newcloth></newcloth>

			<div style="position: relative;float:right;width: 70%;margin: 50px;height: 450px;">
				<div style="width: 100%;height:400px ;overflow: auto;" >
					<table class="table table-condensed ">

						<thead>
							<tr class="text-warning">
								<td>序号</td>
								<td>编号</td>

								<td>价格</td>
                <td>状态</td>
								<td>操作</td>

							</tr>

						</thead>

						<tbody>
							<tr v-for="(order,index) in orderinfoes" >
								<td>{{index+1}}</td>
								<td>
                  {{order.ofid}}
								</td>

								<td>{{order.price}}</td>
                <td>
                  

                </td>
								<td>
									<button class="btn btn-danger" @click="toAliPay(order.ofid)">发货</button></td>
								</td>

							</tr>
						</tbody>

					</table>
				</div>
			</div>
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
    		orderinfoes:[]

    	}

    },
    mounted(){

    	this.getorderInfoesbystuser();
    },


    methods:{

    	getorderInfoesbystuser(){

    		var ob=this;
    		var url="http://127.0.0.1:8086/springMVC/orderinfoctrl/getorderInfoesbystuser";
    		$.ajax(url,{
    		dataType:"json",
    		xhrFields: {"withCredentials": true},
    		success:function(result){
          if(result){
            ob.orderinfoes=result;

          }

          console.log(result);

    		}});
    	}

    }


    }

</script>

<style>
  .cartimg{
  	width: 50px;
  	height: 60px;
  	background-color: pink;
  	margin: auto;
  	margin-top: 6px;
  	background-size: 100%;
  }

  .dv_newcloth {
  	padding-left: 30px;
  	border-right: #DDDDDD solid 0px;
  	text-align: left;
  	width: 230px;
  	height: 100%;
  	background-color: ;
  	position: relative;
  	left: 0px;
  	float: left;
  	padding-top: 30px;
  }

  .table tbody tr td{
  	line-height: 60px;
  }
</style>
