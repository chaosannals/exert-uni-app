<template>
	<view class="content">
		<image class="logo" src="/static/logo.png" @click="onClick('/pages/wsunipage/wsunipage')"></image>
		<image class="logo" src="/static/logo.png" @click="onClick('/pages/vconsoledemo/vconsoledemo')"></image>
		<image class="logo" src="/static/logo.png" @click="onClick('/pages/useandplus/useandplus')"></image>
		<image class="logo" src="/static/logo.png" @click="onClick('/pages/cantin/cantin')"></image>
		<image class="logo" src="/static/shelf_entry.png" @click="onClick('/pages/shelf/shelf')"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
		<image class="logo" src="/static/box_entry.png" @click="onClick('/pages/three/three')"></image>
		<image class="logo" src="/static/logo.png" @click="onClick('/pages/modelbld/modelbld')"></image>
		<image class="logo" src="/static/modelobj_entry.png" @click="onClick('/pages/modelobj/modelobj')"></image>
		<image class="logo" src="/static/logo.png" @click="onClick('/pages/overlaydemo/overlaydemo')"></image>
		<image class="logo" src="/static/logo.png" @click="onClick('/pages/scrolldemo/scrolldemo')"></image>
	</view>
</template>

<script setup>
	import dayjs from 'dayjs';
	import {ref} from 'vue';
	
	const title = ref(dayjs(new Date()).format('DD/MM/YYYY'));
	
	const onClick = (url) => {
		uni.navigateTo({
			url: url
		})
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
