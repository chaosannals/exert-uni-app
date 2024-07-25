<template>
	<view :info="info" :change:info="addInputRjs.onAdd">
		<text>文本</text>
		<text>文本</text>
		<view id="aaaaa"></view>
		<text>文本</text>
		<text>文本</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: {},
			}
		},
		methods: {
			onRjsInput(v) {
				console.log('onRjsInput', v);
			}
		},
		onUnload() {
			console.log('onUnload');
		}
	}
</script>

<script module="addInputRjs" lang="renderjs">
	export default {
		data() {
			return {
				ownerInstance: null
			}
		},
		methods: {
			onAdd(newValue, oldValue, ownerInstance, instance) {
				this.ownerInstance = ownerInstance;
				console.log("onAdd");
			}
		},
		created() {
			console.log("created", document.body);
		},
		mounted() {
			const slot = document.querySelector('#aaaaa');
			console.log("mounted", slot);
			const input = document.createElement('input');
			input.addEventListener('keyup', (e) => {
				console.log('keyup', e.keyCode);
				this.ownerInstance.callMethod('onRjsInput', e.keyCode);
			});
			slot.appendChild(input);
		},
		beforeDestroy() {
			// 没有
			console.log("beforeDestroy", document.body);
		}
	}
</script>

<style>

</style>
