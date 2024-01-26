<script setup lang="ts">
import { IonModal, IonToolbar, modalController, IonHeader, IonButton, IonButtons, IonTitle, IonItem, IonContent, IonInput, IonRadioGroup, IonRadio } from '@ionic/vue';
import { ref } from 'vue';
import { userDataStore } from '@/stores/UserDataStore';

const userStore = userDataStore();
let userData = JSON.parse(userStore.editedUser)

let text = ref()

let sex: { [id: string]: string } = {
    "M": "Male",
    "F": "Female",
    "O": "Other",
    "N": "Rather not to say",
}

text.value = userData.sex

function cancel() {
    text.value = userData.sex
    modalController.dismiss({ id: "sex-modal" })
}

function save() {
    userData.sex = text.value
    modalController.dismiss({ id: "sex-modal" })
}

function updateText() {
    text.value = sex[userData.sex]
}

</script>

<template>
    <IonItem id="sex-modal">
        <IonInput label="Sex" label-placement="fixed" placeholder="Your sex" :value="text" :readonly="true" />
    </IonItem>
    <IonModal type="modal" trigger="sex-modal">
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonButton @click="cancel()">Cancel</IonButton>
                </IonButtons>
                <IonTitle>Sex</IonTitle>
                <IonButtons slot="end">
                    <IonButton class="save-button" :strong="true" @click="save()">
                        Confirm</IonButton>
                </IonButtons>
            </IonToolbar>
        </IonHeader>
        <IonContent>
            <IonRadioGroup v-model="text">
                <IonItem>
                    <IonRadio value="M" justify="space-between" @click="updateText()">Male</IonRadio>
                </IonItem>
                <IonItem>
                    <IonRadio value="F" justify="space-between" @click="updateText()">Female</IonRadio>
                </IonItem>
                <IonItem>
                    <IonRadio value="O" justify="space-between" @click="updateText()">Other</IonRadio>
                </IonItem>
                <IonItem v-show="text == 'O'" id="sex-modal">
                    <IonInput @ion-change="userData.sex = ($event.target.value as string)" label="Choose"
                        label-placement="fixed" placeholder="Your sex" :value="text" />
                </IonItem>
                <IonItem>
                    <IonRadio value="N" justify="space-between" @click="updateText()">Rather not to say</IonRadio>
                </IonItem>
            </IonRadioGroup>

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
    background-color: rgb(47, 47, 47);
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
    border-color: #000;
    transform: rotate(45deg);
}
</style>