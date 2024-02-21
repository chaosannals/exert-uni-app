<template>
	<view>
		<button id="popbntNull">按钮</button>
		<view>一些文本</view>
		<view>一些文本</view>
		<view id="popbnt" class="popbnt" @click="toggleShow">定位按钮</view>
		<text>一些文本</text>
		<view>一些文本</view>
		<text>一些文本</text>
		
		<view v-if="isShow" class="popbox" :style="{left: `${x}px`, top: `${y}px`}">定位</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				x: 0,
				y: 0,
				isShow: false,
			}
		},
		methods: {
			toggleShow() {
				this.isShow = !this.isShow;
				if (!this.isShow) {
					return;
				}
				
				// 这个自能拿到 view ，button 拿不到。
				const query = uni.createSelectorQuery()
				query.select("#popbnt")
				// query.select("#popbntNull")
					// .fields({
					// 	size: true,
					// 	dataset: true,
					// }, data => {  
					//    console.log('data', data);  
					// })
					.boundingClientRect((data) => {
						console.log(JSON.stringify(data));
						this.x = data.left + data.width / 2;
						this.y = data.top + data.height;
					})
					.exec();
			}
		}
	}
</script>

<style scoped>
.popbnt {
	text-align: center;
}

.popbox {
	display: flex;
	position: fixed;
	padding: 1em;
	border: 1px solid #ddd;
	background-color: white;
}
</style>
