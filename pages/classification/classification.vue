<template>
  <view>
	  <!-- 头部 -->
	  <use-header ></use-header>
	 <!-- 分类数据 -->
	  <view class="flex">
		 <!-- 左侧 -->
		<scroll-view scroll-y="true" class="dis1">
			<view class="dis3" :class="cateindex === index ? 'diss-font':''" 
			v-for="(item,index) in cate" :key="index" @tap='changcate(index,item.id)'
			@click="leftclick(index)">{{item.name}} </view>
		</scroll-view>
		  <!-- 右侧 -->
		  <scroll-view scroll-y="true" class="dis2">
			  <view class="flex flex-wrap ">
				  <view class="dis2-1" v-for="i in 5" :key="i">
				  	<image class="right-img" :src="imgesr" mode=""></image>
				  	<view class="text-center">{{namesr}}</view>
				  </view>
			  </view>
		  </scroll-view>
	  </view>
    
  </view>
</template>

<script >
	import UseHeader from "@/components/use-header/use-header.vue"
	export default {
		components:{UseHeader},
		data() {
			return {
				title: 'Hello',
				cateindex:0,
				cate:[
					{name:'水果皇后'},
					{name:'热销水果'},
					{name:'AX系列'},
					{name:'K系列'},
					{name:'营养水果'},
					{name:'手机充电'},
					{name:'耳机影音'},
					{name:'手机配件'},
					{name:'游戏娱乐'},
					{name:'家居电器'}
				],
				imgesr:"../../static/images/img/s5.jpg",
				namesr:'牛油果'
			}
		},
		onLoad() {

		},
		methods: {
				changcate(index,id){
					this.cateindex = index
					console.log(index)
					if(this.index = 1){
						this.imgesr = "../../static/images/img/s2.jpg"
						this.namesr="西瓜"
					} 
				}
		}
	}
</script>

<style >
	
	.dis1{width: 20%;height: 1300rpx;background-color: #f6f7fb;}
	.dis2{width: 80%;height: 1300rpx;}
	.dis3{height: 90rpx;display: flex;justify-content: center;align-items: center;font-size:20rpx}
	.diss-font{border-left:8rpx solid #ff6a6c;color: #ff6a6c;font-weight: bold;font-size:22rpx ;background-color: #FFFFFF;}
	.dis2-1{width: 28%;margin-left: 30rpx;}
	.right-img{width: 150rpx;height: 150rpx;}
</style>
