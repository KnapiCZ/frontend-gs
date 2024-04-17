<script setup lang="ts">
import { IonToolbar, IonButtons, IonButton, IonTitle, useIonRouter } from '@ionic/vue';
import { userDataStore } from '@/stores/UserDataStore';
import { ref } from 'vue';

import BioButton from './BioButton.vue';
import apiDivision from '@/logic/API/apiDivision';

const props = defineProps<{
    id: number
    type: string
    logo?: string
    name?: string
}>()
const router = useIonRouter()
const userStore = userDataStore()
const index = userStore.userDivisionId.indexOf(props.id)
let info = await apiDivision('divisionInfo', props.id)
let FollowMembers = ref([0, info!.members.length]);
let isJoined = ref(checkJoined());
let isFollowing = false

function closeDivision() {
    router.back()
    if (userStore.remove) {
        userStore.userDivisionId.splice(index, 1)
        userStore.remove = false
    }
}

function checkJoined() {
    if (info!.members.includes(userStore.loggedUserId as never)) return true;
    else return false;
}

async function Join() {
    if (isJoined.value) {
        FollowMembers.value[1] -= 1;
        userStore.remove = true

    } else {
        FollowMembers.value[1] += 1;
        if (!userStore.userDivisionId.includes(props.id)) userStore.userDivisionId.push(props.id)
    }
    await apiDivision("joinDivision", info!.id, userStore.loggedUserId);
    isJoined.value = !isJoined.value;
}


</script>

<template>
    <IonToolbar>
        <IonButtons slot="start">
            <IonButton @click="closeDivision()" class="back-button">
                <img src="../../../../assets/icons/arrowRight.svg">
            </IonButton>
        </IonButtons>
        <IonTitle>{{ name }}</IonTitle>
    </IonToolbar>
    <div id="background" class="grid-container">
        <div class="column logo-column">
            <BioButton :id="props.id" :type="props.type" />
            <p class="top">{{ props.name }}</p>
        </div>
        <div class="column">
            <p class="top">{{ FollowMembers[0] }}</p> <!-- API username-->
            <p class="bottom">followers</p> <!-- API username-->

            <button class="follow" :class="{ following: isFollowing }" @click="">
                {{ isFollowing ? 'Following' : 'Follow' }}
            </button>
        </div>
        <div class="column">
            <p class="top">{{ FollowMembers[1] }}</p>
            <p class="bottom">members</p>

            <button class="join" :class="{ joined: isJoined }" @click="Join()">
                {{ isJoined ? 'Joined' : 'Join' }}
            </button>
        </div>
    </div>
</template>

<style scoped>
ion-title {
    font-weight: bold;
}

.grid-container {
    display: grid;
    width: 100%;
    grid-template-columns: 50% 25% 25%;
    margin: 0;
}

#background {
    position: relative;
    margin: auto;
    width: 100vw;
    height: 200px;
    max-height: 200px;
    text-align: center;
    background-color: black;
}

.follow,
.join {
    width: 95%;
    height: fit-content;
    border-radius: 8px;
    color: black;
    font-weight: bold;
}

.follow {
    border: 2px solid #e8e20a;
    background-color: #e8e20a;
    transition: background-color 0.5s ease-in-out;
    transition: color 0.5s ease-in-out;
}

.following {
    background-color: transparent;
    color: #e8e20a;
}

.join {
    border: 2px solid white;
    background-color: white;
    transition: background-color 0.5s ease-in-out;
    transition: color 0.5s ease-in-out;
}

.joined {
    background-color: transparent;
    color: white;
}

.back-button {
    height: 100%;
    aspect-ratio: 1;
}

.back-button img {
    rotate: 180deg;
}

.top {
    font-weight: bold;
    font-size: 24px;
}

.bottom {
    margin-bottom: 10px;
}

.column {
    margin-top: auto;
    margin-bottom: 20px;
}
</style>
