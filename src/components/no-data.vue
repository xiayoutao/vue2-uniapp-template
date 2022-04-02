<template>
	<div class="no-data" :style="{ background }">
		<span class="icon" :class="icon"></span>
		<span class="label" :style="{ fontSize: messageSize, color: messageColor }">
			{{ message }}
		</span>
	</div>
</template>

<script>
export default {
	props: {
		icon: String,
		message: {
			type: String,
			default: '暂无数据',
		},
		messageSize: String,
		messageColor: String,
		background: String,
	},
};
</script>

<style lang="scss" scoped>
.no-data {
	@include flex-column(center, center);

	position: relative;
	box-sizing: border-box;
	height: 500px;
	padding: 50px 0 32px;
	background-color: #fff;

	.icon {
		width: 240px;
		height: 228px;
		background: url('#{$baseBg}/no-data.png?v=#{$version}') no-repeat center;
		background-size: 100% 100%;
	}

	.label {
		margin: 20px 0 0;
		color: #999;
		font-size: 24px;
	}
}
</style>
