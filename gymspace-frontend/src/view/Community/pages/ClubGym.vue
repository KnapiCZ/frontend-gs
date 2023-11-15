<script setup lang="ts">
import { VTab, VWindow, VWindowItem } from 'vuetify/lib/components/index.mjs';
import { IonContent, IonPage } from '@ionic/vue';
import { gymDataStore } from '@/stores/GymDataStore';
import { useRoute } from 'vue-router';

import SmallFeed from '@/view/Post/components/SmallFeed.vue';
import TopGym from '../components/ClubGym/GymTop.vue'
import FeedPost from '@/view/Post/components/Feed/FeedPost.vue';
import apiGym from '@/logic/API/apiGym';
import apiUser from '@/logic/API/apiUser';


let props = defineProps<{
	id: string,
	logo?: string,
	name?: string
}>()

const baseUrl = await apiUser()
const route = useRoute()
let gymInfo = await apiGym("gymInfo", props.id as unknown as number)

const gymStore = gymDataStore()
gymStore.openedGym = props.id as unknown as number


let id = 1
let posts = await apiUser("allUserPostsDetail", id)
let creatorInfo = await apiUser("smallUserProfile", id)

</script>


<template>
	<IonPage>
		<IonContent>
			<TopGym :logo="baseUrl + gymInfo.logo" :name="gymInfo.title"> </TopGym>

			<VTabs v-model="tab" color="#e8e20a" bg-color="black" align-tabs="center" slider-color="#e8e20a" :grow='true'>
				<VTab><img src="../../../assets/icons/feed.svg" alt="feed"></VTab>
				<VTab><img src="../../../assets/icons/challenges.svg" alt="challenges"></VTab>
				<VTab><img src="../../../assets/icons/challenges.svg" alt="challenges"></VTab>
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
	</IonPage>
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
</style>