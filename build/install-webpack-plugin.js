const path = require('path');
const execa = require('execa');
const chalk = require('chalk');
const fs = require('fs');

const weixinPath = 'mp-weixin';

const isMiniprogram = process.env.UNI_PLATFORM === 'mp-weixin'; // 是否为微信小程序

const format = (label, msg) => {
	return (
		msg
			.split('\n')
			.map((line, i) => {
				return i === 0
					? `${label} ${line}`
					: line.padStart(stripAnsi(label).length);
			})
			.join('\n') + '\n'
	);
};

/**
 * 判断文件是否存在
 */
 function isFileExisted(filePath) {
	try {
		fs.accessSync(filePath);
		return true;
	} catch (err) {
		return false;
	}
}

/**
 * 添加文件
 */
function addFile(compilation, filename, content) {
	compilation.assets[filename] = {
		source: () => content,
		size: () => Buffer.from(content).length,
	};
}

const PluginName = 'InstallPlugin';

class InstallPlugin {
	constructor(options) {
		this.options = options;
	}

	apply(compiler) {
		const options = this.options;
		const generateConfig = options.generate || {};
		const packageConfig = options.package || {};
		const dependencies = Object.keys(packageConfig); // 依赖包列表

		// 在emit阶段插入钩子函数
		compiler.hooks.emit.tapAsync(PluginName, (compilation, callback) => {
			if (!isMiniprogram) return callback();
			if (dependencies.length === 0) {
				console.log(
					format(chalk.bgBlue.black(' INFO '), 'no dependencies found'),
				);
				return callback();
			}

			// package.json 覆盖模式
			const packageConfigJson = { dependencies: packageConfig };
			const packageConfigJsonContent = JSON.stringify(
				packageConfigJson,
				null,
				'\t',
			);
			addFile(compilation, './package.json', packageConfigJsonContent);
			callback();
		});

		let hasBuiltNpm = false;
		compiler.hooks.done.tapAsync(PluginName, (stats, callback) => {
			if (stats.compilation.errors.length > 0) return callback();
			if (!isMiniprogram) return callback();

			if (dependencies.length === 0) {
				console.log(
					format(chalk.bgBlue.black(' INFO '), 'no dependencies found'),
				);
				return callback();
			}

			const distDir = path.dirname(stats.compilation.outputOptions.path);
			const autoBuildNpm = generateConfig.autoBuildNpm || false; // 处理自动安装依赖
			let notInstallPackage = [...dependencies];
			for (let i = 0, len = dependencies.length; i < len; i++) {
				const isExisted = isFileExisted(
					path.resolve(
						distDir,
						`./${weixinPath}/node_modules/${dependencies[i]}/package.json`,
					),
				);
				if (isExisted) {
					const index = notInstallPackage.indexOf(dependencies[i]);
					notInstallPackage.splice(index, 1);
				}
			}
			if (notInstallPackage.length === 0) {
				hasBuiltNpm = true;
			}

			if (hasBuiltNpm || !autoBuildNpm) {
				if (hasBuiltNpm) {
					console.log(
						format(chalk.bgBlue.black(' INFO '), 'dependencies has been built'),
					);
				}
				return callback();
			}
			console.log(
				format(chalk.bgBlue.black(' INFO '), 'start building dependencies...'),
			);

			const command = autoBuildNpm === 'yarn' ? 'yarn' : 'npm';
			execa(command, ['install', '--production'], {
				cwd: path.resolve(distDir, weixinPath),
			})
				.then(({ exitCode }) => {
					if (!exitCode) {
						console.log(
							'\n' +
								format(
									chalk.bgGreen.black(' DONE '),
									`built dependencies ${chalk.green('successfully')}`,
								),
						);
						callback();
					} else {
						console.log(
							'\n' +
								format(
									chalk.bgRed.black('DONE '),
									`built dependencies ${chalk.red(
										'failed',
									)}, please enter ${chalk.yellow(
										distDir,
									)} and run install manually`,
								),
						);
						callback();
					}
				})
				.catch(() => {
					console.log(
						'\n' +
							format(
								chalk.bgRed.black(' DONE '),
								`built dependencies ${chalk.red(
									'failed',
								)}, please enter ${chalk.yellow(
									distDir,
								)} and run install manually`,
							),
					);
					callback();
				});
		});
	}
}

module.exports = InstallPlugin;
