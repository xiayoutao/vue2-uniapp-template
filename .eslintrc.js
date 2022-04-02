module.exports = {
	root: true,
	env: {
		node: true,
		es6: true,
	},
	globals: {
    uni: 'readonly',
    wx: 'readonly',
    getApp: 'readonly',
		getCurrentPages: 'readonly',
  },
	plugins: ['vue', 'prettier'],
	extends: [
		'plugin:vue/essential',
		'eslint:recommended'
	],
	parser: 'vue-eslint-parser',
	parserOptions: {
		ecmaVersion: 6,
		sourceType: 'module',
		parser: '@babel/eslint-parser',
	},
	rules: {
		'prettier/prettier': 1,
		'semi': 1,
		'quotes': [1, 'single'],
		'no-empty': 0,
		'spaced-comment': 1, // 注释风格
		'keyword-spacing': 1, // 关键字后面空格
		'no-undef': 1, // 未定义的变量
		'no-multi-spaces': 1, // 不能用多余的空格
		'no-unused-vars': 1, // 不能有声明后未被使用的变量或参数
		'no-mixed-spaces-and-tabs': 0,
		'vue/multi-word-component-names': 0
	}
};
