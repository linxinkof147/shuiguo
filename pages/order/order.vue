<template>
	<!-- 外框 -->
	<view>
		<!-- 顶部选项卡 -->
		<scroll-view scroll-x="true" class="feed " :scroll-into-view="scrollInto" scroll-with-animation   @scroll="onas">
			<view class="flex align-center justify-center ">
				<view @click="changeTab(index)" class="miss flex-1 justify-center align-center"
				v-for="(item,index) in taBaers"  :key="index" :class=" tabIndex === index ? 'textmian' : '' " :id="'tab'+index">{{item.name}}</view>
			</view>	
		</scroll-view>
		
		<view :style="{height: wh + 'px'}" class="bg-hover-light ">
			<swiper  :duration="150" :current="tabIndex" @change="onChangeTab" :style="{height: wh + 'px'}" class="bg-hover-light ">
				<swiper-item   class="he-8"  v-for="i in 3" :key="i" >
					<view class="flex justify-center align-center" :style="{height: wh + 'px'}" v-if="orderList==''">
						<view>暂无购买数据...</view>
					</view>
						<!-- 订单 -->
						<view class="w-95 m-auto bg-white border-radius-sm he-6 mt-3" v-for="i in 2" :key="i" v-if="orderList!=''">
							<view class="flex">
								<!-- 图片 -->
								<view class="w-30 mt-5 ml-2">
									<image class="order-img" src="../../static/images/user/l2.jpg" mode=""></image>
								</view>
								<!-- 文字 -->
								<view class="w-70 mt-2 ml-2">
									<view class="line-0">实打实打算</view>
									<view class="line-0">大撒大撒大苏打</view>
									<view class="text-hover-light ">x1 黑色</view>
									<view class="mt-3 font-lg">￥539</view>
									<view class="flotl mr-4 font-lg">实付：￥539</view>
								</view>
							</view>
							<!-- 底部 -->
							<view class="mt-1 ml-3 flex justify-between">
								<view>已取消</view>
								<view class="mr-5 ds flex justify-center align-center" @click="order()">
									<text>删除订单</text>
								</view>
							</view>
						</view>
				</swiper-item>
				
			</swiper>
		</view>
		
		
		
		<!-- <block v-for="(item,index) in list" :key="index"> -->
		<!-- 消息栏 -->
		<!-- <fass :item="item" :index="index" @FOOts="FOOts"></fass>
		<view class="Division"></view>
		</block> -->
		
		
	</view>
</template>

<script>
	
	export default {
		data(){
			return{
				/* 顶部选项卡 */
				tabIndex:0,
				scrollInto:'',
				taBaers:[{'name':"全部","id":0},
				{'name':"待收货","id":1},
				{'name':"待发货","id":2}],
				newsList:[],
				wh:0,
				orderList:[]
			}
		},
		onLoad() {
				this.getData()
				/* 获取自适应宽度 */
				const sysInfo = uni.getSystemInfoSync()
				this.wh =sysInfo.windowHeight
				
		},
		/* 原生导航栏监听 */
		onNavigationBarButtonTap(index){
			uni.navigateTo({
				url:"../addinput/addinput"
			})
		},
		
		onReachBottom(){
			console.log(123)
		}
		,
		methods: {
			details(){
				uni.navigateTo({
					url:"../detail/detail",
					
				})
			},
			getData(){
					
					 
							
						},
			/* 监听滑动切换 */	
			onChangeTab(e){
				this.changeTab(e.detail.current)
				console.log("1111")
			},
			/* 切换 */
			changeTab(index){
				if(this.tabIndex === index){
					return;
				}
				this.tabIndex = index
				this.scrollInto = 'tab'+index
			},
			order(){
				console.log("11")
			},
			/* 关注 */
			FOOts(e){
				let news = this.newsList[e]
				news.list[e].isFollow = true
				uni.showToast({
					title:"关注成功"
				})
			},
			/* 上拉加载 */
			loadmore(index){
				let item = this.newsList[index]
				/* 修改列表状态 */
				if(item.loadmore !=="上拉加载更多")return;
				item.loadmore = "加载中..."
				/* 模拟数据 */
				setTimeout(()=>{
					/* 加载数据 */
					item.list=[...item.list,...item.list]
					/* 恢复数据 */
					item.loadmore = "上拉加载更多"
				},2000)
			},
			
		}
	}
</script>

<style scoped>
	.Division{width: 100%;height: 20rpx;background-color: #f5f5f4;}
	.feed{width: 100%;white-space: nowrap;margin-top: 10rpx;height: 90rpx;}
	.miss{height: 80rpx;margin-left: 0rpx;font-size: 36rpx;margin-left: 75rpx;}
	.textmian{color: #FD597c;font-size: 40rpx;font-weight: bold;}
	.tome{display: flex;width: 100%;height: 80rpx;justify-content: center;align-items: center;}
	.tome-font{font-size: 32rpx;color: #BBBBBB;}
	.order-img{width: 200rpx;height: 200rpx;}
	.flotl{float: right;}
	.font-lg{font-weight: bold;font-size: 32rpx;}
	.ds{border-radius: 30rpx;width: 160rpx;height: 60rpx;border: 1rpx solid #FD597c;background-color:#fff9fb ;color: #e36f7c;}
</style>

