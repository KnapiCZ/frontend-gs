<script setup lang="ts">
import apiUser from '@/logic/API/apiUser';
import { userDataStore } from '@/stores/UserDataStore';
import { ref } from 'vue';

const props = defineProps<{
    userId: number
}>()
const userStore = userDataStore()

let isFollowing = ref()
isFollowing.value = await apiUser('isFollowing', props.userId, undefined, userStore.loggedUserId.toString())

async function follow() {
    await apiUser("follow", props.userId, undefined, userStore.loggedUserId.toString()).then((isFollowing.value.is_following as any) = (!isFollowing.value.is_following as any))
}

</script>

<template>
    <button class="profile-button" :class="{ follow: !isFollowing.is_following }" @click="follow">
        {{ isFollowing.is_following ? 'Following' : 'Follow' }}
    </button>
</template>

<style scoped>
.follow {
    background-color: #fff000 !important;
    color: black;
}
</style>