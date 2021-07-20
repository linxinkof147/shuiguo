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
					<input class="border-line padding-sm flex1" type="number" data-key="mobile" maxlength="11"  @input="inputChange" placeholder="请输入手机号" />
					<view v-if="0 == 1" class="padding-tb-sm ft-dark" @click="send_code">获取</view>
				</view>
			</view>
			<!-- 密码 -->
			<view class="w-full dflex padding-bottom-sm">
				<view class="iconfont iconmima margin-right"></view>
				<view class="flex1 dflex">
					<input class="border-line padding-sm flex1" type="password" data-key="password" maxlength="11" @input="inputChange" placeholder="请输入密码/请勿输入特殊字符" />
					<view v-if="0 == 1" class="padding-tb-sm ft-dark" @click="send_code">获取</view>
				</view>
			</view>
			<view class="w-full dflex padding-bottom-sm">
				<view class="iconfont iconmima margin-right"></view>
				<view class="flex1 dflex">
					<input class="border-line padding-sm flex1" type="password" v-model="passwordtwo" maxlength="11" @input="inputChange" placeholder="请确认密码/请勿输入特殊字符" />
					<view v-if="0 == 1" class="padding-tb-sm ft-dark" @click="send_code">获取</view>
					
				</view>
				
			</view>
			
			<!-- 登陆按钮 -->
			<view class="w-full margin-top-xl">
				<view class="dflex-b border-radius-lg">
					<view class="tac padding-tb-sm flex1 bg-base fs" :disabled="disabled"
		  @click="subimts">注册</view>
				</view>
			</view>
		</view>
		
		
		<!-- 微信授权 -->
		<view></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				/* 登陆 帐号密码*/
				mobile: '',
				/* 密码 */
				password: '',
				passwordtwo:'',
				pass:'',
				login:'',
				code: '',
				is_send:"",
				codetime:0,
			}
		},
		computed:{
			/* 账号验证 */
			disabled(){
				return this.pass == ""||this.login ==''
			},
			/* 手机验证 */
			disabledto(){
				return this.phone == ""||this.code ==''
			}
		},
		onLoad() {
			console.log(this.passwordtwo)
		},
		methods: {
			missko(){
				
			},
			inputChange(e) {
				const key = e.currentTarget.dataset.key;
				this[key] = e.detail.value;
				/* console.log(this[key]) */
				console.log(this.mobile)
				console.log(this.password)
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
				var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
				if(!mPattern.test(this.mobile)){
					uni.showToast({
						title:"请输入正确手机号",
						icon:'none'
					})
					return false
				} else if(!reg.test(this.password)){
					uni.showToast({
						title:"密码不包含特殊字符并6位以上",
						icon:'none'
					},1500)
					return false
				}
				return true
			},
			/* 提交 */
			subimts(){
				/* 表单验证 */
				if(!this.validate())return;
				/* 提交后端 */
				if(this.password == this.passwordtwo){
					this.regin()
				}else{
					uni.showToast({
						title:"两次密码不相同",
						icon:'none'
					})
				}
				
				/* 登录成功 */
			},
			sendCode(){
				if(this.codetime>0){
					return
					
				}
				if(!this.validate())return;
				this.codetime=60 
				let timer = setInterval(()=>{
					if(this.codetime>=1){
						this.codetime--
					} else {
						this.codetime = 0
						clearInterval(timer)
					}
				},1000)
			},
			async regin() {
			 const res  = await uni.$http.post('/register',{"customerName":this.mobile,"password": this.password})
			 console.log(res)
			 if(res.data.message){
					uni.showToast({
						title:'用户已经注册'
					})
			 }else{
				 uni.showToast({
				 	title:'注册成功'
				 })
				 if(this.password == this.passwordtwo){
					 setTimeout(()=>{
					 	uni.navigateTo({
					 		url:'../login/login'
					 	})
					 },1000)
				 }
				 
			 }
			},
			
		}
	}
</script>

<style>
.mt{margin-top: 160rpx;width: 160rpx;height: 150rpx;}
.loginlogo{width: 100%;height: 360rpx;}

</style>
