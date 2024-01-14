<script setup lang="ts">
import apiPost from '@/logic/API/apiPost'
import apiUser from '@/logic/API/apiUser'

import FeedPost from '../components/Feed/FeedPost.vue';
import { IonPage, IonContent, IonToolbar, IonButtons, IonButton, IonTitle, useIonRouter } from '@ionic/vue';
import { useRoute } from 'vue-router';

const router = useIonRouter()
const baseUrl = await apiPost()
const route = useRoute()


let id = route.params.id as unknown as number
let init = route.params.initialPosition as unknown as Number

let posts = await apiPost("allUserPostsDetail", id)
let creatorInfo = await apiUser("smallUserProfile", id)

function scrollToPost() {
	if (document.getElementById('post' + init)) {
		var ele = document.getElementById('post' + init);
		ele?.scrollIntoView()
	} else {
		setTimeout(scrollToPost, 100);
	}
}

scrollToPost()

</script>

<template>
	<IonPage class="ion-no-padding">
		<IonToolbar>
			<IonButtons slot="start">
				<IonButton @click="router.back()" class="back-button"><img src="@/assets/icons/arrowRight.svg">
				</IonButton>
			</IonButtons>
			<IonTitle>Posts</IonTitle>
		</IonToolbar>
		<IonContent class="ion-no-padding" id="MainContainer">
			<FeedPost v-for="post in  posts.posts" :id="'post' + post.id" :userId="creatorInfo.id"
				:username="creatorInfo.username" :userhandle="creatorInfo.handle"
				:userPpf="baseUrl + creatorInfo.profile_picture" :postId="post.id" :description="post.body"
				:date="post.post_time" :image="baseUrl + post.media[0]" />
		</IonContent>
	</IonPage>
</template>

<style scoped>
#MainContainer {
	position: relative;
	width: 100vw;
	background-color: black;
	text-align: center;
}

.back-button {
	height: 100%;
	aspect-ratio: 1;
}

.back-button img {
	rotate: 180deg;
}
</style>