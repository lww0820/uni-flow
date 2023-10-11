<script setup>
import { ref } from 'vue';
import Account from './components/account.vue';
import Mobile from './components/mobile.vue';

const tabIndex = ref(0);
// 定义登录类型切换文本
const tabMetas = [
	{
		title: '账号登录',
		subtitle: '手机号登录'
	},
	{
		title: '手机号登录',
		subtitle: '账号登录'
	}
];

// 切换登录类型
const changeLoginType = () => {
	tabIndex.value = Math.abs(tabIndex.value - 1);
};
</script>
<template>
	<view class="user-login">
		<view class="login-type">
			<view class="title">{{ tabMetas[tabIndex].title }}</view>
			<view class="type" @click="changeLoginType">
				<text>{{ tabMetas[tabIndex].subtitle }}</text>
				<text class="iconfont icon-caret"></text>
			</view>
		</view>
		<Account v-if="tabIndex === 0"></Account>
		<Mobile v-else></Mobile>
	</view>
</template>

<style lang="scss">
@import './index.scss';
</style>
