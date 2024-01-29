<template>
	<view ref="shelfView" id="aaa" :info="info" :change:info="shelf.render3d">
		<view @click="shelf.callClickShelf">点击</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: {
					width: 0,
					height: 0,
				},
			}
		},
		methods: {
			onClickShelf(data) {
				console.log('click shelf', data, this.$refs.shelfView);
				const query = uni.createSelectorQuery().select('#aaa');
				console.log('query', query);
				query.fields({  
                    size: true,
					dataset: true,
				}, data => {  
                   console.log('data', data);  
                }).exec();
				query.boundingClientRect(rect => {
					console.log('rect', rect);  
				}).exec();
			}
		},
		created() {
			console.log(this.$refs.shelfView);
		}
	}
</script>

<script module="shelf" lang="renderjs">
	import * as THREE from 'three';
	
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			// 参数固定形式
			render3d(newValue, oldValue, ownerInstance, instance) {
				
			},
			// 参数固定形式
			callClickShelf(event, ownerInstance) {
				// 这个只能找到 vue2 形式定义在 methods 的方法。
				ownerInstance.callMethod('onClickShelf', { content: 'test' });
			}
		},
	};
</script>

<style>

</style>
