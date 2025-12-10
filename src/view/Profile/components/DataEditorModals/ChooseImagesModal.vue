<script setup lang="ts">
import {
    IonButton,
    IonButtons,
    IonCol,
    IonContent,
    IonFab,
    IonGrid,
    IonImg,
    IonModal,
    IonRow,
    IonTitle,
    IonToolbar,
    modalController,
} from "@ionic/vue"

import { usePhotoGallery } from "@/plugins/usePhotoGallery"
import { userDataStore } from "@/stores/UserDataStore"
import PostCropper from "@/view/Post/components/PostCropper.vue"

const props = defineProps<{
    img: string
    name: string
    ratios: []
}>()

const { photos, takePhoto } = usePhotoGallery()
const userStore = userDataStore()

async function save() {
    if (props.name == "Banner") {
        userStore.addToDict("editedUser", "background_picture", userStore.croppedChoosenPhoto)
    } else {
        userStore.addToDict("editedUser", "profile_picture", userStore.croppedChoosenPhoto)
    }
    modalController.dismiss()
}

function setImage() {
    userStore.choosenPhoto = props.img
}
</script>

<template>
  <IonButton
    :id="props.name"
    class="tlacitko"
    expand="full"
    @click="setImage()"
  >
    Edit {{ name }}
  </IonButton>
  <IonModal :trigger="props.name">
    <IonToolbar>
      <template #start>
        <IonButtons>
          <IonButton @click="modalController.dismiss()">
            Back
          </IonButton>
        </IonButtons>
      </template>
      <IonTitle>Choose {{}}</IonTitle>
      <template #end>
        <IonButtons>
          <IonButton @click="save()">
            Save
          </IonButton>
        </IonButtons>
      </template>
    </IonToolbar>
    <PostCropper :ratios="props.ratios" />
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
            :key="photo.webviewPath"
            size="3"
          >
            <IonImg
              id="thumbnail"
              :src="photo.webviewPath"
              @click="() => (userStore.choosenPhoto = photo.webviewPath as unknown as string)"
            />
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

ion-button.tlacitko {
    height: 60px;
    --background: rgba(0, 0, 0, 0);
    --background-hover: #ffffff33;
    --background-activated: #ffffff33;
    --color: #fff000;
    --padding-top: 0;
    --padding-bottom: 0;
    border-top: 1px solid white;
    border-bottom: 1px solid white;
}

img {
    height: 100%;
    margin: 10px 20px;
    vertical-align: middle;
}
</style>
