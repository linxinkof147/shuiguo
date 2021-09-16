<template>
	<view class="bg-hover-light cartv" :style="{height: wh + 'px'}">
			<view class="gap"></view>
		<!-- 购物车模块 -->
		<!-- 有数据并登陆时候 -->
		<view>
			<view v-if="$store.state.LoginOrNot == true && this.cart != ''">
				<view class="carte m-auto bg-white border-radius-sm flex" v-for="(item,index) in cart" :key='index' >
					<view class="flex justify-center align-center" style="width: 8%;">
						
							<radio :checked="item.goods_state" value="" color="#DD524D" @click="radioClickHand(item,index)" />
					
							<!-- <view style="width: 50rpx;height: 50rpx;border-radius: 500rpx;border: 2rpx solid #CCCCCC;" class="flex align-center justify-center">
								<view class="unroadi"  :class="item.goods_state === true ? 'styleradio' :''"
								@click="ralio(index)"></view>
							</view> -->
						
					</view>
					<view class="flex justify-center align-center" style="width: 35%;">
						<image class="cartimges" src="../../static/images/tab/top1.png" mode=""></image>
					</view>
					<view class="" style="width: 56%;">
						<view class="fonh mt-1">{{item.goods_name}}</view>
						<view>包邮</view>
						<text class="price">{{item.goods_price}}</text><text class="m-price">76</text>
						<view class="flex d2">
							<!-- <view class="example-body" @click="changeValueplp(item)">
								<uni-number-box @change="changeValue"  :value='item.goods_count'/>
							</view> -->
							<view class="example-body he-4" @click="changeValueplp(item,index)">
								<uni-number-box @change="changeValue"  :value='item.goods_count' @click='max'/>
							</view>
							<view class=" iconfont iconlajitong-01 font-lg"
								@tap.stop="deleteCart(item)">
							</view>
						</view>
					</view>
				</view>
			</view>
			
			<!-- 购物车没数据时候 -->
			<view v-else-if="$store.state.LoginOrNot == true && this.cart == ''">
				<view class="margin-0 cart m-auto he-14 mt-1 border-radius-sm ">
					<view class="cart-img flex" v-for="(item,index) in lognstatus1" :key="index">
						<image class="img-c" :src="item.lognimg" mode=""></image>
						<view class="text-ccccc mt-1">{{item.lognname}}</view>
						<view class="cart-butt flex justify-center align-center border-radius-sm mt-1" @click="longin1">{{item.logn}}</view>
					</view>
				</view>
			</view>
			<!-- 没登陆时候 -->
			<view v-else>
				<view class="margin-0 cart m-auto he-14 mt-1 border-radius-sm ">
					<view class="cart-img flex" v-for="(item,index) in lognstatus" :key="index">
						<image class="img-c" :src="item.lognimg" mode=""></image>
						<view class="text-ccccc mt-1">{{item.lognname}}</view>
						<view class="cart-butt flex justify-center align-center border-radius-sm mt-1" @click="longin">{{item.logn}}</view>
					</view>
				</view>
			</view>
		</view>
		
		
		<!-- 热门模块 -->
		<view class="gap"></view>
		<UseHotGoods :datas="goodsHotDatas" autoload="none" title="热卖产品" ></UseHotGoods> 
		<!-- <view class="he-1 flex justify-center align-center">{{dropDowns}}</view> -->
		<!-- 购物结算 -->
		<view class="footer flex justify-between " v-if="this.LoginOrNot == true">
			<view class="mt-4 ml-3 flex">
				<text  class="price mr-2">
					{{this.cart != "" ? valttpp-x : 0}}
				</text>
			</view>
			<view class="mt-4 mr-3 flex ">
				<button type="primary" class="payment no-border border-radius-lg fs" @click="createOrder">去结算</button>
			</view>
		</view>
		
	</view>
</template>

<script>
	import UseHotGoods from "@/components/use-hot-goods/use-hot-goods.vue"
	import {mapMutations,mapState,mapGetters} from 'vuex'
	export default {
		components:{UseHotGoods},
		data() {
			return {
				wh:0,
				vale:0,
				pip:56,
				Price:0,
				cartlist:[],
				dropDowns:'下拉刷新',
				radio1:false,
				lognb:false,
				ADDmil:true,
				lognstatus:[{logn:'去登陆',lognname:'当前未授权',lognimg:'../../static/images/empty/empty.jpg'}],
				lognstatus1:[{logn:'去逛逛',lognname:'当前没有商品',lognimg:'../../static/images/empty/cart.jpg'}],
				goodsHotDatas:[],
				goodsHotDatas1:[],
				x:0
				/* ,
				misslist:[{name:'兴县的撒看见打卡机打击的时间多久啊设计大咖数据库',colour:'黑色',UnitPrice:'198',discount:'200',quantity:'2',choose:false},
				{name:'兴县的撒看见打卡机打击的时间多久啊设 123654',colour:'黑色1',UnitPrice:'388',discount:'488',quantity:'3',choose:false}
				]
				 */
			}
		},
		onPullDownRefresh(){
				this.refresh()
		},
		onLoad() {
			if(this.lognb == true){this.lognstatus = this.lognstatus1}	
			this.cartlist = this.cart
			/* console.log(this.checkedGoodsAmount) */
			this.gethotList()
			const sysInfo = uni.getSystemInfoSync()
			this.wh =sysInfo.windowHeight
			console.log(this.cart)
		},
		onReachBottom() {
			/* console.log(123) */
			/* this.dropDowns = "下拉加载中..." */
			setTimeout(()=>{
				/* 加载数据 */
				/* this.goodsHotDatas=[...this.goodsHotDatas,...this.goodsHotDatas] */
				/* 恢复数据 */
				this.dropDowns = "加载中..."
			},1000)
		},
		computed:{
			...mapState(['list','LoginOrNot','cart','tocart']),
			...mapGetters(['checkedGoodsAmount','addstrpritc','total']),
			valttpp(){
				var prices = 0;
				for (var i=0;i<this.cart.length;i++){
					prices +=  this.cart[i].goods_price*this.cart[i].goods_count
				}
				return prices;
			}
			
		},
		watch:{
			
		},
		methods: {
			...mapMutations(['updateGoodsCount','removeGoodsById','addCart']),
			max(){
				
			},
			/* 监听数量 */
			changeValue(e) {
				this.vale = e
			},
			refresh(){
				setTimeout(()=>{
					/* 停止下拉刷 */
					uni.stopPullDownRefresh()
				},1500)
				
			},
			changeValueplp(item,index){ 
				console.log(this.cart[index])
				/* 当cart里没选中增加数量不修改价格以及不往购物车力加数量 */
				if(this.cart[index].goods_state === true){
					let valpoppe = {
						goods_id : item.goods_id,
						goods_count : +this.vale
					}
					this.updateGoodsCount(valpoppe)
				}
				
			},
			/* 选择价格 */
			radioClickHand(item,index){
				console.log(index)
				console.log(item.goods_state)
				item.goods_state = !item.goods_state
				/* 点击勾选购物篮价格 */
				if(item.goods_state == false){
					 this.vale = 0 
					 this.x +=  this.cart[index].goods_price*this.cart[index].goods_count
				}else if(item.goods_state == true){
					this.x -=  this.cart[index].goods_price*this.cart[index].goods_count
				}
				
			},
			/* 删除 */
			deleteCart(item){
				/* console.log(item) */
			uni.showModal({
				/* 提示 */
				 title: '提示',
				    content: '确认删除？',
				    success: res =>  {
				        if (res.confirm) {
							this.removeGoodsById(item.goods_id)
							this.Price = 0
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
			})
				
			},
			longin(){
				uni.navigateTo({
					url:"../login/login"
				})
			},
			longin1(){
				uni.navigateTo({
					url:"../hot/hot"
				})
			},
			createOrder(){
				if(this.valttpp-this.x !=0 && this.valttpp!=0){
					this.addCart('')
					uni.navigateTo({
						url:"../buy/buy?idname="+1+"&pick="+this.valttpp+"&pick1="+this.x
					})
				} else{
					this.navigateTo()
					uni.showToast({
						title: '请添加商品'
					});
				}
			},
			//发起请求热卖
			async gethotList() {
			  const { data: res } = await uni.$http.get('mallGoods/goods?pageSize=10&pageNum=1&isHot=true')
			  this.goodsHotDatas = res.body.rows
			 /* console.log(res) */
			},
		}
	}
</script>

<style>
/* .cartv{background-color: #F7F7F7} */
.cart{width: 95%;background-color: #FFFFFF;}
.cart-img{width: 100%;height: 100%;justify-content: center;align-items: center;flex-direction:column;}
.img-c{width: 200rpx;height: 200rpx;}
.text-ccccc{color: #CCCCCC;font-size: 22rpx;}
.cart-butt{width: 130rpx;height: 60rpx;background-color: #f8f8f8;}
.carte{width: 95%;height: 300rpx;}
.unroadi{width: 30rpx;height: 30rpx;border-radius: 500rpx;}
.styleradio{background-color: #fd6801}
.cartimges{width: 200rpx;height: 200rpx;}
.di{border-radius: 20rpx;}
.d2{justify-content: space-between;}
.footer{height:100rpx;width: 100%;background-color: #FFFFFF;position: fixed;bottom: 0;}
.payment{padding: 0 20rpx;font-size: $font-base;background: $uni-color-primary;box-shadow: 1px 2px 5px rgba(217, 60, 93, 0.72);
background-color: #DC3545;margin-top: -28rpx;width: 180rpx;height: 80rpx;}
.fonh{overflow : hidden;
    	text-overflow: ellipsis;
    	display: -webkit-box;
   	-webkit-line-clamp:2;
   	-webkit-box-orient: vertical;}
	
</style>
