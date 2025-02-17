<script setup lang="ts">
import { IonRow } from '@ionic/vue';
import { ref } from 'vue';
import ContactButton from './ContactButton.vue';
import FollowButton from '@/view/shared/components/FollowButton.vue';
import router from '@/router';

const renderedUserId = ref(router.currentRoute.value.params.id as unknown as number)

console.log(renderedUserId.value)
</script>

<template>
	<IonRow>
		<FollowButton :userId="renderedUserId" />
		<ContactButton :key="'contact' + renderedUserId" />

	</IonRow>
</template>


<style scoped></style>