<script setup lang="ts">
import { userDataStore } from '@/stores/UserDataStore';
import { IonCol, IonRow } from '@ionic/vue';
import UserMenu from '@/view/Menus/components/UserMenu.vue';
import apiUser from '@/logic/API/apiUser';
import FollowersModal from './FollowersModal.vue';
import apiPost from '@/logic/API/apiPost';
import router from '@/router';
import { ref } from 'vue';

const baseURL = await apiUser()
const userStore = userDataStore();
const logged_user = localStorage.getItem("logged_user_id") as unknown as number
const renderedUserId = ref(router.currentRoute.value.params.id as unknown as number)

let userData = JSON.parse(userStore.user)
let posts = await apiPost('usersPosts', renderedUserId.value);

function checkLogin() {
	if (renderedUserId.value == logged_user) return true;
	else return false;
}

</script>

<template>
	<div id="background" :style="{ backgroundImage: 'url(' + baseURL + userData.background_picture + ')' }">
		<UserMenu v-show="checkLogin()" />
		<div class="blur-wrapper">
			<div class="main-info-blur "
				:style="{ backgroundImage: 'url(' + baseURL + userData.background_picture + ')' }">
			</div>
		</div>
		<div class="main-info">
			<img class='PFP' :src="baseURL + userData.profile_picture">
			<IonRow>
				<IonCol id="followers-modal">
					<p class="top-item1">{{ userData.followers }}</p>
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
	<FollowersModal :key="userStore.renderedUserId" />

</template>

<style scoped>
#background {
	position: relative;
	width: 100vw;
	aspect-ratio: 16/7.6;
	background-position: top;
	background-size: 100vw;
}

.blur-wrapper {
	overflow: hidden;
	width: 80%;
	height: 70px;
	position: absolute;
	bottom: calc((100% * -0.185));
	left: 50%;
	transform: translateX(-50%);
	border-radius: 10px;
}

.main-info-blur {
	position: relative;
	width: 100%;
	height: 100%;
	background-position: bottom;
	background-size: 100vw;
	filter: blur(2px);
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
