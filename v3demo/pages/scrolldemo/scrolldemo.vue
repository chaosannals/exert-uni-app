<template>
	<view style="width: 100%; height: 100%;border: 1px solid red;">
		<button style="position: fixed; right: 20px; bottom: 30px; z-index: 100;" @click="onClick">按钮</button>
		<scroll-view scroll-y style="height: 100%" :scroll-top="top" enable-back-to-top @scroll="onScroll">
			<view style="width: 100%; height: 200px; background-color: aqua; border: 1px solid black;"></view>
			<view style="width: 100%; height: 200px; background-color: aqua; border: 1px solid black;"></view>
			<view style="width: 100%; height: 200px; background-color: aqua; border: 1px solid black;"></view>
			<view style="width: 100%; height: 200px; background-color: aqua; border: 1px solid black;"></view>
			<view style="width: 100%; height: 200px; background-color: aqua; border: 1px solid black;"></view>
			<view style="width: 100%; height: 200px; background-color: aqua; border: 1px solid black;"></view>
			<view style="width: 100%; height: 200px; background-color: aqua; border: 1px solid black;"></view>
			<view style="width: 100%; height: 200px; background-color: aqua; border: 1px solid black;"></view>
			<view style="width: 100%; height: 200px; background-color: aqua; border: 1px solid black;"></view>
			<view style="width: 100%; height: 200px; background-color: aqua; border: 1px solid black;"></view>
			<view style="width: 100%; height: 200px; background-color: aqua; border: 1px solid black;"></view>
			<view style="width: 100%; height: 200px; background-color: aqua; border: 1px solid black;"></view>
			<view style="width: 100%; height: 200px; background-color: aqua; border: 1px solid black;"></view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				top: 0,
				nowTop: 0,
				left: 0,
			}
		},
		methods: {
			onScroll(e) {
				this.nowTop = e.detail.scrollTop
				console.log('scroll', e);
			},
			onClick() {
				// 修改 top 时必须和当前滚动状态一致才会起效。
				this.top = this.nowTop;
				this.$nextTick(() => {
					this.top = 0;
				});
				console.log('top', this.top);
			}
		}
	}
</script>

<style>

</style>
