<template>
	<view ref="rootView">
		
	</view>
</template>

<script setup>
	// 直接引入 three.js ，只能 web 。
	
	import {onMounted, ref} from 'vue';
	import * as THREE from 'three';
	
	const rootView = ref();
	
	onMounted(() => {
		uni.getSystemInfo({
			success: function(res) {
				const width = res.windowWidth
				const height = res.windowHeight;
				console.log('start', width, height);
				
				// init
				const camera = new THREE.PerspectiveCamera( 70, width / height, 0.01, 10 );
				camera.position.z = 1;
				
				const scene = new THREE.Scene();
				
				const geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
				const material = new THREE.MeshNormalMaterial();
				
				const mesh = new THREE.Mesh( geometry, material );
				scene.add( mesh );
				console.log('add mesh', rootView.value);
				
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
				// rootView.value.$el.appendChild( renderer.domElement );
				console.log('de', renderer.domElement);
			}
		});
	});
</script>

<style>

</style>
