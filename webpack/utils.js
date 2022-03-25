const path = require('path');
const fs = require('fs');

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

module.exports = {
	isFileExisted,
	addFile,
};
