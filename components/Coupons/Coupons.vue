<template>
	<view>
		<view class="w-95 m-auto bgw he4 border-radius flex" v-for="(item,index) in datas" :key='index'>
			<view class="w--w flex align-center justify-center flex-wrap">
				<view>
					<view class="price font-big text-center">{{item.pore}}</view>
					<view class="font-sm text-secondary mt-1 ml-2 text-center">优惠券</view>
				</view>
				
			</view>
			<view class="w-60">
				<view class="mt-3 flex">
					<view class="Coupons flex justify-center align-center font-sm">{{item.voucher}}</view>
					<view class="font-weight-bold font-md ml-1 Coupons-pop">{{item.vouchername}}</view>
				</view>
				<view class="text-F4">{{item.expire}}</view>
				<view class="text-F4">{{item.Reduced}}</view>
			</view>
			<view class="w-20 flex justify-center align-center">
				<view class="use flex justify-center align-center" @click="use">{{userpop}}</view>
			</view>
		</view>
	</view>
		
		<!-- 弹出层 -->
</template>

<script>
	export default {
		props:{
			datas: {
				type: Array,
				default: () => []
			},
			userpop:{
				type:String,
				default: '点击领取'
			}
		},
		onLoad() {
			
			
		},
		methods: {
			use(){
				if(this.userpop == '点击领取'){
					setTimeout(()=>{
						uni.showToast({
							title:'领取成功'
						})
					},200)
					setTimeout(()=>{
						uni.navigateTo({
							url:'../../pages/Details/Details'
						})
					},1200)
					
				}else if(this.userpop == '去使用'){
					uni.navigateTo({
						url:'../hot/hot'
					})
				}
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
