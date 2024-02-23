import {
    createRouter,
    createWebHashHistory,
} from 'vue-router';


import EnterPage from './pages/EnterPage.vue';
import ErrorPage from './pages/ErrorPage.vue';

export const routes = [
    {
        path: '/',
        component: EnterPage,
    },
    {
        path: '/error',
        component: ErrorPage,
    }
];

console.log('router start', EnterPage, ErrorPage);

try {
const router = createRouter({
    history: createWebHashHistory(),
    routes: routes,
});
} catch(e) {
	// TypeError: Cannot read property 'host' of undefined at router.js:29
	console.log('eee', e);
}

console.log('router', router);

// export default router;
export default {};