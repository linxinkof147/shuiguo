<template>
	<view class="w-100 mt-3 h5 flex justify-center align-center mt-8" >
		<view @click="miss()">
			<image class="col" src="../../static/images/user/vx.png" mode=""></image>
			<view class=" text-hover-light">
				微信登陆
			</view>
			
		</view>
	</view>
</template>

<script>
	import {mapMutations,mapState} from 'vuex'
	const univerifyInfoKey = 'univerifyInfo';

	export default {
		data() {
			return {
			
				providerList: [],
				kklist:[],
				me:[{name:'123'},{name:'3211'}]
			
			}
		},
		computed: {
			
		},
		mounted() {
			this.kklist =  this.me
			this.icn(this.kklist)
			/* vuex的调用方法 */
			
			/* 获取登陆可以用几种方式 */
			uni.getProvider({
				service: 'oauth',
				success: (result) => {
					this.providerList = result.provider.map((value) => {
						let providerName = '';
						switch (value) {
							case 'weixin':
								providerName = '微信登录'
								break;
							case 'qq':
								providerName = 'QQ登录'
								break;
							case 'sinaweibo':
								providerName = '新浪微博登录'
								break;
							case 'xiaomi':
								providerName = '小米登录'
								break;
							case 'alipay':
								providerName = '支付宝登录'
								break;
							case 'baidu':
								providerName = '百度登录'
								break;
							case 'toutiao':
								providerName = '头条登录'
								break;
							case 'apple':
								providerName = '苹果登录'
								break;
							case 'univerify':
								providerName = '一键登录'
								break;
						}
						return {
							name: providerName,
							id: value
						}
					});

				},
				fail: (error) => {
					console.log('获取登录通道失败', error);
				}
			});
		},
		computed:{
			...mapState([
				'list'
			])
		},
		methods: {
			...mapMutations([
				'icn','logionyes'
			]),
			/* 第三方登陆 */
				miss(){
					/* console.log(this.providerList); */
					uni.login({
					  provider: 'weixin',
					  success: res => {
					   /* console.log(res); */
						uni.getUserInfo({
						      provider: 'weixin',
						      success: res => {
						       console.log(res);
								/* 登陆成功 */
								uni.showToast({
									title:'登陆成功'
								})
								uni.switchTab({
									url:"../../pages/My/My"
								})
								
								/* 微信接受的数据 */
								let obj  = {
										name:res.userInfo.nickName,
										city:res.userInfo.city,
										avatarUrl:res.userInfo.avatarUrl,
										unionId:res.userInfo.unionId
								}
								this.loginEvent(obj)
								this.icn(obj)
						      },
						    });
					  },
					  fail: () => {
					  	uni.showModal({
					  		title:'登陆失败',
							icon:'none'
					  	})
					  }
					});
					/* 修改登陆 */
					this.logionyes(true)
				},
				/* 请求后台登陆逻辑 */
				loginEvent(data){
					/* 请求后台 */
					console.log(data)
				},
				kkme(){
				}
			}
	}
</script>

<style>
	.col{width: 100rpx;height: 100rpx;}
</style>
