<script setup lang="ts">
import { IonBackButton, IonButtons, IonContent, IonHeader, IonToolbar, IonButton, IonTitle, IonPage, IonTextarea } from '@ionic/vue';
import { userDataStore } from '@/stores/UserDataStore';
import apiPost from '@/logic/API/apiPost';
import { ref } from 'vue';

const userStore = userDataStore()
let text = ref()
async function addPost() {
    let data = { 'author': userStore.loggedUserId, 'description': text.value, 'media': [userStore.croppedChoosenPhoto] }
    console.debug("[DEBUG] ", await apiPost('createPost', 0, 0, data))
}


</script>


<template>
    <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonBackButton />
                </IonButtons>
                <IonTitle>New Post</IonTitle>
                <IonButtons slot="end">
                    <IonButton @click="addPost()">Post</IonButton>
                </IonButtons>
            </IonToolbar>
        </IonHeader>
        <IonContent class="ion-padding">
            <img id="choosen-image" :src="userStore.croppedChoosenPhoto">
            <ion-textarea label="Floating label" label-placement="floating" placeholder="Enter text"></ion-textarea>
            <IonTextarea @input="text = $event.target.value" label="Description" placeholder="Write your thoughts here"
                :value="text" :counter="true" :maxlength="600" :auto-grow="true">
            </IonTextarea>
        </IonContent>
    </IonPage>
</template>



<style scoped>
#choosen-image {
    width: 50%;
    margin: auto;
    aspect-ratio: 4/5;
    object-fit: cover;
}

ion-content {
    text-align: center;
}
</style>