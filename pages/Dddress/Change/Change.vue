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
				<view class="ml-7 font-s mt-0 mt"><pickerAddress @change="change">{{txt}}</pickerAddress></view>
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
			<text class="cell-tit text-r">确认修改</text>
		</view>
	</view>
</template>

<script>
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
				param:'',
				addid:''
			}
		},
		onLoad() {
			const sysInfo = uni.getSystemInfoSync()
			this.wh =sysInfo.windowHeight
			 this.missto()
			 /* 接受路径数据 */
			 let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
			 let curRoute = routes[routes.length - 1].route //获取当前页面路由
			 let curParam = routes[routes.length - 1].options; //获取路由参数
			 // 拼接参数
			 let param = ''
			 for (let key in curParam) {
			     param += key + '=' + curParam[key]
			 }
			 this.param = param.substring(1, param.lastIndexOf('?'))
			 console.log(this.param)
			 
		},
		methods: {
			change(data) {
				console.log(data)
				this.txt = data.data.join('')
				console.log(data.data.join(''))
			},
			openActionSheet(){
				uni.showModal({
					/* 提示 */
					 title: '提示',
					    content: '确认修改',
					    success: res =>  {
					        if (res.confirm) {
								if(this.inputpohe !=""&&this.txt !=""&&this.inputaddress !=""&&this.txt !="选择地址"){
									const goods = {
									         goods_id: this.inputname,      
									         goods_name: this.inputpohe,   
									         goods_price: this.inputaddress,
									         goods_count: this.txt,                          
									      }
										  this.miss()
										  setTimeout(()=>{
										  	uni.showToast({
										  		title:'修改成功'
										  	})
										  	this.missto()
										  },1000)
									
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
			async miss(){
				const { data: res } = await uni.$http.put('/p/myAddress/update',{
					"receiver":this.inputname,
					"addr":this.txt+this.inputaddress,
					"mobile":this.inputpohe,
					"addrId":this.addid.body[this.param].addrId
				})
				console.log(res)
			},
			async missto(){
				const { data: res } = await uni.$http.get('/p/myAddress/list')
				this.addid = res
				console.log(this.addid.body[this.param])
			},
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
