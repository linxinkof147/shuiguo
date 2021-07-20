<template>
	<view class="bg-hover-light w-100" :style="{height: wh + 'px'}">
		<view class="gap"></view>
		<!-- 头像 -->
		<view  @click="t" class="flex ml-2">
			<view><image class="toppop" src="../../static/images/img/dianpu.png" mode=""></image></view>
			<view class="font-i ml-2 mt-3">椒云商城</view>
		</view>
		<!-- 会员卡 -->
		<view class="mt-4 w-95 m-auto">
			<view class="border-radius">
				<view class="vip-card-area pos-r padding-lr padding-tb-sm b-cc">
					<view>
						<text class="iconfont iconhuiyuan"></text>
						<text class="margin-left-sm">用云电商 会员</text>
					</view>
				</view>
			
				<view class="stats-area dflex-c bg-main">
					<view class="item dflex dflex-flow-c" @click='metokiss'>
						<text>收货地址</text></navigator>
						<view class="vertical-line"></view>
					</view>
					<view class="item dflex dflex-flow-c" @click='metosetup'>
						<text>设置</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 我的订单 -->
		<view class="w-95 m-auto">
			<view class="border-radius margin-top-sm bg-main">
				<use-list-title title="我的订单" iconfont="icondingdan" color="#ff6a6c" fwt="600" tip="查看全部订单"
					@goto="toOrder"></use-list-title>
			
				<view class="order-area padding-bottom-sm padding-lr dflex-c">
					<view class="item dflex dflex-flow-c" @click="toOrder">
						<view class="iconfont">&#xe6da;
						<!-- <view class="badge badge-small">
								1
							</view> -->
						</view>
						<text>待付款</text>
					</view>
					<view class="item dflex dflex-flow-c" @click="toOrder">
						<view class="iconfont">&#xe6d9;
						</view>
						<text>待发货</text>
					</view>
					<view class="item dflex dflex-flow-c" @click="toOrder">
						<view class="iconfont">&#xe6d7;
						</view>
						<text>待收货</text>
					</view>
				</view>
			</view>
		</view>
		<view class="gap"></view>
		<view class="border-radius margin-top-sm bg-main w-95 m-auto">
		</view>
		<!-- 退出登陆 -->
		<view class="gap"></view>
		<view v-if="this.LoginOrNot == true">
			<view  class="border-radius margin-top-sm padding-sm dflex-c bg-main log-out-btn w-95 m-auto"
				@click="openActionSheet">
				<text class="cell-tit" >退出登录</text>
			</view>
		</view>
		<view v-else>
			<view  class="border-radius margin-top-sm padding-sm dflex-c bg-main log-out-btn w-95 m-auto"
				@click="openActionSheetindex">
				<text class="cell-tit">登录</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapMutations,mapState} from 'vuex'
	export default {
		data() {
			return {
				wh:0
			}
		},
		onLoad() {
			const sysInfo = uni.getSystemInfoSync()
			this.wh =sysInfo.windowHeight
			this.LoginOrNot
			
		},
		computed:{
			...mapState(['list','LoginOrNot','cart'])
		},
		methods: {
			...mapMutations(['logionyes','icn']),
			t(){
				uni.navigateTo({
					url:"../login/login"
				})
			},
			openActionSheet(){
				uni.showModal({
					/* 提示 */
					 title: '提示',
					    content: '退出确认',
					    success: res =>  {
					        if (res.confirm) {
								uni.navigateTo({
									url:"../login/login"
								})
								this.logionyes(false)
								this.icn({})
								this.updateToken('')
								uni.removeStorageSync('cart')
								uni.removeStorageSync('cart');
								
					        } else if (res.cancel) {
					            console.log('用户点击取消');
					        }
					    }
				})
			},
			openActionSheetindex(){
				this.navigateTo()
			},
			toOrder(){
				
				if(this.LoginOrNot){
					uni.navigateTo({
						url:"../order/order"
					})
				}else{
						this.navigateTo()
					}
			},
			to(){
				this.navigateTo()
			},
			metokiss(){
				if(this.LoginOrNot ==true){
					uni.navigateTo({
						url:'../Dddress/Dddress'
					})
				} else{
					this.navigateTo()
				}
			},
			metosetup(){
				if(this.LoginOrNot ==true){
					uni.navigateTo({
						url:'../Setup/Setup'
					})
				} else{
					this.navigateTo()
				}
			},
			/* async openwet(){
				 const res  = await uni.$http.post('mallGoods/goods?pageSize=10&pageNum=1&isHot=true')
				console.log(res)
			} */
		}
	}
</script>

<style scoped>
.toppop{width: 120rpx;height: 120rpx;border-radius: 20rpx;}
.font-i{font-size: 38rpx;font-weight: bold;}
.b-cc{background-color: rgba(0, 0, 0, 0.7);}
.vip-card-area {color: #f7d680;background: linear-gradient(to left, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8));}
.item {padding: 30rpx 0;position: relative;font-size: $font-sm;color: $font-color-base;flex: 1;}
	
</style>
