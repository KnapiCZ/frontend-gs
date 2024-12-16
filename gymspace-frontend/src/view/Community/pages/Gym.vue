<script setup lang="ts">
import { IonContent, IonPage } from '@ionic/vue';
import { VTab, VWindow, VWindowItem } from 'vuetify/lib/components/index.mjs';
import { useRoute } from 'vue-router';
import HeaderComponent from '../components/HeaderComponent.vue'
import apiGymDiv from '@/logic/API/apiGymDiv';
import General from '../components/tabs/General.vue';
import GymFeed from '../components/tabs/GymFeed.vue';
import apiPost from '@/logic/API/apiPost';

const route = useRoute()
let id = route.params.id as unknown as number
let gymInfo = await await apiGymDiv('info', "gym", id, undefined, 'logo,title,id')
let gymPosts = await apiPost("gymPosts", id)

</script>

<template>
	<IonPage>
		<IonContent>
			<HeaderComponent type="gym" :logo="gymInfo.logo" :name="gymInfo.title" :id="id" />

			<VTabs v-model="tab" color="#e8e20a" bg-color="black" align-tabs="center" slider-color="#e8e20a"
				:grow='true'>
				<VTab><img class="tab-img" src="../../../assets/icons/challenge.svg" alt="feed"></VTab>
				<VTab><img class="tab-img" src="../../../assets/icons/feed.svg" alt="challenges"></VTab>
			</VTabs>
			<VWindow v-model="tab">
				<VWindowItem>
					<General :gymId="id" />
				</VWindowItem>
				<VWindowItem>
					<GymFeed :gymId="id" :items="gymPosts" />
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
	padding-top: 10px;
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

h2 {
	font-size: clamp(20px, 6vw, 64px);
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