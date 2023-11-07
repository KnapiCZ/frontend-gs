<script setup lang="ts">
import { IonCard, IonCardContent, IonCol, IonRow, useIonRouter } from '@ionic/vue';

const router = useIonRouter();

function goToUser(id: number) {
	router.push('/user/' + id)
}

const props = defineProps<{
	image?: string,
	description?: string
	username?: string,
	userhandle?: string,
	date?: string
}>()


</script>


<template>
	<IonCard id="postCard ion-margin">
		<img :src="props.image" alt="">
		<IonCardContent>
			<p class="description">{{ description }}</p>
			<p class="date-posted">{{ date }}</p>
			<hr id="separator">
			<IonRow>
				<VAvatar color="white" @click="goToUser(2)" />
				<IonCol>
					<p class="nickname">{{ username }}</p>
					<p class="handle">{{ userhandle }}</p>
				</IonCol>
				<button>
					<img class="postBtn" src="../../../../assets/icons/like2.svg">
				</button>
				<button>
					<img class="postBtn" src="../../../../assets/icons/comments.svg">
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

.v-avatar {
	width: 50px !important;
	height: 50px !important;
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
	width: 100%;
	margin: 0;
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

img {
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
</style>