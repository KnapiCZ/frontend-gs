<script setup lang="ts">
import { IonButton, IonContent, IonModal } from '@ionic/vue';

</script>


<template>
    <div>
        <button id="user-menu">
            <img src="@/assets/icons/settings.svg" alt="">
        </button>
        <IonModal type="modal" trigger="user-menu" :initial-breakpoint="0.5" :breakpoints="[0, 0.5, 1]">
            <h1>Settings</h1>
            <IonContent>
                <IonButton expand="full">Your Account </IonButton>
                <IonButton expand="full">Liked</IonButton>
                <IonButton expand="full">Privacy</IonButton>
                <IonButton expand="full">Notifications</IonButton>
                <IonButton expand="full" color="danger">Log out</IonButton>
            </IonContent>
        </IonModal>
    </div>
</template>

<style scoped>
h1 {
    text-align: center;
    margin: 30px auto 10px auto;
}

ion-content {
    margin-top: 10px !important;
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