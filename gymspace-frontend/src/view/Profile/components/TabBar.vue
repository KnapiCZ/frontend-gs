<script setup lang="ts">
import { VCard, VTabs, VTab, VWindow, VWindowItem } from 'vuetify/lib/components/index.mjs';
import { sharedDataStore } from '@/stores/SharedDataStore'
import SmallFeed from '@/view/Post/components/SmallFeed.vue';
import ChallengeThumbGrid from '@/view/Challenges/pages/ChallengeThumbGrid.vue'

let props = defineProps({
	trainer_status: Boolean,
})

function updateKey() {
	sharedData.componentKey += 1
}

let sharedData = sharedDataStore()


</script>


<template>
	<VCard>
		<VTabs v-model="tab" color="#fff000" bg-color="black" slider-color="#fff000" :grow='true'>
			<VTab><img src="@/assets/icons/feed.svg" alt="feed"></VTab>
			<VTab><img src="@/assets/icons/trophy.svg" alt="challenges"></VTab>
			<!-- Schovano z duvodu maturitni prace, neni cas na dodelani 
				<VTab :value="2"><img src="@/assets/icons/challenges.svg" alt="trainer"></VTab>
				<VTab :value="1" v-if="trainer_status"><img src="@/assets/icons/trainer.svg" alt="trainer">
				</VTab>
			-->
		</VTabs>
		<VWindow v-model="tab">
			<VWindowItem>
				<SmallFeed />
			</VWindowItem>
			<VWindowItem>
				<ChallengeThumbGrid :type="0" />
			</VWindowItem>
			<!-- Schovano z duvodu maturitni prace, neni cas na dodelani 
				<VWindowItem :value="2" :transition="false" :reverse-transition="false">
					<SmallFeed />
				</VWindowItem>
				<VWindowItem v-if="props.trainer_status" :value="1" :transition="false" :reverse-transition="false">
					<SmallFeed />
				</VWindowItem>
			-->
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