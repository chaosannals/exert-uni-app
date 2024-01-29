<template>
	<view class="container">
		
		<view class="intro" @click="onClick">renderjs</view>
		<text class="intro">详见：</text>
		<uni-link :href="href" :text="href"></uni-link>
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
