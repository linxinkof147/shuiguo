<template>
	<view>
		<view>
		  </view>
		<!-- 头部组件 -->
		<!-- <use-header @click="search()"></use-header> -->
		<view class="swiper-area pos-r" v-if="swiperDatas && swiperDatas.length > 0">
			<!-- 轮播组件 -->
			<swiper class="swiper w-full" autoplay indicator-dots indicator-color="#f7f7f7" indicator-active-color="#ff6a6c">
				<swiper-item class="swiper-item padding-lr wh-full box-sizing-b" v-for="(item, index) in swiperDatas" :key="index">
					<view class="wh-full" >
						<image class="border-radius wh-full"  :lazy-load="true" :src="item" />
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
  
		<!-- 热门推荐 -->
			<view class="use-hot-goods" :style="{height: wh + 'px'}">
				<!-- 列表标题 -->
				<UseHotGoods :datas="goodsHotDatas" autoload="none" title="热卖产品"></UseHotGoods> 
				<!-- 用云版权 -->
			</view>
			<!-- 下拉加载 -->
			<!-- <view class="he-1 flex justify-center align-center">{{dropDowns}}</view> -->
	</view>
</template>

<script>
	import {mapMutations,mapState} from 'vuex'
	import UseHeader from "@/components/use-header/use-header.vue"
	import UseListtItle from "@/components/use-list-title/use-list-title.vue"
	import UseHotGoods from "@/components/use-hot-goods/use-hot-goods.vue"
	export default {
		components:{UseHeader,UseListtItle,UseHotGoods},
		data() {
			return {
				wh:0,
				dropDowns:'下拉刷新',
				 swiperList: [],
				 /* 轮播图片 */
				swiperDatas: [],
				goodsLimitDatas:[{"name":"Huawei/华为Mate30 全网通5G智能手机","img":"../../static/images/user/1.jpg",price:'5000'},{"name":"小米10","img":"../../static/images/user/2.jpg",price:'3000'},
				{"name":"华为折叠手机","img":"../../static/images/user/3.png",price:'2000'},{"name":"华为荣耀20","img":"../../static/images/user/4.png",price:'8000'},
				{"name":"黑鲨游戏手机","img":"../../static/images/user/5.jpg",price:'4000'},{"name":"iPhone 11 Pro Max","img":"../../static/images/user/6.jpg",price:'1000'}
				],
				goodsHotDatas:[]
				/* categoryDatas:[{"name":"桃子","img":"../../static/images/img/1.png"},{"name":"苹果","img":"../../static/images/img/2.png"},
								{"name":"荔枝","img":"../../static/images/img/3.png"},{"name":"李子","img":"../../static/images/img/4.png"},
								{"name":"火龙果","img":"../../static/images/img/5.png"},{"name":"葡萄","img":"../../static/images/img/6.png"},
								{"name":"芒果","img":"../../static/images/img/7.png"},{"name":"车厘子","img":"../../static/images/img/8.png"}
				], */
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
			 console.log(this.token)
		},
		methods: {
			async getSwiperList() {
			  //发起请求swpier
			 const { data: res } = await uni.$http.post('/mallGoods/banner')
			 this.swiperDatas = res.body.banner
			},
			//发起请求热卖
			async gethotList() {
			  const { data: res } = await uni.$http.get('mallGoods/goods?pageSize=10&pageNum=1&isHot=true')
			  this.goodsHotDatas = res.body.rows
			 console.log(res)
			},
			
			limit(){
				console.log("123")
			},
			search(){
				console.log("11111")
			},
			togoods(index){
				console.log(index)
				console.log("xiangqingye")
				
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

</style>
