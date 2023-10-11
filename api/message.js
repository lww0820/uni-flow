import uniFetch from './uni-fetch.js'

// 根据类型查询未读消息数量 /driver/messages/countType/{contentType}
export const getMessageCountType = (contentType) => {
	return uniFetch({
		url: `/driver/messages/countType/${contentType}`,
		method: 'GET'
	})
}

// 分页查询消息列表
export const getMessagePage = (contentType, page = 1, pageSize = 5) => {
	return uniFetch.get('/driver/messages/page', {
		contentType,
		page,
		pageSize
	});
};

// 全部已读
export const getMessageReadAll = (contentType) => {
	return uniFetch({
		url: `/driver/messages/readAll/${contentType}`,
		method: 'PUT'
	})
}

// 标记已读
export const getMessage = (id) => {
	return uniFetch({
		url: `/driver/messages/${id}`,
		method: 'PUT'
	})
}