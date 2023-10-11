<script setup>
import { getTaskDetails } from '@/api/task.js';
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';

// 保存任务详情数据
const taskDetailInfo = ref({});

// 控制展开与收起
const flag = ref(true);

const change = () => {
	flag.value = !flag.value;
};
// 获取任务详情数据
const getTaskDetail = async (id) => {
	const res = await getTaskDetails(id);
	console.log(res.data);
	taskDetailInfo.value = res.data;
};

onLoad((e) => {
	console.log(e);
	getTaskDetail(e.id);
});
</script>
<template>
	<view class="page-container page-content">
		<view class="card">
			<view class="header">
				<text class="defaultInfo">基本信息</text>
				<image v-if="flag" @click="change" class="jia" src="@/static/btn_zhankai.png" mode=""></image>
				<image v-else @click="change" class="jia" src="@/static/收起.png" mode=""></image>
			</view>
			<view class="bottom" v-show="flag">
				<view class="body">
					<view class="time-line">
						<view class="line">{{ taskDetailInfo.startAddress }}</view>
						<view class="line">{{ taskDetailInfo.endAddress }}</view>
					</view>
				</view>
				<!-- 待提货展示数据 -->
				<template v-if="taskDetailInfo.status === 1">
					<view class="info">
						<view class="taskNumber flex">
							<text class="one">任务编号</text>
							<text class="two">{{ taskDetailInfo.transportTaskId }}</text>
						</view>
						<view class="username flex">
							<text class="one">联系人</text>
							<text class="two">{{ taskDetailInfo.startHandoverName }}</text>
						</view>
						<view class="phone flex">
							<text class="one">联系电话</text>
							<view class="phone">
								<text class="two">{{ taskDetailInfo.startHandoverPhone }}</text>
								<image src="@/static/phone.png" mode=""></image>
							</view>
						</view>
						<view class="time flex">
							<text class="one">提货时间</text>
							<text class="two">{{ taskDetailInfo.planDepartureTime }}</text>
						</view>
						<view class="PickupTime flex">
							<text class="one delivery">预计送达时间</text>
							<text class="two">{{ taskDetailInfo.planArrivalTime }}</text>
						</view>
					</view>
				</template>
				<!-- 在途展示数据 -->
				<template v-if="taskDetailInfo.status === 2">
					<view class="info">
						<view class="taskNumber flex">
							<text class="one">交付联系人</text>
							<text class="two">{{ taskDetailInfo.finishHandoverName }}</text>
						</view>
						<view class="taskNumber flex">
							<text class="one">联系电话</text>
							<text class="two">{{ taskDetailInfo.finishHandoverPhone }}</text>
						</view>
						<view class="taskNumber flex">
							<text class="one">预计送达时间</text>
							<text class="two">{{ taskDetailInfo.planArrivalTime }}</text>
						</view>
						<view class="taskNumber flex">
							<text class="one">实际送达时间</text>
							<text class="two">{{ taskDetailInfo.actualArrivalTime }}</text>
						</view>
					</view>
				</template>
			</view>
		</view>
		<view class="list">
			<view class="header">
				<text class="defaultInfo">车辆司机信息</text>
				<image class="jia" src="@/static/btn_zhankai.png" mode=""></image>
			</view>
			<view class="header">
				<text class="defaultInfo">运输路线</text>
				<image class="jia" src="@/static/btn_zhankai.png" mode=""></image>
			</view>
			<view class="header">
				<text class="defaultInfo">物品信息</text>
				<image class="jia" src="@/static/btn_zhankai.png" mode=""></image>
			</view>
			<view class="header">
				<text class="defaultInfo">提货信息</text>
				<image class="jia" src="@/static/btn_zhankai.png" mode=""></image>
			</view>
		</view>
	</view>
	<view class="btns">
		<view class="toolbar" v-if="taskDetailInfo.status === 1">
			<navigator :url="`/subpkg_task/delay/index?id=${taskDetailInfo.id}&time=${taskDetailInfo.planArrivalTime}`" hover-class="none" class="button secondary">
				延迟提货
			</navigator>
			<navigator :url="`/subpkg_task/pickup/index?${taskDetailInfo.id}`" hover-class="none" class="button primary">提货</navigator>
		</view>
		<view class="toolbar" v-if="taskDetailInfo.status === 2">
			<navigator :url="`/subpkg_task/except/index`" hover-class="none" class="button secondary">异常上报</navigator>
			<navigator :url="`/subpkg_task/delivery/index`" hover-class="none" class="button primary">支付</navigator>
		</view>
		<view class="toolbar" v-if="taskDetailInfo.status === 4">
			<navigator :url="`/subpkg_task/record/index`" hover-class="none" class="button secondary">回车登记</navigator>
		</view>
	</view>
</template>

<style lang="scss">
.page-container {
	display: flex;
	flex-direction: column;
	height: calc(100vh - 44px);
	padding: 30rpx;
	.card {
		width: 100%;
		// height: 726rpx;
		background: #ffffff;
		border-radius: 20rpx;
		padding: 30rpx;
		box-sizing: border-box;

		.header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			.defaultInfo {
				width: 306rpx;
				height: 44rpx;
				font-family: PingFangSC-Medium;
				font-weight: 500;
				font-size: 32rpx;
				color: #2a2929;
				letter-spacing: 0.36rpx;
			}
			.jia {
				width: 48rpx;
				height: 48rpx;
			}
		}
		.body {
			padding: 43rpx 0;
			border-bottom: 2rpx solid #f4f4f4;

			.time-line {
				position: relative;
				margin-left: 30rpx;
				padding: 0 30rpx;
				border-left: 2rpx dashed red;

				&::before {
					content: '起';
					display: block;
					position: absolute;
					left: -24rpx;
					top: -1rpx;
					width: 44rpx;
					height: 44rpx;
					background: #2a2929;
					font-size: 24rpx;
					color: #ffffff;
					border-radius: 22rpx;
					display: flex;
					justify-content: center;
					align-items: center;
				}

				&::after {
					content: '止';
					display: block;
					width: 44rpx;
					height: 44rpx;
					bottom: -1rpx;
					background: #ef4f3f;
					font-size: 24rpx;
					color: #ffffff;
					position: absolute;
					left: -24rpx;
					border-radius: 22rpx;
					display: flex;
					justify-content: center;
					align-items: center;
				}
			}

			.line {
				font-size: 28rpx;
				color: #818181;
				margin-top: 30rpx;

				&:first-child {
					margin-top: 0;
				}
			}
		}
		.info {
			margin-top: 45rpx;
			.flex {
				display: flex;
				justify-content: space-between;
				margin-top: 35rpx;
				.one {
					min-width: 114rpx;
					height: 40rpx;
					font-family: PingFangSC-Regular;
					font-weight: 400;
					font-size: 28rpx;
					color: #818181;
					letter-spacing: 0.32rpx;
				}
				.delivery {
					width: 170rpx;
				}
				.two {
					width: 256rpx;
					height: 40rpx;
					font-family: PingFangSC-Regular;
					font-weight: 400;
					font-size: 28rpx;
					color: #2a2929;
					letter-spacing: 0.32rpx;
					text-align: right;
					flex: 1;
				}
			}
			.phone {
				display: flex;

				image {
					width: 48rpx;
					height: 48rpx;
				}
			}
		}
	}
	.list {
		.header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			// width: 690rpx;
			height: 100rpx;
			padding: 28rpx 40rpx;
			box-sizing: border-box;
			background: #ffffff;
			border-radius: 20rpx;
			margin-top: 30rpx;
			margin-bottom: 29rpx;
			.defaultInfo {
				width: 306rpx;
				height: 44rpx;
				font-family: PingFangSC-Medium;
				font-weight: 500;
				font-size: 32rpx;
				color: #2a2929;
				letter-spacing: 0.36rpx;
			}
			.jia {
				width: 48rpx;
				height: 48rpx;
			}
		}
	}
}

.btns {
	width: 100%;
	position: fixed;
	right: 0;
	bottom: 0;
}
.toolbar {
	display: flex;
	justify-content: space-between;
	padding: 30rpx 30rpx calc(env(safe-area-inset-bottom) + 30rpx);
	box-sizing: border-box;
	font-size: $uni-font-size-base;
	background-color: #fff;
	.button {
		height: 100rpx;
		text-align: center;
		line-height: 100rpx;
		/* #ifdef APP */
		padding-top: 4rpx;
		/* #endif */
		border-radius: 100rpx;
		font-size: $uni-font-size-big;
	}

	.secondary {
		width: 250rpx;
		color: #000;
		background-color: #e6e6e6;
	}

	.primary {
		width: 400rpx;
		color: #fff;
		background-color: $uni-main-color;

		&.block {
			width: 690rpx;
		}

		&[disabled] {
			background-color: #fadcd9;
		}
	}
}
// .bottom {
// 	transition: opacity 3s ease-in 2s;
// }
</style>
