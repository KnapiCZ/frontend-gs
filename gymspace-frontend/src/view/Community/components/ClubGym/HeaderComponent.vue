<script setup lang="ts">
import { IonRow, IonCol, IonToolbar, IonButtons, IonButton, IonTitle, modalController } from '@ionic/vue';
import { userDataStore } from '@/stores/UserDataStore';
import { ref } from 'vue';

import apiGym from '@/logic/API/apiGym';
import BioButton from './BioButton.vue';

let props = defineProps<{
    id: number
    logo?: string,
    name?: string,
}>()

const userStore = userDataStore()

let gymInfo = await apiGym("gymInfo", props.id)
let FollowMembers = ref([0, gymInfo.members.length]);
let isFollowing = [false, false];

//checking if user is member of Gym
function members(members: []) {
    if (members.includes(userStore.loggedUserId as never)) {
        isFollowing[1] = true;
    }
    else {
        isFollowing[1] = false;
    }
}

async function followJoin(type: number) {
    if (isFollowing[type]) { FollowMembers.value[type] -= 1; }
    else { FollowMembers.value[type] += 1; }
    isFollowing[type] = !isFollowing[type];
    if (type === 1) {
        await apiGym("joinClub", gymInfo.id, userStore.loggedUserId)
    }
    userStore.componentKey += 1
}
members(gymInfo.members)

</script>

<template>
    <IonToolbar>
        <IonButtons slot="start">
            <IonButton @click="modalController.dismiss()" class="back-button">
                <img src="../../../../assets/icons/arrowRight.svg">
            </IonButton>
        </IonButtons>
        <IonTitle>{{ name }}</IonTitle>
    </IonToolbar>
    <div id="background" class="grid-container">
        <div class="column logo-column">
            <BioButton :id="props.id" />
            <p class="top">{{ props.name }}</p>
        </div>
        <div class="column">
            <p class="top">{{ FollowMembers[0] }}</p> <!-- API username-->
            <p class="bottom">followers</p> <!-- API username-->

            <button class="follow" :class="{ following: isFollowing[0] }" @click="followJoin(0)">
                {{ isFollowing[0] ? 'Following' : 'Follow' }}
            </button>
        </div>
        <div class="column">
            <p class="top">{{ FollowMembers[1] }}</p>
            <p class="bottom">members</p>

            <button class="join" :class="{ joined: isFollowing[1] }" @click="followJoin(1)">
                {{ isFollowing[1] ? 'Joined' : 'Join' }}
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
