<template>
	<view class="container">
		<view class="intro" @click="onClick">renderjs</view>
		<text class="intro">详见：</text>
		<uni-link :href="href" :text="href"></uni-link>
		<view  @click="onClickTo('/pages/addinput/addinput')">addinput</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				href: 'https://uniapp.dcloud.io/component/README?id=uniui'
			}
		},
		methods: {
			onClick() {
				uni.navigateTo({
					url: '/pages/render/render'
				})
			},
			onClickTo(link) {
				console.log("to", link);
				uni.navigateTo({
					url: link
				})
			}
		}
	}
</script>

<style>
	.container {
		padding: 20px;
		font-size: 14px;
		line-height: 24px;
	}
</style>
