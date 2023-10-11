import uniFetch from './uni-fetch.js'

// 延迟提货
export const getTaskDelay = () => {
	return uniFetch({
		url: '/driver/tasks/delay',
		method: 'PUT',
	})
}

// 交付 /driver/tasks/deliver post
export const getTaskDeliver = () => {
	return uniFetch({
		url: '/driver/tasks/deliver',
		method: 'post',
	})
}

// 任务详情 /driver/tasks/details/{jobId} get
export const getTaskDetails = (jobId) => {
	return uniFetch({
		url: `/driver/tasks/details/${jobId}`,
		method: 'get',
	})
}

// 联系调度中心 /driver/tasks/dispatchCenterPhone get
export const getTaskDispatchCenterPhone = () => {
	return uniFetch({
		url: `/driver/tasks/dispatchCenterPhone`,
		method: 'get',
	})
}

// 任务列表 /driver/tasks/list get
export const getTaskList = (data) => {
	return uniFetch({
		url: '/driver/tasks/list',
		method: 'get',
		data
	})
}
// 条件查询货物信息列表 /driver/tasks/orders  get
export const getTaskOrders = () => {
	return uniFetch({
		url: `/driver/tasks/orders`,
		method: 'get',
	})
}
// 提货 /driver/tasks/takeDelivery post
export const getTaskTakeDelivery = () => {
	return uniFetch({
		url: `/driver/tasks/takeDelivery`,
		method: 'post',
	})
}
// 回车登记 /driver/tasks/truckRegistration post
export const getTaskTruckRegistration = () => {
	return uniFetch({
		url: `/driver/tasks/truckRegistration`,
		method: 'post',
	})
}
// 上报异常 /driver/tasks/reportException post
export const getTaskReportException = () => {
	return uniFetch({
		url: `/driver/tasks/reportException`,
		method: 'post',
	})
}