const app = getApp();

Page({
	data: {
		msg: 'hello Word'
	},
	onShow() {

	},
	onLoad() {

	},
	jump() {
		wx.navigateTo({
		  url: '/pages/index/index'
		})
	}
})