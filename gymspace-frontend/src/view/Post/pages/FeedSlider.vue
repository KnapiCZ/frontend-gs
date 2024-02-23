<script setup lang="ts">
import FeedPost from '../components/Feed/FeedPost.vue';
import { IonPage, IonContent, IonToolbar, IonButtons, IonButton, IonTitle, useIonRouter } from '@ionic/vue';
import { userDataStore } from '@/stores/UserDataStore';
import { useRoute } from 'vue-router';

const router = useIonRouter()
const route = useRoute()



let init = route.params.initialPosition as unknown as Number
let userStore = userDataStore()

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
			<FeedPost v-for="data in userStore.userPostsId" :key="'post' + data + userStore.componentKey"
				:postId="(data as unknown as number)" />
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