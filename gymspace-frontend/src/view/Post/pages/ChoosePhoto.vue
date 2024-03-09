<script setup lang="ts">
import { IonContent, IonCol, IonFab, IonGrid, IonPage, IonHeader, IonIcon, IonImg, IonRow, IonTitle, IonToolbar, IonNavLink, IonButton, IonButtons, useIonRouter } from '@ionic/vue';
import { camera, trash, close } from 'ionicons/icons';
import { usePhotoGallery, UserPhoto } from '@/plugins/usePhotoGallery';
import { userDataStore } from '@/stores/UserDataStore';
const { photos, takePhoto } = usePhotoGallery();

import PostCropper from '../components/PostCropper.vue';
const userStore = userDataStore()
</script>

<template>
    <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonButton router-link="/">Back</IonButton>
                </IonButtons>
                <IonTitle>New Post</IonTitle>
                <IonButtons slot="end">
                    <IonButton router-link="/addPost/addInfo">Next</IonButton>
                </IonButtons>
            </IonToolbar>
        </IonHeader>
        <PostCropper />
        <IonContent>
            <ion-fab vertical="bottom" horizontal="center" slot="fixed">
                <button @click="takePhoto()">
                    <img src="@/assets/icons/camera.svg">
                </button>
            </ion-fab>
            <ion-grid>
                <ion-row>
                    <ion-col size="3" :key="photo.filepath" v-for="photo in photos">
                        <ion-img id="thumbnail" :src="photo.webviewPath"
                            @click="userStore.choosenPhoto = photo.webviewPath as unknown as string">
                            ></ion-img>
                    </ion-col>
                </ion-row>
            </ion-grid>
        </IonContent>
    </IonPage>
</template>

<style scoped>
#choosen-photo {
    width: 60%;
    aspect-ratio: 4/5;
    object-fit: cover;
    margin: auto;
}

#thumbnail {
    aspect-ratio: 1/1;
    object-fit: cover;
}
</style>