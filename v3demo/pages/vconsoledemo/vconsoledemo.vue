<template>
	<view :log="log" :change:log="vconsole2.log">
		<text>VConsole Demo Page</text>
		<button @click="onClickOutputLogButton">输出日志</button>
	</view>
</template>

<script setup>
import {ref} from 'vue';

const log = ref({
	logAt: 0,
	message: "",
});

const mylog = (message) => {
	try { throw Error('') }
	catch(e) {
		log.value = {
			logAt: new Date().getTime(),
			message: message,
			rtLine: e.stack,
		};
	}
}

const onClickOutputLogButton = () => {
	console.log('onClickOutputLogButton 输出日志'); // 逻辑层的 console.log 不能被渲染层 vconsole 接收到。
	
	mylog("aaaaa");
};
</script>

<script module="vconsole2" lang="renderjs">
	import VConsole from 'vconsole';
	
	export default {
		data: () => ({
			
		}),
		methods: {
			log(newValue, oldValue, ownerInstance, instance) {
				console.log('vconsole2', newValue, oldValue);
			},
		},
		mounted() {
			console.log('vconsole wrap page mounted.');
			const vConsole = new VConsole();
			console.log('vconsole wrap page new.');
		}
	}
	
</script>

<style>

</style>
