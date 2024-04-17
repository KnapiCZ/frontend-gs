<script setup lang="ts">
import { IonContent, IonPage } from '@ionic/vue';
import { userDataStore } from '@/stores/UserDataStore';
import { useRoute } from 'vue-router';
import ProfileTop from '../components/ProfileTop.vue'
import CurrentUserButton from '../components/Buttons/CurrentUserButton.vue';
import ProfileBasicInfo from '../components/ProfileBasicInfo.vue';
import TabBar from '../components/TabBar.vue';
import OtherUserButton from '../components/Buttons/OtherUserButton.vue';
import apiUser from '@/logic/API/apiUser';

const route = useRoute();
const userStore = userDataStore();

userStore.renderedUserId = route.params.id as unknown as number
userStore.user = JSON.stringify(await apiUser("userProfile", userStore.renderedUserId))


function checkLogin() {
	if (userStore.renderedUserId == userStore.loggedUserId) return true;
	else return false;
}
</script>

<template>
	<IonPage class="ion-no-padding">
		<IonContent class="ion-no-padding" id="user">
			<ProfileTop :key="userStore.renderedUserId + userStore.componentKey" />
			<ProfileBasicInfo :key="userStore.renderedUserId + userStore.componentKey + 100" />
			<CurrentUserButton v-if="checkLogin()" />
			<OtherUserButton v-else />
			<TabBar />
		</IonContent>
	</IonPage>
</template>

<style scoped>
#user {
	margin: 0;
	padding: 0;
	padding-bottom: 56px;
	text-align: center;
	background-color: black;
}
</style>