<script setup lang="ts">
import ProfileTop from '../components/ProfileTop.vue'
import CurrentUserButton from '../components/Buttons/CurrentUserButton.vue';
import ProfileBasicInfo from '../components/ProfileBasicInfo.vue';
import TabBar from '../components/TabBar.vue';
import OtherUserButton from '../components/Buttons/OtherUserButton.vue';
import apiUser from '@/logic/API/apiUser';
import UserMenu from '@/view/Menus/components/UserMenu.vue';
import { IonContent, IonPage } from '@ionic/vue';
import { userDataStore } from '@/stores/UserDataStore';
import { useRoute } from 'vue-router';

const route = useRoute();
const userStore = userDataStore()

let id = route.params.id as unknown as number
let userData = await apiUser("userProfile", id)

const baseUrl = await apiUser()
let profile_picture_url = `${baseUrl}${userData.profile_picture}`
let background_picture_url = `${baseUrl}${userData.background_picture}`

const init = () => {
	userStore.renderedUserId = id
	userStore.followersCount = userData.followers
}

function checkLogin() {
	if (id == userStore.loggedUserId) return true;
	else return false;
}

init()
</script>

<template>
	<IonPage class="ion-no-padding" :key="id">
		<UserMenu></UserMenu>
		<IonContent class="ion-no-padding" id="user">
			<div class="page-div">
				<ProfileTop :profile_picture_url="profile_picture_url" :background_picture_url="background_picture_url"
					:username="userData.username" :followers="userData.followers" :posts="userData.post_list.length"
					:trainer_status="userData.trainer_status" />

				<ProfileBasicInfo :description="userData.description" :email="userData.email"
					:rendered-user-id="userData.id" />
				<CurrentUserButton v-if="checkLogin()" :renderedUserId="userData.id"
					:loggedInUserId="userStore.loggedUserId" />
				<OtherUserButton v-else :renderedUserId="userData.id" :loggedUserId="userStore.loggedUserId" />
				<TabBar :trainer_status="userData.trainer_status" />
			</div>
		</IonContent>
	</IonPage>
</template>

<style scoped>
.page-div {
	margin: 0;
	padding: 0;
	padding-bottom: 56px;
	text-align: center;
	background-color: black;
}
</style>