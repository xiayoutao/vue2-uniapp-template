// 延迟函数
export function sleep(time) {
	return new Promise((resolve) => setTimeout(resolve, time));
}

// 获取对象值
export function getObjectByKeyPath(obj, keys, defaultVal) {
	return (
		(!Array.isArray(keys)
			? keys.replace(/\[/g, '.').replace(/\]/g, '').split('.')
			: keys
		).reduce((o, k) => (o || {})[k], obj) || defaultVal
	);
}

// 格式化时间戳
export function formatTime(date) {
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate();

	var hour = date.getHours();
	var minute = date.getMinutes();
	var second = date.getSeconds();

	return (
		[year, month, day].map(formatNumber).join('-') +
		' ' +
		[hour, minute, second].map(formatNumber).join(':')
	);
}

/**
 * 格式时间戳
 * @param {Timestamp} timer 时间戳
 * @param {String} format 格式
 */
export function formatDate(timestamp, format) {
	timestamp = timestamp - 0;
	if (!timestamp || timestamp === '') return '';
	if (timestamp.toString().length === 10) {
		timestamp = timestamp * 1000;
	}
	format = format || 'yyyy/MM/dd hh:mm:ss';
	var time = new Date(timestamp);
	var o = {
		'M+': time.getMonth() + 1, // 月份
		'd+': time.getDate(), // 日
		'h+': time.getHours(), // 小时
		'm+': time.getMinutes(), // 分
		's+': time.getSeconds(), // 秒
		'q+': Math.floor((time.getMonth() + 3) / 3), // 季度
		S: time.getMilliseconds(), // 毫秒
	};
	format = format === null ? 'yyyy/MM/dd' : format;
	if (/(y+)/.test(format)) {
		format = format.replace(
			RegExp.$1,
			(time.getFullYear() + '').substr(4 - RegExp.$1.length),
		);
		for (var k in o) {
			if (new RegExp('(' + k + ')').test(format)) {
				format = format.replace(
					RegExp.$1,
					RegExp.$1.length === 1
						? o[k]
						: ('00' + o[k]).substr(('' + o[k]).length),
				);
			}
		}
	}
	return format;
}

// 截取字符串前几位，超出隐藏
export function getStringByLen(str, len, moreStr = '...') {
	if (!len) return str;
	return str.substring(0, len) + (str.length > len ? moreStr : '');
}

// 验证是否为手机号码
export function isValidPhone(str) {
	var myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
	if (!myreg.test(str)) {
		return false;
	} else {
		return true;
	}
}

// 是否网址
export function isURL(url) {
	return /(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(
		url,
	);
}

// 是否字符串
export const isString = (data) => {
	return Object.prototype.toString.call(data).slice(8, -1) === 'String';
};

// 是否数字
export const isNumber = (data) => {
	return (
		!isNaN(data) &&
		Object.prototype.toString.call(data).slice(8, -1) === 'Number'
	);
};

export const isObject = (data) => {
	return Object.prototype.toString.call(data).slice(8, -1) === 'Object';
};

export const isArray = (data) => {
	return Object.prototype.toString.call(data).slice(8, -1) === 'Array';
};

/**
 * 返回上一页
 */
export function goBack() {
	uni.navigateBack();
}

// 比对版本
export function compareVersion(v1, v2) {
	v1 = v1.split('.');
	v2 = v2.split('.');
	const len = Math.max(v1.length, v2.length);

	while (v1.length < len) {
		v1.push('0');
	}
	while (v2.length < len) {
		v2.push('0');
	}

	for (let i = 0; i < len; i++) {
		const num1 = parseInt(v1[i]);
		const num2 = parseInt(v2[i]);

		if (num1 > num2) {
			return 1;
		} else if (num1 < num2) {
			return -1;
		}
	}

	return 0;
}

// 微信登录
export function wxLogin() {
	return new Promise((resolve, reject) => {
		wx.login({
			success: (res) => {
				resolve(res.code);
			},
			fail: () => {
				resolve(null);
			},
		});
	});
}

// 扫码
export function scanCode(onlyFromCamera) {
	return new Promise((resolve, reject) => {
		uni.scanCode({
			onlyFromCamera,
			success: (res) => {
				resolve(res);
			},
			fail: () => {
				reject();
			},
		});
	});
}

// 获取元素
export function querySelector(selectors, query) {
	for (let i = 0, len = selectors.length; i < len; i++) {
		query.select(selectors[i]).boundingClientRect();
	}
	return new Promise((resovle, reject) => {
		query.exec((res) => {
			if (res.length > 0) {
				resovle(res);
			} else {
				reject();
			}
		});
	});
}

/**
 * 支付
 * @param {*} data
 */
export function requestPayment(data) {
	return new Promise((resolve, reject) => {
		uni.requestPayment({
			timeStamp: data.timeStamp,
			nonceStr: data.nonceStr,
			package: data.package,
			signType: data.signType,
			paySign: data.paySign,
			success: (res) => {
				resolve(res);
			},
			fail: async (res) => {
				reject(res);
			},
		});
	});
}
