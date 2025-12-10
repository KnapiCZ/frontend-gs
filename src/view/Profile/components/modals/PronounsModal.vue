<script setup lang="ts">
import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonInput,
    IonTitle,
    IonToolbar,
    modalController,
} from "@ionic/vue"
import { onMounted, ref } from "vue"

import apiUser from "@/logic/API/apiUser"
import { userDataStore } from "@/stores/UserDataStore"

const userStore = userDataStore()

const text = ref<string>()

const cancel = () => {
    modalController.dismiss()
}

const save = async () => {
    await apiUser("update", 3, JSON.stringify({ pronouns: text.value })).then((response) => {
        if (response.status == "success") {
            userStore.addToDict("editedUser", "pronouns", text.value)
        } else {
            console.log(response)
        }
    })
    modalController.dismiss()
}

onMounted(() => {
    if (userStore.getFromDict("editedUser", "pronouns") == undefined)
        text.value = userStore.getFromDict("user", "pronouns")
    else text.value = userStore.getFromDict("editedUser", "pronouns")
})
</script>

<template>
  <IonHeader>
    <IonToolbar>
      <template #start>
        <IonButtons>
          <IonButton @click="cancel()">
            Cancel
          </IonButton>
        </IonButtons>
      </template>
      <IonTitle>Pronouns</IonTitle>
      <template #end>
        <IonButtons>
          <IonButton
            class="save-button"
            :strong="true"
            @click="save()"
          >
            Confirm
          </IonButton>
        </IonButtons>
      </template>
    </IonToolbar>
  </IonHeader>
  <IonContent>
    <IonInput
      v-model="text"
      class="custom border-gradient"
      fill="outline"
      placeholder="Your Pronouns"
      :maxlength="20"
      :counter="true"
    />
    <p>You can type here your own pronouns separate them by /.</p>
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
