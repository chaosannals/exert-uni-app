<template>
	<view ref="shelfView" id="shelfRoot" :info="info" :change:info="shelf.render3d" @mousedown="onMouseDown" @mouseup="onMouseUp">
		<view @click="shelf.callClickShelf">点击</view>
	</view>
</template>

<script>
	import fontData from '/static/helvetiker_regular.typeface.json';
	
	export default {
		data() {
			return {
				info: {
					width: 0,
					height: 0,
					x: 0,
					y: 0,
					fontData: fontData,
				},
			}
		},
		methods: {
			onClickShelf(data) {
				console.log('click shelf', data, this.$refs.shelfView);
				const query = uni.createSelectorQuery().select('#shelfRoot');
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
			},
			onMouseDown(event) {
				// 由于在 threejs 的 canvas 之下，所以不会触发。
				console.log('mousedown', event);
			},
			onMouseUp(event) {
				// 由于在 threejs 的 canvas 之下，所以不会触发。
				console.log('mouseup', event);
			}
		},
		created() {
			console.log('create', fontData);
		},
		mounted() {
			uni.createSelectorQuery()
				.select('#shelfRoot')
				.boundingClientRect(rect => {
					console.log('rect', rect);
					this.info.width = rect.width;
					this.info.height = rect.height;
				}).exec();
		}
	}
</script>

<script module="shelf" lang="renderjs">
	import * as THREE from 'three';
	import WebGL from 'three/addons/capabilities/WebGL.js';
	import { FontLoader } from 'three/addons/loaders/FontLoader.js';
	import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
	
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			// 参数固定形式
			render3d(newValue, oldValue, ownerInstance, instance) {
				console.log('render3d', newValue);
				
				if (!WebGL.isWebGLAvailable() ) {
					const warning = WebGL.getWebGLErrorMessage();
					document.body.appendChild( warning );
				}
				
				const scene = new THREE.Scene();
				const camera = new THREE.PerspectiveCamera(
					75, // 视野角度
					window.innerWidth / window.innerHeight, // 长宽比
					0.1, // 近截面
					1000 // 远截面
				);
				
				// 字体加载。
				const loader = new FontLoader();
				
				// renderjs 直接使用路径只在 web 下有效。 app 会找不到文件。
				// loader.load( '/static/helvetiker_regular.typeface.json', function ( font ) {
				// 	const geometry = new TextGeometry( 'Hello three.js!', {
				// 		font: font, // 字体
				// 		size: 4, // 大小
				// 		height: 0.05, // 挤出厚度
				// 		curveSegments: 2, // 曲线上点数量
				// 		bevelEnabled: true, // 斜角
				// 		bevelThickness: 1,  // 斜角深度
				// 		bevelSize: 0.8, // 斜角与原始轮廓距离
				// 		bevelSegments: 1, // 斜角分段数
				// 	} );
				// 	const material = new THREE.MeshBasicMaterial( { color: 0xFF0000 } );
				// 	const text = new THREE.Mesh( geometry, material );
				// 	text.position.x = 1;
				// 	text.position.y = 1;
				// 	text.position.z = 2;
				// 	scene.add( text );
				// 	console.log('add text');
				// } );
				
				const font = loader.parse(newValue.fontData);
				const geometry = new TextGeometry( 'Hello three.js!', {
					font: font, // 字体
					size: 4, // 大小
					height: 0.01, // 挤出厚度
					curveSegments: 2, // 曲线上点数量
					bevelEnabled: true, // 斜角
					bevelThickness: 1,  // 斜角深度
					bevelSize: 0.01, // 斜角与原始轮廓距离，粗细
					bevelSegments: 1, // 斜角分段数
				} );
				const material = new THREE.MeshBasicMaterial( { color: 0xFF0000 } );
				const text = new THREE.Mesh( geometry, material );
				text.position.x = 1;
				text.position.y = 1;
				text.position.z = 2;
				text.rotation.x = 1.57;
				scene.add( text );
				console.log('add text');
				
				const renderer = new THREE.WebGLRenderer();
				renderer.setSize( window.innerWidth, window.innerHeight );
				renderer.domElement.style.position = 'absolute';
				renderer.domElement.style.top = '0';
				// renderer.domElement.style.zIndex = '100';
				renderer.domElement.style.left = '0';
				const cameraInfo = {};
				renderer.domElement.addEventListener('mousedown', (event) => {
					// console.log('threejs mousedown', event);
					cameraInfo.x = event.clientX;
					cameraInfo.y = event.clientY;
					cameraInfo.able = true;
				}, false);
				renderer.domElement.addEventListener('touchstart', (event) => {
					cameraInfo.able = true;
					if (event.targetTouches.length == 1) {
						const touch = event.targetTouches[0];
						cameraInfo.x = touch.clientX;
						cameraInfo.y = touch.clientY;
					}
					if (event.targetTouches.length == 2) {
						const touch1 = event.targetTouches[0];
						const touch2 = event.targetTouches[1];
						cameraInfo.z = camera.position.z;
						cameraInfo.zD = Math.sqrt(Math.pow(touch1.clientX - touch2.clientX,2) + Math.pow(touch1.clientY - touch2.clientY, 2));
					}
				}, false);
				renderer.domElement.addEventListener('mousemove', (event) => {
					if (cameraInfo.able) {
						// console.log('threejs mousemove', event);
						camera.position.x -= (event.clientX - cameraInfo.x) / 100 * camera.position.z * 0.1;
						camera.position.y += (event.clientY - cameraInfo.y) / 100 * camera.position.z * 0.1;
						cameraInfo.x = event.clientX;
						cameraInfo.y = event.clientY;
					}
				}, false);
				renderer.domElement.addEventListener('touchmove', (event) => {
					if (!cameraInfo.able) {
						return;
					}
					if (event.targetTouches.length == 1) {
						const touch = event.targetTouches[0];
						camera.position.x -= (touch.clientX - cameraInfo.x) / 50 * camera.position.z * 0.1;
						camera.position.y += (touch.clientY - cameraInfo.y) / 50 * camera.position.z * 0.1;
						cameraInfo.x = touch.clientX;
						cameraInfo.y = touch.clientY;
					}
					if (event.targetTouches.length == 2) {
						const touch1 = event.targetTouches[0];
						const touch2 = event.targetTouches[1];
						const zD = Math.sqrt(Math.pow(touch1.clientX - touch2.clientX,2) + Math.pow(touch1.clientY - touch2.clientY, 2))
						camera.position.z = cameraInfo.z + (zD - cameraInfo.zD) * 0.1;
						console.log('z', cameraInfo.z, cameraInfo.zD);
					}
				}, false);
				renderer.domElement.addEventListener('mouseup', (event) => {
					// console.log('threejs mouseup', event);
					cameraInfo.able = false;
				}, false);
				renderer.domElement.addEventListener('touchend', (event) => {
					cameraInfo.able = false;
				}, false);
				renderer.domElement.addEventListener('mousewheel', (event) => {
					// console.log('threejs mousewheel', event);
					camera.position.z += event.wheelDeltaY / 100;
				}, false);
				
				document.body.appendChild( renderer.domElement );
				
				for (var j = 0; j < 20; ++j) {
					for (var i = 0; i < 20; ++i) {
						// const color = 0x00ff00 + i * 0x1 + j * 0x10;
						const color = 0x0000ff;
						const geometry = new THREE.BoxGeometry( 1, 0.5, 1 );
						const material = new THREE.MeshBasicMaterial( { color: color } );
						const cube = new THREE.Mesh( geometry, material );
						cube.position.x = i * 2;
						cube.position.y = j * 2;
						cube.position.z = 0;
						scene.add( cube );
					}
				}
				
				camera.position.z = 20;
				camera.position.x = 20;
				camera.position.y = -20;
				camera.rotation.x = 0.785; // Π/4 = 45°
				
				renderer.setAnimationLoop( ( time ) => {
					renderer.render( scene, camera );
				});
			},
			// 参数固定形式
			callClickShelf(event, ownerInstance) {
				// 这个只能找到 vue2 形式定义在 methods 的方法。
				ownerInstance.callMethod('onClickShelf', { content: 'test' });
			}
		},
	};
</script>

<style scoped>
#shelfRoot {
	width: 100%;
	height: 100%;
}
</style>
