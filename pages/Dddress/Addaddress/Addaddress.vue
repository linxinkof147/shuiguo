<template>
	<view :style="{height: wh + 'px'}"  class="bg-hover-light w-100 ">
		<view class="gap"></view>
		<!-- 详情信息 -->
		<view class="w-100 he-8 bg-white">
			<view class="flex flex-wrap w-95 m-auto ml-3">
				<view class="font-s mt-3">收货人</view>
				<view class="ml-7 font-s mt-0 "><input class="font " type="text" v-model="inputname"  placeholder="请输入姓名" /></view>
				<view class="he-2"></view>
			</view>
			<view class="flex flex-wrap w-95 m-auto ml-3">
				<view class="font-s mt-3">电话</view>
				<view class="ml-7 font-s mt-0  "><input class="font ml-3" type="text" v-model="inputpohe"  placeholder="请输入手机号" /></view>
				<view class="he-2"></view>
			</view>
			<view class="flex flex-wrap w-95 m-auto ml-3">
				<view class="font-s mt-3">地址</view>
				<view class="ml-7 font-s mt-0 mt"><pickerAddress @change="change" style="width: 450rpx;">{{txt}}</pickerAddress></view>
				<view class="he-2"></view>
			</view>
			<view class="flex flex-wrap w-95 m-auto ml-3">
				<view class="font-s mt-3">详细地址</view>
				<view class="ml-7 font-s mt-0 "><input class="font mr3" type="text"  v-model="inputaddress" placeholder="请输入详细地址" /></view>
				<view class="he-1"></view>
			</view>
		</view>
		
		<view  class="border-radius margin-top-sm padding-sm dflex-c bg-main log-out-btn w-90 m-auto mt-5 bg-red"
			@click="openActionSheet">
			<text class="cell-tit text-r">提交</text>
		</view>
	</view>
</template>

<script>
	import {mapMutations,mapState} from 'vuex'
	import pickerAddress from '../../../components/wangding-pickerAddress/wangding-pickerAddress.vue';
	export default {
		components:{pickerAddress},
		data() {
			return {
				wh:0,
				txt: '选择地址',
				inputname:'',
				inputpohe:'',
				inputaddress:'',
				Address:[]			
			}
		},
		onLoad() {
			const sysInfo = uni.getSystemInfoSync()
			this.wh =sysInfo.windowHeight
		},
		computed:{
			...mapState(['LoginOrNot','token'])
		},
		methods: {
			...mapMutations(['Addressopen','Addharvest']),
			change(data) {
				console.log(data)
				this.txt = data.data.join('')
				console.log(data.data.join(''))
			},
			openActionSheet(){
				/* 判断地址有无填写正确 */
				uni.showModal({
					/* 提示 */
					 title: '提示',
					    content: '确认地址无误?',
					    success: res =>  {
					        if (res.confirm) {
								if(this.inputpohe !=""&&this.txt !=""&&this.inputaddress !=""&&this.txt !="选择地址"){
									let goods = [{
									         goods_id: this.inputaddress,      
									         goods_name:this.inputname,   
									         goods_price:this.inputpohe,
									         goods_count:this.txt+this.inputaddress ,
											 goods_token:this.token
									      }]
										 this.getincreaseList()
										 uni.redirectTo({
										     url: '../Dddress'
										 })
									uni.showToast({
										title: '添加成功'
									})
									uni.navigateTo({
										url:'../Dddress'
									})
								}else{
									uni.showToast({
										title: '资料未填写完',
										mask: false, 
										icon:"none"
									})
								}
					        } else if (res.cancel) {
					            console.log('用户点击取消');
					        }
					    }
				})
			},
			miss(){
				console.log(this.inputname);
			},
			async getincreaseList() {
			  //发起添加地址
			const { data: res } = await uni.$http.post('/p/myAddress/addAddr',{
				"receiver":this.inputname,
				"addr":this.txt+this.inputaddress,
				"mobile":this.inputpohe
			})}
		}
	}
</script>

<style>
.mt-0{margin-top: 42rpx;margin-left: 150rpx;}
.mt{margin-top: 30rpx;margin-left: 180rpx;}
.font-s{font-size: 35rpx;}
.right-top{display: flex;align-items: center;}
.mr3{margin-left: -32rpx;}
</style>
