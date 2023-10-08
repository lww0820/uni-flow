export const utils = {
	/**
	 * ⽤户反馈（轻提示）
	 * @param {string} title 提示⽂字内容
	 * @param {string} icon 提示图标类型
	 */
	toast(title = '数据加载失败', icon = 'none') {
		uni.showToast({
			title,
			icon,
			// 遮罩层背景
			mask: true
		})
	}
}

uni.utils = utils