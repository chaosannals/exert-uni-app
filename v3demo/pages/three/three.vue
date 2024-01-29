<template>
	<!-- :<name>传参 :change:info="通知变更，固定格式" -->
	<!-- 这种传参的形式很怪异，事件和属性挂在随便一个不相干的元素上 -->
	<view :info="info" :change:info="three3d.render3d">
		<view @tap="three3d.callFor3d">点击</view>
	</view>
</template>

<script setup>
	import {onMounted, reactive, ref} from 'vue';
	
	const info = reactive({
		width: 0,
		height: 0,
	});
	
	onMounted(() => {
		uni.getSystemInfo({
			success: function(res) {
				info.width = res.windowWidth
				info.height = res.windowHeight;
				console.log('start', info);
			}
		});
	});
	
	// vue3 下面 renderjs 无法通过 ownerInstance.callMethod 调用到
	// vue2 通过 methods 就可以。
	const forThree3d = (data) => {
		console.log('da', data);
	}
	defineExpose({
		forThree3d,
	});
</script>

<script>
	
</script>

<script module="three3d" lang="renderjs">
	// renderjs 只支持 vue2 语法
	import * as THREE from 'three';
	
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			// 参数固定形式
			render3d(newValue, oldValue, ownerInstance, instance) {
				console.log('start', newValue, oldValue);
				
				const width = newValue.width;
				const height = newValue.height;
				
				// init
				const camera = new THREE.PerspectiveCamera( 70, width / height, 0.01, 10 );
				camera.position.z = 1;
				
				const scene = new THREE.Scene();
				
				const geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
				const material = new THREE.MeshNormalMaterial();
				
				const mesh = new THREE.Mesh( geometry, material );
				scene.add( mesh );
				console.log('add mesh');
				
				const renderer = new THREE.WebGLRenderer( { antialias: true } );
				console.log('render');
				renderer.setSize( width, height );
				renderer.setAnimationLoop( ( time ) => {
					// console.log('nnn')
					mesh.rotation.x = time / 2000;
					mesh.rotation.y = time / 1000;
					renderer.render( scene, camera );
				});
				renderer.domElement.style.position = 'absolute';
				renderer.domElement.style.top = '0';
				// renderer.domElement.style.zIndex = '100';
				renderer.domElement.style.left = '0';
				document.body.appendChild( renderer.domElement );
			},
			callFor3d(event, ownerInstance) {
				const r = ownerInstance.callMethod('forThree3d', { content: 'test' });
				console.log('aaa', r);
			}
		},
		created() {
			//
		}
	};
</script>

<style>

</style>
