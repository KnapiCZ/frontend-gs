<script setup lang="ts">
import {
    IonButton,
    IonButtons,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonImg,
    IonPage,
    IonRow,
    IonTitle,
    IonToolbar,
    useIonRouter,
} from "@ionic/vue"

import { usePhotoGallery } from "@/plugins/usePhotoGallery"
import { userDataStore } from "@/stores/UserDataStore"
const { photos } = usePhotoGallery()

import PostCropper from "../components/PostCropper.vue"
const userStore = userDataStore()

const router = useIonRouter()
</script>

<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <template #start>
          <IonButtons>
            <IonButton
              class="back-button"
              @click="router.back()"
            >
              <img src="@/assets/icons/arrowRight.svg">
            </IonButton>
          </IonButtons>
        </template>
        <IonTitle>New Post</IonTitle>
        <template #end>
          <IonButtons>
            <IonButton router-link="/addPost/addInfo">
              Next
            </IonButton>
          </IonButtons>
        </template>
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
          <IonCol
            v-for="photo in photos"
            :key="photo.filepath"
            size="3"
          >
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
