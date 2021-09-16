<template>
	<!-- 热卖产品 -->
	<view class="use-hot-goods">
		<!-- 列表标题 -->
		<view class="" @click="hot" v-if="this.title == '热卖产品'">
			<use-list-title v-if="datas && datas.length > 0" :title="title" size="32" fwt="600" :type="titleType" color="#333" iconfont="iconremen" ></use-list-title>
		</view>
		
		
		<view class="list dflex-b dflex dflex-wrap-w w-full">
			<view v-for="(item, index) in datas" :key="item.goodsId" class="item border-radius-sm padding-bottom-sm" @click="to_detail(item.goodsId,item.goodsSku[0].skuId)">
				<view class="image-wrapper"><image mode="aspectFill" :lazy-load="true" :src="item.mainPicture"></image></view>
				<text class="title clamp padding-sm">{{ item.name }}</text>
				<view class="padding-left-sm">
					<text class="price">{{ item.salePrice }}</text>
					<text class="m-price">{{item.salePrice*1.2}}</text>
				</view>
			</view>
		</view>
		
		<!-- 用云版权 -->
		
	</view>
</template>

<script>

export default {
	props: {
		title: {
			type: String,
			default: ''
		},
		titleType: {
			type: String,
			default: 'square'
		},
		autoload: {
			type: String,
			default: 'auto'
		},
		datas: {
			type: Array,
			default: () => []
		}
	},
	data() {
		return {
			
		};
	},
	watch: {
		
	},
	created() {
		
	},
	methods: {
			to_detail(item,index){
				uni.navigateTo({
					url:"../Details/Details?userId="+item+'&sukid='+index
				})
			},
			hot(){
				uni.navigateTo({
					url:"../../pages/hot/hot"
				})
			}
	}
};
</script>

<style lang="scss">
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
