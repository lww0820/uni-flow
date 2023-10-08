// stores/counter.js
import {
	defineStore
} from 'pinia'
import {
	ref
} from 'vue'
export const useCounterStore = defineStore('counter', () => {
	// 状态数据（相当于 state）
	const count = ref(0)
	// 定义⽅法（相当于 actions）
	function increment() {
		count.value++
	}

	function decrement() {
		count.value--
	}
	// ⼀定要将定义的数据和⽅法返回
	return {
		count,
		increment,
		decrement
	}
}, {
	persist: true
})