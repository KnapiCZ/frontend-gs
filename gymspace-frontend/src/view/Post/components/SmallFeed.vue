<script setup lang="ts">
import { userDataStore } from '@/stores/UserDataStore';

import Thumbnail from './Thumbnail.vue';
import apiUser from '@/logic/API/apiUser';

const userStore = userDataStore()

let posts = await apiUser("allUserPostsDetail", userStore.renderedUserId)
let baseUrl = await apiUser()

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
	aspect-ratio: 0.5;
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
