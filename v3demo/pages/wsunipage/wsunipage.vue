<template>
	<view>
		
	</view>
</template>

<script setup>
	uni.onSocketOpen((res) => {
		console.log('socket open', res, JSON.stringify(res));
	});
	uni.onSocketError((res) => {
		console.log('socket error', res, JSON.stringify(res));
	});
	// 这个名字叫 AddSocketMessageListen 更合适，可以挂多个的。
	// 叫这名字太误导了。
	uni.onSocketMessage((res) => {
		console.log('socket message1', res, JSON.stringify(res));
	});
	uni.onSocketMessage((res) => {
		console.log('socket message2', res, JSON.stringify(res));
	});
	uni.onSocketMessage((res) => {
		console.log('socket message3', res, JSON.stringify(res));
	});
	uni.onSocketClose((res) => {
		console.log('socket close', res, JSON.stringify(res));
	});
	
	const connect = () => {
		const tickAt = new Date().getTime();
		console.log('connect at', tickAt);
		uni.connectSocket({
			"url": "ws://192.168.1.195:48080/ws",
			method: 'GET'
		});
	};
	
	const tick = () => {
		setTimeout(() => {
			const tickAt = new Date().getTime();
			console.log(`[${tickAt}] send`);
			uni.sendSocketMessage({
				data: `[${tickAt}] aaa`,
				success(r) {
					console.log(`[${tickAt}] send success`, r, JSON.stringify(r));
				},
				fail(r) {
					console.log(`[${tickAt}] send fail`, r, JSON.stringify(r));
					uni.closeSocket();
					connect();
				},
				complete(r) {
					console.log(`[${tickAt}] send complete`, r, JSON.stringify(r));
				},
			});
			tick();
		},4000);
	};
	tick();
</script>

<style>

</style>
