<template>
	<view class="bg-hover-light w-100 " :style="{height: wh + 'px'}">
		
		<!-- 收获 -->	
		<view v-for="(item,index) in informationlist" :key="index" >
			<view class="gap"></view>
			<view  class="w-90 m-auto mt-1 bg-white he4 border-radius-sm">
				<view  @click="openaddress(item)">
					<view class="mt-3 ml-2 fontmm1 text-ellipsis">{{item.addr}}</view>
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
		/* 	this. queryList() */
			const sysInfo = uni.getSystemInfoSync()
			this.wh =sysInfo.windowHeight
			this.getTranslate()
		},
		computed:{
			...mapGetters(['addstr']),
			...mapState(['token'])
		},
		methods: {
			...mapMutations(['Addressopen']),
			async claseTranslate(index){
				let claseeadd = this.informationlist[index].addrId
				const { data: res } = await uni.$http.delete("p/myAddress/delete/"+ claseeadd)
				console.log(res)
				console.log(index)
				
			},
			ralio(){
				if(this.radio == false){this.radio = true}
				else if (this.radio == true){this.radio = false}
			},
			openActionSheet(){
				uni.redirectTo({
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
				console.log(index)
				console.log("修")
				uni.navigateTo({
					url:"../Dddress/Change/Change?"+index
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
								this.claseTranslate(index)
								setTimeout(()=>{
									uni.showToast({
										title:'删除成功'
									})
									this.getTranslate()
								},1000)
					        } else if (res.cancel) {
					            console.log('用户点击取消');
					        }
					    }
				})
				
			},
			//地址，
			async getTranslate() {
			  //发起请求地址
			const { data: res } = await uni.$http.get('/p/myAddress/list')
			console.log(res)
			this.informationlist = res.body
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
