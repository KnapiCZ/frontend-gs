<script setup lang="ts">
import { IonContent, IonPage, IonToolbar, IonButton } from '@ionic/vue';
import { userDataStore } from '@/stores/UserDataStore';
import { useRoute } from 'vue-router';
import { useIonRouter } from '@ionic/vue';
import ProfileTop from '../components/ProfileTop.vue'
import CurrentUserButton from '../components/Buttons/CurrentUserButton.vue';
import ProfileBasicInfo from '../components/ProfileBasicInfo.vue';
import TabBar from '../components/TabBar.vue';
import OtherUserButton from '../components/Buttons/OtherUserButton.vue';
import apiUser from '@/logic/API/apiUser';

const route = useRoute();
const userStore = userDataStore();
const router = useIonRouter()

userStore.renderedUserId = (route.params.id[0] as unknown) as number
userStore.user = JSON.stringify(await apiUser("userProfile", userStore.renderedUserId))


function checkLogin() {
	if (userStore.renderedUserId == userStore.loggedUserId) return true;
	else return false;
}
</script>

<template>
	<IonPage class="ion-no-padding">
		<IonContent class="ion-no-padding" id="user">
			<IonToolbar v-if="userStore.renderedUserId != userStore.loggedUserId">
				<IonButton slot="start" @click="router.back()" class="back-button" color="transparent">
					<img src="@/assets/icons/arrowRight.svg">
				</IonButton>
			</IonToolbar>
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
	padding-bottom: 56px;
	text-align: center;
}

.back-button {
	height: 100%;
	aspect-ratio: 1;
	margin: 5px 10px;
}

.back-button img {
	rotate: 180deg;
}
</style>