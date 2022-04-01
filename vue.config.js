const StyleLintPlugin = require('stylelint-webpack-plugin');
const InstallPlugin = require('./webpack/install-webpack-plugin');
const path = require('path');
const resolve = dir => path.join(__dirname, dir);

module.exports = {
  transpileDependencies: [],
	configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src'),
        '@cps': resolve('src/components'),
        '@wxcps': resolve('src/wxcomponents'),
      }
    },
		plugins: [
			new StyleLintPlugin({
				files: ['**/*.{vue,htm,html,css,sss,less,scss,sass}'],
				fix: true,
				failOnError: false,
			}),
			new InstallPlugin({
				generate: {
					autoBuildNpm: 'npm',
				},
				package: {},
			}),
		]
	},
  chainWebpack: (config) => {
		// 发行或运行时启用了压缩时会生效
		config.optimization.minimizer('terser').tap((args) => {
			const compress = args[0].terserOptions.compress;
			compress.pure_funcs = [
				'__f__', // App 平台 vue 移除日志代码
			];
			return args;
		});
	}
};
