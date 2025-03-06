<script setup lang="ts">
import { IonToolbar, modalController, IonHeader, IonButton, IonButtons, IonTitle, IonItem, IonContent, IonInput, IonRadioGroup, IonRadio } from '@ionic/vue'
import { ref } from 'vue'
import { userDataStore } from '@/stores/UserDataStore'

const userStore = userDataStore()

const pronouns = ref("")

function cancel() {
    modalController.dismiss({ id: "pronouns-modal" })
}

function save() {
    modalController.dismiss({ id: "pronouns-modal" })
}

</script>

<template>
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
        <IonInput v-model="pronouns" class="custom border-gradient" fill="outline" placeholder="Your pronouns"
            maxlength="20" :counter="true" />
        <p>You can type here your own pronouns separate them by /</p>
    </IonContent>
</template>


<style scoped>
ion-button {
    --color: white;
}

.save-button {
    --color: #fff000;
}

p {
    margin: 0 24px;
}

.border-gradient::before {
    background: linear-gradient(180deg,
            #fff 4%,
            #ffffff75 52%,
            #ffffff59 80%,
            #ffee0096);
}
</style>