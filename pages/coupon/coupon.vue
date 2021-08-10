<template>
	<view class="bghover w-100" :style="{height: wh + 'px'}">
		<view class="bghover h"></view>
		<view v-if="router == 'pages/My/My'">
			<Coupons :datas="popdata" userpop='去使用' ></Coupons>
		</view>
		<!-- 弹出层 -->
		<view v-if="router == 'pages/Details/Details'">
			<Coupons :datas="popdata" userpop='点击领取' ></Coupons>
		</view>
	</view>
</template>

<script>
	import Coupons from '../../components/Coupons/Coupons.vue'
	import {mapMutations,mapState,mapGetters} from 'vuex'
	export default {
		components:{Coupons},
		data() {
			return {
				popdata:[{voucher:'品累券',vouchername:'新鲜水果10元红包',expire:'2021/07/30到期',Reduced:'满60可用',pore:'10'}],
				router:''
			}
		},
		onLoad() {
			const sysInfo = uni.getSystemInfoSync()
			this.wh =sysInfo.windowHeight
			var pages = getCurrentPages(); // 当前页面
			var beforePage = pages[pages.length - 2]; // 前一个页面
			
			this.router = beforePage.route
			/* this.openget() */
		},
		computed:{

			...mapState(['token'])
		},
		methods: {
			use(){
				uni.navigateTo({
					url:'../hot/hot'
				})
			},
			 openget() {
			  //发起请求swpier
			uni.request({
				method:'GET',
			    url: 'http://117.175.58.188:9005/api-test//coupon/canAvailable', //仅为示例，并非真实接口地址。
			    header: {
			       "account_token":this.token			
			    },
			    success: (res) => {
			        console.log(res);
			    }
			});a
			},
		}
	}
</script>

<style>
.bghover{background-color: #F9F9F9;}
.h{height: 20rpx;}
.he4{height: 220rpx;}
.h-h{line-height: 0.1px;}
.Coupons{width: 90rpx;height: 35rpx;border-radius: 8rpx;background-color: #FFCC33;}
.Coupons-pop{margin-top: -12rpx;}
.use{width: 120rpx;height: 65rpx;background-color: #ff6205;border-radius: 15rpx;color: #e8fce0;}
.w--w{width: 20%;}
</style>
