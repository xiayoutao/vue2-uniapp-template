<template>
	<div
		class="app-layout"
		:class="{ hasBar: tabbarVisible }"
		:style="{ paddingTop: `${headerVisible ? headerHeight : 0}px` }"
	>
		<slot name="bg"></slot>
		<slot name="header"></slot>
		<scroll-view
			class="app-page"
			:class="flexDirection"
			:show-scrollbar="false"
			:enable-flex="true"
			:scroll-y="!disabledScroll"
		>
			<slot></slot>
		</scroll-view>
		<slot name="tabbar" v-if="tabbarVisible"></slot>
		<div class="bottom-placeholder" v-else></div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
	props: {
		flexDirection: {
			type: String,
			default: 'column',
		},
	},
	data() {
		return {};
	},
	computed: {
		...mapGetters(['headerHeight', 'disabledScroll']),
		headerVisible() {
			return !!this.$slots.header;
		},
		tabbarVisible() {
			return !!this.$slots.tabbar;
		},
	},
};
</script>

<style lang="scss" scoped>
:root {
	--bg-color: #fff;
}

.app-layout {
	@include flex-column();

	box-sizing: border-box;
	min-height: 100vh;
	background-color: --bg-color;

	&.hasBar {
		padding-bottom: calc(100px + constant(safe-area-inset-bottom));
		padding-bottom: calc(100px + env(safe-area-inset-bottom));
	}

	.app-page {
		flex: 1;
		box-sizing: border-box;

		&.column {
			@include flex-column();
		}

		&.row {
			@include flex-row();
		}

		&.wrap {
			@include flex-wrap();
		}
	}

	.bottom-placeholder {
		height: calc(20px + constant(safe-area-inset-bottom));
		height: calc(20px + env(safe-area-inset-bottom));
	}
}
</style>
