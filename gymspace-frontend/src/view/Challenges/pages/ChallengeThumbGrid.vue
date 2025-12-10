<script setup lang="ts">
import { userDataStore } from '@/stores/UserDataStore';

import Challenge from '../components/Challenge.vue';
import apiChallenge from '@/logic/API/apiChallenge';
// TODO: REDESIGN AFTER FIGMA DESIGN APPROVED !!!
// TODO: REDESIGN AFTER FIGMA DESIGN APPROVED !!!
// TODO: REDESIGN AFTER FIGMA DESIGN APPROVED !!!

const props = defineProps<{
	type: number
}>()

const userStore = userDataStore()

let allChallenges = await apiChallenge('none')
console.log(allChallenges)



let types = {
	0: userStore.userChallengeId,
	1: [] as number[]
}

for (let i = 0; i < allChallenges.length; i++) {
	types[1].push(allChallenges[i].id as unknown as number)
}
</script>

<template>
	<div class="grid-container">
		<Challenge v-for="data in types[props.type as keyof typeof types]" :id="data" class="grid-item" type="user" />
	</div>
</template>

<style scoped>
.grid-container {
	display: grid;
	width: 100%;
	grid-template-columns: 50% 50%;
	margin: 0;
}

.grid-item {
	text-align: center;
}
</style>
