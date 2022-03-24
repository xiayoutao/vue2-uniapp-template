module.exports = {
	extends: ['stylelint-config-standard', 'stylelint-config-rational-order'],
	plugins: ['stylelint-order', 'stylelint-declaration-block-no-ignored-properties'],
	overrides: [
		// 扫描.vue/html文件中的<style>标签内的样式
		{
			files: ['**/*.{vue,html}'],
			customSyntax: 'postcss-html'
		}
	],
	rules: {
		"unit-no-unknown": [
      true,
      {
        "ignoreUnits": "/rpx/"
      }
    ],
		"indentation": 'tab',
		'declaration-colon-space-after': 'always-single-line',
		'declaration-colon-space-before': 'never',
		'declaration-block-trailing-semicolon': null,
		'declaration-block-no-redundant-longhand-properties': false,
		'max-empty-lines': true,
		'no-empty-source': false,
		'no-invalid-double-slash-comments': false,
		'selector-class-pattern': true,
		'function-no-unknown': false,
		'custom-property-no-missing-var-function': false,
		// "unit-whitelist": ["em", "rem", "%", 's', 'px', 'pt', 'rpx', 'vw', 'vh', 'deg', 'upx'],
		'rule-empty-line-before': [
			'always',
			{
				ignore: ['after-comment', 'first-nested']
			}
		],
		'at-rule-no-unknown': [
			true,
			{
				ignoreAtRules: ['mixin', 'include', 'extend', 'if', 'else']
			}
		],
		'font-family-no-missing-generic-family-keyword': false,
		'plugin/declaration-block-no-ignored-properties': false,
		'plugin/rational-order': [
			true,
			{
				'border-in-box-model': false,
				'empty-line-between-groups': false
			}
		],
		'order/order': [
			'custom-properties',
			'declarations',
		],
	}
}