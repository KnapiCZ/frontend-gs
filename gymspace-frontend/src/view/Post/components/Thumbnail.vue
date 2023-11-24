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

if (postUrl.match(".mp4")) {

	var input = document.getElementById('upload');
	var img = document.getElementById('thumbnail');

	input!.addEventListener('change', function (event) {
		var file = this.files[0];
		var url = URL.createObjectURL(file);

		var video = document.createElement('video');
		video.src = url;

		var snapshot = function () {
			var canvas = document.createElement('canvas');
			var ctx = canvas.getContext('2d');

			ctx!.drawImage(video, 0, 0, canvas.width, canvas.height);
			img!.src = canvas.toDataURL('image/png');

			video.removeEventListener('canplay', snapshot);
		};

		video.addEventListener('canplay', snapshot);

	});

}

</script>


<template>
	<input type="file" id="upload">
	<IonButton class="ion-no-padding" color="transparent" @click="setRouting(props.type)">
		<img :src="postUrl" alt="post thumbnail" id="thumbnail"> <!-- API thumbnail of post src-->
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