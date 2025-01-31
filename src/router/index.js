import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import store from '@/store'
import { whiteList } from '@/common/config'

import { webtitle } from '@/settings.js'

// lss 2021/5/14。路由配置，改成自动读取views下文件动态配置，
// 可解决多人开发时路由不易维护的难题（也可获取接口动态路由然后使用addRoutes注册）
const contextInfo = require.context( // 获取文件，自动挂载在router下
	'../views', // 其组件目录的相对路径
	true, 		// 是否查询其子目录
	/\.vue/,	// 匹配基础组件文件名的正则表达式
)
let dynamicItems = []
contextInfo.keys().forEach(fileName => {
	const pathConfig = contextInfo(fileName)
	let path = '/' + fileName.substring(2, fileName.length - 4)
	if (path === '/login' || path.indexOf('/modal/') !== -1) { // 过滤非嵌套和模态弹窗
		return
	}
	// 组装成路由
	dynamicItems.push({
		path,
		name: pathConfig.default.name,
		meta: { // 注：此处的meta，直接用页面vue的对应值
			title: pathConfig.default.title,
			level_code: pathConfig.default.level_code
		},
		component: pathConfig.default
	})
})

const routes = [
	{
		path: '/home',
		name: 'home',
		component: Home,
		children: dynamicItems
	},
	{
		path: '/login',
		name: 'login',
		meta: { title: '登录' },
		component: () => import ('@/components/Login.vue')
	},
	{ path: '/:pathMatch(.*)*', redirect: '/error/404', hidden: true } // 添加404重定向，防止用户随意敲链接
];

const router = createRouter({
	// history: createWebHashHistory(),
	history: createWebHistory(), // process.env.BASE_URL
	// mode: 'history', // for 2.0
	routes
});

// 全局钩子
router.beforeEach((to, from, next) => {
	// 页面标题
	document.title = `${to.meta.title} - ${webtitle}`;
	const token = sessionStorage.getItem('token');
	// 似乎不是正道 有token必须登录成功
	let level_code = 10;
	if (token)
	{
		level_code = JSON.parse(sessionStorage.getItem('userInfo')).level_code;
	}
	
	const permissionMenu = store.state.user.permissionMenu;
	// console.log("to.path: ", to, "menu", permissionMenu, "level: ", level_code, "to.meta: ", to.meta)
	if (!token && to.path !== '/login') { // 未登录重定向到登录（除了登录页，其他都需要登录后才能进入）
		next('/login');
	}
	// 不能依赖菜单的权限，因为本函数在菜单显示之前，应该在页面中指定权限的
	// 对应权限对应菜单 在页面中赋值level_code
	else if (permissionMenu.length > 0 && JSON.stringify(permissionMenu).indexOf(to.path) === -1) { // 防止用户通过敲击路由的方式，进入未授权菜单
		// 进入未授权页面，假如在白名单内，直接进入
		if (whiteList.find((v) => v === to.path)) {
			// console.log("next1111.....")
			next();
		}
		// 进入未授权页面，假如未在白名单内，重定向到403
		else {
			// console.log("next403.....")
			next('/error/403');
		}
	}
	else {
		// 如果直接输入地址，再判断，上面的判断，还不懂怎么搞
		if (level_code > to.meta.level_code) {
			next('/error/403');
		} else {
			next();
		}
	}
	
	// 钩子内也可改成动态注册路由（router.addRoutes），可参考：https://www.cnblogs.com/amylis_chen/p/13112300.html
});

export default router;