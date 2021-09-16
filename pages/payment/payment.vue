<template>
	<view>
		<!-- 金钱 -->
		<view class="w-100 ml9">
			<view class="">
				<view class="font-lg font text-hover-light">支付金额</view>
				<!-- <view  class="mt-2"><text class="price1 price">{{this.param !='id=-￥10'?valttpp:valttpp-10  }}</text></view> -->	
				<view  class="mt-2"><text class="price1 price">{{openpope}}</text></view>
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
				<radio :checked="radio" color="#DD524D" @click="openradio(1)"/><text></text>
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
	import {mapMutations,mapState,token} from 'vuex'
	export default {
		data() {
			return {
				radio:true,
				loading:false,
				param:'',
				mito:false,
				showKeyBoard: false,
				openpayment:'wxpay',//wxpay微信 alipay支付宝
				detailid:'18228403380',
				payMethod:1,
				openpope:'',
				opennumber:"",
				suklist:[],
				sukid:"d028118bbd764968af7cfdc7e925dc72",
				goodsid:"296b5762c1301a92d8462193f0f32f39"
			}
		},
		computed:{
			...mapState(['cart','token','Address']),
			valttpp(){
				if(this.cart[0].goods_state == true){
					return this.cart[0].goods_price*this.cart[0].goods_count 
				} else if(this.cart[0] == ""){
					return 0
				} 
				
			}
		},
		onLoad(options) {
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
			uni.getStorageSync('cart')
			console.log(this.cart)
			console.log(options.goodsid)
			this.openpope = options.mo
			this.openpope = options.pickits
			this.opennumber = options.number
			this.goodsid  = options.goodsid
			this.sukid = options.sukid
			console.log(this.goodsid,this.sukid)
			if(this.goodsid === 'undefined' && this.sukid === 'undefined'){
				this.goodsid  = "296b5762c1301a92d8462193f0f32f39"
				this.sukid = "d028118bbd764968af7cfdc7e925dc72"
			}
 		},
		methods: {
			...mapMutations(['saveToStorage','addToCart','saveToStoragopen']),
			ralio1(index){
				console.log(index)
				if(this.radio1 == false){this.radio1 = true}
				else if (this.radio1 == true){this.radio1 = false}
			},
			openmito(){
				this.mito = true
				this.radio = false
				this.openpayment = "alipay"
				console.log(this.openpayment)
			},
			openradio(e){
				this.mito = false
				this.radio = true
				this.openpayment = "wxpay"
				console.log(this.openpayment)
			},
			openModal() {
				if(this.loading) return;
				
				/* 微信 支付*/
				if(this.openpayment === "wxpay"){
					if(this.tocart = '[{}]'){
						for (let i = 0; i < this.cart.length; i++) {
						   this.suklist.push({
						  "skuId":this.sukid,
						  "goodsId":this.goodsid,
						   "number":this.opennumber
						   })
						 }		
					}else{
						this.suklist =  [{
							"skuId":this.sukid,
							"goodsId":this.goodsid,
							"number":this.opennumber
						}]
					}	
					uni.request({
						method:'POST',
					  /* url: "http://117.175.58.188:9005/api-test/weixin/pay?userId=18228403380&totalFee=1", */
					   url: "http://app.joy-ec.cn/online-mall-api/order/confirm",
					    header: {
					       "account_token":this.token			
					    },
						data:{
							"shopCartIds":[],
							"addrId":this.Address.addrId,
							"remarks":"多发点",
							"orderSku":this.suklist,
							"couponIds":[],
							"payWay":'WECHAT_PAY'
						},
					    success: (res) => {
							this.loading = true
							console.log(res)
							uni.requestPayment({
							    "provider": "wxpay", 
							    "orderInfo": {
							        "appid": res.data.body.appid,  // 微信开放平台 - 应用 - AppId，注意和微信小程序、公众号 AppId 可能不一致
							        "noncestr": res.data.body.noncestr, // 随机字符串
							        "package": res.data.body.package,        // 固定值
							        "partnerid": res.data.body.partnerid,      // 微信支付商户号
							        "prepayid": res.data.body.prepayid, // 统一下单订单号 
							        "timestamp": res.data.body.timestamp,        // 时间戳（单位：秒）
							        "sign": res.data.body.sign // 签名，这里用的 MD5 签名
							    },
							    success:(res)=> {
									console.log(res)
									uni.redirectTo({
										url:'../success/success'
											})
								},
							    fail:(e)=> {
									console.log(e)
									console.log("失败")
								}
							})
					    }
					})
					this.loading = false
				} else if(this.openpayment === "alipay"){
					/* if(this.tocart = '[{}]'){
						for (let i = 0; i < this.cart.length; i++) {
						   this.suklist.push({
						  "skuId":this.sukid,
						  "goodsId":this.goodsid,
						   "number":this.opennumber
						   })
						 }		
					}else{
						this.suklist =  [{
							"skuId":this.sukid,
							"goodsId":this.goodsid,
							"number":this.opennumber
						}]
					}	 */
					/* 支付宝 支付*/
					console.log(this.token)
					uni.request({
						method:'POST',
						/* url: "192.168.3.87:8090/order/payment?+orderNo="+20210819113033022120177107046+"&totalPrice="+1.00+"&payWay="+'ALI_PAY', */
					    url: "http://app.joy-ec.cn/online-mall-api/order/confirm",
					    header: {
					       "account_token":this.token			
					    },
						data:{
							"shopCartIds":[],
							"addrId":this.Address.addrId,
							"remarks":"多发点",
							"orderSku":
							 [{
							"skuId":this.sukid,
							"goodsId":this.goodsid,
							 "number":this.opennumber
							 }],
							"couponIds":[],
							"payWay":'ALI_PAY'
						},
					    success: (res) => {
					        console.log(res);
							this.loading = true
							uni.requestPayment({
							    provider: 'alipay',
							    orderInfo: res.data.body, //微信、支付宝订单数据 【注意微信的订单信息，键值应该全部是小写，不能采用驼峰命名】
							    success: (res)=> {
							        uni.redirectTo({
							        	url:'../success/success'
							        		})
							    },
							    fail:(err) =>{
							        console.log('fail:' + JSON.stringify(err));
							    }
							});				
					    }
					})	
				}				
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
