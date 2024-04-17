<script setup lang="ts">
import { IonContent, IonCol, IonFab, IonGrid, IonPage, IonHeader, IonImg, IonRow, IonTitle, IonToolbar, IonButton, IonButtons } from '@ionic/vue';
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
        <PostCropper :ratios="([[4, 5], [1, 1]] as unknown[] as [])" />
        <IonContent>
            <IonFab vertical="bottom" horizontal="center" slot="fixed">
                <button @click="takePhoto()">
                    <img src="@/assets/icons/camera.svg">
                </button>
            </IonFab>
            <IonGrid>
                <IonRow>
                    <IonCol size="3" :key="photo.filepath" v-for="photo in photos">
                        <IonImg id="thumbnail" :src="photo.webviewPath"
                            @click="userStore.choosenPhoto = (photo.webviewPath as unknown as string)" />
                    </IonCol>
                </IonRow>
            </IonGrid>
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