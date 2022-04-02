<template>
	<div
		class="header"
		:class="{ 'has-border': border, animation }"
		:style="{ zIndex, height: `${navBarHeight}px`, background, color }"
	>
		<div class="header-nav" @tap="handleTap">
			<div
				class="left-icon"
				:class="leftType"
				@click.stop="goBackHome()"
				v-if="['home', 'home-white'].includes(leftType)"
			></div>
			<div
				class="left-icon"
				:class="leftType"
				@click.stop="handleBack()"
				v-else-if="['back', 'back-white'].includes(leftType)"
			></div>
			<div class="left-icon" v-else></div>
			<div class="title" :style="{ fontSize }" v-if="title">
				{{ title | filterStringLen }}
			</div>
			<div class="slot" v-else>
				<slot></slot>
			</div>
			<div class="right-icon"></div>
		</div>
	</div>
</template>

<script>
import { mapMutations } from 'vuex';
import { getStringByLen } from '@/tools/utils';

export default {
	props: {
		zIndex: {
			type: Number,
			default: 100,
		},
		background: String,
		border: Boolean,
		leftType: String, // 左侧图表类型
		title: String,
		fontSize: String,
		color: String,
		animation: Boolean,
	},
	filters: {
		filterStringLen(data) {
			return getStringByLen(data, 6, '');
		},
	},
	data() {
		return {
			lastTapTime: 0,
			touchStartTime: 0,
			touchEndTime: 0,
			navBarHeight: 0,
		};
	},
	computed: {
		systemInfo() {
			return uni.getSystemInfoSync();
		},
		statusBarHeight() {
			return this.systemInfo.statusBarHeight;
		},
	},
	created() {
		const menuButtonInfo = wx.getMenuButtonBoundingClientRect();
		this.navBarHeight =
			(menuButtonInfo.top - this.statusBarHeight) * 2 +
			menuButtonInfo.height +
			this.statusBarHeight;
		this.setHeaderHeight(this.navBarHeight);
		this.$emit('bar-height', this.navBarHeight); // 输出头部高度
	},
	methods: {
		...mapMutations(['setHeaderHeight']),
		handleBack() {
			let pageArr = getCurrentPages();
			if (pageArr.length === 1) {
				// 没有上一页
				uni.reLaunch({
					url: '/pages/index/index',
				});
			} else {
				uni.navigateBack({
					delta: 1,
				});
			}
		},
		goBackHome() {
			uni.reLaunch({
				url: '/pages/index/index',
			});
		},
		handleTap(event) {
			const curTapTime = event.timeStamp;
			if (curTapTime - this.lastTapTime < 300) {
				console.log('双击');
				this.$emit('dbclick');
			}
			this.lastTapTime = curTapTime;
		},
	},
};
</script>

<style lang="scss" scoped>
.header {
	@include flex-column('', flex-end);

	position: fixed;
	top: 0;
	left: 0;
	box-sizing: border-box;
	width: 100%;
	padding-top: var(88px + --status-bar-height);
	background-color: #fff;

	&.animation {
		transition: all 0.5s;
	}

	&.has-border {
		box-shadow: 0 2px 0 0 rgba(229, 229, 229, 50%);
	}

	.header-nav {
		@include flex-row(center);

		position: relative;
		box-sizing: border-box;
		width: 100%;
		height: 88px;
		padding: 0 32px;

		.left-icon {
			width: 44px;
			height: 44px;
			background-repeat: no-repeat;
			background-position: center;
			background-size: 100%;

			&.back {
				background-image: url('#{$baseBg}/back.png?v=#{$version}');
			}

			&.back-white {
				background-image: url('#{$baseBg}/back-white.png?v=#{$version}');
			}

			&.home {
				background-image: url('#{$baseBg}/home.png?v=#{$version}');
			}

			&.home-white {
				background-image: url('#{$baseBg}/home-white.png?v=#{$version}');
			}
		}

		.right-icon {
			width: 44px;
			height: 44px;
		}

		.title {
			@include flex-row(center, center);

			flex: 1;
			height: 100%;
			padding: 0 32px;
			font-weight: 500;
			font-size: 30px;
			font-family: PingFangSC-Medium;
		}

		.slot {
			@include flex-row(center, center);

			flex: 1;
			height: 100%;
		}
	}
}
</style>
