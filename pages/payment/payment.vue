<template>
	<view>
		<!-- 金钱 -->
		<view class="w-100 ml9">
			<view class="">
				<view class="font-lg font text-hover-light">支付金额</view>
				<view class="mt-2"><text class="price1 price">{{valttpp}}</text></view>
			</view>
		</view>
		<view class="flex justify-center align-center mt-5">
			<view class="mt-5"></view>
			<view class="w-20 ml-3 ">
				<image class="weiimg mt-1" src="../../static/images/user/vx.png" mode=""></image>
			</view>
			<view class="w-60">
				<view class="fontlg">微信支付</view>
				<view class="text-hover-light font-weight-bold">推荐使用</view>
			</view>
			<view class="w-20">
				<view style="width: 50rpx;height: 50rpx;border-radius: 500rpx;border: 2rpx solid #CCCCCC;" class="flex align-center justify-center ">
					<view class="unroadi"  :class="radio1 === true ? 'styleradio' :''"
					@click="ralio1"></view>
				</view>
			</view>
			
		</view>
		<view class="cssfont bg-red text text-r border-radius-lg flex justify-center align-center fixed-bottom " @click="payment">{{loading == true ? '支付中':'确认支付'}}</view>
	</view>
</template>

<script>
	import {mapMutations,mapState} from 'vuex'
	export default {
		data() {
			return {
				radio1:true,
				loading:false
			}
		},
		computed:{
			...mapState(['cart']),
			valttpp(){
				
				if(this.cart[0].goods_state == true){
					return this.cart[0].goods_price*this.cart[0].goods_count 
				} else if(this.cart[0] == ""){
					return 0
				} 
				
			}
		},
		methods: {
			...mapMutations(['saveToStorage','addToCart','saveToStoragopen']),
			ralio1(index){
				console.log(index)
				if(this.radio1 == false){this.radio1 = true}
				else if (this.radio1 == true){this.radio1 = false}
			},
			payment(){
				/* 防止重复支付 */
				if(this.loading) return;
				this.loading = true
				
				setTimeout(()=>{
					uni.showLoading({
						title:"支付中...",
						duration:1500
					})
				},1000)
				setTimeout(()=>{
					uni.showToast({
						title:"支付成功",
						duration:2000
					})
					console.log(this.cart)
				},3000)
				this.saveToStoragopen()
				console.log(this.cart)
				setTimeout(()=>{
					uni.switchTab({
						url:'../Cart/Cart'
					})
				},5000)
			}
		}
	}
</script>

<style>
.ml9{margin-left: 43%;margin-top: 10%;}
.font{font-size: 32rpx;}
.price1{font-size: 78rpx;margin-left: -28rpx;}
.weiimg{width: 90rpx;height: 90rpx;}
.fontlg{font-weight: bold;font-size: 36rpx;}
.styleradio{background-color: #fd6801}
.unroadi{width: 30rpx;height: 30rpx;border-radius: 500rpx;}
.cssfont{width: 80%;height: 80rpx;margin: 0 auto;margin-bottom: 40rpx;}
</style>
