<script>
	export default {
		// onLaunch: function() {
		// 	console.log('App Launch')
		// },
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console. log('App Hide')
		},
		onLaunch: function() {
			console.log('onLaunch'),
			wx.checkSession({
			  success () {
			    //session_key 未过期，并且在本生命周期一直有效
				console.log("session未过期")
			  },
			  fail () {
			    // session_key 已经失效，需要重新执行登录流程
				console.log("session已过期")
			    //重新登录
				wx.setStorage({
					key: "hasUserInfo",
					data: false
				})
			  }
			})
			
		}
	}
</script>

<style>
	/*每个页面公共css */
	
	
</style>
