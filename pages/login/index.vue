<template>
	<view>
		{{ store.count }}
		<button type="default" @click="store.increment">+</button>
	</view>
</template>

<script setup>
import { useCounterStore } from '@/store/count.js';

const store = useCounterStore();
</script>

<style></style>
