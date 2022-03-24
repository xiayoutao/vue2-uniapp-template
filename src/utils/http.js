import { isURL } from '@/utils';
import log from '@/utils/log';

const baseURL = process.env.VUE_APP_BASE_URL;

const request = (options) => {
	let params = {};
	if (options.constructor !== Object) {
		params.url = options;
	} else {
		params = options;
	}
	// 请求头
	const header = params.header
		? params.header
		: {
				'Content-Type': 'application/json',
		  };
	const method = params.method || 'GET'; // 请求方式
	const url = isURL(params.url) ? params.url : baseURL + params.url;

	return new Promise((resolve, reject) => {
		uni.request({
			url: url,
			method,
			header: header,
			data: params.data,
			success: ({ data, statusCode }) => {
				if (statusCode === 200) {
					resolve(data);
				} else {
					reject(data);
				}
			},
			fail: (res) => {
				if (res.errMsg == 'request:fail timeout') {
					// 超时
				}
				reject(res);
			},
			complate: (res) => {
				log('请求接口', url);
				log('请求头', header);
				log('请求参数', params.data);
				log('响应数据', res);
			},
		});
	});
};

const post = (url, data, silent) => {
	return request({
		url,
		data,
		method: 'POST',
		silent,
	});
};

const get = (url, data, silent) => {
	return request({
		url,
		data,
		method: 'GET',
		silent,
	});
};

/**
 * 处理接口返回数据
 * 统一处理成功的逻辑（避免项目中到处都是res.errno === 0的判断）
 * 方法还有优化的空间（有时间再改）
 * @param {*} options
 */
const handle = (options) => {
	const successCode = 0; // 正确的code值（返回数据）
	options = Object.assign(
		{
			notHideLoading: true,
			successCode, // 成功返回回调状态
			errno: successCode, // 接口返回状态
			data: {}, // 请求接口回调数据
		},
		options,
	);
	if (!options.notHideLoading) {
		uni.hideLoading();
	}
	return new Promise((resolve, reject) => {
		if (options.errno === options.successCode) {
			resolve(options.data);
		} else {
			reject({
				errno: options.errno,
				errmsg: options.errmsg,
				data: options.data,
			});
		}
	});
};

// 过滤参数
export function filterParams(data, filterKeys = []) {
	let params = {};
	Object.keys(data).forEach((item) => {
		if (filterKeys.length === 0 || !filterKeys.includes(item)) {
			params[item] = data[item];
		}
	});
	return params;
}

const http = {
	request,
	post,
	get,
	handle,
	filterParams,
};

module.exports = http; // require引入
export default http; // import导入
