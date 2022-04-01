import Vue from 'vue';
import App from './App';
import store from './store';
import globalMixin from '@/mixins/global';
import {
	sleep,
	isArray,
	isObject,
	isEmptyObject,
	getObjectByKeyPath,
	getPagePath,
} from '@/tools/utils';
import log from '@/tools/log';
import { StorageKey } from '@/constants';
import { pages } from '@/constants/pages';
import Layout from '@cps/layout.vue';
import HeaderNav from '@cps/header-nav.vue';
import Tabbar from '@cps/tabbar.vue';
import NoData from '@cps/no-data.vue';

Vue.mixin(globalMixin);

Vue.component('app-layout', Layout);
Vue.component('header-nav', HeaderNav);
Vue.component('tabbar', Tabbar);
Vue.component('no-data', NoData);

Vue.prototype.$token = uni.getStorageSync(StorageKey.token);
Vue.prototype.pages = pages; // 页面映射
Vue.prototype.sleep = sleep; // 延迟函数
Vue.prototype.isArray = isArray;
Vue.prototype.isObject = isObject;
Vue.prototype.isEmptyObject = isEmptyObject;
Vue.prototype.getObjectByKeyPath = getObjectByKeyPath;
Vue.prototype.getPagePath = getPagePath;
Vue.prototype.log = log;

Vue.prototype.$store = store;

Vue.config.productionTip = false;

App.mpType = 'app';

const NODE_ENV = process.env.NODE_ENV;

log('当前环境', `${NODE_ENV}`, NODE_ENV === 'production' ? 1 : 3);

// 监听网络状态变化
uni.onNetworkStatusChange((res) => {
	if (res.networkType !== 'none') return;
	uni.navigateTo({
		url: '/pages/common/noNetwork',
	});
});

new Vue({
	...App,
}).$mount();
