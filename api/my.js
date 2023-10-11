import uniFetch from './uni-fetch.js'

// 用户信息
export const getUserInfoApi = () => {
	return uniFetch({
		url: '/driver/users',
		method: 'GET'
	})

}
// 任务数据
export const getTaskReportApi = (data) => {
	return uniFetch({
		url: '/driver/users/taskReport',
		method: 'GET',
		data
	})

}
// 车辆信息
export const getTruck = () => {
	return uniFetch({
		url: '/driver/users/truck',
		method: 'GET',
	})

}