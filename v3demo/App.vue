<script setup>
	import {
		onLaunch,
		onShow,
		onHide,
	} from '@dcloudio/uni-app';
	import routeIntercept from '@/route.js';
	
	const version = '1.0.0';
	const host = '192.168.1.195:30000'; // v3demod 
	const androidCheckUpdate = () => {
		uni.request({
			url: `http://${host}/version`,
			method: 'GET',
			data: {},
			success: res => {
				console.log('version', res.data, version)
				if (res.data > version) {
					if (plus.networkinfo.getCurrentType() != 3) {
						uni.showToast({
							title: '有新版本，没 WIFI， 暂不升级',
							mask: false,
							duration: 4000,
							icon: 'none',
						});
						return;
					}
					uni.showToast({
						title: '有新版本，立即升级',
						mask: false,
						duration: 4000,
						icon: 'none',
					});
					var dtask = plus.downloader.createDownload(
						`http://${host}/v1.0.1.apk`,
						{},function (d, status) {
							console.log('start download apk')
							if (status == 200) {
								plus.runtime.install(
									plus.io.convertLocalFileSystemURL(d.filename),
									{}, {},
									function(error) {
										uni.showToast({
											title: '安装失败',
											mask: false,
											duration: 1400,
										});
									}
								)
							} else {
								uni.showToast({
									title: '下载失败',
									mask: false,
									duration: 1400,
								});
							}
						}
					);
					dtask.start();
				}
			},
			fail: () => {},
			complete: () => {},
		})
	}
	
	onLaunch(() => {
		console.log('App Launch');
		uni.getSystemInfo({
			success: res => {
				console.log('update');
				if(res.platform == 'android') {
					androidCheckUpdate();
				}
			}
		});
		routeIntercept();
	});
	onShow(() => {
		console.log('App Show')
	});
	onHide(() => {
		console.log('App Hide')
	});
</script>

<style>
	/*每个页面公共css */
	#app {
		z-index: 1;
	}
</style>
