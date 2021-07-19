<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "./common/uni.css";
	/* 动画库 */
	@import "./common/animate.css";
	
	@import url("/components/iconfont/iconfont.css");
	
	@import url("/common/common.scss");
	
	@import "./common/free.css";
</style>
