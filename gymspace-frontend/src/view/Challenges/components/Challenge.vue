<script setup lang="ts">
import { ref } from 'vue';
import apiChallenge from '@/logic/API/apiChallenge';
import { userDataStore } from '@/stores/UserDataStore';

let userData = userDataStore();
let keyChange = 0
const props = defineProps<{
	id: number
}>();

let data = await apiChallenge('challengeInfo', props.id);
let progress = await apiChallenge('getProgress', props.id, userData.loggedUserId);
let progressValue = ref(progress.progress)
let progressCount = ref(0)
let progressCompleted = ref(progress.completed)


function checkJoined() {
	if (data.members.includes(userData.loggedUserId)) {
		progressCount.value = progressValue.value / data.goal * 100;
		return true;
	}
	else false;
}

let isJoined = ref(checkJoined());

async function joinChallenge() {
	await apiChallenge('joinChallenge', props.id, userData.loggedUserId)
	progress = await apiChallenge('getProgress', props.id, userData.loggedUserId);
	progressValue = ref(progress.progress)
	isJoined.value = true
}

async function updateProgress() {
	progressCount.value = progressValue.value / data.goal * 100;
	await apiChallenge('updateProgress', props.id, userData.loggedUserId, progressValue.value)
	if (progressCount.value == 100) {
		progressCompleted.value = true
	}
}

</script>

<template>
	<div :key="'challenge' + props.id + keyChange" id="challenge-div" :class="{ active: isJoined }">
		<img src="../../../assets/icons/trophy.svg" alt="">
		<h3>{{ data.title }}</h3>
		<p>{{ data.description }}</p>
		<p v-if="isJoined" id="progress-count">{{ progressValue }}/{{ data.goal }}</p>

		<div v-show="isJoined && !progressCompleted" id="progress-bar">
			<div id="progress" :style="{ width: progressCount + '%' }"></div>
		</div>

		<div v-if="!progressCompleted" class="challenge-button-wrapper">
			<div v-if="isJoined" id="joined-buttons">
				<button id="add-progress" @click="() => { progressValue += 1; updateProgress() }">Add +1</button>
				<button id="complete-progress"
					@click="() => { progressValue = data.goal; updateProgress() }">Finish</button>
			</div>
			<button v-else id="join-challenge" @click="joinChallenge()">Join Challenge</button>
		</div>
		<p v-else id="completed">Completed</p>

	</div>
</template>


<style scoped>
img {
	margin: 10px;
	width: 20%;
}

#challenge-div {
	color: white;
	width: auto;
	aspect-ratio: 1;
	margin: 1px;
	text-align: center;
	border-radius: 15px;
	border: 2px solid #d8d7d74f;
	background-color: #d8d7d74f;
}

#challenge-div.active {
	border: 1px solid #fff000;
}

#progress-bar {
	margin: 5px auto 10px auto;
	width: 90%;
	height: 4px;
	background-color: black;
}

#progress {
	background-color: #fff000;
	width: 50px;
	height: 4px
}

.challenge-button-wrapper {
	position: relative;
	margin-top: auto !important;
	margin-bottom: 0px !important;
	width: 100%;
	height: 32px;
}

#joined-buttons {
	text-align: center;
	display: flex;
	flex-direction: row;
	width: 100%;
	height: 32px;
}

#add-progress,
#complete-progress,
#join-challenge {
	width: 45%;
	color: black;
	background-color: white;
	font-size: 16px;
	font-weight: bold;
}

#add-progress {
	margin-left: auto;
	border-radius: 10px 0 0 10px;
}

#complete-progress {
	margin-right: auto;
	border-radius: 0 10px 10px 0;
	background-color: yellow;
}

#join-challenge,
#completed {
	height: 32px;
	width: 90%;
	margin: auto;
	color: #fff000;
	background-color: black;
	border-radius: 10px;
	line-height: 32px;
	font-size: 14px;
	font-weight: bold;
	vertical-align: middle;
}
</style>