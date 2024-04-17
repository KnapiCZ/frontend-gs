<script setup lang="ts">
import ContactButton from './ContactButton.vue';
import { IonRow } from '@ionic/vue';
import FollowButton from '@/view/shared/components/FollowButton.vue';
import { userDataStore } from '@/stores/UserDataStore';

const userStore = userDataStore()


</script>

<template>
	<IonRow>
		<FollowButton :userId="userStore.renderedUserId" />
		<ContactButton :key="'contact' + userStore.componentKey" />

	</IonRow>
</template>


<style scoped></style>