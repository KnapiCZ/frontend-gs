<script setup lang="ts">
import { modalController, IonContent, IonCol, IonFab, IonGrid, IonImg, IonRow, IonTitle, IonToolbar, IonButton, IonButtons, IonModal } from '@ionic/vue';
import { camera, trash, close } from 'ionicons/icons';
import { usePhotoGallery, UserPhoto } from '@/plugins/usePhotoGallery';
import { userDataStore } from '@/stores/UserDataStore';
import PostCropper from '@/view/Post/components/PostCropper.vue';

const props = defineProps<{
    img: string
    name: string
    ratios: []
}>()

const { photos, takePhoto } = usePhotoGallery();
const userStore = userDataStore()
let userData = JSON.parse(userStore.editedUser)

async function save() {
    if (props.name == "Banner") {
        userStore.backgroundPicture = userStore.croppedChoosenPhoto
        userData.background_picture = userStore.croppedChoosenPhoto
    }
    else {
        userStore.profilePicture = userStore.croppedChoosenPhoto
        userData.profile_picture = userStore.croppedChoosenPhoto
    }
    userStore.editedUser = JSON.stringify(userData)
    modalController.dismiss()
}

function setImage() {
    userStore.choosenPhoto = props.img
}
</script>

<template>
    <IonButton :id="props.name" class="tlacitko" @click="setImage()" expand="full">
        Edit {{ name }}
    </IonButton>
    <IonModal :trigger="props.name">
        <IonToolbar>
            <IonButtons slot="start">
                <IonButton @click="modalController.dismiss()">Back</IonButton>
            </IonButtons>
            <IonTitle>Choose {{}}</IonTitle>
            <IonButtons slot="end">
                <IonButton @click="save()">Save</IonButton>
            </IonButtons>
        </IonToolbar>
        <PostCropper :ratios="props.ratios" />
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
                            @click="() => userStore.choosenPhoto = (photo.webviewPath as unknown as string)" />
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