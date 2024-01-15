<script setup lang="ts">
import { userDataStore } from '@/stores/UserDataStore';

import Thumbnail from './Thumbnail.vue';
import apiPost from '@/logic/API/apiPost';

const userStore = userDataStore()

let posts = await apiPost("allUserPostsDetail", userStore.renderedUserId)

</script>

<template>
	<div class="grid-container">
		<Thumbnail v-for="data in posts.posts" :ImageSource="data.media[0]" :postID="data.id" type="user"
			class="grid-item" />
	</div>
</template>

<style>
.grid-container {
	display: grid;
	width: 100%;
	grid-template-columns: auto auto auto;
}

.grid-item {
	text-align: center;
	aspect-ratio: 1/1.5;
	object-fit: cover;
	width: fit-content;
	margin: 5px;

}

@media screen and (min-width: 1200px) {
	.grid-container {
		display: grid;
		width: 30%;
		grid-template-columns: auto auto auto;
	}


}
</style>
