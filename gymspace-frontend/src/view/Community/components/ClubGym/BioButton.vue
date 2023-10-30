<script setup lang="ts">
import { IonButton, IonModal, IonRow, IonToolbar, modalController } from '@ionic/vue';

const props = defineProps<{
    name?: string,
    description?: string,
    logo?: string,

}>
    ()

</script>

<template>
    <IonButton id="parent" :style="{ backgroundImage: 'url(' + props.logo + ')' }" color="rgba(0,0,0,0)">
        <IonModal ref="modal" trigger="parent">
            <IonToolbar>
                <IonButtons slot="start">
                    <IonButton @click="modalController.dismiss" class="back-button" color="rgba(0,0,0,0)"><img
                            src="../../../../assets/icons/arrowRight.svg"></IonButton>
                </IonButtons>
                <IonTitle>Description</IonTitle>
            </IonToolbar>
            <div class=" top-info">
                <img class="logo" :src="props.logo">
                <h1 class="name">{{ name }}</h1>
                <p>The best boddybuilding club ever</p>
                <p>hashtags?????</p>
            </div>

            <div class="description">
                <h2>Description</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et
                    dolore magna aliqua.Elementum integer enim neque volutpat ac tincidunt.Felis bibendum ut tristique
                    et
                    egestas.Auctor augue mauris augue neque gravida in.Libero volutpat sed cras ornare arcu.Sit amet
                    consectetur adipiscing elit duis tristique.Sit amet justo donec enim diam vulputate ut pharetra sit.
                    Consectetur libero id faucibus nisl tincidunt eget.Elit pellentesque habitant morbi</p>
            </div>

            <h2 class="creator">Created by</h2>
            <IonRow>
                <img class="pfp" :src="props.logo" alt="">
                <p>@gymspace</p>
            </IonRow>
        </IonModal>
    </IonButton>
</template>

<style scoped>
.back-button {
    height: 100%;
    aspect-ratio: 1;
}

.back-button img {
    rotate: 180deg;
}

ion-row {
    margin: 10px;
}

.description {
    margin: 0 10px 30px 10px;
}

.description p {
    margin: 10px;
    font-size: 12px;
}

.logo {
    width: 30%;
    margin: 10px;
}

.top-info {
    text-align: center;
    margin: 0 10px 30px 10px;
}

.creator {
    margin: 10px;
}

.pfp {
    height: 40px;
}
</style>