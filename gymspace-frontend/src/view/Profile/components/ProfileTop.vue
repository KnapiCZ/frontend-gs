<script setup lang="ts">
import { userDataStore } from '@/stores/UserDataStore';
import { IonCol, IonRow } from '@ionic/vue';

let props = defineProps<{
	profile_picture_url: string,
	background_picture_url: string,
	username: string,
	followers: number,
	posts: number,
	trainer_status: boolean,
}>()

const userStore = userDataStore();

</script>

<template>
	<div id="background" :style="{ backgroundImage: 'url(' + background_picture_url + ')' }">
		<div class="main-info " :style="{ backgroundImage: 'url(' + background_picture_url + ')' }">
			<img class='PFP' :src="profile_picture_url">
			<img class="check-mark" src="../../../assets/icons/checkMark.svg"> <!-- API USER VERIFIED-->
			<IonRow>
				<IonCol>
					<p class="top-item1">{{ userStore.followersCount }}</p>
					<p class="bottom-item">followers</p>
				</IonCol>
				<IonCol>
					<p class="top-item"> {{ username }}</p>
					<p v-if="props.trainer_status" class="bottom-item">Trainer</p>
				</IonCol>
				<IonCol>
					<p class="top-item1">{{ posts }}</p>
					<p class="bottom-item">posts</p>
				</IonCol>
			</IonRow>
		</div>
	</div>
</template>

<style scoped>
#background {
	position: relative;
	width: 100vw;
	height: 180px;
	background-size: 100vw 215px;
	background-position: top;
}

.main-info {
	width: 75%;
	height: 70px;
	padding-top: 20px;
	position: absolute;
	bottom: -35px;
	left: 50%;
	transform: translateX(-50%);
	background-position: bottom;
	background-size: 100vw 215px;
	background-blend-mode: darken;
	background-color: rgba(0, 0, 0, 0.5);
	color: white;
	border-radius: 10px;
}

.PFP {
	width: 80px;
	height: 80px;
	border-radius: 50%;
	background-color: black;
	object-fit: contain;
	position: absolute;
	left: 50%;
	top: -60px;
	transform: translateX(-50%);

}

.check-mark {
	width: 60px;
	height: 60px;
	position: absolute;
	left: calc((100% / 2));
	top: -20px;
}

.top-item,
.top-item1 {
	font-weight: bold;
}

.top-item1 {
	line-height: 22px;
	font-size: 20px;
}

.bottom-item {
	font-size: 12px;
}
</style>
