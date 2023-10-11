<script setup>
import { ref, reactive } from 'vue';
import Pickup from './components/pickup';
import Complete from './components/complete';
import Delivery from './components/delivery';

const tabIndex = ref(0);
const tabMetas = reactive([
	{ title: '待提货', rendered: true },
	{ title: '在途', rendered: false },
	{ title: '已完成', rendered: false }
]);
const changeTab = (index) => {
	tabMetas[index].rendered = true;
	tabIndex.value = index;
};
</script>
<template>
	<view class="page-container">
		<view class="tab">
			<view @click="changeTab(index)" class="tab-item" v-for="(item, index) in tabMetas">
				<view class="title" :class="{ active: tabIndex == index }">
					{{ item.title }}
					<view class="line"></view>
				</view>
			</view>
		</view>
		<view v-if="tabMetas[0].rendered" v-show="tabIndex === 0">
			<Pickup></Pickup>
		</view>
		<view v-if="tabMetas[1].rendered" v-show="tabIndex === 1">
			<Delivery v></Delivery>
		</view>
		<view v-if="tabMetas[2].rendered" v-show="tabIndex === 2">
			<Complete></Complete>
		</view>
	</view>
</template>

<style lang="scss">
.page-container {
	height: calc(100vh - 94px);
	.tab {
		display: flex;
		height: 88rpx;
		line-height: 88rpx;
		background-color: #fff;
		padding: calc(env(safe-area-inset-top) + 13px) 60rpx 0;
		.tab-item {
			height: 88rpx;
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: #fff;
			flex-direction: column;
			.title {
				position: relative;
				font-size: 28rpx;
				color: #818181;
				&.active {
					color: #2a2929;
					font-weight: 500;

					&::after {
						content: '';
						display: block;
						background: #d8d8d8;
						background-image: linear-gradient(210deg, #f25c4d 25%, #e52d21 100%, #e52d21 100%);
						border-radius: 20rpx;
						border-radius: 4rpx;
						width: 100%;
						height: 8rpx;
						position: absolute;
						bottom: 0;
					}
				}
			}
		}
	}
}

.active {
	font-weight: 600;
}
</style>
