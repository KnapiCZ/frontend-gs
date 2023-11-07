<script setup lang="ts">
import { IonPage, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonButton, useIonRouter } from '@ionic/vue';
import { userDataStore } from '@/stores/UserDataStore';
import apiAuth from '@/logic/API/apiAuth';
import apiUser from '@/logic/API/apiUser';

const router = useIonRouter()
const userStore = userDataStore()

let confirmedUser: { log: string }

await apiAuth('confirmAuth').then((confirm) => {
	confirmedUser = confirm
}).catch((error) => { console.log(error) })

if (confirmedUser!.log != 'not logged in') {
	userStore.loggedUserId = confirmedUser!.log as unknown as number
}
else {
	router.navigate('/login')
}

let baseUrl = await apiAuth()
let profilePicture: string

await apiUser("userProfile", userStore.loggedUserId).then((loggedUser) => {
	profilePicture = `${baseUrl}${loggedUser.profile_picture}`
})
</script>


<template>
	<IonPage class="ion-no-padding">
		<IonTabs class="ion-no-padding">
			<IonRouterOutlet></IonRouterOutlet>
			<ion-tab-bar slot="bottom">
				<ion-tab-button tab="user" class="no-filter" :href="'/user/' + userStore.loggedUserId">
					<img id="profile" class="no-filter" :src="profilePicture" />
				</ion-tab-button>

				<ion-tab-button tab="community" href="/community/">
					<img src="../../../assets/icons/community.svg" alt="">
				</ion-tab-button>

				<ion-button tab="plus" color="transparent">
					<img src="../../../assets/icons/plus.png" alt="">
				</ion-button>

				<ion-tab-button tab="shop" href="/community/">
					<img src="../../../assets/icons/shop.svg" alt="">
				</ion-tab-button>

				<ion-tab-button tab="forYou" href="/foryou/">
					<img src="../../../assets/icons/for_you.svg" alt="">
				</ion-tab-button>
			</ion-tab-bar>
		</IonTabs>
	</IonPage>
</template>


<script lang="ts">
export default {
	data: () => ({ value: 4 }),
}


</script>


<style scoped>
.tab-selected {
	filter: brightness(0) saturate(100%) invert(68%) sepia(69%) saturate(521%) hue-rotate(15deg) brightness(108%) contrast(105%);
	background-color: transparent !important;
}

.no-filter {
	filter: none !important;
}

#profile {
	height: 70%;
	aspect-ratio: 1 !important;
	object-fit: contain;
	border-radius: 50%;
	border: 2px solid transparent !important;
}

.tab-selected #profile {
	border: 2px solid yellow !important;
}
</style>