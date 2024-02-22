<script setup lang="ts">
import { IonCard, IonCardContent, IonCol, IonRow, useIonRouter } from '@ionic/vue';

import LikeButton from '@/view/shared/components/LikeButton.vue'
import OptionsButton from '../OptionsButton.vue'

const props = defineProps<{
	userId: number
	username: string
	userhandle: string
	userPpf: string

	postId: number
	description: string
	date: string
	image: string

}>()
let time = setTime()


const router = useIonRouter();

function goToUser() { router.push('/user/' + props.userId) }

function checkImage() {
	if (/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(props.image)) {
		return true
	}
	else { return false }
}

function setTime() {
	let postTimestamp = new Date(props.date)
	let current_time = new Date()
	let difference = new Date(current_time.getTime() - postTimestamp.getTime())
	if (difference.getDay() >= 7) {
		return postTimestamp.getDate() + ". " + postTimestamp.getMonth()
	}
	if (difference.getDate() > 1) {
		return difference.getDate() + " days ago"
	}
	if (difference.getDate() == 1) {
		return difference.getDate() + " day ago"
	}
	if (difference.getHours() > 1) {
		return difference.getHours() + " hours ago"
	}
	if (difference.getHours() == 1) {
		return difference.getHours() + " hour ago"
	}
	if (difference.getMinutes() > 1) {
		return difference.getMinutes() + " minutes ago"
	}
	if (difference.getMinutes() == 1) {
		return difference.getMinutes() + " minute ago"
	}
	if (difference.getSeconds() >= 1) {
		return difference.getSeconds() + " seconds ago"
	}
}

setTime()

</script>

<template>
	<IonCard :id="'postCard' + props.postId">
		<img v-if="checkImage()" class="postImage" :src="props.image">
		<video v-else autoplay="true" loop="true" class="postImage" :src="props.image"></video>
		<OptionsButton :postId="props.postId" :userId="props.userId" :description="$props.description" />
		<IonCardContent>
			<p class="description">{{ description }}</p>
			<p class="date-posted">{{ time }}</p>
			<hr id="separator">
			<IonRow>
				<img class="pfp" :src="props.userPpf" @click="goToUser()">
				<IonCol>
					<p class="nickname" @click="goToUser()">{{ username }}</p>
					<p class="handle" @click="goToUser()">{{ userhandle }}</p>
				</IonCol>
				<button class="postBtn">
					<img src="@/assets/icons/save.svg">
				</button>
				<button class="postBtn">
					<img src="@/assets/icons/comments.svg">
				</button>

				<LikeButton class="postBtn" :userId="props.userId" :postId="props.postId" />
			</IonRow>
		</IonCardContent>
	</IonCard>
</template>

<style scoped>
* {
	color: white;
}

.description {
	font-size: 13px;
	line-clamp: 5;
}

.date-posted {
	color: gray;
	font-size: 11px;
}

#popover-button {
	position: absolute;
	right: 10px;
	bottom: 20px;
}

.pfp {
	width: 50px !important;
	height: 50px !important;
	object-fit: contain;
	aspect-ratio: 1;
	margin: auto 10px 10px auto;
	border-radius: 50%;
}

.nickname {
	font-size: 24px;
	font-weight: bold;
}

.handle {
	margin: auto;
	color: gray;
	line-height: 10px;

}

.postBtn img {
	height: 28px;
}

ion-card {
	width: 95%;
	margin: auto auto 30px auto;
	background-color: rgba(66, 66, 66, 0.507);
	border-radius: 20px;
}

ion-card-content {
	width: auto;
	text-align: left;
	margin: 0 20px;
	padding: 0;
}

ion-row {
	height: fit-content;
}

ion-col {
	display: flexbox;
	align-items: center;
}

hr {
	width: 100%;
	margin: 10px auto;
	border-radius: 3px;
	color: gray;
}

.postImage {
	width: 100%;
	height: auto;
	margin: auto;
	margin-bottom: 10px;
}

button {
	width: 10%;
	height: min-content;
	margin: auto 5px;
	border-radius: 0 !important;
}
</style>