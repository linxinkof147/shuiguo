<template>
	<view class="bg-hover-light w-100 " :style="{height: wh + 'px'}">
		<!-- 收货地址 -->
		<view class="gap"></view>
		<view class=" w-95 m-auto buyht border-radius-sm bg-white" @click="adder">
			<navigator url="../Dddress/Dddress"><UseListtItle title="收获地址管理" size="32" fwt="600" color="#333" iconfont="icondaishouhuo-" ></UseListtItle></navigator>
			<view class="flex flex-wrap" v-if="this.Address.length!=0">
				<view class="w-20 flex justify-center align-center"><text class="text-ellipsis">{{Address.receiver}}</text></image></view>
				<view class="w-70">
					<view class="mt-1">
						<text class="font-sm text-danger text-ellipsis">{{Address.mobile}}</text>
					</view>
					<view class="text-ellipsis"> {{Address.addr}}</view>
				</view>
			</view>
		</view>
		<view class="gap"></view>
		<!-- 产品详情 -->
		<view class=" w-95 m-auto buyht-shop border-radius-sm bg-white mt-2" v-for="(item,index) in cartlist" :key='index'>
			<view >
				<!-- 店铺名字 -->
				<view class="mt-2 ml-3 flex">
					<image src="../../static/images/img/dianpu.png" class="buyshop" mode=""></image>
					<view class="ml-1">xxx航见店</view>
				</view>
				<!-- 图片详情 -->
				<view class="flex flex-wrap mt-3" >
					<view class="col-4  border-radius-sm ">
						<image :src="item.goods_small_logo" class="col-4 he-3 border-radius-sm" mode=""></image>
					</view>
					<view class="w-50 ml-2 line-0">
						<view class="line-0">
							<view class="text-ellipsis2 line-0 font-sm fonh">{{item.goods_name}}荐</view>
							<view class="text-ellipsis2 line-0 text-hover-light col-5-5 he-1-5 border-radius-sm
							 bg-light flex justify-center align-center mt-1 font-sm ">一箱装</view>
							<view class="text-warning font-sm">发货时间:支付后48小时发货</view>
							<view class="col border-radius-sm he-1 bg-hover-info flex justify-center align-center text-info">运费满减</view>
						</view>
						<view></view>
					</view>
					<view class="w-10">
						<text class="price">{{item.goods_price}}</text>
						<!-- <text class="price">1</text> -->
					</view>
				</view>
				<!-- 购买数量 -->
				<view class="flex justify-between w-90 m-auto font-sm">
					<view class="ml-9 font-sm">购买数量</view>
					<view class="text-info">x{{item.goods_count}}</view>
					<!-- <view class="text-info">x1</view> -->
				</view>
				<!-- 服务类型 -->
				<view class="flex w-90 m-auto font-sm lt mt-3">
					<view class="ml-9 font-sm">服务</view>
					<view class="text-hover-light ml-4 font-sm">此商品不支持7天无理由退还</view>
				</view>
				<!-- 配送方式 -->
				<view class="flex w-90 m-auto font-sm lt1 mt-3">
					<view class="ml-9 font-sm">配送方式</view>
					<view class="text-hover-light ml-4 font-sm">普通配送</view>
				</view>
				<!-- 买家留言 -->
				<view class="flex w-90 m-auto font-sm lt1 mt-3">
					<view class="iconfont icon-fuli"></view>
					<view class="ml-9 font-sm">店家优惠</view>
					<view class="text-hover-light ml-4 font-sm">买3送1</view>
				</view>
				<!-- 金额 -->
				<view class="flex mt-3 flot ">
					<view class="font-sm text-hover-light">共计{{item.goods_price*item.goods_count/item.goods_price}}件</view>
					<!-- <view class="font-sm text-hover-light">共计1件</view> -->
					<view class="ml-1 font-sm">原价：</view>
					<text class="font-sm text-warning">{{item.goods_price*item.goods_count}}</text>
					<!-- <text class="font-sm text-warning">1</text> -->
				</view>
			</view>
		</view>
		<!-- 买家留言 -->
		<view class="gap"></view>
		<view class=" w-95 m-auto buyht1 border-radius-sm bg-white" @click="Discount">
			<!-- <view class="ml-3">买家留言</view>
			<view><input type="text" value="商家留言" class="text-hover-light"></view> -->
			<use-list-title title="优惠券" iconfont="iconshoucang-" color="#ff6a6c" fwt="600" :nuberss='money' ></use-list-title>
		</view>
		<!-- 标志 -->
		<view class="gap flex"></view>
		<view class=" flex col-15 he-2 justify-center align-center">
			<image class="col-2 he-1" src="../../static/images/user/yun.png" mode=""></image>
			<text class="lun font-md">运输担保</text>
		</view>
		<view class="flex justify-center align-center">
			<view class="flex">
				<view><image class="lg" src="../../static/images/user/wu.png" mode=""></image></view>
				<view class="font-m">三无包退</view>
			</view>
			<view class="flex ml-5">
				<view><image class="lg1" src="../../static/images/user/guo.png" mode=""></image></view>
				<view class="font-m1 ml-1">过期包退</view>
			</view>
		</view>
		<view>
		</view>
		<view class="w-100 he bg-white flex justify-between align-center footer" >
			<view v-if="this.money === '-￥10'"><text class="price ml-1">{{piplick-10}}</text></view>
			<view v-else><text class="price ml-1">{{piplick}}</text></view>
			<view class="flex justify-center align-center my bg-red border-radius-lg text-r mr-2" @click="Submit">提交订单</view>
		</view>
		<!-- <view class="w-100 he bg-white flex justify-between align-center footer" v-if="tocart!=''">
			<view v-if="this.money === '-￥10'"><text class="price ml-1">{{tocart.goods_count*tocart.goods_price-10}}</text></view>
			<view v-else><text class="price ml-1">{{tocart.goods_count*tocart.goods_price}}</text></view>
			<view class="flex justify-center align-center my bg-red border-radius-lg text-r mr-2" @click="Submit">提交订单</view>
		</view> -->
		<!-- 弹出层 -->
		<uni-popup ref="popup" background-color="#f8f8f8" class="br">
			<view class="br">
				<view class="flex justify-between mt-2">
					<view class="ml-3 font-lg font-weight-bold">优惠券</view>
					<view class="mr-3 font-md font-weight-bold" style="color: #9d9d9d;" @click="clsopen">
						x
					</view>
				</view>
				<view class="he-13 mt-2">
					<Coupons :datas="popdata" userpop='使用' @openpopup='openpopup'></Coupons>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import Coupons from '../../components/Coupons/Coupons.vue'
	import UseListtItle from "@/components/use-list-title/use-list-title.vue"
	import unipopup from "@/components/uni-popup/uni-popup.vue"
	import {mapMutations,mapState,mapGetters} from 'vuex'
	export default {
		components:{UseListtItle,unipopup,Coupons},
		data() {
			return {
				popdata:[{voucher:'品累券',vouchername:'新鲜水果10元红包',expire:'2021/07/30到期',Reduced:'满60可用',pore:'10'}],
				wh:0,
				cartlist:[{}],
				Addresslist:[],
				val:59,
				addtrue:false,
				money:"1张可用",
				mo:'',
				piplick:0,
				sukid:0,
				goodsid:0,
				misstoyou:[{}]
			}
		},
		computed:{
			...mapState(['Address','cart','tocart','aclist']),
			valttpp(){
				if(this.cart[0].goods_state == true){
					return this.cart[0].goods_price*this.cart[0].goods_count
				}else if(this.cart[0].goods_state == false){
					return 0
				}
				
			}
			
			
		},
		onLoad(options) {
			/* 获取自适应宽度 */
			const sysInfo = uni.getSystemInfoSync()
			this.wh =sysInfo.windowHeight
			if(this.tocart != ''){
				this.cartlist = this.tocart
				this.piplick = this.cartlist[0].goods_price*this.cartlist[0].goods_count
			}else if (this.cartlist = '[{}]'){
				/* this.cartlist = this.cart */
				this.cartlist = this.cart.filter(v=>{
					return v.goods_state
				})
				this.piplick = options.pick-options.pick1
			
			}
			console.log(this.cartlist)
			this.goodsid = options.goodsid
			this.sukid = options.sukid
		},
		methods: {
			openpopup(){
				this.$refs.popup.close('bottom')
				if(this.cart[0].goods_price*this.cart[0].goods_count>60){
					this.money = '-￥10'
				}
			},
			clsopen(){
				this.$refs.popup.close('bottom')
			},
			Discount(){
				this.$refs.popup.open('bottom')
			},
			
			Submit(){
				if(this.addtrue === true || this.Address.addrId != null||this.Address.length!=0||this.Address!=''){
					uni.navigateTo({
						url:"../payment/payment?id="+this.money+'&mo='+this.cartlist[0].goods_price*this.cartlist[0].goods_count+'&number='+this.cartlist[0].goods_count+"&pickits="+this.piplick+'&sukid='+this.sukid+'&goodsid='+this.goodsid
					})
				}else{
					uni.showToast({
						title:"请添加地址",
						icon:'none'
					})
				}
			},
			adder(){
				this.addtrue = true
				console.log(123)
			}
		}
	}
</script>

<style>
.buyht{min-height: 100rpx;border-radius: 20rpx;}
.buyht-shop{height: 700rpx;border-radius: 20rpx;}
.buyht1{border-radius: 20rpx;}
.buyshop{width: 50rpx;height: 50rpx;}
.col{width: 110rpx;height: 40rpx;font-size: 18rpx;}
.text-i{color: #ff6a6c;}
.lt{margin-left: 85rpx;}
.lt1{margin-left: 39rpx;}
.flot{float: right;margin-right: 30rpx;}
.hrli{min-height: 80rpx;}
.lun{color: rgb(14, 157, 153);font-size: 30rpx;font-weight: bold;}
.lg{width: 50rpx;height: 50rpx;}
.font-m{margin-top: 8rpx;font-size: 20rpx;}
.font-m1{font-size: 20rpx;}
.lg1{width: 40rpx;height: 40rpx;}
.my{width: 200rpx;height: 60rpx;}
.he{height: 80rpx;}
.fonh{overflow : hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp:2;-webkit-box-orient: vertical;}
.fontlg{font-size: 28rpx;}
.footer{width: 100%;bottom: 0px;position: fixed;}
.br{border-radius: 50rpx;}
.bghover{background-color: #F9F9F9;}
.h{height: 20rpx;}
.he4{height: 220rpx;}
.h-h{line-height: 0.1px;}
.Coupons{width: 90rpx;height: 35rpx;border-radius: 8rpx;background-color: #FFCC33;}
.Coupons-pop{margin-top: -12rpx;}
.use{width: 120rpx;height: 65rpx;background-color: #ff6205;border-radius: 15rpx;color: #e8fce0;}
.w--w{width: 20%;}
</style>
