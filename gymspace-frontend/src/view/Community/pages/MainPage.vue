<script setup lang="ts">
import { IonPage, IonContent, IonSearchbar } from '@ionic/vue';
import { userDataStore } from '@/stores/UserDataStore';
import GymModal from './GymModal.vue';
import DivisionModal from './DivisionModal.vue';
import apiGym from '@/logic/API/apiGym';
import apiPost from '@/logic/API/apiPost';

import 'swiper/css';
import { SwiperSlide, Swiper } from 'swiper/vue';

const userStore = userDataStore()

userStore.userGymId = []

let initialNumber = 0
let isActive = [false, false]
let data = await apiGym('myGyms', userStore.loggedUserId)

for (let i = 0; i < data.gyms.length; i++) {
	userStore.userGymId.push(data.gyms[i].id)
}

function toggle(value: number) {
	let multiplier = userStore.userGymId.length
	if (multiplier > 3) { multiplier = 3 }
	if (!isActive[value - 1]) {
		isActive[value - 1] = true
		document.getElementById("arrow" + value)!.style.rotate = "90deg";
		document.getElementById("extend" + value)!.style.height = (userStore.userGymId.length * 90) + "px";
	}
	else {
		isActive[value - 1] = false
		document.getElementById("arrow" + value)!.style.rotate = "0deg"
		document.getElementById("extend" + value)!.style.height = multiplier * 90 + "px";
	}
}


function init() {
	let multiplier = userStore.userGymId.length
	if (multiplier > 3) { multiplier = 3 }
	if (document.getElementById('extend1') && document.getElementById('extend2')) {
		document.getElementById('extend1')!.style.height = multiplier * 90 + 'px';
		document.getElementById('extend2')!.style.height = multiplier * 90 + 'px';

	} else {
		setTimeout(init, 10);
	}
}

init()

</script>

<template>
	<ion-page class="ion-no-padding">

		<IonContent class="ion-no-padding">
			<IonSearchbar placeholder="Search"></IonSearchbar> <!--   :items vrati to co uzivatel hleda-->

			<img class="background" src="../../../assets/images/Background.png">


			<button @click="toggle(1)">Your Gyms <img id="arrow1" src="../../../assets/icons/arrowRight.svg"></button>
			<div id="extend1">
				<GymModal v-if="userStore.userGymId.length !== 0" v-for="gym in userStore.userGymId" :id="gym"
					:key="'gym' + userStore.componentKey + gym" />
				<p v-else>You are not in Gym</p>
			</div>

			<button @click="toggle(2)">Your Clubs <img id="arrow2" src="../../../assets/icons/arrowRight.svg"></button>
			<div id="extend2">
				<DivisionModal v-if="userStore.userDivisionId.length !== 0" v-for="division in userStore.userDivisionId"
					:id="division" :key="'gym' + userStore.componentKey + division" />
				<p v-else>You are not in Division</p>
			</div>

			<section>
				<h2>Featured posts </h2>
				<!--<Swiper id="swiperlol" :slides-per-view="3" :space-between="15">
					<SwiperSlide v-for="(source, index) in data">
						<Thumbnail :ImageSource="data[index]" type="community" />
					</SwiperSlide>
				</Swiper> -->
			</section>
		</IonContent>
	</ion-page>
</template>

<style scoped>
ion-searchbar {
	margin: 10px auto;
}

#swiperlol {
	height: 100px;
}

.background {
	position: fixed;
	width: 100vw;
	height: 100vh;
	object-fit: contain;
	object-position: center;
	z-index: -1;
}

#extend1,
#extend2 {
	width: auto;
	height: 270px;
	overflow: hidden;
	text-align: center;
	transition: height 0.2s cubic-bezier(0.19, 1, 0.22, 1);

}

#arrow1,
#arrow2 {
	margin: 0 10px;

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
