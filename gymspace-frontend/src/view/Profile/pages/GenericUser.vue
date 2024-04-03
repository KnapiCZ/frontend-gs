<script setup lang="ts">
import { IonContent, IonPage } from '@ionic/vue';
import { userDataStore } from '@/stores/UserDataStore';
import { useRoute } from 'vue-router';
import ProfileTop from '../components/ProfileTop.vue'
import CurrentUserButton from '../components/Buttons/CurrentUserButton.vue';
import ProfileBasicInfo from '../components/ProfileBasicInfo.vue';
import TabBar from '../components/TabBar.vue';
import OtherUserButton from '../components/Buttons/OtherUserButton.vue';
import apiUser from '@/logic/API/apiUser';
import apiPost from '@/logic/API/apiPost';
import apiChallenge from '@/logic/API/apiChallenge';

const route = useRoute();
const userStore = userDataStore();

userStore.userPostsId = []

let id = route.params.id as unknown as number;
let data = await apiPost('allUserPostId', id);
let challenges = await apiChallenge('userChallengesId', id)

for (let i = 0; i < data.posts.length; i++) {
	userStore.userPostsId.push(data.posts[i].id)
}
userStore.userPostsId.reverse()

for (let i = 0; i < challenges.length; i++) {
	userStore.userChallengeId.push(challenges[i].id)
}

userStore.user = JSON.stringify(await apiUser("userProfile", id))

let userData = JSON.parse(userStore.user)

userStore.renderedUserId = id
userStore.followersCount = userData.followers

function checkLogin() {
	if (id == userStore.loggedUserId) return true;
	else return false;
}

</script>

<template>
	<IonPage class="ion-no-padding" :key="id">
		<IonContent class="ion-no-padding" id="user">
			<ProfileTop :key="userStore.componentKey" />
			<ProfileBasicInfo :key="userStore.componentKey + 100" />
			<CurrentUserButton v-if="checkLogin()" />
			<OtherUserButton v-else />
			<TabBar :trainer_status="userData.trainer_status" />
		</IonContent>
	</IonPage>
</template>

<style scoped>
#user {
	margin: 0;
	padding: 0;
	padding-bottom: 56px;
	text-align: center;
	background-color: black;
}
</style>