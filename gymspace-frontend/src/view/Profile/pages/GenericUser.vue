<script setup lang="ts">
import ProfileTop from '../components/ProfileTop.vue'
import CurrentUserButton from '../components/Buttons/CurrentUserButton.vue';
import ProfileBasicInfo from '../components/ProfileBasicInfo.vue';
import TabBar from '../components/TabBar.vue';
import OtherUserButton from '../components/Buttons/OtherUserButton.vue';
import apiUser from '@/logic/API/apiUser';
import { IonContent, IonPage } from '@ionic/vue';
import { userDataStore } from '@/stores/UserDataStore';
import { useRoute } from 'vue-router';

const route = useRoute();
const userStore = userDataStore()

let id = route.params.id as unknown as number

userStore.user = JSON.stringify(await apiUser("userProfile", id))

let userData = JSON.parse(userStore.user)
userStore.renderedUserId = id
userStore.followersCount = userData.followers

function checkLogin() {
	if (id == userStore.loggedUserId) return true;
	else return false;
}

</script>

<template>
	<IonPage class="ion-no-padding" :key="id">
		<IonContent class="ion-no-padding" id="user">
			<div class="page-div">
				<ProfileTop :key="userStore.componentKey" />

				<ProfileBasicInfo :key="userStore.componentKey + 100" />
				<CurrentUserButton v-if="checkLogin()" />
				<OtherUserButton v-else />
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