<template>
	<view :info="info" :change:info="modelobj.render3d">
		
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				info: {
					width: 0,
					height: 0,
					platform: 'h5',
				},
			}
		},
		methods: {
			
		},
		onLoad() {
			uni.getSystemInfo({
				success: (res) => {
					this.info.width = res.screenWidth;
					this.info.height = res.screenHeight;
					this.info.platform = res.platform;
				}
			})
		}
	}
</script>

<script module="modelobj" lang="renderjs">
	import * as THREE from 'three';
	import WebGL from 'three/addons/capabilities/WebGL.js';
	import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
	import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';
	
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			// 参数固定形式
			async render3d(newValue, oldValue, ownerInstance, instance) {
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
				
				const renderer = new THREE.WebGLRenderer();
				renderer.setSize( window.innerWidth, window.innerHeight );
				renderer.domElement.style.position = 'absolute';
				renderer.domElement.style.top = '0';
				// renderer.domElement.style.zIndex = '100';
				renderer.domElement.style.left = '0';
				
				document.body.appendChild( renderer.domElement );
				
				// 导入模型
				console.log('load obj start.');
				const manager = new THREE.LoadingManager();
				
				// 不同平台路径不一致，获取转换的函数又是异步的。
				// TODO 做一个资源表，提前转换好。
				const textureOrigin = 'data:application/shelf.png';
				let textureUrl = '/static/shelf.png';
				if (newValue.platform == 'android' || newValue.platform == 'ios') {
					textureUrl = await this.getFile(textureUrl);
				}
				
				// 这个回调是同步的，不好在里面做转换。
				manager.setURLModifier(url => {
					console.log('url:', url);
					if (url == textureOrigin) {
						return textureUrl;
					}
					return url;
				});
				
				const mtlLoader = new MTLLoader(manager);
				let mtlUrl = '/static/shelf.mtl';
				if (newValue.platform == 'android' || newValue.platform == 'ios') {
					mtlUrl = await this.getFile(mtlUrl);
				}
				mtlLoader.load(mtlUrl, async materials => {
					console.log('loaded mtl', materials);
					
					const objLoader = new OBJLoader();
					objLoader.setMaterials(materials);
					let objUrl = '/static/shelf.obj';
					if (newValue.platform == 'android' || newValue.platform == 'ios') {
						objUrl = await this.getFile(objUrl);
					}
					objLoader.load(objUrl, (model) => {
						console.log('loaded obj', model);
						
						model.position.x = 0;
						model.position.y = 0;
						model.position.z = 0;
						model.children.forEach(m => {
							console.log('m', m);
							m.material.color.set(0xFFFFFF);
						});
						scene.add( model );
						console.log('add model');
					});
				});
				
				
				// 定位 方块
				console.log('')
				const color = 0x0000ff;
				const geometry = new THREE.BoxGeometry( 100, 0.5, 100 );
				const material = new THREE.MeshBasicMaterial( { color: color } );
				const cube = new THREE.Mesh( geometry, material );
				cube.position.x = 0;
				cube.position.y = 30;
				cube.position.z = -50;
				scene.add( cube );
				
				// 平行光
				const light = new THREE.AmbientLight( 0xFFFFFF ); // 强白光
				scene.add( light );
				
				camera.position.z = 10;
				camera.position.x = 0;
				camera.position.y = -10;
				camera.rotation.x = 0.785; // Π/4 = 45°
				
				renderer.setAnimationLoop( ( time ) => {
					renderer.render( scene, camera );
				});
			},
			getFile(sysUrl) {
				let url = plus.io.convertLocalFileSystemURL(sysUrl);
				return new Promise((resolve, reject) => {
					plus.io.resolveLocalFileSystemURL(url, entry => {
						entry.file(f => {
							let reader = new plus.io.FileReader();
							reader.onloadend = (event) => {
								resolve(event.target.result);
							};
							reader.readAsDataURL(f);
						}, e => {
							reject(e);
						});
					}, e => {
						reject(e);
					});
				});
			},
		}
	}
</script>

<style>

</style>
