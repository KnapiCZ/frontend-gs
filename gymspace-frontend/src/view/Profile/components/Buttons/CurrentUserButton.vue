<script setup lang="ts">

import { IonRow } from '@ionic/vue';
import ContactButton from './ContactButton.vue';
import EditProfile from './EditProfile.vue';

</script>


<template>
	<IonRow>
		<EditProfile class="user-button" />

		<button class="user-button">
			Share
		</button>
		<ContactButton class="user-button"></ContactButton>

	</IonRow>
</template>
  
  
<style scoped>
ion-row {
	margin-top: 10px;
	width: 100vw;
}

.user-button {
	width: 30%;
	height: 30px;
	padding: 5px auto;
	margin: 10px auto;
	text-align: center;
	background-color: rgb(47, 47, 47);
	font-weight: bold;
	border-radius: 10px;
}
</style>


