<script setup lang="ts">
import apiPost from '@/logic/API/apiPost';
import { IonButton, useIonRouter } from '@ionic/vue';

const router = useIonRouter()

const props = defineProps<{
	postID?: number,
	path: string // typ = kde se thumbnail nachazi profil -> bude routovat na profil/x/post/, community -> bude routovat na community/explore 

}>()

let media = await apiPost("getPost", props.postID)
let postUrl = `${media.media[0]}`


function setRouting() {
	router.push(props.path)
}

// TODO: az budou posty jen videa tak smazat tag img a odkomentarovat video tag

</script>


<template>
	<IonButton class="ion-no-padding" color="transparent" @click="setRouting()">
		<img :src="postUrl" alt="post thumbnail" class="thumbnail">
		<!--	<video:src="postUrl" alt="post thumbnail" class="thumbnail"></video>	-->
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