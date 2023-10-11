// 导⼊安装好的 uni-app-fetch 模块
import {
	createUniFetch
} from 'uni-app-fetch'
import {
	useUserStore
} from '@/store/user.js';

// 定义tabbar页面
const tabBarPagePaths = ['pages/task/index', 'pages/message/index', 'pages/my/index'];

// 配置符合⾃身业务的请求对象
const uniFetch = createUniFetch({
	// loading加载
	loading: {
		title: '加载中...'
	},
	baseURL: 'https://slwl-api.itheima.net',
	intercept: {
		// 请求拦截器
		request(options) {
			const store = useUserStore();

			// 一种写法
			// if(store.token) options.header.Authorization = store.token;

			// 另一种写法 (推荐)
			const defaultHeader = {
				Authorization: store.token
			};

			options.header = Object.assign({}, defaultHeader, options.header);

			return options;
		},

		// 响应拦截器
		response(result) {
			// console.log('result', result);
			if (result.statusCode === 200 && result.data.code === 200) {
				return result.data;
			}
			if (result.statusCode === 401) {
				// TODO token过期处理
				// 页面栈 ->  4 个路由 []
				const pageStack = getCurrentPages();
				console.log('pageStack', pageStack);

				const redirectUrl = pageStack[pageStack.length - 1].route;
				const routeType = tabBarPagePaths.includes(redirectUrl) ? 'switchTab' : 'redirectTo';

				// 当前回调的地址是否是tabbar页面
				// 1. 跳转到登录页
				return uni.navigateTo({
					// url: '/pages/login/index?redirectUrl=' + redirectUrl + "&routeType=" +routeType
					url: `/pages/login/index?routeType=${routeType}&redirectUrl=/${redirectUrl}`
				});
			}
			uni.utils.toast(result.data.msg || '请求失败');
		}
	}
});

export default uniFetch