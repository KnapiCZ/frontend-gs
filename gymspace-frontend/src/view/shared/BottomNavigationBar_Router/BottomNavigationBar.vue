<script setup lang="ts">
import { IonPage, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, useIonRouter } from '@ionic/vue';
import { userDataStore } from '@/stores/UserDataStore';
import apiAuth from '@/logic/API/apiAuth';
import apiUser from '@/logic/API/apiUser';
import apiDivision from '@/logic/API/apiDivision';
import apiGym from '@/logic/API/apiGym';

const router = useIonRouter()
const userStore = userDataStore()

let baseUrl = await apiAuth()
let confirmedUser: { log: string }
let profilePicture: string


await apiAuth('confirmAuth').then((confirm) => {
	confirmedUser = confirm
}).catch((error) => {
	console.log("HAHA NEFUNGUJE")
	router.navigate('/login')
})

if (confirmedUser!.log != 'not logged in' || (localStorage.getItem('Token') == undefined)) {
	userStore.loggedUserId = confirmedUser!.log as unknown as number
}
else {
	router.replace('/login')
}

await apiUser("userProfile", userStore.loggedUserId).then((loggedUser) => {
	profilePicture = `${baseUrl}${loggedUser.profile_picture}`
})

let myDivisions = await apiDivision('myDivisions', userStore.loggedUserId)
let myGyms = await apiGym('myGyms', userStore.loggedUserId)
let allGyms = await apiGym('allGyms')
let index


for (let i = 0; i < myGyms.length; i++) {
	index = allGyms.indexOf(myGyms[i])
	allGyms.splice(index, 1)
}

userStore.userDivisionId = myDivisions
userStore.userGymId = myGyms
userStore.allGymsId = allGyms

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

				<ion-tab-button tab="postadd" href="/addPost">
					<img src="../../../assets/icons/plusbutton.svg" alt="">
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
img {
	height: 70%;
}

.tab-selected {
	filter: brightness(0) saturate(100%) invert(84%) sepia(22%) saturate(3283%) hue-rotate(4deg) brightness(112%) contrast(103%);
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
	border: 2px solid #fff000 !important;
}
</style>
