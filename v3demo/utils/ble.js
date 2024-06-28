// UNIAPP 只有低功耗蓝牙，链接断开速度很慢。

export const getConnetedDevices = () => {
	console.log('获取已连接过的蓝牙设备');
	let main = plus.android.runtimeMainActivity();
	let Context = plus.android.importClass('android.content.Context');
	let UUID = plus.android.importClass('java.util.UUID');
	let BManager = main.getSystemService(Context.BLUETOOTH_SERVICE);
	plus.android.importClass(BManager); //引入相关的method函数
	let BAdapter = BManager.getAdapter();
	plus.android.importClass(BAdapter); //引入相关的method函数，这样之后才会有isEna
	let lists = BAdapter.getBondedDevices();
	plus.android.importClass(lists);
	let iterator = lists.iterator();
	plus.android.importClass(iterator);
	const result = [];
	while (iterator.hasNext()) {
		let d = iterator.next();
		plus.android.importClass(d);
		console.log(d);
		console.log(d.hashCode());
		console.log(d.getName());
		result.push({
			name: d.getName(),
			deviceId: d.getAddress(),
			text: d.getName(),
			value: d.getAddress()
		});
	}
	return result;
}

export const openBluetoothAdapter = async () => {
	return new Promise((resolve, reject) => {
		uni.openBluetoothAdapter({
			success(res) {
				resolve(res);
			},
			fail(res) {
				reject(res);
			},
		})
	});
};

export const closeBluetoothAdapter = async () => {
	return new Promise((resolve, reject) => {
		uni.closeBluetoothAdapter({
			success(res) {
				resolve(res);
			},
			fail(res) {
				reject(res);
			}
		})
	});
};

export const createBLEConnection = async (params) => {
	return new Promise((resolve, reject) => {
		uni.createBLEConnection({
			...params,
			success(res) {
				resolve(res);
			},
			fail(res) {
				reject(res);
			}
		})
	});
};

export const closeBLEConnection = async (params) => {
	return new Promise((resolve, reject) => {
		uni.closeBLEConnection({
			...params,
			success(res) {
				resolve(res);
			},
			fail(res) {
				reject(res);
			}
		})
	});
};


export const writeBLECharacteristicValue = async (params) => {

};