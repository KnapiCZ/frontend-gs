<script setup lang="ts">
import { userDataStore } from '@/stores/UserDataStore';
import { IonCol, IonRow } from '@ionic/vue';
import UserMenu from '@/view/Menus/components/UserMenu.vue';
import FollowersModal from './FollowersModal.vue';
import apiPost from '@/logic/API/apiPost';

//TODO: udelat modal following tak jako modal na gymy na mape (v kodu) / opravit tento


const userStore = userDataStore();
const logged_user = localStorage.getItem("logged_user_id")


let userData = JSON.parse(userStore.user)
let posts = await apiPost('usersPosts', userStore.renderedUserId);

function checkLogin() {
	if (userStore.renderedUserId == logged_user) return true;
	else return false;
}

let isUserVerified = userData.isUserVerified ?? 1;

</script>

<template>
	<div id="background" :style="{ backgroundImage: 'url(' + userData.background_picture + ')' }">
		<UserMenu v-show="checkLogin()" />
		<div class="blur-wrapper">
			<div class="main-info-blur " :style="{ backgroundImage: 'url(' + userData.background_picture + ')' }">
			</div>
		</div>
		<div class="main-info">
			<div class="profile-image-container">
				<img class="profile-image" :src="userData.profile_picture">
				<img v-if="isUserVerified" class="verified-icon" src="../../../assets/icons/checkMark.svg" />
			</div>
			<IonRow>
				<IonCol id="followers-modal">
					<p class="top-item1">{{ userData.followers.length }}</p>
					<p class="bottom-item">Followers</p>
				</IonCol>
				<IonCol>
					<p class="top-item"> {{ userData.username }}</p>
					<p class="bottom-item">{{ userData.username }}</p>
				</IonCol>
				<IonCol>
					<p class="top-item1">{{ posts.length }}</p>
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
	padding-top: 10px;
	position: absolute;
	bottom: calc((100% * -0.185));
	left: 50%;
	transform: translateX(-50%);
	border-radius: 10px;
	background-color: rgba(0, 0, 0, 0.315);
}

.profile-image-container {
	margin-top: -70px;
	position: relative;
	display: inline-block;
	width: 80px;
	height: 80px;
}

.profile-image {
	width: 100%;
	height: 100%;
	border-radius: 50%;
	object-fit: cover;
	border: 2px solid white;
}

.verified-icon {
	position: absolute;
	bottom: 5px;
	right: 5px;
	width: 20px;
	height: 20px;
	background: yellow;
	border-radius: 50%;
	border: 2px solid white;
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
