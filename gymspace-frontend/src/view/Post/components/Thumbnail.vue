<script setup lang="ts">
import apiUser from '@/logic/API/apiUser';
import { IonButton, useIonRouter } from '@ionic/vue';
import { userDataStore } from '@/stores/UserDataStore';

const router = useIonRouter()
const userStore = userDataStore()

const props = defineProps<{
	ImageSource: string,
	postID?: number,
	type: string // typ = kde se thumbnail nachazi profil -> bude routovat na profil/x/post/, community -> bude routovat na community/explore 
}>()

const baseUrl = await apiUser()
const postUrl = `${baseUrl}${props.ImageSource}`


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

</script>



<template>
	<IonButton class="ion-no-padding" color="transparent" @click="setRouting(props.type)">
		<img :src="postUrl" alt=""> <!-- API thumbnail of post src-->
	</IonButton>
</template>

<style scoped>
img {
	width: 100%;
	aspect-ratio: 0.5;
	object-fit: cover;
	border-radius: 10px;

}
</style>