<script setup lang="ts">
import { IonButton } from '@ionic/vue';
import { VTab, VWindow, VWindowItem } from 'vuetify/lib/components/index.mjs';
import { IonContent, IonModal } from '@ionic/vue';

import SmallFeed from '@/view/Post/components/SmallFeed.vue';
import HeaderComponent from '../components/ClubGym/HeaderComponent.vue'
import BorderedPost from '@/view/Post/components/PostContainers/BorderedPost.vue';
import ChallengeThumbGrid from '@/view/Challenges/pages/ChallengeThumbGrid.vue';
import apiGym from '@/logic/API/apiGym';
import apiUser from '@/logic/API/apiUser';

const props = defineProps<{
	id: number
}>()

const baseUrl = await apiUser()

let gymInfo = await apiGym("gymInfo", props.id)
let buttonId = "open" + props.id

</script>

<template>
	<IonButton :id="buttonId" class="btn ion-no-padding" color="rgba(255, 255, 255, 0.103)">
		<img class="logo-img" :src="baseUrl + gymInfo.logo" alt="">
		<h1>{{ gymInfo.title }}</h1>
	</IonButton>
	<IonModal ref="modal" :trigger="buttonId">
		<IonContent>
			<HeaderComponent :logo="baseUrl + gymInfo.logo" :name="gymInfo.title" :id="props.id" />

			<VTabs v-model="tab" color="#e8e20a" bg-color="black" align-tabs="center" slider-color="#e8e20a"
				:grow='true'>
				<VTab><img class="tab-img" src="../../../assets/icons/feed.svg" alt="feed"></VTab>
				<VTab><img class="tab-img" src="../../../assets/icons/challenges.svg" alt="challenges"></VTab>
				<!-- Schovano z duvodu maturitni prace, neni cas na dodelani 
				<VTab><img class="tab-img" src="../../../assets/icons/challenge.svg" alt="chat"></VTab> -->
			</VTabs>

			<VWindow v-model="tab">
				<VWindowItem>
					<BorderedPost :index='0' :postId="10" />
				</VWindowItem>
				<VWindowItem>
					<ChallengeThumbGrid :type="1" />
				</VWindowItem>
				<!-- Schovano z duvodu maturitni prace, neni cas na dodelani
				<VWindowItem>
					<SmallFeed />
				</VWindowItem> -->
			</VWindow>
		</IonContent>
	</IonModal>
</template>

<script lang="ts">
export default {
	data: () => ({
		tab: null,
	}),
}
</script>

<style scoped>
.v-window {
	padding-top: 30px;
	height: fit-content;
	width: 100%;
	text-align: center;

}

.v-window__container {
	height: 100%;
	width: 100%;

}

.tab-img {
	height: 28px !important;
}

.btn {
	width: 90%;
	height: 80px;
	margin: 5px auto;
	text-align: center;
	border-radius: 10px;
	background-color: rgba(255, 255, 255, 0.1) !important;
}

h1 {
	font-size: clamp(28px, 7vw, 64px);
	font-weight: bold;
	color: white;
	position: absolute;
	top: 50%;
	left: 120px;
	transform: translateY(-50%);

}

.logo-img {
	display: inline;
	width: auto;
	height: 90%;
	aspect-ratio: 1;
	object-fit: contain;
	position: absolute;
	left: 20px;
}
</style>