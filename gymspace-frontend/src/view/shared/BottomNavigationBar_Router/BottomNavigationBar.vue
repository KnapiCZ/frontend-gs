<script setup lang="ts">
import { IonPage, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, useIonRouter } from '@ionic/vue';
import { userDataStore } from '@/stores/UserDataStore';
import apiAuth from '@/logic/API/apiAuth';
import apiUser from '@/logic/API/apiUser';
import apiGym from '@/logic/API/apiGym';

const router = useIonRouter()
const userStore = userDataStore()

let confirmedUser: { log: string }
let profilePicture: string

await apiAuth('confirmAuth').then((confirm) => {
	confirmedUser = confirm
}).catch(() => {
	console.log("HAHA NEFUNGUJE")
	router.replace('/login')
})
console.debug("[DEBUG] " + confirmedUser!.log)
if ((confirmedUser!.log != undefined) || (localStorage.getItem('Token') != undefined)) {
	userStore.loggedUserId = confirmedUser!.log as unknown as number
}
else {
	router.push('/login')
}

await apiUser("userProfile", userStore.loggedUserId, undefined, 'profile_picture').then((loggedUser) => {
	profilePicture = `${loggedUser.profile_picture}`
})

let myDivisions = await apiGym('my', userStore.loggedUserId)
let myGyms = await apiGym('my', userStore.loggedUserId)
let allGyms = await apiGym('all')
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
			<IonTabBar slot="bottom">
				<IonTabButton tab="user" class="no-filter" :href="'/user/' + userStore.loggedUserId">
					<img id="profile" class="no-filter" :src="profilePicture" />
				</IonTabButton>

				<IonTabButton tab="community" href="/community/">
					<img src="../../../assets/icons/community.svg" alt="">
				</IonTabButton>

				<IonTabButton tab="postadd" href="/addPost">
					<img src="../../../assets/icons/plusbutton.svg" alt="">
				</IonTabButton>
				<IonTabButton tab="forYou" href="/explore/">
					<img src="../../../assets/icons/for_you.svg" alt="">
				</IonTabButton>
			</IonTabBar>
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
	height: 60%;
	aspect-ratio: 1;
}

IonTabBar {
	background-color: black !important;
}

IonTabButton {
	max-width: 0px;
}

.tab-selected {
	filter: brightness(0) saturate(100%) invert(84%) sepia(22%) saturate(3283%) hue-rotate(4deg) brightness(112%) contrast(103%);
	background-color: transparent !important;
}

.no-filter {
	filter: none !important;
}

#profile {
	object-fit: contain;
	border-radius: 50%;
	border: 2px solid transparent !important;
}

.tab-selected #profile {
	border: 2px solid #fff000 !important;
}
</style>
