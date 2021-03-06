module.exports = {
	extends: [
		'stylelint-config-prettier',
		'stylelint-config-standard',
		'stylelint-config-rational-order',
		'stylelint-prettier/recommended'
	],
	plugins: [
		'stylelint-prettier',
		'stylelint-scss',
		'stylelint-order',
	],
	ignoreFiles: ['**/*.js', '**/*.md'],
	customSyntax: "postcss-scss",
	overrides: [
		// 扫描.vue/html文件中的<style>标签内的样式
		{
			files: ['**/*.{vue,html}'],
			customSyntax: 'postcss-html'
		},
		{
			files: ['**/*.{scss}'],
			customSyntax: 'postcss-scss'
		}
	],
	rules: {
		"indentation": 'tab',
		"unit-no-unknown": [
      true,
      {
        "ignoreUnits": "/rpx/"
      }
    ],
		"unit-no-unknown": null,
		'no-empty-source': null,
		'max-empty-lines': 1,
		'number-max-precision': 4, // css属性值中小数点之后数字的最大位数
		'string-quotes': 'single',
		"color-function-notation": "legacy", // 很重要
		'no-invalid-double-slash-comments': null,
		'selector-class-pattern': null,
		'font-family-no-missing-generic-family-keyword': null,
		'max-empty-lines': true,
		'no-empty-source': false,
		'no-invalid-double-slash-comments': false,
		'selector-class-pattern': true,
		'function-no-unknown': false,
		'custom-property-no-missing-var-function': null,
		'declaration-colon-space-after': 'always-single-line',
		'declaration-colon-space-before': 'never',
		'declaration-block-trailing-semicolon': null,
		'declaration-block-no-redundant-longhand-properties': null,
		'rule-empty-line-before': [
			'always',
			{
				ignore: ['after-comment', 'first-nested']
			}
		],
		'at-rule-no-unknown': [
			true,
			{
				ignoreAtRules: ['function', 'mixin', 'include', 'extend', 'each', 'if', 'else']
			}
		],
		"scss/at-rule-no-unknown": false,
		'order/order': [
      'at-rules', // 规则
      'declarations', // 声明
      'custom-properties', // 自定义属性
      'dollar-variables', // 变量
      'rules', // 规则
    ],
		'plugin/rational-order': [
			true,
			{
				'border-in-box-model': true,
				'empty-line-between-groups': false
			}
		],
	}
}