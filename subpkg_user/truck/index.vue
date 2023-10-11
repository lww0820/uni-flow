<template>
	<view class="page-container page-content">
		<swiper v-if="truckList?.pictureList" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item class="truck-pictures" v-for="(item, index) in truckList.pictureList">
				<image class="picture" :src="item.url" mode=""></image>
			</swiper-item>
		</swiper>
		<uni-list v-if="truckList">
			<uni-list-item :border="false" title="⻋辆编号" :right-text="truckList.id" />
			<uni-list-item :border="false" title="车辆号牌" :right-text="truckList.licensePlate" />
			<uni-list-item :border="false" title="车型" :right-text="truckList.truckType" />
			<uni-list-item :border="false" title="所属机构" :right-text="truckList.currentOrganName" />
			<uni-list-item :border="false" title="载重" :right-text="truckList.allowableLoad" />
		</uni-list>
	</view>
</template>

<script setup>
import { getTruck } from '@/api/my.js';
import { ref } from 'vue';
const truckList = ref();

const getTruckList = async () => {
	let res = await getTruck();
	console.log(res);
	truckList.value = res.data;
};
getTruckList();
</script>

<style lang="scss">
.page-content {
	padding: 30rpx;

	.truck-pictures {
		width: 100%;
		height: 400rpx;
		border-radius: 16rpx;
		overflow: hidden;

		.picture {
			width: 100%;
			height: 100%;
		}
	}

	.uni-list {
		margin-top: 30rpx;
	}

	::v-deep .uni-list-item__extra-text {
		font-size: 28rpx;
		color: #2a2929;
	}

	::v-deep .uni-list-item__content-title {
		font-size: 28rpx;
		color: #818181;
	}
}
</style>
