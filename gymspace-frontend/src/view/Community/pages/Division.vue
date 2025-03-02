<script setup lang="ts">
import { VTab, VWindow, VWindowItem } from 'vuetify/lib/components/index.mjs';
import { IonContent, IonPage } from '@ionic/vue';
import { useRoute } from 'vue-router';

import HeaderComponent from '../components/HeaderComponent.vue';
import ChallengeThumbGrid from '@/view/Challenges/pages/ChallengeThumbGrid.vue';
import apiGym from '@/logic/API/apiGym';
import apiPost from '@/logic/API/apiPost';
import DivisionFeed from '../components/tabs/DivisionFeed.vue';

const route = useRoute()
let id = route.params.id as unknown as number
let divisionInfo = await apiGym('info', id, undefined, 'logo,title,id')
let gymPosts = await apiPost("divisionPosts", id)

</script>

<template>
	<IonPage>
		<IonContent>
			<HeaderComponent type="division" :logo="divisionInfo.logo" :name="divisionInfo.title" :id="id" />
			<LevelComponent :level="divisionInfo.level" :currentXP="divisionInfo.points" :nextLevelXP="12000"
				:gymPoints="divisionInfo.points" color="#ffff00"  />
			<VTabs v-model="tab" color="#e8e20a" bg-color="black" align-tabs="center" slider-color="#e8e20a"
				:grow='true'>
				<VTab><img class="tab-img" src="../../../assets/icons/feed.svg" alt="feed"></VTab>
				<VTab><img class="tab-img" src="../../../assets/icons/challenges.svg" alt="challenges"></VTab>
			</VTabs>

			<VWindow v-model="tab">
				<VWindowItem>
					<DivisionFeed :divisionId="id" :items="gymPosts" />
				</VWindowItem>
				<VWindowItem>
					<ChallengeThumbGrid :type="1" />
				</VWindowItem>
			</VWindow>
		</IonContent>
	</IonPage>
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
	padding-top: 20px;
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

h2 {
	font-size: clamp(20px, 6vw, 64px);
	font-weight: bold;
	color: white;
	position: absolute;
	top: 50%;
	left: 120px;
	transform: translateY(-50%);
}

.small-button {
	width: 95%;
	aspect-ratio: 1/1.5;
	text-align: center;
	border-radius: 10px;
	margin: auto;
	border: 1px #fff000 solid;
	background-color: rgba(255, 255, 255, 0.1) !important;
}

.small-logo-img {
	width: 100%;
	aspect-ratio: 1;
	border-radius: 10px;
	object-fit: contain;
}

.btn {
	width: 90%;
	height: 80px;
	margin: 5px auto;
	text-align: center;
	border-radius: 10px;
	background-color: rgba(255, 255, 255, 0.1) !important;
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