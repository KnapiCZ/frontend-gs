<script setup lang="ts">
import { IonRow } from '@ionic/vue';
import { ref } from 'vue';
import ContactButton from './ContactButton.vue';
import FollowButton from '@/view/shared/components/FollowButton.vue';
import router from '@/router';

const renderedUserId = ref(router.currentRoute.value.params.id as unknown as number)
</script>

<template>
	<div class="row">
		<div class="column" id="followers-modal">
			<IonButton class="profile-button">Contact</IonButton>
			<p class="bottom-item">Followers</p>
			<p class="bottom-item">Followers</p>
		</div>
		<div class="column">
			<p class="top-item"> {{ username }}</p>
			<p class="bottom-item">{{ username }}</p>
		</div>
		<div class="column">
			<p class="top-item1">{{ count_posts }}</p>
			<p class="bottom-item">Posts</p>
		</div>
	</div>
	<IonRow>
		<FollowButton :userId="renderedUserId" />
		<ContactButton :key="'contact' + renderedUserId" />

	</IonRow>
</template>


<style scoped></style>