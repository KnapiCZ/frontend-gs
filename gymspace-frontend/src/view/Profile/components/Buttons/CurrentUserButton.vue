<script setup lang="ts">

import { IonRow } from '@ionic/vue';
import ContactButton from './ContactButton.vue';
import EditProfile from './EditProfile.vue';
import { userDataStore } from '@/stores/UserDataStore';

let userStore = userDataStore()

</script>


<template>
	<IonRow>
		<EditProfile :key="userStore.componentKey + 200" />

		<button id="user-button">
			Share
		</button>
		<ContactButton id="user-button" />

	</IonRow>
</template>
  
  
<style scoped>
ion-row {
	margin-top: 10px;
}

#user-button {
	width: 32%;
	height: 30px;
	margin: auto;
	text-align: center;
	font-size: 16px;
	background-color: rgb(47, 47, 47);
	font-weight: bold;
	border-radius: 5px;
}
</style>