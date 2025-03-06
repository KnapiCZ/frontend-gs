<script setup lang="ts">
import { IonModal, IonToolbar, modalController, IonHeader, IonButton, IonButtons, IonTitle, IonItem, IonTextarea, IonContent, } from '@ionic/vue'
import { onMounted, ref } from 'vue'
import { userDataStore } from '@/stores/UserDataStore'

const userStore = userDataStore()

const text = ref<string>()

function cancel() {
    text.value = userStore.getFromDict("user", "description")
    modalController.dismiss({ id: "bio-modal" })
}

function save() {
    userStore.addToDict("editedUser", "description", text.value)
    modalController.dismiss({ id: "bio-modal" })
}

onMounted(() => {
    if (userStore.getFromDict("editedUser", "description") == undefined) text.value = userStore.getFromDict("user", "description")
    else text.value = userStore.getFromDict("editedUser", "description")

})

</script>

<template>
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
        <IonTextarea v-model="text" class="custom border-gradient" placeholder="Type something here" :counter="true"
            :maxlength="200" :auto-grow="true">
        </IonTextarea>
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

ion-textarea {
    line-clamp: 8;
    height: auto;
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