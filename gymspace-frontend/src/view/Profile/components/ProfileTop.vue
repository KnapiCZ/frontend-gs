<script setup lang="ts">
import { userDataStore } from '@/stores/UserDataStore';
import { IonCol, IonRow } from '@ionic/vue';
import UserMenu from '@/view/Menus/components/UserMenu.vue';
import apiUser from '@/logic/API/apiUser';

const baseURL = await apiUser()
const userStore = userDataStore();
let userData = JSON.parse(userStore.user)

function checkLogin() {
	if (userStore.renderedUserId == userStore.loggedUserId) return true;
	else return false;
}

</script>

<template>
	<div id="background" :style="{ backgroundImage: 'url(' + baseURL + userData.background_picture + ')' }">
		<UserMenu v-show="checkLogin()" />
		<div class="main-info-blur " :style="{ backgroundImage: 'url(' + baseURL + userData.background_picture + ')' }">
		</div>
		<div class="main-info">
			<img class='PFP' :src="baseURL + userData.profile_picture">
			<img class="check-mark" src="@/assets/icons/checkmark.svg"> <!-- API USER VERIFIED-->
			<IonRow>
				<IonCol>
					<p class="top-item1">{{ userStore.followersCount }}</p>
					<p class="bottom-item">Followers</p>
				</IonCol>
				<IonCol>
					<p class="top-item"> {{ userData.username }}</p>
					<p class="bottom-item">{{ userData.handle }}</p>
				</IonCol>
				<IonCol>
					<p class="top-item1">{{ userData.post_list.length }}</p>
					<p class="bottom-item">Posts</p>
				</IonCol>
			</IonRow>
		</div>
	</div>
</template>

<style scoped>
#background {
	position: relative;
	width: 100vw;
	aspect-ratio: 16/7.6;
	background-position: top;
	background-size: 100vw;
}

.main-info-blur {
	overflow: hidden;
	width: 80%;
	height: 70px;
	padding-top: 20px;
	position: absolute;
	bottom: calc((100% * -0.185));
	left: 50%;
	transform: translateX(-50%);
	background-position: bottom;
	background-size: 100vw;
	filter: blur(3px);
	border-radius: 10px;

}

.main-info {
	width: 80%;
	height: 70px;
	padding-top: 20px;
	position: absolute;
	bottom: calc((100% * -0.185));
	left: 50%;
	transform: translateX(-50%);
	border-radius: 10px;
	background-blend-mode: darken;
	background-color: rgba(0, 0, 0, 0.13);
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
	width: 20px;
	height: 20px;
	position: absolute;
	left: calc((100% / 1.8));
	top: 0px;
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

.menu-button {
	position: absolute;
	right: 15px;
	top: 10px;
}
</style>
