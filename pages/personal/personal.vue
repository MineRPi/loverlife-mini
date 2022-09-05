<template>
	<view class="personal">
		<view class="header">
			<!-- 登陆状态 -->
			<template v-if="hasUserInfo">
				<image class="login" :src='userInfo.avatarUrl' mode=""></image>
				
			</template>
			<!-- 未登陆状态 -->
			<template v-else>
				<image class="nologin" src="/static/personal/nologin.png" mode=""  @click="getUser()"></image>
			</template>
		</view>
	</view>
</template>

<script>
	import request from '../../utils/request.js'
	export default {
		data() {
			return {
				userInfo:{},
				userCode:'',
				hasUserInfo: false,
			}
		},
		// 小程序的生命周期 vue生命周期  均支持
		onLoad: function() {
			// console.log(this.userInfo.avatarUrl),
			wx.checkSession({
			  success : res => {
			    //session_key 未过期，并且在本生命周期一直有效
				console.log("session未过期")
				wx.getStorage({
					key:"userInfo",
					success: res => {
						// console.log(a);
						this.userInfo = JSON.parse(res.data);
						// console.log(this.userInfo);
						this.hasUserInfo=true
					}
				})
				if(!this.hasUserInfo){
					this.showModal()
				}
			  },
			  fail : res => {
			    // session_key 已经失效，需要重新执行登录流程
				console.log("session已过期")
			    //重新登录
				this.showModal()
			  }
			})
			
		  // console.log(a)
		},
		methods: {
			showModal(){
				wx.showModal({
				  title: '温馨提醒',
				  content: '需授权以添加用户哦',
				  showCancel: false,
				  success:res => {
				    if (res.confirm) {
				      console.log('用户点击确定')
					  this.getUser()
				    } else if (res.cancel) {
				      console.log('用户点击取消')
				    }
				  }
				})
			},
			getUser(){
				// 推荐使用 wx.getUserProfile 获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
				// 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
				wx.getUserProfile({
					desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
					success: (res) => {
						console.log(res),
						//缓存用户信息
						wx.setStorage({
							key: "userInfo",
							data: JSON.stringify(res.userInfo)
						}),
						this.getOpenId(),
						this.hasUserInfo=true
						// wx.reLaunch({
						//     url: 'pages/personal/personal',
						// })
						
					}
				})
			},
			 reload() {
			        // 页面重载
			        const pages = getCurrentPages()
			        // 声明一个pages使用getCurrentPages方法
			        const curPage = pages[pages.length - 1]
			        // 声明一个当前页面
			        curPage.onLoad(curPage.options) // 传入参数
					console.log(curPage.options)
			        curPage.onShow()
			        curPage.onReady()
			        // 执行刷新
			    },
			getOpenId(){
				wx.login({
				  success:res => {
					// console.log(res.code)
					this.userCode = res.code;
					if (this.userCode) {
						//发起网络请求
						// console.log(this.userCode);
						const res = request('/onlogin',{code: this.userCode});
						console.log(res);
						if(res){
							this.reload()
						}
					} else {
						console.log('登录失败！' + res.errMsg)
					}
				  }
				})
			}
		}
	}
</script>

<style lang="stylus">
	.personal
		.header
			height 200rpx
			background #c6dfc8
			image
				height 100rpx
				width 100rpx
				vertical-align: middle
				// margin: 20rpx
				margin-left: 40rpx
</style>
