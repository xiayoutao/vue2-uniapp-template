<script>
import { mapGetters } from 'vuex';
import AppPromise from '@/tools/app-promise';

export default {
	data() {
		return {
			disabledLogin: false,
		};
	},
	computed: {
		...mapGetters(['isAlreadyLogin']),
	},
	beforeCreate() {
		uni.hideTabBar();
		uni.hideLoading();
		/**************** 检查是否版本更新微小程序 ****************/
		const updateManager = uni.getUpdateManager();
		updateManager.onUpdateReady(() => {
			uni.showModal({
				title: '更新提示',
				content: '新版本已经准备好，是否重启应用？',
				success(res) {
					if (res.confirm) {
						// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
						updateManager.applyUpdate();
					}
				},
			});
		});
	},
	onLaunch(options) {
		console.log('App Launch', options);
		this.disabledLogin = [
			'pages/auth/login',
			'pages/auth/loginByPhone',
		].includes(options.path); // 登录页面不调用登录接口
	},
	onShow() {
		console.log('App Show');
		AppPromise.getInstance(async (resolve) => {
			try {
				if (!this.isAlreadyLogin && !this.disabledLogin) {
					// todo 登录
				}
				resolve();
			} catch (err) {
				resolve();
			}
		});
	},
	onHide() {
		console.log('App Hide');
	},
};
</script>

<style lang="scss">
</style>
