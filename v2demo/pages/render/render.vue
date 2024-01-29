<template>
	<view>
		<view>aaa</view>
	</view>
</template>

<script>
	console.log('render: js');
	
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		},
		onShow() {
			// uni.getSystemInfo({
			// 	success: function(res) {
			// 		const width = res.windowWidth;
			// 		const height = res.windowHeight;
			//		这里调用不到 render3d 里面的方法。
			// 		this.render3d(width, height);
			// 	},
			// });
		}
	}
</script>

<script module="render3d" lang="renderjs">
	console.log('render: renderjs');
	
	import * as THREE from 'three';
	
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			render3d(width, height) {
				console.log('start', width, height);
				
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
			}
		},
		created() {
			const width = window.innerWidth;
			const height = window.innerHeight;
			this.render3d(width, height);
		}
	};
</script>

<style>

</style>
