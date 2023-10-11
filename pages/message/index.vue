<script setup>
import { reactive, ref } from 'vue';

import Notify from './components/notify.vue';
import Announce from './components/announce.vue';

const tabIndex = ref(0);

const tabMetas = reactive([
	{ title: '公告', rendered: true },
	{ title: '任务通知', rendered: false }
]);
const changeTab = (index) => {
	tabMetas[index].rendered = true;
	tabIndex.value = index;
};
</script>
<template>
	<view class="page-container page-content">
		<view class="tab">
			<view @click="changeTab(index)" class="tab-item" v-for="(item, index) in tabMetas">
				<view class="title" :class="{ active: tabIndex == index }">
					{{ item.title }}
					<view class="line"></view>
				</view>
			</view>
		</view>
		<view class="announce" v-if="tabMetas[0].rendered" v-show="tabIndex === 0">
			<Announce></Announce>
		</view>
		<view class="notify" v-if="tabMetas[1].rendered" v-show="tabIndex === 1">
			<Notify></Notify>
		</view>
	</view>
</template>

<style lang="scss">
@import './index.scss';
</style>
