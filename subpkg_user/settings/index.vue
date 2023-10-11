<template>
	<view class="page-content">
		<view class="entry-list">
			<uni-list :border="false">
				<uni-list-item to="/subpkg_user/truck/index" showArrow title="换绑手机" />
				<uni-list-item to="/subpkg_user/task/index" showArrow title="修改密码" />
				<uni-list-item to="/subpkg_user/settings/index" showArrow title="消息通知设置" />
				<uni-list-item to="/subpkg_user/settings/index" showArrow title="修改密码" />
				<uni-list-item to="/subpkg_user/settings/index" showArrow title="清理缓存" />
			</uni-list>
			<view type="default" class="btn">退出</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {}
};
</script>

<style lang="scss">
.page-content {
	overflow: hidden;
}
.entry-list {
	margin: 40rpx 30rpx 0;
	border-radius: 16rpx;
	overflow: hidden;
	.btn {
		// transform: scaleY(-1);
		height: 100rpx;
		line-height: 100rpx;
		text-align: center;
		background: #ffffff;
		border-radius: 16rpx;
		font-size: 32rpx;
		margin-top: 80rpx;
	}
}
</style>
