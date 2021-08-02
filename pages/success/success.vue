<template>
	<view>
		<!-- 上部分 -->
		<view >
			<view class="flex justify-center mt-6"><image src="../../static/images/empty/kxxl.png" class="col-4 he-3"></image></view>
			<view class="flex justify-center mt-2 font-md font-weight-bold">订单支付成功</view>
			<view class="flex mt-4 text-75 ml-5">
				<view class=" font font-weight-bold  w-30">订单号码：</view>
				<view class=" font font-weight-bold ">201822213254445201</view>
			</view>
			<view class="flex mt-2 text-75 ml-5">
				<view class=" font font-weight-bold  w-30">实付金额：</view>
				<view class=" font font-weight-bold price mt-1">{{preak}}元</view>
			</view>
		</view>
		<!-- 分割线 -->
		<view class="w-90 he1"></view>
		<!-- 下部分 -->
		<view>
			<view class="flex mt-4 text-75 ml-5">
				<view class=" font font-weight-bold w-30"> 收获人：</view>
				<view class=" font font-weight-bold ">{{Address.receiver}}</view>
			</view>
			<view class="flex mt-2 text-75 ml-5">
				<view class=" font font-weight-bold  w-30">收获电话：</view>
				<view class=" font font-weight-bold">{{Address.mobile}}</view>
			</view>
			<view class="flex mt-2 text-75 ml-5">
				<view class=" font font-weight-bold  w-30">收获地址：</view>
				<view class=" font font-weight-bold">{{Address.addr}}</view>
			</view>
		</view>
		<!-- 底部 -->
		<view class="w-80 order flex justify-center align-center font font-weight-bold" @click="openorder">查看订单</view>
		<view class="w-80 order1 flex justify-center align-center font font-weight-bold" @click="openmoney">在来一单</view>
	</view>
</template>

<script>
	import {mapMutations,mapState} from 'vuex'
	export default {
		data() {
			return {
				preak:39
			}
		},
		onLoad() {
			console.log(this.Address)
		},
		computed:{
			...mapState(['Address'])
		},
		onBackPress(){
			uni.switchTab({
				url:'../Home/Home'
			})
			  return true
		},
		methods: {
			openorder(){
				uni.redirectTo({
					url:'../order/order?id='+this.preak
				})
			},
			openmoney(){
				uni.redirectTo({
					url:'../Details/Details'
				})
			}
		}
	}
</script>

<style>
.he1{height: 2rpx;margin: auto;margin-top: 30rpx;background-color: #e8e8e8;}
.order{border-radius: 50rpx;border:  4rpx solid #e8e8e8; height: 80rpx;color: #6f6f6f;margin: auto;margin-top: 50rpx;}
.order1{border-radius: 50rpx;border:  4rpx solid #ff6c52; height: 80rpx;color: #FFFFFF;margin: auto;margin-top: 50rpx;background-color: #ff6c52;}
</style>
