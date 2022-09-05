<template>
  <view class="container">
    <view class="indexcontent">
      <!-- 状态栏小程序撑起高度 -->
      <view :style="{height:statusBarHeight+'px'}" />
      <view class="header" :style="{height:navBarHeight+'px',width:windowWidth+'px'}">
        <view class="logo" :style="{height:0.748*navBarHeight+'px',width:navBarHeight+'px'}">
          <image class="logocontent" src="/static/loverlife_g.png" />
        </view>
        <view class="search">
          <view class="search_icon">
            <uni-icons type="search" size="17" color="#a7e67c" />
          </view>
          <input v-model="val" class="text" placeholder="回忆检索">
        </view>
      </view>
      <!-- 需要添加占位符高度  状态栏高度+导航栏高度（否则下面tab会塌陷）
			<view :style="{height: statusBarHeight+navBarHeight+'px'}"></view>-->
    </view>
    <view class="navScrolls">
      <scroll-view class="navScroll" scroll-x="true">
        <view class="navItem" :class="{active:navIndex===-1}" @click="changeIndex(-1)">全部</view>
        <view class="navItem" :class="{active:navIndex===index}" @click="changeIndex(index)" v-for="(item,index) in indexData" :key="item.id">{{item.name}}</view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
import request from '../../utils/request.js'
export default {
  data() {
    return {
      statusBarHeight: 20, /* 状态栏高度 */
      navBarHeight: 45, /* 导航栏高度 */
      windowWidth: 375, /* 窗口宽度 */
      /* 设定状态栏默认高度 */
      val: '',/*, 导航栏搜索框的值 */
	  indexData:{
		  0:{
			  name:"欢喜",
			  id:110
		  },
		  1:{
			  name:"难过",
			  id:111
		  },
		  2:{
			  name:"生气",
			  id:112
		  },
		  3:{
			  name:"甜蜜",
			  id:113
		  },
		  4:{
			  name:"我的",
			  id:114
		  },
		  5:{
			  name:"TA的",
			  id:115
		  },
		  6:{
			  name:"共享",
			  id:116
		  }
	  },
	  navIndex:-1,//导航标记，点谁谁高亮
    }
  },
  // 小程序的生命周期 vue生命周期  均支持
  onLoad() {
    console.log('onLoad')
  },
		
  created() {
    // 获取手机系统信息
    const info = uni.getSystemInfoSync()
    // 设置状态栏高度（H5顶部无状态栏小程序有状态栏需要撑起高度）
    this.statusBarHeight = info.statusBarHeight
    this.windowWidth = info.windowWidth
    // 除了h5 app mp-alipay的情况下执行
    // #ifndef H5 || APP-PLUS || MP-ALIPAY
    // 获取胶囊的位置
    const menuButtonInfo = uni.getMenuButtonBoundingClientRect()
    console.log(menuButtonInfo)
    // (胶囊底部高度 - 状态栏的高度) + (胶囊顶部高度 - 状态栏内的高度) = 导航栏的高度
    this.navBarHeight = (menuButtonInfo.bottom - info.statusBarHeight) + (menuButtonInfo.top - info.statusBarHeight)
    this.windowWidth = menuButtonInfo.left
    // #endif
			
    this.index=this.getIndexData()
  },
  methods: {
    // 获取滑块数据
    async getIndexData() {
		console.log('test')
		const res = await request('/index')
		console.log(res)
		return res
    },
	
	//点击切换导航下标
	changeIndex(index){
		this.navIndex = index
	}
  }
}
</script>

<style lang = 'stylus'>
	.container
		.indexcontent
			background #c6dfc8
			.header 
				display flex
				align-items center
				flex-direction row
				.logo
					display flex
					align-items center
					margin-left 10rpx
					margin-right 5rpx
					.logocontent
						width 100%
						height 100%
				.search
					display flex
					align-items center
					width 100%
					border 1rpx solid #8cc269
					border-radius 20px
					background #f9f9f9
					margin-right 5rpx
					margin-left 3rpx
					.search_icon
						margin-right 5rpx
						margin-left 10rpx
					input
						margin-left 3rpx
						font-size 14px
		.navScrolls
			.navScroll
				white-space nowrap
				.navItem
					display inline-block
					height: 35rpx
					padding: 10rpx
					font-size: 26rpx
					&.active
						border-bottom: 4rpx dashed #e3b4b8
						color: #e3b4b8
						font-size: 30rpx
</style>
