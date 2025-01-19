<script setup lang="ts">
import { IonButton, IonCol, modalController, useIonRouter } from '@ionic/vue';
import FollowButton from '@/view/shared/components/FollowButton.vue';

import apiUser from '@/logic/API/apiUser';

const props = defineProps<{
    userId: number
}>()

const router = useIonRouter()

let userData = await apiUser("profile", props.userId, undefined, 'username,profile_picture')

function goToUser() {
    modalController.dismiss()
    router.push('/user/' + props.userId)
}

</script>

<template>
    <IonButton class="btn ion-no-padding" color="rgba(255, 255, 255, 0.103)">
        <img class="logo-img" :src="userData.profile_picture" alt="" @click="goToUser()">
        <IonCol @click="goToUser()">
            <p class="top-item">@{{ userData.username }}</p>
            <p class="bottom-item">{{ userData.username }}</p>
        </IonCol>
        <FollowButton :userId="(props.userId as number)" />
    </IonButton>
</template>

<style scoped>
.profile-button {
    width: 25% !important;
    height: 25px;
    border-radius: 20px;
    margin: 10px;
}

.btn {
    width: 100%;
    height: 60px;
    margin: 5px auto;
    text-align: left;
    border-radius: 30px 0 0 30px;
    border-bottom: 2px white solid;
    background-color: #00000000 !important;
}

p {
    z-index: 100;
    color: white;
    padding: 4px 0;
}

.top-item {
    font-weight: bold;
    font-size: 12px;
}

.bottom-item {
    font-size: 10px;
}

.logo-img {
    z-index: 100;
    display: inline-block;
    width: 60px;
    height: 60px;
    border-radius: 30px;
    aspect-ratio: 1;
    object-fit: cover;
    object-position: center;
}
</style>