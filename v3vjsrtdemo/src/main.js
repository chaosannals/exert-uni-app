import {
	createSSRApp
} from "vue";
import App from "./App.vue";
// 使用 router 会导致不报错但是 uni的页面无了。。
import router from './router'; 

export function createApp() {
	const app = createSSRApp(App);
	// app.use(router);
	return {
		app,
	};
}
