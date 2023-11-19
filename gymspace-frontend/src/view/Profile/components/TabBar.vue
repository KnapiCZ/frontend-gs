<script setup lang="ts">
import { VCard, VTabs, VTab, VWindow, VWindowItem } from 'vuetify/lib/components/index.mjs';
import SmallFeed from '@/view/Post/components/SmallFeed.vue';

let props = defineProps({
	trainer_status: Boolean,
})
</script>


<template>
	<VCard>
		<VTabs v-model="tab" color="#fff000" bg-color="black" align-tabs="center" slider-color="#fff000" :grow='true'>
			<VTab><img src="@/assets/icons/feed.svg" alt="feed"></VTab>
			<VTab><img src="@/assets/icons/challenges.svg" alt="challenges"></VTab>
			<VTab v-if="trainer_status"><img src="@/assets/icons/trainer.svg" alt="trainer"></VTab>
		</VTabs>
		<VWindow v-model="tab">
			<VWindowItem>
				<SmallFeed />
			</VWindowItem>
			<VWindowItem>
				<SmallFeed />
			</VWindowItem>
			<VWindowItem v-if="trainer_status">
				<SmallFeed />
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
	padding-left: 10px;
	padding-right: 10px;
}
</style>
