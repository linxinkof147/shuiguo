<template>
	<view class="bg-hover-light w-100 " :style="{height: wh + 'px'}">
		
		<!-- 收获 -->	
		<view v-for="(item,index) in informationlist" :key="index" >
			<view class="gap"></view>
			<view  class="w-90 m-auto mt-1 bg-white he4 border-radius-sm">
				<view  @click="openaddress(item)">
					<view class="mt-3 ml-2 fontmm1">{{item.addr}}</view>
					<view class="ml-2 mt-1 fontmm">
						<text>{{item.receiver}}</text>
						<text class="ml-3">{{item.mobile}}</text>
					</view>
				</view>
				<!-- 修改删除 -->
				<view class="w-90 h--1 m-auto bg-hover-light"></view>
				<view class="flex justify-between align-center he1">
					<view class="iconfont iconbianji-01 ml-2 text-hover-light" @click="openmodify(index)"></view>
					<view class="iconfont iconlajitong-01 mr-2 text-hover-light" @click="opendelete(index)"></view>
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
				{Addressname:'四川省成都市武清蓝路弘法栋3单元55楼503',name:'林鑫',phopen:'187xxxx221'}],
				informationlist:[]
			}
		},
		onLoad() {
			this. queryList()
			const sysInfo = uni.getSystemInfoSync()
			this.wh =sysInfo.windowHeight
		},
		computed:{
			...mapGetters(['addstr']),
			...mapState(['token'])
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
				console.log(item)
				if(this.OpenAddresstrue == true){
					uni.navigateBack({
					    delta: 1
					});
				} else {
					
				}
			},
			openmodify(index){
				/* console.log(index)
				console.log("修") */
				uni.navigateTo({
					url:"../Dddress/Change/Change"
				})
			},
			opendelete(index){
				console.log(index)
				console.log("删除")
				uni.showModal({
					/* 提示 */
					 title: '提示',
					    content: '确认删除',
					    success: res =>  {
					        if (res.confirm) {
								this.AddressList.splice(index,1)
					        } else if (res.cancel) {
					            console.log('用户点击取消');
					        }
					    }
				})
				
			},
			//地址
			 queryList(){
				uni.request({
					method:'GET',
				    url: 'http://117.175.58.188:9005/api-test//p/myAddress/list', //仅为示例，并非真实接口地址。
				    header: {
				       "account_token":this.token			
				    },
				    success: (res) => {
				        console.log(res.data.body);
				      this.informationlist = res.data.body
				    }
				});
			}
		}
	}
</script>

<style>
.fontmm1{font-size: 32rpx;font-weight: bold;width: 93%;}
.fontmm{font-size: 28rpx;width: 93%;}
.styleradio{background-color: #fd6801}
.unroadi{width: 30rpx;height: 30rpx;border-radius: 500rpx;}
.h--1{height: 1rpx;}
.he4{height: 210rpx;}
</style>
