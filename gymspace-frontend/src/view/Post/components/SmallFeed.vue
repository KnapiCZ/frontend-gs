<script setup lang="ts">
import { userDataStore } from '@/stores/UserDataStore';

import Thumbnail from './thumbnail.vue';
import json from '../../../assets/mocs/profilepost.json'
import apiPost from '@/logic/API/apiPost';

const userStore = userDataStore()

const posts = await apiPost("getUserPost", 2)
const recommended = await apiPost("recommendedPosts", 1)

console.log(posts)
console.log(recommended)


</script>


<template>
	<div class="grid-container">
		<Thumbnail v-for="data in myJson" :ImageSource="data.thumbSRC" :postID="data.id" type="community"
			class="grid-item" />
	</div>
</template>


<script lang="ts">
export default {
	data: () => ({
		myJson: json,
	}),
}
</script>

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
