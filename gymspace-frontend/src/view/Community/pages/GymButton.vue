<script setup lang="ts">
import { IonButton } from '@ionic/vue';
import { VTab, VWindow, VWindowItem } from 'vuetify/lib/components/index.mjs';
import { IonContent, IonModal } from '@ionic/vue';
import { gymDataStore } from '@/stores/GymDataStore';

import SmallFeed from '@/view/Post/components/SmallFeed.vue';
import TopGym from '../components/ClubGym/GymTop.vue'
import FeedPost from '@/view/Post/components/Feed/FeedPost.vue';
import apiGym from '@/logic/API/apiGym';
import apiUser from '@/logic/API/apiUser';
import apiPost from '@/logic/API/apiPost';

const props = defineProps<{
	id: number
	title?: string
	logo?: string
}>()

const baseUrl = await apiUser()
const gymStore = gymDataStore()

let gymInfo = await apiGym("gymInfo", props.id)
let buttonId = "open" + props.id


// temporary
let id = 1
let posts = await apiPost("allUserPostsDetail", id)
let creatorInfo = await apiUser("smallUserProfile", id)
// temporary

function refreshInfo() {
	gymStore.openedGym = props.id
}

</script>

<template>
	<IonButton :id="buttonId" @click="refreshInfo" class="btn ion-no-padding" color="rgba(255, 255, 255, 0.103)">
		<img class="logo-img" :src="props.logo" alt="">
		<h1>{{ props.title }}</h1>
	</IonButton>
	<IonModal ref="modal" :trigger="buttonId">
		<IonContent>
			<TopGym :logo="baseUrl + gymInfo.logo" :name="gymInfo.title" :id="$props.id"> </TopGym>

			<VTabs v-model="tab" color="#e8e20a" bg-color="black" align-tabs="center" slider-color="#e8e20a" :grow='true'>
				<VTab><img class="tab-img" src="../../../assets/icons/feed.svg" alt="feed"></VTab>
				<VTab><img class="tab-img" src="../../../assets/icons/challenges.svg" alt="challenges"></VTab>
				<VTab><img class="tab-img" src="../../../assets/icons/challenge.svg" alt="chat"></VTab>
			</VTabs>

			<VWindow v-model="tab">
				<VWindowItem>
					<FeedPost v-for="post in  posts.posts" :id="'post' + post.id" :userId="creatorInfo.id"
						:username="creatorInfo.username" :userhandle="'hahaasi'"
						:userPpf="baseUrl + creatorInfo.profile_picture" :postId="post.id" :description="post.body"
						:date="post.post_time" :image="baseUrl + post.media[0]" />
				</VWindowItem>
				<VWindowItem>
					<SmallFeed />
				</VWindowItem>
				<VWindowItem>
					<SmallFeed />
				</VWindowItem>
			</VWindow>
		</IonContent>
	</IonModal>
</template>

<script lang="ts">
export default {
	data: () => ({
		tab: null,
	}),
}
</script>

<style scoped>
.v-window {
	padding-top: 30px;
	height: fit-content;
	width: 100%;
	text-align: center;

}

.v-window__container {
	height: 100%;
	width: 100%;

}

.tab-img {
	height: 28px !important;
}

.btn {
	width: calc(100% - 60px);
	height: 80px;
	margin: 10px 30px 15px 30px;
	text-align: center;
	border-radius: 10px;
	background-color: rgba(255, 255, 255, 0.1) !important;
}

h1 {
	font-size: clamp(28px, 7vw, 64px);
	font-weight: bold;
	color: white;
	position: absolute;
	top: 50%;
	left: 120px;
	transform: translateY(-50%);

}

.logo-img {
	display: inline;
	width: auto;
	height: 90%;
	aspect-ratio: 1;
	object-fit: contain;
	position: absolute;
	left: 20px;
}
</style>