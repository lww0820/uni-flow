// stores/counter.js
import {
	defineStore
} from 'pinia'
import {
	ref
} from 'vue'
export const useUserStore = defineStore('user', () => {
	const token = ref('')
	const UserInfo = ref({})
	// ⼀定要将定义的数据和⽅法返回
	return {
		token,
		UserInfo
	}
}, {
	persist: true
})