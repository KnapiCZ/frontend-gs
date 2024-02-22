<script setup lang="ts">
import { userDataStore } from '@/stores/UserDataStore';

import Thumbnail from './Thumbnail.vue';
import apiPost from '@/logic/API/apiPost';

const userStore = userDataStore()

let getPosts = await apiPost("allUserPostsDetail", userStore.renderedUserId)
userStore.userPosts = JSON.stringify(getPosts)
let posts = JSON.parse(userStore.userPosts).posts
</script>

<template>
	<div class="grid-container">
		<Thumbnail v-for="data in posts" :ImageSource="data.media[0]" :postID="data.id" type="user" class="grid-item" />
	</div>
</template>

<style>
.grid-container {
	display: grid;
	width: 100%;
	grid-template-columns: 33% 33% 33%;
	margin: 0;
}

.grid-item {
	text-align: center;
	aspect-ratio: 1/1.5;
	object-fit: cover;
	width: fit-content;
	margin: 1px;
}

@media screen and (min-width: 1200px) {
	.grid-container {
		display: grid;
		width: 30%;
		grid-template-columns: 33% 33% 33%;
	}
}
</style>
