<script setup lang="ts">
import { IonModal, IonContent, IonToolbar, IonButtons, IonButton, IonTitle, modalController } from '@ionic/vue';
import { userDataStore } from '@/stores/UserDataStore';
import FollowerButton from './Buttons/FollowerButton.vue';
import apiUser from '@/logic/API/apiUser';
import router from '@/router';
import { ref } from 'vue';

const userStore = userDataStore()
const renderedUserId = ref(router.currentRoute.value.params.id as unknown as number)

let followers = await apiUser("usersFollowers", renderedUserId.value)
</script>

<template>
    <IonModal ref="modal" trigger="followers-modal" :key="renderedUserId">
        <IonToolbar>
            <IonButtons slot="start">
                <IonButton @click="modalController.dismiss('followers-modal')" class="back-button">
                    <img src="@/assets/icons/arrowRight.svg">
                </IonButton>
            </IonButtons>
            <IonTitle>Followers</IonTitle>
        </IonToolbar>
        <IonContent class="ion-no-padding" id="MainContainer">
            <FollowerButton v-for="follower in followers.followers" :userId="follower as number" />
        </IonContent>
    </IonModal>
</template>

<style scoped>
#MainContainer {
    position: relative;
    width: 100vw;
    text-align: center;
}

.back-button {
    height: 100%;
    aspect-ratio: 1;
}

.back-button img {
    rotate: 180deg;
}

.top-item,
.top-item1 {
    font-weight: bold;
}

.top-item1 {
    line-height: 22px;
    font-size: 20px;
}

.bottom-item {
    font-size: 12px;
}
</style>