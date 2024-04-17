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
		<ContactButton :key="'contact' + userStore.componentKey" />
	</IonRow>
</template>