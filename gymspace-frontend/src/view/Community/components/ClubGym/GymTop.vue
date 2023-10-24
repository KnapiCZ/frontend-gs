<script setup lang="ts">
import { IonRow, IonCol, IonToolbar, IonButtons, modalController, IonButton, IonTitle } from '@ionic/vue';

function closeModal() {
    modalController.dismiss();
}

let props = defineProps<{
    logo?: string,
    name?: string,
}>()


</script>

<template>
    <IonToolbar>
        <IonButtons slot="start">
            <IonButton :onclick="closeModal" class="back-button"><img src="../../../../assets/icons/arrowRight.svg">
            </IonButton>
        </IonButtons>
        <IonTitle>{{ name }}</IonTitle>
    </IonToolbar>
    <IonRow id="background">
        <IonCol class="column" size="4">
            <img class="logo" :src="props.logo">
            <p class="top">{{ props.name }}</p>
        </IonCol>
        <IonCol class="column" size="3">
            <p class="top">25</p> <!-- API username-->
            <p class="bottom">followers</p> <!-- API username-->

            <button class="follow">Follow</button> <!-- API following user count-->
        </IonCol>
        <IonCol class="column" size="3">
            <p class="top">50</p>
            <p class="bottom">Members</p>

            <button class="join">Join</button> <!-- API user post count-->
        </IonCol>
    </IonRow>
</template>

<style scoped>
.follow,
.join {
    width: 90%;
    height: fit-content;
    border-radius: 20px;
    color: black;
    font-weight: bold;
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

.follow {
    background-color: #e8e20a;
}

.join {
    background-color: white;
}

#background {
    position: relative;
    margin: auto;
    width: 100vw;
    height: 150px;
    text-align: center;
    background-color: black;
}

.column {
    margin-top: auto;
    margin-bottom: 20px;
    margin-left: 10px;
}

.logo {
    width: 90%;
}
</style>
