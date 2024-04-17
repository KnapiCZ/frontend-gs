<script setup lang="ts">
import { IonCard, IonCardContent, IonCol, IonRow, useIonRouter } from '@ionic/vue';

import LikeButton from '@/view/shared/components/LikeButton.vue'
import OptionsButton from '../OptionsButton.vue'
import apiPost from '@/logic/API/apiPost';
import apiUser from '@/logic/API/apiUser';
import { userDataStore } from '@/stores/UserDataStore';

const userStore = userDataStore()

const props = defineProps<{
	index: number
	postId: number
}>()

const months = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December'
]

let post = await apiPost("getPost", props.postId)
let creatorInfo = await apiUser("smallUserProfile", post.author)

let time = setTime()
let baseUrl = await apiPost()

let postImg = baseUrl + post.media[0]
let userPFP = baseUrl + creatorInfo.profile_picture

const router = useIonRouter();

function goToUser() { router.push('/user/' + post.author) }

function checkImage() {
	if (/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(postImg)) {
		return true
	}
	else { return false }
}

function setTime() {
	let postTimestamp = new Date(post.post_time)
	let current_time = new Date()
	let difference = new Date(current_time.getTime() - postTimestamp.getTime())

	// pokud uz je jiny rok nez byl post pridan
	if (difference.getFullYear() !== 1970) {
		return postTimestamp.getDate() + ' ' + months[postTimestamp.getMonth()] + ' ' + postTimestamp.getFullYear()
	}

	// pokud je stejny den, mesic a rok jako byl post vydan
	if (difference.getFullYear() == 1970 && difference.getMonth() == 0 && difference.getDate() == 1) {
		if (difference.getHours() > 2) {
			return difference.getHours() + " hours ago"
		}
		if (difference.getHours() == 2) {
			return difference.getHours() - 1 + " hour ago"
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

	//pokud je stejny rok jako byl post vydan ale starsi nez den
	if (difference.getDate() > 13) {
		return postTimestamp.getDate() + ' ' + months[postTimestamp.getMonth()]
	}
	if (difference.getDate() >= 7) {
		return "1 week ago"
	}
	if (difference.getDate() > 1) {
		return difference.getDate() + " days ago" + postTimestamp, current_time
	}
	if (difference.getDate() == 1) {
		return difference.getDate() + " day ago" + postTimestamp, current_time
	}

}
</script>

<template>
	<IonCard :id="'postCard' + post.id">
		<img v-if="checkImage()" class="postImage" :src="postImg">
		<video v-else autoplay="true" loop="true" class="postImage" :src="postImg"></video>
		<OptionsButton v-if="post.author == userStore.loggedUserId" :postId="post.id" :userId="post.author"
			:description="post.description" />
		<IonCardContent>
			<p class="description">{{ post.description }}</p>
			<p class="date-posted">{{ time }}</p>
			<hr id="separator">
			<IonRow>
				<img class="pfp" :src="userPFP" @click="goToUser()">
				<IonCol>
					<p class="nickname" @click="goToUser()">{{ creatorInfo.username }}</p>
					<p class="handle" @click="goToUser()">{{ creatorInfo.handle }}</p>
				</IonCol>
				<LikeButton class="postBtn" :userId="userStore.loggedUserId" :postId="post.id" />
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
	color: rgb(190, 190, 190);
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
	color: rgb(179, 178, 178);
	line-height: 10px;

}

.postBtn img {
	height: 28px;
}

ion-card {
	width: 100%;
	margin-bottom: 10px;
	background-color: rg b(48, 48, 48);
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
	color: rgb(201, 201, 201);
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