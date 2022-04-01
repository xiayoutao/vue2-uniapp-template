module.exports = {
	extends: ['stylelint-config-standard', 'stylelint-config-rational-order'],
	plugins: [
		'stylelint-prettier',
		'stylelint-scss'
	],
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
		'declaration-colon-space-after': 'always-single-line',
		'declaration-colon-space-before': 'never',
		'declaration-block-trailing-semicolon': null,
		'declaration-block-no-redundant-longhand-properties': null,
		'max-empty-lines': 1,
		'no-empty-source': null,
		'no-invalid-double-slash-comments': false,
		'selector-class-pattern': null,
		'function-no-unknown': null,
		'custom-property-no-missing-var-function': null,
		'font-family-no-missing-generic-family-keyword': null,
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
		"scss/at-rule-no-unknown": true,
		'plugin/rational-order': [
			true,
			{
				'border-in-box-model': true,
				'empty-line-between-groups': false
			}
		],
	}
}