<script setup>
import { getUserInfoApi, getTaskReportApi } from '@/api/my.js';
import { useUserStore } from '@/store/user.js';
import { reactive, ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
const store = useUserStore();
// 获取用户信息
const getUserInfo = async () => {
	let userRes = await getUserInfoApi();
	// console.log(userRes);
	store.UserInfo = userRes.data;
};

// 获取任务数据
const data = reactive({
	taskList: {}
});

const getMonthAndYear = () => {
	const data = new Date();
	const month = data.getMonth() + 1;
	const year = data.getFullYear();
	return { month, year };
};
// console.log('getMonthAndYear', getMonthAndYear());
const getTaskReport = async () => {
	const res = await getTaskReportApi(getMonthAndYear());
	data.taskList = res.data;
};

onLoad(() => {
	getTaskReport();
	getUserInfo();
});
</script>
<template>
	<view class="page-container page-content">
		<view class="user-profile">
			<image class="avatar" :src="store.UserInfo.avatar" mode=""></image>
			<text class="username">{{ store.UserInfo.name }}</text>
			<text class="no">司机编号：{{ store.UserInfo.number }}</text>
			<text class="mobile">手机号码：{{ store.UserInfo.phone }}</text>
		</view>
		<view class="month-overview">
			<view class="title">本月任务</view>
			<view class="content">
				<view class="item">
					<text class="volumn">{{ data.taskList.taskAmounts }}</text>
					<text class="label">任务总量</text>
				</view>
				<view class="item">
					<text class="volumn">{{ data.taskList.completedAmounts }}</text>
					<text class="label">完成任务量</text>
				</view>
				<view class="item">
					<text class="volumn">{{ data.taskList.transportMileage }}</text>
					<text class="label">运输里程(km)</text>
				</view>
			</view>
		</view>
		<view class="entry-list">
			<uni-list :border="false">
				<uni-list-item to="/subpkg_user/truck/index" showArrow title="车辆信息" />
				<uni-list-item to="/subpkg_user/task/index" showArrow title="任务数据" />
				<uni-list-item to="/subpkg_user/settings/index" showArrow title="系统设置" />
			</uni-list>
		</view>
	</view>
</template>

<style lang="scss">
@import './index.scss';
</style>
