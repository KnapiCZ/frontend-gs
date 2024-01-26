<script setup lang="ts">
import apiUser from '@/logic/API/apiUser';
import ContactButton from './ContactButton.vue';
import { IonRow } from '@ionic/vue';
import { ref } from 'vue';
import { userDataStore } from '@/stores/UserDataStore';

const isFollowing = ref()
const userStore = userDataStore()

let followingList = await apiUser('isFollowing', userStore.renderedUserId, 2)
console.log(followingList)

function following(followers: []) {
	if (followers.includes(userStore.loggedUserId as never)) {
		isFollowing.value = true;
	}
	else {
		isFollowing.value = false;
	}
}

async function follow() {
	if (isFollowing.value) {
		userStore.followersCount--
	} else {
		userStore.followersCount++

	}
	await apiUser("follow",
		userStore.loggedUserId,
		2).then((isFollowing.value as any) = (!isFollowing.value as any))
}

following(followingList.followers)
</script>

<template>
	<IonRow>
		<button id="followButton" class="profileButtons" :class="{ follow: !isFollowing }" @click="follow">
			{{ isFollowing ? 'Following' : 'Follow' }}
		</button> <!-- vytvorit api na follow -->
		<ContactButton class="profileButtons"></ContactButton>

	</IonRow>
</template>
  
  
<style scoped>
ion-row {
	width: 100%;
}

.profileButtons {
	width: 40%;
	height: 30px;
	padding: 5px;
	margin: 20px auto;
	background-color: #2F2F2F;
	font-weight: bold;
	border-radius: 10px;
	transition: background-color 0.5s ease-in-out;
}

.follow {
	background-color: #fff000;
	color: black;
}
</style>