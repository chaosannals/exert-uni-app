// 这几个方法因为都有相同的 url 参数，所以才能共用一份代码
const ROUTE_NAV_FUNC = [
	'navigateTo',
	'redirectTo',
	'reLaunch',
	'switchTab',
];
const ROUTE_BACK_FUNC = 'navigateBack';

export default function() {
	ROUTE_NAV_FUNC.forEach(funcName => {
		uni.addInterceptor(funcName, {
			invoke(e) {
				console.log(`route ${funcName} invoke`, e);
			},
		});
	});

	uni.addInterceptor(ROUTE_BACK_FUNC, {
		invoke(e) {
			console.log(`route ${ROUTE_BACK_FUNC} back`, e);
		},
	});
};