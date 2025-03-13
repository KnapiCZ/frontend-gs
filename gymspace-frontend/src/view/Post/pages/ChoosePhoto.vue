<script setup lang="ts">
import {
    IonContent,
    IonCol,
    IonFab,
    IonGrid,
    IonPage,
    IonHeader,
    IonImg,
    IonRow,
    IonTitle,
    IonToolbar,
    IonButton,
    IonButtons,
    IonBackButton,
    useIonRouter,
} from "@ionic/vue"
import { camera, trash, close } from "ionicons/icons"
import { usePhotoGallery, UserPhoto } from "@/plugins/usePhotoGallery"
import { userDataStore } from "@/stores/UserDataStore"
import { useRoute } from "vue-router"
const { photos, takePhoto } = usePhotoGallery()

import PostCropper from "../components/PostCropper.vue"
const userStore = userDataStore()

const router = useIonRouter()
</script>

<template>
    <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonButton @click="router.back()" class="back-button"
                        ><img src="@/assets/icons/arrowRight.svg"
                    /></IonButton>
                </IonButtons>
                <IonTitle>New Post</IonTitle>
                <IonButtons slot="end">
                    <IonButton router-link="/addPost/addInfo">Next</IonButton>
                </IonButtons>
            </IonToolbar>
        </IonHeader>
        <PostCropper
            :ratios="
                [
                    [4, 5],
                    [1, 1],
                ] as unknown[] as []
            "
        />
        <IonContent>
            <IonGrid>
                <IonRow>
                    <IonCol size="3" :key="photo.filepath" v-for="photo in photos">
                        <IonImg
                            id="thumbnail"
                            :src="photo.webviewPath"
                            @click="userStore.choosenPhoto = photo.webviewPath as unknown as string"
                        />
                    </IonCol>
                </IonRow>
            </IonGrid>
        </IonContent>
    </IonPage>
</template>

<style scoped>
ion-title {
    margin: 0 20px;
    font-weight: bold;
}

ion-fab {
    align-self: right;
}

.back-button {
    height: 100%;
    aspect-ratio: 1;
}

.back-button img {
    rotate: 180deg;
}

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

ion-button {
    color: #fff000;
    font-weight: bold;
}
</style>
