<template>
	<view>
		<!-- logo -->
			<view class=" loginlogo flex justify-center align-center">
				<view class="portrait-box margin-bottom "> 
					<image class="headimg border-radius-c mt" :src=" '/static/images/user/default.png'"></image>
				</view>
			</view>
		<!-- 登陆账号密码 -->
		<!-- 帐号 -->
		<view class="w-80 m-auto mt-3">
			<view class="w-full dflex padding-bottom-sm">
				<view class="iconfont iconshouji margin-right"></view>
				<view class="flex1 dflex">
					<input class="border-line padding-sm flex1" type="number" data-key="mobile" maxlength="11" :value="mobile" @input="inputChange" placeholder="请输入手机号" />
					<view v-if="0 == 1" class="padding-tb-sm ft-dark" @click="send_code">获取</view>
				</view>
			</view>
			<!-- 密码 -->
			<view class="w-full dflex padding-bottom-sm">
				<view class="iconfont iconmima margin-right"></view>
				<view class="flex1 dflex">
					<input class="border-line padding-sm flex1" type="password" data-key="password" maxlength="11" :value="password" @input="inputChange" placeholder="请输入密码" />
					<view v-if="0 == 1" class="padding-tb-sm ft-dark" @click="send_code">获取</view>
				</view>
			</view>
			<!-- 忘记密码注册 -->
			<view class="dflex-b w-full margin-bottom-sm">
				<view class="padding-tb-sm ft-dark"></view>
				<view class="padding-tb-sm ft-base" @click="toregister">立即注册</view>
			</view>
			<!-- 登陆按钮 -->
			<view class="w-full margin-top-xl">
				<view class="dflex-b border-radius-lg">
					<view class="tac padding-tb-sm flex1 bg-base fs" :disabled="disabled"
		  @click="subimts">登录</view>
				</view>
			</view>
		</view>
		
		
		<!-- 微信授权 -->
		<!-- <otherLogin> </otherLogin> -->
		<!-- <view class="w-100 mt-3 h5 flex justify-center align-center mt-8" >
			<view @click="miss">
				<image class="col" src="../../static/images/user/vx.png" mode=""></image>
				<view class=" text-hover-light">
					微信登陆
				</view>
			</view>
		</view> -->
	</view>
</template>

<script>
	import otherLogin from "../../components/other-login/other-login.vue"
	import {mapMutations,mapState} from 'vuex'
	export default {
		components:{otherLogin},
		data() {
			return {
				/* 登陆 帐号密码*/
				mobile: '',
				password: '',
				pass:'',
				login:''
			}
		},
		computed:{
			...mapState(['LoginOrNot']),
			/* 账号验证 */
			disabled(){
				return this.pass == ""||this.login ==''
			},
			/* 手机验证 */
			disabledto(){
				return this.phone == ""||this.code ==''
			}
		},
		methods: {
			...mapMutations([
				'logionyes','updateToken'
			]),
			inputChange(e) {
				const key = e.currentTarget.dataset.key;
				this[key] = e.detail.value;
				/* console.log(this[key]) */
			},
			toregister() {
				// 注册页
				uni.navigateTo({
					url: '../register/register'
				});
			},
			initForm(){
				this.pass=''
				this.login=""
				this.phone=''
				this.code=''
			},
			validate(){
				/* return false */
				var mPattern = /^1[345678]\d{9}$/;
				if(!mPattern.test(this.mobile) || this.password.length<4){
					uni.showToast({
						title:"手机号或密码不正确",
						icon:'none'
					})
					return false
				}
				return true
			},
			/* 提交 */
			subimts(){
				/* 表单验证 */
				if(!this.validate())return;
				/* 提交后端 */
				this.loginopen()
				/* 登录成功 */
			},
			miss(){
				console.log(123)
			},
			async loginopen() {
			  //发起请求登陆
			 const { data: res } = await uni.$http.post('/login',
			{"customerName":this.mobile,"password": this.password})
			 console.log(res)
			 if(res.body){
				 uni.showToast({
				 	title:'登陆成功'
				 })
				this.logionyes(true)
				this.updateToken(res.body.token)
				 setTimeout(()=>{
				 	uni.switchTab({
				 		url:'../Home/Home'
				 	})
				 },1000)
			 }else{
				 uni.showToast({
				 	title:'用户名或密码错误!'
				 })
			 }
			},
			
			
		}
	}
</script>

<style>
.mt{margin-top: 160rpx;width: 160rpx;height: 150rpx;}
.loginlogo{width: 100%;height: 360rpx;}
.col{width: 100rpx;height: 100rpx;}
</style>
