<script setup lang="ts">
import { ref } from 'vue';
import { userDataStore } from '@/stores/UserDataStore';

let userStore = userDataStore()
let userData = JSON.parse(userStore.user)

let isOpened = ref(false)


</script>

<template>
	<div class="profile_info">
		<h3>Bio & Goal</h3>
		<p class="closed" :class="{ opened: isOpened }">
			{{ userData.description }}
		</p>
		<p class="show-more-less" @click="isOpened = !isOpened">{{ isOpened ? 'Show less' : 'Show more' }}</p>

	</div>
</template>

<style scoped>
* {
	text-align: left;
}

.profile_info {
	width: auto;
	text-align: left;
	margin-top: 50px;
	margin-left: calc(25% /2 + 5px);
	margin-right: calc(25% /2 + 5px);
}

.closed {
	overflow: hidden;
	display: -webkit-box;
	line-clamp: 3;
	-webkit-line-clamp: 3;
	/* number of lines to show */
	-webkit-box-orient: vertical;
}

.opened {
	line-clamp: none;
	-webkit-line-clamp: none;

}

.show-more-less {
	color: grey;
}
</style>
