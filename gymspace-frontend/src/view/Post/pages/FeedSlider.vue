<script setup lang="ts">
import BorderedPost from '../components/PostContainers/BorderedPost.vue';
import { IonPage, IonContent, IonToolbar, IonButtons, IonButton, IonTitle, useIonRouter } from '@ionic/vue';
import { userDataStore } from '@/stores/UserDataStore';
import { useRoute } from 'vue-router';
import apiPost from '@/logic/API/apiPost';

const router = useIonRouter()
const route = useRoute()



let userStore = userDataStore()
let init = route.params.initialPosition as unknown as number
let id = route.params.id as unknown as number

let post = await apiPost("allUserPostId", id)
userStore.userPostsKey = []

function scrollToPost() {
	if (document.getElementById('postCard' + init)) {
		var ele = document.getElementById('postCard' + init);
		ele?.scrollIntoView()
	} else {
		setTimeout(scrollToPost, 10);
	}
}

function addPostKey() {
	userStore.userPostsKey.push(0)
	return 'post'
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
			<BorderedPost v-for="(data, index) in post" :key="addPostKey() + data + userStore.userPostsKey[index]"
				:postId="(data as unknown as number)" :index="index" />
		</IonContent>
	</IonPage>
</template>

<style scoped>
#MainContainer {
	position: relative;
	width: 100vw;
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