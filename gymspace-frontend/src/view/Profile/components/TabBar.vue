<script setup lang="ts">
import { userDataStore } from '@/stores/UserDataStore';
import { useIonRouter } from '@ionic/vue';
import SmallFeed from '@/view/Post/components/SmallFeed.vue';
import ChallengeThumbGrid from '@/view/Challenges/pages/ChallengeThumbGrid.vue'
import apiChallenge from '@/logic/API/apiChallenge';
import apiPost from '@/logic/API/apiPost';
import { ref } from 'vue';
import router from '@/router';
// TODO: REDESIGN AFTER FIGMA DESIGN APPROVED !!!
// TODO: REDESIGN AFTER FIGMA DESIGN APPROVED !!!
// TODO: REDESIGN AFTER FIGMA DESIGN APPROVED !!!
const userStore = userDataStore()
const route = useIonRouter()

const renderedUserId = ref(router.currentRoute.value.params.id as unknown as number)
let posts = await apiPost('usersPosts', renderedUserId.value)

//userStore.userChallengeId = await apiChallenge('userChallengesId', userStore.renderedUserId)

</script>


<template>
	<!-- 
		<VCard :key="renderedUserId">
			<VTabs v-model="tab" color="#fff000" bg-color="black" slider-color="#fff000" :grow='true'>
			<VTab><img src="@/assets/icons/feed.svg" alt="feed"></VTab>
			<VTab><img src="@/assets/icons/trophy.svg" alt="challenges"></VTab>
			<VBtn
			class="v-btn v-tab-item--selected v-tab--selected v-theme--light v-btn--density-default v-btn--size-default v-btn--variant-text v-tab"
			role="tab" style="background: transparent; color: rgb(255, 240, 0); caret-color: rgb(255, 240, 0);"
			@click='route.push("/user/" + renderedUserId + "/trainer");'><img src="@/assets/icons/trainer.svg"
			alt="trainer"></VBtn>
		</VTabs>
		<VWindow v-model="tab">
			<VWindowItem>
				<SmallFeed :userId="renderedUserId" :items="posts" />
			</VWindowItem>
			<VWindowItem>
				<ChallengeThumbGrid :type="0" />
			</VWindowItem>
		</VWindow>
	</VCard>
	-->
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