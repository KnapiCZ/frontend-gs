<script setup lang="ts">
import { IonModal, IonToolbar, modalController, IonHeader, IonButton, IonButtons, IonTitle, IonItem, IonContent, IonInput, IonRadioGroup, IonRadio } from '@ionic/vue';
import { ref } from 'vue';
import { userDataStore } from '@/stores/UserDataStore';

const userStore = userDataStore();
let userData = JSON.parse(userStore.editedUser)

let oldtext = userData.pronouns
let text = ref(userData.pronouns)

function cancel() {
    text.value = oldtext
    modalController.dismiss({ id: "pronouns-modal" })
}

function save() {
    userData.pronouns = text.value
    userStore.editedUser = JSON.stringify(userData)
    modalController.dismiss({ id: "pronouns-modal" })
}

</script>

<template>
    <IonItem id="pronouns-modal">
        <IonInput label="Pronouns" label-placement="fixed" placeholder="Your pronouns" :value="text" :readonly="true" />
    </IonItem>
    <IonModal type="modal" trigger="pronouns-modal">
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonButton @click="cancel()">Cancel</IonButton>
                </IonButtons>
                <IonTitle>Pronouns</IonTitle>
                <IonButtons slot="end">
                    <IonButton class="save-button" :strong="true" @click="save()">
                        Confirm</IonButton>
                </IonButtons>
            </IonToolbar>
        </IonHeader>
        <IonContent>
            <IonItem id="pronouns-modal">
                <IonInput @ion-change="text = ($event.target.value as string)" label="Choose" label-placement="fixed"
                    placeholder="Your pronouns" :value="text" />
            </IonItem>
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

ion-item {
    --inner-border-width: 0;
}

.save-button {
    --color: #fff000;
}

ion-input::after {
    content: "";
    background: rgb(53, 53, 53);
    position: absolute;
    bottom: 0;
    left: 100px;
    right: 0;
    width: auto;
    height: 1px;
}

ion-avatar {
    margin: auto;
    height: 70px;
    width: 70px;
}

#user-edit {
    width: 30%;
    height: 30px;
    padding: 5px auto;
    margin: 10px auto;
    text-align: center;
    background-color: #0E0E0E;
    font-weight: bold;
    border-radius: 10px;
}

ion-radio::part(container) {
    width: 25px;
    height: 25px;
    border-radius: 20px;
    border: 2px solid #acacac;
}

ion-radio.radio-checked::part(container) {
    background: #fff000;
    border-color: #fff000;
}

ion-radio.radio-checked::part(mark) {
    width: 8px;
    height: 12px;
    border-color: #0E0E0E;
    transform: rotate(45deg);
}
</style>