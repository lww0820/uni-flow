<template>
	<view class="page-content"></view>
</template>

<script setup>
import { ref } from 'vue';
const showCalendar = ref();
</script>

<style lang="scss">
.example-body {
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	flex-direction: row;
}
.calendar-button {
	flex: 1;
	font-weight: bold;
	font-size: 32rpx;
}
</style>
