<template>
	<view class="bg-hover-light w-100 " style="height: 1rpx;" :style="{height: wh + 'px'}">
		
		<!-- 收获 -->	
		<view v-for="(item,index) in AddressList" :key="index" >
			<view class="gap"></view>
			<view  class="w-90 m-auto mt-1 bg-white he-3 border-radius-sm" @click="openaddress(item)">
				<view class="mt-3 ml-2 fontmm1">{{item.Addressname}}</view>
				<view class="ml-2 mt-1 fontmm">
					<text>{{item.name}}</text>
					<text class="ml-3">{{item.phopen}}</text>
				</view>
				<!-- 底部 -->
			</view>
		</view>
		
	<!-- 	添加 -->
	<view  class="border-radius margin-top-sm padding-sm dflex-c bg-main log-out-btn w-90 m-auto mt-5 bg-red"
		@click="openActionSheet">
		<text class="cell-tit text-r">添加地址</text>
	</view>
	</view>
</template>

<script>
	import {mapMutations,mapState,mapGetters} from 'vuex'
	export default {
		data() {
			return {
				wh:0,
				radio:false,
				OpenAddresstrue:true,
				AddressList:[{Addressname:'四川省成都市武清蓝路弘法栋3单元55楼504',name:'张悦月',phopen:'136xxxxx123'},
				{Addressname:'四川省成都市武清蓝路弘法栋3单元55楼503',name:'林鑫',phopen:'187xxxx221'}]
			}
		},
		onLoad() {
			const sysInfo = uni.getSystemInfoSync()
			this.wh =sysInfo.windowHeight
		},
		computed:{
			...mapGetters(['addstr'])
		},
		methods: {
			...mapMutations(['Addressopen']),
			ralio(){
				if(this.radio == false){this.radio = true}
				else if (this.radio == true){this.radio = false}
			},
			openActionSheet(){
				uni.navigateTo({
					url:"../Dddress/Addaddress/Addaddress"
				})
			},
			openaddress(item){
				this.Addressopen(item)
				/* console.log(item) */
				
				if(this.OpenAddresstrue == true){
					uni.navigateBack({
					    delta: 1
					});
				} else {
					
				}
			}
		}
	}
</script>

<style>
.fontmm1{font-size: 32rpx;font-weight: bold;width: 93%;}
.fontmm{font-size: 28rpx;width: 93%;}
.styleradio{background-color: #fd6801}
.unroadi{width: 30rpx;height: 30rpx;border-radius: 500rpx;}
</style>
