<script setup lang="ts">
import apiUser from '@/logic/API/apiUser';
import { userDataStore } from '@/stores/UserDataStore';
import { ref } from 'vue';

const props = defineProps<{
    userId: number
}>()

const userStore = userDataStore()
// TODO: return false or true from api isFollowing
let followingList = await apiUser('isFollowing', props.userId, userStore.loggedUserId)
console.log(followingList)
let isFollowing = ref(checkIfFollowing(followingList.followers))
console.debug(userStore.user)
//let userData = JSON.parse(userStore.user)

function checkIfFollowing(followers: []) {
    if (followers.includes(userStore.loggedUserId as never)) {
        return true;
    }
    else {
        return false;
    }
}

async function follow() {
    await apiUser("follow", userStore.loggedUserId, props.userId).then((isFollowing.value as any) = (!isFollowing.value as any))
}

</script>

<template>
    <button class="profile-button" :class="{ follow: !isFollowing }" @click="follow">
        {{ isFollowing ? 'Following' : 'Follow' }}
    </button>
</template>

<style scoped>
.follow {
    background-color: #fff000 !important;
    color: black;
}
</style>