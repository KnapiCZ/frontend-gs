<script setup lang="ts">
import { VCard, VTabs, VTab, VWindow, VWindowItem } from 'vuetify/lib/components/index.mjs';
import { userDataStore } from '@/stores/UserDataStore';
import SmallFeed from '@/view/Post/components/SmallFeed.vue';
import ChallengeThumbGrid from '@/view/Challenges/pages/ChallengeThumbGrid.vue'
import apiPost from '@/logic/API/apiPost';
import apiChallenge from '@/logic/API/apiChallenge';

const userStore = userDataStore()
let posts = await apiPost('allUserPostId', userStore.renderedUserId);
userStore.userChallengeId = await apiChallenge('userChallengesId', userStore.renderedUserId)

</script>


<template>
	<VCard :key="userStore.renderedUserId">
		<VTabs v-model="tab" color="#fff000" bg-color="black" slider-color="#fff000" :grow='true'>
			<VTab><img src="@/assets/icons/feed.svg" alt="feed"></VTab>
			<VTab><img src="@/assets/icons/trophy.svg" alt="challenges"></VTab>
		</VTabs>
		<VWindow v-model="tab">
			<VWindowItem>
				<SmallFeed :userId="userStore.renderedUserId" :items="posts" />
			</VWindowItem>
			<VWindowItem>
				<ChallengeThumbGrid :type="0" />
			</VWindowItem>
		</VWindow>
	</VCard>
</template>


<script lang="ts">
export default {
	data: () => ({
		tab: null,
		isTrainer: true
	}),
}
</script>

<style scoped>
.v-card {
	background-color: black;
}

img {
	width: 28px !important;
}
</style>