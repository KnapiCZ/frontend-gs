<script setup lang="ts">
import {
    IonButton,
    IonButtons,
    IonCol,
    IonContent,
    IonFab,
    IonGrid,
    IonHeader,
    IonImg,
    IonRow,
    IonTitle,
    IonToolbar,
} from "@ionic/vue"

import { usePhotoGallery } from "@/plugins/usePhotoGallery"
import { userDataStore } from "@/stores/UserDataStore"
const { photos, takePhoto } = usePhotoGallery()

import PostCropper from "../components/PostCropper.vue"
const userStore = userDataStore()
</script>

<template>
  <IonModal>
    <IonHeader>
      <IonToolbar>
        <template #start>
          <IonButtons>
            <IonButton router-link="/">
              Back
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
    <PostCropper />
    <IonContent>
      <template #fixed>
        <IonFab
          vertical="bottom"
          horizontal="center"
        >
          <button @click="takePhoto()">
            <img src="@/assets/icons/camera.svg">
          </button>
        </IonFab>
      </template>
      <IonGrid>
        <IonRow>
          <IonCol
            v-for="photo in photos"
            :key="photo.filepath"
            size="3"
          >
            <IonImg
              id="thumbnail"
              :src="photo.filepath"
              @click="userStore.choosenPhoto = photo.webviewPath as unknown as string"
            >
              <img>
            </IonImg>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  </IonModal>
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
