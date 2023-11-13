<script setup lang="ts">
import { IonCard, IonCardContent, IonCol, IonRow, useIonRouter } from '@ionic/vue';
import apiUser from '@/logic/API/apiUser';
import { ref } from 'vue';

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

const router = useIonRouter();
const isLiked = ref()
const x = await apiUser("postLiked", props.userId, props.postId)

if (x.liked === 'true') { isLiked.value = true }
else { isLiked.value = false }

console.log(x.liked)
console.log(isLiked.value)

function goToUser(id: number) {
	router.push('/user/' + id)
}

function likeIt() {
	isLiked.value = !isLiked.value
	console.log(isLiked.value)
}

</script>

<template>
	<IonCard :id="'postCard' + postId">
		<img class="postImage" :src="props.image">
		<IonCardContent>
			<p class="description">{{ description }}</p>
			<p class="date-posted">{{ date }}</p>
			<hr id="separator">
			<IonRow>
				<img class="pfp" :src="props.userPpf" @click="goToUser(props.userId)">
				<IonCol>
					<p class="nickname" @click="goToUser(props.userId)">{{ username }}</p>
					<p class="handle" @click="goToUser(props.userId)">{{ userhandle }}</p>
				</IonCol>
				<button class="postBtn">
					<img src="../../../../assets/icons/comments.svg">
				</button>
				<button class="postBtn" @click="likeIt()">
					<img :class="{ like: isLiked }" src="../../../../assets/icons/like2.svg">
				</button>

			</IonRow>
		</IonCardContent>
	</IonCard>
</template>

<style scoped>
* {
	color: white;
}

.description {
	font-size: 16px;
}

.date-posted {
	color: gray;
}

.pfp {
	width: 50px !important;
	height: 50px !important;
	object-fit: contain;
	aspect-ratio: 1;
	margin: auto 10px 10px auto;
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

.postBtn {
	margin: auto 10px;
}

.postBtn:focus {
	animation: liking 0.5s ease-in-out;
	-webkit-animation: liking 0.5s ease-in-out;
}

.postBtn:active {
	-webkit-animation: none;
	animation: none;
}

.like {
	filter: brightness(0) saturate(100%) invert(77%) sepia(97%) saturate(487%) hue-rotate(359deg) brightness(104%) contrast(101%)
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
	border-radius: 2px;
	color: gray;
}

.postImage {
	width: 90%;
	margin: 20px auto;
	border-radius: 10px;
}

button {
	width: 10%;
	height: min-content;
	margin: auto 10px;
	border-radius: 0 !important;
}

@keyframes liking {
	from {
		transform: scale(1)
	}

	25% {
		transform: scale(0.95)
	}

	50% {
		transform: scale(1.1)
	}

	75% {
		transform: scale(0.95)
	}

	to {
		transform: scale(1)
	}
}

@-webkit-keyframes liking {
	from {
		-webkit-transform: scale(1)
	}

	30% {
		-webkit-transform: scale(1.5)
	}

	to {
		-webkit-transform: scale(1)
	}
}
</style>