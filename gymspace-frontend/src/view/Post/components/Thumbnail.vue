<script setup lang="ts">
import apiPost from '@/logic/API/apiPost';
import { IonButton, useIonRouter } from '@ionic/vue';
import { userDataStore } from '@/stores/UserDataStore';

const router = useIonRouter()
const userStore = userDataStore()

const props = defineProps<{
	postID?: number,
	path: string // typ = kde se thumbnail nachazi profil -> bude routovat na profil/x/post/, community -> bude routovat na community/explore 

}>()
const baseUrl = await apiPost()

let media = await apiPost("getPost", props.postID)
let postUrl = `${baseUrl}${media.media[0]}`


function setRouting() {
	router.push(props.path)
}

function checkImage() {
	if (/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(postUrl)) { return true }
	else { return false }
}


</script>


<template>
	<IonButton class="ion-no-padding" color="transparent" @click="setRouting()">
		<img v-if="checkImage()" :src="postUrl" alt="post thumbnail" class="thumbnail">
		<video v-else :src="postUrl" alt="post thumbnail" class="thumbnail" key="haha"></video>
	</IonButton>
</template>

<style scoped>
img,
video {
	width: 100%;
	aspect-ratio: 1/1.5;
	object-fit: cover;
	border-radius: 10px;

}

video {
	pointer-events: none;
}
</style>