<script setup lang="ts">
import { IonPage, IonContent, IonSearchbar } from '@ionic/vue';
import { userDataStore } from '@/stores/UserDataStore';
import { ref } from 'vue';
import CommunityButton from '../components/CommunityButton.vue';
import 'swiper/css';

const userStore = userDataStore()
let isActive = [false, false, false]
let multiplier = ref([userStore.userGymId.length, userStore.userDivisionId.length, userStore.allGymsId.length])

function toggle(value: number) {
	let count = ref([userStore.userGymId.length, userStore.userDivisionId.length, userStore.allGymsId.length])
	if (!isActive[value - 1]) {
		isActive[value - 1] = true
		document.getElementById("arrow" + value)!.style.rotate = "90deg";
		document.getElementById("extend" + value)!.style.height = (count.value[value - 1] * 90) + "px";
	}
	else {
		isActive[value - 1] = false
		document.getElementById("arrow" + value)!.style.rotate = "0deg"
		document.getElementById("extend" + value)!.style.height = multiplier.value[value - 1] * 90 + "px";
	}
}

function init() {
	if (document.getElementById('extend1') && document.getElementById('extend2') && document.getElementById('extend3')) {
		for (let i = 0; i < 3; i++) {
			if (multiplier.value[i] > 4) { multiplier.value[i] = 3 }
			if (multiplier.value[i] == 0) { multiplier.value[i] = 0.25 }
			document.getElementById('extend' + (i + 1))!.style.height = multiplier.value[i] * 90 + 'px';
		}
	} else { setTimeout(init, 10); }
}

init()

</script>

<template>
	<IonPage class="ion-no-padding">
		<IonContent class="ion-no-padding">
			<IonSearchbar placeholder="Search"></IonSearchbar>
			<img class="background" src="../../../assets/images/Background.png">

			<button @click="toggle(1)">Your Gyms <img v-show="userStore.userGymId.length > 3" id="arrow1"
					src="../../../assets/icons/arrowRight.svg"></button>
			<div id="extend1" :key="userStore.componentKey">
				<CommunityButton v-if="userStore.userGymId.length != 0" v-for="gym in userStore.userGymId" type="gym"
					:id="gym" :key="'gym' + userStore.componentKey + gym" />
				<p v-else>You are not in Gym</p>
			</div>

			<button @click="toggle(2)">Your Divisions <img v-show="userStore.userDivisionId.length > 3" id="arrow2"
					src="../../../assets/icons/arrowRight.svg"></button>
			<div id="extend2" :key="userStore.componentKey + 10">
				<CommunityButton v-if="userStore.userDivisionId.length != 0"
					v-for="division in userStore.userDivisionId" type="division" :id="division"
					:key="'division' + userStore.componentKey + division" divisionType="big" />
				<p v-else>You are not in Division</p>
			</div>
			<button @click="toggle(3)">Find new Gym <img v-show="userStore.allGymsId.length > 3" id="arrow3"
					src="../../../assets/icons/arrowRight.svg"></button>
			<div id="extend3" :key="userStore.componentKey + 20">
				<CommunityButton v-for="gym in userStore.allGymsId" type="gym" :id="gym"
					:key="'newGym' + userStore.componentKey + gym" />
			</div>
		</IonContent>
	</IonPage>
</template>

<style scoped>
ion-searchbar {
	margin: auto;
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
#extend2,
#extend3 {
	width: auto;
	height: 270px;
	overflow: hidden;
	text-align: center;
	transition: height 0.2s cubic-bezier(0.19, 1, 0.22, 1);
}

#arrow1,
#arrow2,
#arrow3 {
	margin: 0 10px;
}

button {
	text-align: left;
	width: 90%;
	margin: 20px 0 10px 20px;
	font-size: 18px;
	font-weight: bold;
}
</style>
