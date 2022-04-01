/**
 *
 * @param {*} label 标题
 * @param {*} message 内容
 * @param {*} level 级别
 */
export default function log(label, message, level = 1) {
	const colors = ['#007aff', '#f1a532', '#dd524d', '#000'];
	const levelColor = colors[level - 1];
	console.log(
		`%c${label}%c${message}`,
		`color: #ffffff; background: ${levelColor}; padding: 3px 5px; border-radius: 3px 0 0 3px;`,
		`color: ${levelColor}; background: #ffffff; padding: 3px 5px; border-radius: 0 3px 3px 0;`,
	);
}
