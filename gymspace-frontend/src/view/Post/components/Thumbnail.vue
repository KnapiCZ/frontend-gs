<script setup lang="ts">
import apiPost from '@/logic/API/apiPost';
import { IonButton, useIonRouter } from '@ionic/vue';
import { userDataStore } from '@/stores/UserDataStore';

const router = useIonRouter()
const userStore = userDataStore()

const props = defineProps<{
	ImageSource: string,
	postID?: number,
	type: string // typ = kde se thumbnail nachazi profil -> bude routovat na profil/x/post/, community -> bude routovat na community/explore 
}>()

const baseUrl = await apiPost()
let postUrl = `${baseUrl}${props.ImageSource}`


function setRouting(type: string) {
	switch (type) {
		case 'user':
			router.push('/user/' + userStore.renderedUserId + '/post/' + props.postID)
			break

		case 'community':
			router.push('/community/explore')
			break
	}
}

function checkImage() {
	if (/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(postUrl)) {
		return true
	}
	else {
		return false

	}
}


</script>


<template>
	<IonButton class="ion-no-padding" color="transparent" @click="setRouting(props.type)">
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