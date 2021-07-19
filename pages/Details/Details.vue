<template>
	<view>
		<!-- 头部 -->
		<view class="he-13">
			<!-- 轮播 -->
			<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" class="Details-img">
				<swiper-item  v-for="(item,index) in tagDatasimg" :key="index">
					<view class="img" >
						<image class="Details-img" :src="item.img" mode=""></image>
					</view>
				</swiper-item>
			</swiper>
			<!-- 详情数据 -->
			<view :id="openderailsList.goodsId">
				<view class="flex justify-between ml-3 mt-3">
					<view><text class="price">{{openderailsList.salePrice}}</text><text class="m-price">{{openderailsList.salePrice*2}}</text></view>
					<view class="mr-3 font-sm text-hover-light">
						<text class="mr-2">已售 {{openderailsList.saleNum}}</text>
						<text>库存 300</text>
					</view>
				</view>
				<view class="ml-3">
					{{openderailsList.name}}
				</view>
			</view>
			
		</view>
		<view class="gap"></view>
	
		<!-- 1-1 服务标签 -->
		<use-list-title title="优惠" tip="领取优惠券" color="#ff6a6c" iconfont="iconyouhui" @goto="couponShow = true"></use-list-title>
			<view class="bg-main padding-lr padding-top padding-bottom-xs pos-r" @click="tagShow = true">
				<view class="dflex dflex-wrap-w">
					<view v-for="(item,index) in tagDatas" :key="index" class="margin-right-sm margin-bottom-sm dflex">
						<view class="iconfont iconyiwancheng- fwb fs-xs ft-base margin-right-xs"></view>
						<text class="fs-xs">{{item.name}}</text>
					</view>
				</view>
				<view class="icon-detail pos-a"><view class="iconfont iconxiangqing ft-dark fs-sm"></view></view>
			</view>
		<view class="gap"></view>
		<!-- 产品详情 -->
		<view class="w-100" v-for="(item,index) in tagDatasimg1" :key="index">
				<image mode="aspectFill" class="w-100 he-11" :src="item.img" ></image>
		</view>	
		<view class="gap"></view>
		<!-- 底部购物 -->
		<view class="example-body fend">
			<uni-goods-nav :fill="true" :options="options" :button-group="buttonGroup" @click="onClick" @buttonClick="buttonClick" />
		</view>
		<!-- 弹出层 -->
		<view>
			<!-- 普通弹窗 -->
			<uni-popup ref="popup" background-color="#fff" @change="change">
				<view class="popup-content" v-for="(item,index) in cart" :key="index">
					<!-- 图片 -->
					<view class="flex mt-3 flex-wrap">
						<view class="w-40">
							<image src="../../static/images/tab/top1.png" class="col-5 he-4" mode=""></image>
						</view>
						<view class="w-40 mt-5 ml-2">
							<view class="fonh"><!-- {{this.opencartList == ""? item.goods_name:'桃园义◆桃子四川成都龙泉水蜜桃5斤包邮新鲜现摘非奉化阳山无锡'}} -->
								{{item.goods_name}}
							</view>
							<text class="price">{{item.goods_price}}</text><text class="m-price">76</text>
							<view>一箱</view>
						</view>
						<view class="w-10 ml-5 text-hover-light" @click="popon">x</view>
					</view>
					<!-- 斤量 -->
					<view class="mt-1 ml-3">
						<view class="font-weight-bold">净重量</view>
						<view class="flex flex-wrap">
							<view class=" col-3 he-1 bg-hover-light border-radius-lg justify-center align-center flex mt-3 ml-3" >10斤</view>
						</view>
						
					</view>
					<!-- 种类 -->
					<!-- <view class="mt-5 ml-3">
						<view class="font-weight-bold">果形</view>
						<view class="flex flex-wrap">
							<view class=" col-3 he-1 bg-hover-light border-radius-lg justify-center align-center flex mt-3 ml-3" v-for="i in 4" :key="i">大果型</view>
						</view>
						
					</view> -->
					<!-- 数量 -->
					<view class="mt-6 ml-3 flex justify-between" @click="changeValueplp(item)">
						<view class="font-weight-bold">数量</view>
						<uni-number-box @change="changeValue" :value="item.goods_count"/>
					</view>
					<!-- 确定 -->
					<view class="col-10 h3 bg-red border-radius-lg mt-8 m-auto flex justify-center align-center text-r font-small "
					@click="buy">
						确定
					</view>
				</view>
			</uni-popup>
		</view>
		
	</view>
</template>

<script>
	import {mapMutations,mapState,mapGetters} from 'vuex'
	import unigoodsnav from "@/components/uni-goods-nav/uni-goods-nav.vue"
	import unipopup from "@/components/uni-popup/uni-popup.vue"
	export default {
		components:{unigoodsnav,unipopup},
		data() {
			return {
				ss:'',
				numberValue:'',
				openderailsList:[],
				opencartList:[],
				/* 页面数据 */
				good_info:{goodid:'28',goodname:'黑布林大李子 黑布林大李子 黑布林大李子',goodprice:88,good_count:1,
				goodslogo:'../../static/images/tab/top1.png',goodsstate:false},
				// 服务标签
				tagShow: false,
				tagDatas: [{name:'假一赔十'},{name:'正品包邮'},{name:'农家产品'},{name:'自产自销'}],
				tagDatasimg:[{img:'../../static/images/tab/top1.png'},{img:'../../static/images/tab/top2.png'}],
				tagDatasimg1:[{img:'../../static/images/user/l1.jpg'},{img:'../../static/images/user/l2.jpg'},
				{img:'../../static/images/user/l3.jpg'},{img:'../../static/images/user/l4.png'}],
				options: [{
					icon: 'cart',
					text: '购物车',
					info: 0
				} ],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#ffa200',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ff0000',
						color: '#fff'
					}
				]
			}
		},
		computed:{
			...mapState(['LoginOrNot','cart']),
			...mapGetters(["total"])
		},
		watch:{
			/* total(newVal) {
			      // 2. 通过数组的 find() 方法，找到购物车按钮的配置对象
			      const findResult = this.ss.find((x) => x === '0')
			
			      if (findResult) {
			        // 3. 动态为购物车按钮的 info 属性赋值
			        findResult.info = newVal
			      }
			    }, */
		},
		onLoad() {
			this.detailsopen(),
			
			
			console.log(this.cart)
			
		},
		methods: {
			...mapMutations(['addToCart','updateGoodsCount']),
			change(value) {
				
			},
			changeValue(value) {
				/* console.log('返回数值：', value); */
				this.numberValue = value
				console.log(this.numberValue)
				
			},
			changeValueplp(item){
				console.log(item)
				let valpoppe = {
					goods_id : item.goods_id,
					goods_count : +this.numberValue
				}
				this.updateGoodsCount(valpoppe)
			},
			onClick(e) {
				uni.showToast({
					title: `点击${e.content.text}`,
					icon: 'none'
				})
			},
			buttonClick(e) {
				var ss = e.index
				this.ss = e.index
				console.log(this.ss)
				this.navigateTo()
				if(ss == 1 && this.LoginOrNot == true){
					this.$refs.popup.open('bottom')
					const good = {
						goods_id:this.openderailsList.goodsId,
						goods_name:this.openderailsList.name,
						goods_price:this.openderailsList.salePrice,
						goods_count:this.good_info.good_count,
						goods_small_logo:this.good_info.goodslogo,
						goods_state:true
					}
					this.addToCart(good)
				}else if(ss == 0 && this.LoginOrNot == true){
					const good = {
						goods_id:this.openderailsList.goodsId,
						goods_name:this.openderailsList.name,
						goods_price:this.openderailsList.salePrice,
						goods_count:this.good_info.good_count,
						goods_small_logo:this.good_info.goodslogo,
						goods_state:true
					}
					this.options[0].info++
					this.addToCart(good)
				}
			},
			/* change(e) {
				console.log('当前模式：' + e.type + ',状态：' + e.show);
			},	 */
			popon(){
				this.$refs.popup.close('bottom')
			},
			buy(){
				
				uni.navigateTo({
					url:"../buy/buy"
				})
			},
			async detailsopen() {
			  //发起请求swpier
			 const { data: res } = await uni.$http.get('mallGoods/goodsDetail/296b5762c1301a92d8462193f0f32f39')
			 /* console.log(res.body) */
			 this.openderailsList = res.body
			},
		}
	}
</script>

<style>
	@charset "UTF-8";
	
	@font-face {
		font-family: uniicons;
		font-weight: normal;
		font-style: normal;
		src: url("~@/static/uni.ttf") format("truetype");
	}
.Details-img{width: 750rpx;height: 670rpx;}
.icon-detail {
	right: 30rpx;
	top: 24rpx;
}
.example-body {
		padding: 0;
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
	}
	.example-body {
		flex-direction: column;
		padding: 0px;
		background-color: #ffffff;
	}
	.example-body {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		padding: 0;
		font-size: 12px;
		background-color: #ffffff;
	}
	.fend{
		height: 100rpx;
		width: 100%;
		background-color: #ddd;
		position: fixed;
		bottom: 0;
	}
	.popup-content {
		
		height: 380px;
		background-color: #fff;
	}
	.fonh{overflow : hidden;
	    	text-overflow: ellipsis;
	    	display: -webkit-box;
	   	-webkit-line-clamp:2;
	   	-webkit-box-orient: vertical;}
</style>
