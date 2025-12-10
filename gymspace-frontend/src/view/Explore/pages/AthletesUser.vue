<script setup lang="ts">
import { IonButton, IonCol, IonContent, IonPage, IonToolbar, useIonRouter } from '@ionic/vue';
import { userDataStore } from '@/stores/UserDataStore';
import { useRoute } from 'vue-router';
import UnlockablePost from './components/UnlockablePost.vue';

//Využije se později ve vývoji
const props = defineProps<{
    id: number
}>();

const route = useRoute();
const router = useIonRouter()
const userStore = userDataStore();
let id = route.params.id as unknown as number;
let userData = JSON.parse(userStore.user)

let isUserVerified = userData.isUserVerified ?? 1;

</script>


<template>
    <IonPage>
        <IonToolbar>
            <IonButton @click='router.back()' slot="start" class="back-button"><img
                    src="../../../assets/icons/arrowRight.svg"></IonButton>
        </IonToolbar>
        <IonContent class="ion-padding" style="background-color: #0E0E0E;">

            <div class="profile-section">
                <div class="profile-image-container">
                    <img class="profile-image" :src="userData.profile_picture" />
                    <img v-if="isUserVerified" class="verified-icon" src="../../../assets/icons/checkMark.svg" />
                </div>

                <h2 class="profile-name">{{ userData.username }}</h2>
                <p class="profile-role">{{ userData.username }}</p>

                <p class="profile-bio">
                    {{ userData.description }}
                </p>

            </div>

            <div class="stats">
                <div class="stat-item">
                    <span class="stat-number">{{ userData.followers.length }}</span>
                    <span class="stat-label">Followers</span>
                </div>
                <!--?Zatím nenačítá odběry (userData.Subscribers), je tam daná provizorní hodnota-->
                <div class="stat-item">
                    <span class="stat-number">{{ 5 }}</span>
                    <span class="stat-label">Subscribers</span>
                </div>
            </div>


            <IonGrid>
                <UnlockablePost :id="id" />
                <UnlockablePost :id="id" />
                <UnlockablePost :id="id" />
            </IonGrid>
        </IonContent>
    </IonPage>
</template>

<style scoped>
p {
    padding-top: 10px;
}

.ion-padding {
    --padding-start: 35px;
    --padding-end: 35px;
    --padding-bottom: 35px;
}

.back-button {
    height: 100%;
    aspect-ratio: 1;
}

.back-button img {
    rotate: 180deg;
}

.button-section {
    display: flex;
    justify-content: center;
    align-items: center;
}

ion-button {
    --background: transparent;
    --box-shadow: none;
    padding: 10px;
}

.profile-section {
    text-align: center;
    color: white;
    padding: 20px;
}

.profile-image-container {
    margin-top: 50px;
    position: relative;
    display: inline-block;
    width: 80px;
    height: 80px;
}

.profile-image {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid white;
}

.verified-icon {
    position: absolute;
    bottom: 5px;
    right: 5px;
    width: 20px;
    height: 20px;
    background: yellow;
    border-radius: 50%;
    border: 2px solid white;
}

.bio {
    font-size: 14px;
}

.stats {
    display: flex;
    justify-content: center;
    gap: 80px;
    margin: 20px 0;
}

.stat-item {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.stat-number {
    font-size: 24px;
    font-weight: bold;
}

.stat-label {
    font-size: 14px;
}

.subscription {
    text-align: center;
    background: #4F4F4F;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 10px;
}

.lock-icon {
    width: 40px;
    margin-bottom: 10px;
}

.subscribe-button {
    --background: #313131;
    color: white;
    font-weight: bold;
}
</style>