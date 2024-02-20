<script setup lang="ts">
import { IonModal, IonToolbar, modalController, IonHeader, IonButton, IonButtons, IonTitle, IonItem, IonTextarea, IonContent, } from '@ionic/vue';
import { ref } from 'vue';
import { userDataStore } from '@/stores/UserDataStore';

const userStore = userDataStore();

let userData = JSON.parse(userStore.editedUser)
let oldtext = userData.description
let text = ref(userData.description)

function cancel() {
    text.value = oldtext
    modalController.dismiss({ id: "bio-modal" })
}

function save() {
    userData.description = text.value
    userStore.editedUser = JSON.stringify(userData)
    modalController.dismiss({ id: "bio-modal" })
}

function customFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} characters remaining`;
}

</script>

<template>
    <IonItem button id="bio-modal">
        <IonTextarea class="outside-textarea" label="Bio" label-placement="fixed" placeholder="Type something here"
            :auto-grow="true" :maxlength="200" :readonly="true" :value="text"></IonTextarea>
    </IonItem>
    <IonModal type="modal" trigger="bio-modal">
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonButton @click="cancel()">Cancel</IonButton>
                </IonButtons>
                <IonTitle>Bio</IonTitle>
                <IonButtons slot="end">
                    <IonButton class="save-button" :strong="true" @click="save()">
                        Confirm</IonButton>
                </IonButtons>
            </IonToolbar>
        </IonHeader>
        <IonContent>
            <IonTextarea @input="text = $event.target.value" id="edit" label="Bio" placeholder="Type something here"
                :value="text" :counter="true" :maxlength="200" :counter-formatter="customFormatter" :auto-grow="true">
            </IonTextarea>
        </IonContent>

    </IonModal>
</template>


<style scoped>
ion-title {
    text-align: center;
}

ion-button {
    --color: white;
}

ion-item::part(detail-icon) {
    color: white;
    opacity: 1;
    font-size: 20px;
    position: absolute;
    right: 10px;
}

ion-textarea.outside-textarea::after {
    content: "";
    background: rgb(53, 53, 53);
    position: absolute;
    bottom: 0;
    left: 100px;
    right: 0;
    width: auto;
    height: 1px;
}


.save-button {
    --color: #fff000;
}

#user-edit {
    width: 30%;
    height: 30px;
    padding: 5px auto;
    margin: 10px auto;
    text-align: center;
    background-color: rgb(47, 47, 47);
    font-weight: bold;
    border-radius: 10px;
}

ion-textarea {
    line-clamp: 8;
}
</style>