<template>
	<view class="bg-light " :style="{height: wh + 'px'}">
		<!-- 头部组件 -->
		<!-- <use-header @click="search()"></use-header> -->
		<view class="swiper-area pos-r bgw he-5" v-if="swiperDatas && swiperDatas.length > 0">
			<!-- 轮播组件 -->
			<swiper class="swiper w-full" autoplay indicator-dots indicator-color="#f7f7f7" indicator-active-color="#ff6a6c">
				<swiper-item class="swiper-item padding-lr wh-full box-sizing-b" v-for="(item, index) in swiperDatas" :key="item.imgId">
					<view class="wh-full" >
						<image class="border-radius wh-full"  :lazy-load="true" :src="item.imgUrl" />
					</view>
				</swiper-item>
			</swiper>
		</view>
		<!-- 小型图标 -->
		<!-- <view class="tab" @click="miss">
			<view class="tabview" v-for="(item,index) in categoryDatas" :key="index">
				<view>
					<image :src="item.img" mode="" class="tab-img"></image>
				</view>
				<view>{{item.name}}</view>
			</view>
		</view> -->
		
		<view class="gap"></view>
		<use-list-title title="限时精选" size="32" fwt="600" color="#333" iconfont="icondaishouhuo-" @goto="limit">
		</use-list-title>
		<view class="limit-area bgw">
			<scroll-view class="list padding-lr" scroll-x>
				<view class="dflex padding-bottom">
					<view class="item margin-right-sm" v-for="(item, index) in goodsHotDatas" :key="index"
						@click="togoods(item,index)">
						<image class="border-radius-xs" mode="aspectFill" :lazy-load="true" :src="item.mainPicture"></image>
						<text class="title clamp padding-bottom-xs">{{ item.name }}</text>
						<text class="price">{{ item.salePrice }}</text><text class="m-price">{{item.salePrice*1.2}}</text>
					</view>
				</view>
			</scroll-view>
		</view>
	
		<view class="gap mm"></view>
		<!-- 	<web-view src="http://app.joy-ec.cn/user/category"></web-view> -->
		<!-- 热门推荐 -->
			<view class="use-hot-goods " :style="{height: wh + 'px'}">
				<!-- 列表标题 -->
				<UseHotGoods :datas="goodsHotDatas" autoload="none" title="热卖产品"></UseHotGoods> 
				<!-- 用云版权 -->
			</view>
			<!-- 下拉加载 -->
			<!-- <view class="he-1 flex justify-center align-center">{{dropDowns}}</view> -->
			<app-update ref="app_update" :force="true" :tabbar="false" v-if="this.edition<this.newedition"></app-update>
	</view>
</template>

<script>
	import {mapMutations,mapState} from 'vuex'
	import UseHeader from "@/components/use-header/use-header.vue"
	import UseListtItle from "@/components/use-list-title/use-list-title.vue"
	import UseHotGoods from "@/components/use-hot-goods/use-hot-goods.vue"
	import countdown from "@/components/cz-countdown/cz-countdown.vue"
	import appUpdate from "@/components/yzhua006-update/app-update.vue"
	export default {
		components:{UseHeader,UseListtItle,UseHotGoods,countdown,appUpdate},
		data() {
			return {
				startTime:'2020-01-01 00:00:00',
				enTime:'2020-02-01 00:00:00',
				wh:0,
				dropDowns:'下拉刷新',
				 swiperList: [],
				 /* 轮播图片 */
				swiperDatas: [],
				goodsLimitDatas:[],
				goodsHotDatas:[],
				edition:"1.7.0",
				newedition:"1.2.0",
				misstome:[],
				index:0
			}
			
		},
		computed:{
			...mapState(['LoginOrNot','token'])
		},
		/* onReachBottom() {
			console.log(123)
			this.dropDowns = "下拉加载中..."
			setTimeout(()=>{
				加载数据
				this.goodsHotDatas=[...this.goodsHotDatas,...this.goodsLimitDatas]
				恢复数据
				this.dropDowns = "加载中..."
			},1000)
			
		}, */
		onLoad() {
			 this.getSwiperList()
			 this.gethotList()
			 const sysInfo = uni.getSystemInfoSync()
			 this.wh =sysInfo.windowHeight
			/* console.log(this.token) */
			this.oldVersion()
		},
		mounted() {
		               if(this.edition<this.newedition){
						    this.$refs.app_update.update();  //调用子组件 检查更新
					   }
		            },
		methods: {
			/* 热更新请求 */
			async oldVersion(){
				const { data: res } = await uni.$http.post('version/checkVersion')
				/* console.log(res) */
				this.newedition = res.body.versionNo
			},
			async getSwiperList() {
			  //发起请求swpier
			 const { data: res } = await uni.$http.get('indexImg/indexImgs/1')
			this.swiperDatas = res.body
			 /* console.log(res.body) */
			},
			//发起请求热卖
			async gethotList() {
			  const { data: res } = await uni.$http.get('goods/list?pageSize=15&pageNum=1&field=createTime&order=asc')
			  this.goodsHotDatas = res.body.rows
			/*  console.log(res.body.rows) */
			},
			
			limit(){
				uni.navigateTo({
					url:'../hot/hot'
				})
			},
			search(){
				console.log("11111")
			},
			togoods(item,index){
				uni.navigateTo({
					url:"../Details/Details?userId="+item.goodsId+"&use="+1+'&sukid='+item.goodsSku[0].skuId
					/* url:"../Details/Details?userId=18228403380&totalFee=1" */
					
				})
			},
			miss(){
				
			}
		}
	}
</script>

<style scoped>
.gap{margin-top: 5rpx;}
.tab{display: flex;flex-wrap: wrap;margin-top: 40rpx;}
.tabview{width: 25%;display: flex;justify-content: center;align-items: center;flex-direction:column;flex-wrap: wrap;margin-top: 10rpx;}
.tab-img{width: 110rpx;height: 110rpx;}
.border-radius-xs{width: 240rpx;height: 240rpx;}
.item {width: 240rpx;}
.hot{background-color: #f3f4f8;width: 100%;}
.hot-view{width: 95%;margin: 0 auto;display: flex;flex-wrap: wrap;}
.he7{height: 460rpx;}
.use-hot-goods {
	background-color: #f3f4f6;
	
	.list{
		padding: 0 3vw 20rpx;
	}
	
	.item { 
		width: 46vw;
		overflow: hidden;
		margin-top: 2vw;
		background: #fff;

		&:nth-child(2n) {
			margin-left: 1vw;
		}
		&:nth-child(2n + 1) {
			margin-right: 1vw;
		}
	}
	
	.image-wrapper {
		width: 100%;
		height: 300rpx;
		overflow: hidden;
	
		image {
			width: 100%;
			height: 100%;
			opacity: 1;
		}
	}
}
.he6{width: 100%;background-color: #f7f7f7;}
.mt1{margin-top: 9rpx;}
</style>
