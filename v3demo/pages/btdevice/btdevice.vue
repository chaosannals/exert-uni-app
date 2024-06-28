<template>
	<view>
		<button @click="onOpen">链接</button>
		<button @click="onClose">断开</button>
	</view>
</template>

<script>
	// UNIAPP 只有低功耗蓝牙，链接断开速度很慢。
	import { openBluetoothAdapter, closeBluetoothAdapter, getConnetedDevices, createBLEConnection, closeBLEConnection } from '../../utils/ble.js'
	export default {
		data() {
			return {
				devices: [],
				deviceId: "",
			}
		},
		methods: {
			async onOpen() {
				console.log('onOpen');
				try {
					const r = await createBLEConnection({deviceId: this.deviceId});
					console.log('open', r);
				} catch (error) {
					console.log('open error', error);
				}
				
			},
			async onClose() {
				console.log('onClose');
				try {
					const r = await closeBLEConnection({deviceId: this.deviceId });
					console.log('close', r);
				} catch (error) {
					console.log('close error', error);
				}
			}
		},
		mounted() {
			this.devices = getConnetedDevices();
			console.log('devices', this.devices);
			if (this.devices.length > 0) {
				this.deviceId = this.devices[0].deviceId;
				console.log('deviceId', this.deviceId);
			}
		},
		async created() {
			try {
				await openBluetoothAdapter();
			} catch (error) {
				console.log('created error:', error);
			}
		},
		async beforeDestroy() {
			try {
				await closeBluetoothAdapter();
			} catch (error) {
				console.log('beforeDestroy error:', error);
			}
		},
	}
</script>

<style>

</style>
