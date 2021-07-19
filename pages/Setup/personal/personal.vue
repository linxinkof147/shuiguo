<template>
	<view :style="{height: wh + 'px'}"  class="bg-hover-light w-100 ">
		<view class="gap"></view>
		<view class="flex justify-center align-center mt-1">
			<view><image class="yiimg" src="../../../static/images/img/dianpu.png" mode=""></image></view>
			<view class="ml-3">
				<view>.五岁百。</view>
				<view>中国-四川-绵阳</view>
			</view>
		</view>
		<!-- 名称 -->
		<view class="flex w-100 he-2 bg-white align-center justify-between mt-3">
			<view class="ml-3">昵称</view>
			<view class="mr-3">.五岁百</view>
		</view>
		<!-- 性别 -->
		<view class="flex w-100 he-2 bg-white align-center justify-between mt-3">
			<view class="ml-3">性别</view>
			<view class="mr-3">男</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				wh:0
			}
		},
		onLoad() {
			const sysInfo = uni.getSystemInfoSync()
			this.wh =sysInfo.windowHeight
		},
		methods: {
			
		}
	}
</script>

<style>
.yiimg{width: 150rpx;height: 150rpx;}
</style>
