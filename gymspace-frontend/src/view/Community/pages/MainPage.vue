<script setup lang="ts">
import { IonPage, IonContent, IonSearchbar, IonToolbar } from '@ionic/vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { ref } from 'vue';
import { userDataStore } from '@/stores/UserDataStore';
import { gymDataStore } from '@/stores/GymDataStore';

import Thumbnail from '@/view/Post/components/Thumbnail.vue';
import json from "@/assets/mocs/profilepost.json"
import GymButton from '../components/GymButton.vue';
import apiGym from '@/logic/API/apiGym';
import apiPost from '@/logic/API/apiPost';

import 'swiper/css';

const userStore = userDataStore()
const gymStore = gymDataStore()
const baseUrl = await apiGym()

gymStore.updateData(userStore.loggedUserId)

let recommended_posts = await apiPost('recommendedPosts', userStore.loggedUserId);
let postData = new Array()
let data

for (let postNumber = 2; postNumber <= recommended_posts.posts.length; postNumber++) {
	data = await apiPost("getUserPost", postNumber)
	postData.push(data)
}

let isActive = ref([true, true])

async function toggle(value: number) {
	if (value != null) {
		if (isActive.value[value - 1]) {
			isActive.value[value - 1] = false
			document.getElementById("extend" + value)!.classList.add("active")
			document.getElementById("arrow" + value)!.style.rotate = "90deg";
		}
		else {
			isActive.value[value - 1] = true
			document.getElementById("extend" + value)!.classList.remove("active")
			document.getElementById("arrow" + value)!.style.rotate = "0deg"

		}
	}
}


</script>

<template>
	<IonPage class="ion-no-padding">
		<IonContent class="ion-no-padding">
			<img class="background" src="../../../assets/images/Background.png">
			<IonToolbar>
				<ion-searchbar placeholder="Custom Placeholder"></ion-searchbar> <!--   :items vrati to co uzivatel hleda-->
			</IonToolbar>

			<button @click="toggle(1)">Your Gyms <img id="arrow1" src="../../../assets/icons/arrowRight.svg"></button>
			<div id="extend1">
				<GymButton v-if="gymStore.gymButtons.length !== 0" v-for="(gym) in gymStore.gymButtons" :key="gym.id"
					:title="gym.title" :ImageSRC="baseUrl + gym.logo" :id="gym.id" />
				<p v-else>You are not in Gym</p>
			</div>

			<button @click="toggle(2)">Your Clubs <img id="arrow2" src="../../../assets/icons/arrowRight.svg"></button>
			<div id="extend2">
				<GymButton v-if="gymStore.gymButtons.length !== 0" v-for="(gym) in gymStore.gymButtons" :key="gym.id"
					:title="gym.title" :ImageSRC="baseUrl + gym.logo" :id="gym.id" />
				<p v-else>You are not in Club</p>
			</div>

			<section>
				<h2>Featured posts </h2>
				<Swiper :slides-per-view="3" :space-between="15">
					<SwiperSlide v-for="object in myJson" :key="object.id">
						<Thumbnail :ImageSource="object.thumbSRC" />
					</SwiperSlide>
				</Swiper>
			</section>
		</IonContent>
	</IonPage>
</template>



<script lang="ts">
export default {
	data: () => ({
		myJson: json,
	}),
}

</script>

<style scoped>
.background {
	position: absolute;
	width: 100vw;
	height: 100vh;
	object-fit: cover;
	object-position: center;
	z-index: -1;
}

#extend1,
#extend2 {
	width: auto;
	height: 100px;
	overflow: hidden;

}

#arrow1,
#arrow2 {
	margin: 0 10px;

}

.active {
	height: fit-content !important;

}

button {
	width: 200px;
	margin: 20px 0 10px 0;
	font-size: 18px;
	font-weight: bold;
}

section {
	margin: 20px 10px;
}
</style>