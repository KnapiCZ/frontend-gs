<script setup lang="ts">
import { IonButton, IonButtons, IonModal, IonRow, IonToolbar, IonTitle, modalController } from '@ionic/vue';
import apiGym from '@/logic/API/apiGym';
import { gymDataStore } from '@/stores/GymDataStore';

const gymStore = gymDataStore()

const gymData = await apiGym('gymInfo', gymStore.openedGym)
const baseUrl = await apiGym()

</script>

<template>
	<IonButton id="parent" :style="{ backgroundImage: 'url(' + baseUrl + gymData.logo + ')' }" color="rgba(0,0,0,0)">
		<IonModal ref="modal" trigger="parent">
			<IonToolbar>
				<IonButtons slot="start">
					<IonButton @click="modalController.dismiss" class="back-button" color="rgba(0,0,0,0)"><img
							src="../../../../assets/icons/arrowRight.svg"></IonButton>
				</IonButtons>
				<IonTitle>Description</IonTitle>
			</IonToolbar>
			<div class=" top-info">
				<img class="logo" :src="baseUrl + gymData.logo">
				<h1 class="name">{{ gymData.title }}</h1>
				<p>{{ gymData.subtitle }}</p>
			</div>

			<div class="description">
				<h2>Description</h2>
				<p>{{ gymData.description }}</p>
			</div>

			<div class="creator">
				<h2>Created by</h2>
				<IonRow>
					<img class="pfp" :src="baseUrl + gymData.logo" alt="">
					<p>@gymspace</p>
				</IonRow>
			</div>
		</IonModal>
	</IonButton>
</template>

<style scoped>
#parent {
	width: 30vw;
	aspect-ratio: 1;
	background-position: center;
	background-size: contain;
}

.back-button {
	height: 100%;
	aspect-ratio: 1;
}

.back-button img {
	rotate: 180deg;
}



.top-info {
	text-align: center;
	margin: 0 20px 0 20px;
}

.description {
	margin: 0 20px 0 20px;
}

.description p {
	font-size: 12px;
}

.logo {
	width: 40%;
	margin: 10px;
}

.creator {
	margin: 0 20px 30px 20px;
}

.pfp {
	height: 40px;
}
</style>