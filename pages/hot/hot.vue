<template>
	<view>
		<!-- 头部 -->
		<view class="flex flex-wrap" >
			<view :id="list[0].id" class="ml-9 font flex justify-center align-center" :class="list[0].id === top?'click' : ''" @click="list1">综合排序</view>
			<view :id="list[1].id" class="ml-9 font flex justify-center align-center"  :class="list[1].id === top?'click' : ''" @click="list2">销售优先</view>
			<view :id="list[2].id" class="ml-8  font flex justify-center align-center" @click="topbottom" :class="list[2].id === top?'click' : ''" >
				<view class="font flex justify-center align-center">价格</view>
				<view v-if="vale == 2" ><image class="topimg" src="../../static/images/img/top.png" mode=""></image></view>
				<view v-if="vale == 1" ><image class="topimg" src="../../static/images/img/bottom.png" mode=""></image></view>
				<view v-if="vale == 0" ><image class="topimg" src="../../static/images/img/wuwu.png" mode=""></image></view>
			</view>
		</view>
		<!-- 数据 -->
		<view :style="{height: wh + 'px'}" class="bg-hover-light w-100 ">
			<UseHotGoods :datas="goodsHotDatas" autoload="none"></UseHotGoods>
		</view>
	</view>
</template>

<script>
	import UseHotGoods from "@/components/use-hot-goods/use-hot-goods.vue"
	export default {
		components:{UseHotGoods},
		data() {
			return {
				vale:0,
				top:0,
				list:[{id:0},{id:1},{id:2}],
				wh:0,
				goodsHotDatas:[]
				
			}
		},
		onLoad() {
			const sysInfo = uni.getSystemInfoSync()
			this.wh =sysInfo.windowHeight
			this.gethotList()
		},
		methods: {
			topbottom(){
				this.top = 2
				this.vale++
				if(this.vale == 3){
					this.vale = 1
				}
				
			},
			list1(){
				this.top = 0
				this.vale = 0
			},
			list2(){
				this.top = 1
				this.vale = 0
			},
			//发起请求热卖
			async gethotList() {
			  const { data: res } = await uni.$http.get('goods/list?pageSize=15&pageNum=1&field=createTime&order=asc')
			  this.goodsHotDatas = res.body.rows
			  console.log(res.body)
			},
		}
	}
</script>

<style scoped>
.font{font-size: 32rpx;width: 130rpx;height: 90rpx;}
.topimg{width: 35rpx;height: 35rpx;margin-top: 15rpx;margin-left: -35rpx;}
.click{border-bottom: 5rpx solid #FD597C;color: #FD597C;}
</style>
