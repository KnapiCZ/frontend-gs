<script setup lang="ts">
import {
    IonToolbar,
    modalController,
    IonHeader,
    IonButton,
    IonButtons,
    IonTitle,
    IonItem,
    IonContent,
    IonInput,
    IonRadioGroup,
    IonRadio,
} from "@ionic/vue"
import { onMounted, ref } from "vue"
import { userDataStore } from "@/stores/UserDataStore"
import apiUser from "@/logic/API/apiUser"

const userStore = userDataStore()

const text = ref<string>()

const cancel = () => {
    modalController.dismiss()
}

const save = async () => {
    await apiUser("update", 3, JSON.stringify({ weight: text.value as unknown as number })).then((response) => {
        if (response.status == "success") {
            userStore.addToDict("editedUser", "weight", text.value)
        } else {
            console.log(response)
        }
    })
    modalController.dismiss()
}

onMounted(() => {
    if (userStore.getFromDict("editedUser", "weight") == undefined) text.value = userStore.getFromDict("user", "weight")
    else text.value = userStore.getFromDict("editedUser", "weight")
})
</script>

<template>
    <IonHeader>
        <IonToolbar>
            <IonButtons slot="start">
                <IonButton @click="cancel()">Cancel</IonButton>
            </IonButtons>
            <IonTitle>Weight</IonTitle>
            <IonButtons slot="end">
                <IonButton class="save-button" :strong="true" @click="save()"> Confirm</IonButton>
            </IonButtons>
        </IonToolbar>
    </IonHeader>
    <IonContent>
        <IonInput
            v-model="text"
            class="custom border-gradient"
            fill="outline"
            placeholder="Your Weight"
            maxlength="4"
            :counter="true"
        />
        <p>You can type here your weight.</p>
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
    background: linear-gradient(180deg, #fff 4%, #ffffff75 52%, #ffffff59 80%, #ffee0096);
}
</style>
