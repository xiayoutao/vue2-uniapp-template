import Vue from 'vue';
import App from './App';
import store from './store';
import { sleep } from '@/utils';
import log from '@/utils/log';

Vue.prototype.log = log;
Vue.prototype.sleep = sleep;

Vue.prototype.$store = store;

Vue.config.productionTip = false;

App.mpType = 'app';

const NODE_ENV = process.env.NODE_ENV;

log('当前环境', `${NODE_ENV}`, NODE_ENV === 'production' ? 1 : 3);

new Vue({
	...App,
}).$mount();
