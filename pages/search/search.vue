<template>
	<view>
		<!-- 搜索页面 -->
		<view class="search-area pos-r w-full padding-lr dflex-b">
			<view class="h-full flex1 dflex-c">
				<view class="icon-search pos-a">
					<text class="iconfont iconsousuo-01"></text>
				</view>
				<input type="text" class="pos-a padding-left padding-tb-xs border-radius-lg box-sizing-b" maxlength="20"
					placeholder="请输入关键字" @confirm="search" v-model="keyword" />
			</view>
			<view class="bg-base border-radius-big padding-tb-xs padding-lr margin-left" @click="search">搜索</view>
		</view>
		<view class="gap"></view>
		<!-- 搜索历史 -->
		<view class="mt-2 ml-3" v-if="search != ''">
			<view>搜索历史</view>
			<view class="flex flex-wrap">
				<view class="col-3 bg-hover-light he-1 border-radius-lg flex justify-center align-center mt-2 ml-3" v-for="i in 7" :key="i">运动鞋</view>
			</view>
			
		</view>
		
		<!-- 搜索内容 -->
		<view class="mt-3 ml-3">
			<view>搜索内容</view>
			<view class="flex flex-wrap">
				<view class="col-3 bg-hover-light he-1 border-radius-lg flex justify-center align-center mt-2 ml-3" v-for="i in 7" :key="i">运动鞋</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import UseHeader from "@/components/use-header/use-header.vue"
	export default {
		components:{UseHeader},
		data() {
			return {
				search:[]
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.search-area {
		height: 120rpx;

		input {
			width: 560rpx;
			padding-left: 60rpx;
			height: 64rpx;
			line-height: 64rpx;
			background-color: #f5f5f5;
		}

		.icon-search {
			top: 50%;
			left: 40rpx;
			transform: translate(0, -50%);
			z-index: 1;

			text {
				color: #c0c0c0;
			}
		}
	}
</style>

