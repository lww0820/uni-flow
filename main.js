import App from './App'
// 引入封装的轻提示
import '@/utils/utils.js'



// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
// 引⼊ Pinia
import {
	createPinia
} from 'pinia'

// import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import piniaPluginPersistedstate from '@/store/persist.js'

export function createApp() {
	const app = createSSRApp(App)
	// 实例化Pinia
	const pinia = createPinia()
	// 传递给项⽬应⽤
	app.use(pinia)
	// Pinia 持久化插件
	pinia.use(piniaPluginPersistedstate)
	return {
		app
	}
}
// #endif