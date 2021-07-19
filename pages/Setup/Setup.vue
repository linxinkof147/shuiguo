<template>
	<view :style="{height: wh + 'px'}"  class="bg-hover-light w-100 ">
		<!-- 个人资料 -->
		<!-- <view class="w-100  bg-white ">
			<navigator url="../Setup/personal/personal"><uniListItem  title="个人资料"></uniListItem></navigator>
		</view> -->
		<!-- <view class="gap"></view> -->
		<!-- 关于平台 -->
		<!-- <view class="w-100  bg-white ">
			<navigator url=""><uniListItem  title="关于平台"></uniListItem></navigator>
		</view> -->
		<view class="gap"></view>
		<view class="w-100  bg-white ">
			<uniListItem  title="平台版本" rightText="版本号:1.0"></uniListItem>
		</view>
		
		<view  class="border-radius margin-top-sm padding-sm dflex-c bg-main log-out-btn w-90 m-auto mt-5 bg-red"
			@click="openActionSheet">
			<text class="cell-tit text-r">退出切换帐号</text>
		</view>
	</view>
</template>

<script>
	import {mapMutations,mapState} from 'vuex'
	import uniListItem from "../../components/uni-list-item/uni-list-item.vue"
	export default {
		components:{uniListItem},
		data() {
			return {
				wh:0
			}
		},
		onLoad() {
			const sysInfo = uni.getSystemInfoSync()
			this.wh =sysInfo.windowHeight
		},
		computed:{
			...mapState(['list','LoginOrNot','cart'])
		},
		methods: {
			...mapMutations(['logionyes','icn']),
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
		}
	}
</script>

<style>

</style>
