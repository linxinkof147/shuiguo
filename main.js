import Vue from 'vue'
import App from './App'
/* vuex */
import store from './store'

/* 封装在npm上 上传 ----------------------------------------*/
import { $http } from '@escook/request-miniprogram'
uni.$http = $http
$http.baseUrl = 'http://117.175.58.188:9005/api-test/'
// 请求开始之前做一些事情
$http.beforeRequest = function (options) {
  uni.showLoading({
    title: '数据加载中...'
  })
 /* header的自定义 */
  if (options.url.indexOf('/api-test/') !== -1) {
    options.header = {
      "account_token":uni.getStorageSync('token') || ''
    }
  }
}
// 请求完成之后做一些事情
$http.afterRequest = function () {
  uni.hideLoading()
}

/* 权限验证 ---------------------------------------------*/
Vue.prototype.navigateTo = (options)=>{
	/* 权限验证 */
	if(!store.state.LoginOrNot){
		uni.showToast({
			title:'请先登陆',
			icon:'none'
		})
		return uni.navigateTo({
			url:"/pages/login/login"
		})
	}
	uni.navigateTo(options)
}

Vue.config.productionTip = false
Vue.prototype.$store = store

App.mpType = 'app'

const app = new Vue({
   store,
   ...App
})
app.$mount()
