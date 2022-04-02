<template>
	<div class="tabbar-wrapper">
		<div class="tabbar-inner">
			<template v-for="(item, index) in tabbars">
				<navigator
					class="tabbar-cell"
					hover-class="none"
					open-type="switchTab"
					:url="item.pagePath"
					:key="index"
					v-if="item.visible"
				>
					<image
						class="icon"
						:src="item.selected ? item.selectedIconPath : item.iconPath"
						:style="{
							backgroundImage: `url(${
								item.selected ? item.selectedIconPath : item.iconPath
							})`,
						}"
					/>
					<div
						class="label"
						:style="{ color: item.selected ? selectedColor : color }"
					>
						{{ item.text }}
					</div>
				</navigator>
			</template>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		current: {
			type: String,
			default: 'index',
		},
	},
	data() {
		return {
			color: '#AAAFB6',
			selectedColor: '#1A68FF',
		};
	},
	computed: {
		tabbars() {
			return [
				{
					text: '首页',
					pagePath: '/pages/index/index',
					iconPath: '/static/img/home.png',
					selectedIconPath: '/static/img/home-active.png',
					selected: this.current === 'index',
					visible: true,
				},
				{
					text: '我的',
					pagePath: '/pages/my/index',
					iconPath: '/static/img/my.png',
					selectedIconPath: '/static/img/my-active.png',
					selected: this.current === 'my',
					visible: true,
				},
			];
		},
	},
};
</script>

<style scoped lang="scss">
.tabbar-wrapper {
	position: fixed;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: 99;
	box-sizing: border-box;
	height: calc(100px + constant(safe-area-inset-bottom));
	height: calc(100px + env(safe-area-inset-bottom));
	padding-bottom: calc(constant(safe-area-inset-bottom));
	padding-bottom: calc(env(safe-area-inset-bottom));
	background-color: #fff;
	box-shadow: 0 -2px 0 0 rgba(229, 229, 229, 20%);

	.tabbar-inner {
		@include flex-row();

		box-sizing: border-box;
		width: 100%;
		height: 100%;

		.tabbar-cell {
			@include flex-column(center, center);

			position: relative;
			flex: 1;
			height: 100%;

			.icon {
				width: 48px;
				height: 48px;
				margin-bottom: 4px;
				background-repeat: no-repeat;
				background-position: center;
				background-size: 100%;
			}

			.label {
				color: #4ba596;
				font-weight: 500;
				font-size: 20px;
				font-family: PingFangSC-Medium;
				line-height: 1.4;
			}
		}
	}
}
</style>
