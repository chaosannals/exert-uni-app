// 这几个方法因为都有相同的 url 参数，所以才能共用一份代码
const ROUTE_NAV_FUNC = [
	'navigateTo',
	'redirectTo',
	'reLaunch',
	'switchTab',
];
const ROUTE_BACK_FUNC = 'navigateBack';

let clickCount = 0;

export default function() {
	ROUTE_NAV_FUNC.forEach(funcName => {
		uni.addInterceptor(funcName, {
			invoke(e) {
				console.log(`route ${funcName} invoke`, e);
				if (e.url?.indexOf("cantin") >= 0) {
					// 通过 修改参数来改变路由。
					var pages = getCurrentPages();
					var page = pages[pages.length - 1]; // 当前页面。
					// 这个 page 的类型不支持 console.log 打印，
					// 需要指定具体字段。不然会出现不报错，但是程序中断的情况。
					// 这种会影响判断。
					console.log(`pages count: ${pages.length} ${page.route}`);
					
					e.url = (clickCount++) < 4 ? page.route : "/pages/three/three";
					console.log(`重定向到 index ${clickCount}`, e);
				}
			},
		});
	});

	uni.addInterceptor(ROUTE_BACK_FUNC, {
		invoke(e) {
			console.log(`route ${ROUTE_BACK_FUNC} back`, e);
		},
	});
};