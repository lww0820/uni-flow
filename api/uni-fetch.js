// 导⼊安装好的 uni-app-fetch 模块
import {
	createUniFetch
} from 'uni-app-fetch'

// 配置符合⾃身业务的请求对象
const uniFetch = createUniFetch({
	loading: {
		title: '正在加载...'
	},
	baseURL: 'https://slwl-api.itheima.net',
	intercept: {
		// 请求拦截器
		request(options) {
			// 后续补充实际逻辑
			return options
		},
		// 响应拦截器
		response(result) {
			// 后续补充实际逻辑
			return result
		},
	},
})

export default uniFetch