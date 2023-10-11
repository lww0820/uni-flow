<script setup>
import { ref } from 'vue';
import { login } from '@/api/user.js';
import { useUserStore } from '@/store/user.js';
import { onLoad } from '@dcloudio/uni-app';

// 回跳地址
const redirectUrl = ref();
// 回调方式
const routeType = ref();
onLoad((e) => {
	console.log(e);
	redirectUrl.value = e.redirectUrl;
	routeType.value = e.routeType;
});

const store = useUserStore();
const formData = ref({
	account: '',
	password: ''
});

// 控制密码眼睛
const eye = ref(false);
const AccountRules = ref({
	account: {
		rules: [
			{ required: true, errorMessage: '请输入账号' },
			{ pattern: /^[a-zA-Z0-9]{6,8}$/, errorMessage: '账号格式错误' }
		]
	},
	password: {
		rules: [
			{ required: true, errorMessage: '请输入密码' },
			{ pattern: /^[0-9]{6}$/, errorMessage: '密码格式错误' }
		]
	}
});

const accountRef = ref(null);
const onFormSubmit = async () => {
	try {
		// 调用表单校验
		const formData = await accountRef.value.validate();

		// 调用登录接口
		const res = await login(formData);
		console.log(res);
		// 存储token
		store.token = res.data;

		uni[routeType.value]({
			url: redirectUrl.value
		});
	} catch (e) {
		// 验证失败
		console.log('e', e);
	}
};

const clear = () => {
	formData.value.password = '';
};
</script>
<template>
	<uni-forms ref="accountRef" :rules="AccountRules" class="uni-form" :modelValue="formData">
		<uni-forms-item name="account">
			<input type="text" placeholder-style="#818181" v-model="formData.account" placeholder="请输入账号" />
		</uni-forms-item>
		<uni-forms-item name="password">
			<input :type="eye ? 'text' : 'password'" placeholder-style="#818181" v-model="formData.password" placeholder="请输入密码" />
			<view class="icon">
				<text class="clear" @click="clear">×</text>
				<img v-if="eye" class="eye" @click="eye = !eye" src="@/static/眼睛3.png" alt="" />
				<img v-else class="eye" @click="eye = !eye" src="@/static/眼睛_闭.png" alt="" />
			</view>
		</uni-forms-item>
	</uni-forms>
	<button class="submit-button" @click="onFormSubmit">登录</button>
</template>

<style lang="scss">
.uni-form {
	.uni-forms-item {
		height: 100rpx;
		margin-bottom: 20 !important;
		border-bottom: 2rpx solid #eee;
		box-sizing: border-box;
		::v-deep .uni-forms-item__content {
			display: flex;
			align-items: center;
		}

		::v-deep input {
			width: 100%;
			font-size: $uni-font-size-base;
			color: $uni-second-text;
		}
	}
	::v-deep .uni-forms-item__error {
		width: 100%;
		padding-top: 10rpx;
		border-top: 2rpx solid $uni-main-color;
		color: $uni-main-color;
		font-size: $uni-font-size-small;
		transition: none;
	}
}

.submit-button {
	background-color: $uni-main-color;
	color: $uni-bg-white;
	border-radius: 49.54rpx;
	margin-top: 80rpx;
	width: 100%;
	height: 100rpx;
	line-height: 100rpx;
	border: none;
	font-size: $uni-font-size-big;
}

.disabled {
	background-color: #fadcd9;
	color: $uni-bg-white;
}

.clear {
	width: 28rpx;
	height: 28rpx;
	background: #cccccc;
	border-radius: 50%;
	text-align: center;
	line-height: 28rpx;
	color: #fff;
	font-size: 24rpx;
}
.icon {
	width: 150rpx;
	display: flex;
	justify-content: space-around;
}
.eye {
	width: 32rpx;
	height: 32rpx;
}
</style>