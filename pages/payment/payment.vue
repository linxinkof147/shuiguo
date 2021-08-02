<template>
	<view>
		<!-- 金钱 -->
		<view class="w-100 ml9">
			<view class="">
				<view class="font-lg font text-hover-light">支付金额</view>
				<view  class="mt-2"><text class="price1 price">{{this.param !='id=-￥10'?valttpp:valttpp-10  }}</text></view>	
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
				<radio :checked="radio" color="#DD524D" @click="openradio"/><text></text>
			</view>
			
		</view>
		<view class="flex justify-center align-center mt-5">
			<view class="mt-5"></view>
			<view class="w-20 ml-3 ">
				<image class="weiimg mt-1" src="../../static/images/empty/zfb.png" mode=""></image>
			</view>
			<view class="w-60">
				<view class="fontlg">支付宝支付</view>
				<view class="text-hover-light font-weight-bold">推荐使用</view>
			</view>
			<view class="w-20">
				<label class="radio">
					<radio :checked="mito" color="#DD524D" @click="openmito"/><text></text>
				</label>
			</view>
			
		</view>
		<payKeyboard v-if="showKeyBoard == true" title="Mi安全键盘" @success="enterSuccess" @close="close" style="z-index: 9999;"></payKeyboard>
		<view class="cssfont bg-red text text-r border-radius-lg flex justify-center align-center fixed-bottom " @click="openModal">{{loading == true ? '支付中...':'确认支付'}}</view>
	</view>
</template>

<script>
	 import payKeyboard from '@/components/mi-payKeyboard/mi-payKeyboard.vue'
	import {mapMutations,mapState} from 'vuex'
	export default {
		 components: { payKeyboard },
		data() {
			return {
				radio:true,
				loading:false,
				param:'',
				mito:false,
				showKeyBoard: false
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
		onLoad() {
			let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
			let curRoute = routes[routes.length - 1].route //获取当前页面路由
			let curParam = routes[routes.length - 1].options; //获取路由参数
			// 拼接参数
			let param = ''
			for (let key in curParam) {
			    param += key + '=' + curParam[key]
			}
			console.log(this.param)
			this.param = param
			console.log(this.param)
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
					uni.redirectTo({
						url:'../success/success'
					})
				},3000)
				this.saveToStoragopen()
				/* console.log(this.cart)
				setTimeout(()=>{
					uni.switchTab({
						url:'../Cart/Cart'
					})
				},5000) */
				/* uni.requestPayment({
				    provider: 'alipay',
				    orderInfo: 'orderInfo', //微信、支付宝订单数据 【注意微信的订单信息，键值应该全部是小写，不能采用驼峰命名】
				    success: function (res) {
				        console.log('success:' + JSON.stringify(res));
				    },
				    fail: function (err) {
				        console.log('fail:' + JSON.stringify(err));
				    }
				}); */
			},
			openmito(){
				this.mito = true
				this.radio = false
			},
			openradio(){
				this.mito = false
				this.radio = true
			},
			openModal() {
			                this.showKeyBoard = true
							console.log(123)
			},
			 enterSuccess(password) {
				 if(this.loading) return;
				 this.loading = true
			               /* console.log(password) */ // 输入的密码
			                this.showKeyBoard = false
							
							setTimeout(()=>{
								uni.showLoading({
									title:"支付中...",
									duration:2500
								})
							},1000)
							setTimeout(()=>{
								uni.redirectTo({
									url:'../success/success'
								})
								this.saveToStoragopen()
							},3800)
							
			 },
			 close(){
			                 this.showKeyBoard = false
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
