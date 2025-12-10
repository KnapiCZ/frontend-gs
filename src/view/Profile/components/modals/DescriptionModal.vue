<script setup lang="ts">
import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonTextarea,
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
    modalController.dismiss({ id: "bio-modal" })
}

const save = async () => {
    await apiUser("update", 3, JSON.stringify({ description: text.value })).then((response) => {
        if (response.status == "success") {
            userStore.addToDict("editedUser", "description", text.value)
        } else {
            console.log(response)
        }
    })
    modalController.dismiss({ id: "bio-modal" })
}

onMounted(() => {
    if (userStore.getFromDict("editedUser", "description") == undefined)
        text.value = userStore.getFromDict("user", "description")
    else text.value = userStore.getFromDict("editedUser", "description")
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
      <IonTitle>Description</IonTitle>
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
    <IonTextarea
      v-model="text"
      class="custom border-gradient"
      placeholder="Type something here"
      :counter="true"
      :maxlength="200"
      :auto-grow="true"
    />
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
    background: linear-gradient(180deg, #fff 4%, #ffffff75 52%, #ffffff59 80%, #ffee0096);
}
</style>
