<script setup lang="ts">
import { IonButton, IonContent, useIonRouter, modalController } from "@ionic/vue"

const router = useIonRouter()

function logOut() {
    localStorage.removeItem("Token")
    modalController.dismiss()
    router.replace("/login")
}
</script>

<template>
    <h1>Settings</h1>
    <IonContent>
        <IonButton expand="full">Your Account </IonButton>
        <IonButton expand="full">Liked</IonButton>
        <IonButton expand="full">Privacy</IonButton>
        <IonButton expand="full">Notifications</IonButton>
        <IonButton expand="full" color="danger" @click="logOut()">Log out </IonButton>
    </IonContent>
</template>

<style scoped>
h1 {
    text-align: center;
    margin: 30px auto 10px auto;
}

ion-content {
    margin-top: 10px;
    height: fit-content;
    font-size: large;
}

ion-button {
    --background: rgba(0, 0, 0, 0);
    --background-hover: #ffffff33;
    --background-activated: #ffffff33;
    --color: #fff000;
    --padding-top: 10px;
    --padding-bottom: 10px;
}

#user-menu {
    height: 60px;
    position: absolute;
    right: 10px;
}

img {
    height: 50%;
    margin: 10px 20px;
    vertical-align: middle;
}
</style>
