<script setup>
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { getMessageCountType, getMessageReadAll } from '@/api/message.js';

// 控制是否显示暂无数据, false表示有数据 true表示没有数据
const isEmpty = ref(false);

const contentType = ref('201');

// 保存任务列表
const taskList = ref([]);
// 条数
const pageSize = ref(5);
// 页码
const nextPage = ref(0);

// 判断请求的数据是否全部加载完成, false表示未加载完, true加载完成
const hasMore = ref(false);

// 控制下拉刷新的状态, true激活下拉刷下状态 false关闭下拉刷新状态
const isTriggered = ref(false);

// 获取任务通知数据
const getTaskNotifyList = async () => {
	console.log('123');
	try {
		// 页码+1
		nextPage.value += 1;

		// 发送请求
		const result = await getMessageCountType(contentType.value, nextPage.value, pageSize.value);

		// 如果页码为1, 则设置 taskList.value 为空数组
		if (nextPage.value === 1) taskList.value = [];
		// 将请求到的数据进行保存
		taskList.value = [...taskList.value, ...(result.data.items || [])];

		console.log('result', result);
		// 数据是否加载完
		hasMore.value = nextPage.value == result.data.pages;
		// 如果没有数据的话,则设置isEmpty未true,
		isEmpty.value = taskList.value.length === 0;
	} catch (e) {
		console.log(e);
	}
};
// 初始化数据
onLoad(() => {
	getTaskNotifyList();
});
// 监听上拉加载
const onScrollToLower = () => {
	if (hasMore.value) return;
	getTaskNotifyList();
};

// 监听下拉刷新
const onRefresh = async () => {
	// 激活下拉刷下状态
	isTriggered.value = true;
	// 重置页码
	nextPage.value = 0;
	// 请求数据
	await getTaskNotifyList();
	// 关闭下拉刷新状态
	isTriggered.value = false;
};

// 监听全部已读
const handleAllRead = async () => {
	try {
		const result = await getMessageReadAll(contentType.value);
		nextPage.value = 0;
		getTaskNotifyList();
	} catch (e) {
		console.log(e);
	}
};
</script>
<template>
	<scroll-view @refresherrefresh="onRefresh" refresher-enabled @scrolltolower="onScrollToLower" scroll-y="true" class="scroll-view" refresher-background="#f4f4f4;">
		<view class="scroll-view-wrapper">
			<view @click="handleAllRead" class="message-action">
				<text class="iconfont icon-clear"></text>
				全部已读
			</view>
			<uni-card :is-shadow="false" v-for="(item, index) in taskList" :key="index">
				<view class="brief">{{ item.content }}</view>
				<view class="extra">
					<text class="time">{{ item.created }}</text>
					<navigator class="link" url="/subpkg_message/content/index">查看详情</navigator>
				</view>
				<template v-slot:title>
					<view :class="{ unread: item.isRead === 0 }" class="title">{{ item.title }}</view>
				</template>
			</uni-card>
		</view>
		<view v-if="isEmpty" class="message-blank">暂无消息</view>
	</scroll-view>
</template>

<style lang="scss">
@import './styles.scss';
</style>
