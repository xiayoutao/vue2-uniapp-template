<template>
	<div class="sld-popup" v-if="show">
		<div class="popup-mark" @click="handleClose"></div>
		<div class="popup-inner" :style="{ width }">
			<div class="popup-body" :class="{ round }">
				<slot></slot>
			</div>
			<div class="popup-close" @click="handleClose"></div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		show: Boolean,
		width: String,
		round: Boolean,
	},
	methods: {
		handleClose() {
			this.$emit('update:show', false);
			this.$emit('close');
		},
	},
	watch: {
		show(val) {
			if (!val) {
				this.$emit('update:show', false);
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.sld-popup {
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: 2000;

	.popup-mark {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 50%);
	}

	.popup-inner {
		position: absolute;
		top: 50%;
		left: 50%;
		z-index: 2001;
		transform: translate(-50%, -50%);

		.popup-body {
			max-height: 80vh;
			overflow: hidden;
			background-color: #fff;

			&.round {
				border-radius: 16px;
			}
		}
	}
}
</style>
