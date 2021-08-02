<template>
	<view class="bghover w-100" :style="{height: wh + 'px'}">
		<view class="bghover h"></view>
		<view class="w-95 m-auto bgw he4 border-radius flex">
			<view class="w--w flex align-center justify-center flex-wrap">
				<view>
					<view class="price font-big text-center">10</view>
					<view class="font-sm text-secondary mt-1 ml-2 text-center">优惠券</view>
				</view>
				
			</view>
			<view class="w-60">
				<view class="mt-3 flex">
					<view class="Coupons flex justify-center align-center font-sm">品累券</view>
					<view class="font-weight-bold font-md ml-1 Coupons-pop">新鲜水果10元红包</view>
				</view>
				<view class="text-F4">2021/07/30到期</view>
				<view class="text-F4">满60可用</view>
			</view>
			<view class="w-20 flex justify-center align-center">
				<view class="use flex justify-center align-center" @click="use">去使用</view>
			</view>
		</view>
		<!-- 弹出层 -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {
			const sysInfo = uni.getSystemInfoSync()
			this.wh =sysInfo.windowHeight
		},
		methods: {
			use(){
				uni.navigateTo({
					url:'../hot/hot'
				})
			}
		}
	}
</script>

<style>
.bghover{background-color: #F9F9F9;}
.h{height: 20rpx;}
.he4{height: 220rpx;}
.h-h{line-height: 0.1px;}
.Coupons{width: 90rpx;height: 35rpx;border-radius: 8rpx;background-color: #FFCC33;}
.Coupons-pop{margin-top: -12rpx;}
.use{width: 120rpx;height: 65rpx;background-color: #ff6205;border-radius: 15rpx;color: #e8fce0;}
.w--w{width: 20%;}
</style>
