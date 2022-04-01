export default {
	// 分享
	onShareAppMessage(res) {
		console.log('分享参数', res);

		return {
			title: '小程序分享标题',
			path: '/pages/index/index',
		};
	},
};
