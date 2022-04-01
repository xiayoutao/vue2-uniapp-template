import Toast from '@wxcps/vant/toast/toast';
import { isObject } from '@/tools/utils';
import {
	pages,
	tabbarPages,
} from '@/constants/pages';

export default {
	data() {
		return {};
	},
	onShow() {
		this.hideTabBar();
	},
	onHide() {
		this.hideTabBar();
	},
	onUnload() {
		this.hideTabBar();
	},
	methods: {
		// 轻提示
		showToast(params) {
			if (typeof params === 'string') {
				Toast({
					type: 'text',
					message: params,
					duration: 1500,
					zIndex: 3001,
				});
			} else if (isObject(params)) {
				Toast({
					type: params.type,
					message: params.message,
					duration:
						!params.duration &&
						params.duration !== 0
							? 1500
							: 0,
					onClose: () => {
						console.log('执行OnClose函数');
					},
					zIndex: 3001,
				});
			}
		},
		navigateTo(data) {
			const params = {
				...data,
				url: data.url,
				success:
					typeof data.success === 'function'
						? data.success
						: function () {},
				fail:
					typeof data.fail === 'function'
						? data.fail
						: function () {},
				complate:
					typeof data.complate === 'function'
						? data.complate
						: console.log,
			};
			if (
				tabbarPages
					.map((item) => `/${item}`)
					.includes(data.url)
			) {
				uni.switchTab(params);
			} else {
				uni.navigateTo(params);
			}
		},
		// 获取页面路径
		getPagePath(key) {
			if (pages[key]) {
				return '/' + pages[key];
			}
			return '/pages/index/index';
		},
		async hideTabBar() {
			await this.sleep(100);
			uni.hideTabBar();
		},
	},
};
