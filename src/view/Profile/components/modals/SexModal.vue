<script setup lang="ts">
import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonItem,
    IonRadio,
    IonRadioGroup,
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
    await apiUser("update", 3, JSON.stringify({ sex: text.value })).then((response) => {
        if (response.status == "success") {
            userStore.addToDict("editedUser", "sex", text.value)
        } else {
            console.log(response)
        }
    })
    modalController.dismiss()
}

onMounted(() => {
    if (userStore.getFromDict("editedUser", "sex") == undefined) text.value = userStore.getFromDict("user", "sex")
    else text.value = userStore.getFromDict("editedUser", "sex")
    console.log(text.value)
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
      <IonTitle>Biological Sex</IonTitle>
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
    <IonRadioGroup v-model="text">
      <IonItem>
        <IonRadio
          value="m"
          justify="space-between"
        >
          Male
        </IonRadio>
      </IonItem>
      <IonItem>
        <IonRadio
          value="f"
          justify="space-between"
        >
          Female
        </IonRadio>
      </IonItem>
      <IonItem>
        <IonRadio
          value="n"
          justify="space-between"
        >
          Rather not to say
        </IonRadio>
      </IonItem>
    </IonRadioGroup>
  </IonContent>
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
    background: #fff000;
    transform: rotate(45deg);
}
</style>
