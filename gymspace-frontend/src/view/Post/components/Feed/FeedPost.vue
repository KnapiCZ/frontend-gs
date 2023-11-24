<script setup lang="ts">
import { IonCard, IonCardContent, IonCol, IonRow, useIonRouter } from '@ionic/vue';
import LikeButton from '@/view/shared/components/LikeButton.vue'

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

function goToUser(id: number) { router.push('/user/' + id) }

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